import { storiesOf } from '@storybook/angular';
import { boolean, text, withKnobs, object } from '@storybook/addon-knobs';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewEncapsulation, Input, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
import { TnpsPopupComponent, ITNPSSurveyItem } from './tnps-popup.component';
import { ModalComponent } from '../modal/modal.component';
import { sharedPipes } from 'app/shared/pipes';
import { EstoreInputComponent } from '../forms/estore-input/estore-input.component';
import { PageLoaderComponent } from '../page-loader/page-loader.component';
import { EstoreButtonMenuComponent } from '../estore-button-menu/estore-button-menu.component';
import { ModalService } from '../modal/modal.service';

const settings: ITNPSSurveyItem[] = [
    {
      "id":1,
      "title":"Show us some love!",
      "question":"How easy was it for you to buy through Celcom Online Shop?",
      "hint":"Kindly rate from a scale of 0 (very unlikely) to 10 (very likely)",
      "min_value":0,
      "max_value":10,
      "max_low_value":6,
      "min_high_value":8,
      "value":null,
      "positive_message":"That’s great! What is the reason for your rating?",
      "negative_message":"We’re sorry to hear that. What is the reason for your rating?",
      "positive_reasons":[
        "Product offerings",
        "Product price"
      ],
      "negative_reasons":[
        "Product price",
        "Network coverage",
        "Others"
      ]
    },
    {
      "id":2,
      "question":"Based on this online purchase experience, how likely are you to recommend Celcom to your friends and family?",
      "hint":"Kindly rate from a scale of 0 (very unlikely) to 10 (very likely)",
      "min_value":0,
      "max_value":10,
      "max_low_value":6,
      "min_high_value":8,
      "value":null,
      "is_main_survey":true,
      "positive_message":"That’s great! What is the reason for your rating?",
      "negative_message":"We’re sorry to hear that. What is the reason for your rating?",
      "positive_reasons":[
        "Product offerings",
        "Product price"
      ],
      "negative_reasons":[
        "Product price",
        "Network coverage",
        "Others"
      ]
    }
  ];

  @Component({
    selector: 'test-cmp',
    styles: [
        `
        h2 {
            font-size: 24px;
            font-weight: bold;
        }
        .modal-footer {
            display: flex;
            justify-content: center;
        }
        `
    ],
    template: `
        <button class="btn btn-rounded" (click)="onBtnClick()">Open tNPS</button>
        <app-tnps-popup [autoShow]="false" [surveys]="settings" [isLoading]="isLoading"></app-tnps-popup>

        <app-modal #confirmModal id="confirm-popup" position="center" [rounded]="true" [autoShow]="false" [closeBtn]="false">
            <ng-template let-close="close" let-message="message" let-title="title" let-btcancel="btnCancel" let-btconfirm="btnConfirm">
                <div class="container-fluid p-0 text-center popup-body">
                    <h5>{{ title }}</h5>
                    <div class="row error-msg mb-estore-2">
                        <div class="col" [innerHTML]="message | safeHtml">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button class="btn btn-rounded mr-4 mb-2" (click)="close(false, confirmModal)">{{ btcancel || 'Cancel' }}</button>
                            <button class="btn btn-rounded btn-primary mb-2" (click)="close(true, confirmModal)">{{ btconfirm || 'Proceed' }}</button>
                        </div>
                    </div>
                </div>
            </ng-template>
        </app-modal>
        <app-modal #errorModal id="error-popup" position="center" [rounded]="true" [autoShow]="false" [closeBtn]="false">
            <ng-template let-close="close" let-message="message" let-title="title">
                <div class="container-fluid p-0 text-center popup-body">
                    <h5 *ngIf="title">{{ title }}</h5>
                    <div class="row error-msg mb-estore-2">
                        <div class="col">
                            {{ message }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button (click)="close(null, errorModal)" class="btn btn-primary btn-rounded">Close</button>
                        </div>
                    </div>
                </div>
            </ng-template>
        </app-modal>
    `,
})
class TestComponent implements OnInit {
  
  @Input() isLoading;
  @Input() settings;

    constructor(
        private mdlService: ModalService,
    ) {
    }

    ngOnInit(): void {
      
    }
    
    onBtnClick() {
      this.mdlService.open('estore-tnps-popup');
    }
}

storiesOf('TNPS', module).add('General', () => ({
  template: `
        <test-cmp [isLoading]="isLoading" [settings]="settings"></test-cmp>
    `,
  moduleMetadata: {
    declarations: [
      TnpsPopupComponent,
      DigitOnlyDirective,
      ModalComponent,
      sharedPipes,
      EstoreInputComponent,
      PageLoaderComponent,
      EstoreButtonMenuComponent,
      TestComponent,
    ],
    imports: [
      BrowserAnimationsModule,
      FormsModule,
      ReactiveFormsModule,
      materialModules,
      IconModule,
    ],
  },
  decorators: [
    withKnobs
  ],
  props: {
    isLoading: boolean('isLoading', false),
    settings: object('Settings', settings),
  },
}),
  {
    knobs: {
      escapeHTML: false,
    }
  });
