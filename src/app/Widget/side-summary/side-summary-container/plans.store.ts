import {Query, Store, StoreConfig} from '@datorama/akita';
import {forwardRef, Inject, Injectable} from '@angular/core';
import {iBasePlan} from '../../../Service/devicedata.service';
import {typeOfPurchaseEnum, TypeofPurchaseState, TypeofPurchaseStore} from './type-of-purchase.store';
import {isNullOrUndefined} from 'util';
import {getCOBPErrorFromResponse} from '../../../shared/utilities/helper.ultility';
import {UserService} from 'app/Service/user.service';
import {
  iPlanDevice,
  iPlanDeviceBundle,
  iStockCheck,
  iMvivaCampaign,
  deviceBundleTypeEnum,
  COMBO_DEVICE_TYPE_ACCESSORY
} from '../../../shared/models/device.model';
import {
  FIRST_BLUE_INTERNET,
  iAPIResponse,
  iOmniCampaign,
  iPass,
  iPlan,
  iPlanPrice,
  MOON_PLAN_PREFIX,
  MOON_PLAN_PREFIX_ALT,
  STAR_PLAN_PREFIX,
  STAR_PLAN_PREFIX_ALT,
  iLifeStyleContract
} from '../../../shared/models/plan.model';
import { COBPResponse } from '../../../shared/models/cobp.model';
import { STAR_SPEED_PASS_SKU } from 'app/shared/models/plan.model';
import { iCreditReload, iPrepaidPass } from 'app/Store/plan/prepaid/prepaid.model';
export interface PlansState {

  /**
   * APIResponse
   */
  api_response?: iAPIResponse;
  /**
   * Base plan for Project moon or star
   */
  base_plan: iBasePlan | null,
  base_price: number,
  /**
   * Pass plan for project star only. Speed or GB
   */
  pass: iPass | null,
  /**
   * First plan will use this variable
   */
  plan: iPlan | null,
  plan_price: number,
  /**
   * Dynamically created
   */
  isMoon: boolean,
  isStar: boolean,
  isPrepaid?: boolean,
  isFamilyPlan?: boolean;
  isFirstBluePlan?: boolean;

  isBroadband?: boolean,
  show_plan_prices: boolean,
  monthly_pays?: iPlanPrice,
  total_monthly_charges?: number,
  upfront_payment: number,
  upfront_payment_waived: boolean,
  is_preorder?: boolean;
  is_preorder_ended?: boolean;
  device?: iPlanDevice,
  device_combo?: iPlanDevice;
  device_price?: number;
  device_bundle?: iPlanDeviceBundle,
  device_bundle_combo?: iPlanDeviceBundle,
  device_bundle_type?: string,
  device_bundle_subtype?: string,
  device_bundle_type_label?: string,
  device_upfront_payment?: number,
  device_stock?: iStockCheck,
  device_combo_stock?: iStockCheck,
  easyphone_contract_periods?: string[],
  easyphone_selected_contract_period: string,
  easyphone_available_contract_periods?: object,
  mviva_campaign?: iMvivaCampaign,
  omni_campaign?: iOmniCampaign,
  device_bundle_available_contract_periods?: object,
  device_bundle_contract_periods?: string[],
  device_bundle_selected_contract_period: string,
  /**
   * Experimental variable.
   * Do not use!
   */
  device_stocks?: iStockCheck[],

  clm_no_upfront_payment?: boolean,
  device_penalty?: number;
  // This one for trigger only
  triggerUpdate?: any,
  supplementary_lines_count?: number,
  checkout_button_enabled: boolean,

  addtocart_error: boolean,

  esim_eligibility?: boolean,
  lifestyle_voucher?: iLifeStyleContract | null,
  internet_pass_item?: iPrepaidPass | null,
  internet_pass_type?: string,
  prepaid_credit_reload?: iCreditReload | null
}

export function createInitialState(): PlansState {
  return {
    base_plan: null,
    base_price: 0,
    pass: null,
    plan: null,
    plan_price: 0,
    isMoon: false,
    isStar: false,
    show_plan_prices: false,
    total_monthly_charges: 0,
    upfront_payment: 0,
    upfront_payment_waived: false,
    device: null,
    checkout_button_enabled: false,
    addtocart_error: false,
    easyphone_selected_contract_period: "24",
    device_bundle_selected_contract_period: "24",
    lifestyle_voucher: null
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'plans' })
export class PlansStore extends Store<PlansState> {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private topStore: TypeofPurchaseStore,
  ) {
    super(createInitialState());
    this.akitaPreUpdate.bind(this);
    this.getTypeOfPurchaseStore.bind(this);
  }

  getTypeOfPurchaseStore(): TypeofPurchaseState{
    return this.topStore.getValue();
  };

  handleOmniCampaignState(nextState: PlansState) {
    if (nextState.omni_campaign) {
      if (!nextState.omni_campaign?.upfront_payment) {
        nextState.upfront_payment = 0;
      }
    }
  }

  akitaPreUpdate(prevState: PlansState, nextState: PlansState) {
    const top = this.getTypeOfPurchaseStore();

    if (JSON.stringify(prevState.device_stocks) != JSON.stringify(nextState.device_stocks)) {
      this.transformDeviceStock(prevState, nextState);
    }
    if (prevState.base_plan != nextState.base_plan || nextState.device_bundle_type == deviceBundleTypeEnum.deviceOnly) {
      nextState = {
        ...nextState,
        pass: null,
        plan: null,
      }
    }

    if (prevState.pass != nextState.pass) {
      /**
       * CEL-9812 - required to auto select pass
       */
      // if (nextState.pass.sku == STAR_SPEED_PASS_SKU && plan == null) {
      //   plan = nextState.pass.associated_passes[0];
      // }
      let plan = nextState.pass?.associated_passes?.find(p => p.is_default == '1');
      nextState = {
        ...nextState,
        plan,
      }
    }

    nextState = {
      ...nextState,
      isStar: !isNullOrUndefined(nextState.base_plan)
        && (nextState.base_plan?.sku?.toLowerCase().startsWith(STAR_PLAN_PREFIX)
          || nextState.base_plan?.sku?.toLowerCase().startsWith(STAR_PLAN_PREFIX_ALT)),
      isMoon: !isNullOrUndefined(nextState.base_plan)
        && (nextState.base_plan?.sku?.startsWith(MOON_PLAN_PREFIX)
          || nextState.base_plan?.sku?.toLowerCase().startsWith(MOON_PLAN_PREFIX_ALT)),
    }

    if (nextState.base_plan?.is_campaign_mviva && nextState.base_plan?.campaign_mviva) {
      nextState = {
        ...nextState,
        mviva_campaign: nextState.base_plan?.campaign_mviva,
      }
    }

    if (nextState.plan?.is_campaign_mviva && nextState.plan?.campaign_mviva) {
      nextState = {
        ...nextState,
        mviva_campaign: nextState.plan?.campaign_mviva,
      }
    }

    if (prevState.plan != nextState.plan && nextState.isMoon) {
      nextState = {
        ...nextState,
        device: null,
        device_bundle: null,
      }
    }

    /**
     * Preorder Check
     */

    if (nextState.device_bundle && nextState.device_bundle.preorder == 1) {
      try {
        const {
          is_preorder,
          is_preorder_ended,
          device_stock,
        } = this.getPreorderVariables(nextState);
        nextState = {
          ...nextState,
          is_preorder,
          is_preorder_ended,
          device_stock,
        }
      } catch (_error) {

      }
    }

    /**
     * Easyphone
     */

    const {
      easyphone_available_contract_periods,
      easyphone_device_price,
      easyphone_contract_periods,
    } = this.getEasyPhoneStateVariables(prevState, nextState);

    let { device_bundle_type_label, show_plan_prices } = this.getEasyPhoneStateVariables(prevState, nextState);

    nextState = {
      ...nextState,
      show_plan_prices,
      device_bundle_type_label,
      easyphone_available_contract_periods,
      easyphone_contract_periods,
    }

    /**
     * Device Bundle Contract Type
     */

    const deviceBundleContractVariables = this.getDeviceBundleContractVariables(
      prevState, nextState, show_plan_prices
    );
    nextState = {
      ...nextState,
      ...deviceBundleContractVariables.stateVariables
    }

    /**
     * Device Price
     */
    let device_price = 0;
    let upfront_payment = 0;
    try {
      if (nextState.device.prices) {
        device_price = +nextState.device.prices.device_price;
      } else if (nextState.device_bundle_type == deviceBundleTypeEnum.deviceOnly) {
        device_price = +nextState.device.rrp;
      } else if (nextState.device_bundle_type == deviceBundleTypeEnum.easyPhone) {
        device_price = +easyphone_device_price || 0;
      } else if (nextState.device_bundle_type === deviceBundleTypeEnum.deviceBundle) {
        device_price =
          +deviceBundleContractVariables.otherVariables.device_bundle_device_price || 0;
        upfront_payment =
          +deviceBundleContractVariables.otherVariables.device_bundle_upfront_price || 0;
      } else {
        device_price = +nextState.device_bundle.rm;
      }
    } catch (_error) {

    }

    if (nextState.device && nextState.device_bundle_type !== deviceBundleTypeEnum.easyPhone) {
      nextState = {
        ...nextState,
        show_plan_prices: false,
      }
      try {
        nextState = {
          ...nextState,
          device: {
            ...nextState.device,
            contract: nextState.device.contract.replace(/[^0-9]/g, ''),
          },
        }
      } catch (_error) {

      }
    }

    // * Is Checkout Button Enabled?
    const { checkout_button_enabled, cobp_resp } = this.isCheckoutButtonEnabled(nextState, top);

    nextState = {
      ...nextState,
      checkout_button_enabled,
    }

    /**
     * Plan monthly pay
     */
    const monthly_pays = this.getMonthlyPay(nextState, nextState.base_plan, nextState.plan);
    let { base_price, plan_price } = monthly_pays;

    /**
     * TODO: Refactor this
     */
    if (nextState.device_bundle_type == deviceBundleTypeEnum.deviceBundle) {
      try {
        let prices = null;
        if (nextState.device.saleable_plans && !nextState.isFirstBluePlan) {
          prices = nextState.device.saleable_plans.find(p => p.sku == nextState.plan.sku);
          if (nextState.device_combo) {
            prices = nextState.device_combo.saleable_plans.find(p => p.sku == nextState.plan.sku && p.parent_product_sku === nextState.device?.sku);
          }
          const suppCount = top.supplementary_lines.length;
          if (nextState.device_bundle_contract_periods.length) {
            const deviceBundleSelectedContract = nextState.device_bundle_selected_contract_period;
            device_price = +prices?.prices[suppCount]?.contract_period[deviceBundleSelectedContract].device_price;
          } else {
            device_price = +prices?.prices[suppCount]?.device_price;
          }
        }
      } catch (_error) {

      }
    }
    const plan_monthly_pay = this.getMonthlyCharge(monthly_pays);
    this.checkForUpfrontPayment(nextState, plan_monthly_pay);
    if (top?.type == typeOfPurchaseEnum.cobp && top.cobp_response && cobp_resp === null) {
      let totalPay = nextState.upfront_payment;
      if (top.cobp_response && top.cobp_response[0] && top.cobp_response[0]['star_eligibility'] && nextState.isStar) {
        const star_eligibility = top.cobp_response[0]['star_eligibility'];
        const lifestyle_eligibility = top.cobp_response[0]?.['lifestyle_eligibility'];
        if (star_eligibility.status) {
          totalPay = 0;
          if (nextState.device && nextState.device_bundle_type != deviceBundleTypeEnum.easyPhone){
            device_price = (+star_eligibility.response.device || 0);
            totalPay += (+star_eligibility.response.upfront || 0);
          } else if (lifestyle_eligibility?.status) {
            totalPay += lifestyle_eligibility?.upfront === 1 ? +nextState.lifestyle_voucher.lifestyle_upfront : 0;
          } else {
            // plan is base_plan
            // pass is plan (sub pass)
            totalPay += (+star_eligibility.response.plan || 0);
            base_price = (+star_eligibility.response.plan || 0);
            if (nextState.plan) {
              plan_price = (+star_eligibility.response.pass || 0);
              totalPay += (+star_eligibility.response.pass || 0);
            }
          }

        }
      }
      nextState.upfront_payment_waived =
        !isNullOrUndefined(top.cobp_response[0]?.upfront_payment) &&
        !!top.cobp_response[0]?.upfront_payment?.status;

      if (top?.cobp_response && top?.cobp_response[0] && top?.cobp_response[0]?.moon_eligibility && nextState.isMoon) {
        const eligibility = top?.cobp_response[0]?.moon_eligibility;
        if (eligibility.status) {
          totalPay = 0;
          if (nextState.device){
            device_price = (+eligibility.response.device || 0);
            totalPay += (+eligibility.response.upfront || 0);
          } else {
            // plan is base_plan
            // pass is plan (sub pass)
            totalPay += (+eligibility.response.plan || 0);
            if (nextState.plan) {
              totalPay += (+eligibility.response.pass || 0);
            }
          }
        }
        // totalPay = (+eligibility.response.plan || 0) + (+eligibility.response.pass || 0) + (+eligibility.response.device || 0) + (+eligibility.response.penalty || 0);
      }
      if (top?.cobp_response && top?.cobp_response[0] && top?.cobp_response[0]?.moon_eligibility) {
        if (top?.cobp_response[0].moon_eligibility.status && top?.cobp_response[0].moon_eligibility.is_moon === 0 &&
          nextState.device_bundle_type !== deviceBundleTypeEnum.deviceBundle) {
          if (top?.cobp_response[0].productEligibility.plan === 0) {
            totalPay = 0;
          }
          }
    }
      if (nextState.mviva_campaign?.no_upfront_payment && nextState.device_bundle_type !== deviceBundleTypeEnum.easyPhone) {
        totalPay = 0;
      }
      nextState.upfront_payment = totalPay;
    }

    if (top.type === typeOfPurchaseEnum.mnp) {
      nextState.upfront_payment = 0;

      if (nextState.isPrepaid) {
        plan_price = 0; // ? RM0 for Xpax MNP
      }
    }

    nextState = {
      ...nextState,
      monthly_pays,
      total_monthly_charges: plan_monthly_pay,
      base_price,
      plan_price,
      device_price,
    }

    /**
     * Omni Campaign
     */
    this.handleOmniCampaignState(nextState);

    if (nextState.isPrepaid) {
      nextState = {
        ...nextState,
        show_plan_prices: true,
      }
    }

    // if (nextState.device_bundle_type == 'deviceOnly') {
    //   nextState = {
    //     ...nextState,
    //     checkout_button_enabled: true
    //   }
    // }
    return nextState;
  }
  transformDeviceStock(prevState: PlansState, nextState: PlansState) {
    let array1 = prevState.device_stocks || [];
    let array2 = nextState.device_stocks;

    for(let item of array2){
      let i = array1.findIndex(a => a.sku == item.sku);
      if(i >= 0)
        array1[i].response = item.response;
      else
        array1 = [...array1, item]
    }
    nextState.device_stocks = array1;
  }

  private checkForUpfrontPayment(state: PlansState, planMonthLyPay: number) {
    let totalPay = planMonthLyPay;
    const top = this.getTypeOfPurchaseStore();
    if (state.device && state.plan) {
      let prices = null;
      if (state.device.saleable_plans) {
        prices = state.device.saleable_plans.find(p => p.sku == state.plan.sku);
        if (state.device_combo) {
          prices = state.device_combo.saleable_plans?.find(p => p.sku == state.plan.sku && p.parent_product_sku === state.device?.sku);
        }
      }
      try {
        if (state.device.prices && state.device.prices.upfront_price)
          totalPay = +state.device.prices.upfront_price;
        if (state.device_bundle_type == deviceBundleTypeEnum.deviceBundle) {
          const suppCount = top.supplementary_lines.length;
          if (prices && !state.isFirstBluePlan) {
            const selectedPrices = prices.prices;
            if (state.device_bundle_contract_periods.length) {
              state.device_price = +selectedPrices[suppCount].contract_period[state.device_bundle_selected_contract_period].device_price;
              totalPay = +selectedPrices[suppCount].contract_period[state.device_bundle_selected_contract_period].upfront_price;
            } else {
              totalPay = +selectedPrices[suppCount].upfront_price;
              state.device_price = +selectedPrices[suppCount].device_price;
            }
          } else if(prices && state.isFirstBluePlan) {
            if(prices.prices[0]?.contract_period !== null) {
              totalPay = +prices.prices[0]?.contract_period[state.device_bundle_selected_contract_period]?.upfront_price;
            }  else {
              totalPay = +prices.prices[0]?.upfront_price;
            }
          }
        } else if (state.device.saleable_plans) {
          if (prices) {
            const selectedPrices = prices.prices;
            if (selectedPrices['upfront_price'])
              totalPay = +selectedPrices['upfront_price'];
            state.device_price = +selectedPrices.device_price;
          }
        }
        if (top.type == typeOfPurchaseEnum.mnp) {
          totalPay = 0;
          state.show_plan_prices = false;
        }
      } catch (_error) {
        totalPay = 0;
      }
    }
    if (state.mviva_campaign?.no_upfront_payment && state.device_bundle_type !== deviceBundleTypeEnum.easyPhone) {
      totalPay = 0;
    }
    state.upfront_payment = totalPay;
  }

  private getPreorderVariables(nextState) {
    let is_preorder = false;
    const is_preorder_ended = nextState.device_bundle.preorder_availability_flag == 1;
    let device_stock: iStockCheck;
    const now = new Date();

    const preorderDataBundleLevel = nextState.device_bundle.pre_order_data;
    const preorder_start_date = new Date(preorderDataBundleLevel.preorder_from_date);
    const preorder_end_date = new Date(preorderDataBundleLevel.preorder_to_date);

    const preorderDataDeviceLevel = nextState.device.pre_order_data;
    if (now >= preorder_start_date && now <= preorder_end_date) {
      is_preorder = true;
      device_stock = {
        sku: nextState.device.sku,
        response: {
          in_stock: !!preorderDataDeviceLevel.preorder_stock_status_flag &&
            (
              preorderDataDeviceLevel.preorder_availble_stock_in_hand > 0 ||
              preorderDataDeviceLevel.preorder_stock_available_quantity > 0
            ),
          status: true,
        }
      };
    } else {
      is_preorder = false;
      device_stock = {
        sku: nextState.device.sku,
        response: {
          in_stock: false,
          status: true,
        }
      };
    }

    return {
      is_preorder,
      is_preorder_ended,
      device_stock,
    };
  }

  private getDeviceBundleContractVariables(prevState, nextState, show_plan_prices) {
    let device_bundle_available_contract_periods;
    let device_bundle_device_price = 0;
    let device_bundle_upfront_price = 0;
    // let show_plan_prices = false;
    let device_bundle_type_label = nextState.device_bundle_type;
    let device_bundle_filtered = [];
    let device_bundle_contract_periods = [];

    if (nextState.plan && nextState.device && nextState.device.saleable_plans) {
      const planSku = nextState.plan.sku;

      if (nextState.device_bundle_type == deviceBundleTypeEnum.deviceBundle) {
        if (nextState.isFirstBluePlan) {
        device_bundle_filtered = nextState.device.saleable_plans.filter(element => {
          return element.sku === FIRST_BLUE_INTERNET;
        });
      } else {
        device_bundle_filtered = nextState.device.saleable_plans.filter(element => {
          return element.sku === planSku;
        });
      }
        device_bundle_contract_periods = Object.keys(device_bundle_filtered[0]?.prices[0]?.contract_period || {});
        device_bundle_contract_periods.sort((a, b) => {
          return +(a || 0) - +(b || 0);
        });

        if (!device_bundle_contract_periods.includes(nextState.device?.contract) && device_bundle_contract_periods.length > 0) {
          nextState.device = {
            ...nextState.device,
            contract: device_bundle_contract_periods[0][nextState.device_bundle_selected_contract_period]?.contract_period,
          };
        }

        if (device_bundle_contract_periods[0]
          && !device_bundle_contract_periods.includes(prevState.device_bundle_selected_contract_period)
          && prevState.plan?.sku == nextState.plan?.sku) {
          nextState.device_bundle_selected_contract_period = device_bundle_contract_periods[0];
        }

        if (device_bundle_contract_periods[0]?.length < 2) {
          device_bundle_contract_periods = [];
        }

        let obj = nextState.device.saleable_plans.find((v) => v.sku == planSku);

        if (nextState.device_combo) {
          obj = nextState.device_combo.saleable_plans.find((v) => v.sku == planSku && v.parent_product_sku === nextState.device?.sku);
        }

        if (obj) {
          device_bundle_device_price = +obj['prices'][0]?.device_price;
          device_bundle_upfront_price = +obj['prices'][0]?.upfront_price;
          device_bundle_available_contract_periods = obj['prices'][0]['contract_period'] || {};

          if (!Object
            .keys(device_bundle_available_contract_periods)
            .includes(nextState.device_bundle_selected_contract_period)) {
            nextState.device_bundle_selected_contract_period = nextState.device?.contract || '12';
          }

          if (Object.keys(device_bundle_available_contract_periods).includes(nextState.device_bundle_selected_contract_period)) {
            device_bundle_device_price = device_bundle_available_contract_periods[nextState.device_bundle_selected_contract_period].device_price;
            device_bundle_upfront_price = device_bundle_available_contract_periods[nextState.device_bundle_selected_contract_period].upfront_price;
          }
        }

        if (nextState.device_bundle_subtype && nextState.device_bundle_type == deviceBundleTypeEnum.deviceBundle) {
          show_plan_prices = true;
        }
      }
    }

    return {
      stateVariables: {
        show_plan_prices,
        device_bundle_type_label,
        device_bundle_available_contract_periods,
        device_bundle_contract_periods,
      },
      otherVariables: {
        device_bundle_device_price,
        device_bundle_upfront_price,
      }
    }
  }

  private getEasyPhoneStateVariables(prevState, nextState) {
    let easyphone_available_contract_periods;
    let easyphone_device_price = 0;
    let show_plan_prices = false;
    let device_bundle_type_label = nextState.device_bundle_type;
    let easyphone_contract_periods = [];
    /**
     * Device combo will have it's own contract periods
     * Default contract period will refer to parent device
     */
    const selectedDevice = nextState.device_combo || nextState.device;
    if (nextState.plan && selectedDevice && selectedDevice.easy_phone) {
      const planSku = nextState.plan.sku;
      if (nextState.device_bundle_type == deviceBundleTypeEnum.easyPhone) {
        easyphone_contract_periods = Array.from(new Set(selectedDevice.easy_phone[nextState.device_bundle_subtype]?.flatMap(r => {
          return r.contract_periods ? Object.keys(r.contract_periods) : [];
        })));
        easyphone_contract_periods.sort((a, b) => {
          return +(a || 0) - +(b || 0);
        });
        if (!easyphone_contract_periods.includes(nextState.device?.contract) && easyphone_contract_periods.length > 0) {
          nextState.device = {
            ...nextState.device,
            contract: easyphone_contract_periods[0],
          };
        }
        if (easyphone_contract_periods[0]
          && !easyphone_contract_periods.includes(prevState.easyphone_selected_contract_period)
          && prevState.plan?.sku == nextState.plan?.sku) {
          nextState.easyphone_selected_contract_period = easyphone_contract_periods[0];
        }
        if (easyphone_contract_periods.length < 2) {
          easyphone_contract_periods = [];
        }
        const obj = selectedDevice.easy_phone[nextState.device_bundle_subtype]?.find( (v) => {
          if (!nextState.device_combo) {
            return Object.keys(v)[0] == planSku;
          } else {
            return Object.keys(v)[0] == planSku && nextState.device?.sku === v['parent_product_sku'];
          }
        });
        if (obj) {
          easyphone_device_price = +obj[planSku];
          easyphone_available_contract_periods = obj['contract_periods'] || {};
          if (!Object
            .keys(easyphone_available_contract_periods)
            .includes(nextState.easyphone_selected_contract_period)) {
            nextState.easyphone_selected_contract_period = nextState.device?.contract || '24';
          }
          if (Object.keys(easyphone_available_contract_periods).includes(nextState.easyphone_selected_contract_period)) {
            easyphone_device_price = easyphone_available_contract_periods[nextState.easyphone_selected_contract_period];
          }
        }
        // if (nextState.device_bundle_subtype == 'own') {
        //   subtype = ' Own';
        // }
        if (nextState.device_bundle_subtype && nextState.device_bundle_type == deviceBundleTypeEnum.easyPhone) {
          show_plan_prices = true;
          //device_bundle_type_label += subtype;
        }
      }
    }
    return {
      easyphone_available_contract_periods,
      easyphone_device_price,
      show_plan_prices,
      device_bundle_type_label,
      easyphone_contract_periods,
    }
  }

  private isCheckoutButtonEnabled(nextState, top) {
    let btn_enabled = false;
    let in_stock = !nextState.device || nextState.device_stock?.response?.in_stock;
    if (nextState.device_combo) {
      in_stock = nextState.device_stock?.response?.in_stock && nextState.device_combo_stock?.response?.in_stock;
    }
    const is_logged_in = this.userService.isCustomer();
    const cobp = top.cobp_response?.[0];
    const cobp_resp = getCOBPErrorFromResponse(cobp);
    if (nextState.device_bundle_type == deviceBundleTypeEnum.deviceOnly) {
      try {
        if (nextState.device_stock.response.in_stock) {
          btn_enabled = true;
        }
      } catch (_error) {
      }
    } else if(nextState.esim_eligibility) {
      btn_enabled = true;
    } else if (nextState.isPrepaid) {
      btn_enabled = top.type === typeOfPurchaseEnum.newline
        ? nextState.plan && top.mobile_number?.length > 0 && top.new_line_completed
        : nextState.plan && top.mobile_number?.length > 0 && top.eKycStatus
    } else if (nextState.isFamilyPlan) {
      btn_enabled = nextState.base_plan && top.supplementary_lines?.length > 0;
    } else {
      let number = (isNullOrUndefined(top.mobile_number) ? '' : top.mobile_number) + '';
      if (nextState.isBroadband) {
        btn_enabled = in_stock && is_logged_in && top.is_broadband_eligible;
      } else if (top.type == typeOfPurchaseEnum.newline) {
        btn_enabled = in_stock && is_logged_in && number.length > 0 && top.new_line_completed;
        if (nextState.device_combo) {
          btn_enabled = btn_enabled && top.supplementary_lines.length > 0 && top.device_combo_number?.length > 0;
        }
      } else if (top.type == typeOfPurchaseEnum.cobp) {
        btn_enabled = in_stock && number.length > 0 && cobp_resp == null && top.disclaimer_agreed;
        /**
         * If need to check only for phone
         */
        // const isPhoneCombo = nextState.device_combo && nextState.api_response?.items?.combo_type !== COMBO_DEVICE_TYPE_ACCESSORY;
        // if (nextState.device_combo && isPhoneCombo) {
        if (nextState.device_combo) {
          btn_enabled = btn_enabled && top.device_combo_number?.length > 0;
        }
      } else if (top.type == typeOfPurchaseEnum.mnp) {
        try {
          const mnp = top.mnp_response?.[0];
          btn_enabled = in_stock && mnp?.status;
        } catch (_error) {

        }
      }
    }

    return { checkout_button_enabled: btn_enabled, cobp_resp };
  }

  private getMonthlyPay(state: PlansState, base: iBasePlan, plan: iPlan): iPlanPrice {
    let base_price = 0;
    let plan_price = 0;
    if (base) {
      // Star
      base_price = +(base.PlanMonthlyPay || base.monthlyPlan);
      plan_price = +(plan ? plan.PlanMonthlyPay : 0);
      // XP-Lite
      if (base.monthly_plan) {
        base_price = +base.monthly_plan;
        plan_price = +(plan ? plan.monthly_plan : 0);
      }
    } else if (plan) {
      // First
      plan_price = +plan.PlanMonthlyPay || +plan.monthly_plan || 0;
    }
    return {
      base_price,
      plan_price,
    };
  }

  private getMonthlyCharge(prices: iPlanPrice): number {
    return prices.base_price + prices.plan_price;
  }
}

@Injectable({
  providedIn: 'root'
})
export class PlansQuery extends Query<PlansState> {
  isEasyPhone$ = this.select(state => state.device_bundle_type == deviceBundleTypeEnum.easyPhone);
  isEasyPhoneRent$ = this.select(state => state.device_bundle?.is_rent);
  isEasyPhoneOwn$ = this.select(state => state.device_bundle?.is_own);
  isDeviceBundle$ = this.select(state => state.device_bundle_type == deviceBundleTypeEnum.deviceBundle);
  isDeviceOnly$ = this.select(state => state.device_bundle_type == deviceBundleTypeEnum.deviceOnly);
  isPlanOnly$ = this.select(state => (state.plan || state.base_plan) && !state.device);
  isLegacyPlan$ = this.select(state => state.plan && !state.isMoon && !state.isStar);
  isComboPhone$ = this.select(state => state.device_combo && state.api_response?.items?.combo_type !== COMBO_DEVICE_TYPE_ACCESSORY);
  comboType$ = this.select(state => state.api_response?.items?.combo_type);

  getDevicePrices$ = this.select(state => {
    if (state.device_bundle_subtype && state.device?.easy_phone) {
      const easy_phone = state.device.easy_phone;
      const subtype = state.device_bundle_subtype;
      const data = easy_phone[subtype].map(sub => {
        const first = Object.keys(sub)[0];
        const obj24 = {
          "24": sub[first],
        }
        return {
          [first]: sub.contract_periods ? sub.contract_periods : obj24,
        }
      }).reduce((a,b) => {
        return {
          ...a,
          ...b
        }
      }, {});
      return data;
    }
    return {};
  });

  isPlanResponse$ = this.select(state => state.api_response.tabData);

  constructor(
    protected store: PlansStore,
    protected toptop: TypeofPurchaseStore,
  ) {
    super(store);
  }
}
