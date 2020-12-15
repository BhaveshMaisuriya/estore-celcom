import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
import { EstoreButtonMenuComponent } from './estore-button-menu.component';
import { iSelectOptions } from '../forms/estore-input/estore-input.component';
import { configureTestSuite } from 'ng-bullet';

const items: iSelectOptions[] = [
  {
      label: 'Samsung A11',
      value: 'S001'
  },
  {
      label: 'SAMSUNG A01',
      value: 'S002'
  },
  {
      label: 'OPPO A12',
      value: 'O001'
  },
  {
      label: 'VIVO Y11',
      value: 'V001'
  },
];

describe('EstoreButtonMenuComponent', () => {
  let component: EstoreButtonMenuComponent;
  let fixture: ComponentFixture<EstoreButtonMenuComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ EstoreButtonMenuComponent ],
      imports: [
        BrowserAnimationsModule,
        materialModules,
        IconModule,
      ],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreButtonMenuComponent);
    component = fixture.componentInstance;
    component.iconType = 'svg';
    component.iconName = 'estore-chevron-down';
    component.iconStyle =  {color: '#009BDF'};
    component.rotateOnOpen = true;
    component.selected =  items[0].value;
    component.items =  items;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value', () => {
    spyOn(component.onSelect, 'emit');
    component.onItemClicked(items[2].value);
    expect(component.onSelect.emit).toHaveBeenCalled();
  });

  it('should open menu', () => {
    component.openMenu();
    fixture.detectChanges();
    expect(component.isOpen).toBeTruthy();
  });


});
