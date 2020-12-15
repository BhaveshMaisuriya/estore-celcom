import { storiesOf } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { NguCarouselModule } from '@ngu/carousel';
import { DeviceCarouselComponent } from './device-carousel.component';

storiesOf('Components', module).add('Device carousel', () => {
    const deviceImages = ['https://shop.celcom.com.my/media/catalog/product/7/_/7_black_front_900x900.png',
                          'https://shop.celcom.com.my/media/catalog/product/9/0/900x900_9_37.png',
                          'https://shop.celcom.com.my/media/catalog/product/9/0/900x900_10_21.png',
                          'https://shop.celcom.com.my/media/catalog/product/7/p/7plus_black_front_900x900.png',
                          'https://shop.celcom.com.my/media/catalog/product/9/0/900x900_9_39.png',
                          'https://shop.celcom.com.my/media/catalog/product/9/0/900x900_10_23.png'
                        ];
    return {
      template: `
      <div>
        <app-device-carousel 
          [deviceImages]="deviceImages"
          >
        </app-device-carousel>
      </div>
    `,
      moduleMetadata: {
        declarations: [
          DeviceCarouselComponent
        ],
        imports: [
          NguCarouselModule,
        ],
      },
      decorators: [
        withKnobs
      ],
      props: {
        deviceImages
      },
    };
  },
  {
    knobs: {
      escapeHTML: false,
    }
  });
