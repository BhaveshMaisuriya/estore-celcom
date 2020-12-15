import { Component, Input, OnInit } from '@angular/core';
import { DeviceDataService } from '../../../../Service/devicedata.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-select-delivery-method',
  templateUrl: './select-delivery-method.component.html',
  styleUrls: ['./select-delivery-method.component.css']
})
export class SelectDeliveryMethodComponent implements OnInit {

  @Input() billingAddressData: any;
  @Input() cartmineData: any;
  @Input() disableButton: any;
  public shippingAsBilling: boolean;
  public billingAddress: any;
  public standardDelivery = false;
  public midnightDelivery = false;
  public showMidnightDelivery: any;
  private subscriber: Subscription;
  public sessionInvalid: any;
  public errorNotification: any = null;
  public showErrorNoticification = false;

  constructor(
    private _deviceDataService: DeviceDataService
  ) { }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.sessionInvalid = data));
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.showErrorNoticification = data));
    this.shippingAsBilling = true;
    this.billingAddress = this.billingAddressData;
    if (this.cartmineData && this.cartmineData.all_items[0] && this.cartmineData.all_items[0].midnight_delivery) {
      if (this.cartmineData.all_items[0].midnight_delivery === "1" || this.cartmineData.all_items[0].midnight_delivery === 1) {
        this.showMidnightDelivery = true;
      } else if (this.cartmineData.all_items[0].midnight_delivery === "0" || this.cartmineData.all_items[0].midnight_delivery === 0) {
        this.showMidnightDelivery = false;
      }
    } else {
      this.showMidnightDelivery = false;
    }
    if (localStorage && localStorage.getItem("EditAddress")) {
      if (this.cartmineData && this.cartmineData.delivery_type) {
        if (this.cartmineData.delivery_type.value === 1) {
          this.viewMode('midnightDelivery');
        } else if (this.cartmineData.delivery_type.value === 0) {
          this.viewMode('standardDelivery');
        }
      }
    } else {
      this.viewMode('standardDelivery');
    }
  }

  public viewMode(deliveryMode) {    
    if (deliveryMode === 'standardDelivery') {
      this.standardDelivery = true;
      this.midnightDelivery = false;
    } else {
      if (deliveryMode === 'midnightDelivery') {
        this.midnightDelivery = true;
        this.standardDelivery = false;
      }
    }
    this._deviceDataService.publishDeliveryType(deliveryMode);
    this._deviceDataService.publishEditBilling(true);
  }

  sessionInvalidChange(data) {
    if (data) {
      this.sessionInvalid = true;
    }
  }

  errorToDisplay(data) {
    this.showErrorNoticification = true;
    this.errorNotification = {};
    this.errorNotification.content = data;
    this.errorNotification.color = "#b94063";
  }
}
