import { storiesOf } from '@storybook/angular';
import { PlanCardComponent } from 'app/shared/components/plan-card/plan-card.component';
import { SafeHtmlPipe } from 'app/shared/pipes/safe-html.pipe';
import { boolean, text, withKnobs, object } from '@storybook/addon-knobs';
import { MatIconModule } from '@angular/material/icon';
import { AddonPlanWrapperComponent, iAddonPlanToDisplay } from './addon-plan-wrapper.component';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { MatRippleModule } from '@angular/material/core';
import { IconModule } from 'app/shared/icon.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const unlimited: iAddonPlanToDisplay[] = [
    {
        sku: 'test1',
        title: 'Unlimited L',
        price: '+RM100',
        offers: null,
        device_price: '1456',
        // badge: {
        //     "promotion_badge_text": "Online Exclusive",
        //     "promotion_badge_text_color": "#ffffff",
        //     "promotion_badge_background_color": "#c40d42"
        // },
        // promotion_text: "Get 50% off for 3 months<br> (including base plan)*",
    },
    {
        sku: 'test2',
        title: 'Unlimited M',
        price: '+RM100',
        offers: null,
        device_price: '1456',
    }
];
const lightning: iAddonPlanToDisplay[] = [
    {
        sku: 'test1',
        title: 'Lightning L',
        price: 'RM100',
        offers: null,
        device_price: '1456',
        // badge: {
        //     "promotion_badge_text": "Online Exclusive",
        //     "promotion_badge_text_color": "#ffffff",
        //     "promotion_badge_background_color": "#c40d42"
        // },
        // promotion_text: "Get 50% off for 3 months<br> (including base plan)*",
    },
    {
        sku: 'test2',
        title: 'Lightning M',
        price: 'RM100',
        offers: null,
        device_price: '1456',
    }
];
const easyphone: iAddonPlanToDisplay[] = [
    {
        sku: 'test1',
        title: 'Lightning L',
        price: 'RM99',
        offers: null,
        easyphone_data: {
            base_label: 'Mega&trade;',
            base_price: 80,
            pass_price: 68,
            phone_price: 99,
        }
    },
    {
        sku: 'test2',
        title: 'Lightning M',
        price: 'RM130',
        offers: null,
        easyphone_data: {
            base_label: 'Mega&trade;',
            base_price: 80,
            pass_price: 18,
            phone_price: 130,
        }
    }
];

storiesOf('Plans/plan-card-component', module).add('Addon Wrapper', () => ({
    template: `
    <div class="container-fluid">
        <div class="row my-2">
            <div class="col">
                <h1>Unlimited</h1>
                <app-addon-plan-wrapper
                    [isLoading]="false"
                    [plans]="unlimited"
                    [selectedSku]="'test1'"
                    cardType="device"
                ></app-addon-plan-wrapper>
            </div>
        </div>
        <div class="row my-2">
            <div class="col">
                <h1>Lightning</h1>
                <app-addon-plan-wrapper
                    [isLoading]="false"
                    [customPrice]="true"
                    [plans]="lightning"
                    [selectedSku]="'test2'"
                    cardType="device"
                ></app-addon-plan-wrapper>
            </div>
        </div>
        <div class="row my-2">
            <div class="col">
                <h1>EasyPhone</h1>
                <app-addon-plan-wrapper
                    [isLoading]="false"
                    [customPrice]="true"
                    [priceLabel]="'Own phone at '"
                    [plans]="easyphone"
                    [selectedSku]="'test1'"
                    cardType="easyphone"
                ></app-addon-plan-wrapper>
            </div>
        </div>
    </div>
    `,
    styles: [
        `
        `
    ],
    decorators: [
        withKnobs
    ],
    props: {
        unlimited: object('unlimited', unlimited),
        lightning: object('lightning', lightning),
        easyphone: object('easyphone', easyphone),
    },
    moduleMetadata: {
      declarations: [
        AddonPlanWrapperComponent, 
        PlanCardComponent, 
        SafeHtmlPipe,
        PageLoaderComponent,
      ],
      imports: [
          MatIconModule,
          MatRippleModule,
          MatProgressSpinnerModule,
          IconModule,
      ],
    },
}),
{
    knobs: {
        escapeHTML: false,
      }
});
