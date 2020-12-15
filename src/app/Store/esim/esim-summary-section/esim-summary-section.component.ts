import { Component, OnInit, Renderer2 } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription ,  Observable } from 'rxjs';
import { AppService } from "../../../Service/app.service";
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { map } from "rxjs/operators";

@Component({
  selector: 'app-esim-summary-section',
  templateUrl: './esim-summary-section.component.html',
  styleUrls: ['./esim-summary-section.component.css']
})
export class EsimSummarySectionComponent implements OnInit {
  selectedImage = null;
  orderPhoneNo = null;
  simType = null;
  orderEmailAddress = null;
  orderTotalPay = 0;
  subscriber: Subscription;
  eSimEligible = null;
  public apiErrorMessage: any;
  public isApiError = false;
  constructor(
    private _deviceDataService: DeviceDataService,
    private _service: AppService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    this.loadUserSelection();
    this.loadEsimPlanDetails();
  }
  loadUserSelection() {
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.orderPhoneNo = data);
    this.subscriber = this._deviceDataService.sharedTypeOfSIM$.subscribe(data => this.simType = data);
    this.subscriber = this._deviceDataService.sharedEmailId$.subscribe(data => this.orderEmailAddress = data);
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(data => this.orderTotalPay = data);
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => (this.isApiError = data));
  }
  loadEsimPlanDetails() {
    // get eSIM details API call.
    this.getEsimPlanDetails("/rest/V1/esimplanview/esim").subscribe(
      (res: any) => {
        this.responseGetEsimPlanDetails(res[0]);
      },
      (err: any) => {
        this.OnGetEsimPlanDetailsError(err.error);
      }
    );
  }
  responseGetEsimPlanDetails(resp) {
    if (resp.status === true) {
      this.selectedImage = resp.plan_details.image_url;
      this.orderTotalPay = resp.plan_details.PlanMonthlyPay;
      this._deviceDataService.publishTotalPay(this.orderTotalPay);
      resp.plan_details.product_type = resp.plan_details.product_type ? resp.plan_details.product_type : "Service";
      this._estoreAnalyticsService.SetProductDetails(resp.plan_details, this._renderer);
    } else if (resp.status === false) {
      this.OnGetEsimPlanDetailsError(resp);
    }
  }
  OnGetEsimPlanDetailsError(error) {
    this.apiErrorMessage = {};
    this.apiErrorMessage.content = error.message;
    this.isApiError = true;
  }
  public getEsimPlanDetails(apiURL: string): Observable<any[]> {
    const url = apiURL;
    return this._service
      .getEstoreData(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
