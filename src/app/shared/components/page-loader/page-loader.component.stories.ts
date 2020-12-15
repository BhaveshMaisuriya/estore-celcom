import { storiesOf } from '@storybook/angular';
import { boolean, text, withKnobs, object } from '@storybook/addon-knobs';
import { PageLoaderComponent } from './page-loader.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

storiesOf('Components', module).add('Page Loader', () => ({
  template: `
    <div class="container-fluid">
      <h3>New (Default)</h3>
      <div class="row container-sb">
        <div class="col" style="background: #f3f3f3">
          <app-page-loader></app-page-loader>
        </div>
      </div>
      <h3>Legacy</h3>
      <div class="row container-sb">
        <div class="col" style="background: #f3f3f3">
          <app-page-loader type="legacy"></app-page-loader>
        </div>
      </div>
      <h3>Material</h3>
      <div class="row container-sb">
        <div class="col" style="background: #f3f3f3">
          <app-page-loader type="material"></app-page-loader>
        </div>
      </div>
    </div>
    `,
  styles: [
    `
    .container-sb {
      border: 1px dashed black;
      border-radius: 10px;
    }
        `
  ],
  decorators: [
    withKnobs
  ],
  props: {
  },
  moduleMetadata: {
    declarations: [
      PageLoaderComponent
    ],
    imports: [
      MatProgressSpinnerModule,
    ]
  },
}));
