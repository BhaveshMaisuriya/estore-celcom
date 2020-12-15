import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectDeliveryMethodComponent } from './select-delivery-method.component';
import { DeviceDataService } from '../../../../Service/devicedata.service';
import { MignightDeliveryComponent } from '../mignight-delivery/mignight-delivery.component';
import { StandardDeliveryComponent } from '../standard-delivery/standard-delivery.component';
import { NotificationErrorComponent } from '../../../widget/notification-error/notification-error.component';
import { ChooseAddressComponent } from '../choose-address/choose-address.component';
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { FormsModule } from '@angular/forms';
import { SessionTimeOutPopupComponent } from '../../../widget/session-timeout-popup/session-timeout-popup';
import { UserService } from 'app/Service/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';
import { materialModules } from 'app/shared/shared-module.module';

describe('SelectDeliveryMethodComponent', () => {
  let component: SelectDeliveryMethodComponent;
  let fixture: ComponentFixture<SelectDeliveryMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectDeliveryMethodComponent , SessionTimeOutPopupComponent , PageLoaderComponent
      , ChooseAddressComponent , MignightDeliveryComponent , StandardDeliveryComponent , NotificationErrorComponent, SafeHtmlPipe] ,
      imports: [ FormsModule,
        HttpClientTestingModule,
        materialModules,
      ],
      providers: [ 
        DeviceDataService,
        UserService,
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SelectDeliveryMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
}));

  it('selectdeliverymethodcomponent created', () => {
    expect(component).toBeTruthy();
  });

  it('viewMode has to be defined' , () => {
    expect(component.viewMode).toBeDefined();
  });

  it('check variables in viewMode() ', () => {
    component.viewMode(component.billingAddress);
    if (component.billingAddress === 'standardDelivery') {
    expect(component.standardDelivery).toBe(false);
    expect(component.midnightDelivery).toBe(true);
    if (component.billingAddress === 'midnightDelivery') {
      expect(component.standardDelivery).toBe(false);
      expect(component.midnightDelivery).toBe(true);
      }
    }
  });

  it('sessionInvalidChange has to be defined and variable boolean check' , () => {
    expect(component.sessionInvalidChange).toBeDefined();
    component.sessionInvalidChange(component.billingAddress);
    if (component.billingAddress) {
      expect(component.sessionInvalid).toBe(true);
    }
  });

  it('errorToDisplay has to be defined and variable boolean check' , () => {
    expect(component.errorToDisplay).toBeDefined();
    component.errorToDisplay(component.billingAddress);
    expect(component.showErrorNoticification).toBe(true);
  });

  it('Error Notification should contain specified color' , () => {
  component.errorToDisplay(component.billingAddress);
  expect(component.errorNotification.color).toContain('#b94063');
  });

  // The elements removed from component
  // it('should contain delivery image when delivery is "standard"' , () => {
  //   if (component.standardDelivery === false) {
  //     const element = fixture.debugElement.nativeElement;
  //     expect(element.querySelector('li.tab-slider--trigger > img').src).toContain('./assets/img/delivery.svg');
  //   }
  // });

  // it('should contain delivery image when standard delivery "Midnight"' , () => {
  //   if (component.showMidnightDelivery === true) {
  //         const elements = fixture.debugElement.nativeElement;
  //         expect(elements.querySelector('li.tab-slider--trigger > img').src).toContain('./assets/img/delivery_blue.svg');
  //   }
  // });

});

