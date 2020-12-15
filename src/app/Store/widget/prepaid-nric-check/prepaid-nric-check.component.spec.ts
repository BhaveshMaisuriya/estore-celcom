import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PrepaidNricCheckComponent } from "./prepaid-nric-check.component";
import { PageLoaderComponent } from "app/shared/components/page-loader/page-loader.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DeviceDataService } from "app/Service/devicedata.service";
import { EstoreInputComponent } from "app/shared/components/forms/estore-input/estore-input.component";
import { DigitOnlyDirective } from "app/shared/directives/digit-only/digit-only.directive";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrepaidService } from 'app/Store/plan/prepaid/prepaid.service';
import { materialModules } from 'app/shared/shared-module.module';
import { MnpService } from 'app/Store/mnp/services/mnp.service';

describe("PrepaidNricCheckComponent", () => {
  let component: PrepaidNricCheckComponent;
  let fixture: ComponentFixture<PrepaidNricCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PrepaidNricCheckComponent,
        PageLoaderComponent,
        EstoreInputComponent,
        DigitOnlyDirective
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        materialModules
      ],
      providers: [PrepaidService, HttpClient, DeviceDataService, MnpService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepaidNricCheckComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call onSubmit", () => {
    const spy = spyOn(component, 'onSubmit').and.callThrough();
    component.onSubmit();
    expect(spy).toHaveBeenCalled();
  });

  it("should call getUserTypeByNRIC", () => {
    const spy = spyOn(component, 'getUserTypeByNRIC').and.callThrough();
    component.getUserTypeByNRIC();
    expect(spy).toHaveBeenCalled();
  });

  it("should call onRespError", () => {
    const spy = spyOn(component, 'onRespError').and.callThrough();
    component.onRespError({});
    component.onRespError({ message: 'test' });
    expect(spy).toHaveBeenCalled();
  });

  it("should call onApiError", () => {
    const spy = spyOn(component, 'onApiError').and.callThrough();
    component.onApiError({});
    component.onApiError({ message: 'test' });
    expect(spy).toHaveBeenCalled();
  });

  it("should call restrictOnlyNum", () => {
    const spy = spyOn(component, 'restrictOnlyNum').and.callThrough();
    const event = {
      keyCode: 50,
      which: 50,
      charCode: 50
    };

    component.restrictOnlyNum(event);
    expect(spy).toHaveBeenCalled();
  });

  it("should call validateNRIC", () => {
    const spy = spyOn(component, 'validateNRIC').and.callThrough();

    component.nricForm.get('idNumber').setValue('');
    component.validateNRIC(component.nricForm.get('idNumber'));

    component.nricForm.get('idNumber').setValue('122343556546223435');
    component.validateNRIC(component.nricForm.get('idNumber'));

    expect(spy).toHaveBeenCalled();
  });

  it("should call onTypeChanges", () => {
    const spy = spyOn(component, 'onTypeChanges').and.callThrough();

    component.nricForm.get('idType').setValue('test');
    component.onTypeChanges();

    component.nricForm.get('idType').setValue('Passport');
    component.onTypeChanges();

    component.nricForm.get('idType').setValue('MyTentera');
    component.onTypeChanges();

    component.nricForm.get('idType').setValue('Initial');
    component.onTypeChanges();

    expect(spy).toHaveBeenCalled();
  });

});
