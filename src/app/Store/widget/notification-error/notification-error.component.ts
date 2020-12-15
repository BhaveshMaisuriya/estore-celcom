import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';

@Component({
  selector: 'app-notification-error',
  templateUrl: './notification-error.component.html',
  styleUrls: ['./notification-error.component.css']
})
export class NotificationErrorComponent implements OnInit {
  @Input() data: any;
  @Input() IsSessionInValid: any;
  @Output() close = new EventEmitter()
  public isNotification = false;
  public isSticky = false;
  public popupStyle: any;
  constructor(private _deviceDataService: DeviceDataService) { }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      const eleId = document.getElementById('sticky-cart');
      const eleIdToaster = document.getElementsByClassName('b-notification');
      if (window.location.href.indexOf("/plans/") > -1 || window.location.href.indexOf("/device-detail/") > -1 && eleId !== null &&
        eleIdToaster !== null) {
        if (!eleId.classList.contains("sticky") && eleIdToaster.length === 1) {
          this.isNotification = true;
          this.isSticky = true;
        } else if (eleId.classList.contains("sticky") && eleIdToaster.length === 1) {
          this.isNotification = true;
          this.isSticky = false;
        } else if (!eleId.classList.contains("sticky") && eleIdToaster.length === 0) {
          this.isNotification = false;
          this.isSticky = true;
        } else if (eleId.classList.contains("sticky") && eleIdToaster.length === 0) {
          this.isNotification = false;
          this.isSticky = false;
        }
      }
    }
  }
  public close_icon() {
    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
    this.close.emit();

    this._deviceDataService.publishErrorNotificationBoolean(false);
    this._deviceDataService.publishUpfrontWaivedSuccess(false);
    this._deviceDataService.publishUpfrontWaivedFailure(false);
  }
}
