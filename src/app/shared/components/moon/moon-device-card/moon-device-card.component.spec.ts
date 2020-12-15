import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonDeviceCardComponent } from './moon-device-card.component';
import { materialModules } from 'app/shared/shared-module.module';
import { configureTestSuite } from 'ng-bullet';
import { DeviceColorStoragePickerComponent, IColor } from '../../device-color-storage-picker/device-color-storage-picker.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { iPlanDeviceBundle, iStockResponse } from 'app/shared/models/device.model';
import { IconModule } from 'app/shared/icon.module';
import { DeviceDetailPageService } from 'app/pages/device-detail-page/device-detail-page.service';
import { of } from 'rxjs/observable/of';

const image = 'https://shop.celcom.com.my/media/catalog/product/h/t/httpsshopapi.celcom.com.mymediawysiwygproductsfront_1.png';
const product: iPlanDeviceBundle = {
  "name": "HUAWEI Nova 5T",
  "sku": "Huawei-Nova-5T",
  "price": 0,
  "quntity": null,
  "order_monthly_pay": "108.00",
  "most_popular": "0",
  "rm": "0.00",
  "rrp_rm_strick_price": "1399.00",
  "main_image": "/media/catalog/product/p/u/purple-front_6.png",
  "sub_images": [
    "/media/catalog/product/p/u/purple-front_6.png"
  ],
  "dimension": null,
  "weight": null,
  "splash_water_dust_resistant": "0",
  "stock": "Limited Stock",
  "order_category": "HP",
  "order_model": "NOVA 5T",
  "order_brand": "HUAWEI",
  "segment": "10",
  "default_selected_color": "Purple",
  "default_selected_memory": "128GB",
  "stock_indicator_image": "/media/catalog/productno_selection",
  "stock_indicator_text": null,
  "default_device_option": "easyPhone",
  "associated_device_product": [
    {
      "name": "Huawei Nova 5T 128GB Purple",
      "sku": "HuaweiNova5T128GBPurple",
      "rrp": "1399.00",
      "discounted_device_rrp": "0.00",
      "color": "Purple",
      "memory": "128GB",
      "order_color": "PRP",
      "order_category": "HP",
      "color_hexa": "#b29db9",
      "image": "/media/catalog/product/p/u/purple-front.png",
      "desc": "24 months contract",
      "sub_images": [
        "/media/catalog/product/g/u/guna_celcom_free_label_platinum_1_2.png",
        "/media/catalog/product/p/u/purple-front.png",
        "/media/catalog/product/p/u/purple-back.png",
        "/media/catalog/product/p/u/purple_side-1.png"
      ],
      "order_model": "NOVA 5T",
      "part_number": "MDR10074",
      "product_type": "HP",
      "new_customer": "0",
      "segment": null,
      "contract": "24",
      "upfront_installment": null,
      "prices": {
        "upfront_price": "150",
        "device_price": "1228",
        "penalty_price": "350",
        "supplementary_count": 0,
        "special_price": 0
      }
    },
    {
      "name": "Huawei Nova 5T 128GB Blue",
      "sku": "HuaweiNova5T128GBBlue",
      "rrp": "1399.00",
      "discounted_device_rrp": "0.00",
      "color": "Blue",
      "memory": "128GB",
      "order_color": "BLU",
      "order_category": "HP",
      "color_hexa": "#48a5d0",
      "image": "/media/catalog/product/b/l/blue_front.png",
      "desc": "24 months contract",
      "sub_images": [
        "/media/catalog/product/g/u/guna_celcom_free_label_platinum_1_1.png",
        "/media/catalog/product/b/l/blue_front.png",
        "/media/catalog/product/b/l/blue_back.png",
        "/media/catalog/product/b/l/blue_side-1.png"
      ],
      "order_model": "NOVA 5T",
      "part_number": "MDR10074",
      "product_type": "HP",
      "new_customer": "0",
      "segment": null,
      "contract": "24",
      "upfront_installment": null,
      "prices": {
        "upfront_price": "150",
        "device_price": "1228",
        "penalty_price": "350",
        "supplementary_count": 0,
        "special_price": 0
      }
    },
    {
      "name": "Huawei Nova 5T 128GB Black",
      "sku": "HuaweiNova5T128GBBlack",
      "rrp": "1399.00",
      "discounted_device_rrp": "0.00",
      "color": "Black",
      "memory": "128GB",
      "order_color": "BLK",
      "order_category": "HP",
      "color_hexa": "#000000",
      "image": "/media/catalog/product/b/l/black-front.png",
      "desc": "24 months contract",
      "sub_images": [
        "/media/catalog/product/g/u/guna_celcom_free_label_platinum_2.png",
        "/media/catalog/product/b/l/black-front.png",
        "/media/catalog/product/b/l/black_back.png",
        "/media/catalog/product/b/l/black_side-2.png"
      ],
      "order_model": "NOVA 5T",
      "part_number": "MDR10074",
      "product_type": "HP",
      "new_customer": "0",
      "segment": null,
      "contract": "24",
      "upfront_installment": null,
      "prices": {
        "upfront_price": "150",
        "device_price": "1228",
        "penalty_price": "350",
        "supplementary_count": 0,
        "special_price": 0
      }
    }
  ]
};

describe('MoonDeviceCardComponent', () => {
  let component: MoonDeviceCardComponent;
  let fixture: ComponentFixture<MoonDeviceCardComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let userServiceSpy: { get: jasmine.Spy };
  let _deviceService: DeviceDetailPageService;

  configureTestSuite ((() => {
    TestBed.configureTestingModule({
      declarations: [
        MoonDeviceCardComponent,
        DeviceColorStoragePickerComponent,
      ],
      imports: [
        HttpClientTestingModule,
        materialModules,
        IconModule,
      ]
    });
  }));

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['get']);
    _deviceService = new DeviceDetailPageService(httpClientSpy as any, userServiceSpy as any);
    fixture = TestBed.createComponent(MoonDeviceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.product = product;
    component.image = image;
    component.selected = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the attributes', () => {
    const imgEl = fixture.nativeElement.querySelector('.device-section .device-image img');
    const colorElements = fixture.nativeElement.querySelectorAll('.color-box');
    expect(imgEl.src).toContain(image);
    expect(colorElements.length).toBe(product.associated_device_product.length);
  });

  it('should select default device', () => {
    component.selectDefaultDevice();
    expect(component.selectedVariant).toBeTruthy();
  });

  it('should select correct variant', () => {
    const selectedProduct = product.associated_device_product[1];
    const selectedColor: IColor = {
      name: selectedProduct.color,
      hex: selectedProduct.color_hexa,
    };
    const selectedStorage = selectedProduct.memory;
    component.selectColorStorage(selectedProduct);
    component.selectColor(selectedColor);
    component.selectStorage(selectedStorage);
    expect(component.selectedVariant.sku).toBe(selectedProduct.sku);
  });

  it('should select device by SKU', () => {
    const selectedProduct = product.associated_device_product[1];
    component.selectedSKU = selectedProduct.sku;
    expect(component.selectedVariant.sku).toBe(selectedProduct.sku);
  });

  it('should check for stock', () => {
    const inStock: iStockResponse = {
      status: true,
      in_stock: true,
      message: 'In Stock',
    };
    httpClientSpy.get.and.returnValue(of(inStock));
    const selectedProduct = product.associated_device_product[1];
    component.selectedSKU = selectedProduct.sku;
    expect(component.isInStock).toBeTruthy();
  });
});
