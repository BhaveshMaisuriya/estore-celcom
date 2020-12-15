import { storiesOf } from '@storybook/angular';
import { IconModule } from 'app/shared/icon.module';
import { MatIconModule } from '@angular/material/icon';
import { withKnobs, object } from '@storybook/addon-knobs';
import { COBPInstructionsComponent } from './cobp-instructions.component';


const cobpInstructions: any = {
  "title": "To be eligible, here are the steps you may follow:",
  "steps": [
    {
      "image": "",
      "description": "Click here to change your current principal plan to Mega plan.",
      "cta_button": {
        "label": "Change Plan",
        "action": "https://shop.celcom.com.my/plans/mega"
      },
    },
    {
      "image": "",
      "description": "Once you have changed to Mega plan, visit this page again to subscribe for Phone + Accessory Device Combo."
    },
  ]
};

storiesOf('Components', module).add('Elgibility Steps', () => {
  return {
    template: `
      <app-cobp-instructions [data]="cobpInstructions"></app-cobp-instructions>
    `,
    moduleMetadata: {
      declarations: [
        COBPInstructionsComponent
      ],
      imports: [
        MatIconModule,
        IconModule,
      ]
    },
    props: {
      cobpInstructions: object('cobpInstructions', cobpInstructions),
    },
    decorators: [
      withKnobs
    ],
  };
}
);
