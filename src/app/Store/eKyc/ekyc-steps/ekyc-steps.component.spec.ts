import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { EKycService } from "../e-kyc.service";
import { PrepaidService } from "app/Store/plan/prepaid/prepaid.service";
import { EkycStepsComponent } from "./ekyc-steps.component";

describe("EkycStepsComponent", () => {
  let component: EkycStepsComponent;
  let fixture: ComponentFixture<EkycStepsComponent>;

  beforeEach(() => {
    const eKycServiceStub = () => ({
      checkIsMobile: () => ({}),
      getQrText: payload => ({ subscribe: f => f({}) })
    });
    const prepaidServiceStub = () => ({
      mnpData: { idType: {}, idNumber: {} }
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EkycStepsComponent],
      providers: [
        { provide: EKycService, useFactory: eKycServiceStub },
        { provide: PrepaidService, useFactory: prepaidServiceStub }
      ]
    });
    fixture = TestBed.createComponent(EkycStepsComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`showScanNow has default value`, () => {
    expect(component.showScanNow).toEqual(true);
  });

  it(`loading has default value`, () => {
    expect(component.loading).toEqual(false);
  });

  it(`refreshSession has default value`, () => {
    expect(component.refreshSession).toEqual(false);
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      const eKycServiceStub: EKycService = fixture.debugElement.injector.get(
        EKycService
      );
      spyOn(component, "getQRValue").and.callThrough();
      spyOn(component, "isIosSafari").and.callThrough();
      spyOn(eKycServiceStub, "checkIsMobile").and.callThrough();
      component.ngOnInit();
      expect(component.getQRValue).toHaveBeenCalled();
      expect(component.isIosSafari).toHaveBeenCalled();
      expect(eKycServiceStub.checkIsMobile).toHaveBeenCalled();
    });
  });

  describe("getQRValue", () => {
    it("makes expected calls", () => {
      const eKycServiceStub: EKycService = fixture.debugElement.injector.get(
        EKycService
      );
      spyOn(eKycServiceStub, "getQrText").and.callThrough();
      component.getQRValue();
      expect(eKycServiceStub.getQrText).toHaveBeenCalled();
    });
  });
});
