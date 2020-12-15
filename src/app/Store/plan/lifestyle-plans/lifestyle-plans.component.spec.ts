import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { LifestylePlansComponent } from '../lifestyle-plans/lifestyle-plans.component';
import { AppService } from "../../../Service/app.service";
import { AppMockService } from '../../../Service/appmock.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { LifestylePlansService } from "../lifestyle-plans/lifestyle-plans.service";
import { By } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';


describe('LifestylePlansComponent', () => {
  let component: LifestylePlansComponent;
  let fixture: ComponentFixture<LifestylePlansComponent>;
  let addonCode;
  let addonCodeSelected;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      declarations: [
        LifestylePlansComponent,
      ],
      providers: [
        HttpClient,
        { provide: AppService, useClass: AppMockService }, DeviceDataService, LifestylePlansService, CookieService,
         GetParametersService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifestylePlansComponent);
    component = fixture.componentInstance;
    component.addOnData = {
      "addons": {
        "title": "Choose Add-Ons",
        "items": [
          {
            "header": `Sign up for <span class='bold-font'>Lifestyle Privileges</span> (12 months) to enjoy
              <span class='bold-font'>FREE</span> shopping with Lazada, Grab rides and more.`,
            "title": "I want to sign up for FREE",
            "code": "1234XX"
          }
        ]
      }
    };
    fixture.detectChanges();
  });

  it('It should create lifestyle-plans component', () => {
    expect(component).toBeTruthy();
  });

  it('It should render lifestyle addon in HTML', () => {
    const heading = fixture.debugElement.query(By.css('.addons-heading'));
    const itemHeader = fixture.debugElement.query(By.css('.addon-item-header'));
    const itemTitle = fixture.debugElement.query(By.css('.addon-item-title'));

    const e1: HTMLElement = heading.nativeElement;
    const e2: HTMLElement = itemHeader.nativeElement;
    const e3: HTMLElement = itemTitle.nativeElement;

    expect(e1.innerHTML).toContain('Choose Add-Ons');
    expect(e2.innerHTML).toBeTruthy();
    expect(e3.innerHTML).toBeTruthy();
  });

  it('It should get lifestyle addon object from API', () => {
    expect(component.renderAddon).toBeDefined();
    expect(component.addOnDataObj).toBeDefined();
    expect(component.addOnDataObj.addons).toBeDefined();
  });

  it('It should get lifestyle addon object with items from API', () => {
    expect(component.addOnDataObj.addons.items).toBeDefined();
  });

  it('It should get lifestyle addon object with item details from API', () => {
    expect(component.addOnDataObj.addons.items[0].header).toBeDefined();
    expect(component.addOnDataObj.addons.items[0].title).toBeDefined();
    expect(component.addOnDataObj.addons.items[0].code).toBeDefined();
  });

  it('It should deactivate lifestyle checkbox on page load', () => {
    const section = fixture.debugElement.query(By.css('.checkmark'));
    expect(section.classes['termscheck-disabled']).toBeTruthy();
  });

  it('It should deactivate lifestyle checkbox on supplementary line selection', () => {
    component.deactivateAddon = true;
    fixture.detectChanges();
    const section = fixture.debugElement.query(By.css('.checkmark'));
    expect(section.classes['termscheck-disabled']).toBeTruthy();
  });

  it('It should select lifestyle addon', () => {
    const event = {
      target: {
        checked: true,
      }
    };
    component.termsCheck(event);
    if (localStorage && localStorage.getItem("addonCode") && localStorage.getItem("lifestylePlans")) {
      addonCode = localStorage.getItem("addonCode");
      addonCodeSelected = localStorage.getItem("lifestylePlans");
    }
    expect(addonCode).toBeDefined();
    expect(addonCodeSelected).toEqual('true');
    expect(component.addOnSelectionData.isSelected).toBeTruthy();
  });

  it('termsCheck', () => {
    const spy = spyOn(component, 'termsCheck').and.callThrough();
    const event = {
      target: {
        checked: true,
      }
    };
    component.ispromotiondetails = null;
    component.termsCheck(event);
    component.ispromotiondetails = '';
    component.isLifestyleValue  = null;
    component.termsCheck(event);
    expect(spy).toHaveBeenCalled();
  });

  it('It should deselect lifestyle addon', () => {
    const event = {
      target: {
        checked: false,
      }
    };
    component.termsCheck(event);
    if (localStorage) {
      addonCode = localStorage.getItem("addonCode");
      addonCodeSelected = localStorage.getItem("lifestylePlans");
    }
    expect(addonCode).toBe(null);
    expect(addonCodeSelected).toEqual('false');
    expect(component.addOnSelectionData.isSelected).toBeFalsy();
  });

  it('It should disable supplementary line section on lifestyle addon select', () => {
    spyOn(component.onAgreeTC, 'emit');
    const event = {
      target: {
        checked: true,
      }
    };
    component.termsCheck(event);
    fixture.detectChanges();
    expect(component.onAgreeTC.emit).toHaveBeenCalledWith(Object({ isSelected: true, code: component.addOnSelectionData.code }));
  });

  it('It should enable supplementary line section on lifestyle addon deselect', () => {
    spyOn(component.onAgreeTC, 'emit');
    const event = {
      target: {
        checked: false,
      }
    };
    component.termsCheck(event);
    fixture.detectChanges();
    expect(component.onAgreeTC.emit).toHaveBeenCalledWith(Object({ isSelected: false, code: component.addOnSelectionData.code }));
  });

  it('ngOnInit', () => {
    const spy = spyOn(component, 'ngOnInit');
    const dataService = TestBed.get(DeviceDataService);
    spyOn(dataService, 'deactivateLifestyleAddons').and.returnValue({test:'true'});
    component.addOnData = {addons:{version: 'V1'}};
    component.ispromotiondetails = true;
    component.isLifestyleValue = true;
    localStorage.setItem("addonCode", '1');
    localStorage.setItem("lifestyleCOBP", `{'test', true}`);
    localStorage.setItem("lifestyleEDIT", `{'test', true}`);
    component.addOnSelectionData = {isSelected : true, code : '0'};
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
