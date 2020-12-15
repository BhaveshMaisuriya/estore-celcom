import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { EnterpriseService } from '../enterprise.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import * as errorconst from "../../../../constants/error.constants";
import { trigger, state, style, transition, animate, group } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { emailRegex } from '../../../shared/constants/application.constants';
import { finalize, map } from 'rxjs/operators';

export const SlideInOutAnimation = [
  trigger('slideInOut', [
    state('in', style({
      'max-height': '100vh', 'display': 'block'
    })),
    state('out', style({
      'max-height': '0vh', 'display': 'none'
    })),
    transition('in => out', [group([
      animate('600ms ease-in-out', style({
        'max-height': '0vh'
      })),
      animate('700ms ease-in-out', style({
        'display': 'none'
      }))
    ]
    )]),
    transition('out => in', [group([
      animate('1ms ease-in-out', style({
        'display': 'block'
      })),
      animate('600ms ease-in-out', style({
        'max-height': '100vh'
      })),
    ]
    )])
  ]),
];
@Component({
  selector: 'app-enterprise-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [SlideInOutAnimation]
})
export class EnterpriseRegistrationComponent implements OnInit, AfterViewInit {
  registerForm: FormGroup;
  resendEmailForm: FormGroup;
  general_error = '';
  disableButton = false;
  valueChanges$;
  isLoading = false;
  selectedUserTab: string = 'new-user';
  popupData = {
    title: 'Email successfully sent!',
    content: 'Please check your mailbox.',
    button: 'Got it',
  };
  showPopup = false;

  showSection = false;
  animationState = 'out';
  registrationSuccess = false;
  userData = {};
  @ViewChild("resendEmailControl1", { static: false }) resendEmail: ElementRef;


  constructor(
    private fb: FormBuilder,
    private _service: EnterpriseService,
    private _commonUtilService: CommonUtilService,
    private _deviceDataService: DeviceDataService,
    private route: ActivatedRoute,
    private router: Router,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
  ) { }

  ngOnInit() {
    if (this._service.isOtherUser()) {
      this.redirectToOtherPage();
    }

    const currentUrl: string = this.route.snapshot.url.join('');
    this.route.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(status => {
      if (status === false) {
        this.showPopup = false;
        if (this.registrationSuccess) {
          window.location.href = `/store/enterprise/login?code=${btoa(JSON.stringify(this.userData))}`;
          // this.router.navigate(['/store/enterprise/login'], {
          //   queryParams: {
          //     code: btoa(JSON.stringify(this.userData)),
          //   }
          // })
        }
      }
    });

    this.registerForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern("^[A-Za-z\ \']+$"),
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(emailRegex),
        ],
        // this.validateEmail.bind(this)
      ],
      nric: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          this.validateNRIC.bind(this)
        ]
      ],
    });
    this.resendEmailForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(emailRegex),
        ],
      ],
    });
    this.registerForm.valueChanges.subscribe(val => this.general_error = '');
    this.resendEmailControl.valueChanges.subscribe(value => {
      if (this.resendEmailControl.hasError('custom')) {
        this.resendEmailControl.setErrors({ custom: null });
      }
    })
  }

  ngAfterViewInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['resend-email']){
        setTimeout(() => {
          this.toggleShowDiv();
          document.getElementById('submitBtn').scrollIntoView();
          this.animationState = 'in';
          this.resendEmail.nativeElement.focus();
        }, 1000);
      }
    });
  }

  onClickSection() {
    this.showSection = !this.showSection;
  }

  toggleShowDiv() {
    this.animationState = this.animationState === 'out' ? 'in' : 'out';
  }

  get emailControl() {
    return this.registerForm.get('email');
  }

  get resendEmailControl() {
    return this.resendEmailForm.get('email');
  }

  get nameControl() {
    return this.registerForm.get('name');
  }

  get nricControl() {
    return this.registerForm.get('nric');
  }

  validateEmail(control: AbstractControl) {
    return this._service.checkServerValidEmail(control.value).pipe(map(res => {
      return res ? null : { email: true };
    }));
  }

  validateNRIC(control: AbstractControl) {
    const value = (control.value + '').trim();
    const pattern = /^[0-9]*$/;
    let valid = true;
    if (value.length !== 12 || !pattern.test(value))
      valid = false
    const { error } = this._commonUtilService.validationForIdType(1, value);
    if (!valid || error) {
      return {
        invalid: true
      }
    }

    return null;
  }

  onFormSubmit() {
    this.general_error = '';
    Object.keys(this.registerForm.controls).forEach(element => {
      this.registerForm.get(element).markAsTouched();
    });
    if (this.registerForm.valid) {
      this.disableButton = true;
      this.isLoading = true;
      this.userData = {
        "nric": (this.nricControl.value + '').trim(),
        "email": (this.emailControl.value + '').trim(),
        "name": (this.nameControl.value + '').trim()
      }
      const data = {
        "loginData": {
          "user": "guest",
          "id_type": "1",
          ...this.userData
        }
      }
      this._service.register(data)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          (response) => {
            let title = 'Email successfully sent!';
            if (response && response[0] && (response[0]['status'] + '') == 'true') {
              this.registerForm.disable();
              this.popupData = {
                title: title,
                content: response[0]['message'] || 'Please check your mailbox.',
                button: 'Got it!',
              };
              if (response[0]['state']) {
                this.userData['state'] = response[0]['state'];
              }
              this.showPopup = true;
              this.registrationSuccess = true;
            } else {
              this.disableButton = false;
              if (response[0]['type'] == 'email') {
                this.emailControl.setErrors({
                  server: response[0]['message'],
                });
              } else {
                this.general_error = response[0]['message'] || errorconst.SYS_DOWN_MSG;
              }
            }
          },
          (err) => {
            this.general_error = errorconst.SYS_DOWN_MSG;
            this.disableButton = false;
          }
        );

    }
    return false;
  }

  restrictOnlyNum = (ev) => {
    return this._commonUtilService.restrictOnlyNum(ev, "nric", this.nricControl.value ? this.nricControl.value.toString() : "");
  }

  onResendFormSubmit() {
    if (this.resendEmailForm.valid) {
      this.disableButton = true;
      this.isLoading = true;
      const data = {
        "loginData": {
          "email": (this.resendEmailControl.value + '').trim(),
        }
      }
      this._service.resendEmail(data)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe(
          (response) => {
            let title = 'Email successfully sent!';
            if (response && response[0] && (response[0]['status'] + '') == 'true') {
              this.resendEmailForm.disable();
              this.popupData = {
                title: title,
                content: response[0]['message'] || 'Please check your mailbox.',
                button: 'Got it!',
              };
              this.showPopup = true;
            } else {
              this.disableButton = false;
              const msg = response[0]['message'] || errorconst.SYS_DOWN_MSG;
              this.resendEmailControl.setErrors({
                custom: msg
              });
            }
          },
          (err) => {
            this.resendEmailControl.setErrors({
              custom: errorconst.SYS_DOWN_MSG
            });
            this.disableButton = false;
          }
        );
    }
  }

  redirectToOtherPage() {
    this.router.navigate(['/store/devices']);
  }

  onUserTabChange(tabName: string) {
    if(tabName === "new-user") {
      this.selectedUserTab = 'new-user';
    } else if(tabName === "existing-user") {
      this.selectedUserTab = 'existing-user';
    }
  }
}
