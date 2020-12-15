import { async, ComponentFixture, TestBed, flushMicrotasks, fakeAsync, inject } from '@angular/core/testing';

import { AppleWatchComponent } from './apple-watch.component';
import { LoginService } from '../login/service/login.service';
import { AppService } from '../../Service/app.service';
import { NricInputComponent } from '../widget/nric-input/nric-input.component';
import { MsisdnInputComponent } from '../widget/msisdn-input/msisdn-input.component';
import { OtpInputComponent } from '../widget/otp-input/otp-input.component';
import { PageLoaderComponent } from '../../shared/components/page-loader/page-loader.component';
import { OrderInfoService } from '../../Service/orderinfo.service';
import { BundleService } from '../../Service/bundle.service';
import { UserService } from '../../Service/user.service';
import { HeaderService } from '../../Header/header.service';
import { CartService } from '../../Service/cart.service';
import { SupplimentaryLinesService } from '../widget/supplementary-lines/supplementary-lines.service';
import { SwitchToCelcomComponent } from '../mnp/switch-to-celcom/switch-to-celcom.component';
import { EStoreAnalysticsService } from '../../Service/store.analytic.service';
import { CommonUtilService } from '../../Service/commonUtil.service';
import { DeviceDataService } from '../../Service/devicedata.service';
import { Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AgeEligibilityPopupComponent } from '../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { NotificationBarComponent } from '../widget/notification-bar/notification-bar.component';
import { NotificationErrorComponent } from '../widget/notification-error/notification-error.component';
import { AppleWatchError } from '../../../constants/error.constants';
import { Observable } from 'rxjs/Observable';
import { FooterComponent } from '../../Footer/footer.component';
import { SocialMediaComponent } from '../../Footer/SocialMedia/socialmedia.component';
import { FooterDownloadComponent } from '../../Footer/Download/download.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Broadcaster } from '../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../Service/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

const mockEligibleResponse = [{
  status: true,
  message: "Message"
}];

class AppMockService {
  constructor() { }

  getEstoreUserData(url: any) {
    return Observable.of(mockEligibleResponse);
  }
}
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

describe('AppleWatchComponent', () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let component: AppleWatchComponent;
  let fixture: ComponentFixture<AppleWatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientTestingModule,
        IconModule,
        materialModules,
      ],
      providers: [LoginService, { provide: AppService, useClass: AppMockService },
        OrderInfoService, BundleService, UserService, LoginService,
        HeaderService, CartService, SupplimentaryLinesService, EStoreAnalysticsService, CommonUtilService, DeviceDataService,
        Renderer2, Broadcaster, NotificationPopupEvent, CookieService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: MockactivatedRoute }
      ],
      declarations: [AppleWatchComponent, NricInputComponent,
        MsisdnInputComponent, OtpInputComponent, 
        sharedPipes,
        PageLoaderComponent, SwitchToCelcomComponent, AgeEligibilityPopupComponent, NotificationBarComponent,
        NotificationErrorComponent, FooterComponent, FooterDownloadComponent, SocialMediaComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppleWatchComponent);
    component = fixture.componentInstance;

    let sessionStore = {};
    let mockSessionStorage = {
      getItem: (key: string): string => {
        return key in sessionStore ? sessionStore[key] : null;
      },
      setItem: (key: string, value: string) => {
        sessionStore[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete sessionStore[key];
      },
      clear: () => {
        sessionStore = {};
      }
    };
    spyOn(sessionStorage, 'getItem')
      .and.callFake(mockSessionStorage.getItem);
    spyOn(sessionStorage, 'setItem')
      .and.callFake(mockSessionStorage.setItem);
    spyOn(sessionStorage, 'removeItem')
      .and.callFake(mockSessionStorage.removeItem);
    spyOn(sessionStorage, 'clear')
      .and.callFake(mockSessionStorage.clear);

    let localStore = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in localStore ? localStore[key] : null;
      },
      setItem: (key: string, value: string) => {
        localStore[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete localStore[key];
      },
      clear: () => {
        localStore = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  afterEach(async(() => {
    sessionStorage.clear();
    localStorage.clear();
  }));

  it('should create', () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy();
  });

  it('should test onloadeligiblecheck', () => {
    spyOn(component, 'onLoadEligibilityCheck').and.callThrough();
    const guestInfo = { "blacklistChkRequest": { "customerIDType": "1", "customerIDNo": "860821543233", "customerIDTypeValue": "New NRIC" }, "outputCPResp": { "customerID": "860821543233", "dateOfBirth": "19860821_000000", "services": [{ "pre_Pos_Indicator": "Postpaid" }] } };
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestInfo));
    sessionStorage.setItem("UserInfo", JSON.stringify({ outputCPResp: { contactFirstName: "test" } }));
    localStorage.setItem("MyMsIsdn", "60123123123");
    component.onLoadEligibilityCheck();
    if (typeof window !== "undefined" && sessionStorage && localStorage) {
      if (sessionStorage.getItem("GuestInfo")) {
        expect(component.isLogin).toBeTruthy();
        expect(component.isExisting).toBeFalsy();
        expect(component.message).toBe(AppleWatchError.GUEST);
      }
      if (sessionStorage.getItem("UserInfo")) {
        expect(component.isLogin).toBeTruthy();
        expect(component.isNotRedirection).toBeFalsy();
        expect(component.CustomerNumber).toBe('0123123123');
      }
    }
  });

  it('should test onreset', () => {
    component.onReset('data');
    expect(component.enableMCAuthentication).toBeFalsy();
    expect(component.enableMCotp).toBeFalsy();
  });

  it('should test onCallResetOtp', () => {
    component.onCallResetOtp("data");
    expect(component.enableMCotp).toBeFalsy()
  });

  it('should test format number', () => {
    const result = component.formatNumber('601123456');
    expect(result).toBe('01123456');
  });

  it('should test onSentOtp', () => {
    const result: any = component.onSentOtp({ status: true, msisdn: '601123456', sim_type: 'sim_type' });
    if (result) {
      expect(component.enableMCotp).toBeTruthy();
      expect(component.msisdnOtp).toBe('01123456');
      expect(component.simType).toBe('sim_type');
    }
  });

  it('should test failed onMobileConnectUser blacklisted', inject([AppService], (appService: AppService) => {
    const data = {
      mcUser: null,
      nric: '971119146771',
      response: [{
        blacklisted: true,
        message: "Uh OH. your id is bared by another telco",
        status: false
      }]
    };

    spyOn(component, "OnMobileConnectUser").and.callThrough();
    component.OnMobileConnectUser(data);
    if (!data.mcUser) {
      if (data.response[0].blacklisted) {
        expect(component.isLogin).toBeTruthy();
        expect(component.isNotBlackListed).toBeFalsy();
        expect(component.message).not.toBeNull();
      }
    }
  }));

  it('should test failed onMobileConnectUser guest', inject([AppService], (appService: AppService) => {
    const data = {
      mcUser: null,
      nric: '971119146771',
      response: [{
        new_guest: true,
        message: "Uh OH. you are a new guest",
        status: false
      }]
    };
    spyOn(component, "OnMobileConnectUser").and.callThrough();
    component.OnMobileConnectUser(data);
    if (!data.mcUser) {
      if (data.response[0].new_guest) {
        expect(component.isLogin).toBeTruthy();
        expect(component.isExisting).toBeFalsy();
        expect(component.message).not.toBeNull();
      }
    }
  }));

  it('should test onMobileConnectUser', () => {
    spyOn(component, 'OnMobileConnectUser').and.callThrough();
    const data = {
      mcUser: true,
      nric: '860821543221',
      response: [{
        authtoken: "e2ac71e3e50a6b9e089f21f35b1c86704b913db84c7c47fef81d4eb0e1ef2e377f616d9b31deb15d2724e749c90e58c8309b77765db5a2c0d9dc18b0b06c0471a8a02756aa05da1469a0d3b37ae215862744aadf96282a759d45f22bc064ee43661fe910e096a99e9f2aadf748fe141235ae4670bb3aebe53964b770c76708961309f6959eff3c85699ac89cb4b6fe9faeae6560275a1488fec093879c5cb4eaf10a37d250faa20407069a78f7f7188138f7ac853a0e5b37169584944ef62c654e588bbf0bc173d6fc4205bd4e15825d3c4bcd2d2e33e6d6854a6051012b",
        blacklisted: false,
        message: "Mobile Connect User",
        mobile_connect_user: true,
        status: true,
        token: ""
      }]
    };
    component.OnMobileConnectUser(data);

    expect(component.enableMCAuthentication).toBeTruthy();
    expect(component.nric).toBe(data.nric);


  });

  it('should test onValidOtp', () => {
    spyOn(component, 'onValidOtp').and.callThrough();
    sessionStorage.setItem("UserInfo", JSON.stringify({ outputCPResp: { contactFirstName: "test" } }));
    localStorage.setItem("MyMsIsdn", "60123123123");
    const data = true;
    component.onValidOtp(data);
    expect(component.isLogin).toBeTruthy();
    expect(component.isNotRedirection).toBeTruthy();
    expect(component.flagCheck).toBeTruthy();
    expect(component.loading).toBeTruthy();
    expect(component.CustomerNumber).toBe('0123123123');
  });

});
