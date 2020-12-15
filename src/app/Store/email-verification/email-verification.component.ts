import { Component, OnInit } from '@angular/core';
import { AppService } from "../../Service/app.service";

@Component({
  selector: 'app-email-verifications',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  apiStatus = "";
  apiResponse = "";
  onAPIResponse = false;
  apiSuccess = false;

  constructor(
    private _appService: AppService) { }

  ngOnInit() {
    this.verifyEmail();
  }

  verifyEmail = () => {
    const url = "/rest/V1/verify-contact-email";
    const token = /[^/]*$/.exec(window.location.href)[0];
    const requestBody = {"verificationLink": token
    };
    this._appService.postEmailVerificationStatus(url, requestBody).subscribe(
      (response: any) => {
        if (response[0].status) {
          this.apiStatus = "Update Successful";
          this.apiSuccess = true;
        } else {
          this.apiStatus = "Update failed";
          this.apiResponse = response[0].message;
          this.apiSuccess = false;
        }
        this.onAPIResponse = true;
      },
      (error: any) => {
        this.apiStatus = "Update Failed";
        this.apiResponse = error.error ? error.error.message:'';
        this.apiSuccess = false;
        this.onAPIResponse = true;
      });
  }
}
