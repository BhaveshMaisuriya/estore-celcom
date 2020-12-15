import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../base.component';
import { ContentNavigation } from '../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../Service/redirection.service';
import { OrderTrackingService } from '../shared/services/order-tracking.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EStoreAnalysticsService } from '../../Service/store.analytic.service';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css'],
  providers: [RedirectionService, OrderTrackingService]
})
export class OrderTrackingComponent extends BaseComponent implements OnInit {
  public siebelOrderID: any;
  public userNRIC: any;
  public trackOrderRequest: any;
  public orderIDFromUrl: any = null;
  public IDnumber: any;
  public orderIDExists = false;
  public isCSAgentDealer = false;
  customMessage = false;
  customOrderMessage = false;
  errorAgeRange = false;
  customMsg: string;
  customOrderMsg: string;
  maxlength: any;
  keepSubmitDisabled = true;
  public trackOrderUrl = 'store/checkout/trackorderdetails';
  constructor(private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _ordertracking: OrderTrackingService
  ) {
    super();
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      this.orderIDFromUrl = params['orderId'];
    });
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
    this.Init();
  }
  private Init() {

  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public onSubmit(form) {
    if (form.invalid) {
      return;
    }
    this.clearLocalStorage();
    this.trackOrderRequest = {
      siebelOrderID: form.value.orderIDFromUrl,
      userNRIC: form.value.IDnumber
    };
    this.checkOrderExist(this.trackOrderRequest);
  }

  public existingUserRedirection() {
    localStorage.setItem("trackOrderRedirect", "exists");
    this._router.navigateByUrl('/store/login');
  }

  public checkOrderExist(trackingDetails: any) {
    const url = "/rest/V1/trackOrder";
    const requestParams = {
      "track_order_data": {
        "siebel_order_num": trackingDetails.siebelOrderID,
        "id_number": trackingDetails.userNRIC
      }
    };
    this._ordertracking.TrackOrder(url, requestParams).subscribe(
      (response: any) => {
        if (response.status === true) {
          // if (typeof window !== 'undefined' && sessionStorage) {
          //   sessionStorage.setItem("UserToken", response.token);
          //   sessionStorage.setItem("authtoken", response.authtoken);
          // }
          // this.orderNumber(trackingDetails.siebelOrderID);
          this.onSuccesFulResponse(trackingDetails, response);
        } else {
          // Here We need to show error
          // this.customMessage = true;
          // this.customMsg = "No order exists with this order ID and NRIC";
          this.onError("No order exists with this order ID and NRIC");
        }
      },
      (error: any) => {
        // this.customMessage = true;
        // this.customMsg = "Oops! something went wrong. Please try again after sometime";
        this.onError("Oops! something went wrong. Please try again after sometime");
      });
  }
  public onSuccesFulResponse(trackingDetails: any, response: any) {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.setItem("UserToken", response.token);
      sessionStorage.setItem("authtoken", response.authtoken);
    }
    this.orderNumber(trackingDetails.siebelOrderID);
  }
  public onError(err = "") {
    this.customMessage = true;
    this.customMsg = err ? err : "Oops! something went wrong. Please try again after sometime";
  }

  public orderNumber(orderNo) {
    this._router.navigate([this.trackOrderUrl, orderNo]);
  }

  public clearLocalStorage() {
    if (typeof window !== 'undefined' && localStorage && sessionStorage) {
      localStorage.clear();
      sessionStorage.clear();
    }
  }
  validationForIdType(identity_value) {
    this.customMessage = false;
    this.errorAgeRange = false;
    const idValue = identity_value;
    const pattern1 = /^\d+$/;
    const pattern2 = /^[0-9]{12}$/;

    if (idValue === "") {
      this.customMsg = "Please enter a value";
      this.customMessage = true;
      return this.customMsg;
    } else if (!pattern1.test(idValue)) {
      this.customMsg = "Please enter digits only";
      this.customMessage = true;
      return this.customMsg;
    } else if (!pattern2.test(idValue)) {
      this.customMsg = "Please enter a valid New NRIC ID of 12 digit";
      this.maxlength = 12;
      this.customMessage = true;
      return this.customMsg;
    } else {
      return 1;
    }

  }

  validationForOrderNumber(order_number) {
    this.orderIDExists = false;
    this.customOrderMessage = false;
    const idValue = order_number;

    if (idValue === "" || idValue == null) {
      this.customOrderMessage = true;
      this.customOrderMsg = "Please enter a value";
      this.keepSubmitDisabled = true;
      return this.customOrderMsg;
    } else {
      return 1;
    }
  }
}
