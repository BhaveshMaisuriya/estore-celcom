import { async, ComponentFixture, TestBed, inject, tick } from "@angular/core/testing";
import { BreadcrumbComponent } from "../../../breadcrumb/breadcrumb.component";
import { DeviceSliderComponent } from "../../device/device-slider/device-slider.component";
import { BbDeviceNamePriceComponent } from "../../../Widget/StoreWidgets/bb-device-name-price/bb-device-name-price.component";
import { BbDeviceColorComponent } from "../../../Widget/StoreWidgets/bb-device-color/bb-device-color.component";
import { BbDeviceStockCheckComponent } from "../../../Widget/StoreWidgets/bb-device-stock-check/bb-device-stock-check.component";
import { DetailBannerTextLeftComponent } from "../../../Widget/DetailBannerTextLeft/DetailBannerTextLeft.component";
import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
import { FooterComponent } from "../../../Footer/footer.component";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { NoteSectionComponent } from "../../dumb-components/note-section/note-section.component";
import { AgeEligibilityPopupComponent } from "../../widget/age-eligibility-popup/ageeligiblity.popup.component";
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { AppService } from "../../../Service/app.service";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RedirectionService } from "../../../Service/redirection.service";
import { Broadcaster } from "../../../Model/broadcaster.model";
import { SeoService } from "../../../Service/seo.service";
import { DecimalPipe } from "@angular/common";
import { PlanTableComparisionService } from "../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { RendererService } from "../../../Service/renderer.service";
import { DeviceDetailsComponent } from "./device-details.component";
import { StickySummaryComponent } from "../../../Widget/StoreWidgets/device-details/sticky-summary/sticky-summary.component";
import { DeviceDetailsSummaryComponent } from "../../../Widget/StoreWidgets/device-details/device-details-summary-section/device-details-summary-section.component";
import { DeviceDetailsPlanComponent } from "../../../Widget/StoreWidgets/device-details/device-details-plans-section/device-details-plans-section.component";
import { DeviceDetailsNumberComponent } from "../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.component";
import { DeviceDetailsStorageComponent } from "../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.component";
import { DeviceMoreDetailsComponent } from "../../../Widget/StoreWidgets/device-details/device-details-more-details/device-details-more-details.component";
import { DeviceFlowComponent } from "../device-flow/device-flow.component";
import { DeviceDetailsService } from "./device-details.service";
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { UserService } from "../../../Service/user.service";
import { HomeService } from "../../../Service/home.service";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { GetParametersService } from "../../../Service/getParamaters.service";
import { AppMockService } from "../../../Service/appmock.service";
import { CommonModule } from "@angular/common";
import { DomSanitizer } from "@angular/platform-browser";
import { Pipe } from "@angular/core";
import { LifestylePlansComponent } from "../../plan/lifestyle-plans/lifestyle-plans.component";
import { LosingSupplementaryLinePopupComponent } from "../../widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component";
import { PlanTableComparisonComponent } from "../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TableComparisonComponent } from "../../../Widget/table-comparison/table-comparison.component";
import { FormsModule } from "@angular/forms";
import { SupplementaryLinesComponent } from "../../widget/supplementary-lines/supplementary-lines.component";
import { DeviceSupplementaryLinesComponent } from "../../widget/device-supplementary-lines/device-supplementary-lines.component";
import { CobpComponent } from "../../cobp/cobp.component";
import { SwitchToCelcomComponent } from "../../mnp/switch-to-celcom/switch-to-celcom.component";
import { DeviceDisclaimerComponent } from "../../../Widget/StoreWidgets/device-details/device-detail-disclaimer/device-detail-disclaimer.component";
import { ChooseYourWayComponent } from "../../guest-checkout/choose-your-way/choose-your-way.component";
import { TabsNewComponent } from "../../../Widget/xpax/tabs-new/tabs-new.component";
import { MoreSupplementaryPopupComponent } from "../../widget/more-supplementary-popup/more-supplementary-popup.component";
import { NotificationBarComponent } from "../../widget/notification-bar/notification-bar.component";
import { AnalyticsService } from "../../../Service/analytic.service";
import { Observable } from 'rxjs/Rx';
import { PlanPurchaseService } from "./../../plan/plan-purchase/plan-purchase.service";
import { NricInputComponent } from "../../../Store/widget/nric-input/nric-input.component";
import { MsisdnInputComponent } from "../../widget/msisdn-input/msisdn-input.component";
import { OtpInputComponent } from "../../widget/otp-input/otp-input.component";
import { configureTestSuite } from 'ng-bullet';
import { SharedModule } from "../../../../app/shared/shared-module.module";
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { MatRadioModule } from '@angular/material/radio';

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

describe("DeviceDetailsComponent", () => {
  let component: DeviceDetailsComponent;
  let fixture: ComponentFixture<DeviceDetailsComponent>;
  let service: DeviceDetailsService;
  const simpleDeviceList = [
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
    }
  ];
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
      base_plan: [
        {
          name: "Celcom Ultra",
          sku: "Ultra-Base",
          monthlyPlan: "40.0000",
          orderPlanBundle: "PB19090",
          orderServiceBundle: "RTP0010",
          PlanMonthlyPay: "40.0000",
          OneTimePayment: null,
          newCustomer: "0",
          segment: null,
          upfrontInstallment: null,
          contract: null,
          PlanName: "Celcom Ultra",
          plan_title: "Celcom Ultra",
          plan_subtitle: "Celcom Ultra",
          offer: "10Mbps High-Speed Internet<br>\r\nUnlimited Call to All Networks",
          selected_offer_title: "10Mbps",
          data_limit: "10",
          banner_image: null,
          mobile_image: null,
          footNote: null,
          upper_age_limit: null,
          lower_age_limit: null,
          ngn_part_number: null,
          is_xpax: false,
          additional_information: null,
          productType: null,
          startDate: null,
          endDate: null,
          backgroundColor: null,
          indicatorClass: null,
          productText: null,
          keyFiguresText: "10GB",
          keyText: "RM40",
          buyNowLink: "/plans/mega",
          buyNowText: "Buy now",
          knowMoreLink: null,
          knowMoreText: null,
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
              "label": "Legal",
              "desc": null
            },
            cancellation: {
              label: "Cancellation",
              desc: null
            }
          },
          is_premium_plan: false,
          bill_type: 1
        }
      ],
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

  const saleablePlans = [
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
  ];

  const notEligible = {
    isEligible: false
  };
  class MockAppService {
    constructor() { }

    getEstoreData(url: any) {
        return Observable.of(response);
    }
}
  const MockDeviceService = {
    Find: jasmine.createSpy('Find').and.returnValue(Observable.of(response))
  };
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
        SharedModule,
        MatRadioModule
      ],
      providers: [
        PlanPurchaseService,
        { provide: AppService, useClass: MockAppService },
        HttpClient,
        HttpHandler,
        PlanPurchaseService,
        DeviceDataService,
        PlanPurchaseService,
        RedirectionService,
        Broadcaster,
        { provide: ActivatedRoute, useValue: {
          params: Observable.of({deviceId: "iPhone-XR"})
        } },
        { provide: Router, useClass: RouterStub },
        SeoService,
        DecimalPipe,
        PlanTableComparisionService,
        NotificationPopupEvent,
        CookieService,
        RendererService,
        {provide: DeviceDetailsService, useValue: MockDeviceService},
        CommonUtilService,
        UserService,
        HomeService,
        EStoreAnalysticsService,
        GetParametersService,
        DomSanitizer,
        AnalyticsService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(inject([DeviceDetailsService], (deviceDetailsService) => {
    service = deviceDetailsService;
    fixture = TestBed.createComponent(DeviceDetailsComponent);
    component = fixture.componentInstance;
    component.isLifestyle = false;
    component.lifestyleAddOnData = {};
    component.isDisplayPromotionalLifeStyle = false;
    component.DeviceDetailsFullResponse = response[0]["items"];
  //   component.editDeviceObj = {
  //     "easyPhoneLabel": ""
  //   };
  //   component.editProduct = {
  //     "easyPhoneLabel": "",
  //     "quantity": "",
  //     "isPreorder": "",
  //     "availabilityFlag": "",
  //     "selectedProductSku": {
  //       "orderSummaryColor": "",
  //       "orderSummaryStorage": "",
  //       "orderPlanName": "",
  //       "orderPlan": "",
  //       "orderMonthlyPay": "",
  //       "selectedPlanDetails": ""
  //     }
  //   };
  }));
  it("DeviceDetailsComponent should create", () => {
    expect(component).toBeTruthy();
  });
  it('test ng onit', () => {
    spyOn(component, "Init");
    component.ngOnInit();
    expect(component.Init).toHaveBeenCalled();
  });
  it('device total pay', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishTotalPay(200);
    expect(component.deviceOnlyPrice).toBe(200);
    expect(component.DeviceDetailsResponse.price).toBe(component.deviceOnlyPrice);
  }));
  it('device rrp price', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishRrPPrice(50);
    expect(component.DeviceDetailsResponse.rrpPrice).toBe(50);
  }));
  it('device bundle price', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishDevicePrice(100);
    expect(component.deviceOnlyPriceForBundle).toBe(100);
  }));
  it('rent price', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishRentPrice(20);
    expect(component.rentPrice).toBe(20);
  }));
  it('own price', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishOwnPrice(30);
    expect(component.ownPrice).toBe(30);
  }));
  it('bundle price', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishBundlePrice(120);
    expect(component.bundlePrice).toBe(120);
  }));
  it('bundle upfront', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishBundleUpfrontPrice(50);
    expect(component.bundleUpfrontPrice).toBe(50);
  }));
  it('easyphone case', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishEasyPhone(false);
    expect(component.isEasyPhone).toBe(false);
  }));
  it('preorder case', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishPreOrderData(response[0].items.basic_details.pre_order_data);
    expect(component.preOrderData).toBe(response[0].items.basic_details.pre_order_data);
  }));
  it('rentclicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishRentClicked(true);
    expect(component.isRentClicked).toBe(true);
    expect(component.isOwnClicked).toBe(false);
    expect(component.isBundleClicked).toBe(false);
    expect(component.buyNoPlan).toBe(false);
  }));
  it('ownclicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishOwnClicked(true);
    expect(component.isOwnClicked).toBe(true);
    expect(component.isRentClicked).toBe(false);
    expect(component.isBundleClicked).toBe(false);
    expect(component.buyNoPlan).toBe(false);
  }));
  it('bundleclicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishBundleClicked(true);
    expect(component.isBundleClicked).toBe(true);
    expect(component.isRentClicked).toBe(false);
    expect(component.isOwnClicked).toBe(false);
    expect(component.buyNoPlan).toBe(false);
  }));
  it('no plan case', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishBuyNoPlan(true);
    expect(component.buyNoPlan).toBeTruthy();
    expect(component.isRentClicked).toBeFalsy();
    expect(component.isBundleClicked).toBeFalsy();
    expect(component.isOwnClicked).toBeFalsy();
  }));
  // fit('test Init function', () => {
  //   spyOn(component, "captureQueryParams");
  //   component.captureQueryParams();
  // });
  it('test defaultonclick', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    const click = component.defaultOnClick();
    expect(click).toBeFalsy();
  }));
  it('test onReInitializeChooseNumberComponent', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(devicedataservice, "publishPhoneNo");
    spyOn(devicedataservice, "publishNumberType");
    spyOn(devicedataservice, "publishEasyPhoneTabsClicked");
    spyOn(devicedataservice, "publishDeviceUpfront");
    spyOn(devicedataservice, "publishPlanUpfront");
    spyOn(devicedataservice, "publishdeviceUpfrontPenalty");
    component.isEasyPhone = true;
    component.onReInitializeChooseNumberComponent();
    expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishNumberType).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishEasyPhoneTabsClicked).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishDeviceUpfront).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishPlanUpfront).toHaveBeenCalledWith(null);
    expect(devicedataservice.publishdeviceUpfrontPenalty).toHaveBeenCalledWith(0);
  }));
  it('supplimentaryDataToTransfer', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.supplimentaryDataToTransfer(component.DeviceDetailsFullResponse);
    expect(component.supplimentaryData).toBe(component.DeviceDetailsFullResponse);
  }));
  it('saleablePlanArrayToTransfer', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.saleablePlanArrayToTransfer(saleablePlans);
    expect(component.saleablePlanArray).toBe(saleablePlans);
  }));
  it('OnCloseTermsAndConditionsPopup', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.OnCloseTermsAndConditionsPopup();
    expect(component.isInitializeTermsAndConditions).toBe(false);
  }));
  it('onCOBPEligibilityCheckBundle', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.onCOBPEligibilityCheckBundle(component.DeviceDetailsFullResponse);
    expect(component.cobpEligibility).toBe(component.DeviceDetailsFullResponse);
  }));
  it('DeviceOnlyFlow', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.DeviceOnlyFlow(false);
    expect(component.confirmDeviceFlow).toBe(false);
  }));
  it('OnSelectedColor', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "DisplayImageSlider");
    spyOn(component, "NewTagDisplay");
    component.SliderImageList = response[0].items.basic_details;
    component.DeviceDetailsFullResponse = response[0].items;
    component.OnSelectedColor("Red");
    expect(component.colorSelected).toBe("Red");
    expect(component.DisplayImageSlider).toHaveBeenCalled();
    expect(component.NewTagDisplay).toHaveBeenCalled();
  }));
  it('OnSelectedStorage', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    spyOn(component, "NewTagDisplay");
    component.DeviceDetailsFullResponse = response[0].items;
    component.OnSelectedStorage("64GB");
    expect(component.storageSelected).toBe("64GB");
    expect(component.NewTagDisplay).toHaveBeenCalled();
  }));
  it('OnMnpEligibilityPlanPurchase', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.DeviceDetailsResponse = response[0].items.basic_details;
    spyOn(devicedataservice, "publishNumberType");
    spyOn(devicedataservice, "publishPhoneNo");
    component.OnMnpEligibilityPlanPurchase(notEligible);
    expect(component.DeviceDetailsResponse.isMnp).toBe(false);
    expect(component.DeviceDetailsResponse.PrincipalLine).toBe("");
    expect(component.DeviceDetailsResponse.portNumber).toBe("");
    expect(devicedataservice.publishNumberType).toHaveBeenCalledWith("SwitchToCelcom");
    expect(devicedataservice.publishPhoneNo).toHaveBeenCalledWith(component.DeviceDetailsResponse.portNumber);
    expect(component.mnpCheckPlanPurchase).toBe(notEligible);
  }));
  it('test onReInitializeChooseNumberComponent false', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isEasyPhone = false;
    component.onReInitializeChooseNumberComponent();
    expect(component.isInitializeChooseNumber).toBe(true);
  }));
  it('test publishPrincipleLineClicked', () => {
    component.publishPrincipleLineClicked(true);
    expect(component.principleNumber).toBe(true);
  });
  it('test getPlanUrlBySku', () => {
    expect(component.getPlanUrlBySku("FG")).toEqual("first-gold");
  });
  it('test getPlanUrlBySku', () => {
    expect(component.getPlanUrlBySku("FGP")).toEqual("first-gold-plus");
  });
  it('test getPlanUrlBySku', () => {
    expect(component.getPlanUrlBySku("FGS")).toEqual("first-gold-supreme");
  });
  it('test getPlanUrlBySku', () => {
    expect(component.getPlanUrlBySku("FP")).toEqual("first-platinum");
  });
  it('test getPlanUrlBySku', () => {
    expect(component.getPlanUrlBySku("FPP")).toEqual("first-platinum-plus");
  });
  it('error page', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.errorPage();
    expect(component.loading).toBeFalsy();
    expect(component.isInitializeDetailBannerLeft).toBeTruthy();
  }));
  it('test lifestyleEligibilityCheckBundle function', () => {
    component.lifestyleEligibilityCheckBundle(component.DeviceDetailsResponse);
    expect(component.lifestyleAddOnData).toEqual(component.DeviceDetailsResponse);
    expect(component.isLifestyle).toBeFalsy();
    expect(component.isDisplayPromotionalLifeStyle).toBeFalsy();
  });
  it('test EditCartEasyPhone', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.editDeviceObj = {
      "easyPhoneLabel": ""
    };
    component.editProduct = {
      "easyPhoneLabel": "",
      "quantity": "",
      "isPreorder": "",
      "availabilityFlag": "",
      "selectedProductSku": {
        "orderSummaryColor": "",
        "orderSummaryStorage": "",
        "orderPlanName": "",
        "orderPlan": "",
        "orderMonthlyPay": "",
        "selectedPlanDetails": ""
      }
    };
    spyOn(component, "UpdatingPlanDetails");
    component.EditCartEasyPhone();
    if (typeof window !== 'undefined' && localStorage) {
     const editEasyPhone = localStorage.getItem("EditEasyPhone") ? JSON.parse(localStorage.getItem("EditEasyPhone")) : false;
     const EasyPhoneEditCart = localStorage.getItem("EditEasyPhone") ? JSON.parse(localStorage.getItem("EditEasyPhone")) : false;
     expect(editEasyPhone).toBeTruthy();
     expect(EasyPhoneEditCart).toBeTruthy();
    }
    expect(component.isEasyPhone).toBeTruthy();
    devicedataservice.publishRentClicked(false);
    devicedataservice.publishOwnClicked(false);
    devicedataservice.publishBundleClicked(true);
    component.editDeviceObj = null;
    component.editProduct = null;
  }));
  it('test BindImageSlider', () => {
    expect(component.BindImageSlider('Blue')).toEqual(simpleDeviceList);
  });
  it('test UpdatingPlanDetails', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.editDeviceObj = {
      "easyPhoneLabel": ""
    };
    component.editProduct = {
      "easyPhoneLabel": "",
      "quantity": "",
      "isPreorder": "",
      "availabilityFlag": "",
      "selectedProductSku": {
        "orderSummaryColor": "",
        "orderSummaryStorage": "",
        "orderPlanName": "",
        "orderPlan": "",
        "orderMonthlyPay": "",
        "selectedPlanDetails": ""
      }
    };
    component.UpdatingPlanDetails();
    expect(component.isEasyPhone).toBeFalsy();
    expect(component.isRentClicked).toBeFalsy();
    expect(component.isOwnClicked).toBeFalsy();
    expect(component.isBundleClicked).toBeTruthy();
    devicedataservice.publishRentClicked(false);
    devicedataservice.publishOwnClicked(false);
    devicedataservice.publishBundleClicked(true);
    if (typeof window !== 'undefined' && localStorage) {
      const isRentClicked = localStorage.getItem("isRentClicked") ? JSON.parse(localStorage.getItem("isRentClicked")) : false;
      const isOwnClicked = localStorage.getItem("isOwnClicked") ? JSON.parse(localStorage.getItem("isOwnClicked")) : false;
      const isBundleClicked = localStorage.getItem("isBundleClicked") ? JSON.parse(localStorage.getItem("isBundleClicked")) : false;
      expect(isRentClicked).toBeFalsy();
      expect(isOwnClicked).toBeFalsy();
      expect(isBundleClicked).toBeTruthy();
     }
     component.editDeviceObj = null;
    component.editProduct = null;
  }));
  it('test NewTagDisplay', () => {
    component.colorSelected = "Blue";
    component.storageSelected = "64GB";
    component.NewTagDisplay();
    expect(component.NewTag).toBeTruthy();
  });
  it('test onCobpEligibilityData', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isEasyPhone = false;
    component.onCobpEligibilityData({});
    devicedataservice.publishPhoneNo(null);
    devicedataservice.publishNumberType(null);
    devicedataservice.publishEasyPhoneTabsClicked(null);
    devicedataservice.publishDeviceUpfront(null);
    devicedataservice.publishPlanUpfront(null);
  }));
  it('test OnContinueDealerCheck', () => {
    component.OnContinueDealerCheck({});
    expect(component.IsDisplayDealerPopup).toBeFalsy();
  });
  it('Init device only', () => {
    const itemsToCheck = [
      "BuyNoPlan",
      "SelectedPlan",
      "SelectedPlanDetails",
      "SelectedMonthlyPay",
      "SelectedPlanName",
      "telcoDayRebate",
      "CartEditProduct",
    ];
    localStorage.setItem('BuyNoPlan', "true");
    localStorage.setItem("telcoDayRebate", "true");
    component.Init();
    itemsToCheck.forEach(itm => {
        const a = localStorage.getItem(itm);
        expect(a).toBe(null);
    });
    expect(component.isRentClicked).toBeFalsy();
    expect(component.isOwnClicked).toBeFalsy();
    expect(component.isBundleClicked).toBeFalsy();
    localStorage.removeItem('BuyNoPlan');
    localStorage.removeItem('telcoDayRebate');
  });

  it('edit cart', () => {
    const mockCart = {
      "quantity": 1,
      "item_id": "71030",
      "itemTotal": "2274.0000",
      "price": 2274,
      "selectedProduct": {
          "orderMonthlyPayTotal": 50,
          "is_moon": false,
          "is_star": true,
          "orderDevice": "Huawei P20 128GB Pink",
          "orderDeviceName": "Huawei P20 128GB Pink",
          "selectedProductSku": "HuaweiP20128GBPink",
          "selectedImageList": [
              "/media/catalog/product/9/0/900x900_5_20.png"
          ],
          "orderPlanName": "Celcom Ultra",
          "orderPlan": "Ultra-Base",
          "urlKey": "ultra-base-plan-1",
          "orderMonthlyPay": "40.0000",
          "plan_image_url": "/media/catalog/product",
          "orderOneTimePay": 0,
          "eligibilty": null,
          "orderPhoneNo": "0133631269",
          "orderNumberType": "NewNumber",
          "orderReqPlanComponent": [
              {
                  "component_name": "Executive Plan VAS without GPRS_92378",
                  "component_part_no": "CPT04540",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "First Unlimited",
                  "component_part_no": "CPT12290",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "Default International Roaming Voice/SMS",
                  "component_part_no": "CPT13540",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "New LTE-Voice",
                  "component_part_no": "LTE0070",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "SIM Card",
                  "component_part_no": "SM00010",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "RTP Voice Service",
                  "component_part_no": "RTP0010",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "International Roaming Data",
                  "component_part_no": "NVF01000",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "Rebate DDR RTP",
                  "component_part_no": "DNR5960",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "New Package for IDD Activation",
                  "component_part_no": "CPT07",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "Celcom Ultra Commitment Fee",
                  "component_part_no": "CPT19090",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "Celcom Ultra Family Group Offer Plan",
                  "component_part_no": "GR00111",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "EasyPhone Rental",
                  "component_part_no": "EP001022",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              },
              {
                  "component_name": "Celcom Ultra",
                  "component_part_no": "PB19090",
                  "component_default": "0",
                  "component_price": "0.0000",
                  "cbs_name": "Celcom Ultra Plan",
                  "cbs_part_number": "PR019090",
                  "isvas": "0",
                  "vasname": null,
                  "vasvalue": null
              }
          ],
          "selectedPlanDetails": {
              "name": "Celcom Ultra",
              "sku": "Ultra-Base",
              "urlKey": "ultra-base-plan-1",
              "monthly_plan": "40.0000",
              "order_plan_bundle": "PB19090",
              "order_service_bundle": "RTP0010",
              "order_plan_component": [
                  {
                      "component_name": "Executive Plan VAS without GPRS_92378",
                      "component_part_no": "CPT04540",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "First Unlimited",
                      "component_part_no": "CPT12290",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "Default International Roaming Voice/SMS",
                      "component_part_no": "CPT13540",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "New LTE-Voice",
                      "component_part_no": "LTE0070",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "SIM Card",
                      "component_part_no": "SM00010",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "RTP Voice Service",
                      "component_part_no": "RTP0010",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "International Roaming Data",
                      "component_part_no": "NVF01000",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "Rebate DDR RTP",
                      "component_part_no": "DNR5960",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "New Package for IDD Activation",
                      "component_part_no": "CPT07",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "Celcom Ultra Commitment Fee",
                      "component_part_no": "CPT19090",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "Celcom Ultra Family Group Offer Plan",
                      "component_part_no": "GR00111",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "EasyPhone Rental",
                      "component_part_no": "EP001022",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  },
                  {
                      "component_name": "Celcom Ultra",
                      "component_part_no": "PB19090",
                      "component_default": "0",
                      "component_price": "0.0000",
                      "cbs_name": "Celcom Ultra Plan",
                      "cbs_part_number": "PR019090",
                      "isvas": "0",
                      "vasname": null,
                      "vasvalue": null
                  }
              ],
              "new_customer": "0",
              "segment": null,
              "upfront_installment": null,
              "product_type": null,
              "start_date": null,
              "end_date": null,
              "BackgroundColor": null,
              "IndicatorClass": null,
              "ProductText": null,
              "KeyFiguresText": "10GB",
              "KeyText": "RM40",
              "BuynowLink": "/plans/mega",
              "BuynowText": "Buy now",
              "knowMoreLink": null,
              "knowMoreText": null,
              "MobileDescription": null,
              "TableInfo": [],
              "terms_and_condition": {
                  "plans": {
                      "label": "Plans",
                      "desc": null
                  },
                  "contract_terms": {
                      "label": "Contract Duration",
                      "desc": "24 months contract"
                  },
                  "legal": {
                      "label": "Legal",
                      "desc": null
                  },
                  "cancellation": {
                      "label": "Cancellation",
                      "desc": null
                  }
              },
              "AtrHref": "#rm-0",
              "telco_day": {
                  "status": false,
                  "hat_text": null,
                  "message": null
              },
              "is_premium_plan": false,
              "is_golden_number": 0,
              "additional_information": null
          },
          "selected_pass_details": {
              "name": "Pass GB",
              "sku": "Ultra-GB",
              "monthly_plan": "10.0000",
              "order_plan_bundle": "CPT19092",
              "new_customer": "0",
              "segment": null,
              "upfront_installment": null,
              "product_type": null,
              "start_date": null,
              "end_date": null,
              "BackgroundColor": null,
              "IndicatorClass": null,
              "ProductText": null,
              "KeyFiguresText": null,
              "KeyText": null,
              "selected_associated_pass_details": {
                  "name": "GB M",
                  "sku": "Ultra-GB-M-Pass",
                  "monthly_plan": "50.0000",
                  "order_plan_bundle": "CPT19094",
                  "new_customer": "0",
                  "segment": "10",
                  "upfront_installment": null,
                  "product_type": "Service",
                  "start_date": null,
                  "end_date": null,
                  "BackgroundColor": "Black",
                  "IndicatorClass": "is-bg-color-black",
                  "ProductText": "GB M",
                  "KeyFiguresText": "50GB",
                  "KeyText": "RM50"
              }
          },
          "orderDevicePrice": "1378.0000",
          "orderSummaryColor": "Pink",
          "orderSummaryStorage": "128GB",
          "orderReqServiceBundle": "",
          "orderTotalPay": 2274,
          "total": 2274,
          "contract": "24 months contract",
          "orderReqBrand": "HUAWEI",
          "orderReqCategory": "HP",
          "orderReqColor": "PNK",
          "orderReqModel": "P20 128GB",
          "orderReqPartNumber": "MDR5667",
          "free_gift_data": {
              "gift_image": "/media/catalog/product/s/i/side_900x900_2.png",
              "gift_message": "Receive a free gift when you pre-order now"
          },
          "mnp_data": null,
          "is_mnp": false
      },
      "sku": "Huawei-P20-Ultra-Base-Ultra-GB-HuaweiP20128GBPink-Ultra-GB-M-Pass",
      "skuBundle": "Huawei-P20",
      "isPreorder": 0,
      "easyPhoneLabel": "EasyPhone  (24 months contract)",
      "availabilityFlag": 0,
      "has_add_ons": false,
      "add_on_label": null,
      "add_on_code": null,
      "promotion_details": "ADA",
      "utm_source": null,
      "is_campaign_mviva": 0,
      "campaign100_days": false,
      "campaign_mviva_url": "",
      "campaign_mviva_message": null,
      "billType": 0,
      "deviceUpfrontPenalty": 0,
      "is_telco_day": false,
      "telco_day_message": "",
      "is_easyphone": false
  };
    localStorage.setItem("CartEditProduct", JSON.stringify(mockCart));
    component.Init();
    const a = localStorage.getItem("CartEditProduct");
    expect(a).toBe(null);
    expect(component.editDeviceObj).toBeDefined();
  });
});
