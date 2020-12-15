import { storiesOf } from '@storybook/angular';
import { number, withKnobs } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Subject } from 'rxjs';
import { NguCarouselModule } from '@ngu/carousel';
import { PaginationComponent } from './pagination.component';

storiesOf('Components', module).add('Pagination', () => {
    const totalPages = number('Total Page', 3);
    const currentPage = new Subject();
    currentPage.next(1);

    return {
      template: `
      <div>
        <app-pagination
          [currentPage]="(currentPage | async)"
          [totalPages]="totalPages"
          (onPageClick)="onPageClick($event)"
        ></app-pagination>
      </div>
    `,
      moduleMetadata: {
        declarations: [
          PaginationComponent
        ],
        imports: [
          NguCarouselModule,
        ],
      },
      decorators: [
        withKnobs
      ],
      props: {
        totalPages,
        currentPage,
        onPageClick: page => {
          currentPage.next(page);
          action(`Set Page`)(page);
        }
      },
    };
  },
  {
    knobs: {
      escapeHTML: false,
    }
  });
