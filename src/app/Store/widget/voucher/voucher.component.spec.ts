import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { VoucherComponent } from './voucher.component';
import { AppService } from "../../../Service/app.service";

import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/throw';

import { Component, Directive } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockAppService {
  constructor() { }

  getEstoreUserData(url: string) {
    if (url.indexOf("/rest/V1/salesCoupon/") > -1) {
      if (url.indexOf("VOX") > -1) {
        return Observable.of({
          "status": true,
          "message": "Voucher code VOX applied successfully",
          "coupon_success": "Lorem ipsum dolor sit amet, consetetur adipisicing elit, sed do"
        });
      } else {
        return Observable.of({
          "status": false,
          "message": "Voucher code entered is not valid",
          "coupon_success": ""
        });
      }
    } else {
      return null;
    }
  }
}

describe('VoucherComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        VoucherComponent,
        SafeHtmlPipe
      ],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AppService, useClass: MockAppService },
        DeviceDataService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(VoucherComponent);
    component = fixture.componentInstance;
  });

  it('should create a voucher component', async () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', async () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.data = {all_items:[{voucher_code:"weet"}]};
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('test RemoveVoucher false', async () => {
    const spy = spyOn(component, 'RemoveVoucher').and.callThrough();
    component.RemoveVoucher();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('test RemoveVoucher true', async () => {
    const spy = spyOn(component, 'RemoveVoucher').and.callThrough();
    spyOn(TestBed.get(AppService), 'getEstoreUserData').and.returnValue(Observable.of({
      "status": true,
      "message": "Voucher code VOX applied successfully",
      "coupon_success": "Lorem ipsum dolor sit amet, consetetur adipisicing elit, sed do"
    }));
    component.RemoveVoucher();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('test isAlphaNumeric', async () => {
    const spy = spyOn(component, 'isAlphaNumeric').and.callThrough();
    const isNumeric = component.isAlphaNumeric("abc");
    fixture.detectChanges();
    expect(component.VoucherCodeError).toBe("");
    expect(isNumeric).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('test isAlphaNumeric for non-string', async () => {
    const spy = spyOn(component, 'isAlphaNumeric').and.callThrough();
    const isNumeric = component.isAlphaNumeric("@1%");
    fixture.detectChanges();
    expect(component.VoucherCodeError).toBe("Please enter a valid coupon code");
    expect(isNumeric).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('test onVoucherCodeChange', async () => {
    const spy = spyOn(component, 'onVoucherCodeChange').and.callThrough();
    component.voucherCode = "@1%";
    component.onVoucherCodeChange();
    fixture.detectChanges();
    expect(component.isVoucherCodeValid).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('test ApplyVoucher false', async () => {
    const spy = spyOn(component, 'ApplyVoucher').and.callThrough();
    component.ApplyVoucher();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('test ApplyVoucher true', async () => {
    const spy = spyOn(component, 'ApplyVoucher').and.callThrough();
    spyOn(TestBed.get(AppService), 'getEstoreUserData').and.returnValue(Observable.of({
      "status": true,
      "message": "Voucher code VOX applied successfully",
      "coupon_success": "Lorem ipsum dolor sit amet, consetetur adipisicing elit, sed do"
    }));
    component.ApplyVoucher();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
