import { storiesOf } from '@storybook/angular';
import { boolean, text, withKnobs, object } from '@storybook/addon-knobs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EstoreInputComponent } from 'app/shared/components/forms/estore-input/estore-input.component';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';

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
        <button class="btn btn-rounded" (click)="doConfirm()">Open modal</button>
        <br>Result:
        <pre>{{ result | json }}</pre>
        <br>
        <button class="btn btn-rounded" (click)="openModal()">Open error popup</button>
        
        
        <!-- No need to add this again. It's already in app.components.html -->
        <app-modal #confirmModal id="confirm-popup" position="center" [rounded]="true" [autoShow]="false" [closeBtn]="false">
            <ng-template let-close="close" let-message="message" let-title="title">
                <div class="container-fluid p-0 text-center">
                    <h2>{{ title }}</h2>
                    <!-- <p>Proceeding this action will reset all your previous selection.</p> -->
                    <div class="row">
                        <div class="col">
                            {{ message }}
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <button class="btn btn-rounded mr-2 mb-2" (click)="close(false, confirmModal)">Cancel</button>
                            <button class="btn btn-rounded btn-primary mb-2" (click)="close(true, confirmModal)">Proceed</button>
                        </div>
                    </div>
                    <!-- <div class="modal-footer">
                        <button class="btn btn-rounded mr-2" (click)="onDismiss()">Cancel</button>
                        <button class="btn btn-rounded btn-primary mr-2" (click)="onConfirm()">Proceed</button>
                    </div> -->
                </div>
            </ng-template>
        </app-modal>
        <app-modal #errorModal id="error-popup" position="center" [rounded]="true" [autoShow]="false" [closeBtn]="false">
            <ng-template let-close="close" let-message="message" let-title="title">
                <div class="container-fluid p-0 text-center">
                    <h2 *ngIf="title">{{ title }}</h2>
                    <div class="row">
                        <div class="col">
                            {{ message }}
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="col">
                            <button (click)="close(null, errorModal)" class="btn btn-primary btn-rounded">Close</button><!-- /.btn btn-primary btn-rouded -->
                        </div>
                    </div>
                </div>
            </ng-template>
        </app-modal>
    `,
})
class TestComponent {
    public myForm: FormGroup = null;
    result = null;

    constructor(
        private mdlService: ModalService,
    ) {
    }
    
    doSomething() {
        this.doSomethingCB(() => {
            console.log('Completed!')
        })
    }

    doSomethingCB(cb = null) {
        this.mdlService.open('mdl-confirm').subscribe(data => {
            console.log("Result", data);
            if (data) {
                this.result = 'Yes';
                if (cb) {
                    cb();
                }
            } else {
                this.result = 'No';
            }
        });
    }

    openModal() {
        this.mdlService.showError({
            message: ''
        });
    }

    doConfirm() {
        this.mdlService.showConfirm({title: 'Are you sure?', message: 'Proceeding this action will reset all your previous selection.'})
            .subscribe(data => {
                console.log("Result", data);
                this.result = data;
            });
    }
}

storiesOf('Modal/general', module).add('Confirmation Popup', () => ({
    template: `
        <h3>Default</h3>
        <test-cmp></test-cmp>
    `,
    moduleMetadata: {
        declarations: [
            TestComponent,
            ModalComponent,
        ],
        imports: [
        ],

    },
}),
    {
        knobs: {
            escapeHTML: false,
        }
    });
