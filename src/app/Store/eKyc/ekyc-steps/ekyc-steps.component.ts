import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EKycService } from '../e-kyc.service';
import { PrepaidService } from 'app/Store/plan/prepaid/prepaid.service';

@Component({
  selector: "app-ekyc-steps",
  templateUrl: "./ekyc-steps.component.html",
  styleUrls: ["./ekyc-steps.component.scss"]
})
export class EkycStepsComponent implements OnInit {

  @Output() getStatus = new EventEmitter<boolean>();

  isMobile: boolean;
  showScanNow: boolean = true;
  qrValue;
  loading = false;
  refreshSession = false;
  timeOutRef;
  @Input () showPassport = false;

  constructor(private _ekycService: EKycService, private _prepaidService: PrepaidService) {}

  ngOnInit(): void {
    this.isMobile = this._ekycService.checkIsMobile();
    this.getQRValue();
    this.isIosSafari();
  }

  getQRValue(){
    this.loading = true;
    this.refreshSession = false;
    const payload = {
      idDetails: {
        idType: this._prepaidService.mnpData.idType,
        idNumber: this._prepaidService.mnpData.idNumber
      },
    }
    this._ekycService.getQrText(payload).subscribe((res:any) => {
      sessionStorage.setItem('ekyc', res?.key);
      this.getStatus.emit(true);
      this.qrValue = `${window.location.origin}/e-kyc?sessionId=${res?.key}`;
      this.loading = false;
      this.timeOutRef = setTimeout(() => {
        this.refreshSession = true;
      }, 60000*15);
    }, err => {
      console.error(err);
    })
  }

  ngOnDestroy() {
    clearTimeout(this.timeOutRef);
  }

  openEkyc(){
    localStorage.setItem('ekycIsMoble', 'true');
    window.open(`${window.location.origin}/e-kyc`, "_blank");
  }

  isIosSafari() {
    const isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if(iOS) {
      if(isSafari) {
        this.showScanNow = true;
      } else {
        this.showScanNow = false;
      }
    } else {
      this.showScanNow = true;
    }
  }

}
