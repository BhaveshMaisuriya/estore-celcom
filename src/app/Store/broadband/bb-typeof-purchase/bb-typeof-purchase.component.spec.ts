import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { BbTypeofPurchaseComponent } from './bb-typeof-purchase.component';
import { TypeofPurchaseService } from './typeof-purchase.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { BaseComponent } from '../../../base.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { NoteSectionComponent } from '../../dumb-components/note-section/note-section.component';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { MsisdnInputComponent } from '../../widget/msisdn-input/msisdn-input.component';
import { NricInputComponent } from '../../widget/nric-input/nric-input.component';
import { OtpInputComponent } from '../../widget/otp-input/otp-input.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from '../../../Service/app.service';
import { AppMockService } from '../../../Service/appmock.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { GuestCheckoutService } from '../../../../app/Store/guest-checkout/services/guest-checkout.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { SupplimentaryLinesService } from '../../widget/supplementary-lines/supplementary-lines.service';
import { ProductService } from '../../../Service/product.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../Service/user.service';
import { CartService } from '../../../Service/cart.service';
import { BundleService } from '../../../Service/bundle.service';
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { HeaderService } from '../../../Header/header.service';
import { RedirectionService } from '../../../Service/redirection.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationBarComponent } from '../../widget/notification-bar/notification-bar.component';
import { SwitchToCelcomComponent } from '../../mnp/switch-to-celcom/switch-to-celcom.component';
import { MnpService } from '../../mnp/services/mnp.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { DeviceDetailsNumberService } from '../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
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
const mockHomeWirelessData = {
  selectionType: "edit",
  color: "Red",
  plan: {
      "name": "Home Wireless Platinum",
      "sku": "hwpp",
      "monthly_plan": "150.0000",
      "order_plan_bundle": "PB11915",
      "plan_monthly_pay": "150.0000",
      "segment": null,
      "upfront_installment": null,
      "contract": null,
      "plan_name": "Home Wireless Platinum",
      "plan_title": "Home Wireless Platinum. Affordable. Complete",
      "plan_subtitle": "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.",
      "product_type": null,
      "background_color": "is-bg-color-black",
      "indicator_class": null,
      "product_text": "Platinum",
      "key_figures_text": "150GB",
      "key_text": "RM150",
      "table_info": [
          {
              "heighlight": "0",
              "headline": "1TB Video Walla ™ & Music Walla ™",
              "fieldIcon": "/sites/default/files/images/icon/internet_gb_black/icon_internet_10gb.svg",
              "add_on_data": "Add-on data available (RM50/RM150)"
          }
      ],
      "terms_and_condition": {
          "plans": {
              "label": "Plans",
              "desc": null
          },
          "contract_terms": {
              "label": "Contract Duration",
              "desc": "24 months contract"
          },
          "legal": {
              "label": "Legal",
              "desc": null
          },
          "cancellation": {
              "label": "Cancellation",
              "desc": null
          }
      }
  },
  newReg: "60132046407",
  deviceSku: "home-wireless",
  numberReservationId: "OP12432432432"
};
const mockUserInfo = {
  "outputCPResp": {
      "country": "Malaysia",
      "planSegmentType": "",
      "unitNo": "11-4",
      "segmentGroup": "Consumer",
      "postalCode": "50411",
      "contactFirstName": "DOJI",
      "section": "",
      "contactType": "",
      "type": "Non Premier",
      "poBox": "",
      "contactHomePhone": "",
      "state": "WP",
      "streetType": "Jalan",
      "contactMobileNum": "0115143124",
      "motherMaidenName": "",
      "gstTaxRelief": "",
      "XPAX_DB_FLG": "N",
      "buildingName": "",
      "XPAX_OPEN_FLG": "0",
      "nationality": "Malaysia",
      "preferredContactMethod": "Email",
      "customerIDType": "New NRIC",
      "preferredContactLang": "English",
      "customerID": "881212432154",
      "name": "DOJI TTA",
      "contactPreferredTime": "4:30pm to 8:30pm",
      "segmentSubGroup": "Retail",
      "floorNo": "",
      "contactLastName": "TTA",
      "salutation": "Mr",
      "headerCustomerProfile": {
          "errorMessage": "",
          "errorCode": "",
          "status": "OK"
      },
      "PREPAIDOPENORD_FLG": "0",
      "gender": "Male",
      "city": "Kuala Lumpur",
      "contactAlternateNum": "",
      "contactRowID": "1-8Y1HJJ2",
      "facebookID": "",
      "pakejOpenCount": "0",
      "googlePlusID": "",
      "YOUTH_ACTIVE_COUNT": "0",
      "gstTaxReliefID": "",
      "DB_OPEN_COUNT": "0",
      "billingType": "Billable",
      "customerRowId": "1-8Y1HKBG",
      "contactBusinessPhone": "",
      "addressYType": "High-Rise",
      "PREPAID_LINES_COUNT": "0",
      "race": "",
      "contactEmail": "881212432154@getnada.com",
      "dateOfBirth": "19881212_000000",
      "services": [
          {
              "serviceType": "",
              "smeGroupId": "",
              "planSegmentType": "",
              "pakejFlag": "N",
              "mobileNumber": "0132046407",
              "assetBillingAccountNo": "300601069",
              "billingProfileId": "1-8Y1GVVU",
              "principleMobileNumber": "",
              "assetBillingAccountRowId": "1-8Y1GVVP",
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
              "assetIntegrationID": "1-8Y1H46D",
              "partialControlFlag": "",
              "masterAccountNumber": "",
              "billingAccountStatus": "Active",
              "assetID": "1-8Y1HU5Q",
              "assetImei": "",
              "kenanAccountID": "300601069",
              "kenanName": "",
              "vipCode": "VIP 6",
              "assetStatus": "Active",
              "billCycle": "28"
          },
          {
              "serviceType": "",
              "smeGroupId": "",
              "planSegmentType": "",
              "pakejFlag": "N",
              "mobileNumber": "0132876952",
              "assetBillingAccountNo": "300601325",
              "billingProfileId": "1-8Y1YQTD",
              "principleMobileNumber": "",
              "assetBillingAccountRowId": "1-8Y1YQT8",
              "promotionId": "1-XMK1EL",
              "pre_Pos_Indicator": "Postpaid",
              "prodPromName": "FiRST Platinum Plus CBS",
              "billingType": "Billable",
              "hh_consumed_flag": "N",
              "prin_Sup_Indicator": "",
              "prodPromPartNum": "PB11860",
              "plan": "FiRST Platinum Plus CBS Plan",
              "productType": "Service",
              "assetSubStatus": "Active",
              "product": "RTP Voice Service",
              "creditTreatmentCode": "35",
              "billType": "CNVRGTPostpaid",
              "assetModel": "",
              "SVC_LVL_DVC_COUNT": "0",
              "segmentCode": "10",
              "assetIntegrationID": "1-8Y1Z2WL",
              "partialControlFlag": "",
              "masterAccountNumber": "",
              "billingAccountStatus": "Active",
              "assetID": "1-8Y1ZLOD",
              "assetImei": "",
              "kenanAccountID": "300601325",
              "kenanName": "",
              "vipCode": "VIP 5",
              "assetStatus": "Active",
              "billCycle": "3"
          }
      ],
      "twitterID": "",
      "customerSince": "20190119_000000",
      "pakejActiveCount": "0",
      "DB_COUNT": "0",
      "masterAccountNumber": "",
      "billingAccountStatus": "Active",
      "streetAddress": "safafaf",
      "contactSalutation": "Mr.",
      "YOUTH_OPEN_COUNT": "0"
  }
};

const  notes = [
  { text: "Please ensure that your address is within Celcom Home Wireless serviceable area by verifying with our network checker." },
  { text: "Applicable for customers who have and do NOT have a contract with Celcom at this juncture." },
  { text: "Please do NOT submit multiple applications." },
  { text: "Please note that the 30 Days free trial begins from the date of order." },
  { text: "Once active the device should not be moved to a different home." }
];

describe('BbTypeofPurchaseComponent', () => {
  let component: BbTypeofPurchaseComponent;
  let fixture: ComponentFixture<BbTypeofPurchaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbTypeofPurchaseComponent, PageLoaderComponent, NricInputComponent, MsisdnInputComponent,
        OtpInputComponent, NoteSectionComponent, NotificationErrorComponent, AgeEligibilityPopupComponent,
         NotificationErrorComponent, NotificationBarComponent, SwitchToCelcomComponent,
         sharedPipes,
      ],
      providers: [{ provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: MockactivatedRoute }, TypeofPurchaseService, DeviceDataService,
        BroadbandService, CookieService, GuestCheckoutService, CommonUtilService, EStoreAnalysticsService,
        SupplimentaryLinesService, ProductService, AnalyticsService, RendererService, SeoService,
        DecimalPipe, Broadcaster, NotificationPopupEvent, UserService, CartService, BundleService,
        OrderInfoService, HeaderService, RedirectionService, HttpClient, MnpService, DeviceDetailsNumberService],
      imports: [
        HttpClientTestingModule,
        BrowserDynamicTestingModule,
        RouterTestingModule,
        FormsModule,
        IconModule,
        materialModules,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbTypeofPurchaseComponent);
    component = fixture.componentInstance;
    component.showErrorToaster = false;
    component.notes = [];
    component.homeWirelessPopUp = {};
    component.preSelectNewReg = false;
    component.loading = false;
    component.homeWirelessData = mockHomeWirelessData;
    component.pageType = "hwInline";
  });
  it('should create', () => {
    expect(component).toBeTruthy();
});


it('should call function ngOnInit with error notification as false', inject([DeviceDataService], (service: DeviceDataService) => {
  spyOn(component, "ngOnInit");
  spyOn(service, "publishErrorNotificationBoolean");
  component.ngOnInit();
  service.publishErrorNotificationBoolean(false);
  expect(component.preSelectNewReg).toBeFalsy();
}));

it('should call function onSwitchingPurchaseType with newReg', inject([TypeofPurchaseService],
   (typeOfPurchaseService: TypeofPurchaseService) => {
  spyOn(component, "loggedInUser");
  if (typeof window !== 'undefined' && localStorage && sessionStorage) {
   sessionStorage.setItem("UserToken", JSON.stringify("ljxqxkn6t7ylk6rx4ijnt2lrjzrx8of8"));
   localStorage.setItem("MyMsIsdn", JSON.stringify("60132046407"));
   sessionStorage.setItem("UserInfo", JSON.stringify(mockUserInfo));
  }
  component.onSwitchingPurchaseType('newReg');
  expect(component.preSelectNewReg).toBeTruthy();
  expect(component.loading).toBeTruthy();
  expect(component.loggedInUser).toHaveBeenCalledWith("loggedInUser");
}));
it('should call function preSelection', () => {
  spyOn(component, "loggedInUser");
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.setItem("homeWirelessData", JSON.stringify(mockHomeWirelessData));
  }
  component.preSelection();
  if (typeof window !== 'undefined' && localStorage && localStorage.getItem("homeWirelessData")) {
    expect(component.loading).toBeTruthy();
    expect(component.preSelectNewReg).toBeTruthy();
    expect(component.loggedInUser).toHaveBeenCalledWith("edit");
  }
});
it('should call function loggedInUser with edit selection Type', () => {
  spyOn(component, "setPreselectionNumberData");
    component.loggedInUser('edit');
    expect(component.setPreselectionNumberData).toHaveBeenCalledWith(mockHomeWirelessData);
});
it('should call function loggedInUser with "beforeLoginSelectionRetention" selection Type', () => {
  spyOn(component, "getNewRegNumber");
    component.loggedInUser('beforeLoginSelectionRetention');
    expect(component.getNewRegNumber).toHaveBeenCalled();
});
it('should call function setPreselectionNumberData', () => {
    component.setPreselectionNumberData('');
    expect(component.loading).toBeFalsy();
    expect(component.isNewRegEligible).toBeFalsy();
});
it('should call function setPreselectionNumberData',  inject([DeviceDataService], (service: DeviceDataService)=> {
    component.ngOnInit();
    service.publishErrorNotificationBoolean(false);
  expect(component.preSelectNewReg).toBeFalsy();
}));
it('should call function setPreselectionNumberData',  inject([DeviceDataService], (service: DeviceDataService)=> {
  component.ngOnInit();
  service.publishErrorNotificationBoolean(true);
expect(component.preSelectNewReg).toBeTruthy();
}));
it('should call function getNewRegNumber with status true and eligible true',  inject([TypeofPurchaseService], (service: TypeofPurchaseService)=> {
  component.ngOnInit();
  service.mockBbGetNewNumber = {
    status: true,
    mobile_number: "0133129953",
    eligible: true,
    validated_id:"123233",
    reservationId: "OP43CE1555649811"
  };
  component.getNewRegNumber(true,'beforeLoginSelectionRetention');
  
  // service.publishErrorNotificationBoolean(true);
// expect(component.preSelectNewReg).toBeTruthy();
}));
it('should call function getNewRegNumber with status true and eligible false',  inject([TypeofPurchaseService], (service: TypeofPurchaseService)=> {
  component.ngOnInit();
  service.mockBbGetNewNumber = {
    status: true,
    mobile_number: "0133129953",
    eligible: false,
    reservationId: "OP43CE1555649811"
  };
  component.getNewRegNumber(false,'beforeLoginSelectionRetention');
  
  // service.publishErrorNotificationBoolean(true);
// expect(component.preSelectNewReg).toBeTruthy();
}));
it('should call function getNewRegNumber with status true and eligible false',  inject([TypeofPurchaseService], (service: TypeofPurchaseService)=> {
  component.ngOnInit();
  service.mockBbGetNewNumber = {
    status: true,
    mobile_number: "0133129953",
    eligible: false,
    reservationId: "OP43CE1555649811"
  };
  component.responseValidation(service.mockBbGetNewNumber);
  
  // service.publishErrorNotificationBoolean(true);
// expect(component.preSelectNewReg).toBeTruthy();
}));
it('should call function getNewRegNumber with status false and eligible false',  inject([TypeofPurchaseService], (service: TypeofPurchaseService)=> {
  component.ngOnInit();
  service.mockBbGetNewNumber = {
    status: false,
    mobile_number: "0133129953",
    eligible: false,
    reservationId: "OP43CE1555649811",
    message:"test msg"
  };
  component.responseValidation(service.mockBbGetNewNumber);
  
  // service.publishErrorNotificationBoolean(true);
// expect(component.preSelectNewReg).toBeTruthy();
}));
it('should call function getNewRegNumber with status false and eligible false and without msg',  inject([TypeofPurchaseService], (service: TypeofPurchaseService)=> {
  component.ngOnInit();
  service.mockBbGetNewNumber = {
    status: false,
    mobile_number: "0133129953",
    eligible: false,
    reservationId: "OP43CE1555649811",
    validated_id:"123233",
    message:""
  };
  component.responseValidation(service.mockBbGetNewNumber);
  // expect(sessionStorage.getItem('hw_validated_id')).toBe('123233');
  // service.publishErrorNotificationBoolean(true);
// expect(component.preSelectNewReg).toBeTruthy();
}));
it('should call function onCallResetMsisdnOtp', ()=> {
  component.onCallResetMsisdnOtp('');
  expect(component.enableMCAuthentication).toBeFalsy();
  expect(component.enableMCotp).toBeFalsy();
});
it('should call function onCallResetOtp', ()=> {
  component.onCallResetOtp('');
  expect(component.enableMCotp).toBeFalsy();
});
it('should call function onCallIsMCUser with return', ()=> {
  component.onCallIsMCUser('apiFailed');
});
it('should call function onCallIsMCUser with return', ()=> {
  component.onCallIsMCUser({mcUser:true,nric:"123455656"});
  expect(component.nric).toBe('123455656');
});
it('should call function onCallIsMCUser with return', ()=> {
  component.onCallIsMCUser({mcUser:false,nric:"123455656"});
  // expect(component.nric).toBe('123455656');
});
it('should call function onSentOtp with return', ()=> {
  component.onSentOtp({status:true,msisdn:"123455656"});
  expect(component.msisdnOtp).toBe('123455656');
});
it('should call function onSentOtp with return', ()=> {
  component.onSentOtp('');
  // expect(component.msisdnOtp).toBe('123455656');
});
it('should call function onValidOtp with return', ()=> {
  component.onValidOtp('test');
  expect(component.enableMCotp).toBeFalsy();
});
it('should call function onSwitchingPurchaseType with newReg', inject([TypeofPurchaseService],
  (typeOfPurchaseService: TypeofPurchaseService) => {
  localStorage.removeItem('homeWirelessData');
  sessionStorage.setItem("UserToken", JSON.stringify("ljxqxkn6t7ylk6rx4ijnt2lrjzrx8of8"));
  sessionStorage.setItem("USER_TYPE",'GUEST');
 component.ngOnInit();
}));
it('should call function onSwitchingPurchaseType with newReg', inject([TypeofPurchaseService],
  (typeOfPurchaseService: TypeofPurchaseService) => {
  localStorage.removeItem('homeWirelessData');
  sessionStorage.setItem("UserToken", JSON.stringify("ljxqxkn6t7ylk6rx4ijnt2lrjzrx8of8"));
  sessionStorage.setItem("USER_TYPE",'MC');
 component.ngOnInit();
//  localStorage.removeItem('homeWirelessData');
  sessionStorage.removeItem("UserToken");
  sessionStorage.removeItem("USER_TYPE");

}));
it('should call function onSwitchingPurchaseType with newReg', inject([TypeofPurchaseService],
  (typeOfPurchaseService: TypeofPurchaseService) => {
  sessionStorage.removeItem("UserToken");
  localStorage.removeItem('homeWirelessData');
  component.ngOnInit();
//  localStorage.removeItem('homeWirelessData');
  
}));
});
