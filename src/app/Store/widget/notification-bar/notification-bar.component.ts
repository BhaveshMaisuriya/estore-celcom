import { Component, OnInit, Input } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';

@Component({
  selector: 'app-notification-bar',
  templateUrl: './notification-bar.component.html',
  styleUrls: ['./notification-bar.component.css']
})
export class NotificationBarComponent implements OnInit {
  @Input() data: any;
  public popupStyle: any;
  constructor( private _deviceDataService: DeviceDataService) { }
   ngOnInit() {
}
public close_icon() {
    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
  this._deviceDataService.publishBarNotificationBoolean(false);
}
}