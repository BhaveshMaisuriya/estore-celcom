import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { sharedPipes } from './pipes';
import { sharedComponents } from './components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sharedDirectives } from './directives';
import { WebpWrapperComponent } from './directives/webp/webp.directive';
import { RouterModule } from "@angular/router";
import { NguCarouselModule } from '@ngu/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

export const materialModules = [
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatCheckboxModule,
  MatSelectModule,
  MatRadioModule,
  MatButtonModule,
  MatExpansionModule,
  MatRippleModule,
  MatProgressSpinnerModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatTooltipModule,
];

@NgModule({
  declarations: [
    // Pipes
    sharedPipes,

    // Directives
    sharedDirectives,

    // Components
    sharedComponents,
  ],
  entryComponents: [
    WebpWrapperComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NguCarouselModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
    }),

    materialModules,
  ],
  exports: [
    // Pipes
    sharedPipes,

    // Directives
    sharedDirectives,

    // Components
    sharedComponents,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,

    materialModules,
  ]
})
export class SharedModule { }
