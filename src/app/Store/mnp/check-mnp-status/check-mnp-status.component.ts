import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Observable ,  Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { BaseComponent } from "../../../base.component";
import { MnpService } from "../services/mnp.service";
import * as FormConst from "../../../../constants/form.constants";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';

import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
@Component({
  selector: "app-mnp-check-port",
  templateUrl: "./check-mnp-status.component.html",
  styleUrls: ["./check-mnp-status.component.css"],
  providers: [MnpService]
})
export class CheckMnpStatusComponent extends BaseComponent
  implements OnInit, OnDestroy {
  customerIDTypes: any;
  showStatus = false;
  errorMessage: any = null; // changed to object from string in the notification error
  error: any;
  mnpResubmit = false;
  portCheckData = {
    msisdn: "",
    idType: "",
    idNumber: ""
  };
  public success: any;
  portInStatusResponse: any;
  public errorCheckPortStatus = false;
  public notification = false;
  private subscriber: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _mnpService: MnpService,
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2

  ) {
    super();
    this.customerIDTypes = _mnpService.getCustomerIDTypes();
  }

  ngOnInit() {
    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
    this.subscriber = this._deviceDataService.sharedBarNotificationBoolean$.subscribe(
      data => (this.notification = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.errorCheckPortStatus = data)
    );
  }


  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
  onSubmit(form) {
    if (form.invalid) {
      return;
    }
    const idType = form.value.customerIDType;
    const msisdn = form.value.mobileNumber;
    const idNumber = form.value.customerIDNo;
    const idTypeReq = idType ? "&id_type=" + idType : "";
    const requestParams = "msisdn_number=" + msisdn + "&id_number=" + idNumber + idTypeReq;
    this._mnpService.getPortStatus(requestParams).subscribe(
      (response: any) => {
        if (response[0].status) {
          this.portInStatusResponse = response[0].response;
          this.showStatus = true;
          this.notification = true;
          this.success = "Status is Success";
        } else {
          /* Populating error notification */
          this.errorMessage = {};
          this.errorMessage.content = response[0].message;
          this.errorMessage.color = "";
          this.showStatus = false;
          this.errorCheckPortStatus = true;
          if (this.errorMessage?.content) {
            this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
          }
        }
      },
      (error: any) => {
        this.errorCheckPortStatus = true;
        /* Populating error notification */
        this.errorMessage = {};
        this.errorMessage.content = error.message;
        this.errorMessage.color = "";
        if (this.errorMessage?.content) {
          this._globalErrorHandler.errorObjectConvert(this.errorMessage.content);
        }
      }
    );
  }

  // tobe removed
  customerRetrieve(requestParams) {
    this._mnpService.customerRetrieve(requestParams).subscribe(
      (response: any) => {
        this.portInStatusResponse.customer = response;
        this.showStatus = true;
      },
      (error: any) => {
        this.error = error;
      }
    );
  }

  public resubmitPortIn() {
    const customer = {
      msisdn: "",
      customerID: "",
      customerIDType: "",
      portNumber: ""
    };
    customer.portNumber = this.portCheckData.msisdn;
    customer.customerID = this.portCheckData.idNumber;
    customer.customerIDType = this.portCheckData.idType;
    if (localStorage) {
      localStorage.setItem("MNP-PRE-SELECT", "YES");
      localStorage.setItem("MNP-CUSTOMER", JSON.stringify(customer));
      this._router.navigateByUrl("/plans/FGP");
    }
  }

  ngOnDestroy() { }
}
