import { storiesOf } from '@storybook/angular';
import { boolean, text, withKnobs, object } from '@storybook/addon-knobs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstoreInputComponent, iSelectOptions } from 'app/shared/components/forms/estore-input/estore-input.component';
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { EstoreCheckboxComponent } from '../estore-checkbox/estore-checkbox.component';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { IconModule } from 'app/shared/icon.module';

@Component({
    selector: 'test-cmp',
    template: `
      <form [formGroup]="myForm" autocomplete="off">
        <div class="row">
            <div class="col-md-3">
                <app-estore-input 
                  label="NRIC Number"
                  [appearance]="'fill'"
                  [inputType]="'nric'"
                  [success]="true"
                  placeholder="12345678" 
                  formControlName="nric" >
                </app-estore-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <app-estore-input 
                  label="Contact Number"
                  [appearance]="'fill'"
                  [inputType]="'phone'"
                  placeholder="e.g 60112543654789" 
                  formControlName="phone" >
                </app-estore-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <app-estore-checkbox 
                  label="Agree"
                  formControlName="agree" >
                </app-estore-checkbox>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                {{ isSelected | json }}
                <app-estore-checkbox 
                  label="Agree (ngModel)"
                  [(ngModel)]="isSelected"
                  [ngModelOptions]="{standalone: true}" >
                </app-estore-checkbox>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <mat-checkbox formControlName="agree">Regular checkbox</mat-checkbox>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <app-estore-input 
                  label="ID Type"
                  [appearance]="'fill'"
                  [inputType]="'select'"
                  formControlName="id_type"
                  [success]="true"
                  [options]="options" >
                </app-estore-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
            <mat-form-field appearance="fill">
                <mat-label>Select an option</mat-label>
                <mat-select [(value)]="selected">
                    <mat-option>None</mat-option>
                    <mat-option value="option1">Option 1</mat-option>
                    <mat-option value="option2">Option 2</mat-option>
                    <mat-option value="option3">Option 3</mat-option>
                </mat-select>
            </mat-form-field>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <h3>With button and icon</h3>
                <mat-form-field appearance="standard" style="width: 100%">
                    <input matInput placeholder="Search number (max 4 digits)" formControlName="search">
                    <mat-icon matPrefix style="position: relative; margin-right: 5px; top: 5px">search</mat-icon>
                    <button style="margin-bottom: 7px" matSuffix class="btn btn-rounded btn-primary btn-small">Submit</button>
                </mat-form-field>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <mat-form-field appearance="standard" style="width: 100%">
                    <input matInput placeholder="Search number (max 4 digits)" formControlName="search">
                    <mat-icon matPrefix style="position: relative; margin-right: 5px">search</mat-icon>
                    <button matSuffix class="btn btn-transparent"> 
                       <mat-icon>clear</mat-icon> Reset
                    </button><!-- /.btn btn-rounded btn-primary -->
                </mat-form-field>
            </div>
        </div>
        <div class="row">
            <div class="col-md-3">
                <mat-form-field appearance="standard" floatLabel="always">
                    <mat-label>Supplementary Line 1</mat-label>
                    <input matInput #input maxlength="10" placeholder="Eg. 0191234567" [formControl]="fontSizeControl" >
                    <button matSuffix class="btn btn-rounded btn-primary btn-small">Submit</button><!-- /.btn btn-rounded btn-primary -->
                </mat-form-field>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <h4>estore-input with button and icon</h4>
                <app-estore-input 
                customValidationLabel="Estore Input"
                  placeholder="Search number (max 4 digits)" 
                  formControlName="search" 
                  maxlength="4"
                  [iconName]="'search'"
                  [buttonText]="'Submit'">
                </app-estore-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <h4>With fill style</h4>
                <app-estore-input
                    customValidationLabel="Estore Input"
                    placeholder="Fill"
                    formControlName="search"
                    maxlength="4"
                    appearance="fill"
                    [iconName]="'search'"
                    [buttonText]="'Submit'">
                </app-estore-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 text-center" style="background: #007cb2;">
                <div class="mb-estore-h" style="color: white;">
                    Celcom MEGA™
                </div>
                <app-estore-input
                    customValidationLabel="Estore Input"
                    placeholder="Fill"
                    formControlName="search"
                    maxlength="4"
                    appearance="fill"
                    [iconName]="'estore-share'"
                    [iconType]="'svg'"
                    [iconStyle]="{'color': '#333'}"
                    [readonly]="true"
                    [buttonText]="'Copy'">
                </app-estore-input>
            </div>
        </div>
        <div class="row" style="/*background: #f3f3f3*/">
            <div class="col-md-4">
                <h4>With reset button</h4>
                <app-estore-input 
                  customValidationLabel="Key"
                  placeholder="Search number (max 4 digits)" 
                  formControlName="search"
                  [buttonText]="'Reset'">
                </app-estore-input>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4">
                <app-estore-input 
                  label="Supplementary Line 1"
                  placeholder="E.g. 0912323232" 
                  formControlName="search"
                  [buttonText]="'Submit'"
                  (onButtonClicked)="console.log('click')">
                </app-estore-input>
            </div>
        </div>
        <pre>{{ supp_lines | json }}</pre>
        <div class="row" *ngFor="let item of supp_lines; let i = index">
            <div class="col-md-6">
                <div class="supp-card-container">
                    <div class="supp-card" [ngClass]="{'selected': item.selected}">
                        <div class="label">{{ 'Line ' + (i + 1) }}</div>
                        <div class="control">
                            <app-estore-checkbox 
                                [(ngModel)]="item.selected"
                                [ngModelOptions]="{standalone: true}">
                            </app-estore-checkbox>
                        </div>
                    </div><!-- /.supp-card -->
                    <app-estore-input 
                        *ngIf="item.selected"
                        [label]="'Supplementary Line ' + (i + 1)"
                        customValidationLabel="this field has very long custom validation label to test the error validation"
                        placeholder="E.g. 0912323232" 
                        formControlName="search"
                        [buttonText]="'Submit'"
                        (onButtonClicked)="console.log('click')">
                        </app-estore-input>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-3">
                <div class="d-flex align-items-center">
                    <div class="flex-grow-1">
                        <app-estore-checkbox 
                            label="INTERNETshare">
                        </app-estore-checkbox>
                    </div>
                    <div>
                        RM10/monthly
                    </div>
                </div>
            </div><!-- /.col -->
        </div><!-- /.row -->
        <div class="row section-radio">
            <div class="col-md-6">
                <h4>Radio</h4>
                <mat-radio-group class="row form-group" aria-label="Select an option">
                    <div class="col-sm-6">
                        <mat-radio-button value="1">Standard Delivery</mat-radio-button>
                    </div>
                    <div class="col">
                        <mat-radio-button value="2">Premium Delivery</mat-radio-button>
                    </div>
                </mat-radio-group>
            </div>
        </div>
    </form>
    <pre>{{ myForm?.value | json }}</pre>
    `,
    styleUrls: ['./estore-input.stories.scss'],
    encapsulation: ViewEncapsulation.None,
})
class TestComponent {
    public myForm: FormGroup = null;

    public options: iSelectOptions[] = [
        {
            isNone: true,
            label: 'None'
        },
        {
            value: 'nric',
            label: 'ID Number'
        },
        {
            value: 'passport',
            label: 'Passport'
        },
    ];

    isSelected = false;

    supp_lines = [
        {
            selected: true,
            mobile_number: null,
        },
        {
            selected: false,
            mobile_number: null,
        },
        {
            selected: false,
            mobile_number: null,
        },
    ];

    constructor() {
        this.myForm = new FormGroup(
            {
                nric: new FormControl("", [
                    Validators.required,
                    Validators.pattern(/^\d{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])\d{6}$/)
                ]),
                phone: new FormControl("", [
                    Validators.required,
                    Validators.pattern(/^60\d{11,12}$/)
                ]),
                agree: new FormControl(false),
                id_type: new FormControl(false, [
                    Validators.required,
                ]),
                search: new FormControl("https://shop.celcom.com.mysjdksjdksjdksjdksjdksjdksjdkjsd", [
                    Validators.required,
                ]),
            }
        );
    }
}

storiesOf('Forms/estore-input', module).add('General', () => ({
    template: `
        <h3>Default</h3>
        <test-cmp></test-cmp>
    `,
    moduleMetadata: {
        declarations: [
            TestComponent,
            EstoreInputComponent,
            EstoreCheckboxComponent,
            DigitOnlyDirective,
        ],
        imports: [
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            MatIconModule,
            MatInputModule,
            MatSelectModule,
            MatRadioModule,
            HttpClientModule,
            MatCheckboxModule,
            IconModule,
        ],
    },
}),
    {
        knobs: {
            escapeHTML: false,
        }
    });

storiesOf('Forms/estore-input', module).add('Textarea', () => ({
    template: `
        <h3>Angular Material</h3>
        <div class="row">
            <div class="col-lg-4">
                <mat-form-field appearance="fill">
                    <mat-label>Textarea</mat-label>
                    <textarea placeholder="Test" matInput></textarea>
                </mat-form-field>
            </div>
        </div>
        <h3>EStore Input</h3>
        <div class="row">
            <div class="col-lg-4">
                <app-estore-input
                    customValidationLabel="Estore Input"
                    placeholder="Fill"
                    formControlName="search"
                    maxlength="4"
                    appearance="fill"
                    [iconName]="'search'"
                    [disabled]="true"
                    [buttonText]="'Submit'">
                </app-estore-input>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-4">
                <app-estore-input
                    customValidationLabel="Estore Input"
                    placeholder="Share your feedback here"
                    label="Your feedback"
                    [disabled]="true"
                    [inputType]="'textarea'"
                    appearance="fill">
                </app-estore-input>
            </div>
        </div>
    `,
    moduleMetadata: {
        declarations: [
            TestComponent,
            EstoreInputComponent,
            EstoreCheckboxComponent,
            DigitOnlyDirective,
        ],
        imports: [
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            MatIconModule,
            MatInputModule,
            MatSelectModule,
            MatRadioModule,
            HttpClientModule,
            MatCheckboxModule,
            IconModule,
        ],
    },
}),
    {
        knobs: {
            escapeHTML: false,
        }
    });
