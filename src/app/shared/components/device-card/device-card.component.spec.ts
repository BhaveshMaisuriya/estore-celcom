import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCardComponent } from './device-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeviceCardComponent', () => {
  let component: DeviceCardComponent;
  let fixture: ComponentFixture<DeviceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ DeviceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCardComponent);
    component = fixture.componentInstance;
    component.device = {    // should import from mock json
      id: 'test',
      name: 'test',
      sku: 'test',
      plan_tab: 'test',
      categories: [ 
        {
          key: 'test',
          name: 'test',
          priority: 1
        }
      ],
      operating_system: 'test',
      brand: 'test',
      mostpopular: 'test',
      price: 20,
      bundle_price: 50,
      base_plan: 'mega',
      base_plan_title: 'test',
      default_plan: 'test',
      plan_min_price: 'test',
      device_min_price: 'test',
      image: 'test',
      full_width_banner:  {
        image: 'test',
        text_color: 'test',
      },
      sub_images: ['test','test'],
      pre_order_data: {
        is_preorder: 'test',
        preorder_text: 'test',
        preorder_from_date_text: 'test',
        preorder_to_date_text: 'test',
        preorder_from_date: 'test',
        preorder_to_date: 'test',
        preorder_end_flag: 5
      },
      discount_promotion_data: {
        discount_price_label: 'test',
        promotion_label: 'test',
      },
      is_lifestyle: 12,
      lifestyle_hat_text1: 'test',
      lifestyle_hat_text2: 'test',
      is_easy_phone: true,
      is_rent: true,
      price_start_from: 15,
      is_premium_plan: true,
      visibility: true,
      promotion_badge: null,
      default_plan_sku: 'test'
    };
    //component.device.base_plan = 'mega';     // need to set value on test cases
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
