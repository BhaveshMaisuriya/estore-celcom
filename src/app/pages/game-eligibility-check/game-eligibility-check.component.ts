import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { GameEligibilityCheckService, ICustData, IVoucherData } from 'app/Service/game-eligibility-check.service';
import { ModalService } from 'app/shared/components/modal/modal.service';
import { finalize } from 'rxjs/operators';
import { untilDestroyed } from 'app/shared/services/until-destroyed.service';
import { FORM_VALIDATION_PATTERN } from 'app/shared/constants/form.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-eligibility-check',
  templateUrl: './game-eligibility-check.component.html',
  styleUrls: ['./game-eligibility-check.component.scss']
})
export class GameEligibilityCheckComponent implements OnInit {

  loading = false;
  isCustomerEligible: boolean = false;
  showGamification: boolean = false;
  showEligibleMessage: boolean = false;
  isGameEnabled: boolean  = false;
  errorMessage: string = "";

  eligibilityForm: FormGroup = null;
  eligibleCustomer: { 
    name: string;
    nric: string;
    email: string;
  } = {
    name: '',
    nric: '',
    email: ''
  };
  
  voucherData: IVoucherData[];
  gamificationPayload: ICustData

  formConstants = {
    phone: FORM_VALIDATION_PATTERN.phone,
    nric: FORM_VALIDATION_PATTERN.nric
  };

  constructor(
    private _router: Router,
    private _gameEligibilityCheckService: GameEligibilityCheckService,
    private _modalService: ModalService
  ) { 
    this.eligibilityForm = new FormGroup({
      msdn: new FormControl("", [
        Validators.required,
        Validators.pattern(this.formConstants.phone)
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
    this._modalService.onClosedModal.subscribe(popup => {
      if(popup === "gamification-popup") {
        this.showGamification = false;
      }
    });
  }
  
  ngAfterViewInit() {
    const dealerInfo      = JSON.parse(sessionStorage.getItem("DealerInfo"));
    this.isGameEnabled    = !!(dealerInfo?.gamification_enabled);

    if (!(sessionStorage && dealerInfo) 
      && window.location.href.indexOf('store/game-eligibility-check') > -1) {
      this._modalService.open("gamification-error-popup");
    } else if (!this.isGameEnabled) {
      this._router.navigate(["/store/dealerlandingpage"]);
    }
  }
  
  enableSubmit() {
    return (!this.eligibilityForm?.controls?.msdn?.valid || 
      !this.eligibilityForm?.controls?.nric?.valid || 
      !this.eligibilityForm?.controls?.orderId?.valid);
  }

  hideEligibilityMessage() {
    this.showEligibleMessage = false;
  }

  handleSubmit() {
    this.loading = true;

    this.gamificationPayload = {
      "msisdn": this.eligibilityForm.controls.msdn.value,
      "nric": this.eligibilityForm.controls.nric.value,
      "orderId": this.eligibilityForm.controls.orderId.value,
      "magentoOrderId": '',
      "promoType": "external",
      "played": false
    };

    this._gameEligibilityCheckService.checkEligibility(this.gamificationPayload)
      .pipe(
        finalize(() => { this.loading = false; }),
        untilDestroyed(this),
      )
      .subscribe(response => {
        this.showEligibleMessage = true;

        if (response.status === true) {
          this.isCustomerEligible = true;
          
          this.eligibleCustomer.name = response.customer_name;
          this.eligibleCustomer.nric = response.nric;
          this.eligibleCustomer.email = response.customer_email;
          this.voucherData = response.voucher_data;
        } else {
          this.errorMessage = response.message;
        }
      }, err => this.setError(err));

  }

  proceedGamification() {
    this.showGamification = true;
  }

  resetAll() {
    this.isCustomerEligible = false;
    this.showEligibleMessage = false;
    this.errorMessage = "";
    
    this.eligibilityForm.setValue({
      msdn: "",
      nric: "",
      orderId: ""
    });
    this.eligibilityForm.markAsUntouched();
  }

  closeErrorPopup() {
    this._modalService.close("gamification-error-popup");
  }

  setError(err: any | iGeneralServerResponse) {
    return this._modalService.showError(err);
  }

  ngOnDestroy() {
    
  }

}
