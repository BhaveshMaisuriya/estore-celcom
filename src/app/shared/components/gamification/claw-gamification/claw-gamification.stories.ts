import { storiesOf } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ModalService } from '../../modal/modal.service';
import { ModalComponent } from '../../modal/modal.component';
import { ClawGamificationComponent } from './claw-gamification.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

storiesOf('Components', module).add('ClawGamification', () => {
    
    return {
      template: `
      <app-claw-gamification></app-claw-gamification>
      `,
      moduleMetadata: {
        declarations: [
          ClawGamificationComponent,
          ModalComponent
        ],
        imports: [
          BrowserAnimationsModule,
          HttpClientModule,
          RouterModule.forRoot([])
        ],
        providers: [
          ModalService,
          {provide: APP_BASE_HREF, useValue: '/'}
        ]
      },
      props: {
        
      },
    };
  }
);
