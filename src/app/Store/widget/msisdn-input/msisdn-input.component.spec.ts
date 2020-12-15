import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MsisdnInputComponent } from './msisdn-input.component';
import { NricInputComponent } from '../nric-input/nric-input.component';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { AppService } from '../../../Service/app.service';
import { LoginService } from '../../login/service/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { Renderer2 } from '@angular/core';
import { UserService } from '../../../Service/user.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { AppMockService } from '../../../Service/appmock.service';
import { NotificationErrorComponent } from '../notification-error/notification-error.component';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe, LOCATION_INITIALIZED } from '@angular/common';
import { Broadcaster } from '../../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../../Service/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { Observable } from 'rxjs';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

const loginResponse = [
  {
    "exists": true,
    "message": "DeliveredToNetwork",
    "state": "1570673202684219",
    "status": true
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
const verifyCustomerResponse = {
  "status": true,
  "message": null,
  "exception": false,
  "sim_type": "Postpaid",
  "is_nric_verified": false
};
const verifyCustomerErrorResponse = {
  "status": false,
  "message": "Something is Wrong!",
  "exception": false,
  "sim_type": "Postpaid",
  "is_nric_verified": false
};
const verifyCustomerPrepaidResponse = {
  "status": true,
  "message": null,
  "exception": false,
  "sim_type": "Prepaid",
  "is_nric_verified": false
};
const verifyCustomerStatusFalseResponse = {
  "status": false,
  "message": null,
  "exception": false,
  "sim_type": "Prepaid",
  "is_nric_verified": false
};

class MockRouter {
  snapshot(url: string) {
    return url;
  }
}

class MockAppService {
  postROI(endpoint: string, jsonData: any, token?: string) {
    return Observable.of(loginResponse);
  }
}

const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;
describe('MsisdnInputComponent', () => {
  let component: MsisdnInputComponent;
  let fixture: ComponentFixture<MsisdnInputComponent>;
  //   const MockloginService = {
  //     MobileConnect: jasmine.createSpy('MobileConnect').and.returnValue(Observable.of(loginResponse))
  // };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MsisdnInputComponent, NricInputComponent, OtpInputComponent,
        NotificationErrorComponent, PageLoaderComponent,
        sharedPipes,
      ],
      providers: [AppService, EStoreAnalysticsService, Renderer2,
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AppService, useClass: MockAppService },
        LoginService, UserService, CommonUtilService,
        AnalyticsService, RendererService, SeoService, DeviceDataService,
        DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService],
      imports: [
        FormsModule,
        
        IconModule,
        materialModules,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MsisdnInputComponent);
    component = fixture.componentInstance;
    component.pageType = "";
    component.nric = "";
    component.msisdn = "";
    component.message = "";
    component.invalidmsisdn = false;
    component.state = " ";
    component.errorMessage = {};
    component.errorExits = false;
    component.disableAfterClick = false;
    component.isCSAgentDealer = false;
    component.loading = false;
    component.isMnp = false;
    component.enableNRICAuthentication = false;
    component.loginButtonTxt = "Submit";
    component.enableMCotpBox = false;
    component.msisdnOtpBox = false;
    component.showSendOtp = true;
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit function', inject([LoginService], (loginService: LoginService) => {
    spyOn(loginService, "isCobpLogin").and.returnValue(true);
    component.ngOnInit();
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      expect(component.isCSAgentDealer).toBeTruthy();
    } else {
      expect(component.isCSAgentDealer).toBeFalsy();
    }

    const cobpLogin = loginService.isCobpLogin() || false;
    if (cobpLogin) {
      expect(component.loginButtonTxt).toBe('Submit');
    }
  }));
  it('should call clearMsisdn', () => {
    component.clearMsisdn();
    expect(component.msisdn).toBe('');
    expect(component.enableNRICAuthentication).toBeFalsy();
    expect(component.showSendOtp).toBeTruthy();
    expect(component.enableMCotpBox).toBeFalsy();
  });
  it('should call onLogin function', () => {
    spyOn(component, "onMsisdnEnter");
    const event = {
      "keyCode": 13
    };
    const form = {};
    component.invalidmsisdn = false;
    component.msisdn = '564645332';
    component.onLogin(event, form);
    component.msisdn = '0564645332';
    component.onLogin(event, form);
    component.msisdn = '6564645332';
    component.onLogin(event, form);
    expect(component.errorExits).toBeFalsy();
    expect(component.onMsisdnEnter).toHaveBeenCalledWith(form);
  });
  it('should call validateMsisdn function', inject([LoginService], (loginService: LoginService) => {
    component.msisdn = "0122372875";
    component.validateMsisdn();
    expect(component.invalidmsisdn).toBe(loginService.validateMsisdnLength(component.msisdn));

  }));
  it('should call validateMsisdn function', inject([LoginService], (loginService: LoginService) => {
    component.msisdn = "";
    component.validateMsisdn();
    expect(component.invalidmsisdn).toBeFalsy();
  }));
  it('should call onMsisdnEnter function with msisdn number prefix 0', () => {
    spyOn(component, "routeToNext");
    const form = {};
    component.msisdn = "0122372875";
    component.onMsisdnEnter(form);
    expect(component.disableAfterClick).toBeTruthy();
    expect(component.loading).toBeTruthy();
    expect(component.msisdn).toBe("60122372875");
    expect(component.routeToNext).toHaveBeenCalled();
  });
  it('should call routeToNext function for cobp line', () => {
    spyOn(component, "getMsisdnType");
    component.pageType = "cobpInLine";
    component.routeToNext();
    expect(component.getMsisdnType).toHaveBeenCalled();
  });
  it('should call routeToNext function for new line', () => {
    spyOn(component, "callSendOtp");
    component.pageType = "InLine";
    component.routeToNext();
    expect(component.callSendOtp).toHaveBeenCalled();
  });
  //   "/rest/V1/sentOtp"
  //   mobile_number: "60198857204"
  // nric: undefined
  // tnc: null
  it('should call callSendOtp function', inject([LoginService], (loginService: LoginService) => {
    component.msisdn = "60198857204";
    const apiURL = "/rest/V1/sentOtp";
    const requestBody = {
      "mobile_number": "60198857204",
      "nric": "",
      "tnc": null
    };
    spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(loginResponse));
    component.callSendOtp();
    expect(loginService.MobileConnect).toHaveBeenCalledWith(apiURL, requestBody);
    expect(component.loading).toBeFalsy();
    if (typeof window !== 'undefined' && localStorage) {
      const msisdn = localStorage.getItem("MyMsIsdn") ? localStorage.getItem("MyMsIsdn") : "";
      const state = localStorage.getItem("State") ? localStorage.getItem("State") : null;
      expect(msisdn).toBe("60198857204");
      expect(state).toBe("1570673202684219");
    }
    expect(component.enableMCotpBox).toBeTruthy();
    expect(component.showSendOtp).toBeFalsy();
  }));
  it('should call callSendOtp function with error response', inject([LoginService], (loginService: LoginService) => {
    component.msisdn = "60198857204";
    const apiURL = "/rest/V1/sentOtp";
    const requestBody = {
      "mobile_number": "60198857204",
      "nric": "",
      "tnc": null
    };
    spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(mockLoginErrorResponse));
    component.callSendOtp();
    expect(loginService.MobileConnect).toHaveBeenCalledWith(apiURL, requestBody);
    expect(component.loading).toBeFalsy();
    if (typeof window !== 'undefined' && localStorage) {
      const msisdn = localStorage.getItem("MyMsIsdn") ? localStorage.getItem("MyMsIsdn") : "";
      const state = localStorage.getItem("State") ? localStorage.getItem("State") : null;
      expect(msisdn).toBe("60198857204");
      expect(state).toBe("1570673202684219");
    }
    expect(component.errorMessage).toBeDefined();
    expect(component.errorExits).toBeTruthy();
  }));
  it('should call callSendOtp function with exits false', inject([LoginService], (loginService: LoginService) => {
    component.msisdn = "60198857204";
    const apiURL = "/rest/V1/sentOtp";
    const requestBody = {
      "mobile_number": "60198857204",
      "nric": "",
      "tnc": null
    };
    spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(loginErrorResponse));
    component.callSendOtp();
    expect(loginService.MobileConnect).toHaveBeenCalledWith(apiURL, requestBody);
    expect(component.loading).toBeFalsy();
    if (typeof window !== 'undefined' && localStorage) {
      const msisdn = localStorage.getItem("MyMsIsdn") ? localStorage.getItem("MyMsIsdn") : "";
      const state = localStorage.getItem("State") ? localStorage.getItem("State") : null;
      expect(msisdn).toBe("60198857204");
      expect(state).toBe("1570673202684219");
    }
    expect(component.popupStyle).toBeDefined();
  }));
  it('should call getMsisdnType', inject([LoginService], (loginService: LoginService) => {
    component.msisdn = "60133604261";
    spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(verifyCustomerResponse));
    spyOn(component, "onSuccess");
    spyOn(component, "onErr");
    component.getMsisdnType();
    expect(component.onSuccess).toHaveBeenCalledWith(verifyCustomerResponse);
  }));
  it('should call onSuccess function after successful api response', () => {
    spyOn(component, "callSendOtp");
    component.onSuccess(verifyCustomerResponse);
    expect(component.loading).toBeFalsy();
    expect(component.callSendOtp).toHaveBeenCalled();
  });
  it('should call onErr function', () => {
    component.onErr({});
    expect(component.loading).toBeFalsy();
    expect(component.errorExits).toBeTruthy();
  });
  it('should call onApiErr function', () => {
    component.onApiErr(verifyCustomerErrorResponse);
    expect(component.errorExits).toBeTruthy();
    expect(component.errorMessage).toBeDefined();
  });
  it('should call ResetMsisdnOtp function', () => {
    component.ResetMsisdnOtp();
    expect(component.enableMCotpBox).toBeFalsy();
  });

  it('should call setPopupHidden function', () => {
    component.setPopupHidden();
    expect(component.popupStyle).toBeDefined();
  });

  it('should call onMsisdnEnter function with msisdn number prefix 6', () => {
    spyOn(component, "routeToNext");
    const form = {};
    component.msisdn = "60122372875";
    component.onMsisdnEnter(form);
    expect(component.disableAfterClick).toBeTruthy();
    expect(component.loading).toBeTruthy();
    expect(component.msisdn).toBe("60122372875");
    expect(component.routeToNext).toHaveBeenCalled();
  });

  it('should call onTCAgree', () => {
    const objSpyDeviceData = TestBed.get(DeviceDataService);
    objSpyDeviceData.sharedMCTnCPopUpStyle$ = Observable.of('callOnTCAgree');
    spyOn(component, "onTCAgree");
    component.msisdn = "60122372875";
    component.ngOnInit();
    expect(component.onTCAgree).toHaveBeenCalled();
  });

  it('should call onTCAgree function with success response', inject([LoginService], (loginService: LoginService) => {
    component.msisdn = "60198857204";
    const apiURL = "/rest/V1/sentOtp";
    const requestBody = {
      "mobile_number": "60198857204",
      "nric": "",
      "tnc": true
    };
    spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(loginResponse));
    component.onTCAgree();
    expect(loginService.MobileConnect).toHaveBeenCalledWith(apiURL, requestBody);
    expect(component.loading).toBeFalsy();
  }));

  it('should call onTCAgree function with error response', inject([LoginService], (loginService: LoginService) => {
    component.msisdn = "60198857204";
    const apiURL = "/rest/V1/sentOtp";
    const requestBody = {
      "mobile_number": "60198857204",
      "nric": "",
      "tnc": true
    };
    spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(mockLoginErrorResponse));
    component.onTCAgree();
    expect(loginService.MobileConnect).toHaveBeenCalledWith(apiURL, requestBody);
    expect(component.loading).toBeFalsy();
  }));

  it('should call ngAfterViewInit', inject([EStoreAnalysticsService], (estoreAnalytic: EStoreAnalysticsService) => {
    const obSpyActivatedRoute = TestBed.get(ActivatedRoute);
    obSpyActivatedRoute.data = Observable.of({ pageTitle: "", pageCategory2: "" });
    const obSpyRoute = TestBed.get(Router);
    obSpyRoute.routerState = { snapshot: { url: '/' } };
    spyOn(estoreAnalytic, "ManageAnalytics");
    component.ngAfterViewInit();
    expect(estoreAnalytic.ManageAnalytics).toHaveBeenCalled();
  }));

  it('should call onSuccess with Prepaid Response', () => {
    component.onSuccess(verifyCustomerPrepaidResponse);
    expect(component.loading).toBeFalsy();
    expect(component.enableNRICAuthentication).toBeTruthy();
  });

  it('should call onApiErr', () => {
    spyOn(component, "onApiErr");
    component.onSuccess(verifyCustomerStatusFalseResponse);
    expect(component.loading).toBeFalsy();
    expect(component.onApiErr).toHaveBeenCalledWith(verifyCustomerStatusFalseResponse);
  });
  it("user enter number", inject([CommonUtilService], (commonUtilService: CommonUtilService) => {
    const event = {
      keyCode: 50,
      which: 50,
      charCode: 50
    };
    component.msisdn = "2"
    commonUtilService.restrictOnlyNum(event, "contactMobileNum", component.nric);
  }));
  it("user enter number but more than 11 characters", inject([CommonUtilService], (commonUtilService: CommonUtilService) => {
    const event = {
      keyCode: 50,
      which: 50,
      charCode: 50
    };
    component.msisdn = "601325492422"
    commonUtilService.restrictOnlyNum(event, "contactMobileNum", component.nric);
  }));
  it("user enter alphabet", inject([CommonUtilService], (commonUtilService: CommonUtilService) => {
    const event = {
      keyCode: 65,
      which: 65,
      charCode: 65
    };
    component.msisdn = "a"
    commonUtilService.restrictOnlyNum(event, "contactMobileNum", component.nric);
  }));
  it("user enter special character", inject([CommonUtilService], (commonUtilService: CommonUtilService) => {
    const event = {
      keyCode: 109,
      which: 109,
      charCode: 109
    };
    component.msisdn = "-"
    commonUtilService.restrictOnlyNum(event, "contactMobileNum", component.nric);
  }));

  it('should call callOnNricVerification', () => {
    const spy = spyOn(component, 'callOnNricVerification').and.callThrough();
    component.callOnNricVerification();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onValidOtp', () => {
    const spy = spyOn(component, 'onValidOtp').and.callThrough();
    component.onValidOtp(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should call isProjectStar', () => {
    const spy = spyOn(component, 'isProjectStar').and.callThrough();
    component.isProjectStar();
    expect(spy).toHaveBeenCalled();
  });
  it('should call restrictOnlyNum', () => {
    const spy = spyOn(component, 'restrictOnlyNum').and.callThrough();
    component.restrictOnlyNum({keyCode:8, which:0});
    component.msisdn = '6564645332';
    component.restrictOnlyNum({keyCode:8, which:0});
    expect(spy).toHaveBeenCalled();
  });
});
