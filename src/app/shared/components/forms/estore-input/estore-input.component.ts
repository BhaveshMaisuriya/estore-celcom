/* tslint:disable:member-ordering no-input-rename curly triple-equals class-name no-inferrable-types */

import { Component, Input, AfterContentInit, forwardRef, AfterViewInit, Injector, ViewEncapsulation, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NgControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { formatPhoneNumber } from 'app/shared/utilities/helper.ultility';
import { MatInput } from '@angular/material/input';

class CustomFieldErrorMatcher implements ErrorStateMatcher {
  constructor(private customControl: FormControl, private errors: any) { }
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // return this.customControl && this.customControl.touched &&(this.customControl.invalid || this.errors);
    // const requiredError = this.customControl && this.customControl.getError('required');
    return !!(this.customControl && this.customControl.touched && this.customControl.invalid && (this.customControl.dirty || this.errors));
  }
}

export class iSelectOptions {
  value?: any;
  label: string;
  isNone?: boolean = false;
}

@Component({
  selector: 'app-estore-input',
  templateUrl: './estore-input.component.html',
  styleUrls: ['./estore-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EstoreInputComponent),
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class EstoreInputComponent implements AfterViewInit, AfterContentInit, ControlValueAccessor {

  control: FormControl;
  onChange: any = () => { };
  onTouched: any = () => { };

  value: any;
  @Input() disabled: boolean;
  @Input() placeholder = '';
  @Input() errors = [];
  @Input() label = '';
  @Input() customValidationLabel = null;
  @Input() success = false;
  @Input() readonly = false;
  @Input() inputType:
    'text'
    | 'email'
    | 'nric'
    | 'phone'
    | 'password'
    | 'select'
    | 'postcode'
    | 'textarea' = 'text';

  @Input() options: iSelectOptions[] = [];

  @Input() iconName;
  @Input() iconType: 'normal' | 'svg' = 'normal';
  @Input() iconStyle;
  @Input() buttonText;
  @Input() buttonDisabled = false;
  @Input() rows = "5";
  @Input() cols = false;
  @Input('appearance')
  get originalAppearance() {
    return this._originalAppearance;
  }
  set originalAppearance(value) {
    if (value === 'fill') {
      this.isUseStandardFillClass = true;
    } else {
      this.isUseStandardFillClass = false;
    }
    this._originalAppearance = value;
    this.appearance = value;
  }
  @Input() floatlabel: 'always' | 'auto';
  @Output() onButtonClicked = new EventEmitter();

  type = 'text';
  inputmode = 'text';
  @Input('maxlength') _originalMaxlength;
  maxlength = 255;
  matcher;
  isFocused = false;

  isUseStandardFillClass = false;
  appearance: 'standard' | 'fill' = 'fill';
  _originalAppearance;

  @ViewChild('control') formControl: ElementRef;

  errorState() {
    return new CustomFieldErrorMatcher(this.control, this.errors);
  }

  constructor(
    public injector: Injector,
  ) {
  }

  ngAfterContentInit() {
    if (!this.customValidationLabel) {
      this.customValidationLabel = this.label;
    }
    if (['nric', 'phone', 'postcode'].includes(this.inputType)) {
      this.inputmode = 'numeric';
      if (this.inputType == 'nric') {
        this.maxlength = 12;
      }
      if (this.inputType == 'phone') {
        this.maxlength = 12;
      }
      if (this.inputType == 'postcode') {
        this.maxlength = 5;
      }
    } else if (this.inputType == 'email') {
      this.inputmode = 'email';
      this.maxlength = 255;
      this.type = 'email';
    } else if (this.inputType == 'password') {
      this.type = 'password';
    }

    // replace maxlength with original one
    if ((+this._originalMaxlength || 0) > 0) {
      this.maxlength = this._originalMaxlength;
    }

    if (this.buttonText) {
      this.appearance = 'standard';
    }
  }

  ngAfterViewInit(): void {
    const ngControl: NgControl = this.injector.get(NgControl, null);
    if (ngControl) {
      setTimeout(() => {
        this.control = ngControl.control as FormControl;
        this.matcher = new CustomFieldErrorMatcher(this.control, this.errors);
        this.buttonDisabled = this.disabled;
      });
    }
  }

  focus(options?: FocusOptions) {
    try {
      this.formControl?.nativeElement?.focus(options);
    } catch (_error) {
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.buttonDisabled = this.disabled;
  }

  MobileNumber() {
    if (this.inputType !== 'phone') return;
    let value = '';
    value = this.value;
    if (value && value !== "") {
      value = formatPhoneNumber(value);
      if (this.value != value) this.value = value;
    }
  }

  onButtonClick(event) {
    if (this.buttonText == 'Reset') this.value = '';
    this.onButtonClicked.emit(event);
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }
}
