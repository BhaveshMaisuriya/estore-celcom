import { storiesOf } from '@storybook/angular';
import { IconModule } from 'app/shared/icon.module';
import { MatIconModule } from '@angular/material/icon';
import { boolean, text, withKnobs, object, select } from '@storybook/addon-knobs';
import { MoonDeviceCardComponent } from './moon-device-card.component';
import { iPlanDeviceBundle } from 'app/shared/models/device.model';
import { MatRippleModule } from '@angular/material/core';
import { DeviceColorStoragePickerComponent } from '../../device-color-storage-picker/device-color-storage-picker.component';

storiesOf('Components/moon', module).add('Moon Device Card', () => {
  const image = 'https://shop.celcom.com.my/media/catalog/product/h/t/httpsshopapi.celcom.com.mymediawysiwygproductsfront_1.png';
  const product: iPlanDeviceBundle = {
    "name": "HUAWEI Nova 5T",
    "sku": "Huawei-Nova-5T",
    "price": 0,
    "quntity": null,
    "order_monthly_pay": "108.00",
    "most_popular": "0",
    "rm": "0.00",
    "rrp_rm_strick_price": "1399.00",
    "main_image": "/media/catalog/product/p/u/purple-front_6.png",
    "sub_images": [
      "/media/catalog/product/p/u/purple-front_6.png"
    ],
    "dimension": null,
    "weight": null,
    "splash_water_dust_resistant": "0",
    "stock": "Limited Stock",
    "order_category": "HP",
    "order_model": "NOVA 5T",
    "order_brand": "HUAWEI",
    "segment": "10",
    "default_selected_color": "Purple",
    "default_selected_memory": "128GB",
    "stock_indicator_image": "/media/catalog/productno_selection",
    "stock_indicator_text": null,
    "default_device_option": "easyPhone",
    "associated_device_product": [
      {
        "name": "Huawei Nova 5T 128GB Purple",
        "sku": "HuaweiNova5T128GBPurple",
        "rrp": "1399.00",
        "discounted_device_rrp": "0.00",
        "color": "Purple",
        "memory": "128GB",
        "order_color": "PRP",
        "order_category": "HP",
        "color_hexa": "#b29db9",
        "image": "/media/catalog/product/p/u/purple-front.png",
        "desc": "24 months contract",
        "sub_images": [
          "/media/catalog/product/g/u/guna_celcom_free_label_platinum_1_2.png",
          "/media/catalog/product/p/u/purple-front.png",
          "/media/catalog/product/p/u/purple-back.png",
          "/media/catalog/product/p/u/purple_side-1.png"
        ],
        "order_model": "NOVA 5T",
        "part_number": "MDR10074",
        "product_type": "HP",
        "new_customer": "0",
        "segment": null,
        "contract": "24",
        "upfront_installment": null,
        "prices": {
          "upfront_price": "150",
          "device_price": "1228",
          "penalty_price": "350",
          "supplementary_count": 0,
          "special_price": 0
        }
      },
      {
        "name": "Huawei Nova 5T 128GB Blue",
        "sku": "HuaweiNova5T128GBBlue",
        "rrp": "1399.00",
        "discounted_device_rrp": "0.00",
        "color": "Blue",
        "memory": "128GB",
        "order_color": "BLU",
        "order_category": "HP",
        "color_hexa": "#48a5d0",
        "image": "/media/catalog/product/b/l/blue_front.png",
        "desc": "24 months contract",
        "sub_images": [
          "/media/catalog/product/g/u/guna_celcom_free_label_platinum_1_1.png",
          "/media/catalog/product/b/l/blue_front.png",
          "/media/catalog/product/b/l/blue_back.png",
          "/media/catalog/product/b/l/blue_side-1.png"
        ],
        "order_model": "NOVA 5T",
        "part_number": "MDR10074",
        "product_type": "HP",
        "new_customer": "0",
        "segment": null,
        "contract": "24",
        "upfront_installment": null,
        "prices": {
          "upfront_price": "150",
          "device_price": "1228",
          "penalty_price": "350",
          "supplementary_count": 0,
          "special_price": 0
        }
      },
      {
        "name": "Huawei Nova 5T 128GB Black",
        "sku": "HuaweiNova5T128GBBlack",
        "rrp": "1399.00",
        "discounted_device_rrp": "0.00",
        "color": "Black",
        "memory": "128GB",
        "order_color": "BLK",
        "order_category": "HP",
        "color_hexa": "#000000",
        "image": "/media/catalog/product/b/l/black-front.png",
        "desc": "24 months contract",
        "sub_images": [
          "/media/catalog/product/g/u/guna_celcom_free_label_platinum_2.png",
          "/media/catalog/product/b/l/black-front.png",
          "/media/catalog/product/b/l/black_back.png",
          "/media/catalog/product/b/l/black_side-2.png"
        ],
        "order_model": "NOVA 5T",
        "part_number": "MDR10074",
        "product_type": "HP",
        "new_customer": "0",
        "segment": null,
        "contract": "24",
        "upfront_installment": null,
        "prices": {
          "upfront_price": "150",
          "device_price": "1228",
          "penalty_price": "350",
          "supplementary_count": 0,
          "special_price": 0
        }
      }
    ]
  };
  const ap = product.associated_device_product;
  const availableVariants = ap.map(d => {
      return d.sku;
    });
  return {
    template: `
      <app-moon-device-card
        [image]="image"
        [selected]="selected"
        [product]="product"
        [isLoading]="isLoading"
        [isInStock]="isInStock"></app-moon-device-card>
    `,
    moduleMetadata: {
      declarations: [
        MoonDeviceCardComponent,
        DeviceColorStoragePickerComponent,
      ],
      imports: [
        MatIconModule,
        IconModule,
        MatRippleModule,
      ]
    },
    props: {
      selected: boolean('selected', false),
      isLoading: boolean('isLoading', false),
      isInStock: boolean('isInStock', false),
      image: text('Image', image),
      product: object('Product', product),
      availableVariants: select('Variant', availableVariants, availableVariants[1]),
      // selectedVariant: object('Selected Variant', selectedVariant),
    },
    decorators: [
      withKnobs
    ],
  };
}
);
