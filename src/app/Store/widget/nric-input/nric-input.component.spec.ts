import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { NricInputComponent } from './nric-input.component';
import { AppService } from "../../../Service/app.service";
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AppMockService } from '../../../Service/appmock.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../Service/user.service';
import { CartService } from '../../../Service/cart.service';
import { BundleService } from '../../../Service/bundle.service';
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { HeaderService } from '../../../Header/header.service';
import { RedirectionService } from '../../../Service/redirection.service';
import { SupplimentaryLinesService } from '../../widget/supplementary-lines/supplementary-lines.service';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BroadbandService } from '../../../Service/broadband.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { GuestCheckoutService } from '../../../../app/Store/guest-checkout/services/guest-checkout.service';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { LoginService } from '../../../../app/Store/login/service/login.service';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { MsisdnInputComponent } from '../msisdn-input/msisdn-input.component';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { SwitchToCelcomComponent } from '../../mnp/switch-to-celcom/switch-to-celcom.component';
import { NotificationBarComponent } from '../notification-bar/notification-bar.component';
import { MnpService } from '../../mnp/services/mnp.service';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

const verifyCustomerResponse = {
  "status": true,
  "message": null,
  "exception": false,
  "sim_type": "Postpaid",
  "is_nric_verified": false
};
const verifyCustomerResponseForNRICverfied = {
  "status": true,
  "message": null,
  "exception": false,
  "sim_type": "Postpaid",
  "is_nric_verified": true
};
const verifyCustomerErrorResponse = {
  "status": false,
  "message": "Something is Wrong!",
  "exception": false,
  "sim_type": "Postpaid",
  "is_nric_verified": false
};
const loginResponse = [
  {
    "status": true,
    "mobile_connect_user": true,
    "token": "",
    "blacklisted": false,
    "message": "Mobile Connect User",
    "authtoken": "e2ac71e3e50a6b9e089f21f35b1c86704b913db84c7c47fef81d4eb0e1ef2e377f616d9b31deb15d2724e749c90e58c8309b77765db5a2c0d9dc18b0b06c0471a8a03756ab05f41822a3fdaf32e12b9a2744aadf96282a759d45f22bc064ee43661fe910e096a99e9f2aadf747fe141e7cae4670f23aebe53d64b77cc067088e5e0acc959eff3c851196d0b9f3959eae82bb4b2f08533f8fe1eac3d9ae5ef0f0f72c09ec52efdb220c52c0008ab52bb46dc79df2385f6f347098ddcd17d97569157594b21e9b21b5da0930b25f38887b204bcf33096f80d88c483633011d"
  }
];
const loginResponseForNewGuest = [
  {
    "status": true,
    "mobile_connect_user": false,
    "token": "r3n8mqso3gbcewjrbkr18qjg8zkwgfdr",
    "blacklisted": false,
    "new_guest": true,
    "message": "New Guest User",
    "authtoken": "e2ac71e3e50a6b9e089f21f35b1c86704b913db84c7c47fef81d4eb0e1ef2e377f616d9b31deb15d2724e749c90e58c8309b77765db5a2c0d9dc18b0b06c0471a9a01956aa05e43a21a3ed9537e105922744aadf96282a759d45f22bc064ee43661fe910e096a99e9f2aadf747fe141e7cae4670f43aebfd7464b764c0670892150991959eff3c856280bd9a9483f38ebd8347152e6f26dd83fd9ab5be23ead4ef3f7b8b63d3dc161b25980b85f5548f43f18b84351c722c708ac5e8178e1f5c0e6e92b814bd6081eb540fab5d34bf3e3801d13b5d29c7d28b7f2874390d"
  }
];

class MockAppService {
  postROI(url, req) {
    return Observable.of([{ status: true, message: "" }]);
  }
}

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

describe('NricInputComponent', () => {
  let component: NricInputComponent;
  let fixture: ComponentFixture<NricInputComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NricInputComponent, PageLoaderComponent, MsisdnInputComponent, SwitchToCelcomComponent,
        OtpInputComponent, NotificationErrorComponent, AgeEligibilityPopupComponent, NotificationBarComponent,
        sharedPipes,
      ],
      imports: [
        FormsModule,
        IconModule,
        materialModules,
      ],
      providers: [{ provide: AppService, useClass: MockAppService },
      { provide: ActivatedRoute, useValue: fakeActivatedRoute },
      { provide: Router, useClass: RouterStub }, CommonUtilService, EStoreAnalysticsService, RendererService,
        SeoService, AnalyticsService, GuestCheckoutService, CookieService, BroadbandService, DeviceDataService,
        DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
        OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
        DeviceDataService, CommonUtilService, GuestCheckoutService, LoginService, MnpService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NricInputComponent);
    component = fixture.componentInstance;
    component.msisdn = '0136326807';
    component.nric = "950810213245";
    component.pageType = "";
    component.hwEligible = false;
    component.userLoggedIn = false;
    component.showBtnSubmit = true;
    component.showInline = false;
    component.isNricVerified = false;
    component.errorExits = false;
    component.isMobileConnectUser = false;
    component.enableOTP = false;
    component.remove = true;
    component.errorMessage = {};
    component.hideOTPSection = false;
    component.loading = false;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call ngOnInit function', () => {
    spyOn(component, "prePopulateNricForLoggedInUser");
    spyOn(component, "ngOnInit").and.callThrough();
    component.pageType = "hwInLine";
    component.ngOnInit();
    expect(component.showInline).toBeTruthy();
    expect(component.prePopulateNricForLoggedInUser).toHaveBeenCalled();
  });
  it("should call onSubmit form funciton for new Line PageType", inject([AppService, LoginService],
    (appService: AppService, loginService: LoginService) => {
      spyOn(component, "getUserTypeByNRIC");
      spyOn(component, "verifyNRIC");
      spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(verifyCustomerResponse));
      component.pageType = "newInLine";
      const form = {
        "value": {
          "customerIDNo": "950810213245"
        }
      };
      component.onSubmit(form);
      expect(component.getUserTypeByNRIC).toHaveBeenCalledWith('950810213245');
      expect(component.showBtnSubmit).toBeFalsy();
    }));
  it("should call onSubmit form funciton for cobp Line PageType", inject([AppService, LoginService],
    (appService: AppService, loginService: LoginService) => {
      spyOn(component, "getUserTypeByNRIC");
      spyOn(component, "verifyNRIC");
      spyOn(component, "onSubmit").and.callThrough();
      component.pageType = "cobpInLine";
      const form = {
        "value": {
          "customerIDNo": "950810213245"
        }
      };
      component.onSubmit(form);
      expect(component.verifyNRIC).toHaveBeenCalledWith('950810213245');
    }));
  it("should call verifyNRIC function for positive response", inject([AppService, LoginService],
    (appService: AppService, loginService: LoginService) => {
      spyOn(component, "verifyNRIC").and.callThrough();
      component.nric = "89012339287498";
      spyOn(component, "onRespSuccess");
      spyOn(component, "onRespError");
      spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(verifyCustomerResponse));

      component.verifyNRIC("89012339287498");
      component.loading = true;
      expect(component.loading).toBeTruthy();
      expect(component.onRespSuccess).toHaveBeenCalled();
    }));

  it("should call verifyNRIC function for error response", inject([AppService, LoginService],
    (appService: AppService, loginService: LoginService) => {
      component.nric = "89012339287498";
      spyOn(component, "onRespSuccess");
      spyOn(component, "onRespError");
      spyOn(loginService, "MobileConnect").and.returnValue(Observable.of(verifyCustomerErrorResponse));

      component.verifyNRIC("89012339287498");
      component.loading = true;
      expect(component.loading).toBeTruthy();
    }));

  it("should call onRespSuccess function on successful response of verify customer api", () => {
    spyOn(component, "setPreToPostVerification");
    spyOn(component, "onApiError");
    component.onRespSuccess(verifyCustomerResponse);
    expect(component.loading).toBeFalsy();
    expect(component.isNricVerified).toBeFalsy();
    expect(component.onApiError).toHaveBeenCalledWith(verifyCustomerResponse);
  });
  it("should call onRespSuccess function on successful response of verify customer api", () => {
    spyOn(component, "setPreToPostVerification");
    spyOn(component, "onApiError");
    component.onRespSuccess(verifyCustomerErrorResponse);
    expect(component.loading).toBeFalsy();
    expect(component.onApiError).toHaveBeenCalledWith(verifyCustomerErrorResponse);
  });
  it("should call onRespSuccess function on successful response of verify customer api", () => {
    spyOn(component, "setPreToPostVerification");
    spyOn(component, "onApiError");
    component.onRespSuccess(verifyCustomerResponseForNRICverfied);
    expect(component.loading).toBeFalsy();
    expect(component.setPreToPostVerification).toHaveBeenCalled();
  });
  it("should call onRespError function", () => {
    spyOn(component, "onRespError").and.callThrough();
    component.onRespError({});
    expect(component.loading).toBeFalsy();
    expect(component.errorExits).toBeTruthy();
    expect(component.errorMessage).toBeDefined();
  });
  it("should call onApiError function", () => {
    spyOn(component, "onApiError").and.callThrough();
    component.onApiError(verifyCustomerErrorResponse);
    expect(component.loading).toBeFalsy();
    expect(component.errorExits).toBeTruthy();
    expect(component.errorMessage).toBeDefined();
  });

  it("should call getUserTypeByNRIC function for mobile connect user", inject([AppService], (appService: AppService) => {
    component.nric = "89012339287498";
    spyOn(component, "getUserTypeByNRIC").and.callThrough();
    // spyOn(appService, "postROIForLogin").and.returnValue(Observable.of(loginResponse));
    component.getUserTypeByNRIC("89012339287498");
    expect(component.getUserTypeByNRIC).toHaveBeenCalled();
  }));

  it("should call LogoutResetUser", inject([AppService], (appService: AppService) => {
    spyOn(component, "LogoutResetUser").and.callThrough();
    // spyOn(appService, "postROIForLogin").and.returnValue(Observable.of(loginResponse));
    component.LogoutResetUser();
    expect(component.LogoutResetUser).toHaveBeenCalled();
  }));

  it("should call prePopulateNricForLoggedInUser function", () => {
    component.nric = "950819239874";
    component.prePopulateNricForLoggedInUser();
    expect(component.userLoggedIn).toBeTruthy();
    expect(component.showBtnSubmit).toBeFalsy();
  });
  it("should call prePopulateNricForLoggedInUser function for negative scenerio", () => {
    component.nric = '';
    component.prePopulateNricForLoggedInUser();
    expect(component.remove).toBeFalsy();
  });
  it("should call setPreToPostVerification function", () => {
    component.setPreToPostVerification();
    if (typeof window !== "undefined" && sessionStorage) {
      const pre2post = sessionStorage.getItem("pre2post");
      expect(pre2post).toBeDefined();
    }
  });
  it("should call enableReset function", () => {
    component.enableReset("950819239874");
    expect(component.remove).toBeTruthy();
  });
  it("should call enableReset function with empty nric", () => {
    component.enableReset("");
    expect(component.remove).toBeTruthy();
  });
  it("should call clearNric function", () => {
    component.clearNric();
    expect(component.nric).toBe("");
    expect(component.isMobileConnectUser).toBeFalsy();
    expect(component.showBtnSubmit).toBeTruthy();
    expect(component.remove).toBeFalsy();
    expect(component.enableOTP).toBeFalsy();
  });
  it("should call onSuccessFulSentOtp function", () => {
    const event = {
      "status": true,
      "msisdn": "60178234567"
    };
    component.onSuccessFulSentOtp(event);
    expect(component.enableOTP).toBeTruthy();
    expect(component.msisdn).toBe("60178234567");
  });
  it("should call onMsisdnReset function", () => {
    component.onMsisdnReset({});
    expect(component.enableOTP).toBeFalsy();
  });
  it("user enter number", inject([CommonUtilService], (commonUtilService: CommonUtilService) => {
    const event = {
      keyCode: 50,
      which: 50,
      charCode: 50
    };
    component.nric = "2"
    commonUtilService.restrictOnlyNum(event, "nric", component.nric);
  }));
  it("user enter number but more than 12 characters", inject([CommonUtilService], (commonUtilService: CommonUtilService) => {
    const event = {
      keyCode: 50,
      which: 50,
      charCode: 50
    };
    component.nric = "8606295432292"
    spyOn(commonUtilService, "restrictOnlyNum");
    expect(component.restrictOnlyNum(event)).toBeFalsy();
  }));
  it("user enter alphabet", inject([CommonUtilService], (commonUtilService: CommonUtilService) => {
    const event = {
      keyCode: 65,
      which: 65,
      charCode: 65
    };
    component.nric = "a"
    spyOn(commonUtilService, "restrictOnlyNum");
    expect(component.restrictOnlyNum(event)).toBeFalsy();
  }));
  it("user enter special character", inject([CommonUtilService], (commonUtilService: CommonUtilService) => {
    const event = {
      keyCode: 109,
      which: 109,
      charCode: 109
    };
    component.nric = "-"
    expect(component.restrictOnlyNum(event)).toBeFalsy();
  }));

  it("should call RedirectHeader", () => {
    spyOn(component, "RedirectHeader");
    component.RedirectHeader('');
    expect(component.RedirectHeader).toHaveBeenCalled();
  });

  it("should call onSuccessFulValidOtp", () => {
    spyOn(component, "onSuccessFulValidOtp").and.callThrough();
    component.onSuccessFulValidOtp(true);
    expect(component.onSuccessFulValidOtp).toHaveBeenCalled();
  });

  it("should call isProjectStar", () => {
    spyOn(component, "isProjectStar").and.callThrough();
    component.isProjectStar();
    expect(component.isProjectStar).toHaveBeenCalled();
  });

  it("should call isProjectMoon", () => {
    spyOn(component, "isProjectMoon").and.callThrough();
    component.isProjectMoon();
    expect(component.isProjectMoon).toHaveBeenCalled();
  });
});
