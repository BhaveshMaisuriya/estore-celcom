import { storiesOf } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { DeviceDetailSpecsComponent } from './device-detail-specs.component';

storiesOf('Components', module).add('Features & Specs', () => {
    const deviceDetailResponse = {
      'more_details': {
        'features': 'Fingerprint (front-mounted), accelerometer, gyro, proximity, compass, barometer',
        'shipping_details': 'Test shipping details',
        'specification': {
          'camera': 'Front 7MP / Rear 12MP',
          'display': '4.7'
        },
        'whatInTheBox': 'Phone <br> EarPods with Lightning Connector <br> Lightning to 3.5mm Headphone Jack Adapter <br> Lightning to USB Cable'
      },
      'terms_and_condition': {
        'cancellation': {
          'label': 'Cancellation',
          'desc': 'Test cancellation policy'
        },
        'contract_terms': {
          'label': 'Contract Duration',
          'desc': '24 months contract'
        },
        'legal': {
          'label': 'Legal',
          'desc': 'Test Legal policy'
        },
        'plans': {
          'label': 'Plans',
          'desc': 'Test Plan policy'
        }
      }
    }
    let isOpen = false;
    return {
      template: `
      <button class="btn btn-primary" (click)="isOpen = !isOpen">More details</button>
      <app-device-detail-specs *ngIf="isOpen"
        [deviceDetail]="deviceDetailResponse"
      >
      </app-device-detail-specs>
    `,
      moduleMetadata: {
        declarations: [
          DeviceDetailSpecsComponent
        ],
        imports: [
          MatExpansionModule,
          BrowserAnimationsModule
        ],
      },
      props: {
        deviceDetailResponse
      },
    };
  }
);
