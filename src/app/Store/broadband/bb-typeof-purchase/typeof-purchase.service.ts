import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription ,  Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AppService } from "../../../Service/app.service";

@Injectable()
export class TypeofPurchaseService {
  private subscriber: Subscription;
  public selectedPlanDetails = null;
  public selectedColor: string;
  notes = [
    { text: "Please ensure that your address is within Celcom Home Wireless serviceable area by verifying with our network checker." },
    { text: "Applicable for customers who have and do NOT have a contract with Celcom at this juncture." },
    { text: "Please do NOT submit multiple applications." },
    { text: "Please note that the 30 Days free trial begins from the date of order." },
    { text: "Once active the device should not be moved to a different home." }
  ];
  mockBbGetNewNumber: any = {
    status: true,
    mobile_number: "0133129953",
    eligible: true,
    reservationId: "OP43CE1555649811"
  };
  constructor(
    private _deviceDataService: DeviceDataService,
    private _router: Router,
    private _service: AppService,
    private _activatedRoute: ActivatedRoute,
  ) { }
  public Find(url): Observable<any[]> {
    return this._service
      .get(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  public postNewReg(requestBody: any): Observable<any[]> {
    const url = "/rest/V1/hw-number";
    return this._service.
      postEstoreUserData(url, requestBody)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  getUserLoggedInInfo() {
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("UserToken") &&
    localStorage && localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo")) {
      return sessionStorage.getItem("UserToken");
    }
  }
  getNewRegRequestBody(userType) {
    let uMsisdn = "";
    let uBillProfileId = "";
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("MyMsIsdn")) {
      uMsisdn = JSON.parse(localStorage.getItem("MyMsIsdn"));
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("UserInfo") && !sessionStorage.getItem("GuestInfo")) {
        const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
        userInfo.outputCPResp.services.forEach(element => {
         let mobileNumber = element.mobileNumber;
         if (element.mobileNumber.charAt(0) !== "6") {
           mobileNumber = "6" + element.mobileNumber;
         }
         mobileNumber = parseInt(mobileNumber, 10);
         if (mobileNumber === uMsisdn) {
           uBillProfileId = element.billingProfileId;
         }
       });
      }
     return {
      data: {
        userType: userType,
        msisdn: uMsisdn,
        billing_pro_id: uBillProfileId,
        planType: "DATA",
        numberCategory: "NORMAL"
      }
    };
  }
  // If user is not loggedin then preserve the selection in localstorage and redirect to login page.
  anonymousUser() {
    let bbDeviceId;
    this._activatedRoute.params.subscribe(params => bbDeviceId = params["bbDeviceId"]);
    this.subscriber = this._deviceDataService.sharedBbPlanDetails$.subscribe(data => this.selectedPlanDetails = data);
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => this.selectedColor = data);
    const homeWirelessData = {
      selectionType: "beforeLoginSelectionRetention",
      color: this.selectedColor,
      plan: this.selectedPlanDetails,
      newReg: "",
      deviceSku: bbDeviceId
    };
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("homeWirelessData", JSON.stringify(homeWirelessData));
    }
    this._router.navigateByUrl("/store/login");
  }
}
