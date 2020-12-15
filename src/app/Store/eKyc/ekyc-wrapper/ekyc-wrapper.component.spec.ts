import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { PrepaidService } from "app/Store/plan/prepaid/prepaid.service";
import { EKycService } from "../e-kyc.service";
import { EkycWrapperComponent } from "./ekyc-wrapper.component";

describe("EkycWrapperComponent", () => {
  let component: EkycWrapperComponent;
  let fixture: ComponentFixture<EkycWrapperComponent>;

  beforeEach(() => {
    const prepaidServiceStub = () => ({
      mnpData: { idType: {} },
      handleEKycSuccess: () => ({})
    });
    const eKycServiceStub = () => ({
      getEKycData: () => ({ subscribe: f => f({}) }),
      getSessionDetails: () => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EkycWrapperComponent],
      providers: [
        { provide: PrepaidService, useFactory: prepaidServiceStub },
        { provide: EKycService, useFactory: eKycServiceStub }
      ]
    });
    fixture = TestBed.createComponent(EkycWrapperComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      spyOn(component, "getEKYCDetails").and.callThrough();
      component.ngOnInit();
      expect(component.getEKYCDetails).toHaveBeenCalled();
    });
  });

  describe("getEKYCDetails", () => {
    it("makes expected calls", () => {
      const prepaidServiceStub: PrepaidService = fixture.debugElement.injector.get(
        PrepaidService
      );
      const eKycServiceStub: EKycService = fixture.debugElement.injector.get(
        EKycService
      );
      spyOn(eKycServiceStub, "getEKycData").and.callThrough();
      component.getEKYCDetails();
      expect(eKycServiceStub.getEKycData).toHaveBeenCalled();
    });
  });

  describe("getStatus", () => {
    it("makes expected calls", () => {
      const eKycServiceStub: EKycService = fixture.debugElement.injector.get(
        EKycService
      );
      spyOn(eKycServiceStub, "getSessionDetails").and.callThrough();
      component.getStatus();
      expect(eKycServiceStub.getSessionDetails).toHaveBeenCalled();
    });
  });
});
