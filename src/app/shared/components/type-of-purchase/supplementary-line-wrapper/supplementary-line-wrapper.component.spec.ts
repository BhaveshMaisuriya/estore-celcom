import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplementaryLineWrapperComponent } from './supplementary-line-wrapper.component';
import { EstoreInputComponent } from '../../forms/estore-input/estore-input.component';
import { EstoreCheckboxComponent } from '../../forms/estore-checkbox/estore-checkbox.component';
import { NumberChooserComponent } from '../../number-chooser/number-chooser.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { PaginationComponent } from '../../pagination/pagination.component';
import { PageLoaderComponent } from '../../page-loader/page-loader.component';
import { NguCarouselModule } from '@ngu/carousel';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeviceDetailsNumberService } from 'app/Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { iSupplementary } from 'app/shared/models/device.model';
import { sharedDirectives } from 'app/shared/directives';
import { sharedPipes } from 'app/shared/pipes';
import { materialModules } from 'app/shared/shared-module.module';

const data: iSupplementary = {
  planPhoneNumber: "0182917929",
    planPrice: "400",
    planType: "test",
    partNumber: "123",
    isVerified: true,
    isDisabled: false,
    number: "123"
}

describe('SupplementaryLineWrapperComponent', () => {
  let component: SupplementaryLineWrapperComponent;
  let fixture: ComponentFixture<SupplementaryLineWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        ReactiveFormsModule,
        NguCarouselModule,
        materialModules,
        HttpClientTestingModule
      ],
      declarations: [ 
        SupplementaryLineWrapperComponent, 
        EstoreInputComponent, 
        EstoreCheckboxComponent, 
        NumberChooserComponent, 
        PaginationComponent, 
        PageLoaderComponent, 
        sharedPipes,
        sharedDirectives
      ],
      providers: [DeviceDetailsNumberService, DeviceDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplementaryLineWrapperComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      '0182917929_Add Line': new FormControl()
   });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onSubmit', () => {
    spyOn(component.onSubmit,"emit");
    component.submitSuppLine(data);
    fixture.detectChanges();
    expect(component.onSubmit.emit).not.toHaveBeenCalled();
  });
  
  it('should emit onChoose', () => {
    spyOn(component.onChoose,"emit");
    component.chooseSuppLine(data,1234);
    fixture.detectChanges();
    expect(component.onChoose.emit).not.toHaveBeenCalled();
  });
  
  it('should emit onRemove', () => {
    spyOn(component.onRemove,"emit");
    component.removeSuppLine(data);
    fixture.detectChanges();
    expect(component.onRemove.emit).not.toHaveBeenCalled();
  });

  it('should emit shareQuota', () => {
    spyOn(component.shareQuota,"emit");
    component.updateShareQuota();
    fixture.detectChanges();
    expect(component.shareQuota.emit).not.toHaveBeenCalled();
  });

  it('should call checkControlErrors', () => {
    
    component.checkControlErrors('0182917929_Add Line','required');
    fixture.detectChanges();
    expect(component.form.controls['0182917929_Add Line'].touched).toBeFalse();
  });
});
