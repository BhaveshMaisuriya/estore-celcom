import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as ApiConstant from '../../../constants/estoreEndPoint.constants';
import { CommonUtilService } from 'app/Service/commonUtil.service';
import { LoginService } from 'app/Store/login/service/login.service';
import { NewOtpInputComponent } from '../../new-otp-input/new-otp-input.component';
import { iOmniCampaign, iPass, iPlan, iAPIResponse, iLifeStyleContract, SupplementaryData } from 'app/shared/models/plan.model';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';
import { environment } from 'environments/environment';
import { combineLatest, Subscription, timer } from 'rxjs';
import { iBasePlan, DeviceDataService } from 'app/Service/devicedata.service';
import { CobpService } from 'app/Store/cobp/cobp.service';
import { CobpWrapperService, COBPResponse } from './cobp-wrapper.service';
import { TypeofPurchaseService } from 'app/Service/type-of-purchase.service';
import { getCOBPErrorFromResponse, getYearAndMonth } from '../../../utilities/helper.ultility';
import { GlobalErrorHandler } from 'app/interceptors/error.interceptor';
import * as ErrorConst from '../../../constants/error.constants';
import { HeaderService } from 'app/Header/header.service';
import { UserService } from 'app/Service/user.service';
import { ModalService, iModalErrorData } from '../../modal/modal.service';
import { iPlanDevice, deviceBundleTypeEnum, iMvivaCampaign, iPlanDeviceBundle} from 'app/shared/models/device.model';
import { formatPhoneNumber } from 'app/shared/utilities/helper.ultility';
import { FORM_VALIDATION_PATTERN } from 'app/shared/constants/form.constants';
import { Params } from '@angular/router';
import { untilDestroyed } from 'app/shared/services/until-destroyed.service';
import { finalize } from 'rxjs/operators';
import { TypeofPurchaseQuery } from 'app/Widget/side-summary/side-summary-container/type-of-purchase.store';
import { iCOBPInstruction } from '../../cobp-instructions/cobp-instructions.component';

@Component({
  selector: "app-cobp-wrapper",
  templateUrl: "./cobp-wrapper.component.html",
  styleUrls: ["./cobp-wrapper.component.scss"],
  encapsulation: ViewEncapsulation.None,
  providers: [CobpService]
})
export class CobpWrapperComponent implements OnInit, OnDestroy {
  public myForm: FormGroup = null;
  private _loading = false;

  set loading(value) {
    this._loading = !!value;
    this._topService.setLoading(value);
  }

  get loading() {
    return this._loading;
  }

  @ViewChild("otpFormInput") otpForm: NewOtpInputComponent;
  @Output() onAfterEligibilityCheck = new EventEmitter();
  enableMCotpBox = false;
  state: string;
  securityCode: string;
  generalError: string;
  step = 1;
  userPhoneNumber: string;

  otpExpired = false;
  otpCounter: number = 0;
  otpCountDown: Subscription;
  second = 1000;

  resendLinkDisabled = false;
  pass: iPass;
  plan: iPlan;
  basePlan: iBasePlan;
  typeOfNumHighlight: string;
  userInfo: any;

  inputPhoneDisabled = false;
  inputNricDisabled = false;
  showChangeNumber = false;
  showOtherOTPInfo = false;
  showNotEligibleInfo = false;
  customerSubscribingTo: string;
  customerSubscribingFor: string;
  isAvailableAccountDetail: boolean = false;
  showSupplimentaryInfo: boolean = false;
  checkoutEnable: boolean = false;
  showDeviceUpfrontPenality: boolean = false;
  accntDet: any;
  enableNRICAuthentication: boolean = false;
  isCurrentPlanStar: boolean = false;
  cobpFlowMsg: string = null;
  errorConst: any;
  public deviceUpfrontPenalty;
  public goldenpenaltymessage: string;
  contractLengthYears: number;
  contractLengthMonths: number;
  mobile_number: string;
  endDate: string;
  loggedInUser: boolean = false;
  isEasyPhone: boolean;
  isDeviceBundle: boolean;
  isPreorder: boolean = false;
  formConstants = {
    phone: FORM_VALIDATION_PATTERN.phone,
    nric: FORM_VALIDATION_PATTERN.nric
  };
  otpExpireProcess: any;
  mvivaCampaign: iMvivaCampaign;
  omniCampaign: iOmniCampaign;
  isLifeStyleNotElgible: boolean = false;
  lifeStyleMessage: COBPResponse.LifeStyleElgibility;

  device_bundle: iPlanDeviceBundle;
  device: iPlanDevice;
  planApiResponse: iAPIResponse;
  isStar = false;
  lifeStyleVoucher: iLifeStyleContract;
  cobpWarningMsg: string = null;
  device_combo: iPlanDevice;
  is_combo_phone = false;
  device_combo_number: string;
  deviceUpfrontCondition = false;
  suppData: SupplementaryData;
  cobpInstructions: iCOBPInstruction;

  constructor(
    private _commonUtilService: CommonUtilService,
    private _loginService: LoginService,
    private _planQuery: PlansQuery,
    private _topQuery: TypeofPurchaseQuery,
    private _cobpService: CobpWrapperService,
    private _topService: TypeofPurchaseService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _headerService: HeaderService,
    private _deviceDataService: DeviceDataService,
    private _userService: UserService,
    private _modalService: ModalService,

  ) {
    this.errorConst = ErrorConst;
    this.myForm = new FormGroup({
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern(this.formConstants.phone)
      ]),
      nric: new FormControl("", [
        Validators.required,
        Validators.pattern(this.formConstants.nric)
      ])

    });
  }

  ngOnInit(): void {
    this.subscribeForLocalVars();
    if (this._userService.isCustomer()) {
      this.enableMCotpBox = false;
      this.userPhoneNumber = this._userService.getMsisdn();
      if (this.userPhoneNumber !== null) {
        this.myForm.patchValue({phone: this.userPhoneNumber});
        this.inputPhoneDisabled = true;
        this.step = 2;
        this.loggedInUser = true;
        this.onSendOTP();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyCountDown();
  }

  destroyCountDown() {
    this.otpCounter = 0;
    if (this.otpCountDown) {
      this.otpCountDown.unsubscribe();
    }
  }

  onErr(err) {
    this.loading = false;
    this.myForm.controls.phone.setErrors({ custom: this.errorConst.SYS_DOWN_MSG });
  }

  onApiErr(res?) {
    if (res.message) {
      this.myForm.controls.phone.setErrors({ custom: res.message });
    } else {
      this.myForm.controls.phone.setErrors({ custom: this.errorConst.SYS_DOWN_MSG });
    }
  }

  changeNumber() {
    this.resetFlags();
    this.step = 1;
    this.myForm.patchValue({
      phone: "",
      nric: ""
    });
    this.myForm.markAsUntouched();
  }

  doValidateCOBP() {
    const params: Params = {
      easy_phone: this.isEasyPhone ? 1 : 0,
      pre_order: this.isPreorder ? 1 : 0,
      device: this.device ? 1 : 0,
      mviva: this.mvivaCampaign ? 1 : 0,
      device_sku: this.device ? this.device?.sku : 0,
    };
    if (this.mvivaCampaign) {
      try {
        params.promotion = (window.location.search).slice(1);
      } catch (_error) {

      }
    }
    const msisdn = this._userService.getMsisdn();
    let promonumb = '';
    let oldpromonumb = '';
    let legacyPlans = false;

    if (this.device_bundle) {
      promonumb = this.basePlan?.orderPlanBundle || this.plan?.['orderPlanBundle'] || this.basePlan?.order_plan_bundle;
      oldpromonumb = this.basePlan?.ngn_part_number || this.plan?.ngn_part_number;
    } else if (this.basePlan) {
      // Star & moon
      promonumb = this.basePlan?.order_plan_bundle;
      // Moon is empty
      oldpromonumb = this.basePlan?.ngn_part_number;
    } else if (this.plan) {
      // Legacy
      promonumb = this.plan?.order_plan_bundle || this.plan?.['plan_part_number'];
      oldpromonumb = this.plan?.ngn_part_number;
      legacyPlans = true;
    }

    if (!legacyPlans) {
      legacyPlans = promonumb === this.plan?.['orderPlanBundle'];
    }

    this.validateCOBP(
      params,
      msisdn,
      this.basePlan?.sku || this.plan?.sku,
      // empty promonumb means xp-lite
      this.plan?.sku || '',
      promonumb,
      oldpromonumb,
      this.device,
      this.device_combo,
      this.device_bundle,
      !!this.omniCampaign,
      legacyPlans,
    );
  }

  validateCOBP(
    params: Params,
    msisdn: string,
    plan_sku: string,
    pass_sku: string,
    promonumb: string,
    oldpromonumb: string,
    device: iPlanDevice,
    device_combo: iPlanDevice,
    device_bundle: iPlanDeviceBundle,
    is_campaign_omni = false,
    is_legacy_plan = false) {
    const userInfo = this._userService.getUserInfo();
    const serviceInfo = userInfo?.outputCPResp?.services.find(s => s.mobileNumber == msisdn.replace(/^60/, '0'));
    let sku = this.planApiResponse?.tabData?.sku || plan_sku;
    if (device) {
      sku = pass_sku || plan_sku;
    }
    const data = {
      mobileNumber: msisdn,
      billingAccountNumber: serviceInfo?.assetBillingAccountNo,
      customerIDNo: userInfo?.outputCPResp?.customerID,
      customerIDType: 1,
      system: environment.blackListedSystem,
      promonumb,
      oldpromonumb,
      deviceSku: device?.sku || '',
      data: {
        customer_since: userInfo.outputCPResp?.customerSince,
        billing_pro_id: serviceInfo?.billingProfileId,
        sim_type: serviceInfo?.pre_Pos_Indicator,
        sku,
        vipCode: serviceInfo?.vipCode,
        plan_type: this.isStar ? (this.pass?.sku || 'Ultra-GB') : (is_legacy_plan ? '' : undefined),
        device_sku: !is_legacy_plan ? device?.sku || '' : '',
        pass_sku: is_legacy_plan ? '' : pass_sku,
        plan_sku: is_legacy_plan ? '' : plan_sku,
        lifestyle_voucher_selected: !!this.lifeStyleVoucher,
        device_bundle_sku: device_bundle?.sku,
        device_combo_sku: device_combo?.sku,
        is_device_combo: !!device_combo ? 1 : 0,
      },
      is_campaign_omni
    };

    this._cobpService.upgradeDowngrade(data, params)
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe(resp => {
      this.showChangeNumber = true;
      this.checkoutEnable = true;
      this._topService.updateCOBPResponse([resp]);
      this._topService.selectMobileNumber(this.userPhoneNumber);
      this.cobpFlowMsg = getCOBPErrorFromResponse(resp);
      this.showNotEligibleInfo = this.cobpFlowMsg != null;
      this.customerSubscribingTo = resp?.customer_eligibility?.subscribing_to;
      this.customerSubscribingFor = resp?.customer_eligibility?.subscribing_for;
      this.cobpInstructions = resp?.star_eligibility?.instructions;

      if (resp && resp.openOrder?.status === false) {
        this.setOpenOrderStatus([resp]);
      } else if (resp?.blackList?.blacklistIndicator === 'Yes') {
        this.showNotEligibleInfo = true;
        if (!resp.blackList.message || resp.blackList.message === null) {
          this.cobpFlowMsg = "Uh Oh. Your ID number is blacklisted.";
        } else {
          this.cobpFlowMsg = resp.blackList.message;
        }
      } else if (resp && !resp.callBaring?.status) {
        this.showNotEligibleInfo = true;
        if (resp.callBaring?.message === null || !resp.callBaring?.message) {
          this.cobpFlowMsg = "Uh Oh. Selected number is barred, please select a new number.";
        } else {
          this.cobpFlowMsg = resp.callBaring?.message;
        }
      }

      if (resp && resp.account_details) {
        this.isAvailableAccountDetail = true;
        this.accntDet = resp.account_details;
        if (resp.account_details.supplementary_info.supplementary_lines.length > 0) {
          this.showSupplimentaryInfo = true;
          /**
           * TODO: Add check if device has number or not (Accessory or Phone/Watch)
           */
          if (this.device_combo) {
            this._topService.selectDeviceComboNumber(this.accntDet.supplementary_info.supplementary_lines[0]);
          }
        }
      }
      if (resp.penaltyCheck !== undefined && resp.penaltyCheck.endDate !== undefined) {
        this.endDate = resp.penaltyCheck.endDate;
      }

      if (resp && resp.penaltyCheck
        && resp.penaltyCheck.device_upfront_penalty
        && Number(resp.penaltyCheck.device_upfront_penalty) > 0
        && !resp.penaltyCheck?.eligible_contract_extend) {
        this.checkoutEnable = false;
        const yearMonthArray = getYearAndMonth(resp.penaltyCheck.endDate.split("_")[0]);
        this.contractLengthYears = yearMonthArray[0];
        this.contractLengthMonths = yearMonthArray[1];
        this.deviceUpfrontPenalty = Number(resp.penaltyCheck.device_upfront_penalty);
        this.showDeviceUpfrontPenality = true;
      } else {
        this._topService.updateDisclaimer(true);
      }

      if (resp && typeof (resp.status) !== 'undefined' && resp.status === false && resp.response) {
        this.showNotEligibleInfo = true;
        this.cobpFlowMsg = resp.response;
      }

      if (resp && resp.lifestyle_eligibility?.status === false) {
        this.isLifeStyleNotElgible = true;
        this.lifeStyleMessage = resp?.lifestyle_eligibility;
      }
      if (resp?.['upfront_payment']?.status !== undefined) {
        this.cobpWarningMsg = resp?.['upfront_payment']?.message;
      }
      if (resp?.['golden_number_note']?.status === false) {
        this.cobpWarningMsg = resp?.['golden_number_note']?.message;
      }
      if (resp?.star_eligibility && this.cobpInstructions) {
        this.cobpFlowMsg = resp.star_eligibility?.message;
        this.showNotEligibleInfo = true;
      }
      this.onAfterEligibilityCheck.emit(this.cobpFlowMsg);
    }, err => {
      this.showNotEligibleInfo = true;
      this.cobpFlowMsg = ErrorConst.SYS_DOWN_MSG;
      if (err?.status === 401) {
        this.showErrorPoPup({
          title: 'Oops!',
          message: 'Your session has expired. Please relogin to continue!',
        }).subscribe(_data => {
          sessionStorage.clear();
          try {
            window.location.reload();
          } catch (_error) {

          }
        });
      }
    });
  }

  showErrorPoPup(data: iModalErrorData) {
    return this._modalService.showError(data);
  }

  subscribeForLocalVars() {
    combineLatest([
      this._planQuery.select(s => s.base_plan),
      this._planQuery.select(s => s.pass),
      this._planQuery.select(s => s.plan),
      this._planQuery.select(s => s.device_bundle),
      this._planQuery.select(s => s.device),
      this._planQuery.select(s => s.mviva_campaign),
      this._planQuery.select(s => s.omni_campaign),
      this._planQuery.select(s => s.device_bundle_type),
      this._planQuery.select(s => s.is_preorder),
      this._planQuery.select(s => s.api_response),
      this._planQuery.select(s => s.isStar),
      this._planQuery.select(s => s.lifestyle_voucher),
      this._planQuery.select(s => s.device_combo),
      this._topQuery.select(s => s.device_combo_number),
      this._planQuery.isComboPhone$,
    ]).pipe(
      untilDestroyed(this)
    ).subscribe((resp: any[]) => {
      const [
        base_plan,
        pass,
        plan,
        device_bundle,
        device,
        mviva_campaign,
        omni_campaign,
        device_bundle_type,
        is_preorder,
        plan_api_response,
        isStar,
        lifestyle_voucher,
        device_combo,
        device_combo_number,
        is_combo_phone,
      ] = resp;
      this.basePlan = base_plan;
      this.pass = pass;
      this.plan = plan;
      this.device_bundle = device_bundle;
      this.device = device;
      this.mvivaCampaign = mviva_campaign;
      this.omniCampaign = omni_campaign;
      this.isEasyPhone = device_bundle_type === deviceBundleTypeEnum.easyPhone;
      this.isDeviceBundle = device_bundle_type === deviceBundleTypeEnum.deviceBundle;
      this.isPreorder = is_preorder;
      this.planApiResponse = plan_api_response;
      if (this.planApiResponse) {
        if (this.device) {
          this.suppData = {
            ...this.planApiResponse?.items?.supplementary_details?.celcom_ultra_plan?.[0],
            name: this.planApiResponse?.items?.supplementary_details?.name,
          }
        } else {
          this.suppData = base_plan?.supplementary_data?.[0] ?? null;
        }
      }
      this.isStar = isStar;
      this.lifeStyleVoucher = lifestyle_voucher;
      this.device_combo = device_combo;
      this.device_combo_number = device_combo_number;
      this.is_combo_phone = is_combo_phone;
    });
  }

  public setOpenOrderStatus(response) {
    this.showNotEligibleInfo = true;
    if (response[0].openOrder.message === null || !response[0].openOrder.message) {
      this.cobpFlowMsg = "Uh Oh There is an existing order under this mobile number." +
        " Please activate your line by contacting Celcom Careline before proceeding to place a new order.";
    } else {
      this.cobpFlowMsg = response[0].openOrder.message;
    }
    if (this.cobpFlowMsg) {
      this._globalErrorHandler.errorObjectConvert(this.cobpFlowMsg);
    }
  }

  resetFlags() {
    this.showChangeNumber = false;
    this.inputPhoneDisabled = false;
    this.enableNRICAuthentication = false;
    this.inputNricDisabled = false;
    this.showNotEligibleInfo = false;
    this.showSupplimentaryInfo = false;
    this.isAvailableAccountDetail = false;
    this.showDeviceUpfrontPenality = false;
    this.checkoutEnable = false;
    this.enableMCotpBox = false;
    this.loggedInUser = false;
    this.isLifeStyleNotElgible = false;
    this._topService.selectMobileNumber("");
    this.cobpWarningMsg = null;
  }

  changeCheckedValue(event) {
    this._topService.updateDisclaimer(event);
    this.checkoutEnable = event;
  }

  onClickResendOTP() {
    if (this.resendLinkDisabled) return;
    this.otpForm.otpForm.patchValue({
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: ""
    });
    this.step = 1;
    this.generalError = "";
    this.callSendOtp();
  }

  callSendOtp(simType?) {
    this.loading = true;
    this.destroyCountDown();
    this.otpExpired = false;
    const apiUrl = ApiConstant.MC_SEND_OTP_API;
    this.userPhoneNumber = formatPhoneNumber(this.myForm.controls.phone.value);
    const requestBody = {
      mobile_number: this.userPhoneNumber,
      tnc: null
    };
    if (simType == "Prepaid") {
      requestBody["nric"] = this.myForm.controls.nric.value;
    }
    this._loginService.MobileConnect(apiUrl, requestBody).subscribe(
      (response: any) => {
      if (response && response[0]?.status) {
        this.loading = false;
        this.inputPhoneDisabled = true;
        this.inputNricDisabled = true;
        this.enableMCotpBox = true;
        this.showOtherOTPInfo = false;
        this.state = response[0].state;
        this.securityCode = response[0]?.securityCode;
        this.step++;
        // this.otpExpireProcess = setTimeout(() => {
        //   this.otpExpired = true;
        // }, 2 * 60 * 1000);

        this.resendLinkDisabled = true;
        this.otpCounter = (response[0].disable_resend_link | 0);
        this.otpCountDown = timer(0, this.second)
          .subscribe(() => {
            if (this.otpCounter > 0) {
              --this.otpCounter;
            } else if (this.otpCounter === 0) {
              this.resendLinkDisabled = false;
              this.otpExpired = true;
            }
          });

          try {
            setTimeout(() => {
              document.getElementById('input1').focus();
            }, 500);
          } catch (_error) {

          }
        // setTimeout(() => {
        //   this.showOtherOTPInfo = true;
        //   this.resendLinkDisabled = false;
        // }, +response[0].disable_resend_link * 1000);
      } else {
        this.loading = false;
        this.inputPhoneDisabled = false;
        this.enableNRICAuthentication = false;
        this.myForm.controls.phone.setErrors({ custom: response[0]?.message});
      }
    },
      (error: any) => {
        this.onErr(error);
      }
    );
  }

  onSuccess(res) {
    this.loading = false;
    if (res.status === true && res.exception === false) {
      if (res.sim_type === "Prepaid" && res.is_nric_verified === false) {
        this.enableNRICAuthentication = true;
        this.inputPhoneDisabled = true;
      } else if (
        res.sim_type === "Postpaid" ||
        (res.sim_type === "Prepaid" && res.is_nric_verified === true)
      ) {
        this.callSendOtp(res.sim_type);
      }
    } else {
      this.onApiErr(res);
    }
  }

  onSendOTP() {
    this.loading = true;
    const getMsisdnTypeAPIUrl = ApiConstant.VERIFY_CUSTOMER;
    this.userPhoneNumber = formatPhoneNumber(this.myForm.controls.phone.value);

    let getMsisdnTypeAPIRequestBody = this._commonUtilService.encrypter(
      JSON.stringify({
        data: { mobile_number: this.userPhoneNumber }
      })
    );
    if (this.enableNRICAuthentication) {
      getMsisdnTypeAPIRequestBody = this._commonUtilService.encrypter(
        JSON.stringify({
          data: {
            mobile_number: this.userPhoneNumber,
            nric: this.myForm.controls.nric.value,
            new_plan: this.plan?.PlanName || this.basePlan?.['plan_name'],
          }
        })
      );
    }
    this._loginService
      .MobileConnect(getMsisdnTypeAPIUrl, getMsisdnTypeAPIRequestBody)
      .subscribe(
        (res: any) => {
          if (res && res?.status) {
            if ((this.step === 1) || (res.sim_type === "Prepaid" && res.is_nric_verified === false)) {
              this.step = 1;
              this.loggedInUser = false;
              this.onSuccess(res);
            } else {
              this.doValidateCOBP();
            }
        }
        else {
          this.loading = false;
          if (res.sim_type === "Postpaid") {
            this.myForm.controls.phone.setErrors({ custom: res?.message});
          } else if (res.sim_type === "Prepaid") {
            this.myForm.controls.nric.setErrors({ custom: res?.message});
          } else {
            this.myForm.controls.phone.setErrors({ custom: res?.message});
          }
        }
      } ,
        (err: any) => {
          this.onErr(err);
        }
      );
  }

  verifyPrincipalNumber() {
    if (this.step == 1) this.onSendOTP();
    else this.onLogin();
  }

  onLogin() {
    this.generalError = "";
    const requestBody = {
      login_data: {
        mobile_number: this.myForm.controls.phone.value,
        otp: this.otpForm.getValue(),
        state: this.state,
        securityCode: this.securityCode ?? null,
        user: "user"
      }
    };
    const apiUrl = "/rest/V1/login";
    this.loading = true;
    this._loginService
      .MobileConnect(apiUrl, requestBody)
      .subscribe(
        (response: any) => {
          if (response && response[0] && response[0].status === true) {
            clearTimeout(this.otpExpireProcess);
            this.enableMCotpBox = false;
            this.userInfo = response[0]?.customer_data;
            this.loggedInUser = true;
            this._loginService.BindCustomerDetails(response[0], requestBody.login_data.mobile_number);
            setTimeout(() => {
              this._headerService.publishUser(this.userInfo.name);
            }, 0);
            this._deviceDataService.publishLoggerInUserName(this.userInfo.name);
            this.doValidateCOBP();

          } else {
            this.loading = false;
            this.generalError = (response && response[0] && response[0].message) ? response[0].message
              : this.errorConst.SYS_DOWN_MSG;
          }
        },
        () => {
          this.loading = false;
          this.generalError = this.errorConst.SYS_DOWN_MSG;
        }
      );
  }

  selectDeviceComboNumber(number) {
    if (number !== this.device_combo_number) {
      this._topService.selectDeviceComboNumber(number);
    }
  }
}
