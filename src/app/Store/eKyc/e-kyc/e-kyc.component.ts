import { Component, OnInit } from "@angular/core";
import { EKycService } from "../e-kyc.service";
import { ModalService } from "app/shared/components/modal/modal.service";
import { NguCarouselConfig } from "@ngu/carousel";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import {
  IdDetailsInterface,
  IEkycIdResponse,
  IEKycStatusResponse,
  ISelfieResponse
} from "../e-kyc.model";
import { PrepaidService } from 'app/Store/plan/prepaid/prepaid.service';

@Component({
  selector: "app-e-kyc",
  templateUrl: "./e-kyc.component.html",
  styleUrls: ["./e-kyc.component.scss"]
})
export class EKycComponent implements OnInit {
  ekycCarouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 1,
    interval: { timing: 6000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.5,
    point: {
      visible: true
    }
  };

  ekycImages = [
    {
      img: "assets/img/eKyc/eKYC_IC1.svg",
      text: 'Make sure to scan within the frame without covering the ID details.'
    },
    {
      img: "assets/img/eKyc/eKYC_IC2.svg",
      text: 'Please scan the ID type you’ve selected. Your ID should not reflect light or be covered by items during the scan.'
    },{
      img: "assets/img/eKyc/eKYC_IC3.svg",
      text: 'Please scan the ID type you’ve selected. Your ID should not reflect light or be covered by items during the scan.'
    }
  ];

  step = 1;
  
  // step = 1 ID Instruction Page
  // step = 2 ID Information Page
  // step = 3 Selfie Instruction Page
  // step = 4 EKYC Success Page
  // step = 5 Loading Page
  // step = 6 ID Image Capture
  // step = 7 Selfie Image Capture
  // step = 8 ID Error Page
  // step = 9  Selfie Error Page

  fromDesktop = false;
  selectedImage;
  // in future if eKyc is implemented for other plans than we get route
  onCompleteRoute;
  personalDetails;
  isMobile;
  idImage;
  idFace;
  errMsg;
  base64;
  isImageLoading: boolean = false;
  journeyId: string | null = null;
  isPassport;
  idDetails: IdDetailsInterface;

  constructor(
    private _ekycService: EKycService,
    private _modalService: ModalService,
    private route: ActivatedRoute,
    private _prepaidService: PrepaidService
  ) {
    this.personalDetails = new FormGroup({
      name: new FormControl(""),
      idNumber: new FormControl(""),
      citizenShip: new FormControl(""),
      address1: new FormControl(""),
      address2: new FormControl(""),
      postCode: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl(""),
      issueCountry: new FormControl(""),
      expireDate: new FormControl("")
    });
  }

  ngOnInit(): void {
    this.getSessionDetails();
  }

  getSessionDetails() {
    let sessionId;
    this.route.queryParams.subscribe(params => {
      sessionId = params["sessionId"];
    });

    this.isMobile = this._ekycService.checkIsMobile();
    if (sessionId && this.isMobile && window) {
      this.fromDesktop = window.localStorage.getItem('ekycIsMoble') !== 'true';
      sessionStorage.setItem("ekyc", sessionId);
    }
    this._ekycService.getSessionDetails().subscribe(
      (res: IEKycStatusResponse) => {
        if (res.verified) {
          this._modalService.open("session-expried-popup");
        } else {
          sessionStorage.setItem("TempUserToken", res.data?.usertoken);
          this.onCompleteRoute = res.data?.redirectTo;
          this.idDetails = res.data?.idDetails;
        }
      },
      err => {
        if(this.isMobile){
          this._modalService.open("session-expried-popup");
        }
      }
    );
  }

  uploadIdImage = val => {
    this.idImage = val;
    this.step = 5;
    const payload = {
      journeyId: this.journeyId,
      imageFormat: "jpeg",
      base64ImageString: this.idImage,
      id_number: this.idDetails.idNumber,
      id_type: this.idDetails.idType
    };
    this._ekycService.uploadId(payload).subscribe(
      (res: IEkycIdResponse) => {
        if (res.status) {
          this.step = 2;
          this.journeyId = res.journeyId;
          const customerData = res.customer_data;
          this.isPassport = this.idDetails.idType === "Passport";
          this.idFace = res.faceImages;
          if (this.isPassport) {
            this.personalDetails.patchValue({
              name: customerData.fullName,
              idNumber: customerData.idNumber,
              issueCountry: customerData.country,
              expireDate: customerData.expiryDate
            });
          } else {
            this.personalDetails.patchValue({
              name: `${customerData.firstName} ${customerData.lastName}`,
              idNumber: customerData.idNumber,
              citizenShip: customerData.country,
              address1: customerData.addressLine1,
              address2: customerData.addressLine2,
              postCode: customerData.postCode,
              city: customerData.city,
              state: customerData.state
            });
          }
        } else {
          this.step = 8;
          this.errMsg = res.message;
        }
      },
      err => {
        this.step = 8;
        this.errMsg = err.message;
      }
    );
  };

  upload() {
    const base64String: string = this.base64.match(/.+;base64,(.+)/)[1];
    if (this.step === 6) {
      this.uploadIdImage(base64String);
    } else if (this.step === 7) {
      this.uploadSelfieImage(base64String);
    }
  }

  uploadImage() {
    this.base64 = this._ekycService.getImage();
    this.upload();
  }

  uploadSelfieImage = val => {
    this.step = 5;
    const payload = {
      journeyId: this.journeyId,
      idCard: this.idFace,
      selfie: val,
      id_number: this.idDetails.idNumber,
      id_type: this.idDetails.idType
    };
    this._ekycService.uploadSelfie(payload).subscribe(
      (res: ISelfieResponse) => {
        if (res.status) {
          this.step = 4;
          this._prepaidService.handleEKycSuccess();
        } else {
          this.step = 9;
          this.errMsg = res.message;
          this._modalService.open("Error-popup");
        }
      },
      err => {
        this.step = 9;
        this.errMsg = err.message;
      }
    );
  };

  goToStep(val) {
    this.step = val;
  }

  proceed() {
    window.close();
  }
}
