import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DeviceDetailsSummaryComponent } from "./device-details-summary-section.component";
import { AgentFooterComponent } from "../../../../Footer/agent-footer/agent-footer.component";
import { SocialMediaComponent } from "../../../../Footer/SocialMedia/socialmedia.component";
import { MinifiedPageLoaderComponent } from "../../../../Store/widget/minified-page-loader/minified-page-loader.component";
import { FooterComponent } from "../../../../Footer/footer.component";
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { FooterDownloadComponent } from "../../../../Footer/Download/download.component";
import { NotificationErrorComponent } from "../../../../Store/widget/notification-error/notification-error.component";
import { AgeEligibilityPopupComponent } from "../../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component";
import { CheckoutHeroBannerComponent } from "../../checkout-hero-banner/checkout-hero-banner.component";
import { AppService } from "../../../../Service/app.service";
import { AppMockService } from "../../../../Service/appmock.service";
import { GetParametersService } from "../../../../Service/getParamaters.service";
import { DeviceDataService } from "../../../../Service/devicedata.service";
import { EStoreAnalysticsService } from "../../../../Service/store.analytic.service";
import { AnalyticsService } from "../../../../Service/analytic.service";
import { RendererService } from "../../../../Service/renderer.service";
import { SeoService } from "../../../../Service/seo.service";
import { UserService } from "../../../../Service/user.service";
import { BundleService } from "../../../../Service/bundle.service";
import { CartService } from "../../../../Service/cart.service";
import { NotificationPopupEvent } from "../../../../Service/broadcaster.service";
import { Broadcaster } from "../../../../Model/broadcaster.model";
import { OrderInfoService } from "../../../../Service/orderinfo.service";
import { HeaderService } from "../../../../Header/header.service";
import { RedirectionService } from "../../../../Service/redirection.service";
import { SupplimentaryLinesService } from "../../../../Store/widget/supplementary-lines/supplementary-lines.service";
import { BroadbandService } from "../../../../Service/broadband.service";
import { DeviceDetailsStorageService } from "../device-details-color-storage/device-details-color-storage.service";
import { CommonUtilService } from "../../../../Service/commonUtil.service";
import { CheckoutService } from "../../../../Store/checkout/services/checkout.service";
import { RemarketAnalyticsService } from "../../../../Service/remarket-analytics.service";
import { HomeService } from "../../../../Service/home.service";
import { configureTestSuite } from 'ng-bullet';
import { SafeHtmlPipe } from "../../../../shared/pipes/safe-html.pipe";
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
const mockData = {
  basic_details: {
    name: "iPhone XS",
    id: "400",
    sku: "iPhone-XS",
    upper_age_limit: null,
    lower_age_limit: null,
    price: "4999.0000",
    quntity: 0,
    preorder: 0,
    preorder_availability_flag: 0,
    midnight_delivery: { status: 0, label: "" },
    is_easy_phone: 1,
    is_rent: false,
    is_own: true,
    default_plan: "Celcom Mobile Platinum Plus",
    default_plan_sku: "FPP",
    order_monthly_pay: "188.0000",
    nfc: "1",
    mostpopular: "1",
    rm: 3188,
    rrp_rm_strick_price: "4999.0000",
    upfront_price: 0,
    device_price: 0,
    main_image: "/media/catalog/product/f/r/front_900x900_2_4_1.png",
    sub_images: ["/media/catalog/product/f/r/front_900x900_2_4_1.png"],
    dimension: "143.6X70.9X7.7mm",
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
    order_model: "IPHONE XS 64GB",
    order_brand: "APPLE",
    segment: "10",
    start_date: "2018-10-17 05:31:41",
    end_date: "2019-07-03 08:28:29",
    default_selected_color: "Gold",
    default_selected_memory: "64GB",
    pre_order_data: {
      preorder_estimate_delivery_text: "6",
      preorder_estimate_delivery_date: "6",
      preorder_text: "PRE-ORDER ENDED",
      preorder_from_date_text: "From",
      preorder_to_date_text: "to",
      preorder_from_date: "17 Jun 2019",
      preorder_to_date: "30 Jun 2019",
      preorder_end_flag: 1,
      preorder_estimate_delivery: "6",
      preorder_submit_date: "2019-06-30 00:00:00",
      preorder_stock_available_quantity: 0,
      preorder_availble_stock_in_hand: 0,
      preorder_stock_status_flag: 0
    },
    is_campaign_mviva: null,
    campaign_mviva: null,
    campaign_mviva_invalid: null,
    is_lifestyle: 0,
    addons: [],
    stock_indicator_image: "/media/catalog/product",
    isEasyPhoneDevice: true,
    editProduct: null
  },
  supplementary_details: {
    name: "Celcom Mobile Family™",
    celcom_family_plan: [
      {
        name: "First™ Gold",
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
        name: "First™ Gold Plus",
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
      },
      {
        name: "First™ Platinum",
        max_line: "4",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FP",
          "FPP",
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
        name: "Celcom Mobile Platinum Plus",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FPP",
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
        name: "First™ Gold Supreme",
        max_line: "3",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
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
        name: "Xpax™ XP60",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FPP",
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
        name: "Celcom First™ Gold Plus Mviva",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FPP",
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
        name: "First™ Gold Plus (RET)",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FPP",
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
        name: "Kardashian",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FPP",
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
        name: "Home Wireless Gold",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FPP",
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
        name: "Home Wireless Gold Plus",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FPP",
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
        name: "Home Wireless Platinum",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "150",
        enable_plan_skus: [
          "FPP",
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
        name: "First™ Basic 38",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "0",
        enable_plan_skus: [
          "FPP",
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
        name: "First Basic 38",
        max_line: "5",
        part_number: "PB12540",
        price: "48.0000",
        subsidy: "0",
        enable_plan_skus: [
          "FPP",
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
      name: "iPhone XS 64GB Silver",
      sku: "iphonexs64gbsilver",
      is_new: true,
      rrp: "4999.0000",
      discounted_device_rrp: null,
      color: "Silver",
      order_color: "SLV",
      order_category: "HP",
      color_hexa: "#c0c0c0",
      memory: "64GB",
      image: "/media/catalog/product/f/r/front_900x900_2.png",
      sub_images: [
        "/media/catalog/product/b/a/back_900x900_1.png",
        "/media/catalog/product/f/r/front_900x900_2.png",
        "/media/catalog/product/s/i/side_900x900_3.png"
      ],
      order_model: "IPHONE XS 64GB",
      part_number: "MDR6050",
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
            device_price: "3628",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "3838",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "3478",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "3188",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1700",
            device_price: "3299",
            penalty_price: "1700",
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
        preorder_stock_available_quantity: 993,
        preorder_availble_stock_in_hand: 989,
        preorder_stock_status_flag: 1
      },
      free_gift_data: {
        gift_image: "/media/catalog/product/b/a/back_900x900_1.png"},
      easy_phone: {
        rent: [{ FGP: "166" }, { FGS: "199" }, { FP: "102" }],
        own: [{ FGP: "200" }, { FGS: "122" }, { FP: "111" }],
        rent_selected_plan: ["FGP", "FGS", "FP"],
        own_selected_plan: ["FGP", "FGS", "FP"],
        penalityown: [{ FGP: "4536" }, { FGS: "5000" }, { FP: "5001" }],
        penalityrent: [{ FGP: "3504" }, { FGS: "3000" }, { FP: "3001" }]
      },
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "iPhone XS 64GB Space Grey",
      sku: "iphonexs64gbspacegrey",
      is_new: true,
      rrp: "4999.0000",
      discounted_device_rrp: null,
      color: "Grey",
      order_color: "GRY",
      order_category: "HP",
      color_hexa: "#808080",
      memory: "64GB",
      image: "/media/catalog/product/f/r/front_900x900_9.png",
      sub_images: [
        "/media/catalog/product/f/r/front_900x900_9.png",
        "/media/catalog/product/b/a/back_900x900_8.png",
        "/media/catalog/product/s/i/side_900x900_10.png"
      ],
      order_model: "IPHONE XS 64GB",
      part_number: "MDR6050",
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
            device_price: "3628",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "3838",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "3478",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "3188",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1300",
            device_price: "4000",
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
        preorder_availble_stock_in_hand: 998,
        preorder_stock_status_flag: 1
      },
      free_gift_data: {
        gift_image: "/media/catalog/productno_selection"},
      easy_phone: {
        rent: [{ FGP: "126" }, { FGS: "114" }],
        own: [{ FGP: "170" }, { FGS: "157" }],
        rent_selected_plan: ["FGP", "FGS"],
        own_selected_plan: ["FGP", "FGS"],
        penalityown: [{ FGP: "4536" }, { FGS: "4536" }],
        penalityrent: [{ FGP: "3504" }, { FGS: "3504" }]
      },
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "iPhone XS 64GB Gold",
      sku: "iphonexs64gbgold",
      is_new: true,
      rrp: "4999.0000",
      discounted_device_rrp: null,
      color: "Gold",
      order_color: "GLD",
      order_category: "HP",
      color_hexa: "#cdbeab",
      memory: "64GB",
      image: "/media/catalog/product/f/r/front_900x900_8.png",
      sub_images: [
        "/media/catalog/product/f/r/front_900x900_8.png",
        "/media/catalog/product/b/a/back_900x900_7.png",
        "/media/catalog/product/s/i/side_900x900_9.png",
        "/media/catalog/product/f/r/front_900x900_2_4_1.png"
      ],
      order_model: "IPHONE XS 64GB",
      part_number: "MDR6050",
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
            device_price: "3628",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "3838",
            penalty_price: "1000",
            supplementary_count: "1",
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "3478",
            penalty_price: "1500",
            supplementary_count: "2",
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "3188",
            penalty_price: "1500",
            supplementary_count: "3",
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1300",
            device_price: "4000",
            penalty_price: "1500",
            supplementary_count: "4",
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
        preorder_from_date: "18 Oct 2018",
        preorder_to_date: "23 Oct 2018",
        preorder_end_flag: 1,
        preorder_estimate_delivery: null,
        preorder_submit_date: "2018-10-21 00:00:00",
        preorder_stock_available_quantity: 1000,
        preorder_availble_stock_in_hand: 985,
        preorder_stock_status_flag: 1
      },
      free_gift_data: {
        gift_image: "/media/catalog/productno_selection"},
      easy_phone: {
        rent: [{ FGP: "99" }, { FGS: "127" }, { FP: "115" }],
        own: [{ FGP: "142" }, { FGS: "170" }, { FP: "157" }],
        rent_selected_plan: ["FGP", "FGS", "FP"],
        own_selected_plan: ["FGP", "FGS", "FP"],
        penalityown: [{ FGP: "4536" }, { FGS: "4536" }, { FP: "4536" }],
        penalityrent: [{ FGP: "3504" }, { FGS: "3504" }, { FP: "3504" }]
      },
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "iPhone XS 256GB Silver",
      sku: "iphonexs256gbsilver",
      is_new: true,
      rrp: "5689.0000",
      discounted_device_rrp: null,
      color: "Silver",
      order_color: "SLV",
      order_category: "HP",
      color_hexa: "#c0c0c0",
      memory: "256GB",
      image: "/media/catalog/product/f/r/front_900x900_4.png",
      sub_images: [
        "/media/catalog/product/f/r/front_900x900_4.png",
        "/media/catalog/product/b/a/back_900x900_3.png",
        "/media/catalog/product/s/i/side_900x900_5.png"
      ],
      order_model: "IPHONE XS 256GB",
      part_number: "MDR6030",
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
            device_price: "4258",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "4468",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "4108",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "3818",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1500",
            device_price: "4000",
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
        gift_image: "/media/catalog/productno_selection"},
      easy_phone: {
        rent: [{ FGP: "146" }, { FGS: "134" }, { FP: "129" }],
        own: [{ FGP: "196" }, { FGS: "184" }, { FP: "179" }],
        rent_selected_plan: ["FGP", "FGS", "FP"],
        own_selected_plan: ["FGP", "FGS", "FP"],
        penalityown: [{ FGP: "5184" }, { FGS: "5184" }, { FP: "5184" }],
        penalityrent: [{ FGP: "3984" }, { FGS: "3984" }, { FP: "3984" }]
      },
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "iPhone XS 256GB Space Grey",
      sku: "iphonexs256gbspacegrey",
      is_new: true,
      rrp: "5689.0000",
      discounted_device_rrp: null,
      color: "Grey",
      order_color: "GRY",
      order_category: "HP",
      color_hexa: "#808080",
      memory: "256GB",
      image: "/media/catalog/product/s/i/side_900x900_8.png",
      sub_images: [
        "/media/catalog/product/s/i/side_900x900_8.png",
        "/media/catalog/product/b/a/back_900x900_6.png",
        "/media/catalog/product/f/r/front_900x900_7.png"
      ],
      order_model: "IPHONE XS 256GB",
      part_number: "MDR6030",
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
            device_price: "4258",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "4468",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "4108",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "3818",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1500",
            device_price: "4000",
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
        gift_image: "/media/catalog/productno_selection"},
      easy_phone: {
        rent: [{ FGP: "146" }, { FGS: "134" }, { FP: "129" }],
        own: [{ FGP: "196" }, { FGS: "184" }, { FP: "179" }],
        rent_selected_plan: ["FGP", "FGS", "FP"],
        own_selected_plan: ["FGP", "FGS", "FP"],
        penalityown: [{ FGP: "5184" }, { FGS: "5184" }, { FP: "5184" }],
        penalityrent: [{ FGP: "3984" }, { FGS: "3984" }, { FP: "3984" }]
      },
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "iPhone XS 256GB Gold",
      sku: "iphonexs256gbgold",
      is_new: true,
      rrp: "5689.0000",
      discounted_device_rrp: null,
      color: "Gold",
      order_color: "GLD",
      order_category: "HP",
      color_hexa: "#cdbeab",
      memory: "256GB",
      image: "/media/catalog/product/f/r/front_900x900_5.png",
      sub_images: [
        "/media/catalog/product/f/r/front_900x900_5.png",
        "/media/catalog/product/b/a/back_900x900_4.png",
        "/media/catalog/product/s/i/side_900x900_6.png"
      ],
      order_model: "IPHONE XS 256GB",
      part_number: "MDR6030",
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
            device_price: "4258",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "4468",
            penalty_price: "1000",
            supplementary_count: "2",
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "4108",
            penalty_price: "1500",
            supplementary_count: "2",
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "3818",
            penalty_price: "1500",
            supplementary_count: "2",
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1500",
            device_price: "4000",
            penalty_price: "1500",
            supplementary_count: "2",
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
        gift_image: "/media/catalog/productno_selection"},
      easy_phone: {
        rent: [{ FGP: "146" }, { FGS: "134" }, { FP: "129" }],
        own: [{ FGP: "196" }, { FGS: "184" }, { FP: "179" }],
        rent_selected_plan: ["FGP", "FGS", "FP"],
        own_selected_plan: ["FGP", "FGS", "FP"],
        penalityown: [{ FGP: "5184" }, { FGS: "5184" }, { FP: "5184" }],
        penalityrent: [{ FGP: "3984" }, { FGS: "3984" }, { FP: "3984" }]
      },
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "iPhone XS 512GB Silver",
      sku: "iphonexs512gbsilver",
      is_new: true,
      rrp: "6629.0000",
      discounted_device_rrp: null,
      color: "Silver",
      order_color: "SLV",
      order_category: "HP",
      color_hexa: "#c0c0c0",
      memory: "512GB",
      image: "/media/catalog/product/f/r/front_900x900_6.png",
      sub_images: [
        "/media/catalog/product/f/r/front_900x900_6.png",
        "/media/catalog/product/b/a/back_900x900_5.png",
        "/media/catalog/product/s/i/side_900x900_7.png"
      ],
      order_model: "IPHONE XS 512GB",
      part_number: "MDR6040",
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
            device_price: "5108",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "5328",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "4968",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "4678",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1300",
            device_price: "5000",
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
        gift_image: "/media/catalog/productno_selection"},
      easy_phone: {
        rent: [{ FGP: "174" }, { FGS: "161" }, { FP: "156" }],
        own: [{ FGP: "232" }, { FGS: "219" }, { FP: "214" }],
        rent_selected_plan: ["FGP", "FGS", "FP"],
        own_selected_plan: ["FGP", "FGS", "FP"],
        penalityown: [{ FGP: "6024" }, { FGS: "6024" }, { FP: "6024" }],
        penalityrent: [{ FGP: "4632" }, { FGS: "4632" }, { FP: "4632" }]
      },
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "iPhone XS 512GB Space Grey",
      sku: "iphonexs512gbspacegrey",
      is_new: true,
      rrp: "6629.0000",
      discounted_device_rrp: null,
      color: "Grey",
      order_color: "GRY",
      order_category: "HP",
      color_hexa: "#808080",
      memory: "512GB",
      image: "/media/catalog/product/f/r/front_900x900_10.png",
      sub_images: [
        "/media/catalog/product/f/r/front_900x900_10.png",
        "/media/catalog/product/b/a/back_900x900_9.png",
        "/media/catalog/product/s/i/side_900x900_11.png"
      ],
      order_model: "IPHONE XS 512GB",
      part_number: "MDR6040",
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
            device_price: "5108",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "5328",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "4968",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "4678",
            penalty_price: "1500",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1500",
            device_price: "5000",
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
        gift_image: "/media/catalog/productno_selection"},
      easy_phone: {
        rent: [{ FGP: "174" }, { FGS: "161" }, { FP: "156" }],
        own: [{ FGP: "232" }, { FGS: "219" }, { FP: "214" }],
        rent_selected_plan: ["FGP", "FGS", "FP"],
        own_selected_plan: ["FGP", "FGS", "FP"],
        penalityown: [{ FGP: "6024" }, { FGS: "6024" }, { FP: "6024" }],
        penalityrent: [{ FGP: "4632" }, { FGS: "4632" }, { FP: "4632" }]
      },
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "iPhone XS 512GB Gold",
      sku: "iphonexs512gbgold",
      is_new: true,
      rrp: "6629.0000",
      discounted_device_rrp: null,
      color: "Gold",
      order_color: "GLD",
      order_category: "HP",
      color_hexa: "#cdbeab",
      memory: "512GB",
      image: "/media/catalog/product/f/r/front_900x900_3.png",
      sub_images: [
        "/media/catalog/product/f/r/front_900x900_3.png",
        "/media/catalog/product/b/a/back_900x900_2.png",
        "/media/catalog/product/s/i/side_900x900_4.png"
      ],
      order_model: "IPHONE XS 512GB",
      part_number: "MDR6040",
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
            device_price: "5108",
            penalty_price: "1000",
            supplementary_count: "2",
            special_price: 0
          }
        },
        {
          sku: "FGP",
          prices: {
            upfront_price: "700",
            device_price: "5328",
            penalty_price: "1000",
            supplementary_count: "2",
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "1100",
            device_price: "4968",
            penalty_price: "1500",
            supplementary_count: "2",
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1300",
            device_price: "4678",
            penalty_price: "1500",
            supplementary_count: "2",
            special_price: 0
          }
        },
        {
          sku: "xpax_50",
          prices: {
            upfront_price: "1300",
            device_price: "5000",
            penalty_price: "1600",
            supplementary_count: "2",
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
        gift_image: "/media/catalog/productno_selection"},
      easy_phone: {
        rent: [{ FGP: "174" }, { FGS: "161" }, { FP: "156" }],
        own: [{ FGP: "232" }, { FGS: "219" }, { FP: "214" }],
        rent_selected_plan: ["FGP", "FGS", "FP"],
        own_selected_plan: ["FGP", "FGS", "FP"],
        penalityown: [{ FGP: "6024" }, { FGS: "6024" }, { FP: "6024" }],
        penalityrent: [{ FGP: "4632" }, { FGS: "4632" }, { FP: "4632" }]
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
          name: "First™ Platinum",
          sku: "FP",
          monthlyPlan: "148.0000",
          orderPlanBundle: "PB11820",
          orderServiceBundle: "RTP0010",
          PlanMonthlyPay: "148.0000",
          OneTimePayment: null,
          newCustomer: "0",
          segment: "10",
          upfrontInstallment: null,
          contract: "24",
          PlanName: "First™ Platinum",
          plan_title: "First™ Platinum",
          plan_subtitle:
            "Now with extra privileges when you sign up for 12 months.",
          banner_image:
            "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
          mobile_image:
            "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
          footNote: null,
          upper_age_limit: null,
          lower_age_limit: "18",
          ngn_part_number: "PB09890",
          is_xpax: false,
          additional_information: null,
          productType: "Service",
          startDate: null,
          endDate: null,
          backgroundColor: "is-bg-color-black",
          indicatorClass: "is-level-platinum",
          productText: "Platinum",
          keyFiguresText: "60 GB",
          keyText: "RM 148",
          buyNowLink: "/plans/first-platinum",
          buyNowText: "Buy now",
          knowMoreLink: "/store/plans/first-platinum",
          knowMoreText: "Learn more",
          mobileDescription: null,
          tableInfo: [],
          is_premium_plan: false,
          AtrHref: "#rm-0",
          atrHref: "#rm-21"
        },
        {
          name: "First™ Gold Supreme",
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
          PlanName: "First™ Gold Supreme",
          plan_title: "First™ Gold Supreme",
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
            plans: { label: "Plans", desc: null },
            contractTerms: {
              label: "Contract Duration",
              desc: "24 months contract"
            },
            legal: { label: "Legal", desc: null },
            cancellation: { label: "Cancellation", desc: null }
          },
          is_premium_plan: false,
          AtrHref: "#rm-1",
          atrHref: "#rm-19"
        },
        {
          name: "First™ Gold Plus",
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
          PlanName: "First™ Gold Plus",
          plan_title: "First™ Gold Plus. Affordable. Complete",
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
          is_premium_plan: false,
          AtrHref: "#rm-2",
          atrHref: "#rm-20"
        },
        {
          name: "Celcom Mobile Platinum Plus",
          sku: "FPP",
          monthlyPlan: "188.0000",
          orderPlanBundle: "PB11860",
          orderServiceBundle: "RTP0010",
          PlanMonthlyPay: "188.0000",
          OneTimePayment: null,
          newCustomer: "0",
          segment: "10",
          upfrontInstallment: null,
          contract: "24",
          PlanName: "Celcom Mobile Platinum Plus",
          plan_title: "First™ Platinum Plus",
          plan_subtitle:
            "Happiness unlimited. Sign up for 12 months and get extra privileges.",
          banner_image:
            "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg",
          mobile_image:
            "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg",
          footNote: null,
          upper_age_limit: null,
          lower_age_limit: "18",
          ngn_part_number: "PB11900",
          is_xpax: false,
          additional_information: null,
          productType: "Service",
          startDate: null,
          endDate: null,
          backgroundColor: "is-bg-color-black",
          indicatorClass: "is-level-platinum-plus",
          productText: "Platinum Plus",
          keyFiguresText: "100 GB",
          keyText: "RM 188",
          buyNowLink: "/plans/first-platinum-plus",
          buyNowText: "Buy now",
          knowMoreLink: "/store/plans/first-platinum-plus",
          knowMoreText: "Learn more",
          mobileDescription: null,
          tableInfo: [],
          is_premium_plan: false,
          AtrHref: "#rm-3",
          atrHref: "#rm-22"
        }
      ],
      planType: "POSTPAID",
      isXpax: false
    },
    {
      tabName: "Xpax™ Plans",
      tabTitle: null,
      tabSubtitle: null,
      is_xpax: true,
      tabData: [
        {
          name: "XPAX 50",
          sku: "xpax_50",
          monthlyPlan: "50.0000",
          orderPlanBundle: "PB12750",
          orderServiceBundle: "RTP2000",
          PlanMonthlyPay: "50.0000",
          OneTimePayment: null,
          newCustomer: "0",
          segment: "10",
          upfrontInstallment: null,
          contract: "24",
          PlanName: "XPAX 50",
          plan_title: "Xpax 50",
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
          additional_information: null,
          productType: "Service",
          startDate: null,
          endDate: null,
          backgroundColor: "is-bg-color-black",
          indicatorClass: "is-level-xpax",
          productText: "XPAX 50",
          keyFiguresText: "15 GB",
          keyText: "RM 50",
          buyNowLink: "/plans/xpax-50",
          buyNowText: "Buy now",
          knowMoreLink: "/store/plans/xpax-50",
          knowMoreText: "Learn more",
          mobileDescription: null,
          tableInfo: [],
          is_premium_plan: false,
          atrHref: "#rm-23"
        }
      ],
      planType: "XPAX",
      isXpax: true
    }
  ]
};

describe("DeviceDetailsSummaryComponent ", () => {
  let component: DeviceDetailsSummaryComponent;
  let fixture: ComponentFixture<DeviceDetailsSummaryComponent>;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, materialModules],
      declarations: [
        DeviceDetailsSummaryComponent,
        MinifiedPageLoaderComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        PageLoaderComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        CheckoutHeroBannerComponent,
        SafeHtmlPipe
      ],
      providers: [
        { provide: ActivatedRoute, useClass: MockactivatedRoute },
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
        HeaderService,
        RedirectionService,
        SupplimentaryLinesService,
        HttpClient,
        BroadbandService,
        DeviceDataService,
        CommonUtilService,
        CheckoutService,
        DeviceDetailsStorageService,
        RemarketAnalyticsService,
        HomeService,
        GetParametersService
      ]
    });
  });
  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeviceDetailsSummaryComponent);
    component = fixture.componentInstance;
    component.data = mockData;
    component.isPromotion = false;
    component.selectedProd = null;
    component.mnpData = null;
    component.productToRemoveFromCart = null;
  }));
  it("should create device details summary component", () => {
    expect(component).toBeTruthy();
  });
  it("should test default click", () => {
    const click = component.defaultOnClick();
    expect(click).toBeFalsy();
  });
  it("should test init function", () => {
    spyOn(component, "Init");
    component.ngOnInit();
    expect(component.Init).toHaveBeenCalled();
  });
  it("should test plan new number function", () => {
    component.PlanNewNumber();
  });
  it("should test plan new number star function", () => {
    component.PlanNewNumberStar();
  });
  it("should test checkbaseplan function", () => {
    component.checkStarBasePlan();
  });
  it("should test bundle price", () => {
    component.isRentClicked = false;
    component.isOwnClicked = false;
    component.ngOnInit();
    component.isRentClicked = false;
    expect(component.isRentClicked).toBeFalsy();
    expect(component.isOwnClicked).toBeFalsy();
    expect(component.bundlePrice).toBe(0);
    expect(component.bundleUpfrontPrice).toBe(0);
  });
  it("should test setMvivaParams", () => {
    localStorage.setItem("mvivaSummaryMessage", "abc");
    localStorage.setItem("mvivaPlanUpfront", "true");
    localStorage.setItem("mvivaBundleUpfront", "false");
    spyOn(DeviceDataService.prototype, "publishTotalPay");
    component.setMvivaParams();
    expect(component.mvivaSummaryMessage).toBe("abc");
    expect(component.mvivaPlanUpfront).toBeTruthy();
    expect(component.mvivaBundleUpfront).toBeFalsy();
    expect(DeviceDataService.prototype.publishTotalPay).toHaveBeenCalledWith(0);
  });
  it('test ngoninit', inject([DeviceDataService], (service: DeviceDataService) => {
    spyOn(component, "Init");
    component.ngOnInit();
    expect(component.Init).toHaveBeenCalled();
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishErrorNotificationBoolean(false);
    expect(component.errorMessage).toBeFalsy();
    expect(component.errorAddToCart).toBeFalsy();
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishUpfrontWaived(false);
    expect(component.upfrontWaived).toBeFalsy();
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.orderDevicePrice = 10;
    spyOn(service, "publishTotalPay");
    component.ngOnInit();
    service.publishUpfrontWaived(true);
    expect(component.upfrontWaived).toBeTruthy();
    expect(service.publishTotalPay).toHaveBeenCalledWith(component.orderDevicePrice);
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishSharedContract("24");
    expect(component.SharedContract).toBe("24");
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishImage("/media/catalog/product/f/r/front_900x900_2.png");
    expect(component.selectedImage).toBe("/media/catalog/product/f/r/front_900x900_2.png");
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    const sub_images =  ["/media/catalog/product/b/a/back_900x900_1.png", "/media/catalog/product/f/r/front_900x900_2.png",
      "/media/catalog/product/s/i/side_900x900_3.png"
    ];
    service.publishImageList(sub_images);
    expect(component.selectedImageList).toBe(sub_images);
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishMonthlyPay(20);
    expect(component.orderMonthlyPay).toBe(20);
    expect(component.totalPayEasyPhone).toBe(20);
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishTotalPay(0);
    expect(component.orderTotalPay).toBe(0);
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishOneTimePay(200);
    expect(component.orderOneTimePay).toBe(200);
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishStorage("256GB");
    expect(component.orderSummaryStorage).toBe("256GB");
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishColor("Red");
    expect(component.orderSummaryColor).toBe("Red");
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishPhoneNo("60133333333");
    expect(component.orderPhoneNo).toBe("60133333333");
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishEligibility(true);
    expect(component.eligibilty).toBeTruthy();
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishDevicePrice(1500);
    expect(component.orderDevicePrice).toBe(1500);
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.ngOnInit();
    service.publishPlan("FPP");
    expect(component.orderPlan).toBe("FPP");
  }));
  it('test init method', inject([DeviceDataService], (service: DeviceDataService) => {
    component.Init();
    service.publishNotificationError(false);
    expect(component.errorMessage).toBeFalsy();
    service.publishDevice("iphonexs256gbsilver");
    expect(component.orderDevice).toBe("iphonexs256gbsilver");
    expect(component.OrderDeviceExist).toBeTruthy();
  }));
  it('test order device name', inject([DeviceDataService], (service: DeviceDataService) => {
    component.orderDevice = null;
    component.data.TableInfo = null;
    component.Init();
    expect(component.orderDevice).toBe(component.data.basic_details.sku);
    expect(component.orderDeviceName).toBe(component.data.basic_details.name);
    expect(component.OrderDeviceExist).toBeTruthy();
  }));
  it('test OrderDeviceExist', inject([DeviceDataService], (service: DeviceDataService) => {
    component.orderDevice = null;
    component.data.TableInfo = [];
    component.Init();
    expect(component.OrderDeviceExist).toBeFalsy();
  }));
  it('test lifestyle summary text basic details', inject([DeviceDataService], (service: DeviceDataService) => {
    component.data.basic_details.addons = {};
    component.data.basic_details.addons.items = [{}];
    component.data.basic_details.addons.items[0].summary = "def";
    component.Init();
    expect(component.lifestyleSummaryText).toBe("def");
  }));
  it('test lifestyle summary text', inject([DeviceDataService], (service: DeviceDataService) => {
    component.data.addons = {};
    component.data.addons.items = [{}];
    component.data.addons.items[0].summary = "abc";
    component.Init();
    expect(component.lifestyleSummaryText).toBe("abc");
  }));
  it('test mnp-edit-flow', inject([DeviceDataService], (service: DeviceDataService) => {
    localStorage.setItem("mnp-edit-flow", "false");
    spyOn(localStorage, "removeItem");
    component.Init();
    expect(component.orderNumberType).toBe('SwitchToCelcom');
    expect(localStorage.removeItem).toHaveBeenCalledWith("mnp-edit-flow");
  }));
  it('test isMviva', inject([DeviceDataService], (service: DeviceDataService) => {
    localStorage.setItem("isMviva", "true");
    spyOn(component, "setMvivaParams");
    component.Init();
    expect(component.isMviva).toBeTruthy();
    expect(component.setMvivaParams).toHaveBeenCalled();
  }));
  it('test rentclicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.ngOnInit();
    devicedataservice.publishRentClicked(true);
    expect(component.isRentClicked).toBe(true);
    expect(component.isOwnClicked).toBe(false);
    expect(component.isBundleClicked).toBe(false);
  }));
  it('test rentclicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isEasyPhone = true;
    localStorage.removeItem("afterLoginEasyPhone");
    component.ngOnInit();
    expect(component.isRentClicked).toBe(true);
  }));
  it('test ownclicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isOwnClicked = true;
    component.ngOnInit();
    devicedataservice.publishOwnClicked(true);
    expect(component.isRentClicked).toBe(false);
    expect(component.isOwnClicked).toBe(true);
    expect(component.isBundleClicked).toBe(false);
  }));
  it('test bundleclicked', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isBundleClicked = true;
    component.ngOnInit();
    devicedataservice.publishBundleClicked(true);
    expect(component.isRentClicked).toBe(false);
    expect(component.isOwnClicked).toBe(false);
    expect(component.isBundleClicked).toBe(true);
  }));
  it('test own', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.removeItem("isRentClicked");
    localStorage.setItem("afterLoginEasyPhone", "true");
    localStorage.setItem("isOwnClicked", "true");
    localStorage.setItem("ownPrice", "124");
    localStorage.setItem("ownMonthlyPay", "102");
    spyOn(devicedataservice, "publishTotalPay");
    component.ngOnInit();
    component.isOwnClicked = true;
    expect(component.isRentClicked).toBe(false);
    expect(component.isOwnClicked).toBe(true);
    expect(component.ownPrice).toBe(124);
    expect(component.orderMonthlyPay).toBe(102);
    expect(component.ownTotal).toBe(124);
    component.orderTotalPay = 226;
    expect(component.orderTotalPay).toBe(226);
    expect(devicedataservice.publishTotalPay).toHaveBeenCalledWith(226);
  }));
  it('test rent', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.removeItem("isOwnClicked");
    localStorage.setItem("afterLoginEasyPhone", "true");
    localStorage.setItem("isRentClicked", "true");
    localStorage.setItem("rentPrice", "114");
    localStorage.setItem("rentMonthlyPay", "100");
    spyOn(devicedataservice, "publishTotalPay");
    spyOn(localStorage, "removeItem");
    component.ngOnInit();
    component.isRentClicked = true;
    expect(component.isRentClicked).toBe(true);
    expect(component.isOwnClicked).toBe(false);
    expect(component.rentPrice).toBe(114);
    expect(component.orderMonthlyPay).toBe(100);
    expect(component.rentTotal).toBe(114);
    component.orderTotalPay = 214;
    expect(component.orderTotalPay).toBe(214);
    expect(devicedataservice.publishTotalPay).toHaveBeenCalledWith(214);
    expect(localStorage.removeItem).toHaveBeenCalledWith("afterLoginEasyPhone");
    localStorage.removeItem("isRentClicked");
  }));
  it('test bundle', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("afterLoginEasyPhone", "true");
    localStorage.setItem("isBundleClicked", "true");
    localStorage.setItem("bundlePrice", "100");
    localStorage.setItem("bundleUpfrontPrice", "90");
    spyOn(devicedataservice, "publishTotalPay");
    spyOn(localStorage, "removeItem");
    component.ngOnInit();
    expect(component.isBundleClicked).toBe(true);
    expect(component.isRentClicked).toBe(false);
    expect(component.isOwnClicked).toBe(false);
    expect(component.bundlePrice).toBe(100);
    expect(component.bundleUpfrontPrice).toBe(90);
    expect(component.orderTotalPay).toBe(190);
    expect(devicedataservice.publishTotalPay).toHaveBeenCalledWith(190);
    expect(localStorage.removeItem).toHaveBeenCalledWith("afterLoginEasyPhone");
    localStorage.removeItem("isBundleClicked");
  }));
  it('test preorder', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    const a = {"preorder_estimate_delivery_text":"","preorder_estimate_delivery_date":"","preorder_text":"PRE-ORDER ENDED","preorder_from_date_text":"From","preorder_to_date_text":"to","preorder_from_date":"25 Jun 2019","preorder_to_date":"30 Jun 2019","preorder_end_flag":1,"preorder_estimate_delivery":null,"preorder_submit_date":"2019-06-30 00:00:00","preorder_stock_available_quantity":0,"preorder_availble_stock_in_hand":0,"preorder_stock_status_flag":0,"preorder_hat":"PRE-ORDER ENDED"};
    component.ngOnInit();
    devicedataservice.publishPreOrderData(JSON.parse(JSON.stringify(a)));
    expect(component.preOrderData).toEqual(a);
    component.preOrderData = undefined;
  }));
  it('test easyphone', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.setItem("isDeviceOnlyClicked", "true");
    localStorage.setItem("EditEasyPhone", "true");
    spyOn(localStorage, "removeItem");
    component.ngOnInit();
    devicedataservice.publishEasyPhone(true);
    expect(component.isEasyPhone).toBe(false);
    expect(component.isRentClicked).toBe(false);
    expect(component.isOwnClicked).toBe(false);
    expect(component.isBundleClicked).toBe(false);
    expect(localStorage.removeItem).toHaveBeenCalledWith("EditEasyPhone");
  }));
  it('test easyphone', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.removeItem("isDeviceOnlyClicked");
    localStorage.removeItem("EditEasyPhone");
    localStorage.setItem("isOwnClicked", "true");
    component.ngOnInit();
    devicedataservice.publishEasyPhone(true);
    expect(component.isEasyPhone).toBe(true);
    expect(component.isOwnClicked).toBe(true);
  }));
  it('test easyphone', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    localStorage.removeItem("isOwnClicked");
    component.ngOnInit();
    devicedataservice.publishEasyPhone(true);
    expect(component.isEasyPhone).toBe(true);
    expect(component.isRentClicked).toBe(true);
  }));
  it('test rentprice', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isRentClicked = true;
    localStorage.setItem("rentMonthlyPay", "91");
    spyOn(devicedataservice, "publishTotalPay");
    component.ngOnInit();
    devicedataservice.publishRentPrice("111");
    expect(component.rentPrice).toBe(111);
    expect(component.orderMonthlyPay).toBe(91);
    expect(component.rentTotal).toBe(111);
    expect(component.orderMonthlyPayTotal).toBe(91);
    expect(component.orderTotalPay).toBe(202);
    expect(devicedataservice.publishTotalPay).toHaveBeenCalledWith(202);
  }));
  it('test ownPrice', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isRentClicked = false;
    component.isOwnClicked = true;
    localStorage.setItem("ownMonthlyPay", "90");
    spyOn(devicedataservice, "publishTotalPay");
    component.ngOnInit();
    devicedataservice.publishOwnPrice("101");
    expect(component.ownPrice).toBe(101);
    expect(component.orderMonthlyPay).toBe(90);
    expect(component.ownTotal).toBe(101);
    expect(component.orderMonthlyPayTotal).toBe(90);
    expect(component.orderTotalPay).toBe(191);
    expect(devicedataservice.publishTotalPay).toHaveBeenCalledWith(191);
  }));
  it('test bundlePrice', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isRentClicked = false;
    component.isOwnClicked = false;
    component.isBundleClicked = true;
    component.isMviva = false;
    spyOn(devicedataservice, "publishTotalPay");
    component.ngOnInit();
    component.bundlePrice = 1000;
    component.orderTotalPay = 1100;
    component.bundleUpfrontPrice = 100;
    devicedataservice.publishBundlePrice("1000");
    expect(component.bundlePrice).toBe(1000);
    expect(component.orderTotalPay).toBe(1100);
    devicedataservice.publishTotalPay(1100);
    expect(devicedataservice.publishTotalPay).toHaveBeenCalledWith(1100);
  }));
  it('test bundleUpfront', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
    component.isRentClicked = false;
    component.isOwnClicked = false;
    component.isBundleClicked = true;
    component.isMviva = false;
    spyOn(devicedataservice, "publishTotalPay");
    component.ngOnInit();
    component.bundlePrice = 1000;
    component.bundleUpfrontPrice = 200;
    component.orderTotalPay = 1200;
    devicedataservice.publishBundleUpfrontPrice("200");
    expect(component.bundleUpfrontPrice).toBe(200);
    expect(component.orderTotalPay).toBe(1200);
    devicedataservice.publishTotalPay(1200);
    expect(devicedataservice.publishTotalPay).toHaveBeenCalledWith(1200);
    component.isBundleClicked = false;
  }));
});
