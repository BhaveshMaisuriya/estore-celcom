import { storiesOf } from '@storybook/angular';
import { IconModule } from 'app/shared/icon.module';
import { MatIconModule } from '@angular/material/icon';
import { boolean, text, withKnobs, object, select } from '@storybook/addon-knobs';
import { iPlanDeviceBundle } from 'app/shared/models/device.model';
import { MatRippleModule } from '@angular/material/core';
import { DeviceColorStoragePickerComponent } from '../../device-color-storage-picker/device-color-storage-picker.component';
import { MoonDeviceCardComponent } from '../moon-device-card/moon-device-card.component';
import { MoonDeviceCardWrapperComponent } from './moon-device-card-wrapper.component';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NguCarouselModule } from '@ngu/carousel';

storiesOf('Components/moon', module).add('Moon Device Card Wrapper', () => {
  const data = [
    {
      "name": "Huawei P20 Pro",
      "sku": "Huawei-P20-Pro",
      "price": 0,
      "quntity": null,
      "order_monthly_pay": "80.00",
      "most_popular": "0",
      "rm": "0.00",
      "rrp_rm_strick_price": "3112.00",
      "main_image": "\/media\/catalog\/product\/9\/0\/900x900_20.png",
      "sub_images": [
        "\/media\/catalog\/product\/9\/0\/900x900_20.png"
      ],
      "dimension": "155.0 x 73.9 x 7.8",
      "weight": 0,
      "splash_water_dust_resistant": "0",
      "stock": "Limited Stock",
      "order_category": "HP",
      "order_model": "P20 Pro",
      "order_brand": "HUAWEI",
      "segment": "10",
      "default_selected_color": "Aurora Blue",
      "default_selected_memory": "128GB",
      "stock_indicator_image": "\/media\/catalog\/product",
      "stock_indicator_text": "<p><strong>FREE* SAMSUNG GALAXY S10. LIMITED TIME OFFER.<\/strong>&nbsp;<\/p>\r\n<p>Switch to Celcom and sign up for Samsung Galaxy S10 with Celcom Mobile Platinum Plus Plan to enjoy the free device!<br \/>Offer valid from <strong>5 Apr to 15 Apr 2019<\/strong><br \/><span style=\"font-size: 11.0pt; font-family: 'Calibri',sans-serif;\">*Applicable for port in with subscription of Celcom Mobile Platinum Plus Plan only.<\/span><\/p>",
      "default_device_option": "easyPhone",
      "associated_device_product": [
        {
          "name": "Huawei P20 Pro Aurora Blue",
          "sku": "HuaweiP20ProBlu",
          "rrp": "1200.00",
          "discounted_device_rrp": "1200.00",
          "color": "Aurora Blue",
          "memory": "128GB",
          "order_color": "BLU",
          "order_category": "HP",
          "color_hexa": "#1fa4d5",
          "image": "\/media\/catalog\/product\/9\/0\/900x900_2_12.png",
          "desc": "24 months contract",
          "sub_images": [
            "\/media\/catalog\/product\/9\/0\/900x900_2_12.png",
            "\/media\/catalog\/product\/9\/0\/900x900_1_9.png",
            "\/media\/catalog\/product\/9\/0\/900x900_3_10.png"
          ],
          "order_model": "P20 PRO 128GB",
          "part_number": "MDR5668",
          "product_type": "HP",
          "new_customer": "0",
          "segment": null,
          "contract": "24",
          "upfront_installment": "1",
          "prices": []
        }
      ]
    },
    {
      "name": "Oppo F5",
      "sku": "Oppo-F5",
      "price": 0,
      "quntity": null,
      "order_monthly_pay": "50.00",
      "most_popular": "1",
      "rm": "448.00",
      "rrp_rm_strick_price": "1224.53",
      "main_image": "\/media\/catalog\/product\/f\/r\/front_1_7.png",
      "sub_images": [
        "\/media\/catalog\/product\/f\/r\/front_1_7.png"
      ],
      "dimension": "155.9 \u00d775.8 \u00d7 7.7mm ",
      "weight": "195.0000",
      "splash_water_dust_resistant": "0",
      "stock": "Limited Stock",
      "order_category": "HP",
      "order_model": " MT6763T",
      "order_brand": "OPPO",
      "segment": "10",
      "default_selected_color": "Gold",
      "default_selected_memory": "32GB",
      "stock_indicator_image": "\/media\/catalog\/product",
      "stock_indicator_text": null,
      "default_device_option": "easyPhone",
      "associated_device_product": [
        {
          "name": "Oppo F5 32GB Gold ",
          "sku": "oppf5gld32gb",
          "rrp": "1200.00",
          "discounted_device_rrp": "1200.00",
          "color": "Gold",
          "memory": "32GB",
          "order_color": "GLD",
          "order_category": "HP",
          "color_hexa": "#cdbeab",
          "image": "\/media\/catalog\/product\/f\/r\/front_1_6.png",
          "desc": "24 months contract",
          "sub_images": [
            "\/media\/catalog\/product\/f\/r\/front_1_6.png",
            "\/media\/catalog\/product\/9\/0\/900x900_5_2.png"
          ],
          "order_model": "F5",
          "part_number": "MDR5617",
          "product_type": "HP",
          "new_customer": "0",
          "segment": null,
          "contract": "24",
          "upfront_installment": "1",
          "prices": {
            "upfront_price": "350",
            "device_price": "0",
            "penalty_price": "",
            "supplementary_count": 0,
            "special_price": 0
          }
        },
        {
          "name": "Oppo F5 32GB Black",
          "sku": "oppf5b32gb",
          "rrp": "1200.00",
          "discounted_device_rrp": "1200.00",
          "color": "Black",
          "memory": "32GB",
          "order_color": "BLK",
          "order_category": "HP",
          "color_hexa": "#000000",
          "image": "\/media\/catalog\/product\/f\/r\/front_64.png",
          "desc": "24 months contract",
          "sub_images": [
            "\/media\/catalog\/product\/f\/r\/front_64.png",
            "\/media\/catalog\/product\/9\/0\/900x900_8.png"
          ],
          "order_model": "F5",
          "part_number": "MDR5617",
          "product_type": "HP",
          "new_customer": "0",
          "segment": null,
          "contract": "24",
          "upfront_installment": "1",
          "prices": {
            "upfront_price": "350",
            "device_price": "548",
            "penalty_price": "1000",
            "supplementary_count": 0,
            "special_price": 0
          }
        }
      ]
    },
    {
      "name": "Vivo V9",
      "sku": "Vivo-V9",
      "price": 0,
      "quntity": null,
      "order_monthly_pay": "80.00",
      "most_popular": "0",
      "rm": "0.00",
      "rrp_rm_strick_price": "1320.00",
      "main_image": "\/media\/catalog\/product\/9\/0\/900x900-black-front_1.png",
      "sub_images": [
        "\/media\/catalog\/product\/9\/0\/900x900-black-front_1.png"
      ],
      "dimension": "154.81 x 75.03 x 7.89",
      "weight": 0,
      "splash_water_dust_resistant": "0",
      "stock": "Limited Stock",
      "order_category": "HP",
      "order_model": "V9",
      "order_brand": "VIVO",
      "segment": "10",
      "default_selected_color": "Gold",
      "default_selected_memory": "64GB",
      "stock_indicator_image": "\/media\/catalog\/product",
      "stock_indicator_text": null,
      "default_device_option": "easyPhone",
      "associated_device_product": [
        {
          "name": "Vivo V9 64GB Gold",
          "sku": "VivoV964GBGold",
          "rrp": "1200.00",
          "discounted_device_rrp": "1200.00",
          "color": "Gold",
          "memory": "64GB",
          "order_color": "GLD",
          "order_category": "HP",
          "color_hexa": "#cdbeab",
          "image": "\/media\/catalog\/product\/9\/0\/900x900-gold-front.png",
          "desc": "24 months contract",
          "sub_images": [
            "\/media\/catalog\/product\/9\/0\/900x900-gold-front.png",
            "\/media\/catalog\/product\/9\/0\/900x900-gold-back.png",
            "\/media\/catalog\/product\/9\/0\/900x900-gold-side.png"
          ],
          "order_model": "V9",
          "part_number": "MDR5670",
          "product_type": "HP",
          "new_customer": "0",
          "segment": null,
          "contract": "24",
          "upfront_installment": "1",
          "prices": []
        },
        {
          "name": "Vivo V9 64GB Black",
          "sku": "VivoV964GBBlack",
          "rrp": "1200.00",
          "discounted_device_rrp": "1200.00",
          "color": "Black",
          "memory": "64GB",
          "order_color": "BLK",
          "order_category": "HP",
          "color_hexa": "#000000",
          "image": "\/media\/catalog\/product\/9\/0\/900x900-black-front.png",
          "desc": "24 months contract",
          "sub_images": [
            "\/media\/catalog\/product\/9\/0\/900x900-black-front.png",
            "\/media\/catalog\/product\/9\/0\/900x900-black-back.png",
            "\/media\/catalog\/product\/9\/0\/900x900-black-side.png"
          ],
          "order_model": "V9",
          "part_number": "MDR5670",
          "product_type": "HP",
          "new_customer": "0",
          "segment": null,
          "contract": "24",
          "upfront_installment": "1",
          "prices": []
        }
      ]
    }
  ];
  return {
    template: `
      <app-moon-device-card-wrapper
        [isLoading]="isLoading"
        [disabled]="isDisabled"
        [data]="data"
        [selectedSku]="selectedSku"
        ></app-moon-device-card-wrapper>
    `,
    moduleMetadata: {
      declarations: [
        MoonDeviceCardComponent,
        DeviceColorStoragePickerComponent,
        MoonDeviceCardWrapperComponent,
        PageLoaderComponent,
      ],
      imports: [
        MatIconModule,
        IconModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        NguCarouselModule,
      ]
    },
    props: {
      selectedSku: text('Selected Sku', ''),
      isLoading: boolean('isLoading', false),
      isDisabled: boolean('isDisabled', false),
      data: object('data', data),
      // selectedVariant: object('Selected Variant', selectedVariant),
    },
    decorators: [
      withKnobs
    ],
  };
}
);
