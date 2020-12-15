// https://medium.com/@avhijitdutta/otp-box-build-in-angular-db7df71753b1

import { Component, OnInit, ViewChildren, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-otp-input',
  templateUrl: './new-otp-input.component.html',
  styleUrls: ['./new-otp-input.component.scss']
})
export class NewOtpInputComponent implements OnInit {

  otpForm: FormGroup;
  formInput = Array(6)
    .fill(0)
    .map((_, i) => `input${ i + 1 }`);

  @ViewChildren('formRow') rows: any;

  @Input() showLabel = true;

  constructor(
  ) {
    this.otpForm = this.toFormGroup(this.formInput);
  }

  toFormGroup(elements) {
    const group: any = {};
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    return new FormGroup(group);
  }

  ngOnInit(): void {
  }

  keyUpEvent(event, index) {
    let pos;
    if (event.keyCode === 8 && event.which === 8) {
      pos = index - 1;
    } else {
      const val = this.otpForm.get(this.formInput[index]).value;
      if (!val) {
        return false;
      }
      pos = index + 1;
    }
    if (pos > -1 && pos < this.formInput.length) {
      this.rows._results[pos].nativeElement.focus();
    }
  }

  getValue() {
    const val = this.otpForm.value;
    return Object.values(val).join('');
  }

  clearValue() {
    this.otpForm.reset();
  }

}
