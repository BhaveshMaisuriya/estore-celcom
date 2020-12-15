import { Component, OnInit, Output, EventEmitter, OnDestroy , ViewChild} from '@angular/core';
import { FormsModule, FormGroupDirective, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { AppService } from '../../../Service/app.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';

@Component({
  selector: 'app-email-retrieval',
  templateUrl: './email-retrieval.component.html',
  styleUrls: ['./email-retrieval.component.css']
})
export class EmailRetrievalComponent implements OnInit, OnDestroy {
  @Output() disableProceed = new EventEmitter();
  emailRetrieval = false;
  public subscriber: Subscription;
  salutationRetrieval = false;
  enterEmail;
  confirmEmail;
  givenEmail;
  inputConfirmEmail;
  invalidEmail = false;
  invalidConfirmEmail = false;
  errorMessageDisplay;
  errorConfirmMessageDisplay;
  enterSaluation;
  invalidSalutation = false;
  errorSalutationDisplay;
  errorMessage:any = {
    requiredMessage: 'Please enter email address',
    patternMessage: 'Please enter a valid email address',
    emailMismatch: 'Email and confirm Email do not match',
    salutationMissing: 'Please select salutation'
  };
  updateInformation = {
    salutation: '',
    email: '',
    typedEmail: '',
    validate: false
  };
  @ViewChild('formEmail', { static: false})
  formEmail: FormGroupDirective;

  constructor(
    private service: AppService,
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
  ) { }

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage && sessionStorage) {
      if (sessionStorage.getItem("UserInfo") || sessionStorage.getItem("GuestInfo")) {
          const userData = sessionStorage.getItem("GuestInfo") || sessionStorage.getItem("UserInfo");
          const userInfo = JSON.parse(userData);
        if (!userInfo.outputCPResp.contactEmail || userInfo.outputCPResp.contactEmail === null ||
          userInfo.outputCPResp.contactEmail === '') {
          this.emailRetrieval = true;
          this.updateInformation.email = null;
          this.updateInformation.typedEmail = null;
        }
        if (!userInfo.outputCPResp.contactSalutation || userInfo.outputCPResp.contactSalutation === null
          || userInfo.outputCPResp.contactSalutation === '') {
          this.salutationRetrieval = true;
          this.updateInformation.salutation = null;
        }
        this.disableProceed.emit(true);
      }
      if (typeof window !== 'undefined' && localStorage && !this.invalidSalutation) {
        localStorage.setItem('updateInfo', JSON.stringify(this.updateInformation));
      }
    }
    this.subscriber = this._deviceDataService.emailRetreivalValidation$.subscribe(
      data => (this.ValidateForm())
    );
  }
  ngOnDestroy() {
    if (this.subscriber) {
    this.subscriber.unsubscribe();
    }
  }

  public selectSalutation(salutation) {
    this.invalidSalutation = false;
    if (!salutation.viewModel || salutation.viewModel === '') {
      this.invalidSalutation = true;
      this.errorSalutationDisplay = this.errorMessage.salutationMissing;
    } else {
      if (salutation.viewModel) {
        this.updateInformation.salutation = salutation.viewModel;
      }
    }
    if (this.updateInformation.email === null || this.updateInformation.typedEmail === null ||
      this.updateInformation.email !== this.updateInformation.typedEmail || this.invalidEmail || this.invalidConfirmEmail) {
      this.disableProceed.emit(true);
    } else {
      this.disableProceed.emit(this.invalidSalutation);
      if (typeof window !== 'undefined' && localStorage && !this.invalidSalutation) {
        localStorage.setItem('updateInfo', JSON.stringify(this.updateInformation));
      }
    }
  }

  public emailMatchCheck() {
    this.invalidEmail = false;
    this.invalidConfirmEmail = false;
    if (typeof (this.enterEmail) !== 'undefined') {
      this.givenEmail = this.enterEmail.toLowerCase();
    }
    if (this.givenEmail) {
      this.updateInformation.typedEmail = this.givenEmail;
      if (typeof window !== 'undefined' && localStorage && !this.invalidSalutation) {
        localStorage.setItem('updateInfo', JSON.stringify(this.updateInformation));
      }
    }
    if (this.givenEmail === '' || typeof (this.enterEmail) === 'undefined' || this.givenEmail === ' ') {
      this.invalidEmail = true;
      this.errorMessageDisplay = this.errorMessage.requiredMessage;
      this.disableProceed.emit(this.invalidEmail);
    } else {
      const patternMSISDN = /^([^\s]+?)([a-zA-Z0-9_\-\.]+)([a-zA-Z0-9_\-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!patternMSISDN.test(this.givenEmail)) {
        this.invalidEmail = true;
        this.errorMessageDisplay = this.errorMessage.patternMessage;
        this.disableProceed.emit(this.invalidEmail);
        this.updateInformation.validate = this.invalidEmail;
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('updateInfo', JSON.stringify(this.updateInformation));
        }
      } else {
        if (typeof (this.confirmEmail) !== 'undefined' && this.givenEmail !== this.inputConfirmEmail && this.inputConfirmEmail !== '') {
          this.invalidConfirmEmail = true;
          this.errorConfirmMessageDisplay = this.errorMessage.emailMismatch;
          this.disableProceed.emit(this.invalidConfirmEmail);
        } else if (typeof (this.inputConfirmEmail) !== 'undefined' && this.inputConfirmEmail === '') {
          this.invalidConfirmEmail = true;
          this.errorConfirmMessageDisplay = this.errorMessage.requiredMessage;
          this.disableProceed.emit(this.invalidConfirmEmail);
        } else if (typeof (this.inputConfirmEmail) === 'undefined') {
          this.disableProceed.emit(true);
        } else {
          if (this.updateInformation.salutation !== null) {
            this.invalidConfirmEmail = false;
            this.disableProceed.emit(this.invalidConfirmEmail);
            this.updateInformation.validate = this.invalidConfirmEmail;
          } else {
            this.disableProceed.emit(true);
          }
        }
      }
    }
    if (this.errorMessageDisplay) {
      this._globalErrorHandler.errorObjectConvert(this.errorMessageDisplay);
    }
    if (this.errorConfirmMessageDisplay) {
      this._globalErrorHandler.errorObjectConvert(this.errorConfirmMessageDisplay);
    }
  }

  public reEnterEmailMatchCheck(event) {
    this.invalidConfirmEmail = false;
    if (typeof (this.confirmEmail) !== 'undefined') {
      this.inputConfirmEmail = this.confirmEmail.toLowerCase();
    }
    if (this.inputConfirmEmail) {
      this.updateInformation.email = this.inputConfirmEmail;
      if (typeof window !== 'undefined' && localStorage && !this.invalidSalutation) {
        localStorage.setItem('updateInfo', JSON.stringify(this.updateInformation));
      }
    }
    if (this.inputConfirmEmail === '' || typeof (this.inputConfirmEmail) === 'undefined') {
      this.invalidConfirmEmail = true;
      this.errorConfirmMessageDisplay = this.errorMessage.requiredMessage;

    } else {
      const patternMSISDN = /^([^\s]+?)([a-zA-Z0-9_\-\.]+)([a-zA-Z0-9_\-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
      if (!patternMSISDN.test(this.inputConfirmEmail)) {
        this.invalidConfirmEmail = true;
        this.errorConfirmMessageDisplay = this.errorMessage.patternMessage;
        this.updateInformation.validate = this.invalidConfirmEmail;
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('updateInfo', JSON.stringify(this.updateInformation));
        }
      } else {
        if (this.givenEmail !== this.inputConfirmEmail) {
          this.invalidConfirmEmail = true;
          this.errorConfirmMessageDisplay = this.errorMessage.emailMismatch;
        } else {
          if (this.inputConfirmEmail) {
            this.updateInformation.email = this.inputConfirmEmail;
          }
        }
      }
    }
    if (this.errorConfirmMessageDisplay) {
      this._globalErrorHandler.errorObjectConvert(this.errorConfirmMessageDisplay);
    }
    if (this.updateInformation.salutation === null) {
      this.disableProceed.emit(true);
    } else {
      this.disableProceed.emit(this.invalidConfirmEmail);
      this.updateInformation.validate = this.invalidConfirmEmail;
    }
    if (typeof window !== 'undefined' && localStorage && !this.invalidSalutation) {
      localStorage.setItem('updateInfo', JSON.stringify(this.updateInformation));
    }
  }

  ValidateForm() {
    this.validateAllFormFields(this.formEmail.form);
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  public onDrop(event) {
    return false;
  }

}
