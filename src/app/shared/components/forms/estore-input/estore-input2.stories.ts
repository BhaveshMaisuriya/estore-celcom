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
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'test-cmp',
    template: `
        <form [formGroup]="myForm" autocomplete="off">
            <h2>Input</h2>
            <div class="row">
                <div class="col-md-4" *ngFor="let state of formStates">
                    <h4>{{ state.label }} Fill</h4>
                    <app-estore-input 
                        label="NRIC Number"
                        [appearance]="'fill'"
                        [inputType]="'text'"
                        placeholder="12345678" 
                        formControlName="nric"
                        [success]="state.success"
                        [readonly]="state.readonly"
                        [disabled]="state.disabled" >
                    </app-estore-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4" *ngFor="let state of formStates">
                    <h4>{{ state.label }} Standard</h4>
                    <app-estore-input 
                        label="NRIC Number"
                        [appearance]="'standard'"
                        [inputType]="'nric'"
                        placeholder="12345678" 
                        formControlName="nric"
                        [success]="state.success"
                        [readonly]="state.readonly"
                        [disabled]="state.disabled" >
                    </app-estore-input>
                </div>
            </div>

            <h2>Input with button</h2>
            <div class="row">
                <div class="col-md-4" *ngFor="let state of formStates">
                    <h4>{{ state.label }}</h4>
                    <app-estore-input
                        customValidationLabel="Estore Input"
                        placeholder="NRIC Number"
                        formControlName="nric"
                        appearance="fill"
                        [inputType]="'nric'"
                        [iconName]="'estore-share'"
                        [iconType]="'svg'"
                        [iconStyle]="{'color': '#333'}"
                        [buttonText]="'Copy'"
                        [success]="state.success"
                        [readonly]="state.readonly"
                        [disabled]="state.disabled">
                    </app-estore-input>
                </div>
            </div>

            <h2>Select</h2>
            <div class="row">
                <div class="col-md-4" *ngFor="let state of formStates">
                    <h4>{{ state.label }} Fill</h4>
                    <app-estore-input 
                        label="ID Type"
                        [appearance]="'fill'"
                        [inputType]="'select'"
                        formControlName="id_type"
                        [options]="options"
                        [success]="state.success"
                        [readonly]="state.readonly"
                        [disabled]="state.disabled" >
                    </app-estore-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4" *ngFor="let state of formStates">
                    <h4>{{ state.label }} Standard</h4>
                    <app-estore-input 
                        label="ID Type"
                        [appearance]="'standard'"
                        [inputType]="'select'"
                        formControlName="id_type"
                        [options]="options"
                        [success]="state.success"
                        [readonly]="state.readonly"
                        [disabled]="state.disabled" >
                    </app-estore-input>
                </div>
            </div>

            <h2>Textarea</h2>
            <div class="row">
                <div class="col-md-4" *ngFor="let state of formStates">
                    <h4>{{ state.label }} Fill</h4>
                    <app-estore-input 
                        [appearance]="'fill'"
                        label="Your feedback"
                        placeholder="Share your feedback here"
                        [inputType]="'textarea'"
                        [inputType]="'select'"
                        formControlName="feedback"
                        [options]="options"
                        [success]="state.success"
                        [readonly]="state.readonly"
                        [disabled]="state.disabled" >
                    </app-estore-input>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4" *ngFor="let state of formStates">
                    <h4>{{ state.label }} Standard</h4>
                    <app-estore-input 
                        [appearance]="'standard'"
                        label="Your feedback"
                        placeholder="Share your feedback here"
                        [inputType]="'textarea'"
                        [inputType]="'select'"
                        formControlName="feedback"
                        [options]="options"
                        [success]="state.success"
                        [readonly]="state.readonly"
                        [disabled]="state.disabled" >
                    </app-estore-input>
                </div>
            </div>
        </form>
    `,
    styleUrls: ['./estore-input.stories.scss'],
    encapsulation: ViewEncapsulation.None,
})
class TestComponent {
    formStates = [
        {
            label: 'Normal',
            success: false,
            readonly: false,
            disabled: false,
        },
        {
            label: 'Readonly',
            success: false,
            readonly: true,
            disabled: false,
        },
        {
            label: 'Disabled',
            success: false,
            readonly: false,
            disabled: true,
        },
    ];
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
        {
            value: 'others',
            label: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex'
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
                agree: new FormControl(false),
                id_type: new FormControl(false, [
                    Validators.required,
                ]),
                feedback: new FormControl("", [
                    Validators.required,
                ]),
            }
        );
        this.myForm.valueChanges
        .pipe(
            debounceTime(200)
        )
        .subscribe(d => {
            this.myForm.setValue({...d});
        });
    }
}

storiesOf('Forms/estore-input', module).add('Field States', () => ({
    template: `
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
