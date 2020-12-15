import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BbDeviceColorComponent } from './bb-device-color.component';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('BbDeviceColorComponent', () => {
  let component: BbDeviceColorComponent;
  let fixture: ComponentFixture<BbDeviceColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BbDeviceColorComponent ],
      providers:[DeviceDataService],
      imports: [
        HttpClientTestingModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BbDeviceColorComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });
  it('should create  BbDeviceColorComponent component', () => {
    expect(component).toBeTruthy();
  });
  it('should ngoninit function', () => {
    component.ngOnInit();
    // expect(component).toBeTruthy();
  });
  it('should ngoninit function', () => {
    component.data = {
      sku:"test",
      order_brand:"test brand",
      order_model:"test model",
      device_product_details:[{
      color:"white",color_hexa:"#FFF",
    },{
      color:"Black",color_hexa:"#000",
      saleable_plans:[{
        sku:"test",
        prices:{
          device_price:200,
          upfront_price:300,

        }
      }]
    }]};
    component.selectedPlanSku = "test";
    component.colorList = [];
    component.selectedProd = {color:"Black"};
    sessionStorage.setItem('UserInfo',JSON.stringify('true'));
    sessionStorage.setItem('UserToken',JSON.stringify('true'));
    localStorage.setItem('MyMsIsdn',JSON.stringify('true'));
    localStorage.setItem('homeWirelessData',JSON.stringify({color:"White"}));
    component.ngOnInit();
    sessionStorage.removeItem('UserInfo');
    sessionStorage.removeItem('UserToken');
    localStorage.removeItem('MyMsIsdn');
    localStorage.removeItem('homeWirelessData');
    // expect(component).toBeTruthy();
  });
  it('should selectColor function ', () => {
    component.data = {
      sku:"test",
      order_brand:"test brand",
      order_model:"test model",
      device_product_details:[{
      color:"white",color_hexa:"#FFF",
    },{
      color:"Black",color_hexa:"#000",
      saleable_plans:[{
        sku:"test",
        prices:{
          device_price:200,
          upfront_price:300,

        }
      }]
    }]};
    
    component.colorList = [];
    component.selectedProd = {color:"Black"};
    component.ngOnInit();
    component.selectedPlanSku = "test";
    component.selectColor("Black");
    // expect(component).toBeTruthy();
  });
});

