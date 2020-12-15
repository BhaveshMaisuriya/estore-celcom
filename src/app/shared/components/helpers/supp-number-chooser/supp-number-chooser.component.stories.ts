import { storiesOf, moduleMetadata, Story } from '@storybook/angular';
import { text, withKnobs, array, object } from '@storybook/addon-knobs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
import { sharedPipes } from 'app/shared/pipes';
import { NguCarouselModule } from '@ngu/carousel';
import { NumberChooserComponent } from '../../number-chooser/number-chooser.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { EstoreInputComponent } from '../../forms/estore-input/estore-input.component';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { SuppNumberChooserComponent } from './supp-number-chooser.component';

export default {
    title: 'Components/Helpers/Newline Supp Number Chooser',
    component: SuppNumberChooserComponent,
    decorators: [
        // The necessary modules for the component to work on Storybook
        moduleMetadata({
            declarations: [
                DigitOnlyDirective,
                sharedPipes,
                SuppNumberChooserComponent,
                NumberChooserComponent,
                PaginationComponent,
                EstoreInputComponent,
                PageLoaderComponent,
            ],
            imports: [
                BrowserAnimationsModule,
                FormsModule,
                ReactiveFormsModule,
                materialModules,
                IconModule,
                NguCarouselModule,
            ],
        }),
    ],
};

// This creates a Story for the component
const Template: Story<SuppNumberChooserComponent> = (args) => ({
    component: SuppNumberChooserComponent,
    props: args
});
export const Default = Template.bind({});
Default.args = {
    disabled: false,
    selected: ''
}
