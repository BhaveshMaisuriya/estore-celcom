import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { OtpInputComponent } from './otp-input.component';
import { NotificationErrorComponent } from "../notification-error/notification-error.component";
import { ActivatedRoute, Router } from '@angular/router';
import { NricInputComponent } from '../nric-input/nric-input.component';
import { AppService } from '../../../Service/app.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { CookieService } from 'ngx-cookie-service';
import { GuestCheckoutService } from '../../guest-checkout/services/guest-checkout.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { Broadcaster } from '../../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../../Service/broadcaster.service';
import { UserService } from '../../../Service/user.service';
import { CartService } from '../../../Service/cart.service';
import { BundleService } from '../../../Service/bundle.service';
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { HeaderService } from '../../../Header/header.service';
import { RedirectionService } from '../../../Service/redirection.service';
import { SupplimentaryLinesService } from '../supplementary-lines/supplementary-lines.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../../login/service/login.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductService } from '../../../Service/product.service';
import { PlanPurchaseService } from '../../plan/plan-purchase/plan-purchase.service';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { MsisdnInputComponent } from '../msisdn-input/msisdn-input.component';
import { Observable } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

const loginResponse = [
  {
      "status": true,
      "valid": true,
      "user_token": "nxf5h6kgbh57lpq2go3i59pj1rbyl4x7",
      "message": "Customer Updated",
      "nric": "874347847023",
      "msisdn": '60193483845',
      "customer_data": {
          "country": "",
          "planSegmentType": "",
          "unitNo": "",
          "segmentGroup": "Consumer",
          "postalCode": "50045",
          "contactFirstName": "tester",
          "section": "",
          "contactType": "",
          "type": "Non Premier",
          "poBox": "",
          "contactHomePhone": "",
          "state": "SW",
          "streetType": "Jalan",
          "contactMobileNum": "60133945902",
          "motherMaidenName": "",
          "gstTaxRelief": "",
          "XPAX_DB_FLG": "N",
          "buildingName": "",
          "XPAX_OPEN_FLG": "0",
          "nationality": "Malaysia",
          "preferredContactMethod": "Email",
          "customerIDType": "New NRIC",
          "preferredContactLang": "English",
          "customerID": "870902324556",
          "name": "TESTER ERROR FINDER",
          "contactPreferredTime": "",
          "segmentSubGroup": "Retail",
          "floorNo": "",
          "contactLastName": "error finder",
          "salutation": "Mr",
          "headerCustomerProfile": {
              "errorMessage": "",
              "errorCode": "",
              "status": "OK"
          },
          "PREPAIDOPENORD_FLG": "0",
          "gender": "Male",
          "city": "kuala lumpur",
          "contactAlternateNum": "",
          "contactRowID": "1-2VJS1YA",
          "facebookID": "",
          "pakejOpenCount": "0",
          "googlePlusID": "",
          "YOUTH_ACTIVE_COUNT": "0",
          "gstTaxReliefID": "",
          "DB_OPEN_COUNT": "1",
          "billingType": "Billable",
          "customerRowId": "1-2VJSF3E",
          "contactBusinessPhone": "",
          "addressYType": "Landed",
          "PREPAID_LINES_COUNT": "0",
          "race": "",
          "contactEmail": "123456@getnada.com",
          "dateOfBirth": "19870902_000000",
          "services": [
              {
                  "serviceType": "",
                  "smeGroupId": "",
                  "planSegmentType": "",
                  "pakejFlag": "N",
                  "mobileNumber": "0133657612",
                  "assetBillingAccountNo": "300449071",
                  "billingProfileId": "1-2VV8NYB",
                  "principleMobileNumber": "",
                  "assetBillingAccountRowId": "1-2VV8NY6",
                  "promotionId": "1-XYUNQP",
                  "pre_Pos_Indicator": "Postpaid",
                  "prodPromName": "FiRST Gold Plus CBS",
                  "billingType": "Billable",
                  "hh_consumed_flag": "N",
                  "prin_Sup_Indicator": "",
                  "prodPromPartNum": "PB12070",
                  "plan": "FiRST Gold Plus CBS Plan",
                  "productType": "Service",
                  "assetSubStatus": "Active",
                  "product": "RTP Voice Service",
                  "creditTreatmentCode": "6",
                  "billType": "CNVRGTPostpaid",
                  "assetModel": "",
                  "SVC_LVL_DVC_COUNT": "0",
                  "segmentCode": "10",
                  "assetIntegrationID": "1-2VVT0ZB",
                  "partialControlFlag": "",
                  "masterAccountNumber": "",
                  "billingAccountStatus": "Active",
                  "assetID": "1-2VVUO4C",
                  "assetImei": "",
                  "kenanAccountID": "300449071",
                  "kenanName": "",
                  "vipCode": "VIP 6",
                  "assetStatus": "Active",
                  "billCycle": "18"
              },
              {
                  "serviceType": "",
                  "smeGroupId": "",
                  "planSegmentType": "",
                  "pakejFlag": "N",
                  "mobileNumber": "0133945902",
                  "assetBillingAccountNo": "300422425",
                  "billingProfileId": "1-2VJS4NX",
                  "principleMobileNumber": "",
                  "assetBillingAccountRowId": "1-2VJS4NS",
                  "promotionId": "1-XYUNQP",
                  "pre_Pos_Indicator": "Postpaid",
                  "prodPromName": "FiRST Gold Plus CBS",
                  "billingType": "Billable",
                  "hh_consumed_flag": "N",
                  "prin_Sup_Indicator": "",
                  "prodPromPartNum": "PB12070",
                  "plan": "FiRST Gold Plus CBS Plan",
                  "productType": "Service",
                  "assetSubStatus": "Active",
                  "product": "RTP Voice Service",
                  "creditTreatmentCode": "6",
                  "billType": "CNVRGTPostpaid",
                  "assetModel": "",
                  "SVC_LVL_DVC_COUNT": "0",
                  "segmentCode": "10",
                  "assetIntegrationID": "1-2VJTT49",
                  "partialControlFlag": "",
                  "masterAccountNumber": "",
                  "billingAccountStatus": "Active",
                  "assetID": "1-2VJV2M2",
                  "assetImei": "",
                  "kenanAccountID": "300422425",
                  "kenanName": "",
                  "vipCode": "VIP 6",
                  "assetStatus": "Active",
                  "billCycle": "8"
              }
          ],
          "twitterID": "",
          "customerSince": "20171203_000000",
          "pakejActiveCount": "0",
          "DB_COUNT": "0",
          "masterAccountNumber": "",
          "billingAccountStatus": "Active",
          "streetAddress": "1",
          "contactSalutation": "Mr.",
          "YOUTH_OPEN_COUNT": "0"
      },
      "authtoken": "e2ac71e3e50a6b9e089f21f35b1c86704b913db84c7c47fef81d4eb0e1ef2e377f616d9b31deb15d2724e749c90e58c8309b77765db5a2c0d9dc18b0b06c0471aea30952e405ca3a68a0c39574e2168a3d4184db85111065c57be22fe951f55b3919ea10ee96b9b0de2badf344ff140d19b5465af738ebf53a66b7568666269e5f13c9b0ceb701d143c2f3ed9f99c681a29b5e3d246576c9c4e09a98aa41b7ede912398b51d4f22b5129c177fe941e897385b9da185c6234639be8f461fc7f77077788b01ba62398ca6f04fd54198e52021cca35232ac7b0fe2b4245"
  }
];
const mockLoginErrorResponse = [
  {
    "exists": true,
    "message": "Error on sending otp",
    "state": null,
    "status": false,
  }
];
const loginErrorResponse = [
  {
    "exists": false,
    "message": "DeliveredToNetwork",
    "state": "1570673202684219",
    "status": true
  }
];
const loginApiRequest = {
  mobile_number: "60133945902",
  order_id: null,
  order_secret: null,
  otp: "1232",
  state: "1571131220916293",
  user: "user"
};
class RouterStub {
  navigateByUrl(url: string) {
      return url;
  }
}
const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;

let respForOrder: any = {exception: false, order_data: {total_lines: 5}};
class MockorderinfoService {
  ViewOrderInfo(nric: any, type: string): Observable<any> {
    if (nric === "6011122222") {
      return Observable.of(respForOrder);
    }
    if (nric === "6011133333") {
      return Observable.throw({message: "error", status: false});
    }
  }
}
class MockAppService {
  postROI(endpoint: string, jsonData: any, token?: string) {
    return Observable.of(loginResponse);
  }
}

describe('OtpInputComponent', () => {
  let component: OtpInputComponent;
  let fixture: ComponentFixture<OtpInputComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpInputComponent, NricInputComponent, NotificationErrorComponent, PageLoaderComponent, MsisdnInputComponent,
        sharedPipes,
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        
        IconModule,
        materialModules,
      ],
      providers: [{ provide: AppService, useClass: MockAppService },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useClass: RouterStub }, CommonUtilService, EStoreAnalysticsService, RendererService,
        SeoService, AnalyticsService, GuestCheckoutService, CookieService, BroadbandService, DeviceDataService,
        DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
        {provide: OrderInfoService, useClass: MockorderinfoService},
         HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
         DeviceDataService, CommonUtilService, GuestCheckoutService, LoginService, HttpClient, ProductService, PlanPurchaseService]
    }).overrideComponent(OtpInputComponent, {
      set: {
        providers: [{provide: OrderInfoService, useClass: MockorderinfoService},
          { provide: AppService, useClass: MockAppService }, LoginService, HeaderService
        ]
      }
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpInputComponent);
    component = fixture.componentInstance;
    component.msisdn = "";
    component.nric = "";
    component.pageType = "";
    component.UserLoginName = "";
    component.customerDetails = {};
    component.userInfo = {};
    component.userToken = "";
    component.otp1 = "";
    component.otp2 = "";
    component.otp3 = "";
    component.otp4 = "";
    component.keepCelcomNum = null;
    component.isLimitReachedError = false;
    component.isCSAgentDealer = false;
    component.customerNRIC = null;
    component.typeOfUser = "postpaid";
    component.errorExits = false;
    component.errorMessage = {};
    component.apiErrorMessage = {};
    component.isApiError = false;
    component.notValid = false;
    component.limitReachedErrorMsg = {};
    component.showDisclaimer = false;
    component.PlanOnlyObjectForCart = {};
    component.requestBody = {};
    component.userType = null;
    component.errorAddToCart = false;
    component.AddToCart = false;
    component.cart = {};
    component.elligibleUser = false;
    component.isPreOrder = false;
    component.isEasyPhone = false;
    component.easyPhoneType = "";
    component.validated_id = "";
    component.isItMnp = false;
    component.validOtp = false;
    component.eligibilityInfo = {};
    component.suppDetailsOfUser = {};
    component.suppLinesDetails = [];
    component.suppLineRequestBody = [];
    component.randomPhoneNo = null;
    component.reservationId = "";
    component.addonCode = null;
    component.isMviva = false;
    component.showValidationNotification = false;
    component.validationNotification = null;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should call onLogin function", () => {
    spyOn(component, "validateOTPByMC");
    component.validOtp = true;
    const ev = {
    "keyCode" : 13,
    "target": { value: 'a' }
    };
    component.onLogin(ev, '3', '2');
    expect(component.validateOTPByMC).toHaveBeenCalled();
  });
  it("should call loginUser function", inject([DeviceDataService], (service: DeviceDataService) => {
    component.pageType = "newInLine";
    spyOn(service, "publishLoggerInUserName");
    spyOn(component, "checkNumberOfLinesUserHas");
    spyOn(component, "loginUser").and.callThrough();
   component.loginUser(loginResponse[0]);
   if (typeof window !== 'undefined' && localStorage) {
    const UserInfo = sessionStorage.getItem("UserInfo");
    const personalForm = sessionStorage.getItem("personalForm");
    const userToken = sessionStorage.getItem("UserToken");
    const authToken = sessionStorage.getItem("authtoken");
    expect(UserInfo).toBeDefined();
    expect(personalForm).toBeDefined();
    expect(userToken).toBeDefined();
    expect(authToken).toBeDefined();
   }
   service.publishLoggerInUserName(loginResponse[0].customer_data.name);
   expect(loginResponse[0].customer_data.services.length).toBeGreaterThan(0);
   expect(component.typeOfUser).toBe("postpaid");
   if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("typeofuser")) {
    const typeOfUser =  sessionStorage.getItem("typeofuser");
    expect(typeOfUser).toBe("Postpaid");
   }
  expect(component.checkNumberOfLinesUserHas).toHaveBeenCalled();
  }));
  it("should call ResendOtp function", inject([LoginService], (loginService: LoginService) => {
   component.ResendOtp();
   expect(component.otp1).toBe("");
   expect(component.otp2).toBe("");
   expect(component.otp3).toBe("");
   expect(component.otp4).toBe("");
  }));
  it("should call callErrorMessageWithType function with OTP expired error", () => {
    const errType = "OTP_EXPIRED";
   component.callErrorMessageWithType(errType);
   expect(component.errorExits).toBeTruthy();
   expect(component.notValid).toBeFalsy();
   expect(component.errorMessage).toBeDefined();
  });
  it("should call callErrorMessageWithType function with sys down error", () => {
    const errType = "SYS_DOWN";
   component.callErrorMessageWithType(errType);
   expect(component.errorExits).toBeTruthy();
   expect(component.notValid).toBeFalsy();
   expect(component.errorMessage).toBeDefined();
  });
  it("show limit exceeded error", () => {
    const errorObj = {message: "error"};
    component.ShowingLimitError(errorObj);
    localStorage.removeItem('limitReachedErrorMsg');
    localStorage.removeItem('isLimitReachedError');
  });
  it("checkEligibilbleUser", () => {
    component.checkEligibilbleUser();
    component.elligibleUser = false;
    component.isLimitExceededIncludingOpenOrders = true;
    component.checkEligibilbleUser();
  });
  it('validateSuppLinesCount', () => {
    component.validateSuppLinesCount([]);
    component.callOtpTimeout();
    const lines = [{"planPhoneNumber":"0139324971","planPrice":"48.0000","planType":"Celcom Mobile Family™","partNumber":"PB12540"},{"planPhoneNumber":"0138306917","planPrice":"48.0000","planType":"Celcom Mobile Family™","partNumber":"PB12540"}];
    let supp: any = {status: true, maxPostpaidLinesRemaining: 14};
    localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(lines));
    component.validateSuppLinesCount(supp);
   supp = {status: true, maxPostpaidLinesRemaining: 1};
   component.validateSuppLinesCount(supp);
   localStorage.removeItem("suppLinesAddedByTheUser");
   localStorage.removeItem("supplementryFlow");
   localStorage.removeItem("suppLinesDetailsOfUser");
   component.validateSuppLinesCount(supp);
   localStorage.removeItem("suppLinesDetailsOfUser");
  });
  it('isdisablelogin', () => {
    const spy = spyOn(component, 'isDisableLogin').and.callThrough();
    component.isDisableLogin();
    component.errorExits = false;
    component.otp1 ='1';
    component.otp2 ='1';
    component.otp3 ='1';
    component.otp4 ='1';
    component.otp5 ='1';
    component.otp6 ='1';
    component.resendLinkDisabled = true;
    component.isDisableLogin();
    expect(spy).toHaveBeenCalled();
  });
  it('isdisablelogin', () => {
  component.errorExits = false;
  component.otp1 = "1";
  component.otp2 = "";
  component.otp3 = "1";
  component.otp4 = "1";
  component.isDisableLogin();
  component.otp2 = "1";
  component.isDisableLogin();
});
it('checkNumberOfLinesUserHas', () => {
component.checkNumberOfLinesUserHas();
component.nric = "6011122222";
component.checkNumberOfLinesUserHas();
const lines = [{"planPhoneNumber":"0139324971","planPrice":"48.0000","planType":"Celcom Mobile Family™","partNumber":"PB12540"},{"planPhoneNumber":"0138306917","planPrice":"48.0000","planType":"Celcom Mobile Family™","partNumber":"PB12540"}];
localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(lines));
component.checkNumberOfLinesUserHas();
respForOrder = {exception: false, order_data: {total_lines: 15}};
component.checkNumberOfLinesUserHas();
localStorage.setItem('BuyNoPlan', "true");
component.checkNumberOfLinesUserHas();
const newlines = [{"planPhoneNumber":"0139324971","planPrice":"48.0000","planType":"Celcom Mobile Family™","partNumber":"PB12540"},{"planPhoneNumber":"0138306917","planPrice":"48.0000","planType":"Celcom Mobile Family™","partNumber":"PB12540"}];
localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(newlines));
respForOrder = {exception: false, order_data: {total_lines: 14}};
localStorage.removeItem('BuyNoPlan');
component.elligibleUser = true;
component.checkNumberOfLinesUserHas();
respForOrder = {exception: false, message: "error"};
component.checkNumberOfLinesUserHas();
respForOrder = {exception: true, message: "error"};
component.checkNumberOfLinesUserHas();
respForOrder = {};
component.checkNumberOfLinesUserHas();
component.nric = "6011133333";
component.checkNumberOfLinesUserHas();
localStorage.removeItem("suppLinesAddedByTheUser");
});
it('validateOTPByMC', () => {
  component.validateOTPByMC();
  localStorage.setItem("State", "KL");
  localStorage.setItem("isEasyPhone", 'true');
  component.validateOTPByMC();
  localStorage.removeItem("isEasyPhone");
  localStorage.setItem("isBundleClicked", "true");
  component.validateOTPByMC();
  localStorage.removeItem("isBundleClicked");
  localStorage.setItem("xp-lite-device", "true");
  component.validateOTPByMC();
  localStorage.removeItem("xp-lite-device");
  localStorage.removeItem("State");
});

it('should call ngOnInit', () => {
  const spy= spyOn(component, 'ngOnInit').and.callThrough();
  component.ngOnInit();
  expect(spy).toHaveBeenCalled();
});

it('should call isProjectStar', () => {
  const spy= spyOn(component, 'isProjectStar').and.callThrough();
  component.isProjectStar();
  localStorage.setItem("isProjectStar", 'true');
  component.isPlanStar = true;
  component.isProjectStar();
  expect(spy).toHaveBeenCalled();
});

it('should call enableLinkAfterSpecifiedTime', () => {
  const spy = spyOn(component, 'enableLinkAfterSpecifiedTime').and.callThrough();
  component.enableLinkAfterSpecifiedTime();
  expect(spy).toHaveBeenCalled();
});

it('should call ManageOTP', () => {
  const spy = spyOn(component, 'ManageOTP').and.callThrough();
  let ev = {
    "keyCode" : 13,
    "target": { value: 'a' }
  };
  component.ManageOTP('2', ev, '3');
  ev = {
    "keyCode" : 13,
    "target": { value: '2' }
  };
  component.ManageOTP('2', ev, '3');
  ev = {
    "keyCode" : 13,
    "target": { value: '' }
  };
  component.ManageOTP('2', ev, '3');
  expect(spy).toHaveBeenCalled();
});

it('should call otpInputBoxClicked', () => {
  const spy= spyOn(component, 'otpInputBoxClicked').and.callThrough();
  component.otpInputBoxClicked({keyCode:8, which:0, target:{value:""}}, '1');
  expect(spy).toHaveBeenCalled();
});
});
