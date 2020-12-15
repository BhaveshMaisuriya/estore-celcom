import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AppService } from '../../../Service/app.service';
import { Subscription } from "rxjs";
import { DeviceDataService } from '../../../Service/devicedata.service';
import * as errorconst from "../../../../constants/error.constants";

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  isVoucherCodeValid = false;
  VoucherCodeError = "";
  voucherCode = "";
  isVoucherCodeApplied = false;
  voucherSuccessText = "";
  voucherSuccessDesc = "";
  @Input() data: any;
  @Input() isThirdPartyOrder = false;

  @Output() voucherApplied = new EventEmitter();
  @Output() voucherRemoved = new EventEmitter();

  cart: any;
  private subscriber: Subscription;

  constructor(public service: AppService, public _deviceDataService: DeviceDataService) {
  }

  onVoucherCodeChange() {
      this.voucherCode = this.voucherCode.toUpperCase();
      this.isVoucherCodeValid = this.isAlphaNumeric(this.voucherCode);
  }

  ngOnInit() {
    this.cart = this.data;
    if (this.cart) {
      this.voucherCode = this.cart.all_items[0].voucher_code;
      if (this.voucherCode && this.voucherCode.length > 0) {
        this.isVoucherCodeApplied = true;
      }
    }
    this.subscriber = this._deviceDataService.voucherCodeOld$.subscribe(
      data => {
        this.voucherCode = data.voucherCode;
        this.voucherSuccessDesc = data.voucherSuccessDesc;
        this.isVoucherCodeApplied = data.isVoucherCodeApplied;

      }
    );
  }
  ApplyVoucher() {
    // Move validation to magento
    // if(sessionStorage && sessionStorage.getItem("DealerInfo")) {
    //   this.isVoucherCodeApplied = false;
    //   this.VoucherCodeError = `This voucher code is not applicable for this channel. Please visit www.celcom.com.my`;
    //   return;
    // }
    this.VoucherCodeError = '';
    const apiUrl = '/rest/V1/salesCoupon/' + this.voucherCode + '/add';
    this.service.getEstoreUserData(apiUrl).subscribe(
      (response: any) => {
        this._deviceDataService.publishVoucherCode(this.voucherCode);
        if (response.status) {
          this.isVoucherCodeApplied = true;
          this.voucherSuccessText = response.message;
          this.voucherSuccessDesc = response.coupon_description;
          this.VoucherCodeError = "";
          this.voucherApplied.emit();
        } else {
          this.isVoucherCodeApplied = false;
          this.VoucherCodeError = response.message;
        }
    },  (errorResponse: any) => {
      this.VoucherCodeError = errorconst.SYS_DOWN_MSG;
    });
  }

  RemoveVoucher() {
    this.VoucherCodeError = '';
    const apiUrl = '/rest/V1/salesCoupon/' + this.voucherCode + '/remove';
    this.service.getEstoreUserData(apiUrl).subscribe(
      (response: any) => {
        this._deviceDataService.publishVoucherCode(this.voucherCode);
        if (response.status) {
          // this.voucherCode = "";
          this.isVoucherCodeApplied = false;
          this.voucherRemoved.emit();
        } else {
          this.isVoucherCodeApplied = true;
          this.VoucherCodeError = "Unable to remove coupon code";
        }
    },  (errorResponse: any) => {
      this.VoucherCodeError = errorconst.SYS_DOWN_MSG;
    });
  }
  isAlphaNumeric(str) {
    const letterNumber = /^[0-9a-zA-Z]+$/;
    if (str.match(letterNumber)) {
      this.VoucherCodeError = "";
      return true;
    } else {
      this.VoucherCodeError = "Please enter a valid coupon code";
      return false;
    }
  }
}
