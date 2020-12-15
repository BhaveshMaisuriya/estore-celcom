import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EnterpriseService } from '../enterprise.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as errorconst from "../../../../constants/error.constants";
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-enterprise-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class EnterpriseLoginComponent implements OnInit {
  name: string;
  nric: string;
  maskedNric: string;
  email: string;
  general_error = '';
  otpForm: FormGroup;
  isLoading = false;
  loginData = null;

  constructor(
    private fb: FormBuilder,
    private _service: EnterpriseService,
    private route: ActivatedRoute,
    private router: Router,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
  ) { }

  ngOnInit() {
    const currentUrl: string = this.route.snapshot.url?.join('');
    if (this._service.isEnterpriseUser()) {
      this.redirectToLandingPage();
    }
    if (this._service.isOtherUser()) {
      this.redirectToOtherPage();
    }
    this.route.data?.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    this.otpForm = this.fb.group({
      otp: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
        ],
      ],
    });
    this.route.queryParams?.subscribe(params => {
      if(params['code']){
        const {name, email, nric, state} = JSON.parse(atob(params['code']));
        this.name = name;
        this.email = email;
        this.nric = nric;
        this.maskedNric = nric.substr(-4).padStart(12, '*');
        this.loginData = {
            "user": "enterprise",
            "id_type": "1",
            "id_number": nric,
            email,
            name,
            state
        }
      }
    });
  }

  get otpControl() {
    return this.otpForm.get('otp');
  }

  onFormSubmit() {
    Object.keys(this.otpForm.controls).forEach(element => {
      this.otpForm.get(element).markAsTouched();
    });
    if (this.otpForm.valid) {
      this.general_error = '';
      this.otpControl.setErrors(null);
      this.isLoading = true;
      const data = {
        "login_data": {
          ...this.loginData,
          otp: this.otpControl.value
        }
      }
      this._service.login(data)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          (response) => {
            if(response[0] && response[0]['status'] && (response[0]['status'] + '') == 'true'){
              this.otpForm.disable();
              this.redirectToLandingPage();
            } else {
              try {
                this.general_error = response[0]['message'];
                this.otpControl.setErrors({
                  custom: response[0]['message']
                });
              } catch (_err) {
                this.general_error = errorconst.SYS_DOWN_MSG;
                this.otpControl.setErrors({
                  custom: errorconst.SYS_DOWN_MSG
                });
              }
            }
          },
          (err) => {
            try {
              this.general_error = err['error']['message'];
              this.otpControl.setErrors({
                custom: err['error']['message']
              });
              if (this.general_error.length == 0) {
                this.general_error = err['error']['reason'];
                this.otpControl.setErrors({
                  custom: err['error']['reason']
                });
              }
            } catch (_err) {
              this.general_error = errorconst.SYS_DOWN_MSG;
              this.otpControl.setErrors({
                custom: errorconst.SYS_DOWN_MSG
              });
            }
          }
        )

    }
    return false;
  }

  redirectToLandingPage() {
    this.router.navigate(['/store/enterprise/landing']);
  }

  redirectToOtherPage() {
    this.router.navigate(['/store/devices']);
  }
}