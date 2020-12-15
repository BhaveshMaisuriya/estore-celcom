import { Injectable, Inject, forwardRef } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HOST } from 'app/Service/app.service';
import { iPlanMega, STAR_PLAN_PREFIX, MOON_PLAN_PREFIX, GenericPlanData,
  planTypeEnum, iPlanMoon, iPlanCustomized, iSinglePlanCustomized, iCMPSinglePlanTabData, iOmniCampaign } from 'app/shared/models/plan.model';
import { iNumberReservationResponse, iNumberReservationRequest, addTocartBundle, addTocartLegacy } from 'app/models/general.model';
import { SYS_DOWN_MSG } from 'app/shared/constants/error.constants';
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { UserService } from 'app/Service/user.service';
import { isNullOrUndefined } from 'app/shared/utilities/helper.ultility';
import { iMvivaCampaign } from 'app/shared/models/device.model';

export class ResponseTransformer {
  data: GenericPlanData;
  constructor(response: unknown, plan_type: planTypeEnum, legacy_plan_data: iSinglePlanCustomized = null) {
    if (plan_type === planTypeEnum.star) {
      let campaign_mviva, campaign_omni;
      const resp = <iPlanMega>response;
      if (resp?.tabData?.is_campaign_mviva) {
        campaign_mviva = resp?.tabData?.campaign_mviva;
      }
      if (resp?.tabData?.is_campaign_omni) {
        campaign_omni = resp?.tabData?.campaign_omni;
      }

      this.data = {
        status: true,
        plan_type,
        bundle_product_sku: resp?.tabData?.sku,
        base_plans: resp?.tabData?.base_plan,
        pass_plans: resp?.tabData?.pass_plan,
        campaign_mviva,
        campaign_omni,
        type_of_purchase_options: {
          cobp: true,
          mnp: true,
          newline: true,
        },
        auto_bill_type_of_purchase: resp?.auto_bill_type_of_purchase,
        notes: resp?.tabData?.notes,
        enable_lifestyle: !!resp?.tabData?.enableLifeStyleSection,
      };

      /**
       * sort plans from high to low price
       */
      for (const key of Object.keys(this.data.pass_plans)) {
        const sortedData = [...this.data.pass_plans[key].associated_passes].sort((a, b) => {
          return +a['monthlyPlan'] < +b['monthlyPlan'] ? 1 : -1;
        });
        this.data.pass_plans[key].associated_passes = sortedData;
      }
      if (!resp?.tabData?.is_campaign_mviva && resp?.tabData?.campaign_mviva_invalid) {
        const campaign_invalid_message = resp?.tabData?.campaign_mviva_invalid;
        this.data = {
          ...this.data,
          campaign_invalid_message,
        };
      }
    } else if (plan_type === planTypeEnum.moon) {
      const resp: iPlanMoon = <iPlanMoon>response;
      let campaign_mviva: iMvivaCampaign, campaign_omni: iOmniCampaign;
      let selectedDeviceSku = null;
      let plans = resp?.pass_plan;
      if (resp?.base_plan[0]?.is_campaign_mviva) {
        campaign_mviva = resp?.base_plan[0]?.campaign_mviva;
        // selectedDeviceSku = campaign_mviva?.device_bundle;
      }
      if (resp?.base_plan[0]?.is_campaign_omni) {
        campaign_omni = resp?.base_plan[0]?.campaign_omni;
        // Change to device_sku to apply filter
        selectedDeviceSku = campaign_omni?.['device_sku_filter'];
      }

      if (selectedDeviceSku) {
        plans = plans
          ?.map(p => {
            let pl = p;
            if (p.associated_bundle_product?.length > 0) {
              const findDeviceBundle = p.associated_bundle_product.find(d => d.sku === selectedDeviceSku);
              if (findDeviceBundle) {
                pl = {
                  ...p,
                  associated_bundle_product: [findDeviceBundle],
                };
              } else {
                pl = {
                  ...p,
                  associated_bundle_product: p.associated_bundle_product
                    ?.map(bundle => {
                      return {
                        ...bundle,
                        associated_device_product: bundle?.associated_device_product?.filter(device => device?.sku === selectedDeviceSku)
                      };
                    }).filter(devices => devices?.associated_device_product?.length > 0)
                };
              }
            }
            return pl;
          });
      }

      this.data = {
        status: true,
        plan_type,
        promotion_message: resp?.promotion_message,
        bundle_product_sku: resp?.sku,
        base_plans: resp?.base_plan,
        plans,
        campaign_mviva,
        campaign_omni,
        type_of_purchase_options: {
          cobp: true,
          mnp: true,
          newline: true,
        },
        auto_bill_type_of_purchase: resp?.auto_bill_type_of_purchase,
        notes: resp?.notes,
      };

      /**
       * sort plans from high to low price
       */
      const sortedData = [...this.data.plans].sort((a, b) => {
        return +a['monthly_plan'] < +b['monthly_plan'] ? 1 : -1;
      });
      this.data.plans = sortedData;
      if (!resp?.base_plan[0]?.is_campaign_mviva && resp?.base_plan[0]?.campaign_mviva_invalid) {
        const campaign_invalid_message = resp?.base_plan[0]?.campaign_mviva_invalid;
        this.data = {
          ...this.data,
          campaign_invalid_message,
        };
      }
    } else if (plan_type === planTypeEnum.cmp) {
      const resp: iPlanCustomized = <iPlanCustomized>response;
      let campaign_mviva, campaign_omni;
      campaign_mviva = resp?.tabdata?.Items.find(p => p.is_campaign_mviva ? p.campaign_mviva : null);
      campaign_omni = resp?.tabdata?.Items.find(p => p.is_campaign_omni ? p.campaign_omni : null);

      this.data = {
        status: true,
        plan_type,
        // promotion_message: resp?.promotion_message,
        // bundle_product_sku: resp?.base_plan[0]?.sku,
        // base_plans: resp?.base_plan,
        plans: resp?.tabdata.Items,
        campaign_mviva,
        campaign_omni,
        type_of_purchase_options: {
          cobp: true,
          mnp: true,
          newline: true,
        },
        auto_bill_type_of_purchase: legacy_plan_data?.auto_bill_type_of_purchase,
        notes: legacy_plan_data?.tabData?.notes,
      };
      /**
       * sort plans from low to high price
       */
      const sortedData = [...this.data.plans].sort((a, b) => {
        return +(a['KeyText'].replace(/[^0-9]/g, '') || 0) > +(b['KeyText'].replace(/[^0-9]/g, '') || 0) ? 1 : -1;
      });
      this.data.plans = sortedData;
    }
    this.data = {
      ...this.data,
      original_response: response,
    };

    if (this.data?.campaign_mviva) {
      this.data = {
        ...this.data,
        type_of_purchase_options: {
          ...this.data.type_of_purchase_options,
          newline: !!this.data.campaign_mviva?.purchase_type?.includes('newline'),
          cobp: !!this.data.campaign_mviva?.purchase_type?.includes('cobp'),
          mnp: !!this.data.campaign_mviva?.purchase_type?.includes('mnp'),
        }
      };
    }

    if (this.data?.campaign_omni) {
      this.data = {
        ...this.data,
        type_of_purchase_options: {
          ...this.data.type_of_purchase_options,
          newline: !!this.data.campaign_omni?.purchase_type?.includes('newline'),
          cobp: !isNullOrUndefined(this.data.campaign_omni?.purchase_type)
            ? !!this.data.campaign_mviva?.purchase_type?.includes('cobp')
            : true,
          mnp: !!this.data.campaign_omni?.purchase_type?.includes('mnp'),
        }
      };
    }
  }
}

@Injectable({
    providedIn: 'root'
})
export class PostpaidService {
  nric: string;
  domain = HOST;

  constructor(
    private http: HttpClient,
    @Inject(forwardRef(() => UserService)) private _userService: UserService,
  ) { }

  loadLegacyPlan(sku, promotions): Observable<iSinglePlanCustomized> {
    const params = {
      ...promotions,
    };
    return this.http
      .get<iSinglePlanCustomized>(`${this.domain}/rest/V1/planproductview/${sku}`,
      {params})
      .pipe(
        map(response => {
          const data: GenericPlanData = {
            status: false,
            message: response?.message || response?.[0]?.message || SYS_DOWN_MSG,
          };
          if (response[0]) {
            return response[0];
          }
          return data;
        }),
        catchError(this.handleError)
      );
  }

  loadPlan(sku: string, original_params): Observable<GenericPlanData> {
    let plan_type: planTypeEnum;
    let params = {
      ...original_params
    }
    let endpoint;
    if (sku.startsWith(STAR_PLAN_PREFIX)) {
      plan_type = planTypeEnum.star;
      endpoint = `ultraplanproductview/${sku}`;
    } else if (sku.startsWith(MOON_PLAN_PREFIX)) {
      plan_type = planTypeEnum.moon;
      endpoint = `project-moon-details/${sku}`;
      if (!params['promotiondetails']) {
        try {
          delete params['type'];
          delete params['top'];
          delete params['device'];
        } catch (_error) {
  
        }
      }
    } else {
      plan_type = planTypeEnum.cmp;
      endpoint = 'planproductlist/4/0';
    }
    const url = `${this.domain}/rest/V1/${endpoint}`;
    if (plan_type === planTypeEnum.cmp) {
      return this.loadLegacyPlan(sku, params).pipe(
        switchMap(data => {
          return this.getPlanData(url, params, plan_type, <iPlanCustomized>data);
        })
      );
    }
    return this.getPlanData(url, params, plan_type, null);
  }

  getPlanData(url, params, plan_type, legacy_plan_data): Observable<GenericPlanData> {
    return this.http
      .get<GenericPlanData>(url,
      {params})
      .pipe(
        map(response => {
          let data: GenericPlanData = {
            status: false,
            message: response?.message || response?.[0]?.message || SYS_DOWN_MSG,
            statusNumber: 404
          };
          if (legacy_plan_data && legacy_plan_data['status'] === false) {
            return data;
          }
          const apiResponse = response[0];
          if (apiResponse && apiResponse['status'] !== false) {
            if (plan_type === planTypeEnum.cmp && apiResponse.tabdata?.Items) {
              const items = <iCMPSinglePlanTabData[]>apiResponse.tabdata?.Items;
              const selectedItem = <iCMPSinglePlanTabData>legacy_plan_data?.tabData;
              let found = false;
              apiResponse.tabdata.Items = items?.map(p => {
                if (p.sku === selectedItem?.sku) {
                  found = true;
                  return selectedItem;
                }
                return p;
              });
              /**
               * Means internet go, individual plan
               */
              if (!found) {
                // Display only one item
                apiResponse.tabdata.Items = [selectedItem];
                // Display multiple items
                // apiResponse.tabdata.Items.push(selectedItem);
              }
            }
            const resp = new ResponseTransformer(apiResponse, plan_type, legacy_plan_data);
            data = resp.data;
            if ([planTypeEnum.star, planTypeEnum.moon].includes(plan_type) && data) {
              if (this._userService.isDealer && !data.campaign_mviva && !data.campaign_omni) {
                data = {
                  ...data,
                  type_of_purchase_options: apiResponse?.type_purchse?.dealer
                };
              }
            }
          }
          return data;
        }),
        catchError(this.handleError)
    );
  }

  reserveNumber(data: iNumberReservationRequest): Observable<iNumberReservationResponse> {
    return this.http
        .post<any>(`${this.domain}/rest/V1/reserveNumber`, {...data})
        .pipe(
            map(response => response[0]),
        );
  }

  addToCart(data: addTocartBundle.RootObject, plan_type: planTypeEnum = null): Observable<any> {
    if (plan_type === planTypeEnum.cmp) {
      const legacy_data: addTocartLegacy.RootObject = {
        data: {
          ...data.data,
          Sku: data?.data?.sub_pass_sku,
          TotalPay: 0,
        },
        supp_data: data.supp_data,
      };
      return this.addToCartLegacy(legacy_data);
    }
    return this.http
        .post<any>(`${this.domain}/rest/V1/bundle`, {...data});
  }

  addToCartLegacy(data: addTocartLegacy.RootObject): Observable<any> {
    return this.http
        .post<any>(`${this.domain}/rest/V1/planaddtocart`, {...data});
  }

  handleError(_err): Observable<iGeneralServerResponse> {
    const error: iGeneralServerResponse = {
      message: SYS_DOWN_MSG,
      status: false,
    };
    return of(error);
  }
}
