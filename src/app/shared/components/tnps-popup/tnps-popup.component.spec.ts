import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TnpsPopupComponent } from './tnps-popup.component';
import { materialModules } from 'app/shared/shared-module.module';
import { sharedPipes } from 'app/shared/pipes';
import { sharedDirectives } from 'app/shared/directives';
import { ModalComponent } from '../modal/modal.component';
import { EstoreInputComponent } from '../forms/estore-input/estore-input.component';
import { PageLoaderComponent } from '../page-loader/page-loader.component';
import { EstoreButtonMenuComponent } from '../estore-button-menu/estore-button-menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from 'app/shared/icon.module';

describe('TnpsPopupComponent', () => {
  let component: TnpsPopupComponent;
  let fixture: ComponentFixture<TnpsPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        materialModules,
        IconModule,
      ],
      declarations: [
        sharedPipes,
        sharedDirectives,
        TnpsPopupComponent,
        ModalComponent,
        EstoreInputComponent,
        PageLoaderComponent,
        EstoreButtonMenuComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TnpsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
