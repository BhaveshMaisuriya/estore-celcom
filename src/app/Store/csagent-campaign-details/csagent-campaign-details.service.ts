import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, Headers } from '@angular/http';
import { BaseService } from '../../base.service';

@Injectable()
export class CsAgentCampaignDetailsService extends BaseService {
    public mockResponse =  [
        {
            "status": true,
            "response": [
                {
                    "promotion_name": "sasasasa",
                    "start_date": "2019-10-31 12:48:00",
                    "end_date": "2019-11-30 12:48:00",
                    "ikb_url": null,
                    "upfront_payment": "No",
                    "targeted_plan": "xp-base-lite",
                    "targeted_device": "Vivo-S1",
                    "campaign_url": ""
                },
                {
                    "promotion_name": "dsdsdsdsdsds",
                    "start_date": "2019-11-06 00:00:00",
                    "end_date": "2019-12-01 00:00:00",
                    "ikb_url": "dsdsdsdsds",
                    "upfront_payment": "Yes",
                    "targeted_plan": "xp-s-pass",
                    "targeted_device": "Samsung-Galaxy-S10",
                    "campaign_url": "https://estore-02.celcom.com.my/device-detail/Samsung-Galaxy-S10?promotiondetails=dsdsdsdsdsds"
                }
            ]
        }
    ];
    public mockErrorResponse = [
        {
            "status": false,
            "message": "Campaign Not Available"
        }
    ];
 constructor() {
     super();
 }
  public getmockResponse() {
      return this.mockResponse[0].response;
  }
}