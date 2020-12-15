import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { LoginHomeComponent } from '../../../Store/login/login-home/login-home.component';
import { MinifiedPageLoaderComponent } from '../../../Store/widget/minified-page-loader/minified-page-loader.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../Footer/footer.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { SocialMediaComponent } from '../../../Footer/SocialMedia/socialmedia.component';
import { FooterDownloadComponent } from '../../../Footer/Download/download.component';
import { AppService } from '../../../Service/app.service';
import { AppMockService } from '../../../Service/appmock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../Service/user.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { NricInputComponent} from '../../../Store/widget/nric-input/nric-input.component';
import { OtpInputComponent } from '../../widget/otp-input/otp-input.component';
import { MsisdnInputComponent } from '../../widget/msisdn-input/msisdn-input.component';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { of } from 'rxjs/observable/of';
import { SharedModule } from "../../../shared/shared-module.module";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
    routerState = {
        snapshot: {
            url: '/store/login'
        }
    }
}
class MockactivatedRoute {
    data = of({

    });

    snapshot(url: string) {
        return url;
    }
}
describe('LoginHomeComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
      } as ActivatedRoute;
    let component: LoginHomeComponent;
    let fixture: ComponentFixture<LoginHomeComponent>;
    let service: LoginService;
    const response = [
        {
            "status": true,
            "state": "1553668962834261",
            "message": "MessageWaiting",
            "exists": true
        }
    ];
    const MockloginService = {
        MobileConnect: jasmine.createSpy('MobileConnect').and.returnValue(Observable.of(response))
    };
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, SharedModule],
            declarations: [LoginHomeComponent, MinifiedPageLoaderComponent, FooterComponent, AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, NricInputComponent, MsisdnInputComponent, OtpInputComponent,
                 NotificationErrorComponent],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
            { provide: Router, useClass: RouterStub },
            { provide: LoginService, useValue: MockloginService },
            { provide: ActivatedRoute, useClass: MockactivatedRoute },
            EStoreAnalysticsService, AnalyticsService, RendererService, SeoService, CommonUtilService, DeviceDataService, DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    }));
    beforeEach(inject([LoginService], (loginService) => {
        service = loginService;
        fixture = TestBed.createComponent(LoginHomeComponent);
        component = fixture.componentInstance;
    }));
    it('should create component', () => {
        expect(component).toBeTruthy();
    });
    it('should create method', () => {
        expect(component.validMsisdn).toBeDefined();
        expect(component.loginThroughEnterButton).toBeDefined();
        expect(component.onLoginClick).toBeDefined();
        expect(component.close__terms__login).toBeDefined();
        expect(component.TermsFunction).toBeDefined();
    });
    it('should validate the input', () => {
        const regexPattern = fixture.debugElement.nativeElement.querySelector('input').value;
        expect(regexPattern).toMatch(/^[0-9]*$/);
    });
    it("empty MSISDN should return false", () => {
        const event = {
            keyCode: 48,
            which: 48,
            charCode: 12
        };
        component.msisdn = '';
        component.validMsisdn(event); // Act
        expect(component.invalidmsisdn).toBeFalsy(); // Assert
    });
    it('valid msisdn for login', () => {
        const event = {
            keyCode: 48,
            which: 48,
            charCode: 12
        };
        if (component.msisdn && component.msisdn.charAt(0) === '6' && component.msisdn.charAt(0) === '0') {
            const msisdnArray = [ '', '6785643334343434' , '01234567567567567'];
            msisdnArray.forEach(value => {
                component.msisdn = value;
                component.validMsisdn(event);
                expect(component.invalidmsisdn).toBe(false);
            });
        }
    });
    it('invalid msisdn for login', () => {
        const event = {
            keyCode: 12,
            which: 12,
            charCode: 12
        };
        if (component.msisdn && component.msisdn.charAt(0) === '6' && component.msisdn.charAt(0) === '0') {
            const msisdnArray = [ '675849300156' , '08492888190' , '0988484884'];
            msisdnArray.forEach(value => {
                component.msisdn = value;
                component.validMsisdn(event);
                expect(component.invalidmsisdn).toBe(true);
            });
        }
    });
    it('Should check the closeTermsLogin method', () => {
        const popUpStyle = {
            'visibility': 'hidden'
        };
        component.close__terms__login();
        expect(component.popupStyle).toEqual(popUpStyle);
    });
    it('should check the selectors of another components', () => {
        const compiled = fixture.debugElement.nativeElement;
        if (component.loading) {
            expect(compiled.querySelector('app-minified-page-loader')).not.toEqual(null);
        }
    });
    it('checking the response for TermsFunction', () => {
        const apiUrl = "/rest/V1/sentOtp";
        const requestBody = {
            "mobile_number": component.msisdn,
            "tnc": true
        };
        service.MobileConnect(apiUrl, requestBody).subscribe((value) => {
            expect(value).toEqual(response);
            expect(value[0].status).toEqual(true);
            expect(value[0].state).toEqual('1553668962834261');
            expect(value[0].message).toEqual('MessageWaiting');
            expect(value[0].exists).toEqual(true);
        });
    });

    it('should clearMsisdn', () => {
        component.clearMsisdn();
        expect(component.msisdn).toBe('');
        expect(component.remove).toBeFalsy();
        expect(component.enableNRICAuthentication).toBeFalsy();
    });
    it('should be able to loginThroughEnterButton', () => {
        component.ngOnInit();
        spyOn(component, "loginThroughEnterButton");
        TestBed.get(ActivatedRoute).queryParams = of({

        });
        const event = {
            keyCode: 13
        };
        const form = {};
        component.errorExits = false;
        component.msisdn = '60132549242';
        spyOn(component, "onLoginClick");
        component.loginThroughEnterButton(event, form);
        fixture.detectChanges();
        expect(component.errorExits).toBeFalsy();
        // expect(component.loginThroughEnterButton).toHaveBeenCalled();
    });
    it('should check COBP Login', () => {
        spyOn(component, "ngOnInit");
        component.ngOnInit();
        localStorage.setItem('COBP_login', 'YES');
        localStorage.setItem('COBP_FLOW', 'YES');
        localStorage.setItem('COBP_login_Check', 'YES');
        localStorage.setItem('COBP_FLOW_CHECK', 'YES');
        const isCOBP = component.isCobpLogin();
        expect(isCOBP).toBeTruthy();
    });
    it('should check response errors', () => {
        component.onRespError({});
        const res = {
            message: 'Server error!'
        }
        component.onRespError({});
        component.onApiError(res);
        expect(component.loading).toBeFalsy();
        expect(component.errorExits).toBeTruthy();
        expect(component.errorMessage['message']).toBe(res.message);
    });
});
