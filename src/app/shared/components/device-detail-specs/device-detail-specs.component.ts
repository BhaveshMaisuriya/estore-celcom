import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-device-detail-specs',
  templateUrl: './device-detail-specs.component.html',
  styleUrls: ['./device-detail-specs.component.scss']
})
export class DeviceDetailSpecsComponent implements OnInit {

  @Input() deviceDetail: any;

  deviceMoreDetails = null;
  deviceTermsConditions: any = null;

  constructor() { }

  ngOnInit(): void {

    if (this.deviceDetail && this.deviceDetail !== undefined) {
      this.deviceMoreDetails = this.deviceDetail.more_details;
      this.deviceTermsConditions = this.deviceDetail.terms_and_condition;
    }

  }

}
