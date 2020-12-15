import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../../Service/app.service';
import { DeviceDetailsService } from '../device/device-details/device-details.service';
import { CsAgentCampaignDetailsService } from './csagent-campaign-details.service';
import { UserService } from '../../Service/user.service';
import { BaseComponent } from '../../base.component';
import { DeviceDataService } from '../../Service/devicedata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-csagent-campaign-details',
  templateUrl: './csagent-campaign-details.component.html',
  styleUrls: ['./csagent-campaign-details.component.css'],
  providers: [CsAgentCampaignDetailsService]
})
export class CsagentCampaignDetailsComponent  extends BaseComponent implements OnInit {
 public  campaignType = "";
 public mockData = false;
 public campaignDataResponse: any;
 public isDisplayErrorPopup = false;
 public errorMessage: any;
 public apiLoad = false;
 public loading = false;
 public subscriber: Subscription;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _deviceDetailsService: DeviceDetailsService,
    private _csAgentCampaignDetailsService: CsAgentCampaignDetailsService,
    public _userService: UserService,
    private _deviceDataService: DeviceDataService
  ) {
    super();
   }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => this.campaignType = params["campaignType"]);
    if (this.campaignType && this.campaignType !== "" && this._userService.isCSAgent()) {
    this.getCampaignDetailsFromAPI(this.campaignType);
    }
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => {
        if (data === false) {
         this.OnContinue();
        }
      }
     ); }
  public getCampaignDetailsFromAPI(campaignType: string) {
    this.loading = true;
   const url = "/rest/V1/csAgentClmCampaignList/" + campaignType;
   this._deviceDetailsService.Find(url).subscribe(
    (res: any) => {
      this.apiLoad = true;
      this.loading = false;
      if (res[0] && res[0].status && res[0].response) {
      this.campaignDataResponse = res[0].response;
      } else {
        this.onAPIError(res[0]);
      }
    },
    err => {
     this.apiLoad = true;
     this.loading = false;
     this.onAPIError(err.error);
     console.log(err);
    });
  }
  onAPIError(err: any = {}) {
   this.isDisplayErrorPopup = true;
   // this.errorMessage.message = this.errorConst.SYS_DOWN_MSG;
   this.errorMessage = {
    content: err.message ? err.message : this.errorConst.SYS_DOWN_MSG
   };
  }
  OnContinue() {
    if (typeof window !== "undefined") {
      this.isDisplayErrorPopup = false;
     if (this._userService.isCSAgent()) {
        window.location.href = "/store/agentlandingpage";
      } else {
        window.location.href = "/store/devices";
      }
    }
  }
}
