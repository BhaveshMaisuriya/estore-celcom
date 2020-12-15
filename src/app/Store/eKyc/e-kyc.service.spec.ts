import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { HOST } from 'app/Service/app.service';
import { IDPayload } from './e-kyc.model';
import { SelfiePayload } from './e-kyc.model';
import { EKycService } from './e-kyc.service';

describe('EKycService', () => {
  let service: EKycService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(EKycService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('checkIsMobile should be true for mobile', () => {
  
    navigator['__defineGetter__']('userAgent', () => {
      return 'Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30';
    });
    expect(service.checkIsMobile()).toBeTruthy();
  });

  it('checkIsMobile should be false for desktop', () => {
  
    navigator['__defineGetter__']('userAgent', () => {
      return "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36";
    });
    expect(service.checkIsMobile()).toBeFalsy();
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  it(`domain has default value`, () => {
    expect(service.domain).toEqual(HOST);
  });

  it('should call uploadId', fakeAsync(() => {
    const spy = spyOn(service, 'uploadId').and.callThrough();
    const iDPayloadStub: IDPayload = <any>{};
    service.uploadId(iDPayloadStub);
    expect(spy).toHaveBeenCalled();
  }));

  it('should call uploadSelfie', fakeAsync(() => {
    const spy = spyOn(service, 'uploadSelfie').and.callThrough();
    const selfiePayloadStub: SelfiePayload = <any>{};
    service.uploadSelfie(selfiePayloadStub);
    expect(spy).toHaveBeenCalled();
  }));

  it('should call getSessionDetails', fakeAsync(() => {
    const spy = spyOn(service, 'getSessionDetails').and.callThrough();
    service.getSessionDetails();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call getEKycData', fakeAsync(() => {
    const spy = spyOn(service, 'getEKycData').and.callThrough();
    service.getEKycData();
    expect(spy).toHaveBeenCalled();
  }));

  it('should call getQrText', fakeAsync(() => {
    const spy = spyOn(service, 'getQrText').and.callThrough();
    const getQrTextPayloadStub: SelfiePayload = <any>{};
    service.getQrText(getQrTextPayloadStub);
    expect(spy).toHaveBeenCalled();
  }));


});
