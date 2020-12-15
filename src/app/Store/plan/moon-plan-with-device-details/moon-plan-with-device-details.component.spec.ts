import {
    async,
    ComponentFixture,
    TestBed,
    inject
  } from "@angular/core/testing";

  import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
  import { DetailBannerTextLeftComponent } from "../../../Widget/DetailBannerTextLeft/DetailBannerTextLeft.component";
  import { MoonStickySummarySectionComponent } from "../moon-sticky-summary-section/moon-sticky-summary-section.component";
  import { MoonSummarySectionComponent } from "../moon-summary-section/moon-summary-section.component";
  import { MoonPlanWithDeviceDetailsComponent } from "../moon-plan-with-device-details/moon-plan-with-device-details.component";
  import { FormsModule } from "@angular/forms";
  import { HttpClientTestingModule } from "@angular/common/http/testing";
  import { Router, ActivatedRoute } from "@angular/router";
  import { AppService } from "../../../Service/app.service";
  import { AppMockService } from "../../../Service/appmock.service";
  import { HttpClient } from "@angular/common/http";
  import { DeviceDataService } from "../../../Service/devicedata.service";
  import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
  import { DeviceDetailsStorageComponent } from "../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.component";
  import { RedirectionService } from "../../../Service/redirection.service";
  import { CookieService } from "ngx-cookie-service";
  import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
  import { DecimalPipe } from "@angular/common";
  import { AnalyticsService } from "../../../Service/analytic.service";
  import { RendererService } from "../../../Service/renderer.service";
  import { SeoService } from "../../../Service/seo.service";
  import { CommonUtilService } from "../../../Service/commonUtil.service";
  import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
  import { CartService } from "../../../Service/cart.service";
  import { UserService } from "../../../Service/user.service";
  import { SupplimentaryLinesService } from "../../widget/supplementary-lines/supplementary-lines.service";
  import { BroadbandService } from "../../../Service/broadband.service";
  import { BundleService } from "../../../Service/bundle.service";
  import { Broadcaster } from "../../../Model/broadcaster.model";
  import { OrderInfoService } from "../../../Service/orderinfo.service";
  import { DeviceDetailsNumberComponent } from "../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.component";
  import { LosingSupplementaryLinePopupComponent } from "../../widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component";
  import { PlanPurchaseService } from "../plan-purchase/plan-purchase.service";
  import { MoonColorStorageComponent } from "../moon-color-storage/moon-color-storage.component";
  import { SupplementaryLinesComponent } from "../../widget/supplementary-lines/supplementary-lines.component";
  import { DeviceSupplementaryLinesComponent } from "../../widget/device-supplementary-lines/device-supplementary-lines.component";
  import { CobpComponent } from "../../cobp/cobp.component";
  import { NoteSectionComponent } from "../../dumb-components/note-section/note-section.component";
  import { SwitchToCelcomComponent } from "../../mnp/switch-to-celcom/switch-to-celcom.component";
  import { ChooseYourWayComponent } from "../../guest-checkout/choose-your-way/choose-your-way.component";
  import { MoreSupplementaryPopupComponent } from "../../widget/more-supplementary-popup/more-supplementary-popup.component";
  import { AgeEligibilityPopupComponent } from "../../widget/age-eligibility-popup/ageeligiblity.popup.component";
  import { NotificationBarComponent } from "../../widget/notification-bar/notification-bar.component";
  import { Observable } from "rxjs/Rx";
  import { DeviceDisclaimerComponent } from "../../../Widget/StoreWidgets/device-details/device-detail-disclaimer/device-detail-disclaimer.component";
  import { HomeService } from "../../../Service/home.service";
  import { ProductService } from "../../../Service/product.service";
  import { RouterTestingModule } from "@angular/router/testing";
  import { NricInputComponent } from "../../../Store/widget/nric-input/nric-input.component";
  import { SafeHtmlPipe } from "../../../shared/pipes/safe-html.pipe";
import { MoonPlanWithPassDetailsService } from "../moon-plan-with-pass-details/moon-plan-with-pass-details.service";
import { MoonPlanWithPassDetailsComponent } from "../moon-plan-with-pass-details/moon-plan-with-pass-details.component";
import { MsisdnInputComponent } from "../../widget/msisdn-input/msisdn-input.component";
import { OtpInputComponent } from "../../widget/otp-input/otp-input.component";
import { SearchHighlight } from "../../../shared/pipes/search-highlight.pipe";
import { configureTestSuite } from 'ng-bullet';
import { OmniBannerComponent } from 'app/shared/components/omni-banner/omni-banner.component';
import { sharedPipes } from 'app/shared/pipes';
import { materialModules } from 'app/shared/shared-module.module';

  class RouterStub {
    navigateByUrl(url: string) {
      return url;
    }
  }
  class MockactivatedRoute {
    snapshot(url: string) {
      return url;
    }
  }

  describe("MoonPlanWithDeviceDetailsComponent", () => {
    let component: MoonPlanWithDeviceDetailsComponent;
    let fixture: ComponentFixture<MoonPlanWithDeviceDetailsComponent>;
    const response = [
        {
          name: "Oppo F5",
          sku: "Oppo-F5",
          price: 0,
          quntity: null,
          order_monthly_pay: "188.00",
          most_popular: "1",
          rm: "0.00",
          rrp_rm_strick_price: "1224.55",
          main_image: "/media/catalog/product/f/r/front_1_7.png",
          sub_images: ["/media/catalog/product/f/r/front_1_7.png"],
          dimension: "155.9 ×75.8 × 7.7mm ",
          weight: "195.0000",
          splash_water_dust_resistant: "0",
          stock: "Limited Stock",
          order_category: "HP",
          order_model: " MT6763T",
          order_brand: "OPPO",
          segment: "10",
          default_selected_color: "Gold",
          default_selected_memory: "32GB",
          stock_indicator_image: "/media/catalog/product",
          stock_indicator_text: null,
          default_device_option: "easyPhone",
          associated_device_product: [
            {
              name: "Oppo F5 32GB Gold ",
              sku: "oppf5gld32gb",
              rrp: "1224.55",
              discounted_device_rrp: "0.00",
              color: "Gold",
              memory: "32GB",
              order_color: "GLD",
              order_category: "HP",
              color_hexa: "#cdbeab",
              image: "/media/catalog/product/f/r/front_1_6.png",
              sub_images: [
                "/media/catalog/product/f/r/front_1_6.png",
                "/media/catalog/product/9/0/900x900_5_2.png"
              ],
              order_model: "F5",
              part_number: "MDR5617",
              product_type: "HP",
              new_customer: "0",
              segment: null,
              contract: "24",
              upfront_installment: null,
              prices: {
                upfront_price: "1000",
                device_price: "10",
                penalty_price: "500",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              name: "Oppo F5 32GB Black",
              sku: "oppf5b32gb",
              rrp: "1224.55",
              discounted_device_rrp: "0.00",
              color: "Black",
              memory: "32GB",
              order_color: "BLK",
              order_category: "HP",
              color_hexa: "#000000",
              image: "/media/catalog/product/f/r/front_64.png",
              sub_images: [
                "/media/catalog/product/f/r/front_64.png",
                "/media/catalog/product/9/0/900x900_8.png"
              ],
              order_model: "F5",
              part_number: "MDR5617",
              product_type: "HP",
              new_customer: "0",
              segment: null,
              contract: "24",
              upfront_installment: null,
              prices: {
                upfront_price: "1000",
                device_price: "10",
                penalty_price: "500",
                supplementary_count: 0,
                special_price: 0
              }
            }
          ]
        },
        {
          name: "iPhone 8",
          sku: "iPhone-8",
          price: 0,
          quntity: null,
          order_monthly_pay: "188.00",
          most_popular: "0",
          rm: "1748.00",
          rrp_rm_strick_price: "3394.00",
          main_image: "/media/catalog/product/f/r/front_55.png",
          sub_images: [
            "/media/catalog/product/f/r/front_55.png",
            "/media/catalog/product/b/a/badge.png"
          ],
          dimension: "138.4 x 67.3 x 7.3",
          weight: "195.0000",
          splash_water_dust_resistant: "1",
          stock: "Limited Stock",
          order_category: "HP",
          order_model: "Apple A10 Fusion",
          order_brand: "APPLE",
          segment: "10",
          default_selected_color: "Gold",
          default_selected_memory: "64GB",
          stock_indicator_image: "/media/catalog/product/b/a/badge.png",
          stock_indicator_text: "jhjhgjhgjhkjhjkh",
          default_device_option: "deviceBundle",
          associated_device_product: [
            {
              name: "iPhone 8 64GB Gold",
              sku: "i8gld64GB",
              rrp: "3394.00",
              discounted_device_rrp: "1000.00",
              color: "Gold",
              memory: "64GB",
              order_color: "GLD",
              order_category: "HP",
              color_hexa: "#cdbeab",
              image: "/media/catalog/product/9/0/900x900_8_3.png",
              sub_images: [
                "/media/catalog/product/9/0/900x900_8_3.png",
                "/media/catalog/product/9/0/900x900_9_2.png",
                "/media/catalog/product/9/0/900x900_10_2.png"
              ],
              order_model: "IPHONE 8 64GB",
              part_number: "MDR5589",
              product_type: "HP",
              new_customer: "0",
              segment: null,
              contract: "24",
              upfront_installment: null,
              prices: {
                upfront_price: "350",
                device_price: "99",
                penalty_price: "500",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              name: "iPhone 8 64GB Space Grey ",
              sku: "i8grey64GB",
              rrp: "3394.00",
              discounted_device_rrp: "2395.00",
              color: "Grey",
              memory: "64GB",
              order_color: "GRY",
              order_category: "HP",
              color_hexa: "#808080",
              image: "/media/catalog/product/f/r/front_14.png",
              sub_images: [
                "/media/catalog/product/f/r/front_14.png",
                "/media/catalog/product/9/0/900x900_8_5.png",
                "/media/catalog/product/9/0/900x900_9_4.png"
              ],
              order_model: "IPHONE 8 64GB",
              part_number: "MDR5589",
              product_type: "HP",
              new_customer: "0",
              segment: null,
              contract: "24",
              upfront_installment: null,
              prices: {
                upfront_price: "350",
                device_price: "99",
                penalty_price: "500",
                supplementary_count: 0,
                special_price: 0
              }
            }
          ]
        },
        {
          name: "iPhone XS Max",
          sku: "iPhone-XS-Max",
          price: 0,
          quntity: null,
          order_monthly_pay: "188.00",
          most_popular: "0",
          rm: "3598.00",
          rrp_rm_strick_price: "5399.00",
          main_image: "/media/catalog/product/f/r/front_900x900_2_4_2.png",
          sub_images: [
            "/media/catalog/product/f/r/front_900x900_2_4_2.png"
          ],
          dimension: "157.5X77.4X7.7mm",
          weight: null,
          splash_water_dust_resistant: "0",
          stock: "Limited Stock",
          order_category: "HP",
          order_model: "IPHONE XS MAX 64GB",
          order_brand: "APPLE",
          segment: "10",
          default_selected_color: "Silver",
          default_selected_memory: "64GB",
          stock_indicator_image: "/media/catalog/product",
          stock_indicator_text: null,
          default_device_option: "easyPhone",
          associated_device_product: [
            {
              name: "iPhone XS Max 64GB Silver",
              sku: "iphonexsmax64gbsilver",
              rrp: "5399.00",
              discounted_device_rrp: "0.00",
              color: "Silver",
              memory: "64GB",
              order_color: "SLV",
              order_category: "HP",
              color_hexa: "#c0c0c0",
              image: "/media/catalog/product/f/r/front_900x900_19.png",
              sub_images: [
                "/media/catalog/product/f/r/front_900x900_19.png",
                "/media/catalog/product/b/a/back_900x900_18.png",
                "/media/catalog/product/s/i/side_900x900_20.png"
              ],
              order_model: "IPHONE XS MAX 646GB",
              part_number: "MDR6080",
              product_type: "HP",
              new_customer: "0",
              segment: "10",
              contract: "24",
              upfront_installment: null,
              prices: []
            },
            {
              name: "iPhone XS Max 64GB Space Grey",
              sku: "iphonexsmax64gbspacegrey",
              rrp: "5399.00",
              discounted_device_rrp: "0.00",
              color: "Grey",
              memory: "64GB",
              order_color: "GRY",
              order_category: "HP",
              color_hexa: "#808080",
              image: "/media/catalog/product/f/r/front_900x900_18.png",
              sub_images: [
                "/media/catalog/product/f/r/front_900x900_18.png",
                "/media/catalog/product/s/i/side_900x900_19.png",
                "/media/catalog/product/b/a/back_900x900_17.png"
              ],
              order_model: "IPHONE XS MAX 64GB",
              part_number: "MDR6080",
              product_type: "HP",
              new_customer: "0",
              segment: "10",
              contract: "24",
              upfront_installment: null,
              prices: []
            }
          ]
        },
        {
          name: "nubia Red Magic 3",
          sku: "Nubia-Red-Magic-3",
          price: 0,
          quntity: null,
          order_monthly_pay: "188.00",
          most_popular: "0",
          rm: "499.00",
          rrp_rm_strick_price: "2199.00",
          main_image: "/media/catalog/product/f/r/front-black_1.png",
          sub_images: [
            "/media/catalog/product/f/r/front-black_1.png",
            "/media/catalog/product/n/e/new_2.png"
          ],
          dimension: "171.7 X 78.5 X 9.6(6.6)mm",
          weight: null,
          splash_water_dust_resistant: "0",
          stock: "Limited Stock",
          order_category: "HP",
          order_model: "REDMAGIC3 128GB",
          order_brand: "NUBIA",
          segment: "10",
          default_selected_color: "Black",
          default_selected_memory: "128GB",
          stock_indicator_image: "/media/catalog/product/n/e/new_2.png",
          stock_indicator_text:
            '<span style="font-weight: bold; font-size: 12pt;">NEW LAUNCH</span><br /><span style="font-size: 10pt;">Get yours now. <a href="https://www.google.com/">here</a></span>',
          default_device_option: "deviceBundle",
          associated_device_product: [
            {
              name: "nubia Red Magic 3 Black",
              sku: "nubiaRedMagic3128gbblack",
              rrp: "2199.00",
              discounted_device_rrp: "0.00",
              color: "Black",
              memory: "128GB",
              order_color: "BLK",
              order_category: "HP",
              color_hexa: "#000000",
              image: "/media/catalog/product/f/r/front-black.png",
              sub_images: [
                "/media/catalog/product/f/r/front-black.png",
                "/media/catalog/product/r/i/right-side-black1.png",
                "/media/catalog/product/b/a/back-black.png"
              ],
              order_model: "REDMAGIC3 128GB",
              part_number: "MDR10053",
              product_type: "HP",
              new_customer: "0",
              segment: null,
              contract: "24",
              upfront_installment: null,
              prices: {
                upfront_price: "150",
                device_price: "1300",
                penalty_price: "850",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              name: "nubia Red Magic 3 Red",
              sku: "nubiaRedMagic3128gbred",
              rrp: "2199.00",
              discounted_device_rrp: "0.00",
              color: "Red",
              memory: "128GB",
              order_color: "RED",
              order_category: "HP",
              color_hexa: "#b9253b",
              image: "/media/catalog/product/f/r/front-red.png",
              sub_images: [
                "/media/catalog/product/f/r/front-red.png",
                "/media/catalog/product/r/i/right-side-red1.png",
                "/media/catalog/product/b/a/back-red.png"
              ],
              order_model: "REDMAGIC3 128GB",
              part_number: "MDR10053",
              product_type: "HP",
              new_customer: "0",
              segment: null,
              contract: "24",
              upfront_installment: null,
              prices: []
            }
          ]
        }
      ];
      configureTestSuite(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([]),
          materialModules
        ],
        declarations: [
          MoonPlanWithPassDetailsComponent,
          PageLoaderComponent,
          DetailBannerTextLeftComponent,
          MoonStickySummarySectionComponent,
          MoonSummarySectionComponent,
          MoonPlanWithDeviceDetailsComponent,
          NotificationErrorComponent,
          DeviceDetailsStorageComponent,
          DeviceDetailsNumberComponent,
          LosingSupplementaryLinePopupComponent,
          MoonColorStorageComponent,
          SupplementaryLinesComponent,
          DeviceSupplementaryLinesComponent,
          CobpComponent,
          NoteSectionComponent,
          ChooseYourWayComponent,
          MoreSupplementaryPopupComponent,
          AgeEligibilityPopupComponent,
          NotificationErrorComponent,
          NotificationBarComponent,
          DeviceDisclaimerComponent,
          SwitchToCelcomComponent,
          NricInputComponent,
          sharedPipes,
          MsisdnInputComponent,
          OtpInputComponent,
          SearchHighlight,
          OmniBannerComponent
        ],
        providers: [
          { provide: AppService, useClass: AppMockService },
          { provide: Router, useClass: RouterStub },
          {
            provide: ActivatedRoute,
            useClass: MockactivatedRoute
          },
          EStoreAnalysticsService,
          AnalyticsService,
          RendererService,
          SeoService,
          DecimalPipe,
          Broadcaster,
          NotificationPopupEvent,
          CookieService,
          UserService,
          CartService,
          BundleService,
          OrderInfoService,
          RedirectionService,
          SupplimentaryLinesService,
          HttpClient,
          BroadbandService,
          DeviceDataService,
          CommonUtilService,
          MoonPlanWithPassDetailsService,
          PlanPurchaseService,
          HomeService,
          ProductService
        ]
      });
      });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(MoonPlanWithDeviceDetailsComponent);
        component = fixture.componentInstance;
      }
    ));
    it("should create Plan with Device Details Component", () => {
      expect(component).toBeTruthy();
    });
    it("show device", () => {
        component.showDevices();
        expect(component.hideDevices).toBeFalsy();
      });
      it("show device", () => {
        spyOn(component, "removeSelectedDevice");
        component.hideDeviceSection();
        expect(component.hideDevices).toBeTruthy();
        expect(component.removeSelectedDevice).toHaveBeenCalled();
      });
      it("canceling switch", () => {
        component.onCancellingSwitchingDeviceTab();
        expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
      });
      it("ngoninit", () => {
        component.deviceDataForAddonPass = response;
        component.editProduct = null;
        component.selectedDevice = null;
        component.SelectionAferLogin = null;
        component.ngOnInit();
        expect(component.deviceSelected).toBe(null);
        expect(component.data).toBe(component.deviceDataForAddonPass);
      });
      it('cobploading', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        component.ngOnInit();
        devicedataservice.publishCobpLoading(false);
        expect(component.cobpLoading).toBe(false);
      }));
      it('selected color', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        component.ngOnInit();
        devicedataservice.publishColor("Red");
        expect(component.SelectedDeviceColor).toBe("Red");
      }));
      it('selected memory', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        component.ngOnInit();
        devicedataservice.publishStorage("64GB");
        expect(component.SelectedDeviceMemory).toBe("64GB");
      }));
      it('Should test selectDevice', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        let data = {"name":"Oppo F5","sku":"Oppo-F5","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"1","rm":"0.00","rrp_rm_strick_price":"1224.55","main_image":"/media/catalog/product/f/r/front_1_7.png","sub_images":["/media/catalog/product/f/r/front_1_7.png"],"dimension":"155.9 ×75.8 × 7.7mm ","weight":"195.0000","splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":" MT6763T","order_brand":"OPPO","segment":"10","default_selected_color":"Gold","default_selected_memory":"32GB","stock_indicator_image":"/media/catalog/product","stock_indicator_text":null,"default_device_option":"easyPhone","associated_device_product":[{"name":"Oppo F5 32GB Gold ","sku":"oppf5gld32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Gold","memory":"32GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/f/r/front_1_6.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_1_6.png","/media/catalog/product/9/0/900x900_5_2.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"Oppo F5 32GB Black","sku":"oppf5b32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Black","memory":"32GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_64.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_64.png","/media/catalog/product/9/0/900x900_8.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}}],"ProductType":"moon","deviceIndex":0,"selectedMemoryIndex":0}
        //2
        component.colorMemoryInfo = [{"color":"Gold","memory":"32GB","sku":"Oppo-F5","stock":""},{"color":"Gold","memory":"64GB","sku":"iPhone-8","stock":""},{"color":"Black","memory":"128GB","sku":"Nubia-Red-Magic-3","stock":""},{"color":"Black","memory":"128GB","sku":"Samsung-Galaxy-A50","stock":""}]
        component.SelectedDeviceColor = 'Black';
        component.SelectedDeviceMemory = '128GB';
        component.selectedDeviceInfo = {"price":"","name":"","sku":"","imagePath":"","upfrontPrice":"","devicePrice":"","totalPrice":"","contract":""};
        localStorage.setItem('SelectedPlanDetails',JSON.stringify({"name":"XP Lite Plan","sku":"xp-b-plan","offer":"20 Cents/Min Calls and SMS To All Networks","selected_offer_title":null,"monthly_plan":"28.00","data_limit":"2","order_plan_bundle":"PB12828","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP Lite Plan","plan_title":"Base Plan","plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"2 GB","key_text":"RM 20","image_url":"/media/catalog/product","device_allowed":null,"selected_pass":false,"bundleSku":"xp-lite","bundleName":"Xp Lite","url_key":"xp-lite","isMoon":true,"selectedPass":{"name":"XP L Pass","sku":"xp-l-pass","offer":"11GB Internet\r\nFree 3GB Video Walla\r\nFree* 1 hour Ultra Hour Pass™ daily","selected_offer_title":null,"monthly_plan":"40.00","data_limit":"10","order_plan_bundle":"CPT12829","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"10 GB","key_text":"RM 40","image_url":"/media/catalog/product","device_allowed":"1","selected_pass":false,"associated_bundle_product":[{"name":"Oppo F5","sku":"Oppo-F5","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"1","rm":"0.00","rrp_rm_strick_price":"1224.55","main_image":"/media/catalog/product/f/r/front_1_7.png","sub_images":["/media/catalog/product/f/r/front_1_7.png"],"dimension":"155.9 ×75.8 × 7.7mm ","weight":"195.0000","splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":" MT6763T","order_brand":"OPPO","segment":"10","default_selected_color":"Gold","default_selected_memory":"32GB","stock_indicator_image":"/media/catalog/product","stock_indicator_text":null,"default_device_option":"easyPhone","associated_device_product":[{"name":"Oppo F5 32GB Gold ","sku":"oppf5gld32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Gold","memory":"32GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/f/r/front_1_6.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_1_6.png","/media/catalog/product/9/0/900x900_5_2.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"Oppo F5 32GB Black","sku":"oppf5b32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Black","memory":"32GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_64.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_64.png","/media/catalog/product/9/0/900x900_8.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}}]},{"name":"iPhone 8","sku":"iPhone-8","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"1748.00","rrp_rm_strick_price":"3394.00","main_image":"/media/catalog/product/f/r/front_55.png","sub_images":["/media/catalog/product/f/r/front_55.png","/media/catalog/product/b/a/badge.png"],"dimension":"138.4 x 67.3 x 7.3","weight":"195.0000","splash_water_dust_resistant":"1","stock":"Limited Stock","order_category":"HP","order_model":"Apple A10 Fusion","order_brand":"APPLE","segment":"10","default_selected_color":"Gold","default_selected_memory":"64GB","stock_indicator_image":"/media/catalog/product/b/a/badge.png","stock_indicator_text":"jhjhgjhgjhkjhjkh","default_device_option":"deviceBundle","associated_device_product":[{"name":"iPhone 8 64GB Gold","sku":"i8gld64GB","rrp":"3394.00","discounted_device_rrp":"1000.00","color":"Gold","memory":"64GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/9/0/900x900_8_3.png","desc":"24 months contract","sub_images":["/media/catalog/product/9/0/900x900_8_3.png","/media/catalog/product/9/0/900x900_9_2.png","/media/catalog/product/9/0/900x900_10_2.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"iPhone 8 64GB Space Grey ","sku":"i8grey64GB","rrp":"3394.00","discounted_device_rrp":"2395.00","color":"Grey","memory":"64GB","order_color":"GRY","order_category":"HP","color_hexa":"#808080","image":"/media/catalog/product/f/r/front_14.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_14.png","/media/catalog/product/9/0/900x900_8_5.png","/media/catalog/product/9/0/900x900_9_4.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}}]},{"name":"nubia Red Magic 3","sku":"Nubia-Red-Magic-3","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"499.00","rrp_rm_strick_price":"2199.00","main_image":"/media/catalog/product/f/r/front-black_1.png","sub_images":["/media/catalog/product/f/r/front-black_1.png","/media/catalog/product/n/e/new_2.png"],"dimension":"171.7 X 78.5 X 9.6(6.6)mm","weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":"REDMAGIC3 128GB","order_brand":"NUBIA","segment":"10","default_selected_color":"Black","default_selected_memory":"128GB","stock_indicator_image":"/media/catalog/product/n/e/new_2.png","stock_indicator_text":"<span style=\"font-weight: bold; font-size: 12pt;\">NEW LAUNCH</span><br /><span style=\"font-size: 10pt;\">Get yours now. <a href=\"https://www.google.com/\">here</a></span>","default_device_option":"deviceBundle","associated_device_product":[{"name":"nubia Red Magic 3 Black","sku":"nubiaRedMagic3128gbblack","rrp":"2199.00","discounted_device_rrp":"0.00","color":"Black","memory":"128GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front-black.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front-black.png","/media/catalog/product/r/i/right-side-black1.png","/media/catalog/product/b/a/back-black.png"],"order_model":"REDMAGIC3 128GB","part_number":"MDR10053","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"150","device_price":"1358","penalty_price":"850","supplementary_count":0,"special_price":0}},{"name":"nubia Red Magic 3 Red","sku":"nubiaRedMagic3128gbred","rrp":"2199.00","discounted_device_rrp":"0.00","color":"Red","memory":"128GB","order_color":"RED","order_category":"HP","color_hexa":"#b9253b","image":"/media/catalog/product/f/r/front-red.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front-red.png","/media/catalog/product/r/i/right-side-red1.png","/media/catalog/product/b/a/back-red.png"],"order_model":"REDMAGIC3 128GB","part_number":"MDR10053","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"150","device_price":"1358","penalty_price":"850","supplementary_count":0,"special_price":0}}]},{"name":"Samsung Galaxy A50","sku":"Samsung-Galaxy-A50","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"0.00","rrp_rm_strick_price":"1199.00","main_image":"/media/catalog/product/a/5/a50_white_900x900.png","sub_images":["/media/catalog/product/a/5/a50_white_900x900.png","/media/catalog/product/n/e/new_3.png"],"dimension":null,"weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":"GALAXY A50 128GB","order_brand":"SAMSUNG","segment":"10","default_selected_color":"Black","default_selected_memory":"128GB","stock_indicator_image":"/media/catalog/product/n/e/new_3.png","stock_indicator_text":"<p style=\"margin:0\"><strong>NEW LAUNCH</strong></p>\r\n<p style=\"margin:0\">Get FREE exclusive Blackpink official merchandise* with Galaxy A50. </p>\r\n<span style=\"font-size: 7.0pt;margin-top:0\">*The merchandise are available on a first-come, first-served basis and while stock last.</span>","default_device_option":"deviceBundle","associated_device_product":[{"name":"Samsung Galaxy A50 Black","sku":"SamsungGalaxyA50128gbblack","rrp":"1199.00","discounted_device_rrp":"0.00","color":"Black","memory":"128GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_900x900_7.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900.jpg","/media/catalog/product/f/r/front_900x900_7.png","/media/catalog/product/s/i/side_900x900_5.png","/media/catalog/product/b/a/back_900x900_10.png","/media/catalog/product/i/m/image_carousel_-_a50.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"550","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}},{"name":"Samsung Galaxy A50 White","sku":"SamsungGalaxyA50128gbwhite","rrp":"1199.00","discounted_device_rrp":"0.00","color":"White","memory":"128GB","order_color":"WHT","order_category":"HP","color_hexa":"#ffffff","image":"/media/catalog/product/f/r/front_900x900_1_11.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900_1.jpg","/media/catalog/product/f/r/front_900x900_1_11.png","/media/catalog/product/s/i/side_900x900_1_10.png","/media/catalog/product/b/a/back_900x900_1_10.png","/media/catalog/product/i/m/image_carousel_-_a50_1.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"700","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}},{"name":"Samsung Galaxy A50 Blue","sku":"SamsungGalaxyA50128gbblue","rrp":"1199.00","discounted_device_rrp":"0.00","color":"Blue","memory":"128GB","order_color":"BLU","order_category":"HP","color_hexa":"#48a5d0","image":"/media/catalog/product/f/r/front_900x900_2_15.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900_2.jpg","/media/catalog/product/f/r/front_900x900_2_15.png","/media/catalog/product/s/i/side_900x900_2_14.png","/media/catalog/product/b/a/back_900x900_2_3.png","/media/catalog/product/i/m/image_carousel_-_a50_2.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"700","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}}]}]}}))
        component.selectDevice(data,2);
      }));
      it('Should test onContinueSwitchingDeviceTab', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.colorMemoryInfo = [{"color":"Gold","memory":"32GB","sku":"Oppo-F5","stock":""},{"color":"Gold","memory":"64GB","sku":"iPhone-8","stock":""},{"color":"Black","memory":"128GB","sku":"Nubia-Red-Magic-3","stock":""},{"color":"Black","memory":"128GB","sku":"Samsung-Galaxy-A50","stock":""}]
        component.selectedDeviceObj = {"name":"iPhone 8","sku":"iPhone-8","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"1748.00","rrp_rm_strick_price":"3394.00","main_image":"/media/catalog/product/f/r/front_55.png","sub_images":["/media/catalog/product/f/r/front_55.png","/media/catalog/product/b/a/badge.png"],"dimension":"138.4 x 67.3 x 7.3","weight":"195.0000","splash_water_dust_resistant":"1","stock":"Limited Stock","order_category":"HP","order_model":"Apple A10 Fusion","order_brand":"APPLE","segment":"10","default_selected_color":"Gold","default_selected_memory":"64GB","stock_indicator_image":"/media/catalog/product/b/a/badge.png","stock_indicator_text":"jhjhgjhgjhkjhjkh","default_device_option":"deviceBundle","associated_device_product":[{"name":"iPhone 8 64GB Gold","sku":"i8gld64GB","rrp":"3394.00","discounted_device_rrp":"1000.00","color":"Gold","memory":"64GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/9/0/900x900_8_3.png","desc":"24 months contract","sub_images":["/media/catalog/product/9/0/900x900_8_3.png","/media/catalog/product/9/0/900x900_9_2.png","/media/catalog/product/9/0/900x900_10_2.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"iPhone 8 64GB Space Grey ","sku":"i8grey64GB","rrp":"3394.00","discounted_device_rrp":"2395.00","color":"Grey","memory":"64GB","order_color":"GRY","order_category":"HP","color_hexa":"#808080","image":"/media/catalog/product/f/r/front_14.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_14.png","/media/catalog/product/9/0/900x900_8_5.png","/media/catalog/product/9/0/900x900_9_4.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}}],"ProductType":"moon","deviceIndex":1,"selectedMemoryIndex":0,"SelectedDeviceColor":"Gold","selectedDeviceMemory":"64GB","imagePath":"/media/catalog/product/9/0/900x900_8_3.png","contract":"24 months contract"};
        component.popupActionType = 'add';
        component.SelectedDeviceMemory = '128GB';
        component.selectedDeviceInfo = {"price":"","name":"","sku":"","imagePath":"","upfrontPrice":"","devicePrice":"","totalPrice":"","contract":""};
        localStorage.setItem('SelectedPlanDetails',JSON.stringify({"name":"XP Lite Plan","sku":"xp-b-plan","offer":"20 Cents/Min Calls and SMS To All Networks","selected_offer_title":null,"monthly_plan":"28.00","data_limit":"2","order_plan_bundle":"PB12828","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP Lite Plan","plan_title":"Base Plan","plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"2 GB","key_text":"RM 20","image_url":"/media/catalog/product","device_allowed":null,"selected_pass":false,"bundleSku":"xp-lite","bundleName":"Xp Lite","url_key":"xp-lite","isMoon":true,"selectedPass":{"name":"XP L Pass","sku":"xp-l-pass","offer":"11GB Internet\r\nFree 3GB Video Walla\r\nFree* 1 hour Ultra Hour Pass™ daily","selected_offer_title":null,"monthly_plan":"40.00","data_limit":"10","order_plan_bundle":"CPT12829","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"10 GB","key_text":"RM 40","image_url":"/media/catalog/product","device_allowed":"1","selected_pass":false,"associated_bundle_product":[{"name":"Oppo F5","sku":"Oppo-F5","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"1","rm":"0.00","rrp_rm_strick_price":"1224.55","main_image":"/media/catalog/product/f/r/front_1_7.png","sub_images":["/media/catalog/product/f/r/front_1_7.png"],"dimension":"155.9 ×75.8 × 7.7mm ","weight":"195.0000","splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":" MT6763T","order_brand":"OPPO","segment":"10","default_selected_color":"Gold","default_selected_memory":"32GB","stock_indicator_image":"/media/catalog/product","stock_indicator_text":null,"default_device_option":"easyPhone","associated_device_product":[{"name":"Oppo F5 32GB Gold ","sku":"oppf5gld32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Gold","memory":"32GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/f/r/front_1_6.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_1_6.png","/media/catalog/product/9/0/900x900_5_2.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"Oppo F5 32GB Black","sku":"oppf5b32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Black","memory":"32GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_64.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_64.png","/media/catalog/product/9/0/900x900_8.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}}]},{"name":"iPhone 8","sku":"iPhone-8","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"1748.00","rrp_rm_strick_price":"3394.00","main_image":"/media/catalog/product/f/r/front_55.png","sub_images":["/media/catalog/product/f/r/front_55.png","/media/catalog/product/b/a/badge.png"],"dimension":"138.4 x 67.3 x 7.3","weight":"195.0000","splash_water_dust_resistant":"1","stock":"Limited Stock","order_category":"HP","order_model":"Apple A10 Fusion","order_brand":"APPLE","segment":"10","default_selected_color":"Gold","default_selected_memory":"64GB","stock_indicator_image":"/media/catalog/product/b/a/badge.png","stock_indicator_text":"jhjhgjhgjhkjhjkh","default_device_option":"deviceBundle","associated_device_product":[{"name":"iPhone 8 64GB Gold","sku":"i8gld64GB","rrp":"3394.00","discounted_device_rrp":"1000.00","color":"Gold","memory":"64GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/9/0/900x900_8_3.png","desc":"24 months contract","sub_images":["/media/catalog/product/9/0/900x900_8_3.png","/media/catalog/product/9/0/900x900_9_2.png","/media/catalog/product/9/0/900x900_10_2.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"iPhone 8 64GB Space Grey ","sku":"i8grey64GB","rrp":"3394.00","discounted_device_rrp":"2395.00","color":"Grey","memory":"64GB","order_color":"GRY","order_category":"HP","color_hexa":"#808080","image":"/media/catalog/product/f/r/front_14.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_14.png","/media/catalog/product/9/0/900x900_8_5.png","/media/catalog/product/9/0/900x900_9_4.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}}]},{"name":"nubia Red Magic 3","sku":"Nubia-Red-Magic-3","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"499.00","rrp_rm_strick_price":"2199.00","main_image":"/media/catalog/product/f/r/front-black_1.png","sub_images":["/media/catalog/product/f/r/front-black_1.png","/media/catalog/product/n/e/new_2.png"],"dimension":"171.7 X 78.5 X 9.6(6.6)mm","weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":"REDMAGIC3 128GB","order_brand":"NUBIA","segment":"10","default_selected_color":"Black","default_selected_memory":"128GB","stock_indicator_image":"/media/catalog/product/n/e/new_2.png","stock_indicator_text":"<span style=\"font-weight: bold; font-size: 12pt;\">NEW LAUNCH</span><br /><span style=\"font-size: 10pt;\">Get yours now. <a href=\"https://www.google.com/\">here</a></span>","default_device_option":"deviceBundle","associated_device_product":[{"name":"nubia Red Magic 3 Black","sku":"nubiaRedMagic3128gbblack","rrp":"2199.00","discounted_device_rrp":"0.00","color":"Black","memory":"128GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front-black.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front-black.png","/media/catalog/product/r/i/right-side-black1.png","/media/catalog/product/b/a/back-black.png"],"order_model":"REDMAGIC3 128GB","part_number":"MDR10053","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"150","device_price":"1358","penalty_price":"850","supplementary_count":0,"special_price":0}},{"name":"nubia Red Magic 3 Red","sku":"nubiaRedMagic3128gbred","rrp":"2199.00","discounted_device_rrp":"0.00","color":"Red","memory":"128GB","order_color":"RED","order_category":"HP","color_hexa":"#b9253b","image":"/media/catalog/product/f/r/front-red.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front-red.png","/media/catalog/product/r/i/right-side-red1.png","/media/catalog/product/b/a/back-red.png"],"order_model":"REDMAGIC3 128GB","part_number":"MDR10053","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"150","device_price":"1358","penalty_price":"850","supplementary_count":0,"special_price":0}}]},{"name":"Samsung Galaxy A50","sku":"Samsung-Galaxy-A50","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"0.00","rrp_rm_strick_price":"1199.00","main_image":"/media/catalog/product/a/5/a50_white_900x900.png","sub_images":["/media/catalog/product/a/5/a50_white_900x900.png","/media/catalog/product/n/e/new_3.png"],"dimension":null,"weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":"GALAXY A50 128GB","order_brand":"SAMSUNG","segment":"10","default_selected_color":"Black","default_selected_memory":"128GB","stock_indicator_image":"/media/catalog/product/n/e/new_3.png","stock_indicator_text":"<p style=\"margin:0\"><strong>NEW LAUNCH</strong></p>\r\n<p style=\"margin:0\">Get FREE exclusive Blackpink official merchandise* with Galaxy A50. </p>\r\n<span style=\"font-size: 7.0pt;margin-top:0\">*The merchandise are available on a first-come, first-served basis and while stock last.</span>","default_device_option":"deviceBundle","associated_device_product":[{"name":"Samsung Galaxy A50 Black","sku":"SamsungGalaxyA50128gbblack","rrp":"1199.00","discounted_device_rrp":"0.00","color":"Black","memory":"128GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_900x900_7.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900.jpg","/media/catalog/product/f/r/front_900x900_7.png","/media/catalog/product/s/i/side_900x900_5.png","/media/catalog/product/b/a/back_900x900_10.png","/media/catalog/product/i/m/image_carousel_-_a50.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"550","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}},{"name":"Samsung Galaxy A50 White","sku":"SamsungGalaxyA50128gbwhite","rrp":"1199.00","discounted_device_rrp":"0.00","color":"White","memory":"128GB","order_color":"WHT","order_category":"HP","color_hexa":"#ffffff","image":"/media/catalog/product/f/r/front_900x900_1_11.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900_1.jpg","/media/catalog/product/f/r/front_900x900_1_11.png","/media/catalog/product/s/i/side_900x900_1_10.png","/media/catalog/product/b/a/back_900x900_1_10.png","/media/catalog/product/i/m/image_carousel_-_a50_1.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"700","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}},{"name":"Samsung Galaxy A50 Blue","sku":"SamsungGalaxyA50128gbblue","rrp":"1199.00","discounted_device_rrp":"0.00","color":"Blue","memory":"128GB","order_color":"BLU","order_category":"HP","color_hexa":"#48a5d0","image":"/media/catalog/product/f/r/front_900x900_2_15.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900_2.jpg","/media/catalog/product/f/r/front_900x900_2_15.png","/media/catalog/product/s/i/side_900x900_2_14.png","/media/catalog/product/b/a/back_900x900_2_3.png","/media/catalog/product/i/m/image_carousel_-_a50_2.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"700","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}}]}]}}))
        component.onContinueSwitchingDeviceTab();
      }));
      it('Should test  with remove flag onContinueSwitchingDeviceTab', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.colorMemoryInfo = [{"color":"Gold","memory":"32GB","sku":"Oppo-F5","stock":""},{"color":"Gold","memory":"64GB","sku":"iPhone-8","stock":""},{"color":"Black","memory":"128GB","sku":"Nubia-Red-Magic-3","stock":""},{"color":"Black","memory":"128GB","sku":"Samsung-Galaxy-A50","stock":""}]
        component.selectedDeviceObj = {"name":"iPhone 8","sku":"iPhone-8","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"1748.00","rrp_rm_strick_price":"3394.00","main_image":"/media/catalog/product/f/r/front_55.png","sub_images":["/media/catalog/product/f/r/front_55.png","/media/catalog/product/b/a/badge.png"],"dimension":"138.4 x 67.3 x 7.3","weight":"195.0000","splash_water_dust_resistant":"1","stock":"Limited Stock","order_category":"HP","order_model":"Apple A10 Fusion","order_brand":"APPLE","segment":"10","default_selected_color":"Gold","default_selected_memory":"64GB","stock_indicator_image":"/media/catalog/product/b/a/badge.png","stock_indicator_text":"jhjhgjhgjhkjhjkh","default_device_option":"deviceBundle","associated_device_product":[{"name":"iPhone 8 64GB Gold","sku":"i8gld64GB","rrp":"3394.00","discounted_device_rrp":"1000.00","color":"Gold","memory":"64GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/9/0/900x900_8_3.png","desc":"24 months contract","sub_images":["/media/catalog/product/9/0/900x900_8_3.png","/media/catalog/product/9/0/900x900_9_2.png","/media/catalog/product/9/0/900x900_10_2.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"iPhone 8 64GB Space Grey ","sku":"i8grey64GB","rrp":"3394.00","discounted_device_rrp":"2395.00","color":"Grey","memory":"64GB","order_color":"GRY","order_category":"HP","color_hexa":"#808080","image":"/media/catalog/product/f/r/front_14.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_14.png","/media/catalog/product/9/0/900x900_8_5.png","/media/catalog/product/9/0/900x900_9_4.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}}],"ProductType":"moon","deviceIndex":1,"selectedMemoryIndex":0,"SelectedDeviceColor":"Gold","selectedDeviceMemory":"64GB","imagePath":"/media/catalog/product/9/0/900x900_8_3.png","contract":"24 months contract"};
        component.popupActionType = 'remove';
        component.SelectedDeviceMemory = '128GB';
        component.selectedDeviceInfo = {"price":"","name":"","sku":"","imagePath":"","upfrontPrice":"","devicePrice":"","totalPrice":"","contract":""};
        localStorage.setItem('SelectedPlanDetails',JSON.stringify({"name":"XP Lite Plan","sku":"xp-b-plan","offer":"20 Cents/Min Calls and SMS To All Networks","selected_offer_title":null,"monthly_plan":"28.00","data_limit":"2","order_plan_bundle":"PB12828","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP Lite Plan","plan_title":"Base Plan","plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"2 GB","key_text":"RM 20","image_url":"/media/catalog/product","device_allowed":null,"selected_pass":false,"bundleSku":"xp-lite","bundleName":"Xp Lite","url_key":"xp-lite","isMoon":true,"selectedPass":{"name":"XP L Pass","sku":"xp-l-pass","offer":"11GB Internet\r\nFree 3GB Video Walla\r\nFree* 1 hour Ultra Hour Pass™ daily","selected_offer_title":null,"monthly_plan":"40.00","data_limit":"10","order_plan_bundle":"CPT12829","segment":null,"upfront_installment":null,"contract":null,"plan_name":"XP L Pass","plan_title":null,"plan_subtitle":null,"product_type":null,"product_text":null,"key_figures_text":"10 GB","key_text":"RM 40","image_url":"/media/catalog/product","device_allowed":"1","selected_pass":false,"associated_bundle_product":[{"name":"Oppo F5","sku":"Oppo-F5","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"1","rm":"0.00","rrp_rm_strick_price":"1224.55","main_image":"/media/catalog/product/f/r/front_1_7.png","sub_images":["/media/catalog/product/f/r/front_1_7.png"],"dimension":"155.9 ×75.8 × 7.7mm ","weight":"195.0000","splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":" MT6763T","order_brand":"OPPO","segment":"10","default_selected_color":"Gold","default_selected_memory":"32GB","stock_indicator_image":"/media/catalog/product","stock_indicator_text":null,"default_device_option":"easyPhone","associated_device_product":[{"name":"Oppo F5 32GB Gold ","sku":"oppf5gld32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Gold","memory":"32GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/f/r/front_1_6.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_1_6.png","/media/catalog/product/9/0/900x900_5_2.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"Oppo F5 32GB Black","sku":"oppf5b32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Black","memory":"32GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_64.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_64.png","/media/catalog/product/9/0/900x900_8.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}}]},{"name":"iPhone 8","sku":"iPhone-8","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"1748.00","rrp_rm_strick_price":"3394.00","main_image":"/media/catalog/product/f/r/front_55.png","sub_images":["/media/catalog/product/f/r/front_55.png","/media/catalog/product/b/a/badge.png"],"dimension":"138.4 x 67.3 x 7.3","weight":"195.0000","splash_water_dust_resistant":"1","stock":"Limited Stock","order_category":"HP","order_model":"Apple A10 Fusion","order_brand":"APPLE","segment":"10","default_selected_color":"Gold","default_selected_memory":"64GB","stock_indicator_image":"/media/catalog/product/b/a/badge.png","stock_indicator_text":"jhjhgjhgjhkjhjkh","default_device_option":"deviceBundle","associated_device_product":[{"name":"iPhone 8 64GB Gold","sku":"i8gld64GB","rrp":"3394.00","discounted_device_rrp":"1000.00","color":"Gold","memory":"64GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/9/0/900x900_8_3.png","desc":"24 months contract","sub_images":["/media/catalog/product/9/0/900x900_8_3.png","/media/catalog/product/9/0/900x900_9_2.png","/media/catalog/product/9/0/900x900_10_2.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"iPhone 8 64GB Space Grey ","sku":"i8grey64GB","rrp":"3394.00","discounted_device_rrp":"2395.00","color":"Grey","memory":"64GB","order_color":"GRY","order_category":"HP","color_hexa":"#808080","image":"/media/catalog/product/f/r/front_14.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_14.png","/media/catalog/product/9/0/900x900_8_5.png","/media/catalog/product/9/0/900x900_9_4.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}}]},{"name":"nubia Red Magic 3","sku":"Nubia-Red-Magic-3","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"499.00","rrp_rm_strick_price":"2199.00","main_image":"/media/catalog/product/f/r/front-black_1.png","sub_images":["/media/catalog/product/f/r/front-black_1.png","/media/catalog/product/n/e/new_2.png"],"dimension":"171.7 X 78.5 X 9.6(6.6)mm","weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":"REDMAGIC3 128GB","order_brand":"NUBIA","segment":"10","default_selected_color":"Black","default_selected_memory":"128GB","stock_indicator_image":"/media/catalog/product/n/e/new_2.png","stock_indicator_text":"<span style=\"font-weight: bold; font-size: 12pt;\">NEW LAUNCH</span><br /><span style=\"font-size: 10pt;\">Get yours now. <a href=\"https://www.google.com/\">here</a></span>","default_device_option":"deviceBundle","associated_device_product":[{"name":"nubia Red Magic 3 Black","sku":"nubiaRedMagic3128gbblack","rrp":"2199.00","discounted_device_rrp":"0.00","color":"Black","memory":"128GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front-black.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front-black.png","/media/catalog/product/r/i/right-side-black1.png","/media/catalog/product/b/a/back-black.png"],"order_model":"REDMAGIC3 128GB","part_number":"MDR10053","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"150","device_price":"1358","penalty_price":"850","supplementary_count":0,"special_price":0}},{"name":"nubia Red Magic 3 Red","sku":"nubiaRedMagic3128gbred","rrp":"2199.00","discounted_device_rrp":"0.00","color":"Red","memory":"128GB","order_color":"RED","order_category":"HP","color_hexa":"#b9253b","image":"/media/catalog/product/f/r/front-red.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front-red.png","/media/catalog/product/r/i/right-side-red1.png","/media/catalog/product/b/a/back-red.png"],"order_model":"REDMAGIC3 128GB","part_number":"MDR10053","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"150","device_price":"1358","penalty_price":"850","supplementary_count":0,"special_price":0}}]},{"name":"Samsung Galaxy A50","sku":"Samsung-Galaxy-A50","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"0.00","rrp_rm_strick_price":"1199.00","main_image":"/media/catalog/product/a/5/a50_white_900x900.png","sub_images":["/media/catalog/product/a/5/a50_white_900x900.png","/media/catalog/product/n/e/new_3.png"],"dimension":null,"weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":"GALAXY A50 128GB","order_brand":"SAMSUNG","segment":"10","default_selected_color":"Black","default_selected_memory":"128GB","stock_indicator_image":"/media/catalog/product/n/e/new_3.png","stock_indicator_text":"<p style=\"margin:0\"><strong>NEW LAUNCH</strong></p>\r\n<p style=\"margin:0\">Get FREE exclusive Blackpink official merchandise* with Galaxy A50. </p>\r\n<span style=\"font-size: 7.0pt;margin-top:0\">*The merchandise are available on a first-come, first-served basis and while stock last.</span>","default_device_option":"deviceBundle","associated_device_product":[{"name":"Samsung Galaxy A50 Black","sku":"SamsungGalaxyA50128gbblack","rrp":"1199.00","discounted_device_rrp":"0.00","color":"Black","memory":"128GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_900x900_7.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900.jpg","/media/catalog/product/f/r/front_900x900_7.png","/media/catalog/product/s/i/side_900x900_5.png","/media/catalog/product/b/a/back_900x900_10.png","/media/catalog/product/i/m/image_carousel_-_a50.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"550","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}},{"name":"Samsung Galaxy A50 White","sku":"SamsungGalaxyA50128gbwhite","rrp":"1199.00","discounted_device_rrp":"0.00","color":"White","memory":"128GB","order_color":"WHT","order_category":"HP","color_hexa":"#ffffff","image":"/media/catalog/product/f/r/front_900x900_1_11.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900_1.jpg","/media/catalog/product/f/r/front_900x900_1_11.png","/media/catalog/product/s/i/side_900x900_1_10.png","/media/catalog/product/b/a/back_900x900_1_10.png","/media/catalog/product/i/m/image_carousel_-_a50_1.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"700","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}},{"name":"Samsung Galaxy A50 Blue","sku":"SamsungGalaxyA50128gbblue","rrp":"1199.00","discounted_device_rrp":"0.00","color":"Blue","memory":"128GB","order_color":"BLU","order_category":"HP","color_hexa":"#48a5d0","image":"/media/catalog/product/f/r/front_900x900_2_15.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900_2.jpg","/media/catalog/product/f/r/front_900x900_2_15.png","/media/catalog/product/s/i/side_900x900_2_14.png","/media/catalog/product/b/a/back_900x900_2_3.png","/media/catalog/product/i/m/image_carousel_-_a50_2.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"700","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}}]}]}}))
        component.onContinueSwitchingDeviceTab();
      }));
      it('Should test  with remove flag onContinueSwitchingDeviceTab', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        let data = {
          "quantity":1,"item_id":"42640","itemTotal":"1010.0000","price":1010,"selectedProduct":{"orderMonthlyPayTotal":68,"is_moon":true,"orderPlanName":"XP Lite Plan","orderPlan":"xp-b-plan","urlKey":"base-pan","selectedProductSku":"oppf5gld32gb","orderMonthlyPay":"28.0000","plan_image_url":"/media/catalog/product","orderOneTimePay":"1000.00","eligibilty":null,"orderPhoneNo":"0133402843","orderNumberType":"NewNumber","orderReqPlanComponent":[{"component_name":"Executive Plan VAS without GPRS_92378","component_part_no":"CPT04540","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"New Package for IDD Activation","component_part_no":"CPT07020","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Default International Roaming Voice/SMS","component_part_no":"CPT13540","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"SIM Card","component_part_no":"SM00010","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Advance Payment CBS","component_part_no":"OTC09280","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Blank SIM Starter Pack","component_part_no":"SP00210","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Stamp Fee_92382","component_part_no":"OTC00350","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"International Roaming Data","component_part_no":"NVF01000","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Rebate DDR RTP","component_part_no":"DNR5960","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Social Roam Pass","component_part_no":"NVF12828","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Commitment Fee CBS","component_part_no":"CPT12828","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null}],"selectedPlanDetails":{"name":"XP Lite Plan","sku":"xp-b-plan","urlKey":"base-pan","monthly_plan":"28.0000","order_plan_bundle":"PB12828","order_service_bundle":"RTP0010","order_plan_component":[{"component_name":"Executive Plan VAS without GPRS_92378","component_part_no":"CPT04540","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"New Package for IDD Activation","component_part_no":"CPT07020","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Default International Roaming Voice/SMS","component_part_no":"CPT13540","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"SIM Card","component_part_no":"SM00010","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Advance Payment CBS","component_part_no":"OTC09280","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Blank SIM Starter Pack","component_part_no":"SP00210","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Stamp Fee_92382","component_part_no":"OTC00350","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"International Roaming Data","component_part_no":"NVF01000","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Rebate DDR RTP","component_part_no":"DNR5960","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Social Roam Pass","component_part_no":"NVF12828","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Commitment Fee CBS","component_part_no":"CPT12828","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null}],"new_customer":null,"segment":null,"upfront_installment":null,"product_type":null,"start_date":null,"end_date":null,"BackgroundColor":null,"IndicatorClass":null,"ProductText":null,"KeyFiguresText":"2 GB","KeyText":"RM 20","BuynowLink":"/plans/xp-lite","BuynowText":"Buy now","knowMoreLink":null,"knowMoreText":null,"MobileDescription":null,"TableInfo":[],"terms_and_condition":{"plans":{"label":"Plans","desc":null},"contract_terms":{"label":"Contract Duration","desc":null},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"AtrHref":"#rm-0","telco_day":{"status":false,"hat_text":null,"message":null},"is_premium_plan":false,"is_golden_number":0,"additional_information":null},"selected_pass_details":{"name":"XP L Pass","sku":"xp-l-pass","monthly_plan":"40.0000","order_plan_bundle":"CPT12829","new_customer":"0","segment":null,"upfront_installment":null,"product_type":null,"start_date":null,"end_date":null,"BackgroundColor":null,"IndicatorClass":null,"ProductText":null,"KeyFiguresText":"10 GB","KeyText":"RM 40"},"orderDevice":"Oppo F5 32GB Gold ","orderDeviceName":"Oppo F5 32GB Gold ","orderDevicePrice":"10.0000","orderSummaryColor":"Gold","orderSummaryStorage":"32GB","orderReqServiceBundle":"","orderTotalPay":1010,"total":1010,"contract":"24 months contract","orderReqBrand":"OPPO","orderReqCategory":"HP","orderReqColor":"GLD","orderReqModel":"F5","orderReqPartNumber":"MDR5617","selectedImageList":["/media/catalog/product/f/r/front_1_6.png"],"free_gift_data":{"gift_image":null,"gift_message":null},"is_neptune_subsidy":true,"mnp_data":null,"is_mnp":false},"sku":"xp-lite-xp-b-plan-xp-l-pass-oppf5gld32gb","skuBundle":"xp-lite","isPreorder":false,"easyPhoneLabel":"EasyPhone  (24 months contract)","availabilityFlag":null,"has_add_ons":false,"add_on_label":null,"add_on_code":null,"promotion_details":"ADA","utm_source":null,"is_campaign_mviva":0,"campaign100_days":false,"campaign_mviva_url":"","campaign_mviva_message":null,"billType":0,"deviceUpfrontPenalty":0,"is_telco_day":false,"telco_day_message":"","is_easyphone":false,"phoneNum":"0133402843","orderNumberType":"NewNumber"
        };
        component.deviceDataForAddonPass = [{"name":"Oppo F5","sku":"Oppo-F5","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"1","rm":"0.00","rrp_rm_strick_price":"1224.55","main_image":"/media/catalog/product/f/r/front_1_7.png","sub_images":["/media/catalog/product/f/r/front_1_7.png"],"dimension":"155.9 ×75.8 × 7.7mm ","weight":"195.0000","splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":" MT6763T","order_brand":"OPPO","segment":"10","default_selected_color":"Gold","default_selected_memory":"32GB","stock_indicator_image":"/media/catalog/product","stock_indicator_text":null,"default_device_option":"easyPhone","associated_device_product":[{"name":"Oppo F5 32GB Gold ","sku":"oppf5gld32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Gold","memory":"32GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/f/r/front_1_6.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_1_6.png","/media/catalog/product/9/0/900x900_5_2.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"Oppo F5 32GB Black","sku":"oppf5b32gb","rrp":"1224.55","discounted_device_rrp":"0.00","color":"Black","memory":"32GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_64.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_64.png","/media/catalog/product/9/0/900x900_8.png"],"order_model":"F5","part_number":"MDR5617","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"1000","device_price":"10","penalty_price":"500","supplementary_count":0,"special_price":0}}],"ProductType":"moon","deviceIndex":0,"selectedMemoryIndex":0},{"name":"iPhone 8","sku":"iPhone-8","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"1748.00","rrp_rm_strick_price":"3394.00","main_image":"/media/catalog/product/f/r/front_55.png","sub_images":["/media/catalog/product/f/r/front_55.png","/media/catalog/product/b/a/badge.png"],"dimension":"138.4 x 67.3 x 7.3","weight":"195.0000","splash_water_dust_resistant":"1","stock":"Limited Stock","order_category":"HP","order_model":"Apple A10 Fusion","order_brand":"APPLE","segment":"10","default_selected_color":"Gold","default_selected_memory":"64GB","stock_indicator_image":"/media/catalog/product/b/a/badge.png","stock_indicator_text":"jhjhgjhgjhkjhjkh","default_device_option":"deviceBundle","associated_device_product":[{"name":"iPhone 8 64GB Gold","sku":"i8gld64GB","rrp":"3394.00","discounted_device_rrp":"1000.00","color":"Gold","memory":"64GB","order_color":"GLD","order_category":"HP","color_hexa":"#cdbeab","image":"/media/catalog/product/9/0/900x900_8_3.png","desc":"24 months contract","sub_images":["/media/catalog/product/9/0/900x900_8_3.png","/media/catalog/product/9/0/900x900_9_2.png","/media/catalog/product/9/0/900x900_10_2.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}},{"name":"iPhone 8 64GB Space Grey ","sku":"i8grey64GB","rrp":"3394.00","discounted_device_rrp":"2395.00","color":"Grey","memory":"64GB","order_color":"GRY","order_category":"HP","color_hexa":"#808080","image":"/media/catalog/product/f/r/front_14.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front_14.png","/media/catalog/product/9/0/900x900_8_5.png","/media/catalog/product/9/0/900x900_9_4.png"],"order_model":"IPHONE 8 64GB","part_number":"MDR5589","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"350","device_price":"99","penalty_price":"500","supplementary_count":0,"special_price":0}}],"ProductType":"moon","deviceIndex":1,"selectedMemoryIndex":0},{"name":"nubia Red Magic 3","sku":"Nubia-Red-Magic-3","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"499.00","rrp_rm_strick_price":"2199.00","main_image":"/media/catalog/product/f/r/front-black_1.png","sub_images":["/media/catalog/product/f/r/front-black_1.png","/media/catalog/product/n/e/new_2.png"],"dimension":"171.7 X 78.5 X 9.6(6.6)mm","weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":"REDMAGIC3 128GB","order_brand":"NUBIA","segment":"10","default_selected_color":"Black","default_selected_memory":"128GB","stock_indicator_image":"/media/catalog/product/n/e/new_2.png","stock_indicator_text":"<span style=\"font-weight: bold; font-size: 12pt;\">NEW LAUNCH</span><br /><span style=\"font-size: 10pt;\">Get yours now. <a href=\"https://www.google.com/\">here</a></span>","default_device_option":"deviceBundle","associated_device_product":[{"name":"nubia Red Magic 3 Black","sku":"nubiaRedMagic3128gbblack","rrp":"2199.00","discounted_device_rrp":"0.00","color":"Black","memory":"128GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front-black.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front-black.png","/media/catalog/product/r/i/right-side-black1.png","/media/catalog/product/b/a/back-black.png"],"order_model":"REDMAGIC3 128GB","part_number":"MDR10053","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"150","device_price":"1358","penalty_price":"850","supplementary_count":0,"special_price":0}},{"name":"nubia Red Magic 3 Red","sku":"nubiaRedMagic3128gbred","rrp":"2199.00","discounted_device_rrp":"0.00","color":"Red","memory":"128GB","order_color":"RED","order_category":"HP","color_hexa":"#b9253b","image":"/media/catalog/product/f/r/front-red.png","desc":"24 months contract","sub_images":["/media/catalog/product/f/r/front-red.png","/media/catalog/product/r/i/right-side-red1.png","/media/catalog/product/b/a/back-red.png"],"order_model":"REDMAGIC3 128GB","part_number":"MDR10053","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"150","device_price":"1358","penalty_price":"850","supplementary_count":0,"special_price":0}}],"ProductType":"moon","deviceIndex":2,"selectedMemoryIndex":0},{"name":"Samsung Galaxy A50","sku":"Samsung-Galaxy-A50","price":0,"quntity":null,"order_monthly_pay":"188.00","most_popular":"0","rm":"0.00","rrp_rm_strick_price":"1199.00","main_image":"/media/catalog/product/a/5/a50_white_900x900.png","sub_images":["/media/catalog/product/a/5/a50_white_900x900.png","/media/catalog/product/n/e/new_3.png"],"dimension":null,"weight":null,"splash_water_dust_resistant":"0","stock":"Limited Stock","order_category":"HP","order_model":"GALAXY A50 128GB","order_brand":"SAMSUNG","segment":"10","default_selected_color":"Black","default_selected_memory":"128GB","stock_indicator_image":"/media/catalog/product/n/e/new_3.png","stock_indicator_text":"<p style=\"margin:0\"><strong>NEW LAUNCH</strong></p>\r\n<p style=\"margin:0\">Get FREE exclusive Blackpink official merchandise* with Galaxy A50. </p>\r\n<span style=\"font-size: 7.0pt;margin-top:0\">*The merchandise are available on a first-come, first-served basis and while stock last.</span>","default_device_option":"deviceBundle","associated_device_product":[{"name":"Samsung Galaxy A50 Black","sku":"SamsungGalaxyA50128gbblack","rrp":"1199.00","discounted_device_rrp":"0.00","color":"Black","memory":"128GB","order_color":"BLK","order_category":"HP","color_hexa":"#000000","image":"/media/catalog/product/f/r/front_900x900_7.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900.jpg","/media/catalog/product/f/r/front_900x900_7.png","/media/catalog/product/s/i/side_900x900_5.png","/media/catalog/product/b/a/back_900x900_10.png","/media/catalog/product/i/m/image_carousel_-_a50.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"550","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}},{"name":"Samsung Galaxy A50 White","sku":"SamsungGalaxyA50128gbwhite","rrp":"1199.00","discounted_device_rrp":"0.00","color":"White","memory":"128GB","order_color":"WHT","order_category":"HP","color_hexa":"#ffffff","image":"/media/catalog/product/f/r/front_900x900_1_11.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900_1.jpg","/media/catalog/product/f/r/front_900x900_1_11.png","/media/catalog/product/s/i/side_900x900_1_10.png","/media/catalog/product/b/a/back_900x900_1_10.png","/media/catalog/product/i/m/image_carousel_-_a50_1.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"700","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}},{"name":"Samsung Galaxy A50 Blue","sku":"SamsungGalaxyA50128gbblue","rrp":"1199.00","discounted_device_rrp":"0.00","color":"Blue","memory":"128GB","order_color":"BLU","order_category":"HP","color_hexa":"#48a5d0","image":"/media/catalog/product/f/r/front_900x900_2_15.png","desc":"24 months contract","sub_images":["/media/catalog/product/c/a/carouselimage_900x900_2.jpg","/media/catalog/product/f/r/front_900x900_2_15.png","/media/catalog/product/s/i/side_900x900_2_14.png","/media/catalog/product/b/a/back_900x900_2_3.png","/media/catalog/product/i/m/image_carousel_-_a50_2.jpg"],"order_model":"GALAXY A50 128GB","part_number":"MDR10056","product_type":"HP","new_customer":"0","segment":null,"contract":"24","upfront_installment":null,"prices":{"upfront_price":"700","device_price":"299","penalty_price":"900","supplementary_count":0,"special_price":0}}],"ProductType":"moon","deviceIndex":3,"selectedMemoryIndex":0}];
        component.editProduct = {"quantity":1,"item_id":"42640","itemTotal":"1010.0000","price":1010,"selectedProduct":{"orderMonthlyPayTotal":68,"is_moon":true,"orderPlanName":"XP Lite Plan","orderPlan":"xp-b-plan","urlKey":"base-pan","selectedProductSku":"oppf5gld32gb","orderMonthlyPay":"28.0000","plan_image_url":"/media/catalog/product","orderOneTimePay":"1000.00","eligibilty":null,"orderPhoneNo":"0133402843","orderNumberType":"NewNumber","orderReqPlanComponent":[{"component_name":"Executive Plan VAS without GPRS_92378","component_part_no":"CPT04540","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"New Package for IDD Activation","component_part_no":"CPT07020","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Default International Roaming Voice/SMS","component_part_no":"CPT13540","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"SIM Card","component_part_no":"SM00010","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Advance Payment CBS","component_part_no":"OTC09280","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Blank SIM Starter Pack","component_part_no":"SP00210","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Stamp Fee_92382","component_part_no":"OTC00350","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"International Roaming Data","component_part_no":"NVF01000","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Rebate DDR RTP","component_part_no":"DNR5960","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Social Roam Pass","component_part_no":"NVF12828","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Commitment Fee CBS","component_part_no":"CPT12828","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null}],"selectedPlanDetails":{"name":"XP Lite Plan","sku":"xp-b-plan","urlKey":"base-pan","monthly_plan":"28.0000","order_plan_bundle":"PB12828","order_service_bundle":"RTP0010","order_plan_component":[{"component_name":"Executive Plan VAS without GPRS_92378","component_part_no":"CPT04540","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"New Package for IDD Activation","component_part_no":"CPT07020","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Default International Roaming Voice/SMS","component_part_no":"CPT13540","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"SIM Card","component_part_no":"SM00010","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Advance Payment CBS","component_part_no":"OTC09280","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Blank SIM Starter Pack","component_part_no":"SP00210","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Stamp Fee_92382","component_part_no":"OTC00350","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"International Roaming Data","component_part_no":"NVF01000","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Rebate DDR RTP","component_part_no":"DNR5960","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Social Roam Pass","component_part_no":"NVF12828","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null},{"component_name":"Commitment Fee CBS","component_part_no":"CPT12828","component_default":"0","component_price":"0.0000","cbs_name":"XP 28 Plan","cbs_part_number":"PR028280","isvas":"0","vasname":null,"vasvalue":null}],"new_customer":null,"segment":null,"upfront_installment":null,"product_type":null,"start_date":null,"end_date":null,"BackgroundColor":null,"IndicatorClass":null,"ProductText":null,"KeyFiguresText":"2 GB","KeyText":"RM 20","BuynowLink":"/plans/xp-lite","BuynowText":"Buy now","knowMoreLink":null,"knowMoreText":null,"MobileDescription":null,"TableInfo":[],"terms_and_condition":{"plans":{"label":"Plans","desc":null},"contract_terms":{"label":"Contract Duration","desc":null},"legal":{"label":"Legal","desc":null},"cancellation":{"label":"Cancellation","desc":null}},"AtrHref":"#rm-0","telco_day":{"status":false,"hat_text":null,"message":null},"is_premium_plan":false,"is_golden_number":0,"additional_information":null},"selected_pass_details":{"name":"XP L Pass","sku":"xp-l-pass","monthly_plan":"40.0000","order_plan_bundle":"CPT12829","new_customer":"0","segment":null,"upfront_installment":null,"product_type":null,"start_date":null,"end_date":null,"BackgroundColor":null,"IndicatorClass":null,"ProductText":null,"KeyFiguresText":"10 GB","KeyText":"RM 40"},"orderDevice":"Oppo F5 32GB Gold ","orderDeviceName":"Oppo F5 32GB Gold ","orderDevicePrice":"10.0000","orderSummaryColor":"Gold","orderSummaryStorage":"32GB","orderReqServiceBundle":"","orderTotalPay":1010,"total":1010,"contract":"24 months contract","orderReqBrand":"OPPO","orderReqCategory":"HP","orderReqColor":"GLD","orderReqModel":"F5","orderReqPartNumber":"MDR5617","selectedImageList":["/media/catalog/product/f/r/front_1_6.png"],"free_gift_data":{"gift_image":null,"gift_message":null},"is_neptune_subsidy":true,"mnp_data":null,"is_mnp":false},"sku":"xp-lite-xp-b-plan-xp-l-pass-oppf5gld32gb","skuBundle":"xp-lite","isPreorder":false,"easyPhoneLabel":"EasyPhone  (24 months contract)","availabilityFlag":null,"has_add_ons":false,"add_on_label":null,"add_on_code":null,"promotion_details":"ADA","utm_source":null,"is_campaign_mviva":0,"campaign100_days":false,"campaign_mviva_url":"","campaign_mviva_message":null,"billType":0,"deviceUpfrontPenalty":0,"is_telco_day":false,"telco_day_message":"","is_easyphone":false,"phoneNum":"0133402843","orderNumberType":"NewNumber"};
        component.SelectedDeviceMemory = '128GB';
        component.selectedDeviceInfo = {"price":"","name":"","sku":"","imagePath":"","upfrontPrice":"","devicePrice":"","totalPrice":"","contract":""};
        component.preSelectDeviceOnEdit(data);
      }));
      it('Should test LoadPageIndex', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        component.totalPage = 4;
        component.currentPage = 1;
        component.LoadPageIndex();
        // expect(component.SelectedDeviceMemory).toBe("64GB");
      }));
      it('Should test LoadPageIndex with currentpage 4', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        component.totalPage = 4;
        component.currentPage = 4;
        component.LoadPageIndex();
        // expect(component.SelectedDeviceMemory).toBe("64GB");
      }));
      it('Should test LoadPageIndex with currentpage 3', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        component.totalPage = 4;
        component.currentPage = 3;
        component.LoadPageIndex();
        // expect(component.SelectedDeviceMemory).toBe("64GB");
      }));
      it('Should test publishMoonColorMemoryInfo ', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={
          color: "Gold",
        memory: "32GB",
        sku: "Oppo-F5",
        stock: ""};
        component.ngOnInit();
        component.selectedDevice = data.sku;
        devicedataservice.publishMoonColorMemoryInfo(data);
        // expect(component.SelectedDeviceMemory).toBe("64GB");
      }));
      it('Should test publishMoonColorMemoryInfo without data', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={
          color: "black",
        memory: "16GB",
        sku: "Oppo-F5",
        stock: ""};
        component.ngOnInit();
        component.colorMemoryInfo = [{
          color: "Gold",
        memory: "32GB",
        sku: "Oppo-F5",
        stock: ""}];
        component.selectedDevice = data.sku;
        devicedataservice.publishMoonColorMemoryInfo(data);
        // expect(component.SelectedDeviceMemory).toBe("64GB");
      }));
      it('Should test publishMoonColorMemoryInfo with no matching devices', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={
          color: "black",
        memory: "16GB",
        sku: "Oppo-F4",
        stock: ""};
        component.ngOnInit();
        component.colorMemoryInfo = [{
          color: "Gold",
        memory: "32GB",
        sku: "Oppo-F5",
        stock: ""}];
        component.selectedDevice = data.sku;
        devicedataservice.publishMoonColorMemoryInfo(data);
        // expect(component.SelectedDeviceMemory).toBe("64GB");
      }));
      it('Should test outofstock ', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={"bundleSku":"","simpleSku":"oppf5gld32gb","sku":"Oppo-F5"};
        component.ngOnInit();
        devicedataservice.publishOutOfStock('Checking stock...',data);
        expect(component.stockStatus).toBe(1);
      }));
      it('Should test outofstock with Instock ', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={"bundleSku":"","simpleSku":"oppf5gld32gb","sku":"Oppo-F5"};
        component.ngOnInit();
        devicedataservice.publishOutOfStock('In Stock',data);
        expect(component.stockStatus).toBe(2);
      }));
      it('Should test outofstock with Out of Stock ', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={"bundleSku":"","simpleSku":"oppf5gld32gb","sku":"Oppo-F5"};
        component.ngOnInit();
        devicedataservice.publishOutOfStock('Out of Stock',data);
        expect(component.stockStatus).toBe(3);
      }));
      it('Should test outofstock with else ', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={"bundleSku":"","simpleSku":"oppf5gld32gb","sku":"Oppo-F5"};
        component.ngOnInit();
        devicedataservice.publishOutOfStock('test',data);
        expect(component.stockStatus).toBe(0);
      }));
      it('Should test outofstock with buldlesku ', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={"bundleSku":"oppf5gld32gb","simpleSku":"oppf5gld32gb","sku":"Oppo-F5"};
        component.ngOnInit();
        devicedataservice.publishOutOfStock('test',data);
        expect(component.bundleSku).toBe('oppf5gld32gb');
      }));
      it('Should test outofstock with stockInfoOfDevice ', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={"bundleSku":"","simpleSku":"oppf5gld32gb","sku":"Oppo-F5"};
        component.stockInfoOfDevice =[{"bundleSku":"","simpleSku":"oppf5gld32gb","sku":"oppf5gld32gb"}];
        component.ngOnInit();
        devicedataservice.publishOutOfStock('In Stock',data);
        expect(component.stockStatus).toBe(2);
      }));
      it('Should test outofstock with stockInfoOfDevice with else condition', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.deviceDataForAddonPass = response;
        let data ={"bundleSku":"","simpleSku":"oppf5gld32gb","sku":"Oppo-F5"};
        component.stockInfoOfDevice =[{"bundleSku":"","simpleSku":"oppf5gld32gb","sku":"1oppf5gld32gb"}];
        component.ngOnInit();
        devicedataservice.publishOutOfStock('In Stock',data);
        expect(component.stockStatus).toBe(2);
      }));
});
