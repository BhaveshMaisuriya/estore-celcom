import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobpNumberChooserComponent } from './cobp-number-chooser.component';
import { materialModules } from 'app/shared/shared-module.module';
import { IconModule } from 'app/shared/icon.module';
import { sharedPipes } from 'app/shared/pipes';
import { sharedDirectives } from 'app/shared/directives';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SuppNumberChooserComponent } from '../../helpers/supp-number-chooser/supp-number-chooser.component';
import { NumberChooserComponent } from '../../number-chooser/number-chooser.component';

describe('CobpNumberChooserComponent', () => {
  let component: CobpNumberChooserComponent;
  let fixture: ComponentFixture<CobpNumberChooserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        CobpNumberChooserComponent,
        SuppNumberChooserComponent,
        NumberChooserComponent,
        sharedPipes,
        sharedDirectives,
      ],
      imports: [
        materialModules,
        IconModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobpNumberChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
