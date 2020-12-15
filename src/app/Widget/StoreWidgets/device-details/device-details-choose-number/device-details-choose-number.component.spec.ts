import { async, ComponentFixture, TestBed, inject, tick } from "@angular/core/testing";
import { BreadcrumbComponent } from "../../../../breadcrumb/breadcrumb.component";
import { FooterDownloadComponent } from "../../../../Footer/Download/download.component";
import { SocialMediaComponent } from "../../../../Footer/SocialMedia/socialmedia.component";
import { AppService } from "../../../../Service/app.service";
import { HttpClient, HttpHandler, HttpErrorResponse } from "@angular/common/http";
import { DeviceDataService } from "../../../../Service/devicedata.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RedirectionService } from "../../../../Service/redirection.service";
import { Broadcaster } from "../../../../Model/broadcaster.model";
import { SeoService } from "../../../../Service/seo.service";
import { DecimalPipe } from "@angular/common";
import { PlanTableComparisionService } from "../../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service";
import { NotificationPopupEvent } from "../../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { RendererService } from "../../../../Service/renderer.service";
import { CommonModule } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import { Pipe, Renderer2 } from "@angular/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule } from "@angular/forms";
import { Observable } from 'rxjs/Rx';
import { DeviceDetailsNumberComponent } from "./device-details-choose-number.component";
import { DeviceDetailsComponent } from "../../../../Store/device/device-details/device-details.component";
import { AnalyticsService } from "../../../../Service/analytic.service";
import { GetParametersService } from "../../../../Service/getParamaters.service";
import { HomeService } from "../../../../Service/home.service";
import { UserService } from "../../../../Service/user.service";
import { EStoreAnalysticsService } from "../../../../Service/store.analytic.service";
import { DeviceDetailsNumberService } from "./device-details-choose-number.service";
import { DeviceDetailsService } from "../../../../Store/device/device-details/device-details.service";
import { PlanPurchaseService } from "../../../../Store/plan/plan-purchase/plan-purchase.service";
import { AppMockService } from "../../../../Service/appmock.service";
import { NricInputComponent } from "../../../../Store/widget/nric-input/nric-input.component";
import { NotificationBarComponent } from "../../../../Store/widget/notification-bar/notification-bar.component";
import { MoreSupplementaryPopupComponent } from "../../../../Store/widget/more-supplementary-popup/more-supplementary-popup.component";
import { TabsNewComponent } from "../../../xpax/tabs-new/tabs-new.component";
import { DeviceDisclaimerComponent } from "../device-detail-disclaimer/device-detail-disclaimer.component";
import { SwitchToCelcomComponent } from "../../../../Store/mnp/switch-to-celcom/switch-to-celcom.component";
import { ChooseYourWayComponent } from "../../../../Store/guest-checkout/choose-your-way/choose-your-way.component";
import { CobpComponent } from "../../../../Store/cobp/cobp.component";
import { DeviceSupplementaryLinesComponent } from "../../../../Store/widget/device-supplementary-lines/device-supplementary-lines.component";
import { SupplementaryLinesComponent } from "../../../../Store/widget/supplementary-lines/supplementary-lines.component";
import { TableComparisonComponent } from "../../../table-comparison/table-comparison.component";
import { PlanTableComparisonComponent } from "../../plan-table-comparison/plan-table-comparison.component";
import { LosingSupplementaryLinePopupComponent } from "../../../../Store/widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component";
import { LifestylePlansComponent } from "../../../../Store/plan/lifestyle-plans/lifestyle-plans.component";
import { StickySummaryComponent } from "../sticky-summary/sticky-summary.component";
import { NotificationErrorComponent } from "../../../../Store/widget/notification-error/notification-error.component";
import { FooterComponent } from "../../../../Footer/footer.component";
import { AgeEligibilityPopupComponent } from "../../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component";
import { DeviceMoreDetailsComponent } from "../device-details-more-details/device-details-more-details.component";
import { DeviceFlowComponent } from "../../../../Store/device/device-flow/device-flow.component";
import { NoteSectionComponent } from "../../../../Store/dumb-components/note-section/note-section.component";
import { AgentFooterComponent } from "../../../../Footer/agent-footer/agent-footer.component";
import { DeviceSliderComponent } from "../../../../Store/device/device-slider/device-slider.component";
import { BbDeviceNamePriceComponent } from "../../bb-device-name-price/bb-device-name-price.component";
import { BbDeviceColorComponent } from "../../bb-device-color/bb-device-color.component";
import { BbDeviceStockCheckComponent } from "../../bb-device-stock-check/bb-device-stock-check.component";
import { DetailBannerTextLeftComponent } from "../../../DetailBannerTextLeft/DetailBannerTextLeft.component";
import { DeviceDetailsPlanComponent } from "../device-details-plans-section/device-details-plans-section.component";
import { DeviceDetailsSummaryComponent } from "../device-details-summary-section/device-details-summary-section.component";
import { DeviceDetailsStorageComponent } from "../device-details-color-storage/device-details-color-storage.component";
import { CartService } from "../../../../Service/cart.service";
import { LoginService } from "../../../../Store/login/service/login.service";
import { DeviceDetailsPlanService } from "../device-details-plans-section/device-details-plans-section.service";
import { CommonUtilService } from "../../../../Service/commonUtil.service";
import { ProductService } from "../../../../Service/product.service";
import { BroadbandService } from "../../../../Service/broadband.service";
import { MsisdnInputComponent } from "../../../../Store/widget/msisdn-input/msisdn-input.component";
import { OtpInputComponent } from "../../../../Store/widget/otp-input/otp-input.component";
import { configureTestSuite } from 'ng-bullet';
import { componentFactoryName } from "@angular/compiler";
import { SharedModule } from "../../../../shared/shared-module.module";
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

const numberResp = [{"status":true,"is_premium_plan_message":"abc","message":"","mobile_numbers":[{"number":"0193267552"},{"number":"0132525247"},{"number":"0196822544"},{"number":"0193269316"},{"number":"0132265788"},{"number":"0133664420"},{"number":"0133353420"},{"number":"0136776443"},{"number":"0132428394"},{"number":"0132061734"},{"number":"0133505523"},{"number":"0196305447"},{"number":"0196789461"},{"number":"0133641269"},{"number":"0133717885"},{"number":"0136218994"},{"number":"0196080158"},{"number":"0133366130"},{"number":"0196435407"},{"number":"0132057066"},{"number":"0136607636"},{"number":"0133011724"},{"number":"0133718242"},{"number":"0133836046"},{"number":"0196435029"},{"number":"0193485351"},{"number":"0193841647"},{"number":"0193378396"},{"number":"0136948846"},{"number":"196040522"}]}];
const errorResp = [{"status": false, "is_premium_plan_message": "", "message": "error message"}];
class MockactivatedRoute {
  snapshot(url: string) {
    return url;
  }
}
class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

class MockAppService {
     postROI(apiUrlA, dataForRetrieveNumberA) {
       if (apiUrlA === "/rest/V1/retrieve-number") {
        return Observable.of(numberResp);
       } else if (apiUrlA === "/status-false") {
         return Observable.of(errorResp);
       } else {
         return Observable.throw({error: {errorObj: '000', errorMessage: "error"}});
       }
     }
 }
 class MockProductService {
     GetNewNumbers(apiUrlB, dataForRetrieveNumberB) {
      if (apiUrlB == "/rest/V1/retrieve-number") {

        return Observable.of(numberResp);
       }
       if (apiUrlB == "/status-false") {
        return Observable.of(errorResp);
      }
      return Observable.throw({error: {errorObj: '000', errorMessage: "error"}});
     }
 }

const response = [
    {
      items: {
      basic_details: {
        name: "iPhone XR",
        id: "399",
        sku: "iPhone-XR",
        upper_age_limit: null,
        lower_age_limit: null,
        price: 0,
        quntity: 0,
        preorder: 0,
        isMnp: false,
        PrincipalLine: "",
        portNumber: "",
        preorder_availability_flag: 0,
        midnight_delivery: {
          status: 0,
          label: ""
        },
        is_easy_phone: 1,
        is_rent: false,
        is_own: true,
        default_plan: "Celcom Mobile Platinum Plus",
        default_plan_sku: "FPP",
        order_monthly_pay: "188.0000",
        nfc: "0",
        mostpopular: "0",
        rm: "1918.00",
        rrp_rm_strick_price: "999.0000",
        upfront_price: 0,
        device_price: 0,
        main_image: "/media/catalog/product/f/r/front_58_1.png",
        sub_images: ["/media/catalog/product/f/r/front_58_1.png"],
        dimension: "150.9X75.7X8.3mm",
        choose_memory: null,
        weight: null,
        chip_processor: "A12 Bionic Chip ",
        splash_water_dust_resistant: "0",
        talk_time: null,
        standby_time: null,
        sim_type: null,
        stock: "Limited Stock",
        preorder_estimate_delivery_text: null,
        new_customer: "0",
        order_category: "HP",
        order_model: "IPHONE XR 64GB",
        order_brand: "APPLE",
        segment: "10",
        start_date: "2018-10-17 05:31:41",
        end_date: "2019-06-19 08:40:20",
        default_selected_color: "Red",
        default_selected_memory: "64GB",
        pre_order_data: {
          preorder_estimate_delivery_text: "6",
          preorder_estimate_delivery_date: "6",
          preorder_text: "PRE-ORDER ENDED",
          preorder_from_date_text: "From",
          preorder_to_date_text: "to",
          preorder_from_date: "19 Oct 2018",
          preorder_to_date: "23 Oct 2018",
          preorder_end_flag: 1,
          preorder_estimate_delivery: "6",
          preorder_submit_date: "2018-10-21 00:00:00",
          preorder_stock_available_quantity: 0,
          preorder_availble_stock_in_hand: 0,
          preorder_stock_status_flag: 0
        },
        is_campaign_mviva: null,
        campaign_mviva: null,
        campaign_mviva_invalid: null,
        is_lifestyle: 0,
        addons: []
      },
      supplementary_details: {
        name: "Celcom Mobile Family\u2122",
        celcom_family_plan: [
          {
            name: "First\u2122 Gold",
            max_line: "1",
            part_number: "PB12540",
            price: "48.0000",
            subsidy: "150",
            enable_plan_skus: [
              "FG",
              "FGP",
              "FP",
              "FPP",
              "FGS",
              "xpax_60",
              "FGP-MVIVA",
              "TQAPlan-RET-MVIVA",
              "kardashian",
              "hwg",
              "hwgp",
              "hwpp",
              "FB38",
              "FB-38"
            ]
          },
          {
            name: "First\u2122 Gold Plus",
            max_line: "2",
            part_number: "PB12540",
            price: "48.0000",
            subsidy: "150",
            enable_plan_skus: [
              "FGP",
              "FP",
              "FPP",
              "FGS",
              "xpax_60",
              "FGP-MVIVA",
              "TQAPlan-RET-MVIVA",
              "kardashian",
              "hwg",
              "hwgp",
              "hwpp",
              "FB38",
              "FB-38"
            ]
          }
        ]
      },
      associated_product: [
        {
          name: "iPhone XR 64GB Blue",
          sku: "iphonexr64gbblue",
          is_new: true,
          rrp: "3599.0000",
          discounted_device_rrp: null,
          color: "Blue",
          order_color: "BLU",
          order_category: "HP",
          color_hexa: "#48a5d0",
          memory: "64GB",
          image: "/media/catalog/product/f/r/front_900x900_11.png",
          sub_images: [],
          order_model: "IPHONE XR 64GB",
          part_number: "MDR6020",
          product_type: "HP",
          new_customer: "0",
          segment: "10",
          contract: "24",
          start_date: null,
          end_date: null,
          upfront_installment: null,
          saleable_plans: [
            {
              sku: "FGS",
              prices: {
                upfront_price: "900",
                device_price: "2348",
                penalty_price: "1000",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              sku: "FGP",
              prices: {
                upfront_price: "700",
                device_price: "2568",
                penalty_price: "1000",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              sku: "FP",
              prices: {
                upfront_price: "1100",
                device_price: "2208",
                penalty_price: "1500",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              sku: "FPP",
              prices: {
                upfront_price: "1300",
                device_price: "1918",
                penalty_price: "1500",
                supplementary_count: 0,
                special_price: 0
              }
            }
          ],
          pre_order_data: {
            preorder_estimate_delivery_text: "",
            preorder_estimate_delivery_date: "",
            preorder_text: "PRE-ORDER ENDED",
            preorder_from_date_text: "From",
            preorder_to_date_text: "to",
            preorder_from_date: "19 Oct 2018",
            preorder_to_date: "23 Oct 2018",
            preorder_end_flag: 1,
            preorder_estimate_delivery: null,
            preorder_submit_date: "2018-10-21 00:00:00",
            preorder_stock_available_quantity: 1000,
            preorder_availble_stock_in_hand: 1000,
            preorder_stock_status_flag: 1
          },
          free_gift_data: {
            gift_image: "/media/catalog/productno_selection",
            gift_message:
              "FREE black carbon casing* (worth RM109) when you pre-order iPhone. *While stock lasts. \nOrders before 21/10 receive phone delivery on 26/10.\nOrders after 21/10 receive phone delivery on 27/10 onwards."
          },
          easy_phone: {
            rent: [
              {
                FPP: "58"
              },
              {
                FGP: "85"
              },
              {
                FGS: "73"
              },
              {
                FP: "68"
              }
            ],
            own: [
              {
                FPP: "89"
              },
              {
                FGP: "117"
              },
              {
                FGS: "104"
              },
              {
                FP: "99"
              }
            ],
            rent_selected_plan: ["FPP", "FGP", "FGS", "FP"],
            own_selected_plan: ["FPP", "FGP", "FGS", "FP"],
            penalityown: [
              {
                FPP: "3264"
              },
              {
                FGP: "3264"
              },
              {
                FGS: "3264"
              },
              {
                FP: "3264"
              }
            ],
            penalityrent: [
              {
                FPP: "2520"
              },
              {
                FGP: "2520"
              },
              {
                FGS: "2520"
              },
              {
                FP: "2520"
              }
            ]
          },
          campaign_100days: true,
          is_neptune_subsidy: true
        },
        {
          name: "iPhone XR 64GB White",
          sku: "iphonexr64gbwhite",
          is_new: true,
          rrp: "3599.0000",
          discounted_device_rrp: null,
          color: "White",
          order_color: "WHT",
          order_category: "HP",
          color_hexa: "#ffffff",
          memory: "64GB",
          image: "/media/catalog/product/f/r/front_900x900_11.png",
          sub_images: [],
          order_model: "IPHONE XR 64GB",
          part_number: "MDR6020",
          product_type: "HP",
          new_customer: "0",
          segment: "10",
          contract: "24",
          start_date: null,
          end_date: null,
          upfront_installment: null,
          saleable_plans: [
            {
              sku: "FGS",
              prices: {
                upfront_price: "900",
                device_price: "2348",
                penalty_price: "1000",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              sku: "FGP",
              prices: {
                upfront_price: "700",
                device_price: "2568",
                penalty_price: "1000",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              sku: "FP",
              prices: {
                upfront_price: "1100",
                device_price: "2208",
                penalty_price: "1500",
                supplementary_count: 0,
                special_price: 0
              }
            },
            {
              sku: "FPP",
              prices: {
                upfront_price: "1300",
                device_price: "1918",
                penalty_price: "1500",
                supplementary_count: 0,
                special_price: 0
              }
            }
          ],
          pre_order_data: {
            preorder_estimate_delivery_text: "",
            preorder_estimate_delivery_date: "",
            preorder_text: "PRE-ORDER ENDED",
            preorder_from_date_text: "From",
            preorder_to_date_text: "to",
            preorder_from_date: "19 Oct 2018",
            preorder_to_date: "23 Oct 2018",
            preorder_end_flag: 1,
            preorder_estimate_delivery: null,
            preorder_submit_date: "2018-10-21 00:00:00",
            preorder_stock_available_quantity: 1000,
            preorder_availble_stock_in_hand: 1000,
            preorder_stock_status_flag: 1
          },
          free_gift_data: {
            gift_image: "/media/catalog/productno_selection",
            gift_message:
              "FREE black carbon casing* (worth RM109) when you pre-order iPhone. *While stock lasts. \nOrders before 21/10 receive phone delivery on 26/10.\nOrders after 21/10 receive phone delivery on 27/10 onwards."
          },
          easy_phone: {
            rent: [
              {
                FPP: "58"
              },
              {
                FGP: "85"
              },
              {
                FGS: "73"
              },
              {
                FP: "68"
              }
            ],
            own: [
              {
                FPP: "89"
              },
              {
                FGP: "117"
              },
              {
                FGS: "104"
              },
              {
                FP: "99"
              }
            ],
            rent_selected_plan: ["FPP", "FGP", "FGS", "FP"],
            own_selected_plan: ["FPP", "FGP", "FGS", "FP"],
            penalityown: [
              {
                FPP: "3264"
              },
              {
                FGP: "3264"
              },
              {
                FGS: "3264"
              },
              {
                FP: "3264"
              }
            ],
            penalityrent: [
              {
                FPP: "2520"
              },
              {
                FGP: "2520"
              },
              {
                FGS: "2520"
              },
              {
                FP: "2520"
              }
            ]
          },
          campaign_100days: true,
          is_neptune_subsidy: true
        }
      ],
      choose_plan: [
        {
          tabName: "Celcom Mobile Plans",
          tabTitle: null,
          tabSubtitle: null,
          is_xpax: false,
          tabData: [
            {
              name: "First\u2122 Gold Plus",
              sku: "FGP",
              monthlyPlan: "98.0000",
              orderPlanBundle: "PB12070",
              orderServiceBundle: "RTP0010",
              PlanMonthlyPay: "98.0000",
              OneTimePayment: null,
              newCustomer: "0",
              segment: "10",
              upfrontInstallment: null,
              contract: "24",
              PlanName: "First\u2122 Gold Plus",
              plan_title: "First\u2122 Gold Plus. Affordable. Complete",
              plan_subtitle:
                "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.",
              banner_image:
                "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg",
              mobile_image:
                "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg",
              footNote: null,
              upper_age_limit: null,
              lower_age_limit: "18",
              ngn_part_number: "PB10840",
              is_xpax: false,
              additional_information: null,
              productType: "Service",
              startDate: null,
              endDate: null,
              backgroundColor: "is-bg-color-black",
              indicatorClass: "is-level-gold",
              productText: "Gold Plus",
              keyFiguresText: "40 GB",
              keyText: "RM 98",
              buyNowLink: "/plans/first-gold-plus",
              buyNowText: "Buy now",
              knowMoreLink: "/store/plans/first-gold-plus",
              knowMoreText: "Learn more",
              mobileDescription: null,
              tableInfo: [],
              termsAndCondition: {
                plans: {
                  label: "Plans",
                  desc: "Unlimited Standard national calls + texts + videocalls"
                },
                contractTerms: {
                  label: "Contract Duration",
                  desc: "24 months contract"
                },
                legal: {
                  label: "Legal",
                  desc:
                    'All information, documents, products and services, trademarks, logos, graphics, and images ("Materials") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it\'s listed subsidiaries. Any una'
                },
                cancellation: {
                  label: "Cancellation",
                  desc:
                    "Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"
                }
              },
              is_premium_plan: false
            },
            {
              name: "First\u2122 Gold Supreme",
              sku: "FGS",
              monthlyPlan: "128.0000",
              orderPlanBundle: "PB11830",
              orderServiceBundle: "RTP0010",
              PlanMonthlyPay: "128.0000",
              OneTimePayment: null,
              newCustomer: "0",
              segment: null,
              upfrontInstallment: null,
              contract: "24",
              PlanName: "First\u2122 Gold Supreme",
              plan_title: "First\u2122 Gold Supreme",
              plan_subtitle:
                "More data, music, video, chats. Even more privileges when you sign up for 12 months.",
              banner_image:
                "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_1.jpg",
              mobile_image:
                "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldsupreme_lg_0.jpg",
              footNote: null,
              upper_age_limit: null,
              lower_age_limit: "18",
              ngn_part_number: "PB11890",
              is_xpax: false,
              additional_information: null,
              productType: "Service",
              startDate: null,
              endDate: null,
              backgroundColor: "is-bg-color-black",
              indicatorClass: "is-level-gold",
              productText: "Gold Supreme",
              keyFiguresText: "50 GB",
              keyText: "RM 128",
              buyNowLink: "/plans/first-gold-supreme",
              buyNowText: "Buy now",
              knowMoreLink: "/store/plans/first-gold-supreme",
              knowMoreText: "Learn more",
              mobileDescription: null,
              tableInfo: [],
              termsAndCondition: {
                plans: {
                  label: "Plans",
                  desc: null
                },
                contractTerms: {
                  label: "Contract Duration",
                  desc: "24 months contract"
                },
                legal: {
                  label: "Legal",
                  desc: null
                },
                cancellation: {
                  label: "Cancellation",
                  desc: null
                }
              },
              is_premium_plan: false
            }
          ]
        },
        {
          tabName: "Xpax\u2122 Plans",
          tabTitle: null,
          tabSubtitle: null,
          is_xpax: true,
          tabData: [
            {
              name: "Xpax\u2122 XP60",
              sku: "xpax_60",
              monthlyPlan: "60.0000",
              orderPlanBundle: "PB12750",
              orderServiceBundle: "RTP2000",
              PlanMonthlyPay: "60.0000",
              OneTimePayment: null,
              newCustomer: "0",
              segment: "10",
              upfrontInstallment: null,
              contract: "24",
              PlanName: "Xpax\u2122 XP60",
              plan_title: "Xpax 60",
              plan_subtitle: "Sign up for 12 months for more privileges.",
              banner_image:
                "/sites/default/files/images/banner/mega_xpax_postpaid_01_lg.jpg",
              mobile_image:
                "/sites/default/files/images/banner/mega_xpax_postpaid_01_lg.jpg",
              footNote:
                "*Unlimited calls are only applicable to numbers on Celcom Network",
              upper_age_limit: "1000",
              lower_age_limit: "18",
              ngn_part_number: "PB12480",
              is_xpax: true,
              additional_information: "5 GB free data",
              productType: "Service",
              startDate: null,
              endDate: null,
              backgroundColor: "is-bg-color-black",
              indicatorClass: "is-level-xpax",
              productText: "Xpax\u2122 XP60",
              keyFiguresText: "10 GB",
              keyText: "RM 60",
              buyNowLink: "/plans/xpax-50",
              buyNowText: "Buy now",
              knowMoreLink: "/store/plans/xpax-50",
              knowMoreText: "Learn more",
              mobileDescription: null,
              tableInfo: [],
              termsAndCondition: {
                plans: {
                  label: "Plans",
                  desc: "Unlimited Standard national calls + texts + videocalls"
                },
                contractTerms: {
                  label: "Contract Duration",
                  desc: "24 months contract"
                },
                legal: {
                  label: "Legal",
                  desc:
                    'All information, documents, products and services, trademarks, logos, graphics, and images ("Materials") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it\'s listed subsidiaries. Any una'
                },
                cancellation: {
                  label: "Cancellation",
                  desc:
                    "Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"
                }
              },
              is_premium_plan: false
            }
          ]
        }
      ],
      related_products: [
        {
          name: "iPhone XS Max",
          sku: "iPhone-XS-Max"
        },
        {
          name: "iPhone XS",
          sku: "iPhone-XS"
        }
      ],
      analytics_key_addtocart: {
        fb_add_cart_id: "AddToCart_iPhoneXR",
        google_add_cart_id: "lfskCLWZm5ABENjpoqMD",
        twitter_add_cart_id: "nzuzt",
        fb_learn_more_id: null,
        google_learn_more_id: null,
        twitter_learn_more_id: null,
        fb_buy_now_id: null,
        google_buy_now_id: null,
        twitter_buy_now_id: null
      }
    }
    }
  ];

describe("DeviceDetailsNumberComponent", () => {
  let component: DeviceDetailsNumberComponent;
  let fixture: ComponentFixture<DeviceDetailsNumberComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        DeviceDetailsComponent,
        BreadcrumbComponent,
        DeviceSliderComponent,
        BbDeviceNamePriceComponent,
        BbDeviceColorComponent,
        BbDeviceStockCheckComponent,
        DeviceDetailsStorageComponent,
        DetailBannerTextLeftComponent,
        DeviceDetailsPlanComponent,
        DeviceDetailsSummaryComponent,
        DeviceDetailsNumberComponent,
        StickySummaryComponent,
        NotificationErrorComponent,
        FooterComponent,
        AgentFooterComponent,
        NoteSectionComponent,
        AgeEligibilityPopupComponent,
        FooterDownloadComponent,
        SocialMediaComponent,
        DeviceMoreDetailsComponent,
        DeviceFlowComponent,
        LifestylePlansComponent,
        LosingSupplementaryLinePopupComponent,
        PlanTableComparisonComponent,
        TableComparisonComponent,
        SupplementaryLinesComponent,
        DeviceSupplementaryLinesComponent,
        CobpComponent,
        SwitchToCelcomComponent,
        DeviceDisclaimerComponent,
        ChooseYourWayComponent,
        TabsNewComponent,
        MoreSupplementaryPopupComponent,
        NotificationBarComponent,
        NricInputComponent,
        MsisdnInputComponent,
        OtpInputComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        FormsModule,
        SharedModule
      ],
      providers: [
        PlanPurchaseService,
        { provide: AppService, useClass: MockAppService },
        HttpClient,
        HttpHandler,
        PlanPurchaseService,
        CartService,
        DeviceDataService,
        PlanPurchaseService,
        RedirectionService,
        Broadcaster,
        { provide: ActivatedRoute, useValue: {
            queryParams: Observable.of({deviceId: "iPhone-XR"})
        } },
        { provide: Router, useClass: RouterStub },
        SeoService,
        DecimalPipe,
        LoginService,
        DeviceDetailsPlanService,
        PlanTableComparisionService,
        NotificationPopupEvent,
        CookieService,
        BroadbandService,
        RendererService,
        DeviceDetailsService,
        DeviceDetailsNumberService,
        UserService,
        HomeService,
        CommonUtilService,
        Renderer2,
        DomSanitizer,
        { provide: ProductService, useClass: MockProductService },
        EStoreAnalysticsService,
        GetParametersService,
        AnalyticsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeviceDetailsNumberComponent);
    component = fixture.componentInstance;
    component.data = response[0].items;
    component.pageType = "dbInline";
    component.retrievenumberURL = "/status-false";

  }));
  it("DeviceDetailsNumberComponent should create", () => {
    expect(component).toBeTruthy();
  });
  it('agentinfo', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(devicedataservice, "publishPhoneNo");
    spyOn(devicedataservice, "publishNumberType");
    sessionStorage.setItem("AgentInfo", "true");
    component.ngOnInit();
    expect(component.isCSAgent).toBe(true);
    expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishNumberType).toHaveBeenCalledWith(null);
  }));
  it('dealerinfo type of purchase', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    sessionStorage.removeItem("AgentInfo");
    component.typeOfPurchaseTabSelection = {
      dealer: {
        mnp: false,
        cobp: false,
        newline: false
      }
    };
    sessionStorage.setItem("DealerInfo", "true");
    component.ngOnInit();
    expect(component.isDealer).toBe(true);
    expect(component.isEnableMnpTab).toBeFalsy();
    expect(component.isEnableNewLineTab).toBeFalsy();
    expect(component.isEnableCobpTab).toBeFalsy();
  }));
  it('dealerinfo', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    sessionStorage.removeItem("AgentInfo");
    sessionStorage.setItem("DealerInfo", "true");
    component.ngOnInit();
    expect(component.isDealer).toBe(true);
    expect(component.isEnableMnpTab).toBeTruthy();
    expect(component.isEnableNewLineTab).toBeTruthy();
    expect(component.isEnableCobpTab).toBeTruthy();
  }));
  it('preorderended', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    sessionStorage.removeItem("DealerInfo");
    localStorage.setItem("preOrderEnded", "false");
    component.ngOnInit();
    expect(component.preorderEnded).toBe(false);
  }));
  it('telcoday', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("telcoDayRebate", "false");
    spyOn(component, "telcoDayRebateEligibility");
    component.ngOnInit();
    expect(component.telcoDayRebate).toBe(false);
    expect(component.telcoDayRebateEligibility).toHaveBeenCalled();
  }));
  it('promotionallifestylePlans', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("promotionallifestylePlans", "true");
    component.ngOnInit();
    expect(component.lifestyleSelected).toBe(true);
  }));
  it('promotionallifestylePlans false', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.lifestyleSelected = false;
    localStorage.setItem("promotionallifestylePlans", "false");
    component.ngOnInit();
    expect(component.lifestyleSelected).toBe(false);
  }));
  it('rent', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("isRentClicked", "false");
    component.ngOnInit();
    expect(component.isRentClicked).toBe(false);
  }));
  it('own', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("isOwnClicked", "false");
    component.ngOnInit();
    expect(component.isOwnClicked).toBe(false);
  }));
  it('bundle', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("isBundleClicked", "false");
    component.ngOnInit();
    expect(component.isBundleClicked).toBe(false);
  }));
  it('easyphone', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("isEasyPhone", "false");
    component.ngOnInit();
    expect(component.isEasyPhone).toBe(false);
  }));
  it('cobp-flow', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("COBP_login_Check", "false");
    localStorage.setItem("COBP_FLOW_CHECK", "false");
    spyOn(localStorage, "removeItem");
    component.ngOnInit();
    expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_login_Check");
    expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_FLOW_CHECK");
  }));
  it('telco rebate', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "telcoDayRebateEligibility");
    component.ngOnInit();
    devicedataservice.publishTelcoDayRebate("abc");
    expect(component.telcoDayRebate).toBe("abc");
    expect(component.telcoDayRebateEligibility).toHaveBeenCalled();
  }));
  it('telco rebate null', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.telcoDayRebate = false;
    component.ngOnInit();
    devicedataservice.publishTelcoDayRebate(null);
    expect(component.telcoDayRebate).toBe(false);
  }));
  it('cobploading', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishCobpLoading(false);
    expect(component.cobpLoading).toBe(false);
  }));
  it('preorder', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishPreOrder(false);
    expect(component.isPreOrder).toBe(false);
  }));
  it('mviva', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishMviva(false);
    expect(component.isMviva).toBe(false);
  }));
  it('easyphone', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishEasyPhone(false);
    expect(component.isEasyPhone).toBe(false);
  }));
  it('rent clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishRentClicked(false);
    expect(component.isRentClicked).toBe(false);
  }));
  it('own clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishOwnClicked(false);
    expect(component.isOwnClicked).toBe(false);
  }));
  it('bundle clicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishBundleClicked(false);
    expect(component.isBundleClicked).toBe(false);
  }));
  it('lifestyle', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishLifestylePlans(false);
    expect(component.lifestyleSelected).toBe(false);
  }));
  it('pass select', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishPassSelected(false);
    expect(component.isPassSelected).toBe(false);
  }));
  it('shared selection', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishSelected(false);
    expect(component.isActive).toBe(false);
    expect(component.showContent).toBe(component.isActive);
  }));
  it('error notification', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishErrorNotificationBoolean(false);
    expect(component.showMNPFlowNotification).toBe(false);
    expect(component.maximumReservation).toBe(false);
    expect(component.apiFailure).toBe(false);
  }));
  it('supp lines delete', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishExtraSuppLinesAddedByUser(0);
    expect(component.noOfSuppLinesToDelete).toBe(0);
    expect(component.noOfLinesToDelete).toBe(0);
  }));
  it('order one time pay', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishOneTimePay(10);
    expect(component.oneTimePayOtherMNP).toBe(10);
  }));
  it('order total pay', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishTotalPay(20);
    expect(component.totalPayOtherMNP).toBe(20);
  }));
  it('disable new line cobp', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishDisableNewLineCobpSTen(false);
    expect(component.disableNewLineCobpSTen).toBe(false);
  }));
  it('disable new line cobp localstorage', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("DisableNewLineCobpSTen", "false");
    component.ngOnInit();
    expect(component.disableNewLineCobpSTen).toBe(false);
  }));
  it('error for numbers', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.errorForNumbers();
    expect(component.errorExits).toBe(true);
  }));
  it('remove mnp flow', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.errorExits = false;
    spyOn(localStorage, "removeItem");
    component.removeMNPFlow();
    expect(localStorage.removeItem).toHaveBeenCalledWith("MNPCustomerData");
    expect(localStorage.removeItem).toHaveBeenCalledWith("checkToShowEditEligibilityBox");
    expect(localStorage.removeItem).toHaveBeenCalledWith("MNP-CUSTOMER");
    expect(localStorage.removeItem).toHaveBeenCalledWith("MNP-PRE-SELECT");
    expect(localStorage.removeItem).toHaveBeenCalledWith("MNP-FLOW");
    expect(localStorage.removeItem).toHaveBeenCalledWith("Eligible");
    expect(localStorage.removeItem).toHaveBeenCalledWith("MNP-EDIT");
  }));
  it('remove cobp', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(localStorage, "removeItem");
    component.removeCOBPContract();
    expect(localStorage.removeItem).toHaveBeenCalledWith("ContractEndDate");
    expect(localStorage.removeItem).toHaveBeenCalledWith("ContractAgree");
  }));
  it('hiderebate', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.hideRebateMessages();
    expect(component.showEligibleRebate).toBe(false);
    expect(component.showNotEligibleRebate).toBe(false);
  }));
  it('removePrincipleLine', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "telcoDayRebateEligibility");
    spyOn(component, "getRefreshNumbers");
    spyOn(localStorage, "removeItem");
    spyOn(devicedataservice, "publishPrincipalLine");
    spyOn(devicedataservice, "publishPhoneNo");
    spyOn(devicedataservice, "publishSupplimentaryLines");
    spyOn(devicedataservice, "publishAddToCartEnabling");
    spyOn(devicedataservice, "publishSupplinesLinesPrice");
    component.removePrincipleLine();
    expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBe(false);
    expect(component.isPrincipleNumSelected).toBe(false);
    expect(component.selectedNumber).toBe(null);
    expect(component.displayNumList).toBe(false);
    expect(component.deviceNumberToDisplay).toBe(null);
    expect(component.typeOfNumHighlight).toBe("NEW_NUMBER");
    expect(component.telcoDayRebateEligibility).toHaveBeenCalled();
    expect(component.getRefreshNumbers).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalledWith("PrincipleNumberSelected");
    expect(devicedataservice.publishPrincipalLine).toHaveBeenCalledWith(component.isPrincipleNumSelected);
    expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith([]);
    expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(false);
    expect(devicedataservice.publishSupplinesLinesPrice).toHaveBeenCalledWith([]);
  }));
  it('continue purchase type tab', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.purchaseType = "ShowMNPBlock";
    localStorage.setItem("suppLinesAddedByTheUser", "abc");
    spyOn(component, "showmnpblock");
    spyOn(localStorage, "removeItem");
    component.onContinueSwitchingPurchaseTypeTab();
    expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
    expect(localStorage.removeItem).toHaveBeenCalledWith("suppLinesAddedByTheUser");
    expect(component.showmnpblock).toHaveBeenCalled();
  }));
  it('continue purchase type tab principal line', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.purchaseType = "removePrincipleLine";
    spyOn(component, "removePrincipleLine");
    component.onContinueSwitchingPurchaseTypeTab();
    expect(component.removePrincipleLine).toHaveBeenCalled();
  }));
  it('continue purchase type tab cobp', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.purchaseType = "SameNumber";
    localStorage.setItem("lifestylePlans", "false");
    spyOn(component, "sameNumber");
    component.onContinueSwitchingPurchaseTypeTab();
    expect(component.sameNumber).toHaveBeenCalled();
    const lifestyle = localStorage.getItem("lifestyleCOBP");
    expect(lifestyle).toBe("false");
  }));
  it('continue purchase type tab new number', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.purchaseType = "GetNewNumber";
    localStorage.setItem("COBP_FLOW", "true");
    localStorage.setItem("COBP_login_Check", "true");
    localStorage.setItem("COBP_FLOW_CHECK", "true");
    spyOn(localStorage, "removeItem");
    spyOn(component, "getNewNumbers");
    component.onContinueSwitchingPurchaseTypeTab();
    expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_FLOW");
    expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_login_Check");
    expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_FLOW_CHECK");
    expect(component.getNewNumbers).toHaveBeenCalled();
  }));
  it('cancel purchase type tab', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.onCancellingSwitchingPurchaseTypeTab();
    expect(component.IsDispalySwitchingPurchaseTypeTabPopup).toBeFalsy();
  }));
  it('onContinueUpsellPopup', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(devicedataservice, "publishUpsellProceed");
    spyOn(devicedataservice, "publishUpdateStickyStep");
    spyOn(devicedataservice, "publishUpdateStep");
    component.onContinueUpsellPopup();
    expect(component.IsDisplayUpsellPopup).toBeFalsy();
    expect(devicedataservice.publishUpsellProceed).toHaveBeenCalledWith(true);
    expect(devicedataservice.publishUpdateStickyStep).toHaveBeenCalledWith(1);
    expect(devicedataservice.publishUpdateStep).toHaveBeenCalledWith(1);
    const upsell = localStorage.getItem("cancelUpsell");
    expect(upsell).toBe("true");
  }));
  it('oncancelupsell', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.purchaseType = "GetNewNumber";
    spyOn(component, "onSwitchingPurchaseTypeTab");
    component.onCancelUpsellPopup();
    expect(component.IsDisplayUpsellPopup).toBeFalsy();
    expect(component.cancelUpsell).toBeTruthy();
    const upsell = JSON.parse(localStorage.getItem("cancelUpsell"));
    expect(upsell).toBe(component.cancelUpsell);
    expect(component.onSwitchingPurchaseTypeTab).toHaveBeenCalledWith(component.purchaseType);
  }));
  it('publish step', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isMoon = true;
    spyOn(devicedataservice, "publishUpdateStickyStep");
    component.decidePublishStep(2);
    expect(devicedataservice.publishUpdateStickyStep).toHaveBeenCalledWith(2);
  }));
  it('publish step false', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isMoon = false;
    spyOn(devicedataservice, "publishUpdateStep");
    component.decidePublishStep(2);
    expect(devicedataservice.publishUpdateStep).toHaveBeenCalledWith(2);
  }));
  it('call nric verification', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "afterNricAuthentication");
    component.callOnNricVerification();
    expect(component.afterNricAuthentication).toHaveBeenCalled();
  }));
  it('onRespSuccess', () => {
    const resp = {
      sim_type: "Prepaid",
      exception: true,
      status: false
    };
    spyOn(component, "onApiError");
    component.onRespSuccess(resp);
    expect(component.onApiError).toHaveBeenCalledWith(resp);
  });
  it('onRespSuccess', () => {
    const resp = {
      sim_type: "Postpaid",
      exception: false,
      status: true
    };
    spyOn(component, "afterNricAuthentication");
    component.onRespSuccess(resp);
    expect(component.afterNricAuthentication).toHaveBeenCalled();
  });
  it('onRespSuccess', () => {
    const resp = {
      sim_type: "Prepaid",
      exception: false,
      status: true
    };
    component.onRespSuccess(resp);
    expect(component.enableNRICAuthentication).toBeTruthy();
  });
  it('onRespError', () => {
    const resp = {
      status: false
    };
    component.onRespError(resp);
    expect(component.loading).toBeFalsy();
    expect(component.errorExits).toBeTruthy();
  });
  it('onApiError', () => {
    const resp = {
      message: "Error Message"
    };
    component.onApiError(resp);
    expect(component.errorExits).toBeTruthy();
    expect(component.errorMessage).toEqual(resp);
  });
  it('successful login', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.pageType = "cobpInLine";
    spyOn(component, "afterNricAuthentication");
    component.onSuccessfulLogin(true);
    expect(component.enableNRICAuthentication).toBeFalsy();
    expect(component.isUserLoggedIn).toBeTruthy();
    expect(component.afterNricAuthentication).toHaveBeenCalled();
  }));
  it('successful login', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.pageType = "newInLine";
    spyOn(devicedataservice, "publishAddToCartEnabling");
    component.onSuccessfulLogin(true);
    expect(component.enableNRICAuthentication).toBeFalsy();
    expect(component.isUserLoggedIn).toBeTruthy();
    expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(false);
  }));
  it('refresh number', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isKardasianPlanSelected = true;
    component.isPremiumTabSelected = true;
    component.editOrder = false;
    spyOn(devicedataservice, "publishPhoneNo");
    spyOn(component, "callRetrieveNumbersAPI");
    component.getRefreshNumbers();
    expect(component.errorExits).toBeFalsy();
    expect(component.displayNumList).toBeTruthy();
    expect(component.numberCategory).toBe("GOLDEN");
    const getRefreshNumberdata = {
      data: {
        numberService: "POSTPAID",
        numberCategory: "GOLDEN",
        numRecords: "30",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    expect(component.isPremiumTabSelected).toBeTruthy();
    expect(component.isKardasianPlanSelectedTab).toBeTruthy();
    expect(component.isNormalTabSelected).toBeFalsy();
    expect(component.selectedNumber).toBe(null);
    expect(component.editOrder).toBeFalsy();
    expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(null);
    expect(component.getRefreshNumberdata).toEqual(getRefreshNumberdata);
    expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(component.getRefreshNumberdata);
    expect(component.searchNumber).toBe("");
  }));
  it('refresh number', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isKardasianPlanSelected = false;
    component.isPremiumTabSelected = false;
    spyOn(component, "callRetrieveNumbersAPI");
    component.getRefreshNumbers();
    expect(component.numberCategory).toBe("NORMAL");
    const getRefreshNumberdata = {
      data: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "30",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(getRefreshNumberdata);
  }));
  it('select number', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.numberCategory = "GOLDEN";
    let abc = false;
    spyOn(devicedataservice, "publishPrincipalLine");
    spyOn(devicedataservice, "publishAddToCartEnabling");
    spyOn(devicedataservice, "publishPhoneNo");
    spyOn(devicedataservice, "publishIsGoldenNo");
    spyOn(devicedataservice, "publishNumberType");
    spyOn(component, "telcoDayRebateEligibility");
    component.SelectNumber(6012302221);
    expect(component.selectedNumber).toBe(6012302221);
    expect(component.isGoldenNumberSelected).toBeTruthy();
    abc = JSON.parse(localStorage.getItem("GoldenNumberSelected"));
    expect(abc).toBeTruthy();
    const number = JSON.parse(localStorage.getItem("Principal_Number"));
    expect(number).toBe(6012302221);
    expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(6012302221);
    expect(devicedataservice.publishIsGoldenNo).toHaveBeenCalledWith(component.isGoldenNumberSelected);
    expect(devicedataservice.publishNumberType).toHaveBeenCalledWith("NewNumber");
    expect(component.typeOfNumHighlight).toBe('NEW_NUMBER');
    expect(component.telcoDayRebateEligibility).toHaveBeenCalled();
    expect(component.pageType).toBe("newInLine");
    const principalSelected = JSON.parse(localStorage.getItem("PrincipleNumberSelected"));
    expect(principalSelected).toBe(true);
    expect(component.isActive).toBe(true);
    expect(component.isPrincipleNumSelected).toBe(true);
    expect(devicedataservice.publishPrincipalLine).toHaveBeenCalledWith(component.isPrincipleNumSelected);
    expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(false);
  }));
  it('select number', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.numberCategory = "NORMAL";
    spyOn(devicedataservice, "publishIsGoldenNo");
    component.SelectNumber(6012302221);
    expect(component.isGoldenNumberSelected).toBeFalsy();
    expect(devicedataservice.publishIsGoldenNo).toHaveBeenCalledWith(component.isGoldenNumberSelected);
  }));
  it('premium tab', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isPrincipleNumSelected = true;
    spyOn(component, "removePrincipleLine");
    spyOn(component, "getRefreshNumbers");
    component.showPremiumTab("GOLDEN");
    expect(component.deviceNumberToDisplay).toBeFalsy();
    expect(component.numberCategory).toBe("GOLDEN");
    expect(component.isKardasianPlanSelectedTab).toBe(true);
    expect(component.isPremiumTabSelected).toBe(true);
    expect(component.isNormalTabSelected).toBe(false);
    expect(component.removePrincipleLine).toHaveBeenCalled();
    expect(component.getRefreshNumbers).toHaveBeenCalled();
  }));
  it('premium tab', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isPrincipleNumSelected = true;
    spyOn(component, "getRefreshNumbers");
    spyOn(component, "removePrincipleLine");
    component.showPremiumTab("NORMAL");
    expect(component.deviceNumberToDisplay).toBeFalsy();
    expect(component.numberCategory).toBe("NORMAL");
    expect(component.isKardasianPlanSelectedTab).toBe(true);
    expect(component.isPremiumTabSelected).toBe(false);
    expect(component.isNormalTabSelected).toBe(true);
    expect(component.removePrincipleLine).toHaveBeenCalled();
    expect(component.getRefreshNumbers).toHaveBeenCalled();
  }));
  it('telco day eligibility', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.telcoDayRebate = {status: true, allowed_types: []};
    component.telcoDayRebateEligibility();
    expect(component.showNotEligibleRebate).toBe(true);
    expect(component.showEligibleRebate).toBe(false);
  }));
  it('telco day eligibility', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.typeOfNumHighlight = null;
    spyOn(component, "hideRebateMessages");
    spyOn(devicedataservice, "publishEligibleRebate");
    component.telcoDayRebate = {status: true, allowed_types: ["EXISTING_NUMBER", "MnpNum", "NEW_NUMBER"]};
    component.telcoDayRebateEligibility();
    expect(component.hideRebateMessages).toHaveBeenCalled();
    expect(devicedataservice.publishEligibleRebate).toHaveBeenCalledWith(false);
  }));
  it('telco day eligibility', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.typeOfNumHighlight = "EXISTING_NUMBER";
    spyOn(devicedataservice, "publishEligibleRebate");
    component.telcoDayRebate = {status: true, allowed_types: ["MnpNum", "NEW_NUMBER"]};
    component.telcoDayRebateEligibility();
    expect(component.showNotEligibleRebate).toBe(true);
    expect(component.showEligibleRebate).toBe(false);
    expect(devicedataservice.publishEligibleRebate).toHaveBeenCalledWith(false);
  }));
  it('telco day eligibility', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.typeOfNumHighlight = "MnpNum";
    spyOn(devicedataservice, "publishEligibleRebate");
    component.telcoDayRebate = {status: true, allowed_types: ["MnpNum", "NEW_NUMBER"]};
    component.telcoDayRebateEligibility();
    expect(component.showNotEligibleRebate).toBe(false);
    expect(component.showEligibleRebate).toBe(true);
    expect(devicedataservice.publishEligibleRebate).toHaveBeenCalledWith(true);
  }));
  it('telco day eligibility', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "hideRebateMessages");
    spyOn(devicedataservice, "publishEligibleRebate");
    component.telcoDayRebate = null;
    component.telcoDayRebateEligibility();
    expect(component.hideRebateMessages).toHaveBeenCalled();
    expect(devicedataservice.publishEligibleRebate).toHaveBeenCalledWith(false);
  }));
  it('cobp preselection', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(devicedataservice, "publishAddToCartDisabling");
    spyOn(devicedataservice, "publishSupplimentaryLines");
    spyOn(localStorage, "removeItem");
    spyOn(component.resetPriceData, "emit");
    localStorage.setItem("suppNumber", "2");
    component.data.plan_title = "First\u2122 Gold Supreme";
    component.cobpSelectionPreAuthentication();
    expect(localStorage.removeItem).toHaveBeenCalledWith("suppNumber");
    expect(component.loading).toBe(false);
    expect(component.searchNumber).toBe("");
    expect(component.selectedNumber).toBe(null);
    expect(component.deviceNumberToDisplay).toBe(null);
    expect(component.SwitchToCelcom).toBe(false);
    expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith([]);
    expect(component.ShowMNPBlock).toBe(false);
    expect(component.resetPriceData.emit).toHaveBeenCalledWith(component.data);
    expect(component.isPrincipleNumSelected).toBe(false);
    expect(component.enableNRICAuthentication).toBe(false);
    expect(component.typeOfNumber).toBe("EXISTING_NUMBER");
    expect(component.typeOfNumHighlight).toBe("EXISTING_NUMBER");
    expect(component.cobpData).toBe(component.data);
    expect(devicedataservice.publishAddToCartDisabling).toHaveBeenCalledWith(false);
  }));
  it('after nric authentication', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(devicedataservice, "publishAddToCartDisabling");
    spyOn(devicedataservice, "publishSupplimentaryLines");
    spyOn(localStorage, "removeItem");
    spyOn(component.resetPriceData, "emit");
    spyOn(component, "telcoDayRebateEligibility");
    localStorage.setItem("suppNumber", "2");
    component.data.plan_title = "First\u2122 Gold Supreme";
    component.afterNricAuthentication();
    expect(localStorage.removeItem).toHaveBeenCalledWith("suppNumber");
    expect(component.loading).toBe(false);
    expect(component.searchNumber).toBe("");
    expect(component.cobpData).toBe(component.data);
    expect(component.deviceNumberToDisplay).toBe(null);
    expect(component.SwitchToCelcom).toBe(false);
    expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith([]);
    expect(component.ShowMNPBlock).toBe(false);
    expect(component.resetPriceData.emit).toHaveBeenCalledWith(component.data);
    expect(component.isPrincipleNumSelected).toBe(false);
    expect(component.typeOfNumber).toBe("EXISTING_NUMBER");
    expect(component.typeOfNumHighlight).toBe("EXISTING_NUMBER");
    expect(component.telcoDayRebateEligibility).toHaveBeenCalled();
    expect(devicedataservice.publishAddToCartDisabling).toHaveBeenCalledWith(false);
  }));
  it('should test numberKeyHandler', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    const ev = {keyCode: 13, which: 12};
    spyOn(component, "searchNumbersForPattern");
    component.numberKeyHandler(ev);
    expect(component.errorExits).toBe(false);
    expect(component.noNumbersToDisplay).toBe(false);
    expect(component.searchNumbersForPattern).toHaveBeenCalled();
}));
it('should test numberValidation', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    const ev = {keyCode: 7, which: 7, preventDefault: jasmine.createSpy()};
    spyOn(component, "searchNumbersForPattern");
    component.numberValidation(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    const a = {keyCode: 13, which: 13, preventDefault: jasmine.createSpy()};
    component.numberValidation(a);
}));
it('should test searchNumbersForPattern', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  component.searchNumber = "";
  spyOn(component, "errorForNumbers");
  spyOn(component, "callRetrieveNumbersAPI");
  component.isKardasianPlanSelected = true;
  component.isPremiumTabSelected = true;
  component.deviceNumberToDisplay = [{"number": "0193267552"}, {"number": "0132525247"}];
  component.searchNumbersForPattern();
  expect(component.numberCategory).toBe("GOLDEN");
  expect(component.isKardasianPlanSelectedTab).toBe(true);
  const dataForRetrieveNumberAPI = {
    data: {
      numberService: "POSTPAID",
      sourceSystem: "",
      numRecords: "30",
      planType: "VOICE",
      numberCategory: component.numberCategory
    }
  };
  expect(component.errorForNumbers).toHaveBeenCalled();
  expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(dataForRetrieveNumberAPI);
  expect(component.errorExits).toBe(false);
component.searchNumber = 11111;
component.searchNumbersForPattern();
expect(component.errorForNumbers).toHaveBeenCalled();
component.searchNumber = 222;
component.isKardasianPlanSelected = false;
component.isPremiumTabSelected = false;
component.searchNumbersForPattern();
const dataForRetrieveNumberAPIb = {
  data: {
    numberService: "POSTPAID",
    sourceSystem: "",
    numRecords: "30",
    planType: "VOICE",
    numberCategory: component.numberCategory,
    criteria: "CONTAINS",
    numberPattern: 222
  }
};
expect(component.numberCategory).toBe("NORMAL");
expect(component.errorExits).toBe(false);
expect(component.searchStatus).toBe(true);
expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(dataForRetrieveNumberAPIb);
}));
it('should test getnewnumbers', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  localStorage.setItem("Eligible", "true");
  localStorage.setItem("COBP_FLOW", "true");
  localStorage.setItem("COBP_login_Check", "true");
  localStorage.setItem("COBP_FLOW_CHECK", "true");
  spyOn(localStorage, "removeItem");
  spyOn(devicedataservice, "publishDisclaimerAgree");
  spyOn(devicedataservice, "publishNumberType");
  spyOn(devicedataservice, "publishPhoneNo");
  spyOn(component, "telcoDayRebateEligibility");
  spyOn(component, "removeCOBPContract");
  spyOn(component, "removeMNPFlow");
  spyOn(component, "callRetrieveNumbersAPI");
  spyOn(devicedataservice, "publishAddToCartDisabling");
  spyOn(component.chooseNumPlanCommunication, "getPriceUpdated");
  component.typeOfNumber = "abc";
  component.isKardasianPlanSelected = true;
  component.isPremiumTabSelected = true;
  component.outletId = "CKL47948";
  component.isProd = undefined;
  component.isPlanURL = false;
  component.getNewNumbers();
  expect(devicedataservice.publishDisclaimerAgree).toHaveBeenCalledWith(false);
  expect(localStorage.removeItem).toHaveBeenCalledWith("Eligible");
  expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_FLOW");
  expect(localStorage.removeItem).toHaveBeenCalledWith("ContractEndDate");
  expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_login_Check");
  expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_FLOW_CHECK");
  expect(component.typeOfNumHighlight).toBe("NEW_NUMBER");
  expect(component.typeOfNumber).toBe("NEW_NUMBER");
  expect(component.telcoDayRebateEligibility).toHaveBeenCalled();
  expect(component.SwitchToCelcom).toBe(false);
  expect(component.ShowMNPBlock).toBe(false);
  expect(component.errorExits).toBe(false);
  expect(component.removeCOBPContract).toHaveBeenCalled();
  expect(component.preventStyle).toEqual({
    "pointer-events": "none"
  });
  expect(devicedataservice.publishNumberType).toHaveBeenCalledWith("NewNumber");
  expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(null);
  expect(component.numberCategory).toBe("GOLDEN");
  const dataForRetrieveNumberAPI = {
    data: {
      numberService: "POSTPAID",
      numberCategory: component.numberCategory,
      numRecords: "30",
      sourceSystem: "",
      planType: "VOICE",
      outletId: "CKL47948"
    }
  };
  expect(component.removeMNPFlow).toHaveBeenCalled();
  expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(dataForRetrieveNumberAPI);
  expect(devicedataservice.publishAddToCartDisabling).toHaveBeenCalledWith(false);
  expect(component.chooseNumPlanCommunication.getPriceUpdated).toHaveBeenCalledWith(component.data);
}));
it('should test getnewnumbers', inject([RendererService], (rendererService: RendererService) => {
  component.isKardasianPlanSelected = false;
  component.supplimentaryData = {lineChosen: 2};
  component.data.cobpEligible = true;
  component.isPremiumTabSelected = false;
  spyOn(rendererService, "createAnalyticForSelectedPurchaseType");
  component.typeOfPurchaseAnalyticFlag = true;
  component.typeOfNumber = "NEW_NUMBER";
  localStorage.setItem("lifestyleCOBP", "YES");
  spyOn(localStorage, "removeItem");
  component.getNewNumbers();
  expect(component.numberCategory).toBe("NORMAL");
  expect(component.adobePurchaseType).toBe("traceAnalyticsInGetNumber");
  expect(rendererService.createAnalyticForSelectedPurchaseType).toHaveBeenCalledWith(component.document,
     component._renderer, component.document.body, component.adobePurchaseType);
     expect(component.typeOfPurchaseAnalyticFlag).toBe(false);
     expect(component.lineChosen).toBe(true);
     expect(component.data.cobpEligible).toBe(false);
     expect(localStorage.removeItem).toHaveBeenCalledWith("lifestyleCOBP");
     component.lineChosen = false;
     component.supplimentaryData = {};
}));
it('should test getnewnumbers', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  spyOn(devicedataservice, "publishAddToCartEnabling");
  spyOn(devicedataservice, "publishDisclaimerAgree");
  component.getNewNumbers();
  expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(false);
  expect(devicedataservice.publishDisclaimerAgree).toHaveBeenCalledWith(false);
}));
it('should test getnewnumbers', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  component.selectedBlueXpax = true;
  spyOn(devicedataservice, "publishAddToCartEnabling");
  component.getNewNumbers();
  expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(true);
  component.selectedBlueXpax = false;
  localStorage.setItem("suppPlanType", JSON.stringify({name: "Blue"}));
  localStorage.setItem("suppLinesAddedByTheUser", "true");
  spyOn(localStorage, "removeItem");
  component.getNewNumbers();
  expect(component.selectedBlueXpax).toBe(true);
  expect(localStorage.removeItem).toHaveBeenCalledWith("suppLinesAddedByTheUser");
  expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(true);
  component.selectedBlueXpax = false;
  localStorage.setItem("suppPlanType", JSON.stringify({name: "First"}));
  component.getNewNumbers();
  expect(component.selectedBlueXpax).toBe(false);
  expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(false);
  localStorage.removeItem("suppPlanType");
}));
it('should test showmnpblock', inject([RendererService], (rendererService: RendererService) => {
  component.typeOfPurchaseAnalyticFlag = true;
  localStorage.setItem("lifestyleCOBP", "YES");
  localStorage.setItem("suppNumber", "YES");
  localStorage.setItem("COBP_FLOW", "YES");
  component.data.cobpEligible = true;
  spyOn(localStorage, "removeItem");
  spyOn(rendererService, "createAnalyticForSelectedPurchaseType");
  component.showmnpblock();
  expect(component.adobePurchaseType).toBe("traceAnalyticsInSwitchToCelcom");
  expect(rendererService.createAnalyticForSelectedPurchaseType).toHaveBeenCalledWith(component.document,
     component._renderer, component.document.body, component.adobePurchaseType);
     expect(component.typeOfPurchaseAnalyticFlag).toBe(false);
     expect(localStorage.removeItem).toHaveBeenCalledWith("lifestyleCOBP");
     expect(component.data.cobpEligible).toBe(false);
     expect(localStorage.removeItem).toHaveBeenCalledWith("suppNumber");
     expect(component.loading).toBe(false);
     expect(component.searchNumber).toBe("");
     expect(component.selectedNumber).toBe(null);
     expect(localStorage.removeItem).toHaveBeenCalledWith("COBP_FLOW");
}));
it('should test showmnpblock', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  spyOn(devicedataservice, "publishDisclaimerAgree");
  spyOn(devicedataservice, "publishAddToCartDisabling");
  spyOn(devicedataservice, "publishNumberType");
  spyOn(devicedataservice, "publishDeactivateLifestyleAddons");
  spyOn(devicedataservice, "publishPhoneNo");
  spyOn(component, "removeCOBPContract");
  spyOn(component, "telcoDayRebateEligibility");
  spyOn(localStorage, "removeItem");
  spyOn(devicedataservice, "publishPrincipalLine");
  spyOn(devicedataservice, "publishAddToCartEnabling");
  spyOn(devicedataservice, "publishSupplimentaryLines");
  component.data.plan_title = "First\u2122 Gold Supreme";
  component.showmnpblock();
  expect(devicedataservice.publishDisclaimerAgree).toHaveBeenCalledWith(false);
  expect(localStorage.removeItem).toHaveBeenCalledWith("Principal_Number");
  expect(devicedataservice.publishAddToCartDisabling).toHaveBeenCalledWith(false);
  expect(devicedataservice.publishNumberType).toHaveBeenCalledWith("SwitchToCelcom");
  expect(devicedataservice.publishDeactivateLifestyleAddons).toHaveBeenCalledWith(false);
  expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(null);
  expect(component.ShowMNPBlock).toBe(true);
  expect(component.SwitchToCelcom).toBe(true);
  expect(component.removeCOBPContract).toHaveBeenCalled();
  expect(component.typeOfNumber).toBe(null);
  expect(component.typeOfNumHighlight).toBe("MnpNum");
  expect(component.telcoDayRebateEligibility).toHaveBeenCalled();
    expect(component.deviceNumberToDisplay).toBe(null);
    expect(component.isPrincipleNumSelected).toBe(false);
    expect(devicedataservice.publishPrincipalLine).toHaveBeenCalledWith(component.isPrincipleNumSelected);
    expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(true);
    expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith([]);
    component.ShowMNPBlock = false;
    component.SwitchToCelcom = false;
    component.typeOfNumHighlight = "";
}));
it('should test showPremiumTab', inject([RendererService], (rendererService: RendererService) => {
  component.isPrincipleNumSelected = true;
  component.showPremiumTab("GOLDEN");
  component.isPrincipleNumSelected = true;
  component.showPremiumTab("NORMAL");
  component.isPrincipleNumSelected = false;
}));
it('should test errorfornumbers', inject([RendererService], (rendererService: RendererService) => {
  component.errorForNumbers();
  component.errorExits = false;
}));
it('should test hide buttons', inject([RendererService], (rendererService: RendererService) => {
  component.MNPPreorderFlow = true;
  const a = component.HideButtons();
  expect(a).toBe(true);
  component.MNPPreorderFlow = false;
  component.data.plan_title = null;
  component.HideButtons();
  component.data.plan_title = "First\u2122 Gold Supreme";
}));
it('should test OnMnpEligibile', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  const ev = {keyCode: 13};
  component.OnMnpEligibile(ev);
  expect(localStorage.getItem("Eligible")).toBe("true");
  localStorage.removeItem("Eligible");
}));
it('should test hideTypeOfPurchaseCobp ', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  component.data.plan_title = null;
  component.isPrincipleClicked = false;
  component.isRentClicked = false;
  component.isOwnClicked = false;
  component.purchaseType = "SameNumber";
  component.hideTypeOfPurchaseCobp();
  component.isPrincipleClicked = true;
  component.purchaseType = "GetNewNumber";
  component.hideTypeOfPurchaseCobp();
  component.purchaseType = "removePrincipleLine";
  component.hideTypeOfPurchaseCobp();
  component.data.plan_title = "First\u2122 Gold Supreme";
  component.isPrincipleClicked = false;
  component.purchaseType = "";
  component.hideTypeOfPurchaseCobp();
}));
it('should test hideTypeOfPurchaseMNP', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  component.data.plan_title = null;
  component.isPrincipleClicked = false;
  component.purchaseType = "ShowMNPBlock";
  component.hideTypeOfPurchaseMNP();
  component.isPrincipleClicked = true;
  component.purchaseType = "GetNewNumber";
  component.hideTypeOfPurchaseMNP();
  component.purchaseType = "removePrincipleLine";
  component.hideTypeOfPurchaseMNP();
  component.data.plan_title = "First\u2122 Gold Supreme";
  component.isPrincipleClicked = false;
  component.purchaseType = "";
  component.hideTypeOfPurchaseMNP();
}));
// it('should test onSwitchingPurchaseTypeTab', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
//   localStorage.setItem("isPassSelected", "false");
//   localStorage.setItem("cancelUpsell", "false");
//   component.isKardasianPlanSelected = true;
//   component.onSwitchingPurchaseTypeTab("GetNewNumber");
//   component.isKardasianPlanSelected = false;
//   component.onSwitchingPurchaseTypeTab("ShowMNPBlock");
//   localStorage.removeItem("isPassSelected");
//   localStorage.removeItem("cancelUpsell");
//   localStorage.setItem("lifestylePlans", "YES");
//   const abc = window.location.href;
//   component.onSwitchingPurchaseTypeTab("SameNumber");
//   localStorage.removeItem("lifestylePlans");
//   localStorage.removeItem("lifestyleCOBP");
//   component.onSwitchingPurchaseTypeTab("removePrincipleLine");
//   component.typeOfNumHighlight = "NEW_NUMBER";
//   component.selectedNumber = "0122321516";
//   sessionStorage.setItem("USER_TYPE", "GUEST");
//   component.onSwitchingPurchaseTypeTab("SameNumber");
//   component.onSwitchingPurchaseTypeTab("GetNewNumber");
//   sessionStorage.removeItem("USER_TYPE");
//   component.onSwitchingPurchaseTypeTab("GetNewNumber");
//   window.location.href = "#/plans/xp-lite";
//   component.onSwitchingPurchaseTypeTab("GetNewNumber");
//   window.location.href = "#/first-gold-plus?promotiondetails=''abc";
//   component.isMviva = true;
//   sessionStorage.removeItem("UserInfo");
//   component.onSwitchingPurchaseTypeTab("GetNewNumber");
//   component.isMviva = false;
//   localStorage.removeItem("mvivaCampaignUrl");
//   component.typeOfNumHighlight = "";
//   component.selectedNumber = "";
// }));
it('should test callretrivenumber', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  const dataForRetrieveNumberAPI = {
    data: {
      numberService: "POSTPAID",
      numberCategory: "NORMAL",
      numRecords: "30",
      sourceSystem: "",
      planType: "VOICE",
      outletId: "CKL47948"
    }
  };
  component.isPrincipleClicked = true;
  component.isPrincipleNumSelected = true;
  component.typeOfNumHighlight = 'NEW_NUMBER';
  component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  component.isPrincipleClicked = false;
  component.isPrincipleNumSelected = false;
  component.retrievenumberURL = "/rest/V1/retrieve-status-false";
  component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  component.retrievenumberURL = "/rest/V1/retrieve-number";
  component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  component.searchNumber = "552";
  component.selectedNumber = "0193267552";
  component.selectedProd = {phoneNum: "0193267552", orderNumberType: "NewNumber"};
  component.searchStatus = true;
  component.retrievenumberURL = "error";
  component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
}));
it('should test callretrivenumber with status false', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
  const dataForRetrieveNumberAPI = {
    data: {
      numberService: "POSTPAID",
      numberCategory: "NORMAL",
      numRecords: "30",
      sourceSystem: "",
      planType: "VOICE",
      outletId: "CKL47948"
    }
  };
  component.isPrincipleClicked = true;
  component.isPrincipleNumSelected = true;
  // component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  component.isPrincipleClicked = false;
  component.isPrincipleNumSelected = false;
  component.retrievenumberURL = "/status-false";
  component.typeOfNumHighlight = 'NEW_NUMBER';
  component.searchStatus = true;
  component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  // component.retrievenumberURL = "/rest/V1/retrieve-number";
  // component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  // component.searchNumber = "552";
  // component.selectedNumber = "0193267552";
  // component.selectedProd = {phoneNum: "0193267552", orderNumberType: "NewNumber"};
  // component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
}));
});
