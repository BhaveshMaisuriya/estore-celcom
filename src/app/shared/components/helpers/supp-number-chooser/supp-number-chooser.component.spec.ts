import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { materialModules } from 'app/shared/shared-module.module';
import { IconModule } from 'app/shared/icon.module';
import { sharedPipes } from 'app/shared/pipes';
import { sharedDirectives } from 'app/shared/directives';
import { SuppNumberChooserComponent } from './supp-number-chooser.component';
import { NumberChooserComponent } from '../../number-chooser/number-chooser.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { EstoreInputComponent } from "app/shared/components/forms/estore-input/estore-input.component";
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { FormsModule } from '@angular/forms';
import { NguCarouselModule } from '@ngu/carousel';

describe('SuppNumberChooserComponent', () => {
  let component: SuppNumberChooserComponent;
  let fixture: ComponentFixture<SuppNumberChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SuppNumberChooserComponent,
        NumberChooserComponent,
        PaginationComponent,
        EstoreInputComponent,
        PageLoaderComponent,
        sharedPipes,
        sharedDirectives,
      ],
      imports: [
        materialModules,
        IconModule,
        FormsModule,
        NguCarouselModule
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppNumberChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
