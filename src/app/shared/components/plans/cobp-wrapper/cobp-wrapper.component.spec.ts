import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CobpWrapperComponent } from "./cobp-wrapper.component";
import { McLoginComponent } from "../../mc-login/mc-login.component";
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { EstoreInputComponent } from "../../forms/estore-input/estore-input.component";
import { PageLoaderComponent } from "../../page-loader/page-loader.component";
import { EstoreCheckboxComponent } from "../../forms/estore-checkbox/estore-checkbox.component";
import { NewOtpInputComponent } from "../../new-otp-input/new-otp-input.component";
import { ModalComponent } from "../../modal/modal.component";
import { DeviceDataService } from "app/Service/devicedata.service";
import { ProductService } from "app/Service/product.service";
import { PlanPurchaseService } from "app/Store/plan/plan-purchase/plan-purchase.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HeaderService } from "app/Header/header.service";
import { GlobalErrorHandler } from "app/interceptors/error.interceptor";
import { CommonUtilService } from "app/Service/commonUtil.service";
import { TypeofPurchaseService } from "app/Service/type-of-purchase.service";
import { UserService } from "app/Service/user.service";
import { LoginService } from "app/Store/login/service/login.service";
import { PlansQuery } from "app/Widget/side-summary/side-summary-container/plans.store";
import { ModalService } from "../../modal/modal.service";
import { CobpWrapperService } from "./cobp-wrapper.service";
import { of } from "rxjs/observable/of";
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { sharedPipes } from 'app/shared/pipes';
import { sharedDirectives } from 'app/shared/directives';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
import { CobpNumberChooserComponent } from '../../device-combo/cobp-number-chooser/cobp-number-chooser.component';

const plan = {
  name: "test",
  PlanName: "test",
  sku: "test",
  url_key: "",
  order_plan_bundle: "",
  ngn_part_number: "",
  order_service_bundle: "",
  order_plan_component: [],
  PlanMonthlyPay: 1234,
  OneTimePayment: "",
  contract: "",
  offer: "",
  referrer_data: "",
  data_limit: "",
  monthlyPlan: "",
  monthly_plan: "",
  is_saleable: "",
  speed_limit: "",
  plan_title: "",
  plan_subtitle: "",
  BackgroundColor: "",
  upfront_installment: "",
  IndicatorClass: "",
  ProductText: "",
  KeyFiguresText: "",
  KeyText: "",
  product_text: "",
  key_figures_text: "",
  key_text: "",
  BuynowLink: "",
  BuynowText: "",
  knowMoreLink: "",
  knowMoreText: "",
  upper_age_limit: "",
  lower_age_limit: "",
  banner_image: "",
  mobile_image: "",
  is_xpax: true,
  MobileDescription: "",
  product_type: "",
  footNote: "",
  TableInfo: [],
  image_url: "",
  small_image_url: "",
  supplementary_data: [],
  addons: [],
  is_campaign_mviva: "",
  campaign_mviva: null,
  campaign_mviva_invalid: "",
  analytics_key_addtocart: null,
  telco_day: null,
  is_premium_plan: true,
  bill_type: 12,
  base_plan: "",
  pass_plan: "",
  parent_pass: "",
  is_default: "",
  associated_bundle_product: null,
  promotion_badge: null,
  promotion_text: "",
  promotion_terms: "",
  is_campaign_omni: true,
  campaign_omni: null
};

describe("CobpWrapperComponent", () => {
  let component: CobpWrapperComponent;
  let fixture: ComponentFixture<CobpWrapperComponent>;
  let Otpcomponent: NewOtpInputComponent;
  let Otpfixture: ComponentFixture<NewOtpInputComponent>;
  let userService: UserService;
  let loginService: LoginService;
  let cobpService: CobpWrapperService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CobpWrapperComponent,
        McLoginComponent,
        EstoreInputComponent,
        PageLoaderComponent,
        EstoreCheckboxComponent,
        NewOtpInputComponent,
        ModalComponent,
        sharedPipes,
        sharedDirectives,
        CobpNumberChooserComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        IconModule,
        materialModules,
      ],
      providers: [
        CommonUtilService,
        LoginService,
        PlansQuery,
        CobpWrapperService,
        TypeofPurchaseService,
        GlobalErrorHandler,
        HeaderService,
        UserService,
        ModalService,
        DeviceDataService,
        ProductService,
        PlanPurchaseService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobpWrapperComponent);
    component = fixture.componentInstance;
    Otpfixture = TestBed.createComponent(NewOtpInputComponent);
    component.otpForm = Otpfixture.debugElement.componentInstance;
    component.myForm = new FormGroup({
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern(component.formConstants.phone)
      ]),
      nric: new FormControl("", [
        Validators.required,
        Validators.pattern(component.formConstants.nric)
      ])
    });
    
    component.otpForm.otpForm = new FormGroup({
      input1: new FormControl("", [Validators.required]),
      input2: new FormControl("", [Validators.required]),
      input3: new FormControl("", [Validators.required]),
      input4: new FormControl("", [Validators.required]),
      input5: new FormControl("", [Validators.required]),
      input6: new FormControl("", [Validators.required])
    });
    component.otpForm.otpForm.setValue({
      input1: 1,
      input2: 1,
      input3: 1,
      input4: 1,
      input5: 1,
      input6: 1,
    });

    userService = TestBed.get(UserService);
    loginService = TestBed.get(LoginService);
    cobpService = TestBed.get(CobpWrapperService);
    fixture.detectChanges();
  });

  it("should create component ", () => {
    expect(component).toBeTruthy();
    expect(userService).toBeTruthy();
  });

  it("should call init with onSuccess", () => {
    const spy = spyOn(component, 'onSuccess').and.callThrough();
    spyOn(userService, "isCustomer").and.returnValue(true);
    spyOn(userService, "getMsisdn").and.returnValue("06879179234");
    component.enableNRICAuthentication = false;
    component.plan = plan;
    const result = {
      status: true,
      sim_type: "Prepaid",
      is_nric_verified: false
    };
    spyOn(loginService, "MobileConnect").and.returnValue(of(result));
    loginService.MobileConnect("", plan).subscribe(res => {
      expect(res).toEqual(result);
    });
    component.ngOnInit();    
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should call init with else part", () => {
    spyOn(userService, "getMsisdn").and.returnValue("06879179234");
    component.enableNRICAuthentication = false;
    component.plan = plan;
    component.step = 2;
    const result = {
      sim_type: "Postpaid",
      is_nric_verified: true
    };
    spyOn(loginService, "MobileConnect").and.returnValue(of(result));
    loginService.MobileConnect("", plan).subscribe(res => {
      expect(res).toEqual(result);
    });
    component.ngOnInit();
    fixture.detectChanges();
  });

  it("should create component", () => {
    component.changeNumber();
    fixture.detectChanges();
  });

  it("should call doValidateCOBP", () => {
    const userInfo = {
      blacklistChkRequest: null,
      outputCPResp: {
        customerID: "",
        dateOfBirth: "",
        preferredContactMethod: "",
        contactPreferredTime: "",
        contactEmail: "",
        contactSalutation: "",
        contactFirstName: "",
        services: [],

        country: "",
        planSegmentType: "",
        unitNo: "",
        segmentGroup: "",
        postalCode: "",
        section: "",
        contactType: "",
        type: "",
        poBox: "",
        contactHomePhone: "",
        state: "",
        streetType: "",
        contactMobileNum: "",
        motherMaidenName: "",
        gstTaxRelief: "",
        XPAX_DB_FLG: "",
        buildingName: "",
        XPAX_OPEN_FLG: "",
        nationality: "",
        customerIDType: "",
        preferredContactLang: "",
        name: "",
        segmentSubGroup: "",
        floorNo: "",
        contactLastName: "",
        salutation: "",
        PREPAIDOPENORD_FLG: "",
        gender: "",
        city: "",
        contactAlternateNum: "",
        contactRowID: "",
        facebookID: "",
        pakejOpenCount: "",
        googlePlusID: "",
        YOUTH_ACTIVE_COUNT: "",
        gstTaxReliefID: "",
        DB_OPEN_COUNT: "",
        billingType: "",
        customerRowId: "",
        contactBusinessPhone: "",
        addressYType: "",
        PREPAID_LINES_COUNT: "",
        race: "",
        twitterID: "",
        customerSince: "",
        pakejActiveCount: "",
        DB_COUNT: "",
        masterAccountNumber: "",
        billingAccountStatus: "",
        streetAddress: "",
        YOUTH_OPEN_COUNT: "",
        simType: "",
        esimInfo: ""
      }
    };

    const cobpResp = {
      status:false,
      response:"test",
      penaltyCheck: {
        status: true,
        endDate: "12/10/2020",
        productPromotionPartNumber: "",
        isActiveContract: true,
        productPromotionId: "",
        exception: true,
        current_plan: "",
        eligible_contract_extend: true,
        device_upfront_penalty: 12345
      },
      openOrder: null,
      blackList: null,
      productEligibility: null,
      customer_eligibility: null,
      golden_number_note: null,
      callBaring: null,
      contract_check: null,
      account_details: {
        principal_number: "123",
        plan_subscribed_to: "1234",
        supplementary_info: {supplementary_lines:[{text:"test"}]}
      },
      moon_eligibility: null,
      upfront_payment_check: null,
      validated_id: ""
    };
    spyOn(userService, "getUserInfo").and.returnValue(userInfo);
    spyOn(cobpService, "upgradeDowngrade").and.returnValue(of(cobpResp));
    cobpService.upgradeDowngrade(null, null).subscribe(res => {
      expect(res).toEqual(cobpResp);
    });
    component.doValidateCOBP();
    fixture.detectChanges();
  });

  it("should call setOpenOrderStatus", () => {
    const res = [
      {
        openOrder: {
          message: "test"
        }
      }
    ];
    component.setOpenOrderStatus(res);
    fixture.detectChanges();
  });
  
  it("should call callSendOtp", () => {
    const result = [{
      status: false,
      message: "failed",
      state: null
    }];
    spyOn(loginService, "MobileConnect").and.returnValue(of(result));
    component.callSendOtp();
    fixture.detectChanges();
  });

  it('should call onErr', () => {
    const spy = spyOn(component, 'onErr').and.callThrough();
    component.onErr('test');
    expect(spy).toHaveBeenCalled();
  });

  it('should call showErrorPoPup', () => {
    const spy = spyOn(component, 'showErrorPoPup');
    component.showErrorPoPup({message:'test'});
    expect(spy).toHaveBeenCalled();
  });

  it('should call changeCheckedValue', () => {
    const spy = spyOn(component, 'changeCheckedValue').and.callThrough();
    component.changeCheckedValue({keyCode:'8', which:'0'});
    expect(spy).toHaveBeenCalled();
  });

  it('should call onClickResendOTP', () => {
    const spy = spyOn(component, 'onClickResendOTP').and.callThrough();
    component.resendLinkDisabled = true;
    component.onClickResendOTP();
    expect(spy).toHaveBeenCalled();
  });

  it('should call onSuccess', () => {
    const spy = spyOn(component, 'onSuccess').and.callThrough();
    component.onSuccess({status :true, exception :false, sim_type: 'Prepaid', is_nric_verified : false});
    component.onSuccess({status :true, exception :false, sim_type: 'Prepaid', is_nric_verified : true});
    component.onSuccess({status :false});
    expect(spy).toHaveBeenCalled();
  });

  it('should call verifyPrincipalNumber 1', () => {
    const spy = spyOn(component, 'verifyPrincipalNumber').and.callThrough();
    component.step = 1;
    component.resendLinkDisabled = true;
    component.myForm.setValue({'nric':767676767676, 'phone':60124334646});   
    spyOn(loginService, "MobileConnect").and.returnValue(of({
      status: true,
      sim_type: "Prepaid",
      is_nric_verified: false
    }));
    component.verifyPrincipalNumber();
    expect(spy).toHaveBeenCalled();
  });

it('should call verifyPrincipalNumber 2', () => {
    const spy = spyOn(component, 'verifyPrincipalNumber').and.callThrough();
    component.step = 1;
    component.resendLinkDisabled = true;
    component.myForm.setValue({'nric':767676767676, 'phone':60124334646});   
    spyOn(loginService, "MobileConnect").and.returnValue(of({
      status: true,
      sim_type: "Prepaid",
      is_nric_verified: true
    }));
    component.verifyPrincipalNumber();
    expect(spy).toHaveBeenCalled();
  });

it('should call verifyPrincipalNumber 3', () => {
    const spy = spyOn(component, 'verifyPrincipalNumber').and.callThrough();
    component.step = 1;
    component.resendLinkDisabled = true;    
    component.myForm.setValue({'nric':767676767676, 'phone':60124334646});   
    spyOn(loginService, "MobileConnect").and.returnValue(of({
      status: false,
      sim_type: "Prepaid",
      is_nric_verified: true
    }));
    component.verifyPrincipalNumber();
    expect(spy).toHaveBeenCalled();
  });
  
it('should call verifyPrincipalNumber 4', () => {
    const spy = spyOn(component, 'verifyPrincipalNumber').and.callThrough();
    component.step = 1;
    component.resendLinkDisabled = true;
    component.myForm.setValue({'nric':767676767676, 'phone':60124334646});   
    spyOn(loginService, "MobileConnect").and.returnValue(of({
      status: false,
      sim_type: "Postpaid",
      is_nric_verified: true
    }));
    component.verifyPrincipalNumber();
    expect(spy).toHaveBeenCalled();
  });

it('should call onSendOTP', () => {
    const spy = spyOn(component, 'onSendOTP').and.callThrough();
    component.step = 2;
    component.resendLinkDisabled = true;
    component.myForm.setValue({'nric':767676767676, 'phone':60124334646});   
    spyOn(loginService, "MobileConnect").and.returnValue(of({
      status: false,
      sim_type: "Others",
      is_nric_verified: true
    }));
    component.onSendOTP();
    expect(spy).toHaveBeenCalled();
  });

it('should call verifyPrincipalNumber 5', () => {
    const spy = spyOn(component, 'verifyPrincipalNumber').and.callThrough();
    component.resendLinkDisabled = false;
    component.step = 2;
    component.myForm.setValue({'nric':767676767676, 'phone':60124334646});   
    
    Otpfixture = TestBed.createComponent(NewOtpInputComponent);
    component.otpForm = Otpfixture.debugElement.componentInstance;
    component.otpForm.otpForm = new FormGroup({
      input1: new FormControl("", [Validators.required]),
      input2: new FormControl("", [Validators.required]),
      input3: new FormControl("", [Validators.required]),
      input4: new FormControl("", [Validators.required]),
      input5: new FormControl("", [Validators.required]),
      input6: new FormControl("", [Validators.required])
    });
    component.otpForm.otpForm.setValue({
      input1: 1,
      input2: 1,
      input3: 1,
      input4: 1,
      input5: 1,
      input6: 1,
    });
    spyOn(loginService, "MobileConnect").and.returnValue(of([{
      status: true,
      sim_type: "Prepaid",
      is_nric_verified: true
    }]));
    component.verifyPrincipalNumber();
    expect(spy).toHaveBeenCalled();
  });
  
it('should call verifyPrincipalNumber 6', () => {
    const spy = spyOn(component, 'verifyPrincipalNumber').and.callThrough();
    component.resendLinkDisabled = false;
    component.step = 2;
    component.myForm.setValue({'nric':767676767676, 'phone':60124334646}); 
    Otpfixture = TestBed.createComponent(NewOtpInputComponent);
    component.otpForm = Otpfixture.debugElement.componentInstance;
    component.otpForm.otpForm = new FormGroup({
      input1: new FormControl("", [Validators.required]),
      input2: new FormControl("", [Validators.required]),
      input3: new FormControl("", [Validators.required]),
      input4: new FormControl("", [Validators.required]),
      input5: new FormControl("", [Validators.required]),
      input6: new FormControl("", [Validators.required])
    });
    component.otpForm.otpForm.setValue({
      input1: 1,
      input2: 1,
      input3: 1,
      input4: 1,
      input5: 1,
      input6: 1,
    }); 
    spyOn(loginService, "MobileConnect").and.returnValue(of([{
      status: false,
      sim_type: "Prepaid",
      is_nric_verified: true
    }]));
    component.verifyPrincipalNumber();
    expect(spy).toHaveBeenCalled();
  });

    
it('should call verifyPrincipalNumber 7', () => {
  const spy = spyOn(component, 'verifyPrincipalNumber').and.callThrough();
  component.resendLinkDisabled = false;
  component.step = 2;
  component.myForm.setValue({'nric':767676767676, 'phone':60124334646});  
  Otpfixture = TestBed.createComponent(NewOtpInputComponent);
  component.otpForm = Otpfixture.debugElement.componentInstance;
  component.otpForm.otpForm = new FormGroup({
    input1: new FormControl("", [Validators.required]),
    input2: new FormControl("", [Validators.required]),
    input3: new FormControl("", [Validators.required]),
    input4: new FormControl("", [Validators.required]),
    input5: new FormControl("", [Validators.required]),
    input6: new FormControl("", [Validators.required])
  });
  component.otpForm.otpForm.setValue({
    input1: 1,
    input2: 1,
    input3: 1,
    input4: 1,
    input5: 1,
    input6: 1,
  });
  spyOn(loginService, "MobileConnect").and.returnValue(of([{
    status: false,
    message: "failed",
    sim_type: "Prepaid",
    is_nric_verified: true
  }]));
  component.verifyPrincipalNumber();
  expect(spy).toHaveBeenCalled();
});

  it('should call selectDeviceComboNumber', () => {
    const spy = spyOn(component, 'selectDeviceComboNumber').and.callThrough();
    component.selectDeviceComboNumber(1);
    expect(spy).toHaveBeenCalled();
  });
});
