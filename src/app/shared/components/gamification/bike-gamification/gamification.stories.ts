import { storiesOf } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamificationComponent } from './gamification.component';

import { ModalService } from '../../modal/modal.service';
import { ModalComponent } from '../../modal/modal.component';

storiesOf('Components', module).add('Gamification', () => {
    
    return {
      template: `
      <app-gamification></app-gamification>
      `,
      moduleMetadata: {
        declarations: [
          GamificationComponent,
          ModalComponent
        ],
        imports: [
          BrowserAnimationsModule
        ],
        providers: [
          ModalService
        ]
      },
      props: {
        
      },
    };
  }
);
