import { Component, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MnpSimVerificationService, IOrderData } from './mnp-sim-verification.service';
import { ModalService } from 'app/shared/components/modal/modal.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FORM_VALIDATION_PATTERN } from 'app/shared/constants/form.constants';
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { untilDestroyed } from 'app/shared/services/until-destroyed.service';
import { OrderTrackingService } from 'app/Store/shared/services/order-tracking.service';

@Component({
  selector: 'app-mnp-sim-verification',
  templateUrl: './mnp-sim-verification.component.html',
  styleUrls: ['./mnp-sim-verification.component.scss'],
  providers: [OrderTrackingService]
})
export class MnpSimVerificationComponent implements OnInit {

  isLoggedIn: boolean = true;
  
  formConstants = {
    nric: FORM_VALIDATION_PATTERN.nric
  };
  
  mnpSimVerifyForm: FormGroup = null;

  idTypes = [
    {
      id: 1,
      value: 'New NRIC',
      label: 'New NRIC'
    }
  ];

  isIdVerified: boolean = false;
  isSimVerified: boolean = false;

  serialNumber: string[] = [];
  sNolastDigits: string = "";
  isMultipleSIM: boolean = false;
  trackOrderUrl = 'store/checkout/trackorderdetails';
  orderNo: string = "";

  constructor(
    private _router: Router,
    private _mnpSimVerificationService: MnpSimVerificationService,
    private _modalService: ModalService,
    private _orderTracking: OrderTrackingService,
    public activatedRoute: ActivatedRoute
  ) { 
    this.mnpSimVerifyForm = new FormGroup({
      idType: new FormControl('New NRIC', [
        Validators.required,
      ]),
      nric: new FormControl("", [
        Validators.required,
        Validators.pattern(this.formConstants.nric)
      ]),
      orderId: new FormControl("", [
        Validators.required
      ])
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.orderNo = params['orderId'];
      this.mnpSimVerifyForm.patchValue({
        orderId: this.orderNo
      });
    });
  }

  enableNext() {
    return (!this.mnpSimVerifyForm?.controls?.idType?.valid || 
      !this.mnpSimVerifyForm?.controls?.nric?.valid || 
      !this.mnpSimVerifyForm?.controls?.orderId?.valid);
  }

  verifyID() {
    const url = "/rest/V1/trackOrder";
      const requestParams = {
        "track_order_data": {
          "siebel_order_num": this.mnpSimVerifyForm.controls.orderId.value,
          "id_number": this.mnpSimVerifyForm.controls.nric.value
        }
      };
      this._orderTracking.TrackOrder(url, requestParams).subscribe(
        (response: any) => {
          if (response.status === true) {
            if (typeof window !== 'undefined' && sessionStorage) {
              sessionStorage.setItem("UserToken", response.token);
              sessionStorage.setItem("authtoken", response.authtoken);
            }
            if (response.ismnpcomplete === "1") {
              this.redirectToTrackOrder();
            }
            // Temporary Changes untill error messages not defined.
            if (response.cngenerated !== "1") {
              this.setError({
                message: "CN is not generated",
                status: false
              });
            } else {
              this.isIdVerified = true;
              this.isMultipleSIM = response.simserialnumber.includes('*');
              this.serialNumber = response.simserialnumber.match(/.{1,4}/g);
              this.serialNumber.push('');
            }
          } else {
            this.setError(response);
          }
        }, err => this.setError(err));
  }

  redirectToTrackOrder(){
    this._router.navigate([this.trackOrderUrl, this.orderNo]);
  }

  verifySimDetails() {
    // Invoke api
    // after getting success response, change isSimVerified into true
    const simPayload = {
      "track_order_data": {
        "siebel_order_num": this.mnpSimVerifyForm.controls.orderId.value,
        "id_number": this.mnpSimVerifyForm.controls.nric.value,
        "sim_serial_num": this.serialNumber[4]
      }
    }

    this._mnpSimVerificationService.verifySimDetail(simPayload)
      .pipe(
        untilDestroyed(this),
      )
      .subscribe(response => {
        if (response[0].status) {
          this.isSimVerified = true;
        } else {
          this.setError(response[0]);
        }
      }, err => this.setError(err));

  }

  closeErrorPopup() {
    this._modalService.close("mnp-sim-error-popup");
  }

  setError(err: any | iGeneralServerResponse) {
    return this._modalService.showError(err);
  }

  ngOnDestroy() {
    
  }

}
