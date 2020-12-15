import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DeviceDataService } from '../../../Service/devicedata.service';

@Component({
  selector: 'app-bb-summary-section',
  templateUrl: './bb-summary-section.component.html',
  styleUrls: ['./bb-summary-section.component.css']
})
export class BbSummarySectionComponent implements OnInit {
@Input() deviceDetailsData;
public orderDevicePrice: number;
public orderPlanName: string;
public sharedContract: string;
public monthlyPay: number;
public bundleUpfrontPrice: number;
public orderTotalPay: number;
public upfrontInstallmentText = null;
public selectedImage;
public orderPhoneNo;
private subscriber: Subscription;
  constructor(
    private _deviceDataService: DeviceDataService
  ) { }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedDevicePrice$.subscribe(data => this.orderDevicePrice = data);
    this.subscriber = this._deviceDataService.sharedPlanNameBroadband$.subscribe(data => this.orderPlanName = data);
    this.subscriber = this._deviceDataService.sharedBroadbandContract$.subscribe(data => this.sharedContract = data);
    this.subscriber = this._deviceDataService.sharedMonthlyPay$.subscribe(data => this.monthlyPay = data);
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.orderPhoneNo = data);
    this.subscriber = this._deviceDataService.bundleUpfrontPrice$.subscribe(data => this.bundleUpfrontPrice = data);
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(data => this.orderTotalPay = data);
    this.subscriber = this._deviceDataService.sharedImage$.subscribe(data => this.selectedImage = data);
    this.subscriber = this._deviceDataService.sharedBroadbandAutoBilling$.subscribe(data => this.deviceDetailsData.bill_type = data);
    this.subscriber = this._deviceDataService.bundleUpfrontInstallment$.subscribe(data => this.upfrontInstallmentText = data);
  }
}
