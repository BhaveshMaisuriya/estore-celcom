import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailRetrievalComponent } from './email-retrieval.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from "../../../Service/app.service";
import { AppMockService } from '../../../Service/appmock.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { NotificationComponent } from '../../../Widget/notification/notification.component';
import { NoteSectionComponent } from '../../dumb-components/note-section/note-section.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserService } from 'app/Service/user.service';
import { CommonUtilService } from 'app/Service/commonUtil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
//const _ = require('underscore');

describe('EmailRetrievalComponent', () => {
  let component: EmailRetrievalComponent;
  let fixture: ComponentFixture<EmailRetrievalComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [EmailRetrievalComponent],
      providers: [
        HttpClient,
        { provide: AppService, useClass: AppMockService }, DeviceDataService,
        UserService,
        CommonUtilService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EmailRetrievalComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [{ provide: AppService, useClass: AppMockService }, DeviceDataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmailRetrievalComponent,
        NotificationComponent, NoteSectionComponent],
      imports: [FormsModule],
      providers: [AppService, HttpClient, HttpHandler, DeviceDataService]
    }).compileComponents();
    fixture = TestBed.createComponent(EmailRetrievalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should check the object data', () => {
    const updateInformation = {
      salutation: '',
      email: '',
      typedEmail: '',
      validate: false
    };
    expect(updateInformation).toEqual(jasmine.objectContaining({
      salutation: '',
      email: '',
      typedEmail: '',
      validate: false
    }));
  });
  it('should check the object', () => {
    //xpect(_.has(component, 'errorMessage')).toBeTruthy();
    expect(typeof component.updateInformation).toEqual('object');
    expect(typeof component.errorMessage).toEqual('object');
    expect(typeof component.invalidSalutation && typeof component.emailRetrieval).toEqual('boolean');
  });
  it('should render "Some Text" tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.email-retrieve-header').textContent)
      .toContain('The following information is missing. Please update to proceed.');
  });

  it('email-retrieval should create', () => {
    expect(component).toBeTruthy();
  });

  it("matches objects with the expected key/value pairs", () => {
    const errorMessage = {
      requiredMessage: 'Please enter email address',
      patternMessage: 'Please enter a valid email address',
      emailMismatch: 'Email and confirm Email do not match',
      salutationMissing: 'Please select salutation'
    };
    expect(errorMessage).toEqual(jasmine.objectContaining({
      requiredMessage: 'Please enter email address',
      patternMessage: 'Please enter a valid email address',
      emailMismatch: 'Email and confirm Email do not match',
      salutationMissing: 'Please select salutation'
    }));
  });

  it('must contain key value pairs', () => {
    expect(component.errorMessage).toEqual({
      requiredMessage: 'Please enter email address',
      patternMessage: 'Please enter a valid email address',
      emailMismatch: 'Email and confirm Email do not match',
      salutationMissing: 'Please select salutation'
    });
  });

  it("must match objects with expected key/value pairs", () => {
    const updateInformation = {
      salutation: '',
      email: '',
      typedEmail: '',
      validate: false
    };
    expect(updateInformation).toEqual(jasmine.objectContaining({
      validate: false
    }));
  });

  it('selectSalutaion() has to be defined', () => {
    expect(component.selectSalutation).toBeDefined();
    expect(component.invalidSalutation).toBe(false);
  });

  it('emailMatchCheck() has to be defined', () => {
    expect(component.emailMatchCheck).toBeDefined();
    expect(component.invalidEmail).toBe(false);
    expect(component.invalidConfirmEmail).toBe(false);
  });

  it('reEnterEmailMatchCheck() to be defined', () => {
    expect(component.reEnterEmailMatchCheck).toBeDefined();
  });

  it('onDrop() should be defined', () => {
    expect(component.onDrop).toBeDefined();
    expect(component.onDrop(event)).toBe(false);
  });
  it('check whether img tag contains image for warning', () => {
    if (component.invalidSalutation) {
      const element = fixture.debugElement.nativeElement;
      expect(element.querySelector('span.warning-icon > img').src).toContain('../assets/img/ThresholdAlertNotification.svg');
    }
  });
  it('Should test ngOnInit function', () => {
      let data = {
        outputCPResp:{
          contactEmail:""
        }
      }
      sessionStorage.setItem('UserInfo',JSON.stringify(data));
      component.ngOnInit();

      sessionStorage.removeItem('UserInfo');
      expect(component.emailRetrieval).toBeTruthy();
  });
  it('Should test selectSalutation function', () => {
      let data = {
        viewModel:"Mr"
      }
      component.ngOnInit();
      component.selectSalutation(data);
      
  });
  it('Should test selectSalutation function without value', () => {
      let data = {
        viewModel:""
      }
      component.ngOnInit();
      component.selectSalutation(data);
      
  });
  it('Should test emailMatchCheck function ', () => {
      
      component.ngOnInit();
      component.enterEmail = 'brijesh';
      component.emailMatchCheck();
      expect(component.invalidEmail).toBeTruthy();
      
  });
  it('Should test emailMatchCheck function without email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = '';
      component.emailMatchCheck();
      
  });
  it('Should test emailMatchCheck function with proper email with worng confirm email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = 'brijesh@gmail.com';
      component.confirmEmail = 'test';
      component.emailMatchCheck();
      expect(component.invalidConfirmEmail).toBeTruthy();
      
  });
  it('Should test emailMatchCheck function with proper email with blank confirm email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = 'brijesh@gmail.com';
      component.confirmEmail = 'test';
      component.inputConfirmEmail = '';
      component.emailMatchCheck();
      expect(component.invalidConfirmEmail).toBeTruthy();
      
  });
  it('Should test emailMatchCheck function with proper email with undefined confirm email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = 'brijesh@gmail.com';
      component.confirmEmail = undefined;
      component.inputConfirmEmail = undefined;
      component.emailMatchCheck();
  });
  it('Should test emailMatchCheck function with proper email with undefined confirm email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = 'brijesh@gmail.com';
      component.confirmEmail = 'brijesh@gmail.com';
      component.inputConfirmEmail = 'brijesh@gmail.com';
      component.emailMatchCheck();
  });
  it('Should test reEnterEmailMatchCheck function with proper email confirm email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = 'brijesh@gmail.com';
      component.confirmEmail = 'brijesh@gmail.com';
      
      component.reEnterEmailMatchCheck('');
  });
  it('Should test reEnterEmailMatchCheck function with invalid email confirm email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = 'brijesh@gmail.com';
      component.confirmEmail = 'brijesh';
      
      component.reEnterEmailMatchCheck('');
  });
  it('Should test reEnterEmailMatchCheck function with proper email with blank confirm email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = 'brijesh@gmail.com';
      component.confirmEmail = '';
      
      component.reEnterEmailMatchCheck('');
      expect(component.invalidConfirmEmail).toBeTruthy();
  });
  it('Should test reEnterEmailMatchCheck function with proper email with blank confirm email', () => {
      component.errorMessage = {
        requiredMessage:"Email is required"
      }
      component.ngOnInit();
      component.enterEmail = 'brijesh@gmail.com';
      component.confirmEmail = 'brijesh@gmail.com';
      
      component.reEnterEmailMatchCheck('');
      // expect(component.invalidConfirmEmail).toBeTruthy();
  });

});
