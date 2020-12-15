import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeofPurchaseWrapperComponent } from './typeof-purchase-wrapper.component';
import { NewLineWrapperComponent } from '../../plans/new-line-wrapper/new-line-wrapper.component';
import { CobpWrapperComponent } from '../../plans/cobp-wrapper/cobp-wrapper.component';
import { MnpWrapperComponent } from '../../mnp-wrapper/mnp-wrapper.component';
import { NumberChooserComponent } from '../../number-chooser/number-chooser.component';
import { SupplementaryLineWrapperComponent } from '../supplementary-line-wrapper/supplementary-line-wrapper.component';
import { McLoginComponent } from '../../mc-login/mc-login.component';
import { EstoreInputComponent } from '../../forms/estore-input/estore-input.component';
import { EstoreCheckboxComponent } from '../../forms/estore-checkbox/estore-checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOtpInputComponent } from '../../new-otp-input/new-otp-input.component';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { PaginationComponent } from '../../pagination/pagination.component';
import { ModalComponent } from '../../modal/modal.component';
import { NguCarouselModule } from '@ngu/carousel';
import { sharedDirectives } from 'app/shared/directives';
import { sharedPipes } from 'app/shared/pipes';
import { materialModules } from 'app/shared/shared-module.module';
import { CobpNumberChooserComponent } from '../../device-combo/cobp-number-chooser/cobp-number-chooser.component';
import { COBPInstructionsComponent } from '../../cobp-instructions/cobp-instructions.component';
import { SuppNumberChooserComponent } from '../../helpers/supp-number-chooser/supp-number-chooser.component';

describe('TypeofPurchaseWrapperComponent', () => {
  let component: TypeofPurchaseWrapperComponent;
  let fixture: ComponentFixture<TypeofPurchaseWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NguCarouselModule,
        materialModules
      ],
      declarations: [
        sharedDirectives,
        sharedPipes,
        TypeofPurchaseWrapperComponent,
        NewLineWrapperComponent,
        COBPInstructionsComponent,
        SuppNumberChooserComponent,
        CobpWrapperComponent,
        MnpWrapperComponent,
        NumberChooserComponent,
        SupplementaryLineWrapperComponent,
        McLoginComponent,
        EstoreInputComponent,
        EstoreCheckboxComponent,
        NewOtpInputComponent,
        PageLoaderComponent,
        PaginationComponent,
        ModalComponent,
        CobpNumberChooserComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeofPurchaseWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'selectedItem');
    fixture.detectChanges();
    component.onSelect.emit('test');
    component.selectedItem('test1');
    expect(component.selectedItem).toBeDefined();
    expect(component.selectedItem).toHaveBeenCalled();

    expect(component.onSelect.emit).toBeDefined();
  });

  it('should call ngOnInit', () => {
    spyOn(component, 'onComponentEvent');
    fixture.detectChanges();
    const iToPEvent = { 'test': 'test', 'data': 'data' };
    component.onComponentEvent({ 'test': 'test' }, { 'data': 'data' });

    expect(component.onComponentEvent).toBeDefined();
    expect(component.onComponentEvent).toHaveBeenCalled();

    expect(component.onEvent).toBeDefined();
  });

});
