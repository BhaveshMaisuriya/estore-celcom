import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewLineWrapperComponent } from "./new-line-wrapper.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EstoreInputComponent } from "../../forms/estore-input/estore-input.component";
import { NumberChooserComponent } from "../../number-chooser/number-chooser.component";
import { SupplementaryLineWrapperComponent } from "../../type-of-purchase/supplementary-line-wrapper/supplementary-line-wrapper.component";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { PageLoaderComponent } from "../../page-loader/page-loader.component";
import { PaginationComponent } from "../../pagination/pagination.component";
import { EstoreCheckboxComponent } from "../../forms/estore-checkbox/estore-checkbox.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { NguCarouselModule } from "@ngu/carousel";
import { DeviceDataService } from "app/Service/devicedata.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { McLoginComponent } from "../../mc-login/mc-login.component";
import { NewOtpInputComponent } from "../../new-otp-input/new-otp-input.component";
import { ModalComponent } from "../../modal/modal.component";
import { ProductService } from "app/Service/product.service";
import { PlanPurchaseService } from "app/Store/plan/plan-purchase/plan-purchase.service";
import { DeviceDetailsNumberService } from "app/Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service";
import { MatRadioModule } from "@angular/material/radio";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CommonUtilService } from "app/Service/commonUtil.service";
import { ModalService } from "../../modal/modal.service";
import { UserService } from "app/Service/user.service";
import { ChangeDetectorRef } from "@angular/core";
import { PlansQuery } from "app/Widget/side-summary/side-summary-container/plans.store";
import { TypeofPurchaseQuery } from "app/Widget/side-summary/side-summary-container/type-of-purchase.store";
import { NewLineWrapperService } from "./new-line-wrapper.service";
import { of } from "rxjs/observable/of";
import { LoginService } from "app/Store/login/service/login.service";
import { TypeofPurchaseService } from "app/Service/type-of-purchase.service";
import { sharedDirectives } from 'app/shared/directives';
import { sharedPipes } from 'app/shared/pipes';
import { materialModules } from 'app/shared/shared-module.module';
import { CobpNumberChooserComponent } from '../../device-combo/cobp-number-chooser/cobp-number-chooser.component';
import { SuppNumberChooserComponent } from '../../helpers/supp-number-chooser/supp-number-chooser.component';

describe("NewLineWrapperComponent", () => {
  let component: NewLineWrapperComponent;
  let fixture: ComponentFixture<NewLineWrapperComponent>;
  let newLineWrapperService: NewLineWrapperService;
  let topService: TypeofPurchaseService;
  let commonUtilService: CommonUtilService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewLineWrapperComponent,
        EstoreInputComponent,
        NumberChooserComponent,
        SupplementaryLineWrapperComponent,
        PageLoaderComponent,
        PaginationComponent,
        EstoreCheckboxComponent,
        McLoginComponent,
        NewOtpInputComponent,
        ModalComponent,
        sharedDirectives,
        sharedPipes,
        CobpNumberChooserComponent,
        SuppNumberChooserComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NguCarouselModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        materialModules
      ],
      providers: [
        PlansQuery,
        TypeofPurchaseQuery,
        CommonUtilService,
        ModalService,
        UserService,
        NewLineWrapperService,
        DeviceDataService,
        ProductService,
        PlanPurchaseService,
        DeviceDetailsNumberService,
        ChangeDetectorRef,
        LoginService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLineWrapperComponent);
    component = fixture.componentInstance;
    newLineWrapperService = TestBed.get(NewLineWrapperService);
    topService = TestBed.get(TypeofPurchaseService);
    commonUtilService = TestBed.get(CommonUtilService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call handleSubmit() with else", done => {
    const result = {
      status: true,
      mobile_connect_user: false,
      token: "abchvhdhgdfd",
      blacklisted: false,
      message: "test",
      authtoken: "vvffcfxjdf"
    };
    const msg = {
      error: false,
      message: "test"
    };
    spyOn(commonUtilService, "validationForIdType").and.returnValue(msg);
    spyOn(newLineWrapperService, "loginUser").and.returnValue(of(result));
    newLineWrapperService.loginUser("12345").subscribe(res => {
      expect(res).toEqual(result);
      done();
    });

    component.handleSubmit();
    fixture.detectChanges();
  });

  it("should call selectMobileNumber()", () => {
    topService = TestBed.get(TypeofPurchaseService);
    let spy = spyOn(topService, "selectMobileNumber");
    component.onSelectNumber("123334");
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should call createSuppLines()", () => {
    component.supplementaryLines = [
      {
        planPhoneNumber: "0182917929",
        planPrice: "12345",
        planType: "xyz",
        partNumber: "123",
        isVerified: true,
        isDisabled: false,
        number: "1234"
      }
    ];
    component.createSuppLines("test1");
    fixture.detectChanges();
    expect(component.myForm.controls["test1"]).toBeTruthy();
  });

  it("should call updateSuppLines()", () => {
    component.supplementaryLines = [
      {
        planPhoneNumber: "test",
        planPrice: "12345",
        planType: "xyz",
        partNumber: "123",
        isVerified: true,
        isDisabled: false,
        number: "1234"
      }
    ];

    const data = {
      number: "1234",
      controlValue: "1234",
      controlName: "test"
    };
    let spy = spyOn(component, "setError");
    component.updateSuppLines(data);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should call updateSuppLines() with else path ", () => {
    component.supplementaryLines = [
      {
        planPhoneNumber: "test",
        planPrice: "12345",
        planType: "xyz",
        partNumber: "1234",
        isVerified: true,
        isDisabled: false,
        number: "1234"
      }
    ];

    const data = {
      number: "1234",
      controlValue: 1234,
      controlName: "test"
    };
    let spy = spyOn(component, "updateNewLineInfo");
    component.updateSuppLines(data);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should call removeSuppLines()", () => {
    component.supplementaryLines = [
      {
        planPhoneNumber: "test",
        planPrice: "12345",
        planType: "xyz",
        partNumber: "123",
        isVerified: true,
        isDisabled: false,
        number: "1234"
      }
    ];
    let spy = spyOn(component, "updateNewLineInfo");
    component.removeSuppLines("test");
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
