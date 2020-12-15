import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { Renderer2 } from "@angular/core";
import { EKycService } from "../e-kyc.service";
import { ImageCaptureComponent } from "./image-capture.component";

describe("ImageCaptureComponent", () => {
  let component: ImageCaptureComponent;
  let fixture: ComponentFixture<ImageCaptureComponent>;

  beforeEach(() => {
    const renderer2Stub = () => ({
      setProperty: (nativeElement, string, stream) => ({}),
      listen: (nativeElement, string, function0) => ({})
    });
    const eKycServiceStub = () => ({ setImage: arg => ({}) });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ImageCaptureComponent],
      providers: [
        { provide: Renderer2, useFactory: renderer2Stub },
        { provide: EKycService, useFactory: eKycServiceStub }
      ]
    });
    fixture = TestBed.createComponent(ImageCaptureComponent);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`isVideoPlaying has default value`, () => {
    expect(component.isVideoPlaying).toEqual(true);
  });

  it(`videoWidth has default value`, () => {
    expect(component.videoWidth).toEqual(0);
  });

  it(`videoHeight has default value`, () => {
    expect(component.videoHeight).toEqual(0);
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      spyOn(component, "init").and.callThrough();
      component.ngOnInit();
      expect(component.init).toHaveBeenCalled();
    });
  });

  describe("ngOnChanges", () => {
    it("makes expected calls", () => {
      spyOn(component, "init").and.callThrough();
      component.ngOnChanges();
      expect(component.init).toHaveBeenCalled();
    });
  });

  describe("init", () => {
    it("makes expected calls", () => {
      spyOn(component, "startCamera").and.callThrough();
      component.init();
      expect(component.startCamera).toHaveBeenCalled();
    });
  });

  describe("retake", () => {
    it("makes expected calls", () => {
      spyOn(component, "startCamera").and.callThrough();
      component.retake();
      expect(component.startCamera).toHaveBeenCalled();
    });
  });

  describe("capture", () => {
    it("makes expected calls", () => {
      const renderer2Stub: Renderer2 = fixture.debugElement.injector.get(
        Renderer2
      );
      const eKycServiceStub: EKycService = fixture.debugElement.injector.get(
        EKycService
      );
      spyOn(component, "stopVideo").and.callThrough();
      spyOn(renderer2Stub, "setProperty").and.callThrough();
      spyOn(eKycServiceStub, "setImage").and.callThrough();
      component.capture();
      expect(component.stopVideo).toHaveBeenCalled();
      expect(renderer2Stub.setProperty).toHaveBeenCalled();
      expect(eKycServiceStub.setImage).toHaveBeenCalled();
    });
  });

  describe("ngOnDestroy", () => {
    it("makes expected calls", () => {
      spyOn(component, "stopVideo").and.callThrough();
      component.ngOnDestroy();
      expect(component.stopVideo).toHaveBeenCalled();
    });
  });
});
