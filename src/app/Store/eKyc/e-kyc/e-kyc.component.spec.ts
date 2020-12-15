import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { EKycService } from "../e-kyc.service";
import { ModalService } from "app/shared/components/modal/modal.service";
import { ActivatedRoute } from "@angular/router";
import { PrepaidService } from "app/Store/plan/prepaid/prepaid.service";
import { EKycComponent } from "./e-kyc.component";
import { sharedPipes } from 'app/shared/pipes';

describe("EKycComponent", () => {
  let component: EKycComponent;
  let fixture: ComponentFixture<EKycComponent>;

  beforeEach(() => {
    const eKycServiceStub = () => ({
      checkIsMobile: () => ({}),
      getSessionDetails: () => ({ subscribe: f => f({}) }),
      getImage: () => ({})
    });
    const modalServiceStub = () => ({ open: string => ({}) });
    const activatedRouteStub = () => ({
      queryParams: { subscribe: f => f({}) }
    });
    const ngxImageCompressServiceStub = () => ({
      compressFile: (image, orientation, number, number1) => ({
        then: () => ({})
      })
    });
    const prepaidServiceStub = () => ({});
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        EKycComponent,
        sharedPipes,
      ],
      providers: [
        { provide: EKycService, useFactory: eKycServiceStub },
        { provide: ModalService, useFactory: modalServiceStub },
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: PrepaidService, useFactory: prepaidServiceStub }
      ]
    });
    fixture = TestBed.createComponent(EKycComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`ekycImages has default value`, () => {
    expect(component.ekycImages.length).toEqual(3);
  });

  it(`step has default value`, () => {
    expect(component.step).toEqual(1);
  });

  it(`fromDesktop has default value`, () => {
    expect(component.fromDesktop).toEqual(false);
  });

  it(`isImageLoading has default value`, () => {
    expect(component.isImageLoading).toEqual(false);
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      spyOn(component, "getSessionDetails").and.callThrough();
      component.ngOnInit();
      expect(component.getSessionDetails).toHaveBeenCalled();
    });
  });

  describe("getSessionDetails", () => {
    it("makes expected calls", () => {
      const eKycServiceStub: EKycService = fixture.debugElement.injector.get(
        EKycService
      );
      const modalServiceStub: ModalService = fixture.debugElement.injector.get(
        ModalService
      );
      spyOn(eKycServiceStub, "checkIsMobile").and.callThrough();
      spyOn(eKycServiceStub, "getSessionDetails").and.callThrough();
      component.getSessionDetails();
      expect(eKycServiceStub.checkIsMobile).toHaveBeenCalled();
      expect(eKycServiceStub.getSessionDetails).toHaveBeenCalled();
    });
  });

  // describe("uploadImage", () => {
  //   it("makes expected calls", () => {
  //     const eKycServiceStub: EKycService = fixture.debugElement.injector.get(
  //       EKycService
  //     );
  //     spyOn(eKycServiceStub, "getImage").and.callThrough();
  //     component.uploadImage();
  //     expect(eKycServiceStub.getImage).toHaveBeenCalled();
  //   });
  // });

  describe("goToStep", () => {
    it("sets correct value", () => {
      component.goToStep(3);
      expect(component.step).toBe(3);
    });
  });

});
