import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DeviceFlowComponent } from './device-flow.component';
// tslint:disable-next-line:max-line-length
import { LosingSupplementaryLinePopupComponent } from '../../../Store/widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { UserService } from '../../../Service/user.service';
import { AppService } from '../../../Service/app.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { configureTestSuite } from 'ng-bullet';
import { RouterTestingModule } from "@angular/router/testing";

describe('DeviceFlowComponent', () => {
  let component: DeviceFlowComponent;
  let fixture: ComponentFixture<DeviceFlowComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([])],
      declarations: [DeviceFlowComponent, LosingSupplementaryLinePopupComponent],
      providers: [DeviceDataService, UserService, AppService, HttpClient, HttpHandler, CommonUtilService]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceFlowComponent);
    component = fixture.componentInstance;
    component.deviceFlow = '';
    component.principalLine = true;
    component.data = {
      "sku": "Samsung-Galaxy-S10",
      "is_rent": true
    };
  });

  it('should create DeviceFlowComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call deviceFlowSelection function for easyphone', () => {
    component.easyPhoneFlow();
    let isDeviceOnlyClicked = null;
    if (typeof window !== 'undefined' && localStorage) {
      const isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
      const isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
      const isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
      const isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
      if (localStorage.getItem("isDeviceOnlyClicked")) {
        isDeviceOnlyClicked = JSON.parse(localStorage.getItem('isDeviceOnlyClicked'));
      }
      if (localStorage.getItem("isOwnClicked") && JSON.parse(localStorage.getItem("isOwnClicked")) === true) {
        expect(isRentClicked).toBeFalsy();
      } else {
        if ((localStorage.getItem("isRentClicked") && JSON.parse(localStorage.getItem("isRentClicked")) === true) ||
          (this.data && this.data.is_rent)) {
          expect(isRentClicked).toBeTruthy();
          expect(isOwnClicked).toBeFalsy();
        } else {
          expect(isRentClicked).toBeFalsy();
          expect(isOwnClicked).toBeTruthy();
        }
      }
      expect(isBundleClicked).toBeFalsy();
      expect(isDeviceOnlyClicked).toBeNull();
      expect(isEasyPhone).toBeTruthy();
    }
  });
  it('should call deviceFlowSelection function for device bundle', () => {
    component.deviceFlowSelection('deviceBundle');
    if (component.principalLine) {
      expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
      if (typeof window !== 'undefined' && localStorage) {
        let isDeviceOnlyClicked = null;
        if (localStorage.getItem("isDeviceOnlyClicked")) {
          isDeviceOnlyClicked = JSON.parse(localStorage.getItem('isDeviceOnlyClicked'));
        }
        const isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
        const isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
        const isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
        const isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
        expect(isDeviceOnlyClicked).toBeNull();
        expect(isBundleClicked).toBeTruthy();
        expect(isEasyPhone).toBeFalsy();
        expect(isRentClicked).toBeFalsy();
        expect(isOwnClicked).toBeFalsy();
      }
    }

  });

  it('should call deviceFlowSelection function for device only', () => {
    component.deviceFlowSelection('deviceOnly');
    if (component.principalLine) {
      expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
      if (typeof window !== 'undefined' && localStorage) {
        const isDeviceOnlyClicked = JSON.parse(localStorage.getItem('isDeviceOnlyClicked'));
        const isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
        const isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
        const isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
        const isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
        let enableChoosewayLogin = null;
        let supplementryFlow = null;
        if (localStorage.getItem("enableChoosewayLogin")) {
          enableChoosewayLogin = JSON.parse(localStorage.getItem("enableChoosewayLogin"));
        }
        if (localStorage.getItem("supplementryFlow")) {
          supplementryFlow = JSON.parse(localStorage.getItem("supplementryFlow"));
        }
        expect(isDeviceOnlyClicked).toBeTruthy();
        expect(isBundleClicked).toBeFalsy();
        expect(isEasyPhone).toBeFalsy();
        expect(isRentClicked).toBeFalsy();
        expect(isOwnClicked).toBeFalsy();
        expect(enableChoosewayLogin).toBeNull();
        expect(supplementryFlow).toBeNull();

      }
    }

  });

  it('should call disableNewLineCobpForSamsungSTen function', () => {
    const deviceFlow = 'deviceBundle';
    component.disableNewLineCobpForSamsungSTen(deviceFlow);
    const deviceSku = component.data.sku;
    const currentDate = new Date();
    const minDate = new Date('April 5 2019 00:00');
    const maxDate = new Date('April 16 2019 00:00');
    let DisableNewLineCobpSTen = false;
    if (currentDate >= minDate && currentDate < maxDate && deviceSku === "Samsung-Galaxy-S10") {
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem('DisableNewLineCobpSTen')) {
        DisableNewLineCobpSTen = JSON.parse(localStorage.getItem('DisableNewLineCobpSTen'));
        expect(DisableNewLineCobpSTen).toBeTruthy();
      }
    } else {
      expect(DisableNewLineCobpSTen).toBeFalsy();
    }
  });

  it('should call onCancellingSwitchingPurchaseTypeTab', () => {
    let popup = null;
    component.onCancellingSwitchingPurchaseTypeTab();
    expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('popup')) {
      popup = true;
    }
    expect(popup).toBeNull();
  });
  it('should call deviceFlowSelection', () => {
    component.principalLine = true;
    component.deviceFlowSelection('easyPhone');
    
  });
  it('should call deviceFlowSelection with principalline false', () => {
    component.principalLine = false;
    component.deviceFlowSelection('easyPhone');
    
  });
  it('should call deviceFlowSelection with deviceBundle', () => {
    component.principalLine = false;
    component.deviceFlowSelection('deviceBundle');
    
  });
  it('should call deviceFlowSelection with deviceBundle', () => {
    component.principalLine = true;
    component.deviceFlowSelection('deviceBundle');
    
  });
  it('should call onContinueSwitchingPurchaseTypeTab', () => {
    component.principalLine = true;
    component.newDeviceFlow = 'deviceBundle';
    localStorage.setItem("suppLinesAddedByTheUser", "{123}");
    component.onContinueSwitchingPurchaseTypeTab();
    expect(component.deviceFlow).toBe('deviceBundle');
    localStorage.removeItem("suppLinesAddedByTheUser");
    component.onContinueSwitchingPurchaseTypeTab();
  });
  it('should call UpdatePriceData', () => {
    component.data = {"name":"iPhone XS Max","id":"401","sku":"iPhone-XS-Max","upper_age_limit":null,"lower_age_limit":null,"price":4368,"quntity":0,"preorder":0,"preorder_availability_flag":0,"midnight_delivery":{"status":0,"label":""},"is_easy_phone":1,"is_rent":false,"is_own":true,"default_plan":"First™ Platinum Plus","default_plan_sku":"FPP","order_monthly_pay":"188.0000","nfc":"0","mostpopular":"0","rm":3068,"rrp_rm_strick_price":"4899.0000","upfront_price":0,"device_price":0,"main_image":"/media/catalog/product/f/r/front_900x900_2_4.png","sub_images":["/media/catalog/product/f/r/front_900x900_2_4_2.png","/media/catalog/product/f/r/front_900x900_2_4.png"],"dimension":"157.5X77.4X7.7mm","choose_memory":null,"weight":null,"chip_processor":"A12 Bionic Chip ","splash_water_dust_resistant":"0","talk_time":null,"standby_time":null,"sim_type":null,"stock":"Limited Stock","preorder_estimate_delivery_text":null,"new_customer":"0","order_category":"HP","order_model":"IPHONE XS MAX 64GB","order_brand":"APPLE","segment":"10","start_date":"2018-10-17 05:31:41","end_date":"2019-10-08 07:55:05","default_selected_color":"Silver","default_selected_memory":"64GB","pre_order_data":{"preorder_estimate_delivery_text":"6","preorder_estimate_delivery_date":"6","preorder_text":"PRE-ORDER ENDED","preorder_from_date_text":"From","preorder_to_date_text":"to","preorder_from_date":"19 Oct 2018","preorder_to_date":"23 Oct 2018","preorder_end_flag":1,"preorder_estimate_delivery":"6","preorder_submit_date":"2018-10-21 00:00:00","preorder_stock_available_quantity":0,"preorder_availble_stock_in_hand":0,"preorder_stock_status_flag":0},"is_campaign_mviva":null,"campaign_mviva":null,"campaign_mviva_invalid":null,"is_lifestyle":0,"addons":[],"stock_indicator_image":"/media/catalog/product/b/a/badge_19.png","stock_indicator_text":"<strong>FREE Entertainer Pass</strong></br>\nfor any device with EasyPhone&trade; or Celcom Mobile Plan! Read full <a href=\"https://www.celcom.com.my/legal/terms-and-conditions/personal#personal-devices-entertainer-pass\"> terms & conditions </a> here.","default_device_option":"easyPhone","isEasyPhoneDevice":true,"editProduct":null,"length":0,"rrpPrice":"4899.0000"}
    localStorage.setItem("easyPhoneOwnData",JSON.stringify([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]));
    component.principalLine = true;
    component.newDeviceFlow = 'deviceBundle';
    component.UpdatePriceData();
    localStorage.removeItem("easyPhoneOwnData");

    // expect(component.deviceFlow).toBe('deviceBundle');
    
  });
  it('should call UpdatePriceData with rent true', () => {
    component.data = {"name":"iPhone XS Max","id":"401","sku":"iPhone-XS-Max","upper_age_limit":null,"lower_age_limit":null,"price":4368,"quntity":0,"preorder":0,"preorder_availability_flag":0,"midnight_delivery":{"status":0,"label":""},"is_easy_phone":1,"is_rent":true,"is_own":true,"default_plan":"First™ Platinum Plus","default_plan_sku":"FPP","order_monthly_pay":"188.0000","nfc":"0","mostpopular":"0","rm":3068,"rrp_rm_strick_price":"4899.0000","upfront_price":0,"device_price":0,"main_image":"/media/catalog/product/f/r/front_900x900_2_4.png","sub_images":["/media/catalog/product/f/r/front_900x900_2_4_2.png","/media/catalog/product/f/r/front_900x900_2_4.png"],"dimension":"157.5X77.4X7.7mm","choose_memory":null,"weight":null,"chip_processor":"A12 Bionic Chip ","splash_water_dust_resistant":"0","talk_time":null,"standby_time":null,"sim_type":null,"stock":"Limited Stock","preorder_estimate_delivery_text":null,"new_customer":"0","order_category":"HP","order_model":"IPHONE XS MAX 64GB","order_brand":"APPLE","segment":"10","start_date":"2018-10-17 05:31:41","end_date":"2019-10-08 07:55:05","default_selected_color":"Silver","default_selected_memory":"64GB","pre_order_data":{"preorder_estimate_delivery_text":"6","preorder_estimate_delivery_date":"6","preorder_text":"PRE-ORDER ENDED","preorder_from_date_text":"From","preorder_to_date_text":"to","preorder_from_date":"19 Oct 2018","preorder_to_date":"23 Oct 2018","preorder_end_flag":1,"preorder_estimate_delivery":"6","preorder_submit_date":"2018-10-21 00:00:00","preorder_stock_available_quantity":0,"preorder_availble_stock_in_hand":0,"preorder_stock_status_flag":0},"is_campaign_mviva":null,"campaign_mviva":null,"campaign_mviva_invalid":null,"is_lifestyle":0,"addons":[],"stock_indicator_image":"/media/catalog/product/b/a/badge_19.png","stock_indicator_text":"<strong>FREE Entertainer Pass</strong></br>\nfor any device with EasyPhone&trade; or Celcom Mobile Plan! Read full <a href=\"https://www.celcom.com.my/legal/terms-and-conditions/personal#personal-devices-entertainer-pass\"> terms & conditions </a> here.","default_device_option":"easyPhone","isEasyPhoneDevice":true,"editProduct":null,"length":0,"rrpPrice":"4899.0000"}
    localStorage.setItem("easyPhoneRentData",JSON.stringify([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]));
    component.principalLine = true;
    component.newDeviceFlow = 'deviceBundle';
    component.UpdatePriceData();
    localStorage.removeItem("easyPhoneOwnData");

    // expect(component.deviceFlow).toBe('deviceBundle');
    
  });
  it('should call UpdateBundleData', () => {
    let bundleData = [{"key":"FGP","value":"3718"},{"key":"FGS","value":"3498"},{"key":"FP","value":"3358"},{"key":"FPP","value":"3068"}];
    localStorage.setItem("easyPhoneRentData",JSON.stringify([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]));
    component.UpdateBundleData(bundleData);
    localStorage.removeItem("easyPhoneOwnData");

    // expect(component.deviceFlow).toBe('deviceBundle');
    
  });
  it('should call UpdatePriceData with null value', () => {
    let bundleData = undefined;
    localStorage.setItem("easyPhoneUpfrontData",JSON.stringify([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]));
    component.UpdateBundleData(bundleData);
    localStorage.removeItem("easyPhoneUpfrontData");

    // expect(component.deviceFlow).toBe('deviceBundle');
    
  });
  it('should call UpdateBundleData', () => {
    let bundleData = [{"key":"FGP","value":"3718"},{"key":"FGS","value":"3498"},{"key":"FP","value":"3358"},{"key":"FPP","value":"3068"}];
    localStorage.setItem("easyPhoneUpfrontData",JSON.stringify([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]));
    component.UpdateUpfrontPrice(bundleData);
    localStorage.removeItem("easyPhoneUpfrontData");
  });
it('ngoninit', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  component.ngOnInit();
  devicedataservice.publishEditCartEasyPhone(true);
  devicedataservice.publishEasyPhoneRentData([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]);
  devicedataservice.publishEasyPhoneOwnData([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]);
  devicedataservice.publishEasyPhoneBundleData([{"key":"FGP","value":"3718"},{"key":"FGS","value":"3498"},{"key":"FP","value":"3358"},{"key":"FPP","value":"3068"}]);
  devicedataservice.publishEasyPhoneUpfrontData([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]);
  devicedataservice.publishCobpLoading(false);
  devicedataservice.publishPrincipalLine(true);
  component.data = {is_rent: true, is_own: true, preorder: 1};
  component.isPromotion = true;
  component.ngOnInit();
  component.data = {is_rent: false, is_own: true, preorder: 0};
  component.isPromotion = false;
  localStorage.setItem("isMviva", "false");
  component.ngOnInit();
  component.isEasyPhone = true;
  localStorage.setItem("isMviva", "true");
  component.ngOnInit();
  component.data = {is_rent: false, is_own: false, campaign_mviva: {purchase_type: "deviceOnly"}, default_device_option: "easyPhone"};
  component.ngOnInit();
  component.isEasyPhone = true;
  localStorage.setItem('supplementryFlow', "true");
  component.data = {is_rent: false, is_own: false, campaign_mviva: {purchase_type: "deviceOnly"}, default_device_option: "easyPhone", is_easy_phone: 0};
  component.ngOnInit();
  component.isEasyPhone = false;
  component.data = {is_rent: false, is_own: false, campaign_mviva: {purchase_type: "deviceOnly"}, default_device_option: "easyPhone", is_easy_phone: 1};
  component.ngOnInit();
  component.SelectionAferLogin = {principalNum: "01236151112"};
  component.ngOnInit();
  component.SelectionAferLogin = {is_easyphone: true};
  localStorage.removeItem("isBundleClicked");
  localStorage.setItem('COBP_FLOW', 'YES');
  localStorage.setItem('isRentClicked', 'true');
  component.ngOnInit();
  component.SelectionAferLogin = null;
  localStorage.setItem('supplementryFlow', "true");
  component.data = {editProduct: {is_easyphone: 1}};
  component.ngOnInit();
  localStorage.removeItem("supplementryFlow");
  component.data = {editProduct: {is_easyphone: 1}};
  component.ngOnInit();
  component.data = {editProduct: {selectedProduct: {orderPlanName: undefined}}};
  component.deviceFlow = "deviceOnly";
  component.ngOnInit();
  component.isEasyPhone = false;
  localStorage.removeItem("isMviva");
  localStorage.removeItem("supplementryFlow");
  localStorage.removeItem('COBP_FLOW');
  localStorage.removeItem('isRentClicked');
  localStorage.removeItem('easyPhoneSelected');
  localStorage.removeItem('deviceBundleSelected');
  localStorage.removeItem('bundleEditCobp');
}));
it('onSwitchingTab', () => {
  component.onSwitchingTab("deviceOnly");
  localStorage.setItem("MNP-FLOW", "YES");
  component.onSwitchingTab("deviceOnly");
  localStorage.removeItem("MNP-FLOW");
});
it('updateupfront', () => {
  component.UpdateUpfrontPrice(undefined);
  localStorage.setItem("easyPhoneUpfrontData",JSON.stringify([{"FGP":"164"},{"FGS":"151"},{"FP":"146"},{"FPP":"136"}]));
  component.UpdateUpfrontPrice(undefined);
  localStorage.removeItem("easyPhoneUpfrontData");
});
it('disable easyphone', () => {
  component.data = {sku: 'Samsung-Galaxy-Note-10'};
component.disableSupplimentaryLineForSamsungGN("easyPhone");
component.data = {sku: 'Samsung-Galaxy-Note-10-Plus'};
component.disableSupplimentaryLineForSamsungGN("deviceOnly");
localStorage.removeItem('disableSuppLineForSamsungGN');
});
});

