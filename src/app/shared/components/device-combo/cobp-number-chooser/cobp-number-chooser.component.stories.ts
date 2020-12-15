import { storiesOf } from '@storybook/angular';
import { text, withKnobs, array, object, boolean } from '@storybook/addon-knobs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
import { sharedPipes } from 'app/shared/pipes';
import { CobpNumberChooserComponent } from './cobp-number-chooser.component';
import { NumberChooserComponent } from '../../number-chooser/number-chooser.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { EstoreInputComponent } from '../../forms/estore-input/estore-input.component';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { NguCarouselModule } from '@ngu/carousel';
import { SuppNumberChooserComponent } from '../../helpers/supp-number-chooser/supp-number-chooser.component';


storiesOf('Components/Device Combo', module).add('COBP Number Chooser', () => ({
    template: `
    <div class="row">
        <div class="col">
            <app-cobp-number-chooser
                [principalNumber]="'0111'"
                [suppNumbers]="suppNumbers"
                [deviceComboNumber]="selected"
                [contract_name]="'Phone + Phone'"
                [supplementaryData]="supplementaryData"
                [isNewLine]="isNewLine"
            ></app-cobp-number-chooser>
        </div>
    </div>
    `,
    moduleMetadata: {
        declarations: [
            DigitOnlyDirective,
            sharedPipes,
            CobpNumberChooserComponent,
            NumberChooserComponent,
            PaginationComponent,
            EstoreInputComponent,
            PageLoaderComponent,
            SuppNumberChooserComponent,
        ],
        imports: [
            BrowserAnimationsModule,
            FormsModule,
            ReactiveFormsModule,
            materialModules,
            IconModule,
            NguCarouselModule,
        ],
    },
    decorators: [
        withKnobs
    ],
    props: {
        suppNumbers: array('Supplimentary Numbers', [
            '0191234568',
            '0191234569',
            '0191234578',
        ]),
        selected: text('Selected Number', '0191234568'),
        supplementaryData: object('supplementaryData', {
            "name": "Family Line",
            "max_line": "3",
            "part_number": "PB19092",
            "price": "40.0000",
            "offer": "30GB internet and unlimited calls"
        }),
        isNewLine: boolean('isNewLine', true),
    },
}),
    {
        knobs: {
            escapeHTML: false,
        }
    });
