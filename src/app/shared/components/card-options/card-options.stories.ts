import { storiesOf } from '@storybook/angular';
import { CardOptionsComponent } from './card-options.component';
import { IconModule } from 'app/shared/icon.module';
import { MatIconModule } from '@angular/material/icon';
import { boolean, text, withKnobs, object } from '@storybook/addon-knobs';
import { ICardOptions } from 'app/shared/models/general.model';
import { sharedPipes } from 'app/shared/pipes';


const availableComboDevices: ICardOptions[] = [
  {
    image: 'https://estore-03.celcom.com.my/media/catalog/product/p/r/product-images_shining-white_front_900x900.png',
    label: 'Samsung Galaxy S10+',
    value: 'D01'
  },
  {
    image: 'https://estore-03.celcom.com.my/media/catalog/product/p/r/product-images_shining-white_front_900x900.png',
    label: 'Samsung Galaxy S10+',
    value: 'D02'
  },
  {
    image: 'https://estore-03.celcom.com.my/media/catalog/product/p/r/product-images_shining-white_front_900x900.png',
    label: 'Oppo A12',
    value: 'D03'
  },
  {
    image: 'https://estore-03.celcom.com.my/media/catalog/product/p/r/product-images_shining-white_front_900x900.png',
    label: 'Vivo Y11',
    value: 'D04'
  },
];

storiesOf('Components', module).add('Card options', () => {
    const deviceBuyOptions = [
      {
        'label': 'Easyphone',
        'value': 'easyPhone'
      }, {
        'label': 'Device Bundle',
        'value': 'deviceBundle'
      }, {
        'label': 'Device Only',
        'value': 'deviceOnly'
      }
    ];
    const selectedOption = "easyPhone";
    return {
      template: `
        <app-card-options 
            [isLoading]="isLoading"
            [options] = "deviceBuyOptions"
            [selectedOption] = "selectedOption"
            (onSelect)="selectedDeviceBuyOption($event)"
        >
        </app-card-options>
        <div class="mt-estore-1">
          <h4>Device</h4>
          <app-card-options
            [isLoading]="false"
            [disabled]="false"
            [isDeviceCard]="true"
            [options]="availableComboDevices"
            [selectedOption]="'D02'"
          >
          </app-card-options>
        </div>
    `,
      moduleMetadata: {
        declarations: [
          CardOptionsComponent,
          sharedPipes,
        ],
        imports: [
          MatIconModule,
          IconModule,
        ]
      },
      props: {
        isLoading: boolean('isLoading', false),
        deviceBuyOptions: object('Options', deviceBuyOptions),
        selectedOption: text('Selected', selectedOption),
        availableComboDevices: object('availableComboDevices', availableComboDevices),
      },
      decorators: [
          withKnobs
      ],
    };
  }
);
