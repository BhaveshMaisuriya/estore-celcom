import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { DeviceDataService } from '../../../../Service/devicedata.service';

@Component({
  selector: 'app-standard-delivery',
  templateUrl: './standard-delivery.component.html',
  styleUrls: ['./standard-delivery.component.css']
})
export class StandardDeliveryComponent implements OnInit {
  @Input() billingAddress: any;
  @Input() checkoutData: any;
  @Input() disableButton: any;
  @Output() sessionInvalidChange = new EventEmitter();
  @Output() errorToDisplay = new EventEmitter();
  midnight = false;
  deliveryType;
  private subscriber: Subscription;
  constructor(
    private _deviceDataService: DeviceDataService) {
  }

  ngOnInit() {
    const delivery_type = 0;
    this.checkoutData.delivery_type.value = delivery_type;
    this.checkMidnight();
    this.deliveryType = delivery_type;
    this.flagMidnight(delivery_type);
  }
  sessionInvalidCheck(data) {
    this.sessionInvalidChange.emit(data);
  }

  errorDisplay(data) {
    this.errorToDisplay.emit(data);
  }

  checkMidnight() {
    if(this.checkoutData.all_items[0].midnight_delivery === "1") {
      this.midnight = true;
    }
  }

  flagMidnight(type) {
    if(type === 1) {
      this.midnight = true;
      this.deliveryType = 'night';
      this._deviceDataService.publishDeliveryType('Midnight Delivery');
    } else {
      this.deliveryType = 'standard';
      this._deviceDataService.publishDeliveryType('Standard Delivery');
    }
  }

}
