import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbDeviceStockCheckComponent } from './bb-device-stock-check.component';
import { DeviceDetailsStorageService } from '../device-details/device-details-color-storage/device-details-color-storage.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { Renderer2 } from '@angular/core';
import { AppService } from '../../../Service/app.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BbDeviceStockCheckComponent', () => {
  let component: BbDeviceStockCheckComponent;
  let fixture: ComponentFixture<BbDeviceStockCheckComponent>;

  const mockBroadbandDeviceDetail = { "name": "Home Wireless", "sku": "home-wireless", "price": 0, "quntity": null, "default_plan": "Home Wireless Gold Plus", "default_plan_sku": "hwgp", "order_monthly_pay": "100.0000", "most_popular": "0", "rm": "0", "rrp_rm_strick_price": "3394.0000", "main_image": "\/media\/catalog\/product\/h\/w\/hw.png", "sub_images": ["\/media\/catalog\/product\/h\/w\/hw.png"], "dimension": "W:95mm H:208mm D:95mm", "weight": 0, "splash_water_dust_resistant": "0", "stock": "Limited Stock", "order_category": "MDM", "order_model": null, "order_brand": "HUAWEI", "segment": null, "default_selected_color": "White", "stock_indicator_image": "\/media\/catalog\/productno_selection", "stock_indicator_text": null, "default_device_option": "deviceBundle", "more_details": { "features": "One power adapter port , One LAN port (RJ45),  One LAN \/ WAN port (RJ45) , One phone port (RJ11),  Two external LTE antenna ports (TS-9),  One micro-SIM card slot,  One USB 2.0 port (Supports a maximum of 500 mA current)", "shipping_details": null, "whatInTheBox": "One Router, Power Cable" }, "terms_and_condition": { "plans": { "label": "Delivery Locations", "desc": null }, "contract_terms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Ownership", "desc": null }, "cancellation": { "label": "Refund Policy", "desc": null } }, "device_product_details": [{ "name": "Home Wireless", "sku": "home-wireless-device", "rrp": "3394.0000", "discounted_device_rrp": null, "color": "White", "order_color": "WHT", "order_category": "MDM", "color_hexa": "#ffffff", "image": "\/media\/catalog\/product\/c\/e\/celcom_home_wireless-celcom_estore900x900-01.jpg", "sub_images": ["\/media\/catalog\/product\/c\/e\/celcom_home_wireless-celcom_estore900x900-01.jpg", "\/media\/catalog\/product\/9\/0\/900x900_ver1_eng.jpg"], "order_model": "B618 LTE WIFI", "part_number": "MDR4640", "product_type": "HP", "new_customer": "0", "segment": null, "contract": "24 months", "upfront_installment": null, "saleable_plans": [{ "sku": "hwg", "prices": { "upfront_price": "0", "device_price": "0", "penalty_price": "499", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwgp", "prices": { "upfront_price": "0", "device_price": "0", "penalty_price": "499", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwp", "prices": { "upfront_price": "0", "device_price": "0", "penalty_price": "499", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwg_1", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "599", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwg_2", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "699", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwg_3", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "799", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwg_4", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "899", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwg_5", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "999", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwgp_1", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "599", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwgp_2", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "699", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwgp_3", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "799", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwgp_4", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "899", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwgp_5", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "999", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwp_1", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "599", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwp_2", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "699", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwp_3", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "799", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwp_4", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "899", "supplementary_count": 0, "special_price": 0 } }, { "sku": "hwp_5", "prices": { "upfront_price": "100", "device_price": "0", "penalty_price": "999", "supplementary_count": 0, "special_price": 0 } }] }], "plan_product_details": [{ "tab_name": "Home Wireless Plans", "tab_title": null, "tab_subtitle": null, "tab_data": [{ "name": "Home Wireless Gold", "sku": "hwg", "monthly_plan": "70.0000", "order_plan_bundle": "PB11913", "plan_monthly_pay": "70.0000", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "Home Wireless Gold", "plan_title": "Home Wireless Gold. Affordable. Complete", "plan_subtitle": "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.", "product_type": null, "background_color": null, "indicator_class": "is-bg-color-black", "product_text": "Gold", "key_figures_text": "25GB", "key_text": "RM70", "table_info": [{ "heighlight": "0", "headline": "40GB Video Walla \u2122 & Music Walla \u2122", "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg", "add_on_data": "Add-on data available (RM50\/RM150)" }], "terms_and_condition": { "plans": { "label": "Delivery Locations", "desc": "Unlimited Standard national calls + texts + videocalls" }, "contract_terms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Ownership", "desc": "All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una" }, "cancellation": { "label": "Refund Policy", "desc": "Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b" } } }, { "name": "Home Wireless Gold Plus", "sku": "hwgp", "monthly_plan": "100.0000", "order_plan_bundle": "PB11914", "plan_monthly_pay": "100.0000", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "Home Wireless Gold Plus", "plan_title": "First\u2122 Gold Plus. Affordable. Complete", "plan_subtitle": "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.", "product_type": null, "background_color": "is-bg-color-black", "indicator_class": null, "product_text": "Gold Plus", "key_figures_text": "50GB", "key_text": "RM100", "table_info": [{ "heighlight": "0", "headline": "100GB Video Walla \u2122 & Music Walla \u2122", "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg", "add_on_data": "Add-on data available (RM50\/RM150)" }], "terms_and_condition": { "plans": { "label": "Delivery Locations", "desc": "Unlimited Standard national calls + texts + videocalls" }, "contract_terms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Ownership", "desc": "All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una" }, "cancellation": { "label": "Refund Policy", "desc": "Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b" } } }, { "name": "Home Wireless Platinum", "sku": "hwp", "monthly_plan": "150.0000", "order_plan_bundle": "PB11915", "plan_monthly_pay": "150.0000", "segment": null, "upfront_installment": null, "contract": null, "plan_name": "Home Wireless Platinum", "plan_title": "Home Wireless Platinum. Affordable. Complete", "plan_subtitle": "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.", "product_type": null, "background_color": null, "indicator_class": "is-bg-color-black", "product_text": "Platinum", "key_figures_text": "150GB", "key_text": "RM150", "table_info": [{ "heighlight": "0", "headline": "1TB Video Walla \u2122 & Music Walla \u2122", "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg", "add_on_data": "Add-on data available (RM50\/RM150)" }], "terms_and_condition": { "plans": { "label": "Delivery Locations", "desc": null }, "contract_terms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Ownership", "desc": null }, "cancellation": { "label": "Refund Policy", "desc": null } } }] }], "bill_type": 2 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BbDeviceStockCheckComponent],
      providers: [
        AppService,
        DeviceDetailsStorageService,
        DeviceDataService,
        EStoreAnalysticsService,
        AnalyticsService,
        RendererService,
        SeoService,
        DecimalPipe,
        Renderer2
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbDeviceStockCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should test ngOnInit', () => {
    expect(component).toBeDefined();
    spyOn(component, 'checkStockAvailability');
    const deviceDataService = fixture.debugElement.injector.get(DeviceDataService);
    Object.defineProperty(deviceDataService, 'sharedColor$', { value: Observable.of(true) });
    Object.defineProperty(deviceDataService, 'outOfStock$', {
      value: Observable.of({
        status: "In Stock",
        data: {
          "bundleSku": "",
          "simpleSku": "oppf5gld32gb",
          "sku": "Oppo-F5"
        }
      })
    });
    component.data = mockBroadbandDeviceDetail;
    component.selectedColor = 'White';
    component.ngOnInit();
    if (component.data) {
      expect(component.bbBundleBasicDetails).toBe(mockBroadbandDeviceDetail);
      expect(component.selectedBbDevice).toBe(mockBroadbandDeviceDetail.sku);
      expect(component.selectedBbDeviceBrand).toBe(mockBroadbandDeviceDetail.order_brand);
      expect(component.selectedBbModel).toBe(mockBroadbandDeviceDetail.order_model);
      mockBroadbandDeviceDetail.device_product_details.forEach(device => {
        expect(device).toBeDefined();
        if (device.color = component.selectedColor) expect(component.checkStockAvailability).toHaveBeenCalled();
      })
    }
  })

  it('should check stock availability', () => {
    const mockResponse = { "stockAvailabilityCheckResponse": true };
    const deviceDetailStorageService = fixture.debugElement.injector.get(DeviceDetailsStorageService);
    spyOn(deviceDetailStorageService, 'checkStockGatewayHW').and.returnValue(Observable.of(mockResponse));
    component.checkStockAvailability(mockBroadbandDeviceDetail.device_product_details[0]);
    expect(component).toBeDefined();
    if (mockResponse.stockAvailabilityCheckResponse) {
      expect(component.stock.status).toBe("In Stock");
    }
  })

  it('should check stock availability on false', () => {
    const mockResponse = { "stockAvailabilityCheckResponse": false };
    const deviceDetailStorageService = fixture.debugElement.injector.get(DeviceDetailsStorageService);
    spyOn(deviceDetailStorageService, 'checkStockGatewayHW').and.returnValue(Observable.of(mockResponse));
    component.checkStockAvailability(mockBroadbandDeviceDetail.device_product_details[0]);
    expect(component).toBeDefined();
    if (!mockResponse.stockAvailabilityCheckResponse) {
      expect(component.stock.status).toBe("Out of Stock");
    }
  })

});
