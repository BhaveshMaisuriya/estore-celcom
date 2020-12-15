import { storiesOf } from '@storybook/angular';
import { boolean, text, withKnobs, object } from '@storybook/addon-knobs';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
import { ModalComponent } from '../modal/modal.component';
import { sharedPipes } from 'app/shared/pipes';
import { EstoreButtonMenuComponent } from './estore-button-menu.component';
import { iSelectOptions } from '../forms/estore-input/estore-input.component';
import { stringify } from 'querystring';

const items: iSelectOptions[] = [
    {
        label: 'Samsung A11',
        value: 'S001'
    },
    {
        label: 'SAMSUNG A01',
        value: 'S002'
    },
    {
        label: 'OPPO A12',
        value: 'O001'
    },
    {
        label: 'VIVO Y11',
        value: 'V001'
    },
];

storiesOf('Buttons', module).add('Menu', () => ({
    template: `
    <div class="row">
        <div class="col-12 col-md-3" *ngFor="let item of [0, 1, 2, 3]">
            <div style="border: 1px solid #ccc; border-radius: 8px; height: 200px; width: 100%; position: relative;">
                <app-estore-button-menu
                    [items]="items"
                    [selected]="selected"
                    [iconType]="iconType"
                    [iconName]="iconName"
                    [iconStyle]="iconStyle"
                    [rotateOnOpen]="rotateOnOpen"
                    style="position: absolute; right: 0; top: 0;"></app-estore-button-menu>
            </div>
        </div>
    </div>
    `,
    moduleMetadata: {
        declarations: [
            DigitOnlyDirective,
            ModalComponent,
            sharedPipes,
            EstoreButtonMenuComponent,
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
        iconType: text('Icon Type', 'svg'),
        iconName: text('Icon Name', 'estore-chevron-down'),
        iconStyle: object('Icon Style', {color: '#009BDF'}),
        rotateOnOpen: boolean('Rotate on Open', true),
        selected: text('Selected value', items[0].value),
        items: object('Menu items', items),
    },
}),
    {
        knobs: {
            escapeHTML: false,
        }
    });
