import { storiesOf } from '@storybook/angular';
import { withKnobs, object } from '@storybook/addon-knobs';
import { OmniBannerComponent } from './omni-banner.component';
import { SafeHtmlPipe } from 'app/shared/pipes/safe-html.pipe';

storiesOf('Components', module).add('Omni Banner', () => {
  const data = {
    "device_sku": "Huawei-P20",
    "device_partnumber": null,
    "offer_category": "COBP",
    "offer_desc": "COBPPass",
    "device_retail_price": "0",
    "device_disc_amt": "0",
    "device_bundle_price": "0",
    "plan_sku": "Ultra-Base",
    "pass_sku": "Ultra-GB-L-Pass",
    "rebate_id": "1006548",
    "rebate_amount": "5",
    "rebate_frequency": "6",
    "upfront_payment": false,
    "banner_info": {
      "promotion_text_banner": `<div style="background: #c40d42;">
      <div>
          <small style="font-size: 14px;">Get</small>
          Free Device
      </div>
      <div style="margin-top: 4px; font-size: 12px;">
          Save RM499.00
      </div>
  </div>`,
    },
    "campaign_title": "Your Exclusive Device Offer!",
    "autobill": "1",
    "campaign_desc": "Want to own a new iPhone 11 at a lower price? Just contract your current plan for 24 months and the phone is yours! Don’t miss out offer valid till  07/07/20 only",
    "status": "1"
  };
  return {
    template: `
      <app-omni-banner [data]="omni"></app-omni-banner>
    `,
    moduleMetadata: {
      declarations: [
        SafeHtmlPipe,
        OmniBannerComponent,
      ],
      imports: [
      ]
    },
    props: {
      omni: object('Data', data),
    },
    decorators: [
      withKnobs
    ],
  };
},
  {
    knobs: {
      escapeHTML: false,
    }
  }
);
