import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from "rxjs";
import { DeviceDataService } from '../../../../Service/devicedata.service';

@Component({
  selector: 'app-mignight-delivery',
  templateUrl: './mignight-delivery.component.html',
  styleUrls: ['./mignight-delivery.component.css']
})
export class MignightDeliveryComponent implements OnInit {
  @Input() billingAddress: any;
  @Input() checkoutData: any;
  @Input() disableButton: any;
  @Output() sessionInvalidChange = new EventEmitter();
  @Output() errorToDisplay = new EventEmitter();
  private subscriber: Subscription;
  constructor(
    private _deviceDataService: DeviceDataService,
  ) { }

  ngOnInit() {
    const delivery_type = 1;
    this.checkoutData.delivery_type.value = delivery_type;
  }
  sessionInvalidCheck(data) {
    this.sessionInvalidChange.emit(data);
  }
  errorDisplay(data) {
    this.errorToDisplay.emit(data);
  }
}
