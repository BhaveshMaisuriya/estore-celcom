import { Component, OnInit } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'app-esim-type-details',
  templateUrl: './esim-type-details.component.html',
  styleUrls: ['./esim-type-details.component.css']
})
export class EsimTypeDetailsComponent implements OnInit {
  userName = null;
  simType = null;
  notes = null;
  subscriber: Subscription;
  eSimEligible = null;
  constructor(private _deviceDataService: DeviceDataService) { }

  ngOnInit() {
    this.subscriber = this._deviceDataService.esimEligible$.subscribe(data => {
      this.eSimEligible = data;
      this.loadUserInfo();
    });
  }
  loadUserInfo() {
     if (sessionStorage && sessionStorage.getItem("UserInfo")) {
      const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      this.userName = userInfo.outputCPResp.name;
      this.simType = userInfo.outputCPResp.simType;
      this.notes = userInfo.outputCPResp.esimInfo;
      this._deviceDataService.publishTypeOfSIM(this.simType);
    }
  }
}
