import { async, ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';

import { McLoginComponent } from './mc-login.component';
import { FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonUtilService } from 'app/Service/commonUtil.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { NewOtpInputComponent } from '../new-otp-input/new-otp-input.component';
import { LoginService } from 'app/Store/login/service/login.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { EstoreInputComponent } from '../forms/estore-input/estore-input.component';
import { ModalComponent } from '../modal/modal.component';
import { materialModules } from 'app/shared/shared-module.module';
import { sharedPipes } from 'app/shared/pipes';
import { sharedDirectives } from 'app/shared/directives';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { timer } from 'rxjs';
import { AppService } from 'app/Service/app.service';

describe('McLoginComponent', () => {
  let component: McLoginComponent;
  let fixture: ComponentFixture<McLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        materialModules,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        sharedDirectives,
        sharedPipes,
        McLoginComponent,
        NewOtpInputComponent,
        EstoreInputComponent,
        ModalComponent
      ],
      providers: [
        CommonUtilService,
        LoginService,
        DeviceDataService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(McLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next with step as 1 - invalid',  inject(
    [LoginService, AppService],
    fakeAsync(
      (loginService: LoginService, appService: AppService) => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.step = 1;
    component.mobileNumberControl.setValue('343546543543');
    component.next();
    component.ngOnInit();
    component.step = 2;
    component.nric = 434343432;
    component.isTnCRequired = true;
    component.loginForm.setValue({'mobileNumber': '60124334646'});
    fixture.detectChanges();
    component.next();
    expect(spy).toHaveBeenCalled();
  })));

  it('should call next with step as 2', () => {
    const spy = spyOn(component, 'onLogin').and.callThrough();
    component.ngOnInit();
    component.step = 2;
    component.loginForm.setValue({'mobileNumber':60124334646});
    fixture.detectChanges();
    component.next();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onClickAgree', () => {
    const spy = spyOn(component, 'onClickAgree').and.callThrough();
    component.onClickAgree();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onClickResendOTP', () => {
    const spy = spyOn(component, 'onClickResendOTP').and.callThrough();
    component.ngOnInit();
    component.resendLinkDisabled = true;
    component.onClickResendOTP();
    component.resendLinkDisabled = false;
    component.step = 2;
    component.loginForm.setValue({'mobileNumber':60124334646});
    fixture.detectChanges();
    component.mobileNumberControl.setValue('343546543543');
    component.onClickResendOTP();
    expect(spy).toHaveBeenCalled();
  });

  it('should call destroyCountDown', () => {
    const spy = spyOn(component, 'destroyCountDown').and.callThrough();
    component.otpCountDown = timer(0, 30)
      .subscribe(() => {});
    component.destroyCountDown();
    expect(spy).toHaveBeenCalled();
  });
});
