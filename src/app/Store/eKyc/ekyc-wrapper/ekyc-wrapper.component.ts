import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { PrepaidService } from 'app/Store/plan/prepaid/prepaid.service';
import { IEKycStatusResponse } from "../e-kyc.model";
import { EKycService } from "../e-kyc.service";
import { E_KYC_DETAILS } from "../../../shared/constants/session-storage.constants";

@Component({
  selector: "app-ekyc-wrapper",
  templateUrl: "./ekyc-wrapper.component.html",
  styleUrls: ["./ekyc-wrapper.component.scss"]
})
export class EkycWrapperComponent implements OnInit, OnDestroy {

  @Input() showPassport: boolean = false;
  @Output() onEkycSuccess = new EventEmitter<boolean>();

  showEkycDetails: boolean = null;
  intervalRef;
  ekycDetails;
  isLoading:boolean;
  showImage: boolean;

  constructor(private _eKycService: EKycService, private _prepaidService: PrepaidService) {}

  ngOnInit(): void {
    this.getEKYCDetails();
  }

  getEKYCDetails() {
    this.isLoading = true;
    this._eKycService.getEKycData().subscribe(response => {
      this.isLoading = false;
      this.ekycDetails = {
        ...response.customer_data,
        idType: this._prepaidService.mnpData.idType
      };

      sessionStorage.setItem(E_KYC_DETAILS, JSON.stringify({
        ...this.ekycDetails,
        defaultEmail: `${ this.ekycDetails?.idNumber }@celcom.com`
      }));

      this.showEkycDetails = response.status;
        if(this.intervalRef){
          clearInterval(this.intervalRef);
        }
        if(response.status) {
          this.onEkycSuccess.emit(true);
        }
    }, err => {
      this.isLoading = false;
    });
  }

  setIntervalFn(event) {
    this.showImage = true;
    this.intervalRef = setInterval(() => {
      this.getStatus();
    }, 1000 * 15);
  }

  getStatus() {
    this._eKycService.getSessionDetails().subscribe(
      (res: IEKycStatusResponse) => {
        this.showEkycDetails = res.verified;
        if (this.showEkycDetails) {
          this.getEKYCDetails();
        }
      },
      err => {
        clearInterval(this.intervalRef);
      }
    );
  }

  ngOnDestroy() {
    clearInterval(this.intervalRef);
  }
}
