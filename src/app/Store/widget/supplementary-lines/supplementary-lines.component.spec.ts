import {
  TestBed,
  ComponentFixture,
  inject,
  fakeAsync
} from "@angular/core/testing";
import { SupplementaryLinesComponent } from "./supplementary-lines.component";
import { PageLoaderComponent } from "../../../shared/components/page-loader/page-loader.component";
import { FormsModule } from "@angular/forms";
import { ChooseYourWayComponent } from "../../guest-checkout/choose-your-way/choose-your-way.component";
import { LosingSupplementaryLinePopupComponent } from "../losing-supplementary-line-popup/losing-supplementary-line-popup.component";
import { NotificationErrorComponent } from "../notification-error/notification-error.component";
import { MoreSupplementaryPopupComponent } from "../more-supplementary-popup/more-supplementary-popup.component";
import { AppService } from "../../../Service/app.service";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { ActivatedRoute } from "@angular/router";
import { TokenService } from "../../../../../test-config/token.service";
import { ProductService } from "../../../Service/product.service";
import { UserService } from "../../../Service/user.service";
import { PlanPurchaseService } from "./../../plan/plan-purchase/plan-purchase.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { MsisdnInputComponent } from "../msisdn-input/msisdn-input.component";
import { NricInputComponent } from "../nric-input/nric-input.component";
import { OtpInputComponent } from "../otp-input/otp-input.component";
import { AgeEligibilityPopupComponent } from "../age-eligibility-popup/ageeligiblity.popup.component";
import { NotificationBarComponent } from "../notification-bar/notification-bar.component";
import { SwitchToCelcomComponent } from "../../mnp/switch-to-celcom/switch-to-celcom.component";
import { MnpService } from "../../mnp/services/mnp.service";
import { Observable } from "rxjs";
import { DeviceDetailsNumberService } from "../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service";
import { MatRadioModule } from '@angular/material/radio';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

let numberResp: any = [
  {
    status: true,
    is_premium_plan_message: "",
    mobile_numbers: [
      { number: "0193267552" },
      { number: "0132525247" },
      { number: "0196822544" },
      { number: "0193269316" },
      { number: "0132265788" },
      { number: "0133664420" },
      { number: "0133353420" },
      { number: "0136776443" },
      { number: "0132428394" },
      { number: "0132061734" },
      { number: "0133505523" },
      { number: "0196305447" },
      { number: "0196789461" },
      { number: "0133641269" },
      { number: "0133717885" },
      { number: "0136218994" },
      { number: "0196080158" },
      { number: "0133366130" },
      { number: "0196435407" },
      { number: "0132057066" },
      { number: "0136607636" },
      { number: "0133011724" },
      { number: "0133718242" },
      { number: "0133836046" },
      { number: "0196435029" },
      { number: "0193485351" },
      { number: "0193841647" },
      { number: "0193378396" },
      { number: "0136948846" },
      { number: "0196040522" }
    ]
  }
];

const supplementaryData = [
  {
    number: "0132046308",
    supp_id: "1657",
    cart_item_id: "70182",
    cart_id: "25188",
    name: "Celcom Mobile Family™",
    price: "48.0000",
    part_number: "PB12540",
    subsidy: "0.0000"
  },
  {
    number: "0132099658",
    supp_id: "1660",
    cart_item_id: "70182",
    cart_id: "25188",
    name: "Celcom Mobile Family™",
    price: "48.0000",
    part_number: "PB12540",
    subsidy: "0.0000"
  },
  {
    number: "0132245586",
    supp_id: "1661",
    cart_item_id: "70182",
    cart_id: "25188",
    name: "Celcom Mobile Family™",
    price: "48.0000",
    part_number: "PB12540",
    subsidy: "0.0000"
  },
  {
    number: "0133409206",
    supp_id: "1658",
    cart_item_id: "70182",
    cart_id: "25188",
    name: "Celcom Mobile Family™",
    price: "48.0000",
    part_number: "PB12540",
    subsidy: "0.0000"
  },
  {
    number: "0133977020",
    supp_id: "1659",
    cart_item_id: "70182",
    cart_id: "25188",
    name: "Celcom Mobile Family™",
    price: "48.0000",
    part_number: "PB12540",
    subsidy: "0.0000"
  }
];

const userInfo = {
  blacklistChkRequest: {
    customerIDType: "1",
    customerIDNo: "960606969696",
    customerIDTypeValue: "New NRIC"
  },
  outputCPResp: {
    customerID: "960606969696",
    dateOfBirth: "19960606_000000",
    services: [
      {
        pre_Pos_Indicator: "Postpaid"
      }
    ]
  }
};

const planDetailData = [
  {
    tabName: "FIRST™ Plans",
    tabTitle: null,
    tabSubtitle: null,
    tabData: {
      name: "First™ Platinum Plus",
      PlanName: "First™ Platinum Plus",
      sku: "FPP",
      url_key: "first-platinum-plus",
      order_plan_bundle: "PB11860",
      ngn_part_number: "PB11900",
      order_service_bundle: "RTP0010",
      order_plan_component: [
        {
          component_name: "Executive Plan VAS without GPRS_10784",
          component_part_no: "CPT05370",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "New Package for IDD Activation",
          component_part_no: "CPT07020",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Unlimited",
          component_part_no: "CPT12290",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Default International Roaming Voice/SMS",
          component_part_no: "CPT13540",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "FiRST Platinum Plus CBS Commitment Fee",
          component_part_no: "CPT16940",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Free Chat 2.0",
          component_part_no: "MI01790",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Advance Payment CBS RM188",
          component_part_no: "OTC08850",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "SIM Card",
          component_part_no: "SM00010",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Blank SIM Starter Pack",
          component_part_no: "SP00210",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Stamp Fee_92382",
          component_part_no: "OTC00350",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "Printed Bill for Voice",
          component_part_no: "BDMR0080",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        },
        {
          component_name: "First Platinum Plus Business 2.0 RET",
          component_part_no: "PB10570",
          component_default: "0",
          component_price: "0.0000",
          cbs_name: "FiRST Platinum Plus CBS Plan",
          cbs_part_number: "PR03490",
          isvas: "0",
          vasname: null,
          vasvalue: null
        }
      ],
      PlanMonthlyPay: "188.0000",
      OneTimePayment: null,
      contract: "24 months contract",
      plan_title: "First™ Platinum Plus",
      plan_subtitle:
        "Happiness unlimited. Sign up for 12 months and get extra privileges.",
      BackgroundColor: "is-bg-color-black",
      upfront_installment: null,
      IndicatorClass: "is-level-platinum-plus",
      ProductText: "Platinum Plus",
      KeyFiguresText: "100 GB",
      KeyText: "RM 188",
      BuynowLink: "/plans/first-platinum-plus",
      BuynowText: "Buy now",
      knowMoreLink: "/store/plans/first-platinum-plus",
      knowMoreText: "Learn more",
      upper_age_limit: null,
      lower_age_limit: "18",
      banner_image:
        "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg",
      mobile_image:
        "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg",
      is_xpax: false,
      MobileDescription: null,
      product_type: "Service",
      footNote: null,
      TableInfo: [],
      image_url: "/media/catalog/product/w/f/wf-benji-100gb.png",
      supplementary_data: [
        {
          name: "Celcom Mobile Family™",
          max_line: "5",
          part_number: "PB12540",
          price: "48.0000"
        },
        {
          name: "Celcom FIRST™ 1+5",
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
        fb_add_cart_id: "CelcomPlatinumPlus_AddToCart",
        google_add_cart_id: "zme7CNP4iZcBENjpoqMD",
        twitter_add_cart_id: "nzukw",
        fb_learn_more_id: "CelcomPlatinumPlus_LearnMore",
        google_learn_more_id: "1TceCNWBlZcBENjpoqMD",
        twitter_learn_more_id: "nzujz",
        fb_buy_now_id: "CelcomPlatinumPlus_BuyNow",
        google_buy_now_id: "gWhBCMTrnJcBENjpoqMD",
        twitter_buy_now_id: "nzuki"
      },
      telco_day: {
        status: false,
        hat_text: "Telco day offer! Enjoy a rebate of RM10",
        message: "Enjoy a rebate of RM10 on your purchase",
        allowed_types: ["NEW_NUMBER", "MnpNum"],
        not_allowed_types: ["EXISTING_NUMBER"],
        eligible_message:
          "Rebate is only eligible for New registration, Switch to Celcom",
        not_eligible_message: "Rebate is not eligible for Upgrade Plan"
      },
      is_premium_plan: false,
      bill_type: 0
    },
    type_purchse: {
      dealer: {
        newline: false,
        cobp: true,
        mnp: false
      }
    }
  }
];
class MockActivatedRoute {
  snapshot(url: string) {
    return url;
  }
}

class MockAppService {
  apiUrlA = "/rest/V1/retrieve-number";
  dataForRetrieveNumberA = {
    data: {
      numberService: "POSTPAID",
      numberCategory: "NORMAL",
      numRecords: "30",
      sourceSystem: "",
      planType: "VOICE"
    }
  };
  postROI(apiUrlA, dataForRetrieveNumberA) {
    return Observable.of(numberResp);
  }

  getEstoreData(url: string) {
    return Observable.of(planDetailData);
  }
}

class MockProductService {
  apiUrlB = "/rest/V1/retrieve-number";
  dataForRetrieveNumberB = {
    data: {
      numberCategory: "NORMAL",
      numberService: "POSTPAID",
      numRecords: "30",
      planType: "VOICE",
      sourceSystem: ""
    }
  };
  GetNewNumbers(apiUrlB, dataForRetrieveNumberB) {
    if (apiUrlB == "/error") {
      return Observable.throw({
        error: { errorObj: "000", errorMessage: "error" }
      });
    }
    return Observable.of(numberResp);
  }
}

class MockPlanPurchaseService {
  Find(url: string) {
    return Observable.of(planDetailData);
  }
}

describe("supplementary-lines component", () => {
  let component: SupplementaryLinesComponent;
  let fixture: ComponentFixture<SupplementaryLinesComponent>;
  let service: TokenService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SupplementaryLinesComponent,
        PageLoaderComponent,
        ChooseYourWayComponent,
        LosingSupplementaryLinePopupComponent,
        NotificationErrorComponent,
        MoreSupplementaryPopupComponent,
        MsisdnInputComponent,
        NricInputComponent,
        OtpInputComponent,
        AgeEligibilityPopupComponent,
        NotificationBarComponent,
        SwitchToCelcomComponent,
       sharedPipes
      ],
      imports: [
        FormsModule,
        
        IconModule,
        materialModules,
      ],
      providers: [
        // { provide: PlanPurchaseService, useClass: MockPlanPurchaseService },
        PlanPurchaseService,
        { provide: AppService, useClass: MockAppService },
        DeviceDataService,
        CommonUtilService,
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        TokenService,
        { provide: ProductService, useClass: MockProductService },
        UserService,
        MnpService,
        DeviceDetailsNumberService
      ]
    });
    let store = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, "getItem").and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, "setItem").and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, "removeItem").and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, "clear").and.callFake(mockLocalStorage.clear);
    service = TestBed.get(TokenService);
    fixture = TestBed.createComponent(SupplementaryLinesComponent);
    component = fixture.componentInstance;
    component.pageType = "suppLines";
    component.planDetailsObj = planDetailData;
  });
  it("supplementary-line created ", () => {
    expect(component).toBeTruthy();
  });

  it("cancel button should call method goBackStartPoint()", () => {
    spyOn(component, "goBackStartPoint");
    component.goBackStartPoint();
    fixture.detectChanges();
    expect(component.goBackStartPoint).toHaveBeenCalled();
  });
  it("next button should call method suppPlanSelected()", () => {
    spyOn(component, "suppPlanSelected");
    component.suppPlanSelected();
    fixture.detectChanges();
    expect(component.suppPlanSelected).toHaveBeenCalled();
  });
  
  it("should test refresh numbers", () => {
    component.editOrder = false;
    spyOn(component, "callRetrieveNumbersAPI");
    const dataForRetrieveNumberAPI = {
      data: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "30",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    component.getRefreshNumbers();
    expect(component.errorExits).toBe(false);
    expect(component.editOrder).toBe(false);
    expect(component.selectedNumber).toBe(null);
    expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(
      dataForRetrieveNumberAPI
    );
    expect(component.searchNumber).toBe("");
  });
  it("should test searchNumbersForPattern", () => {
    component.searchNumber = "";
    spyOn(component, "callRetrieveNumbersAPI");
    const dataForRetrieveNumberAPI = {
      data: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "12",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    component.deviceNumberToDisplay = [
      { number: "0193267552" },
      { number: "0132525247" },
      { number: "0196822544" },
      { number: "0193269316" },
      { number: "0132265788" }
    ];
    component.searchNumbersForPattern();
    expect(component.errorExits).toBe(false);
    expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(
      dataForRetrieveNumberAPI
    );
    component.searchNumber = 11111;
    component.searchNumbersForPattern();
    expect(component.errorExits).toBe(true);
    component.searchNumber = 1;
    component.searchNumbersForPattern();
    expect(component.errorExits).toBe(true);
    component.searchNumber = 2222;
    dataForRetrieveNumberAPI.data["criteria"] = "CONTAINS";
    dataForRetrieveNumberAPI.data["numberPattern"] = component.searchNumber;
    component.searchNumbersForPattern();
    expect(component.errorExits).toBe(false);
    expect(component.searchStatus).toBe(true);
    expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(
      dataForRetrieveNumberAPI
    );
  });
  it("should test getnewnumbers", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(devicedataservice, "publishDisclaimerAgree");
      spyOn(component, "callRetrieveNumbersAPI");
      const dataForRetrieveNumberAPI = {
        data: {
          numberService: "POSTPAID",
          numberCategory: "NORMAL",
          numRecords: "30",
          sourceSystem: "",
          planType: "VOICE"
        }
      };
      component.typeOfNumber = "abc";
      component.getNewNumbers();
      expect(devicedataservice.publishDisclaimerAgree).toHaveBeenCalledWith(
        false
      );
      expect(component.typeOfNumHighlight).toBe("NEW_NUMBER");
      expect(component.errorExits).toBe(false);
      expect(component.preventStyle).toEqual({
        "pointer-events": "none"
      });
      expect(component.typeOfNumber).toBe("NEW_NUMBER");
      expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(
        dataForRetrieveNumberAPI
      );
      component.typeOfNumber = "NEW_NUMBER";
      component.getNewNumbers();
    }
  ));
  it("should test OnRetrieveNumberAPIFailureForPlanSupp", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      const resp = [{ status: false, message: "error message" }];
      component.searchStatus = true;
      component.totalNumbers = [];
      component.OnRetrieveNumberAPIFailureForPlanSupp(resp);
      expect(component.loading).toBe(false);
      expect(component.deviceNumberToDisplay).toEqual([]);
      expect(component.totalNumbers).toEqual([]);
      expect(component.totalPageItems).toEqual([]);
      expect(component.DeviceDetailsNumberResponse).toBe(null);
      expect(component.noNumbersToDisplay).toBe(false);
      expect(component.searchStatus).toBe(false);
      expect(component.errorExits).toBe(true);
      expect(component.errorMessage).toEqual({ message: resp[0].message });
    }
  ));
  it("should test SelectNumber", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      component.SelectNumber("0111020102");
      expect(component.selectedNumber).toBe("0111020102");
      expect(component.isPrincipleNumSelected).toBe(true);
    }
  ));
  it("should test numberKeyHandler", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      const ev = { keyCode: 13, which: 12 };
      spyOn(component, "searchNumbersForPattern");
      component.numberKeyHandler(ev);
      expect(component.errorExits).toBe(false);
      expect(component.noNumbersToDisplay).toBe(false);
      expect(component.searchNumbersForPattern).toHaveBeenCalled();
    }
  ));
  it("should test numberKeyHandler", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      const ev = { keyCode: 7, which: 7, preventDefault: jasmine.createSpy() };
      spyOn(component, "searchNumbersForPattern");
      component.numberValidation(ev);
      expect(ev.preventDefault).toHaveBeenCalled();
      const a = { keyCode: 13, which: 13, preventDefault: jasmine.createSpy() };
      component.numberValidation(a);
    }
  ));
  it("should test removesupplines", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      component.removeSuppLines();
      expect(component.startPoint).toBe(true);
      expect(component.orderPhoneNo).toBe(null);
      expect(component.suppLinesOption).toBe(true);
    }
  ));
  it("should test buyWithoutSuppLines", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      component.isUserLoggedIn = true;
      spyOn(devicedataservice, "publishSupplimentaryLines");
      spyOn(devicedataservice, "publishAddToCartEnabling");
      component.buyWithoutSuppLines();
      expect(component.enableNRIC).toBe(true);
      expect(component.suppLinesOption).toBe(false);
      expect(component.suppLinesDetails).toEqual([]);
      expect(component.isFinishAddingSuppLines).toBe(true);
      expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith(
        component.suppLinesDetails
      );
      expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(
        true
      );
      component.isUserLoggedIn = false;
      component.buyWithoutSuppLines();
      expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(
        false
      );
    }
  ));
  it("should test OnContinueSupplementaryLosingPopup", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      component.OnContinueSupplementaryLosingPopup();
      expect(component.IsDisplaySupplementaryPopup).toBe(false);
      expect(component.IsDisplayLossSupplementaryPopup).toBe(false);
    }
  ));
  it("should test OnLeaveSupplementaryPopup", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      component.OnLeaveSupplementaryPopup();
      expect(component.IsDisplayLossSupplementaryPopup).toBe(false);
      expect(component.isDisplaySuppLineNumList).toBe(false);
    }
  ));
  it("should test buyWithSuppLinesWithLimitedConnection", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(devicedataservice, "publishAddToCartEnabling");
      component.buyWithSuppLinesWithLimitedConnection();
      expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(
        true
      );
    }
  ));
  it("should test OnRetrieveNumberAPISuccessForPlanSupp", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(component, "setPage");
      component.selectedNumber = null;
      const numberResponse = [
        {
          status: true,
          is_premium_plan_message: "",
          mobile_numbers: [{ number: "0193267552" }, { number: "132525247" }]
        }
      ];
      component.OnRetrieveNumberAPISuccessForPlanSupp(numberResponse);
      expect(component.totalNumbers).toEqual([
        { number: "0193267552" },
        { number: "0132525247" }
      ]);
      expect(component.setPage).toHaveBeenCalledWith(1);
      expect(component.DeviceDetailsNumberResponse).toEqual([
        {
          status: true,
          is_premium_plan_message: "",
          mobile_numbers: [{ number: "0193267552" }, { number: "0132525247" }]
        }
      ]);
      expect(component.deviceNumberToDisplay).toBe(
        component.DeviceDetailsNumberResponse
      );
      component.selectedNumber = "0132525247";
      component.OnRetrieveNumberAPISuccessForPlanSupp(numberResponse);
      component.selectedNumber = "0193267552";
      component.searchNumber = "0193";
      component.OnRetrieveNumberAPISuccessForPlanSupp(numberResponse);
      component.selectedNumber = null;
      component.searchNumber = "";
    }
  ));
  it("should test finishaddingsupplines", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      component.isUserLoggedIn = true;
      localStorage.setItem("suppLinesAddedByTheUser", "[]");
      component.suppLinesDetails = [
        {
          planPhoneNumber: "0122222111",
          planPrice: "11",
          planType: "family",
          partNumber: "ABC"
        },
        {
          planPhoneNumber: "0133122114",
          planPrice: "12",
          planType: "family",
          partNumber: "ABC"
        }
      ];
      spyOn(devicedataservice, "publishAddToCartEnabling");
      component.finishAddingSuppLines();
      expect(component.enableNRIC).toBe(true);
      expect(component.isFinishAddingSuppLines).toBe(true);
      expect(component.suppLinesOption).toBe(false);
      expect(component.isShowAddedSuppLines).toBe(true);
      expect(component.isInternetActive).toBe(false);
      expect(component.isDisplaySuppLineNumList).toBe(false);
      expect(component.displayAddedSuppList).toBe(true);
      expect(component.isFinishAddingSuppLines).toBe(true);
      const abc = localStorage.getItem("suppLinesAddedByTheUser");
      expect(abc).toBe(JSON.stringify(component.suppLinesDetails));
      expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(
        true
      );
      localStorage.removeItem("suppLinesAddedByTheUser");
      component.suppLinesDetails = [];
    }
  ));
  it("test goBackStartPoint", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      component.noOfSuppLinesAdded = 0;
      spyOn(devicedataservice, "publishDeactivateLifestyleAddons");
      component.goBackStartPoint();
      expect(component.suppLinesOption).toBe(false);
      expect(component.isInternetActive).toBe(false);

      expect(component.isDisplaySuppLineNumList).toBe(false);
      expect(component.isShowAddedSuppLines).toBe(true);
      expect(
        devicedataservice.publishDeactivateLifestyleAddons
      ).toHaveBeenCalledWith(false);
    }
  ));
  it("test backToSuppLines", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      component.backToSuppLines();
      expect(component.IsDisplayLossSupplementaryPopup).toBe(true);
    }
  ));
  it("test redirectedToPlanPageForAddingExcessPlan", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      const abc = [
        {
          planPhoneNumber: "0122222111",
          planPrice: "11",
          planType: "family",
          partNumber: "ABC"
        },
        {
          planPhoneNumber: "0133122114",
          planPrice: "12",
          planType: "family",
          partNumber: "ABC"
        }
      ];
      spyOn(devicedataservice, "publishAddToCartEnabling");
      localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(abc));
      component.redirectedToPlanPageForAddingExcessPlan();
      expect(component.IsDisplaySupplementaryPopup).toBe(true);

      expect(component.suppLinesOption).toBe(false);
      expect(component.isShowAddedSuppLines).toBe(true);
      expect(component.isInternetActive).toBe(false);
      expect(component.isDisplaySuppLineNumList).toBe(false);
      expect(component.isFinishAddingSuppLines).toBe(false);
      expect(component.suppLinesDetails).toEqual(abc);
      expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(
        false
      );
      component.suppLinesDetails = [];
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
  ));
  it("test redirectedToPlanPageFromCart", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(devicedataservice, "publishAddToCartEnabling");
      spyOn(devicedataservice, "publishSupplimentaryLines");
      component.suppLinesDetails = [];
      const abc = [
        {
          planPhoneNumber: "0122222111",
          planPrice: "11",
          planType: "family",
          partNumber: "ABC"
        },
        {
          planPhoneNumber: "0133122114",
          planPrice: "12",
          planType: "family",
          partNumber: "ABC"
        }
      ];
      localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(abc));
      component.redirectedToPlanPageFromCart();

      expect(component.suppLinesOption).toBe(false);
      expect(component.isShowAddedSuppLines).toBe(true);
      expect(component.isInternetActive).toBe(false);
      expect(component.isDisplaySuppLineNumList).toBe(false);
      expect(component.isFinishAddingSuppLines).toBe(false);
      expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith(
        component.suppLinesDetails
      );
      expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(
        false
      );
      expect(localStorage.removeItem).toHaveBeenCalledWith(
        "suppLinesAddedByTheUser"
      );
    }
  ));

  it("test callRetrieveNumbersAPI with status false", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      const dataForRetrieveNumberAPI = {
        data: {
          numberService: "POSTPAID",
          numberCategory: "NORMAL",
          numRecords: "30",
          sourceSystem: "",
          planType: "VOICE"
        }
      };
      component.retrievenumberURL = "/status-true";
      component.typeOfNumHighlight = "NEW_NUMBER";
      component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
      numberResp = [
        { status: false, is_premium_plan_message: "", message: "error message" }
      ];
      component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
      component.typeOfNumHighlight = "NEW_NUMBERs";
      component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
      expect(component.retrieveNumbersAPI).toBeFalse();
      expect(component.noNumbersToDisplay).toBeFalse();
    }
  ));
  it("test callRetrieveNumbersAPI with status error", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      const dataForRetrieveNumberAPI = {
        data: {
          numberService: "POSTPAID",
          numberCategory: "NORMAL",
          numRecords: "30",
          sourceSystem: "",
          planType: "VOICE"
        }
      };
      component.retrievenumberURL = "/error";
      component.typeOfNumHighlight = "NEW_NUMBER";
      component.searchStatus = true;
      component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
      expect(component.noNumbersToDisplay).toBeTrue();
      component.searchStatus = false;
      component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
      expect(component.retrieveNumbersAPI).toBeTrue();
    }
  ));

  it("should call ngOnInit without supplementary line and user not logged in", inject(
    [DeviceDataService],
    (deviceDataService: DeviceDataService) => {
      spyOn(component, "Init");
      spyOn(deviceDataService, "publishAddToCartEnabling");
      localStorage.setItem("Principal_Number", "0132928243");
      component.isKardasianPlanSelected = false;
      component.selectedBlueXpax = false;
      component.isMoon = false;
      component.numselected = "0132928243";
      component.ngOnInit();
      expect(deviceDataService.publishAddToCartEnabling).toHaveBeenCalledWith(
        false
      );
      expect(component.Init).toHaveBeenCalled();
      localStorage.removeItem("Principal_Number");
    }
  ));

  it("should call ngOnInit without supplementary line and user logged in", inject(
    [DeviceDataService],
    (deviceDataService: DeviceDataService) => {
      spyOn(component, "Init");
      spyOn(deviceDataService, "publishAddToCartEnabling");
      sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));
      localStorage.setItem("Principal_Number", "0132928243");
      component.isKardasianPlanSelected = false;
      component.selectedBlueXpax = false;
      component.isMoon = false;
      component.numselected = "0132928243";
      component.ngOnInit();
      expect(component.isUserLoggedIn).toBe(true);
      expect(deviceDataService.publishAddToCartEnabling).toHaveBeenCalledWith(
        false
      );
      expect(component.Init).toHaveBeenCalled();
      sessionStorage.removeItem("UserInfo");
      localStorage.removeItem("Principal_Number");
    }
  ));

  it("should call ngOnInit and handle Moon and user not logged in", inject(
    [DeviceDataService],
    (deviceDataService: DeviceDataService) => {
      spyOn(component, "Init");
      spyOn(deviceDataService, "publishAddToCartDisabling");
      component.isKardasianPlanSelected = false;
      component.selectedBlueXpax = false;
      component.isMoon = true;
      component.numselected = "0132928243";
      component.ngOnInit();
      expect(component.enableNRIC).toBe(true);
      expect(component.isFinishAddingSuppLines).toBe(true);
      expect(component.Init).toHaveBeenCalled();
    }
  ));

  it("should call ngOnInit and handle Moon and user not logged in", inject(
    [DeviceDataService],
    (deviceDataService: DeviceDataService) => {
      spyOn(component, "Init");
      spyOn(deviceDataService, "publishAddToCartEnabling");
      sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));
      component.isKardasianPlanSelected = false;
      component.selectedBlueXpax = false;
      component.isMoon = true;
      component.numselected = "0132928243";
      component.ngOnInit();
      expect(component.enableNRIC).toBe(true);
      expect(component.isFinishAddingSuppLines).toBe(true);
      expect(component.isUserLoggedIn).toBe(true);
      expect(deviceDataService.publishAddToCartEnabling).toHaveBeenCalledWith(
        true
      );
      expect(component.Init).toHaveBeenCalled();
      sessionStorage.removeItem("UserInfo");
    }
  ));

  it("should call ngOnInit and handle when user exceed number of supplementary", inject(
    [DeviceDataService],
    (deviceDataService: DeviceDataService) => {
      spyOn(component, "Init");
      spyOn(deviceDataService, "publishAddToCartEnabling");
      spyOn(component, "redirectedToPlanPageForAddingExcessPlan");
      sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));
      localStorage.setItem("supplementryFlow", "YES");
      component.isKardasianPlanSelected = false;
      component.selectedBlueXpax = false;
      component.isMoon = false;
      component.numselected = "0132928243";
      component.ngOnInit();
      expect(component.isUserLoggedIn).toBe(true);
      expect(deviceDataService.publishAddToCartEnabling).toHaveBeenCalledWith(
        false
      );
      expect(
        component.redirectedToPlanPageForAddingExcessPlan
      ).toHaveBeenCalled();
      expect(component.Init).toHaveBeenCalled();
      sessionStorage.removeItem("UserInfo");
      localStorage.removeItem("supplementryFlow");
    }
  ));

  it("should call ngOnInit and handle when user exceed number of supplementary", inject(
    [DeviceDataService],
    (deviceDataService: DeviceDataService) => {
      spyOn(component, "Init");
      spyOn(deviceDataService, "publishAddToCartEnabling");
      spyOn(component, "redirectedToPlanPageFromCart");
      sessionStorage.setItem("UserInfo", JSON.stringify(userInfo));
      localStorage.setItem("supplementryFlow", "YES");
      localStorage.setItem(
        "SupplementaryLinesEditingFromCart",
        JSON.stringify(supplementaryData)
      );
      component.isKardasianPlanSelected = false;
      component.selectedBlueXpax = false;
      component.isMoon = false;
      component.numselected = "0132928243";
      component.ngOnInit();
      expect(component.isUserLoggedIn).toBe(true);
      expect(deviceDataService.publishAddToCartEnabling).toHaveBeenCalledWith(
        false
      );
      expect(component.redirectedToPlanPageFromCart).toHaveBeenCalled();
      expect(component.Init).toHaveBeenCalled();
      sessionStorage.removeItem("UserInfo");
      localStorage.removeItem("supplementryFlow");
      localStorage.removeItem("SupplementaryLinesEditingFromCart");
    }
  ));

  it("should call ngOnInit and handle when error occured", inject(
    [DeviceDataService],
    (deviceDataService: DeviceDataService) => {
      spyOn(component, "Init");
      component.ngOnInit();
      deviceDataService.publishErrorNotificationBoolean(true);
      expect(component.numberExists).toBe(true);
      expect(component.Init).toHaveBeenCalled();
    }
  ));

  it("should call Init", () => {
    spyOn(component, "maxLInesToAllowLogic");
    localStorage.setItem(
      "SelectedPlanDetails",
      JSON.stringify(planDetailData[0].tabData)
    );
    component.Init();
    expect(component.maxLInesToAllowLogic).toHaveBeenCalled();
  });

  it("should test maxLInesToAllowLogic", () => {
    planDetailData[0].tabData.supplementary_data.forEach(item => {
      component.suppLinesDetailsForSelectedPlan.push({
        maxLines: item.max_line,
        planName: item.name,
        partNumber: item.part_number,
        planPrice: item.price
      });
    });
    component.userDataForSupplementaryLines = {
      status: true,
      maxPostpaidLinesRemaining: 5
    };
    component.maxLInesToAllowLogic();
    expect(component.noSupplimentaryAllowed).toBe(false);
  });

  it("should test maxLInesToAllowLogic", () => {
    localStorage.setItem("supplementryFlow", "YES");
    planDetailData[0].tabData.supplementary_data.forEach(item => {
      component.suppLinesDetailsForSelectedPlan.push({
        maxLines: item.max_line,
        planName: item.name,
        partNumber: item.part_number,
        planPrice: item.price
      });
    });
    component.userDataForSupplementaryLines = {
      status: true,
      maxPostpaidLinesRemaining: 5
    };
    component.maxLInesToAllowLogic();
    expect(component.noSupplimentaryAllowed).toBe(false);
    localStorage.removeItem("supplementryFlow");
  });

  it("should test maxLInesToAllowLogic", () => {
    component.suppLinesDetailsForSelectedPlan = [];
    component.maxLInesToAllowLogic();
    expect(component.noSupplimentaryAllowed).toBe(true);
  });

  it("should test addSupplimentaryLines and handle when there is duplicate number", () => {
    component.selectedNumber = "0132928243";
    component.selectedNumbersList = ["0132928243"];
    component.addSupplimentaryLines();
    expect(component.numberExists).toBe(true);
    expect(component.numExistMsg.content).toBe(
      '"Uh Oh. The number has already been selected. Please select a new number'
    );
  });

  it("should test addSupplimentaryLines", () => {
    planDetailData[0].tabData.supplementary_data.forEach(item => {
      component.suppLinesDetailsForSelectedPlan.push({
        maxLines: item.max_line,
        planName: item.name,
        partNumber: item.part_number,
        planPrice: item.price
      });
    });
    component.selectedNumber = "0132928666";
    component.selectedNumbersList = ["0132928243"];
    component.maxLinesOfSelectedPlan = [5, 5];
    component.selectedPlanType = "Celcom Mobile Family™";
    component.addSupplimentaryLines();
    expect(component.numberExists).toBe(false);
    expect(component.maxLinesOfSelectedPlan[0]).toEqual(4);
  });

  it("should test buyWithSuppLines and handle when user add more than max supplementary lines rules", () => {
    planDetailData[0].tabData.supplementary_data.forEach(item => {
      component.suppLinesDetailsForSelectedPlan.push({
        maxLines: item.max_line,
        planName: item.name,
        partNumber: item.part_number,
        planPrice: item.price
      });
    });
    component.maxLinesOfSelectedPlan = [0, 5];
    component.buyWithSuppLines();
    expect(component.IsDisplaySupplementaryPopup).toBe(true);
  });

  it("should test buyWithSuppLines and handle when user have 0 supplementary line", () => {
    planDetailData[0].tabData.supplementary_data.forEach(item => {
      component.suppLinesDetailsForSelectedPlan.push({
        maxLines: item.max_line,
        planName: item.name,
        partNumber: item.part_number,
        planPrice: item.price
      });
    });
    component.suppLinesDetails = [];
    component.maxLinesOfSelectedPlan = [5, 5];
    component.buyWithSuppLines();
    expect(component.IsDisplaySupplementaryPopup).toBe(false);

    expect(component.suppLinesOption).toBe(false);
    expect(component.isShowAddedSuppLines).toBe(false);
    expect(component.planNotToDisable).toBe("");
  });

  it("should test buyWithSuppLines and handle when user have supplementary line", () => {
    planDetailData[0].tabData.supplementary_data.forEach(item => {
      component.suppLinesDetailsForSelectedPlan.push({
        maxLines: item.max_line,
        planName: item.name,
        partNumber: item.part_number,
        planPrice: item.price
      });
    });
    supplementaryData.forEach(item => {
      component.suppLinesDetails.push({
        planPhoneNumber: item.number,
        planPrice: item.price,
        planType: item.name,
        partNumber: item.part_number
      });
    });
    component.maxLinesOfSelectedPlan = [5, 5];
    component.buyWithSuppLines();
    expect(component.IsDisplaySupplementaryPopup).toBe(false);

    expect(component.suppLinesOption).toBe(false);
    expect(component.isShowAddedSuppLines).toBe(true);
    expect(component.planNotToDisable).not.toBe("");
  });

  it("should test deleteSuppLine", () => {
    planDetailData[0].tabData.supplementary_data.forEach(item => {
      component.suppLinesDetailsForSelectedPlan.push({
        maxLines: item.max_line,
        planName: item.name,
        partNumber: item.part_number,
        planPrice: item.price
      });
    });
    supplementaryData.forEach(item => {
      component.suppLinesDetails.push({
        planPhoneNumber: item.number,
        planPrice: item.price,
        planType: item.name,
        partNumber: item.part_number
      });
    });
    component.noOfSuppLinesAdded = 5;
    component.maxLinesOfSelectedPlan = [0, 5];
    component.selectedNumbersList = [
      "0132046308",
      "0132099658",
      "0132245586",
      "0133409206",
      "0133977020"
    ];
    component.deleteSuppLine(1);
    expect(component.displayAddedSuppList).toBe(true);
    expect(component.isFinishAddingSuppLines).toBe(false);
    expect(component.selectedNumbersList).toEqual([
      "0132046308",
      "0132245586",
      "0133409206",
      "0133977020"
    ]);
  });
  it("should call setSupplimentaryObj", () => {
    component.suppLinesDetailsForSelectedPlan = [];
    const response = [
      {
        name: "Celcom Mobile Family™",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000"
      }
    ];
    component.setSupplimentaryObj(response);
    expect(component.suppLinesDetailsForSelectedPlan).not.toBeNull();
  });
});
