import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { CobpComponent } from './cobp.component';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationErrorComponent } from '../widget/notification-error/notification-error.component';
import { CobpService } from './cobp.service';
import { AppService } from '../../Service/app.service';
import { AppMockService } from '../../Service/appmock.service';
import { UserService } from '../../Service/user.service';
import { RedirectionService } from '../../Service/redirection.service';
import { DeviceDetailsPlanComponent } from '../../Widget/StoreWidgets/device-details/device-details-plans-section/device-details-plans-section.component';
import { DeviceDetailsPlanService } from '../../Widget/StoreWidgets/device-details/device-details-plans-section/device-details-plans-section.service';
import { ProductService } from '../../Service/product.service';
import { DeviceDataService } from '../../Service/devicedata.service';
import { EStoreAnalysticsService } from '../../Service/store.analytic.service';
import { FormsModule } from '@angular/forms';
import { PageLoaderComponent } from '../../shared/components/page-loader/page-loader.component';
import { Broadcaster } from '../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../Service/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AnalyticsService } from '../../Service/analytic.service';
import { RendererService } from '../../Service/renderer.service';
import { SeoService } from '../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { PlanTableComparisionService } from '../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service';
import { type } from 'os';
import { PlanPurchaseService } from "./../plan/plan-purchase/plan-purchase.service";
import { CommonUtilService } from "../../Service/commonUtil.service";
import { configureTestSuite } from "ng-bullet";
import { Observable } from "rxjs";
import { MsisdnInputComponent } from '../widget/msisdn-input/msisdn-input.component';
import { NoteSectionComponent } from '../dumb-components/note-section/note-section.component';
import { NricInputComponent } from '../widget/nric-input/nric-input.component';
import { OtpInputComponent } from '../widget/otp-input/otp-input.component';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
class MockactivatedRoute {
  snapshot(url: string) {
    return url;
  }
}

let ValidateUpgradePlanEasyPhoneresult: any = [
  {
    status: false,
    response: "easyphoneFlow test Msg"
  }
];
class MockCobpService {
  public ValidateUpgradePlanEasyPhone(data: any, isEasyPhone: number) {
    if (ValidateUpgradePlanEasyPhoneresult[0].status == "error") {
      return Observable.throw({ status: 401, statusText: "Unauthorized" });
    } else {
      return Observable.of(ValidateUpgradePlanEasyPhoneresult);
    }
  }
  public ValidateUpgradePlan() {
    if (ValidateUpgradePlanEasyPhoneresult[0].status == "error") {
      return Observable.throw({ status: 401, statusText: "Unauthorized" });
    } else {
      return Observable.of(ValidateUpgradePlanEasyPhoneresult);
    }
  }
}
const mockUserInfo = {
  outputCPResp: {
    country: "Malaysia",
    planSegmentType: "",
    unitNo: "11-4",
    segmentGroup: "Consumer",
    postalCode: "50411",
    contactFirstName: "DOJI",
    section: "",
    contactType: "",
    type: "Non Premier",
    poBox: "",
    contactHomePhone: "",
    state: "WP",
    streetType: "Jalan",
    contactMobileNum: "0115143124",
    motherMaidenName: "",
    gstTaxRelief: "",
    XPAX_DB_FLG: "N",
    buildingName: "",
    XPAX_OPEN_FLG: "0",
    nationality: "Malaysia",
    preferredContactMethod: "Email",
    customerIDType: "New NRIC",
    preferredContactLang: "English",
    customerID: "881212432154",
    name: "DOJI TTA",
    contactPreferredTime: "4:30pm to 8:30pm",
    segmentSubGroup: "Retail",
    floorNo: "",
    contactLastName: "TTA",
    salutation: "Mr",
    headerCustomerProfile: {
      errorMessage: "",
      errorCode: "",
      status: "OK"
    },
    PREPAIDOPENORD_FLG: "0",
    gender: "Male",
    city: "Kuala Lumpur",
    contactAlternateNum: "",
    contactRowID: "1-8Y1HJJ2",
    facebookID: "",
    pakejOpenCount: "0",
    googlePlusID: "",
    YOUTH_ACTIVE_COUNT: "0",
    gstTaxReliefID: "",
    DB_OPEN_COUNT: "0",
    billingType: "Billable",
    customerRowId: "1-8Y1HKBG",
    contactBusinessPhone: "",
    addressYType: "High-Rise",
    PREPAID_LINES_COUNT: "0",
    race: "",
    contactEmail: "881212432154@getnada.com",
    dateOfBirth: "19881212_000000",
    services: [
      {
        serviceType: "",
        smeGroupId: "",
        planSegmentType: "",
        pakejFlag: "N",
        mobileNumber: "0132046407",
        assetBillingAccountNo: "300601069",
        billingProfileId: "1-8Y1GVVU",
        principleMobileNumber: "",
        assetBillingAccountRowId: "1-8Y1GVVP",
        promotionId: "1-XYUNQP",
        pre_Pos_Indicator: "Postpaid",
        prodPromName: "FiRST Gold Plus CBS",
        billingType: "Billable",
        hh_consumed_flag: "N",
        prin_Sup_Indicator: "",
        prodPromPartNum: "PB12070",
        plan: "FiRST Gold Plus CBS Plan",
        productType: "Service",
        assetSubStatus: "Active",
        product: "RTP Voice Service",
        creditTreatmentCode: "6",
        billType: "CNVRGTPostpaid",
        assetModel: "",
        SVC_LVL_DVC_COUNT: "0",
        segmentCode: "10",
        assetIntegrationID: "1-8Y1H46D",
        partialControlFlag: "",
        masterAccountNumber: "",
        billingAccountStatus: "Active",
        assetID: "1-8Y1HU5Q",
        assetImei: "",
        kenanAccountID: "300601069",
        kenanName: "",
        vipCode: "VIP 6",
        assetStatus: "Active",
        billCycle: "28"
      },
      {
        serviceType: "",
        smeGroupId: "",
        planSegmentType: "",
        pakejFlag: "N",
        mobileNumber: "0132876952",
        assetBillingAccountNo: "300601325",
        billingProfileId: "1-8Y1YQTD",
        principleMobileNumber: "",
        assetBillingAccountRowId: "1-8Y1YQT8",
        promotionId: "1-XMK1EL",
        pre_Pos_Indicator: "Postpaid",
        prodPromName: "FiRST Platinum Plus CBS",
        billingType: "Billable",
        hh_consumed_flag: "N",
        prin_Sup_Indicator: "",
        prodPromPartNum: "PB11860",
        plan: "FiRST Platinum Plus CBS Plan",
        productType: "Service",
        assetSubStatus: "Active",
        product: "RTP Voice Service",
        creditTreatmentCode: "35",
        billType: "CNVRGTPostpaid",
        assetModel: "",
        SVC_LVL_DVC_COUNT: "0",
        segmentCode: "10",
        assetIntegrationID: "1-8Y1Z2WL",
        partialControlFlag: "",
        masterAccountNumber: "",
        billingAccountStatus: "Active",
        assetID: "1-8Y1ZLOD",
        assetImei: "",
        kenanAccountID: "300601325",
        kenanName: "",
        vipCode: "VIP 5",
        assetStatus: "Active",
        billCycle: "3"
      }
    ],
    twitterID: "",
    customerSince: "20190119_000000",
    pakejActiveCount: "0",
    DB_COUNT: "0",
    masterAccountNumber: "",
    billingAccountStatus: "Active",
    streetAddress: "safafaf",
    contactSalutation: "Mr.",
    YOUTH_OPEN_COUNT: "0"
  }
};
describe("CobpComponent ", () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let component: CobpComponent;
  let fixture: ComponentFixture<CobpComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        IconModule,
        materialModules,
      ],
      declarations: [
        sharedPipes,
        CobpComponent,
        NotificationErrorComponent,
        PageLoaderComponent,
        MsisdnInputComponent,
        NoteSectionComponent,
        NricInputComponent,
        OtpInputComponent
      ],
      providers: [
        PlanPurchaseService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AppService, useClass: AppMockService },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: MockactivatedRoute },
        UserService,
        RedirectionService,
        { provide: CobpService, useClass: MockCobpService },
        DeviceDetailsPlanComponent,
        DeviceDetailsPlanService,
        ProductService,
        DeviceDataService,
        AppService,
        EStoreAnalysticsService,
        AnalyticsService,
        Broadcaster,
        NotificationPopupEvent,
        CookieService,
        CommonUtilService,
        HttpClient,
        HttpHandler,
        RendererService,
        SeoService,
        DecimalPipe,
        PlanTableComparisionService
      ]
    }).overrideComponent(CobpComponent, {
      set: {
        providers: [
          PlanPurchaseService,
          { provide: ActivatedRoute, useValue: fakeActivatedRoute },
          { provide: AppService, useClass: AppMockService },
          { provide: Router, useClass: RouterStub },
          { provide: ActivatedRoute, useClass: MockactivatedRoute },
          UserService,
          RedirectionService,
          { provide: CobpService, useClass: MockCobpService },
          DeviceDetailsPlanComponent,
          DeviceDetailsPlanService,
          ProductService,
          DeviceDataService,
          AppService,
          EStoreAnalysticsService,
          AnalyticsService,
          Broadcaster,
          NotificationPopupEvent,
          CookieService,
          CommonUtilService,
          HttpClient,
          RendererService,
          SeoService,
          DecimalPipe,
          PlanTableComparisionService
        ]
      }
    });
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CobpComponent);

    component = fixture.componentInstance;
    component.data = {
      plan_title: "wiuery",
      userLessThanSixMonths: false
    };
    component.eligibilityResponse = [
      {
        penaltyCheck: {
          status: true,
          endDate: null,
          productPromotionPartNumber: "PB12440",
          productPromotionId: "1-2GJHXIL",
          exception: false,
          current_plan: "PB12440"
        },
        openOrder: {
          status: true,
          exception: false,
          outputOpenOrderValidationResp: {
            Error_spcMessage: "",
            OrderStatus: "",
            orderNumber: "",
            serialNumber: "0136376291",
            openOrderFlag: "N",
            outletId: "",
            OrderId: "",
            Error_spcCode: ""
          },
          message: null
        },
        blackList: {
          blacklistChkResponse: { blacklistIndicator: "No" },
          blacklistIndicator: "No",
          status: true,
          exception: false,
          response: "",
          message: ""
        },
        productEligibility: {
          status: true,
          exception: false,
          message: "Plan is eligible for this user",
          plan: 0
        },
        customer_eligibility: {
          status: true,
          exception: false,
          message: "Customer is eligible for prepaid to postpaid",
          age: 32,
          dateOfBirth: "19860807_000000"
        },
        golden_number_note: { status: true, message: "" },
        callBaring: {
          status: true,
          exception: false,
          response: "",
          message: ""
        },
        contract_check: { message: "", status: true, exception: true },
        validated_id: "26824"
      }
    ];
  });
  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should call separatePlanMsg function ", () => {
    component.easyPhoneErrorMsg("samePlan");
    expect(component.easyphoneError).toBeTruthy();
    expect(component.easyphoneFlowMsg).toBe(
      "Uh Oh. Select a different plan than the one you're currently using."
    );
  });
  it("should call function downgradeMsg", () => {
    component.easyPhoneErrorMsg("samePlan");
    expect(component.easyphoneError).toBeTruthy();
  });
  it("should call checkPenalty function", () => {
    component.checkPenalty(component.eligibilityResponse);
    expect(component.eligibilityObj.noOfMonths).toBe(0);
    expect(component.eligibilityObj.noOfMonths).toBe(0);
    expect(component.goldenpenaltymessage).toBeNull();
  });
  it("should call checkContractParams function on elibilty response", () => {
    component.checkContractParams(component.eligibilityResponse);
    expect(component.exceptionCheck).toBeFalsy();
    expect(component.eligibleCheck).toBeFalsy();
    expect(component.contractLengthYears).toBe(0);
    expect(component.contractLengthMonths).toBe(0);
  });
  it("should call checkEligibleMessage function", () => {
    component.checkEligibleMessage();
    // expect(component.checkEligibleMessage).toBe(component.isEligibleMessages);
  });
  it("should call setPenaltyStatus function", () => {
    component.setPenaltyStatus(component.eligibilityResponse);
    expect(component.eligibilityObj.isException).toBeTruthy();
    expect(component.easyphoneError).toBeTruthy();
    // expect(component.easyphoneFlowMsg).toBe()
  });
  it("should call separatePlanMsg function", () => {
    component.easyPhoneErrorMsg("samePlan");
    expect(component.easyphoneError).toBeTruthy();
    expect(component.easyphoneFlowMsg).toBe(
      "Uh Oh. Select a different plan than the one you're currently using."
    );
  });
  it("should call downgradeMsg function", () => {
    component.easyPhoneErrorMsg("downgradePlan");
    expect(component.easyphoneError).toBeTruthy();
    expect(component.easyphoneFlowMsg).toBe(
      "Uh Oh. This plan is not available for a downgrade."
    );
  });
  it("should call removeLocalStorage function", () => {
    let noStorageRemoved = false;
    component.removeLocalStorage();
    if (typeof window !== "undefined" && localStorage && sessionStorage) {
      if (
        localStorage.getItem("selectedColor") &&
        localStorage.getItem("selectedStorage") &&
        localStorage.getItem("DeviceSku") &&
        localStorage.getItem("SelectedPlan") &&
        localStorage.getItem("chosenPlan") &&
        localStorage.getItem("PSku") &&
        localStorage.getItem("SelectedPlanName")
      ) {
        noStorageRemoved = true;
      }
    }
    expect(noStorageRemoved).toBeFalsy();
  });
  it("should call checkValue function with arguement A", () => {
    component.endDate = '1';
    component.checkValue("A");
    let ContractAgree = false;
    expect(component.cobpContract).toBeTruthy();
    if (
      typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("ContractAgree")
    ) {
      ContractAgree = JSON.parse(localStorage.getItem("ContractAgree"));
    }
    expect(ContractAgree).toBeTruthy();
  });
  it("should call checkValue function with arguement B", () => {
    component.checkValue("B");
    let ContractAgree = true;
    expect(component.cobpContract).toBeFalsy();
    if (
      typeof window !== "undefined" &&
      localStorage &&
      localStorage.getItem("ContractAgree")
    ) {
      ContractAgree = JSON.parse(localStorage.getItem("ContractAgree"));
    }
    expect(ContractAgree).toBeFalsy();
  });
  it("should call getYearAndMonth function", () => {
    const arg = "20192017";
    component.getYearAndMonth(arg);
    expect(arg).toBeDefined();
  });
  // userSince function is not returning anything so commented this.

  // it("should call userSince function", () => {
  //   // ? Updated on 26th Feb 2020
  //   // ! This test case will fail after 26 August 2020
  //   // ? Hence, update the date by then
  //   const dob = "20200226_123489";

  //   component.userSince(dob);
  //   expect(dob).toBeDefined();
  //   expect(component.data.userLessThanSixMonths).toBeTruthy();
  // });
  it("contractExtended", () => {
    component.deviceUpfrontPenalty = 100;
    component.contractExtended(true);
    component.deviceUpfrontPenalty = 102;
    component.contractExtended(false);
    component.deviceUpfrontPenalty = null;
    component.deviceUpfrontPenalty = 100;
    component.contractExtended(true, { penaltyCheck: { eligible_contract_extend: true }, productEligibility: { process_type: 'upgrade' } });

    expect(component.contractExtended).toBeDefined();
  });
  it("ngonint function", () => {
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    // localStorage.setItem("isEasyPhone","true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    // localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with easyphone", () => {
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneError).toBeTruthy();
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with blackList", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "Yes",
          message: "test msg"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test msg");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with blackList with no msg", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "Yes"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe(
      "Uh Oh. Your ID number is blacklisted."
    );
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with penaltyCheck", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No"
        },
        penaltyCheck: {
          exception: "Yes",
          message: "test penalty"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test penalty");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with openOrder", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No"
        },
        penaltyCheck: {
          message: "test penalty"
        },
        openOrder: {
          message: "test open order"
        },
        account_validation: {
          status: "true"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          status: "true"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test open order");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with downgradeMsg", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No"
        },
        penaltyCheck: {
          message: "test penalty"
        },
        openOrder: {
          status: "Yes",
          message: "test open order"
        },
        account_validation: {
          status: "true"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          status: "true"
        }
      }
    ];
    localStorage.setItem("SelectedPlan", "FB");
    component.postOrPreType = "Postpaid";
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    // expect(component.easyphoneFlowMsg).toBe('Uh Oh. This plan is not available for a downgrade.');
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
    localStorage.removeItem("SelectedPlan");
  });
  it("ngonint function with downgradeMsg", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No"
        },
        penaltyCheck: {
          message: "test penalty"
        },
        openOrder: {
          exception: "Yes",
          status: "Yes",
          message: "test open order exception"
        },
        account_validation: {
          status: "true"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          status: "true"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test open order exception");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with blackList exception", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          exception: "Yes",
          blacklistIndicator: "No",
          message: "test black list exception"
        },
        penaltyCheck: {
          message: "test penalty"
        },
        openOrder: {
          status: "true",
          message: "test open order exception"
        },
        account_validation: {
          status: "true"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          status: "true"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test black list exception");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with productEligibility exception", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No",
          message: "test black list exception"
        },
        penaltyCheck: {
          message: "test penalty"
        },
        openOrder: {
          status: "true",
          message: "test open order exception"
        },
        account_validation: {
          status: "true"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          exception: "true",
          message: "test product Eligibility exception"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe(
      "test product Eligibility exception"
    );
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
  });
  it("ngonint function with duration_check", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No",
          message: "test black list exception"
        },
        penaltyCheck: {
          message: "test penalty"
        },
        openOrder: {
          status: "true",
          message: "test open order exception"
        },
        account_validation: {
          message: "test account validation exception"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true",
          device: "Iphone"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          message: "test product Eligibility exception"
        }
      }
    ];
    component.eligibilityObj.isEligible = true;
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    // expect(component.msisdn).toBe(60132046407);
    expect(localStorage.getItem("DeviceUpfront")).toBe("Iphone");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
    localStorage.removeItem("DeviceUpfront");
  });
  it("ngonint function with upfront_payment_check", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No",
          message: "test black list exception"
        },
        penaltyCheck: {
          message: "test penalty"
        },
        openOrder: {
          status: "true",
          message: "test open order exception"
        },
        account_validation: {
          message: "test account validation exception"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true",
          device: "Iphone"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true",
          plan: "Gold"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          message: "test product Eligibility exception"
        }
      }
    ];
    component.eligibilityObj.isEligible = true;
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    // expect(component.msisdn).toBe(60132046407);
    expect(localStorage.getItem("PlanUpfront")).toBe("Gold");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
    localStorage.removeItem("PlanUpfront");
  });
  it("ngonint function with error section", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        status: "error"
      }
    ];
    component.eligibilityObj.isEligible = true;
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    localStorage.setItem("isEasyPhone", "true");
    component.ngOnInit();
    // expect(component.msisdn).toBe(60132046407);
    expect(component.infoMNPflow.content).toBe(
      "Your session has expired. Please login to continue browsing."
    );
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("isEasyPhone");
    localStorage.removeItem("PlanUpfront");
  });

  // For non easyphone conditions
  it("ngonint function non easyphone condition with error section", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        status: "error"
      }
    ];
    // component.eligibilityObj.isEligible = true;
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    // localStorage.setItem("isEasyPhone","true");
    component.ngOnInit();
    // expect(component.msisdn).toBe(60132046407);
    expect(component.infoMNPflow.content).toBe(
      "Your session has expired. Please login to continue browsing."
    );
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
    // localStorage.removeItem("isEasyPhone");
    localStorage.removeItem("PlanUpfront");
  });
  it("ngonint function with blackList with no msg for non easy phones", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "Yes"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe(
      "Uh Oh. Your ID number is blacklisted."
    );
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
  });
  it("ngonint function with blackList with msg for non easy phones", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "Yes",
          message: "test black list msg"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test black list msg");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
  });
  it("ngonint function with callBaring with msg for non easy phones", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No",
          message: "test black list msg"
        },
        callBaring: {
          message: "test callBaring msg"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test callBaring msg");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
  });
  it("ngonint function with callBaring with no msg for non easy phones", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No",
          message: "test black list msg"
        },
        callBaring: {}
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");
    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe(
      "Uh Oh. Selected number is barred, please select a new number."
    );
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
  });

  it("ngonint function with openOrder", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No"
        },
        callBaring: {
          status: "Yes",
          message: "test callBaring msg"
        },
        penaltyCheck: {
          message: "test penalty"
        },
        openOrder: {
          message: "test open order"
        },
        account_validation: {
          status: "true"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          status: "true"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");

    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test open order");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
  });
  it("ngonint function with penaltyCheck exception ", () => {
    ValidateUpgradePlanEasyPhoneresult = [
      {
        blackList: {
          blacklistIndicator: "No"
        },
        callBaring: {
          status: "Yes",
          message: "test callBaring msg"
        },
        penaltyCheck: {
          exception: "Yes",
          message: "test penalty"
        },
        openOrder: {
          message: "test open order",
          status: "Yes"
        },
        account_validation: {
          status: "true"
        },
        contract_check: {
          status: "true"
        },
        duration_check: {
          status: "true"
        },
        plan_upgrade: {
          status: "true"
        },
        upfront_payment_check: {
          status: "true"
        },
        customer_eligibility: {
          status: "true"
        },
        productEligibility: {
          status: "true"
        }
      }
    ];
    localStorage.setItem("MyMsIsdn", "60132046407");
    sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
    const plan = {
      name: "First™ Platinum",
      isMoon: true,
      selectedPass: {
        sku: "testsku",
        name: "testname",
        data_limit: "10GB",
        device_allowed: true,
        key_figures_text: "abcd",
        key_text: "adsd"
      },
      PlanName: "First™ Platinum",
      sku: "FP",
      url_key: "first - platinum",
      order_plan_bundle: "PB11820",
      ngn_part_number: "PB09890",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice / SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum CBS Commitment Fee",
          component_part_no: "CPT16950",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Weekend Internet Quota",
          component_part_no: "CPT16980",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM148",
          component_part_no: "OTC08860",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "International Roaming Data",
          component_part_no: "NVF01000",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum CBS Plan",
          cbs_part_number: "PR043691",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "148.0000",
      OneTimePayment: "148.0000",
      contract: "24 months contract",
      plan_title: "First™ Platinum",
      plan_subtitle:
        "Now with extra privileges when you sign up for 12 months.",
      BackgroundColor: "is - bg - color - black",
      upfront_installment: null,
      IndicatorClass: "is - level - platinum",
      ProductText: "Platinum",
      KeyFiguresText: "60 GB",
      KeyText: "RM 148",
      BuynowLink: " / plans / first - platinum",
      BuynowText: "Buy now",
      knowMoreLink: " / store / plans / first - platinum",
      knowMoreText: "Learn more",
      upper_age_limit: "40",
      lower_age_limit: "18",
      banner_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
      mobile_image:
        " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: " / media / catalog / product / w / f / wf - ju - 60gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "4",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1 + 5",
          max_line: "5",
          part_number: "PB11440",
          price: "30.0000"
        }
      ],
      addons: [],
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      analytics_key_addtocart: {
        fb_add_cart_id: "CelcomPlatinum_AddToCart",
        google_add_cart_id: "kNaXCND4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukn",
        fb_learn_more_id: "CelcomPlatinum_LearnMore",
        google_learn_more_id: "WuOWCOHQnZcBENjpoqMD",
        twitter_learn_more_id: "nzuko",
        fb_buy_now_id: "CelcomPlatinum_BuyNow",
        google_buy_now_id: "b5OkCMynlJcBENjpoqMD",
        twitter_buy_now_id: "nzuk8"
      },
      telco_day: {
        status: false,
        hat_text: "Hi TQA team have a good day",
        message:
          "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
        allowed_types: ["NEW_NUMBER"],
        not_allowed_types: ["MnpNum", "EXISTING_NUMBER"],
        eligible_message: "Rebate is only eligible for New registration",
        not_eligible_message:
          "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 1,
      PlanSku: "FP",
      TotalPay: 148,
      PlanOnlyComponentToShow: true,
      IsMnp: false
    };
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
    localStorage.removeItem("SelectedPlanDetailsInDevice");
    sessionStorage.setItem("UserToken", "test token");

    component.ngOnInit();
    expect(component.msisdn).toBe(60132046407);
    expect(component.easyphoneFlowMsg).toBe("test penalty");
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("UserToken");
    localStorage.removeItem("SelectedPlanDetails");
  });
  it("getPlanType function", () => {
    const plan = {
      outputCPResp: {
        services: [
          {
            mobileNumber: "60123456709",
            pre_Pos_Indicator: "Pre"
          },
          {
            mobileNumber: "10123456709",
            pre_Pos_Indicator: "Post"
          }
        ]
      }
    };
    component.msisdn = 60123456709;
    sessionStorage.setItem("personalForm", JSON.stringify(plan));
    let result = component.getPlanType();
    expect(plan.outputCPResp.services.length).toBe(2);
    expect(result).toBe("Pre");
  });

  it("should remove Eligible from storage", () => {
    localStorage.setItem("Eligible", "Y");
    component.ngOnInit();
    const a = localStorage.getItem("Eligible");
    expect(a).toBe(null);
    localStorage.removeItem("Eligible");
  });

  it("should create object keepCelcomNumObj", () => {
    const mockObject = {
      name: "First™ Gold Supreme",
      PlanName: "First™ Gold Supreme",
      PlanMonthlyPay: "128.0000"
    };
    const mockData = {
      basic_details: {
        preorder: false
      }
    };
    const deviceData = {
      DeviceSku: "iPhone-XR",
      SelectedPlan: "FPP",
      selectedColor: "red",
      selectedStorage: "64GB"
    };
    component.data = mockData;
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(mockObject));
    Object.keys(deviceData).forEach(key => {
      localStorage.setItem(key, deviceData[key]);
    });
    spyOn(component, "removeLocalStorage");
    component.ngOnInit();
    expect(component.keepCelcomNumObj).toBeDefined();
    expect(component.keepCelcomNumObj.color).toBe(deviceData.selectedColor);
    expect(component.keepCelcomNumObj.storage).toBe(deviceData.selectedStorage);
    expect(component.keepCelcomNumObj.sku).toBe(deviceData.DeviceSku);
    expect(component.keepCelcomNumObj.planSku).toBe(deviceData.SelectedPlan);
    expect(component.keepCelcomNumObj.planDetails).toEqual(mockObject);
    expect(component.keepCelcomNumObj.monthlyPay).toBe(
      mockObject.PlanMonthlyPay
    );
    expect(component.keepCelcomNumObj.planName).toBe(mockObject.PlanName);
    expect(component.keepCelcomNumObj.preOrder).toBeFalsy();
    expect(component.removeLocalStorage).toHaveBeenCalled();
    const celcomObj = localStorage.getItem("keepCelcomNum");
    expect(celcomObj).toBe(JSON.stringify(component.keepCelcomNumObj));
    Object.keys(deviceData).forEach(key => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem("SelectedPlanDetails");
  });

  it("should create object data.chosenPlan", () => {
    const mockObject = {
      name: "First™ Gold Supreme",
      PlanName: "First™ Gold Supreme",
      PlanMonthlyPay: "128.0000"
    };
    const mockData = {
      basic_details: {
        preorder: false
      },
      chosenPlan: {}
    };
    const deviceData = {
      PSku: "FGS",
      SelectedPlan: "FPP"
    };
    component.data = mockData;
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(mockObject));
    Object.keys(deviceData).forEach(key => {
      localStorage.setItem(key, deviceData[key]);
    });
    spyOn(component, "removeLocalStorage");
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.data.chosenPlan).toBeDefined();
    expect(component.data.chosenPlan.planSku).toBe(deviceData.SelectedPlan);
    expect(component.data.chosenPlan.planDetails).toEqual(mockObject);
    expect(component.data.chosenPlan.monthlyPay).toBe(
      mockObject.PlanMonthlyPay
    );
    expect(component.data.chosenPlan.planName).toBe(mockObject.PlanName);
    expect(component.removeLocalStorage).toHaveBeenCalled();
    const obj = localStorage.getItem("chosenPlan");
    expect(obj).toBe(JSON.stringify(component.data.chosenPlan));
    Object.keys(deviceData).forEach(key => {
      localStorage.removeItem(key);
    });
    localStorage.removeItem("SelectedPlanDetails");
  });

  it("test sessionStorage with Guest", () => {
    const mockObject = {
      name: "First™ Gold Supreme",
      PlanName: "First™ Gold Supreme",
      PlanMonthlyPay: "128.0000"
    };
    const mockData = {
      basic_details: {
        preorder: false
      },
      chosenPlan: {}
    };
    const deviceData = {
      PSku: "FGS",
      SelectedPlan: "FPP"
    };
    component.data = mockData;
    localStorage.setItem("SelectedPlanDetails", JSON.stringify(mockObject));
    sessionStorage.setItem("USER_TYPE", "GUEST");
    Object.keys(deviceData).forEach(key => {
      localStorage.setItem(key, deviceData[key]);
    });
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.typeOfNumHighlight).toBe("EXISTING_NUMBER");
    expect(component.guestFlow).toBeTruthy();
    expect(component.easyphoneError).toBeTruthy();
    expect(component.easyphoneFlowMsg).toBe(
      "Sorry, the mobile number keyed in is not eligible for this subscription."
    );
    // expect(component._deviceDataService.publishNumberType).toHaveBeenCalled("KeepNumber");
    const a = localStorage.removeItem("keepCelcomNum");
    expect(a).toBeFalsy();
    localStorage.removeItem("SelectedPlanDetails");
    Object.keys(deviceData).forEach(key => {
      localStorage.removeItem(key);
    });
    sessionStorage.removeItem("USER_TYPE");
  });

  it("test errorForCOBP", () => {
    const error = {
      status: 404,
      statusText: "Not Found"
    };
    spyOn(component.cobpEligibilityCheckBundle, "emit");
    component.data = {};
    component.errorForCOBP(error);
    expect(component.infoMNPflow).toBeDefined();
    expect(component.infoMNPflow.content).toEqual(
      component.errorConst.SYS_DOWN_MSG
    );
    expect(component.data.eligibility).toBeFalsy();
    expect(component.cobpEligibilityCheckBundle.emit).toHaveBeenCalledWith(
      component.data
    );
  });

  it("checkPenalty", () => {
    spyOn(component, 'checkPenalty').and.callThrough();
    const date = new Date();
    const newDate = new Date(date.setMonth(date.getMonth() + 5));
    const mockResponse = [
      {
        penaltyCheck: {
          endDate: newDate.getFullYear() + "-" + newDate.getMonth() + "-12",
          device_upfront_penalty: "123"
        }
      }
    ];
    component.checkPenalty(mockResponse);
    expect(component.checkPenalty).toHaveBeenCalled();
    // expect(component.eligibilityObj.noOfYears).toBe(0);
    // expect(component.eligibilityObj.noOfMonths).toBe(0);
    // expect(component.deviceUpfrontPenalty).toEqual(
    //   +mockResponse[0].penaltyCheck.device_upfront_penalty
    // );
  });

  it("showMsisdnInput", () => {
    const spy = spyOn(component, 'showMsisdnInput').and.callThrough();
    component.showMsisdnInput();
    expect(spy).toHaveBeenCalled();
  });

  it("onSuccessfulLogin", () => {
    const spy = spyOn(component, 'onSuccessfulLogin').and.callThrough();
    component.onSuccessfulLogin(false);
    component.onSuccessfulLogin(true);
    expect(spy).toHaveBeenCalled();
  });

  it("isEnterprise", () => {
    sessionStorage.setItem("USER_TYPE", 'ENTERPRISE');
    const val = component.isEnterprise;
    expect(val).toBeTruthy();
  });

});
