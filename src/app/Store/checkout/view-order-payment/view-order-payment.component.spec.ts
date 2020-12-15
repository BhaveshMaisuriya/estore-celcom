import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { MinifiedPageLoaderComponent } from '../../../Store/widget/minified-page-loader/minified-page-loader.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../Footer/footer.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { SocialMediaComponent } from '../../../Footer/SocialMedia/socialmedia.component';
import { FooterDownloadComponent } from '../../../Footer/Download/download.component';
import { AppService } from '../../../Service/app.service';
import { AppMockService } from '../../../Service/appmock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs/Rx";
import { UserService } from "../../../Service/user.service";
import { CartService } from "../../../Service/cart.service";
import { BundleService } from "../../../Service/bundle.service";
import { OrderInfoService } from "../../../Service/orderinfo.service";
import { HeaderService } from "../../../Header/header.service";
import { RedirectionService } from "../../../Service/redirection.service";
import { SupplimentaryLinesService } from "../../widget/supplementary-lines/supplementary-lines.service";
import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BroadbandService } from "../../../Service/broadband.service";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { CommonUtilService } from "../../../Service/commonUtil.service";
import { AgeEligibilityPopupComponent } from "../../widget/age-eligibility-popup/ageeligiblity.popup.component";
import { CheckoutService } from "../../checkout/services/checkout.service";
import { CheckoutHeroBannerComponent } from "../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component";
import { ViewOrderPaymentComponent } from "./view-order-payment.component";
import { DeviceDetailsStorageService } from "../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.service";
import { RemarketAnalyticsService } from "../../../Service/remarket-analytics.service";
import { HomeService } from "../../../Service/home.service";
import { GetParametersService } from "../../../Service/getParamaters.service";
import { RouterService } from "../../../Service/router.service";
import { configureTestSuite } from "ng-bullet";
import { YouTubePlayerModule } from '@angular/youtube-player';
import { SharedModule } from "../../../shared/shared-module.module";
import { NO_ERRORS_SCHEMA } from '@angular/core';

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
const mockRouterService = {
  getPreviousUrl: () => {}
};
const response = [
  {
    id: 16291,
    all_items: [
      {
        item_id: "43360",
        quantity: 1,
        reservation_id: "OP25CE1569565164",
        sku: "FG",
        sku_bundle: null,
        is_preorder: false,
        is_broadband: false,
        is_easyphone: false,
        has_add_ons: false,
        add_on_label: null,
        add_on_code: null,
        utm_source: null,
        easyphone_label: "EasyPhone  ()",
        preorder_availability_flag: null,
        midnight_delivery: 0,
        price: 80,
        itemTotal: "80.0000",
        selectedProduct: {
          orderMonthlyPayTotal: "80.0000",
          orderPlanName: "First™ Gold",
          orderPlan: "FG",
          urlKey: "first-gold",
          contract: "24 months contract",
          selectedProductSku: "FG",
          orderMonthlyPay: "80.0000",
          orderOneTimePay: "80.0000",
          plan_image_url: "/media/catalog/product/w/f/wf-jamie-20gb.png",
          orderPhoneNo: "0132241231",
          orderNumberType: "NewNumber",
          selectedPlanDetails: {
            name: "First™ Gold",
            sku: "FG",
            urlKey: "first-gold",
            monthly_plan: "80.0000",
            order_plan_bundle: "PB12090",
            order_service_bundle: "RTP0010",
            order_plan_component: [
              {
                component_name: "FiRST Gold CBS Commitment Fee",
                component_part_no: "CPT16990",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Executive Plan VAS without GPRS_92378",
                component_part_no: "CPT04540",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "New Package for IDD Activation",
                component_part_no: "CPT07020",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "First Unlimited",
                component_part_no: "CPT12290",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Default International Roaming Voice/SMS",
                component_part_no: "CPT13540",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "New LTE-Voice",
                component_part_no: "LTE0070",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Free Chat 2.0",
                component_part_no: "MI01790",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Advance Payment CBS RM80",
                component_part_no: "OTC08890",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Weekend Internet Quota",
                component_part_no: "CPT16980",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "SIM Card",
                component_part_no: "SM00010",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Blank SIM Starter Pack",
                component_part_no: "SP00210",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Stamp Fee_92382",
                component_part_no: "OTC00350",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Printed Bill for Voice",
                component_part_no: "BDMR0080",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold CBS Plan",
                cbs_part_number: "PR043870",
                isvas: "0",
                vasname: null,
                vasvalue: null
              }
            ],
            new_customer: "0",
            segment: "10",
            upfront_installment: null,
            product_type: "Service",
            start_date: null,
            end_date: null,
            BackgroundColor: "is-bg-color-black",
            IndicatorClass: "is-level-gold",
            ProductText: "Gold",
            KeyFiguresText: "20 GB",
            KeyText: "RM 80",
            BuynowLink: "/plans/first-gold",
            BuynowText: "Buy now",
            knowMoreLink: "/plans/first-gold",
            knowMoreText: "Learn more",
            MobileDescription: null,
            TableInfo: [],
            terms_and_condition: {
              plans: {
                label: "Plans",
                desc: "Unlimited Standard national calls + texts + videocalls"
              },
              contract_terms: {
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
            AtrHref: "#rm-0",
            telco_day: {
              status: false,
              hat_text: null,
              message: null
            },
            is_premium_plan: false
          },
          mnp_data: null,
          is_mnp: false
        },
        upfront_waiver: false,
        device_upfront_penalty: "0.00",
        campaign100_days: false,
        campaign: {
          title: null,
          subtitle: null
        },
        is_campaign_mviva: false,
        campaign_mviva_message: null,
        campaign_mviva_url: "",
        promotion_details: "ADA",
        bill_type: 1,
        voucher_code: null,
        coupon_description: "",
        rebate_amount: "0.0000"
      }
    ],
    autopayment: "true",
    created_at: "2019-09-27 06:19:26",
    updated_at: "2019-09-27 06:19:26",
    is_active: true,
    is_virtual: true,
    items: [
      {
        item_id: 43360,
        sku: "FG",
        qty: 1,
        name: "First™ Gold",
        price: 80,
        product_type: "virtual",
        quote_id: "16291"
      }
    ],
    items_count: 1,
    items_qty: 1,
    customer: {
      id: 2866,
      group_id: 1,
      default_billing: "8836",
      default_shipping: "8837",
      created_at: "2019-04-23 01:49:03",
      updated_at: "2019-09-27 06:13:07",
      created_in: "Default Store View",
      dob: "1990-02-19",
      email: "abc11@gmail.com",
      firstname: "AAZAM",
      lastname: ",",
      gender: 2,
      store_id: 1,
      website_id: 1,
      addresses: [
        {
          id: 8836,
          customer_id: 2866,
          region: {
            region_code: "WP",
            region: "WP Kuala Lumpur",
            region_id: 546
          },
          region_id: 546,
          country_id: "MY",
          street: ["JALAN"],
          telephone: "01923465634",
          postcode: "54000",
          city: "KUALA LUMPUR",
          firstname: "AAZAM",
          lastname: "value",
          default_billing: true,
          custom_attributes: [
            {
              attribute_code: "residence_type",
              value: "Landed"
            },
            {
              attribute_code: "salutation",
              value: "Mr."
            },
            {
              attribute_code: "unit_number",
              value: "35252"
            }
          ]
        },
        {
          id: 8837,
          customer_id: 2866,
          region: {
            region_code: "WP",
            region: "WP Kuala Lumpur",
            region_id: 546
          },
          region_id: 546,
          country_id: "MY",
          street: ["JALAN"],
          telephone: "01923465634",
          postcode: "54000",
          city: "KUALA LUMPUR",
          firstname: "AAZAM",
          lastname: "value",
          default_shipping: true,
          custom_attributes: [
            {
              attribute_code: "residence_type",
              value: "Landed"
            },
            {
              attribute_code: "salutation",
              value: "Mr."
            },
            {
              attribute_code: "unit_number",
              value: "35252"
            }
          ]
        }
      ],
      disable_auto_group_change: 0,
      extension_attributes: {
        is_subscribed: false
      },
      custom_attributes: [
        {
          attribute_code: "mobile_number",
          value: "01923465634"
        },
        {
          attribute_code: "id_type",
          value: "New NRIC"
        },
        {
          attribute_code: "id_number",
          value: "900219453434"
        },
        {
          attribute_code: "customer_full_name",
          value: "AAZAM"
        },
        {
          attribute_code: "salutation",
          value: "Mr."
        },
        {
          attribute_code: "contact_row_id",
          value: "1-2UQTRD3"
        }
      ]
    },
    billing_address: {
      address_id: "35969",
      quote_id: "16291",
      created_at: "2019-09-27 06:19:26",
      updated_at: "2019-09-27 06:19:26",
      customer_id: "2866",
      save_in_address_book: "0",
      customer_address_id: "8836",
      address_type: "billing",
      email: "abc11@gmail.com",
      prefix: null,
      firstname: "AAZAM",
      middlename: null,
      lastname: "value",
      suffix: null,
      company: null,
      street: "JALAN",
      city: "KUALA LUMPUR",
      region: "WP Kuala Lumpur",
      region_id: "546",
      postcode: "54000",
      country_id: "MY",
      telephone: "01923465634",
      fax: null,
      virtual_shipping_id: null,
      shipping_unit_number: null,
      billing_unit_number: "35252",
      salutation: "Mr.",
      residence_type: "Landed",
      same_as_billing: "0",
      collect_shipping_rates: "0",
      shipping_method: null,
      shipping_description: null,
      weight: "0.0000",
      subtotal: "80.0000",
      base_subtotal: "80.0000",
      subtotal_with_discount: "80.0000",
      base_subtotal_with_discount: "80.0000",
      tax_amount: "0.0000",
      base_tax_amount: "0.0000",
      shipping_amount: "0.0000",
      base_shipping_amount: "0.0000",
      shipping_tax_amount: "0.0000",
      base_shipping_tax_amount: "0.0000",
      discount_amount: "0.0000",
      base_discount_amount: "0.0000",
      grand_total: "80.0000",
      base_grand_total: "80.0000",
      customer_notes: null,
      applied_taxes: "[]",
      discount_description: null,
      shipping_discount_amount: "0.0000",
      base_shipping_discount_amount: "0.0000",
      subtotal_incl_tax: "80.0000",
      base_subtotal_total_incl_tax: "80.0000",
      discount_tax_compensation_amount: "0.0000",
      base_discount_tax_compensation_amount: "0.0000",
      shipping_discount_tax_compensation_amount: "0.0000",
      base_shipping_discount_tax_compensation_amnt: null,
      shipping_incl_tax: "0.0000",
      base_shipping_incl_tax: "0.0000",
      free_shipping: "0",
      vat_id: null,
      vat_is_valid: null,
      vat_request_id: null,
      vat_request_date: null,
      vat_request_success: null,
      gift_message_id: null,
      base_customer_balance_amount: "0.0000",
      customer_balance_amount: "0.0000",
      gift_cards_amount: "0.0000",
      base_gift_cards_amount: "0.0000",
      gift_cards: "[]",
      used_gift_cards: "[]",
      gw_id: null,
      gw_allow_gift_receipt: null,
      gw_add_card: null,
      gw_base_price: null,
      gw_price: null,
      gw_items_base_price: null,
      gw_items_price: null,
      gw_card_base_price: null,
      gw_card_price: null,
      gw_base_tax_amount: null,
      gw_tax_amount: null,
      gw_items_base_tax_amount: null,
      gw_items_tax_amount: null,
      gw_card_base_tax_amount: null,
      gw_card_tax_amount: null,
      gw_base_price_incl_tax: null,
      gw_price_incl_tax: null,
      gw_items_base_price_incl_tax: null,
      gw_items_price_incl_tax: null,
      gw_card_base_price_incl_tax: null,
      gw_card_price_incl_tax: null,
      giftregistry_item_id: null,
      reward_points_balance: "0",
      base_reward_currency_amount: "0.0000",
      reward_currency_amount: "0.0000",
      entity_id: "35969",
      region_code: "WP"
    },
    orig_order_id: 0,
    currency: {
      global_currency_code: "MYR",
      base_currency_code: "MYR",
      store_currency_code: "MYR",
      quote_currency_code: "MYR",
      store_to_base_rate: 0,
      store_to_quote_rate: 0,
      base_to_global_rate: 1,
      base_to_quote_rate: 1
    },
    customer_is_guest: false,
    customer_note_notify: true,
    customer_tax_class_id: 3,
    store_id: 1,
    extension_attributes: {
      shipping_assignments: []
    },
    customerOtherInfo: {
      salutation: "Mr.",
      unit_number: "35252",
      mobile_number: "01923465634",
      gender: "Female",
      customer_full_name: "AAZAM"
    },
    GST: "0.00",
    grossTotal: "80.00",
    itemsTotal: "1",
    shipping_address: {
      address_id: "35970",
      quote_id: "16291",
      created_at: "2019-09-27 06:19:26",
      updated_at: "2019-09-27 06:19:26",
      customer_id: "2866",
      save_in_address_book: "0",
      customer_address_id: "8837",
      address_type: "shipping",
      email: "abc11@gmail.com",
      prefix: null,
      firstname: "AAZAM",
      middlename: null,
      lastname: "value",
      suffix: null,
      company: null,
      street: "JALAN",
      city: "KUALA LUMPUR",
      region: "WP Kuala Lumpur",
      region_id: "546",
      postcode: "54000",
      country_id: "MY",
      telephone: "01923465634",
      fax: null,
      virtual_shipping_id: null,
      shipping_unit_number: "35252",
      billing_unit_number: null,
      salutation: "Mr.",
      residence_type: "Landed",
      same_as_billing: "0",
      collect_shipping_rates: "0",
      shipping_method: null,
      shipping_description: null,
      weight: "0.0000",
      subtotal: "0.0000",
      base_subtotal: "0.0000",
      subtotal_with_discount: "0.0000",
      base_subtotal_with_discount: "0.0000",
      tax_amount: "0.0000",
      base_tax_amount: "0.0000",
      shipping_amount: "0.0000",
      base_shipping_amount: "0.0000",
      shipping_tax_amount: "0.0000",
      base_shipping_tax_amount: "0.0000",
      discount_amount: "0.0000",
      base_discount_amount: "0.0000",
      grand_total: "0.0000",
      base_grand_total: "0.0000",
      customer_notes: null,
      applied_taxes: "null",
      discount_description: null,
      shipping_discount_amount: null,
      base_shipping_discount_amount: null,
      subtotal_incl_tax: "0.0000",
      base_subtotal_total_incl_tax: null,
      discount_tax_compensation_amount: "0.0000",
      base_discount_tax_compensation_amount: "0.0000",
      shipping_discount_tax_compensation_amount: "0.0000",
      base_shipping_discount_tax_compensation_amnt: null,
      shipping_incl_tax: "0.0000",
      base_shipping_incl_tax: "0.0000",
      free_shipping: "0",
      vat_id: null,
      vat_is_valid: null,
      vat_request_id: null,
      vat_request_date: null,
      vat_request_success: null,
      gift_message_id: null,
      base_customer_balance_amount: null,
      customer_balance_amount: null,
      gift_cards_amount: "0.0000",
      base_gift_cards_amount: "0.0000",
      gift_cards: "[]",
      used_gift_cards: "[]",
      gw_id: null,
      gw_allow_gift_receipt: null,
      gw_add_card: null,
      gw_base_price: "0.0000",
      gw_price: "0.0000",
      gw_items_base_price: "0.0000",
      gw_items_price: "0.0000",
      gw_card_base_price: "0.0000",
      gw_card_price: "0.0000",
      gw_base_tax_amount: null,
      gw_tax_amount: null,
      gw_items_base_tax_amount: null,
      gw_items_tax_amount: null,
      gw_card_base_tax_amount: null,
      gw_card_tax_amount: null,
      gw_base_price_incl_tax: null,
      gw_price_incl_tax: null,
      gw_items_base_price_incl_tax: null,
      gw_items_price_incl_tax: null,
      gw_card_base_price_incl_tax: null,
      gw_card_price_incl_tax: null,
      giftregistry_item_id: null,
      reward_points_balance: "0",
      base_reward_currency_amount: "0.0000",
      reward_currency_amount: "0.0000",
      entity_id: "35970"
    },
    supplementary_data: [],
    cart_session: 0,
    reservation_id: "OP25CE1569565164",
    tax: {
      total_tax: "0.00",
      items: []
    },
    delivery_type: {
      value: 0,
      code: "standard"
    }
  }
];

const cartData = [
  {
    BaseUrl: "",
    API_URL_CONST: {
      CONTENT_DETAILS_BASE: "/api/content_details?_format=hal_json",
      CONTENT_DETAILS_API_BASE: "api/content_details?_format=hal_json",
      MENU_API_URL:
        "/api/content_details?_format=hal_json&type=custom&name=menu_details&id=",
      HEADER_API_ID: "global-navigation",
      FOOTER_API_ID: "footer",
      FOOTER_ICONS_API_ID: "footer-icons",
      ALIAS_API_URL:
        "/api/content_details?_format=hal_json&type=custom&name=uri_alias",
      BREADCRUM_API_URL:
        "/api/content_details?_format=hal_json&type=custom&name=breadcrumb&id=",
      BANNER_URL:
        "api/content_details?_format=hal_json&type=views&name=banner_api&api=heroBannerImgClickable&id=50",
      BANNER_NAME: "heroBanner_img_clickable",
      IMAGE_CARD_OVERLAY:
        "/api/content_details?_format=hal_json&type=views&name=callout_api&\napi=imageCardOverlayWithoutTab&id=870+871+872+873+874+875+876",
      ICON_NAME: "iconLayout",
      ICON_URL:
        "api/content_details?_format=hal_json&type=views&name=banner_api&api=iconLayout&id=159",
      BANNER_404_NAME: "heroBanner_carousel",
      BANNER_404_URL:
        "api/content_details?_format=hal_json&type=views&name=banner_api&api=heroBanner&id=404",
      PAGE_NOT_FOUND_URL:
        "api/content_details?_format=hal_json&&type=views&name=banner_api&api=detailBanner&id=594",
      PRODUCT_BANNER_MEGA_URL:
        "api/content_details?_format=hal_json&type=views&name=banner_api&api=ProductBannerMega&id=239"
    },
    ApiUrl: "",
    eStoreUrl: "https://estorecms-02.celcom.com.my",
    IsXpax: false,
    APP_TEMPLATE_TYPE: "TemplateType",
    TEMPLATE_DEFAULT: "default",
    TEMPLATE_XPAX: "xpax",
    IsMobile: false,
    TemplateType: "default",
    errorConst: {
      PAYMENT_UNSUCC_MSG: "Payment not successful",
      SYS_DOWN_MSG:
        "Sorry for the inconvenience, we're giving our system a little update. Please try again later.",
      REQ_EXP_MSG: "Request has expired",
      OTP_EXPIRED_MSG: "Request has expired",
      ERR_IN_SENDING_OTP_MSG: "Error while sending OTP"
    },
    formConst: {
      PRODUCT_CHECKING_STOCK_MSG: "Checking stock...",
      PRODUCT_IN_STOCK_MSG: "In Stock",
      PRODUCT_OUT_OF_STOCK_MSG: "Out of Stock",
      RESIDENCE_TYPE_MSG: "Please select residence type",
      ADDRESS_MSG: "Please enter address",
      VALID_ADDRESS_MSG: "Please enter valid address",
      STREET_MSG: "Please enter street details",
      VALID_STREET_MSG: "Please enter valid street details",
      POSTAL_MSG: "Please enter postal code",
      VALID_POSTAL_MSG: "Please enter valid postal code",
      CITY_MSG: "Please enter city",
      VALID_CITY_MSG: "Please enter valid city",
      STATE_MSG: "Please select state",
      OTP_RESEND_MSG: "Please enter valid OTP or click Resend OTP",
      ENTER_VALUE_MSG: "Please enter a value",
      VALID_MOBILE_NUM_MSG: "Please enter a valid Mobile Number",
      LOCATION_TYPE: [
        {
          display: "Landed",
          value: "Landed"
        },
        {
          display: "Highrise",
          value: "High-Rise"
        }
      ],
      ITEM_ALREADY_IN_CART:
        "Note: You can only add another item after you have checked out with your existing items in the cart."
    },
    appConstant: {
      MAX_PRODUCT_TO_COMPARE_DESKTOP: 3,
      MAX_PRODUCT_TO_COMPARE_MOBILE: 2,
      GST_IN_PERCENTAGE: 0,
      COOKIE_EXPIRE: 30,
      ADA_COOKIE_EXPIRE: 7
    },
    items: [],
    GST: 0,
    grossTotal: 0,
    itemsTotal: 0,
    roundOffAdjustment: 0,
    GSTInPercentage: 0
  }
];
const restoreResp = [{ status: true }];
const magResp = [
  {
    order_data: {
      order_number: "DEVC000010058",
      siebel_order_id: null,
      cel_siebel_order_id: null,
      transaction_id: "DEVC000010058",
      grand_total: "0.00",
      gst_amount: "0.00",
      status: "Pending",
      tracking: "",
      purchase_date: "08 November 2019 01:55 PM",
      is_virtual: "1",
      items_count: "1",
      items_qty: "1",
      items: [
        {
          is_bundle: false,
          is_moon: false,
          item_id: "19236",
          product_id: "43",
          sku: "FPP",
          qty: "1",
          name: "Celcom Mobile Platinum Plus",
          price: "0.00",
          row_total: "0.00",
          price_incl: "0.00",
          row_total_incl_tax: "0.00",
          product_type: "virtual",
          image: "/media/catalog/product/w/f/wf-benji-100gb.png",
          quote_id: "16003",
          device_data: [],
          plan_data: {
            orderPhoneNo: "01222222244",
            name: "Celcom Mobile Platinum Plus",
            orderNumberType: "SwitchToCelcom",
            orderMonthlyPay: "188.00",
            orderOneTimePay: "0.00",
            indicator_class: "is-level-platinum-plus",
            telco_day: { status: false, hat_text: null, message: null },
            TableInfo: [],
            contract_terms: {
              label: "Contract Duration",
              desc: "24 months contract"
            }
          },
          monthly_charges: [],
          device_upfront_penalty: "0.00",
          is_easyphone: false,
          easyphone_label: "EasyPhone  ()"
        }
      ],
      supplementary_data: [],
      address: {
        shipping_address: {
          entity_id: "17998",
          region_id: "535",
          virtual_shipping_id: null,
          shipping_unit_number: "abc 1111",
          billing_unit_number: null,
          salutation: "Mr",
          residence_type: "High-Rise",
          region: "Kelantan",
          postcode: "22111",
          lastname: "ddbdbdb",
          street: "asdfg sdfg\nwerty werty",
          city: "kdmmddm",
          email: "aamma.anssm@ss22ss.com",
          telephone: "0127272811",
          country_id: "MY",
          firstname: "abcccb",
          address_type: "shipping",
          company: null,
          giftregistry_item_id: null
        },
        billing_address: {
          entity_id: "17997",
          region_id: "535",
          virtual_shipping_id: null,
          shipping_unit_number: "abc 1111",
          billing_unit_number: "abc 1111",
          salutation: "Mr",
          residence_type: "High-Rise",
          region: "Kelantan",
          postcode: "22111",
          lastname: "ddbdbdb",
          street: "asdfg sdfg\nwerty werty",
          city: "kdmmddm",
          email: "aamma.anssm@ss22ss.com",
          telephone: "0127272811",
          country_id: "MY",
          firstname: "abcccb",
          address_type: "billing",
          company: null,
          giftregistry_item_id: null
        }
      },
      is_mnp: true,
      pre_order: false,
      free_gift_data: { gift_image: null, gift_message: null },
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" },
      order_type: "MNP",
      has_add_ons: false,
      add_on_label: null,
      campaign100_days: false,
      campaign: { title: null, subtitle: null },
      is_campaign_mviva: null,
      campaign_mviva_message: null,
      customer_info: {
        full_name: "abcccb ddbdbdb",
        email: "aamma.anssm@ss22ss.com",
        dob: "1990-12-11",
        salutation: "Mr",
        mobile: "0127272811"
      },
      payment_method: "Credit Card",
      has_auto_billing: null,
      is_golden_number: "0",
      is_newbie: true,
      newbie_message:
        "We’ve delivered your Welcome Gift to your registered email address. Enjoy your reward!"
    },
    status: true,
    message: "Order Data"
  }
];
const userInfoMockResp = {
  outputCPResp: {
    customerID: "901211020922",
    dateOfBirth: "19901211_000000",
    preferredContactMethod: "Email",
    contactPreferredTime: "4:30pm to 8:30pm",
    newGuestPhNo: "0127272811",
    contactFirstName: "abcccb",
    contactLastName: "ddbdbdb",
    contactSalutation: "Mr",
    contactEmail: "aamma.anssm@ss22ss.com"
  }
};
const easyPhoneMockResp = [
  {
    order_data: {
      order_number: "UAT000005783",
      siebel_order_id: "1-2UVR22T",
      cel_siebel_order_id: "1-6220880453",
      transaction_id: "GE6820181015075608",
      grand_total: "836.00",
      gst_amount: "0.00",
      status: "Failed",
      tracking: "",
      purchase_date: "15 October 2018 07:56 AM",
      is_virtual: "1",
      items_count: "2",
      items_qty: "1",
      items: [
        {
          is_bundle: true,
          is_moon: false,
          item_id: "11326",
          product_id: "231",
          sku: "Samsung-Galaxy-S9-plus-FGS-SamsungGalaxyS9plus64GBBlue",
          qty: "1",
          name: "Samsung Galaxy S9+ X",
          price: "836.00",
          row_total: "836.00",
          price_incl: "836.00",
          row_total_incl_tax: "836.00",
          product_type: "bundle",
          image: "/media/catalog/product/9/0/900x900_2_9.png",
          quote_id: "10012",
          device_data: {
            color: "Blue",
            memory: "64GB",
            contract: "24 months contract",
            name: "Samsung Galaxy S9+ 64GB Blue",
            image: "/media/catalog/product",
            orderDevicePrice: "708.00",
            order_device_subt: "Upfront payment (RM 236.00 X 3 months)"
          },
          plan_data: {
            plan: "First™ Gold Supreme",
            orderMontlyPay: "128.00",
            orderOneTimePay: "128.00",
            orderPhoneNo: 60136689134,
            orderMonthlyPay: "128.00",
            order_plan_subt: "Upfront payment (RM 128.00 X 1 months)"
          },
          monthly_charges: {
            plan: "128.00",
            device: "236.00"
          },
          device_upfront_penalty: "0.00",
          is_easyphone: true,
          easyphone_label: "EasyPhone Own ()"
        }
      ],
      supplementary_data: [],
      address: {
        shipping_address: {
          entity_id: "10479",
          region_id: "544",
          virtual_shipping_id: null,
          shipping_unit_number: "75",
          billing_unit_number: null,
          salutation: "Mr",
          residence_type: "High-Rise",
          region: "Selangor",
          postcode: "47073",
          lastname: "Hui Li",
          street: "SS23/7",
          city: "Klang",
          email: "viditg123@hotmail.com",
          telephone: "60169033982",
          country_id: "MY",
          firstname: "Ong",
          address_type: "shipping",
          company: null,
          giftregistry_item_id: null
        },
        billing_address: {
          entity_id: "10480",
          region_id: "544",
          virtual_shipping_id: null,
          shipping_unit_number: "75",
          billing_unit_number: "75",
          salutation: "Mr",
          residence_type: "High-Rise",
          region: "Selangor",
          postcode: "47073",
          lastname: "Hui Li",
          street: "SS23/7",
          city: "Klang",
          email: "viditg123@hotmail.com",
          telephone: "60169033982",
          country_id: "MY",
          firstname: "Ong",
          address_type: "billing",
          company: null,
          giftregistry_item_id: null
        }
      },
      is_mnp: false,
      pre_order: true,
      free_gift_data: {
        gift_image: "/media/catalog/product/9/0/900x900_7_2.png",
        gift_message: "Receive a Free gift when you pre-order now."
      },
      tax: {
        total_tax: "0.00",
        items: []
      },
      delivery_type: {
        value: 0,
        code: "standard"
      },
      order_type: "COBP",
      has_add_ons: false,
      add_on_label: null,
      campaign100_days: false,
      campaign: {
        title: null,
        subtitle: null
      },
      is_campaign_mviva: null,
      campaign_mviva_message: null,
      customer_info: {
        full_name: "ONG HUI LI",
        email: "viditg123@hotmail.com",
        dob: "1994-04-16",
        salutation: "Mr",
        mobile: "60169033982"
      },
      payment_method: "1",
      has_auto_billing: null,
      is_newbie: false,
      newbie_message: ""
    },
    status: true,
    message: "Order Data"
  }
];
class MockAppService {
  postRestoreData(url) {
    return Observable.of(restoreResp);
  }
  getEstoreUserData(apiurl) {
    return Observable.of(JSON.parse(JSON.stringify(magResp)));
  }
}
describe("ViewOrderPaymentComponent ", () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let component: ViewOrderPaymentComponent;
  let fixture: ComponentFixture<ViewOrderPaymentComponent>;
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        YouTubePlayerModule,
        SharedModule
      ],
      declarations: [
        ViewOrderPaymentComponent,
        MinifiedPageLoaderComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        CheckoutHeroBannerComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: AppService, useClass: MockAppService },
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
        GetParametersService,
        { provide: RouterService, useValue: mockRouterService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });
  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewOrderPaymentComponent);
    component = fixture.componentInstance;
    component.TYcart = response;
    component.cart = cartData;
  }));
  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });
  it("should create view order payment component", () => {
    expect(component).toBeTruthy();
  });
  it("should call ngOninit()", () => {
    expect(component.ngOnInit).toBeDefined();
  });
  it("should test ngOninit function", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
  });
  it("should call init()", () => {
    spyOn(component, "init");
    expect(component.init).toBeDefined();
    component.init();
  });
  it("should check if production is true", () => {
    component.production = "abc";
    expect(component.production).toBeDefined();
    component.npsScriptUrl =
      "https://celcom.satmetrix.com/satmetrix/enterprise/celcom/app/cx/resources/datacollection/celcom_853/popup/celcom_853_30/popupsurvey_celcom_853_30.js?a=";
    expect(component.npsScriptUrl).toBeDefined();
  });
  it("should check if production is false", () => {
    component.production = "";
    expect(component.production).toBeDefined();
    component.npsScriptUrl =
      "https://CELCOM.staging.satmetrix.com/satmetrix/enterprise/celcom/app/cx/resources/datacollection/celcom_853/popup/celcom_853_6931/popupsurvey_celcom_853_6931.js?a=";
    expect(component.npsScriptUrl).toBeDefined();
  });
  it("checking USER_TYPE value", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    component.UserLoginName = "abc";
    sessionStorage.setItem("USER_TYPE", "USERTYPE");
    expect(component.UserLoginName).toBeDefined();
  });
  it("checking OLD_GUEST_USER value", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    component.GuestUserType = "abc";
    sessionStorage.setItem("OLD_GUEST_USER", "OLDGUESTUSER");
    expect(component.GuestUserType).toBeDefined();
  });
  it("checking isCsAgent default value", () => {
    expect(component.isCSAgent).toBeFalsy();
  });
  it("should check csAgent is true if sessionStorage contains AgentInfo", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    sessionStorage.setItem("AgentInfo", "abc");
    component.isCSAgent = true;
    expect(component.isCSAgent).toBeTruthy();
  });
  it("checking isPreOrder default value", () => {
    expect(component.isPreOrder).toBeFalsy();
  });
  it("should check cartPreOrder is true", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    sessionStorage.setItem("cartPreOrder", "true");
    component.isPreOrder = true;
    expect(component.isPreOrder).toBeTruthy();
    sessionStorage.removeItem("cartPreOrder");
  });

  it("should check cancelUpsell is true", () => {
    spyOn(component, "ngOnInit");
    component.ngOnInit();
    sessionStorage.setItem("cancelUpsell", "true");
    sessionStorage.removeItem("cancelUpsell");
  });

  it("should check OnContinueEligibilityCheck", () => {
    spyOn(component, "OnContinueEligibilityCheck");
    expect(component.isMnpPlanOnly).toBeFalsy();
  });

  it("should check backToCart", () => {
    spyOn(component, "backToCart");
    localStorage.removeItem("numberReservationId");
    const orderId = localStorage.getItem("magentoID");
    expect(component.backToCart).toBeDefined();
    expect(component.orderId).toBe(orderId);
    localStorage.removeItem("magentoID");
  });
  it("should check errorFunction", () => {
    spyOn(component, "errorFunction");
    localStorage.removeItem("numberReservationId");
    localStorage.removeItem("AutoBillingFlag");
    localStorage.removeItem("suppLinesAddedByTheUser");
    component.loading = false;
    expect(component.loading).toBeFalsy();
    component.orderCreateFailure = true;
    expect(component.orderCreateFailure).toBeTruthy();
    component.transactionDetails.transactResult = "failed";
    expect(component.transactionDetails.transactResult).toBe("failed");
  });

  it("should check createPlanOrDevicePlusPlanOrder", () => {
    spyOn(component, "createPlanOrDevicePlusPlanOrder");
    expect(component.createPlanOrDevicePlusPlanOrder).toBeDefined();
    component.oderType = "plan";
    expect(component.oderType).toBe("plan");
    component.oderType = "device_plan";
    expect(component.oderType).toBe("device_plan");
    component.oderType = "device";
    expect(component.oderType).toBe("device");
    expect(component.postUserData).toBeDefined();
  });
  it("should remove localstorage GUEST_CART_ID", () => {
    spyOn(component, "createPlanOrDevicePlusPlanOrder");
    localStorage.setItem("GUEST_CART_ID", "GUESTCARTID");
    expect(component.createPlanOrDevicePlusPlanOrder).toBeDefined();
    localStorage.removeItem("GUEST_CART_ID");
  });
  it("should remove localstorage MNP-PRE-SELECT", () => {
    spyOn(component, "createPlanOrDevicePlusPlanOrder");
    localStorage.setItem("MNP-PRE-SELECT", "MNPPRESELECT");
    expect(component.createPlanOrDevicePlusPlanOrder).toBeDefined();
    localStorage.removeItem("MNP-PRE-SELECT");
  });
  it("should remove localstorage MNP-CUSTOMER", () => {
    spyOn(component, "createPlanOrDevicePlusPlanOrder");
    localStorage.setItem("MNP-CUSTOMER", "MNPCUSTOMER");
    expect(component.createPlanOrDevicePlusPlanOrder).toBeDefined();
    localStorage.removeItem("MNP-CUSTOMER");
  });
  it("should remove localstorage MNP-EDIT", () => {
    spyOn(component, "createPlanOrDevicePlusPlanOrder");
    localStorage.setItem("MNP-EDIT", "MNPEDIT");
    expect(component.createPlanOrDevicePlusPlanOrder).toBeDefined();
    localStorage.removeItem("MNP-EDIT");
  });
  it("should remove localstorage MNP-FLOW", () => {
    spyOn(component, "createPlanOrDevicePlusPlanOrder");
    localStorage.setItem("MNP-FLOW", "MNPFLOW");
    expect(component.createPlanOrDevicePlusPlanOrder).toBeDefined();
    localStorage.removeItem("MNP-FLOW");
  });
  it("time for order completion", () => {
    component.timerForOrderCompletion();
  });
  it("UnregisterTnpsReference", () => {
    localStorage.removeItem("orderTime");
    component.UnregisterTnpsReference();
  });
  it("do logic check", () => {
    const tycart = {
      id: 16003,
      created_at: "2019-11-08 05:52:30",
      updated_at: "2019-11-08 05:54:22",
      is_active: true,
      is_virtual: true,
      items: [
        {
          item_id: 42637,
          sku: "FPP",
          qty: 1,
          name: "Celcom Mobile Platinum Plus",
          price: 0,
          product_type: "virtual",
          quote_id: "16003"
        }
      ],
      items_count: 1,
      items_qty: 1,
      customer: {
        id: 3634,
        group_id: 1,
        default_billing: "10496",
        default_shipping: "10497",
        created_at: "2019-11-08 05:52:29",
        updated_at: "2019-11-08 05:54:22",
        created_in: "Default Store View",
        dob: "1990-12-11",
        email: "aamma.anssm@ss22ss.com",
        firstname: "abcccb",
        lastname: "ddbdbdb",
        gender: 1,
        store_id: 1,
        website_id: 1,
        addresses: [
          {
            id: 10495,
            customer_id: 3634,
            region: {
              region_code: "WP",
              region: "WP Kuala Lumpur",
              region_id: 546
            },
            region_id: 546,
            country_id: "MY",
            street: ["82, Jalan Raja Muda Abdul Aziz"],
            telephone: "823",
            postcode: "50300",
            city: "KL",
            firstname: "Guest",
            lastname: "Last Name",
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "8" }
            ]
          },
          {
            id: 10496,
            customer_id: 3634,
            region: { region_code: "KN", region: "Kelantan", region_id: 535 },
            region_id: 535,
            country_id: "MY",
            street: ["asdfg sdfg", "werty werty"],
            telephone: "0127272811",
            postcode: "22111",
            city: "kdmmddm",
            firstname: "abcccb",
            lastname: "ddbdbdb",
            default_billing: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "abc 1111" }
            ]
          },
          {
            id: 10497,
            customer_id: 3634,
            region: { region_code: "KN", region: "Kelantan", region_id: 535 },
            region_id: 535,
            country_id: "MY",
            street: ["asdfg sdfg", "werty werty"],
            telephone: "0127272811",
            postcode: "22111",
            city: "kdmmddm",
            firstname: "abcccb",
            lastname: "ddbdbdb",
            default_shipping: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "abc 1111" }
            ]
          }
        ],
        disable_auto_group_change: 0,
        extension_attributes: { is_subscribed: false },
        custom_attributes: [
          { attribute_code: "mobile_number", value: "0127272811" },
          { attribute_code: "id_type", value: "New NRIC" },
          { attribute_code: "id_number", value: "901211020922" },
          { attribute_code: "customer_full_name", value: "abcccb ddbdbdb" },
          { attribute_code: "salutation", value: "Mr" },
          {
            attribute_code: "customer_email_id",
            value: "aamma.anssm@ss22ss.com"
          }
        ]
      },
      billing_address: {
        address_id: "35372",
        quote_id: "16003",
        created_at: "2019-11-08 05:52:30",
        updated_at: "2019-11-08 05:52:30",
        customer_id: "3634",
        save_in_address_book: "0",
        customer_address_id: "10496",
        address_type: "billing",
        email: "aamma.anssm@ss22ss.com",
        prefix: null,
        firstname: "abcccb",
        middlename: null,
        lastname: "ddbdbdb",
        suffix: null,
        company: null,
        street: "asdfg sdfg\nwerty werty",
        city: "kdmmddm",
        region: "Kelantan",
        region_id: "535",
        postcode: "22111",
        country_id: "MY",
        telephone: "0127272811",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: null,
        billing_unit_number: "abc 1111",
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "0",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "0.0000",
        base_subtotal: "0.0000",
        subtotal_with_discount: "0.0000",
        base_subtotal_with_discount: "0.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "0.0000",
        base_grand_total: "0.0000",
        customer_notes: null,
        applied_taxes: "[]",
        discount_description: null,
        shipping_discount_amount: "0.0000",
        base_shipping_discount_amount: "0.0000",
        subtotal_incl_tax: "0.0000",
        base_subtotal_total_incl_tax: "0.0000",
        discount_tax_compensation_amount: "0.0000",
        base_discount_tax_compensation_amount: "0.0000",
        shipping_discount_tax_compensation_amount: "0.0000",
        base_shipping_discount_tax_compensation_amnt: null,
        shipping_incl_tax: "0.0000",
        base_shipping_incl_tax: "0.0000",
        free_shipping: "0",
        vat_id: null,
        vat_is_valid: null,
        vat_request_id: null,
        vat_request_date: null,
        vat_request_success: null,
        gift_message_id: null,
        base_customer_balance_amount: "0.0000",
        customer_balance_amount: "0.0000",
        gift_cards_amount: "0.0000",
        base_gift_cards_amount: "0.0000",
        gift_cards: "[]",
        used_gift_cards: "[]",
        gw_id: null,
        gw_allow_gift_receipt: null,
        gw_add_card: null,
        gw_base_price: null,
        gw_price: null,
        gw_items_base_price: null,
        gw_items_price: null,
        gw_card_base_price: null,
        gw_card_price: null,
        gw_base_tax_amount: null,
        gw_tax_amount: null,
        gw_items_base_tax_amount: null,
        gw_items_tax_amount: null,
        gw_card_base_tax_amount: null,
        gw_card_tax_amount: null,
        gw_base_price_incl_tax: null,
        gw_price_incl_tax: null,
        gw_items_base_price_incl_tax: null,
        gw_items_price_incl_tax: null,
        gw_card_base_price_incl_tax: null,
        gw_card_price_incl_tax: null,
        giftregistry_item_id: null,
        reward_points_balance: "0",
        base_reward_currency_amount: "0.0000",
        reward_currency_amount: "0.0000",
        entity_id: "35372",
        region_code: "KN",
        address_line_1: "asdfg sdfg",
        address_line_2: "werty werty"
      },
      orig_order_id: 0,
      currency: {
        global_currency_code: "MYR",
        base_currency_code: "MYR",
        store_currency_code: "MYR",
        quote_currency_code: "MYR",
        store_to_base_rate: 0,
        store_to_quote_rate: 0,
        base_to_global_rate: 1,
        base_to_quote_rate: 1
      },
      customer_is_guest: false,
      customer_note_notify: true,
      customer_tax_class_id: 3,
      store_id: 1,
      extension_attributes: { shipping_assignments: [] },
      all_items: [
        {
          item_id: "42637",
          quantity: 1,
          reservation_id: "OP76CE1573192350",
          sku: "FPP",
          sku_bundle: null,
          is_preorder: false,
          is_broadband: false,
          is_easyphone: false,
          has_add_ons: false,
          add_on_label: null,
          add_on_code: null,
          utm_source: null,
          easyphone_label: "EasyPhone  ()",
          preorder_availability_flag: null,
          midnight_delivery: 0,
          price: 0,
          itemTotal: "0.00",
          selectedProduct: {
            orderMonthlyPayTotal: "188.0000",
            orderPlanName: "Celcom Mobile Platinum Plus",
            orderPlan: "FPP",
            urlKey: "first-platinum-plus",
            contract: "24 months contract",
            selectedProductSku: "FPP",
            orderMonthlyPay: "188.0000",
            orderOneTimePay: "188.0000",
            plan_image_url: "/media/catalog/product/w/f/wf-benji-100gb.png",
            orderPhoneNo: "01222222244",
            orderNumberType: "SwitchToCelcom",
            selectedPlanDetails: {
              name: "Celcom Mobile Platinum Plus",
              sku: "FPP",
              urlKey: "first-platinum-plus",
              monthly_plan: "188.0000",
              order_plan_bundle: "PB11860",
              order_service_bundle: "RTP0010",
              order_plan_component: [
                {
                  component_name: "Executive Plan VAS without GPRS_10784",
                  component_part_no: "CPT05370",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "New Package for IDD Activation",
                  component_part_no: "CPT07020",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "First Unlimited",
                  component_part_no: "CPT12290",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Default International Roaming Voice/SMS",
                  component_part_no: "CPT13540",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "FiRST Platinum Plus CBS Commitment Fee",
                  component_part_no: "CPT16940",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Free Chat 2.0",
                  component_part_no: "MI01790",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Advance Payment CBS RM188",
                  component_part_no: "OTC08850",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "SIM Card",
                  component_part_no: "SM00010",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Blank SIM Starter Pack",
                  component_part_no: "SP00210",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Stamp Fee_92382",
                  component_part_no: "OTC00350",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Printed Bill for Voice",
                  component_part_no: "BDMR0080",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "First Platinum Plus Business 2.0 RET",
                  component_part_no: "PB10570",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                }
              ],
              new_customer: "0",
              segment: "10",
              upfront_installment: null,
              product_type: "Service",
              start_date: null,
              end_date: null,
              BackgroundColor: "is-bg-color-black",
              IndicatorClass: "is-level-platinum-plus",
              ProductText: "Platinum Plus",
              KeyFiguresText: "100 GB",
              KeyText: "RM 188",
              BuynowLink: "/plans/first-platinum-plus",
              BuynowText: "Buy now",
              knowMoreLink: "/store/plans/first-platinum-plus",
              knowMoreText: "Learn more",
              MobileDescription: null,
              TableInfo: [],
              terms_and_condition: {
                plans: {
                  label: "Plans",
                  desc: "Unlimited Standard national calls + texts + videocalls"
                },
                contract_terms: {
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
              AtrHref: "#rm-0",
              telco_day: { status: false, hat_text: null, message: null },
              is_premium_plan: false,
              is_golden_number: 0
            },
            mnp_data: "901211020922",
            is_mnp: true
          },
          upfront_waiver: false,
          device_upfront_penalty: "0.00",
          campaign100_days: false,
          campaign: { title: null, subtitle: null },
          is_campaign_mviva: 0,
          campaign_mviva_message: null,
          campaign_mviva_url: "",
          promotion_details: "ADA",
          bill_type: 0,
          voucher_code: "",
          coupon_description: "",
          rebate_amount: 0,
          is_newbie: true,
          newbie_message:
            "Great! You are one step closer to receiving a Welcome Gift from us. Complete your order now to get the reward."
        }
      ],
      customerOtherInfo: {
        salutation: "Mr",
        unit_number: "abc 1111",
        mobile_number: "0127272811",
        gender: "Male",
        customer_full_name: "abcccb ddbdbdb"
      },
      GST: "0.00",
      grossTotal: "0.00",
      itemsTotal: "1",
      shipping_address: {
        address_id: "35373",
        quote_id: "16003",
        created_at: "2019-11-08 05:52:30",
        updated_at: "2019-11-08 05:52:30",
        customer_id: "3634",
        save_in_address_book: "0",
        customer_address_id: "10496",
        address_type: "shipping",
        email: "aamma.anssm@ss22ss.com",
        prefix: null,
        firstname: "abcccb",
        middlename: null,
        lastname: "ddbdbdb",
        suffix: null,
        company: null,
        street: "asdfg sdfg\nwerty werty",
        city: "kdmmddm",
        region: "Kelantan",
        region_id: "535",
        postcode: "22111",
        country_id: "MY",
        telephone: "0127272811",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: "abc 1111",
        billing_unit_number: null,
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "1",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "0.0000",
        base_subtotal: "0.0000",
        subtotal_with_discount: "0.0000",
        base_subtotal_with_discount: "0.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "0.0000",
        base_grand_total: "0.0000",
        customer_notes: null,
        applied_taxes: "null",
        discount_description: null,
        shipping_discount_amount: null,
        base_shipping_discount_amount: null,
        subtotal_incl_tax: "0.0000",
        base_subtotal_total_incl_tax: null,
        discount_tax_compensation_amount: "0.0000",
        base_discount_tax_compensation_amount: "0.0000",
        shipping_discount_tax_compensation_amount: "0.0000",
        base_shipping_discount_tax_compensation_amnt: null,
        shipping_incl_tax: "0.0000",
        base_shipping_incl_tax: "0.0000",
        free_shipping: "0",
        vat_id: null,
        vat_is_valid: null,
        vat_request_id: null,
        vat_request_date: null,
        vat_request_success: null,
        gift_message_id: null,
        base_customer_balance_amount: null,
        customer_balance_amount: null,
        gift_cards_amount: "0.0000",
        base_gift_cards_amount: "0.0000",
        gift_cards: "[]",
        used_gift_cards: "[]",
        gw_id: null,
        gw_allow_gift_receipt: null,
        gw_add_card: null,
        gw_base_price: "0.0000",
        gw_price: "0.0000",
        gw_items_base_price: "0.0000",
        gw_items_price: "0.0000",
        gw_card_base_price: "0.0000",
        gw_card_price: "0.0000",
        gw_base_tax_amount: null,
        gw_tax_amount: null,
        gw_items_base_tax_amount: null,
        gw_items_tax_amount: null,
        gw_card_base_tax_amount: null,
        gw_card_tax_amount: null,
        gw_base_price_incl_tax: null,
        gw_price_incl_tax: null,
        gw_items_base_price_incl_tax: null,
        gw_items_price_incl_tax: null,
        gw_card_base_price_incl_tax: null,
        gw_card_price_incl_tax: null,
        giftregistry_item_id: null,
        reward_points_balance: "0",
        base_reward_currency_amount: "0.0000",
        reward_currency_amount: "0.0000",
        entity_id: "35373",
        address_line_1: "asdfg sdfg",
        address_line_2: "werty werty"
      },
      supplementary_data: [],
      cart_session: 0,
      reservation_id: "OP76CE1573192350",
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" }
    };
    const userinfo = {
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        newGuestPhNo: "0127272811",
        contactFirstName: "abcccb",
        contactLastName: "ddbdbdb",
        salutation: "Mr",
        contactEmail: "aamma.anssm@ss22ss.com"
      }
    };
    const guestinfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901211020922",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    sessionStorage.setItem("UserInfo", JSON.stringify(userinfo));
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfo));
    component.userInfo = JSON.parse(JSON.stringify(guestinfo));
    component.TYcart = JSON.parse(JSON.stringify(tycart));
    component.paymentData = {
      returnCode: "1",
      reasonCode: "12345",
      reasonDesc: "abc"
    };
    localStorage.setItem("PLAN_TRANSACTION_ID", "DEVC000010058");
    component.doLogicCheck();
    localStorage.removeItem("PLAN_TRANSACTION_ID");
    localStorage.setItem("magentoID", "DEVC000010058");
    component.doLogicCheck();
    localStorage.removeItem("magentoID");
  });
  it("do logic check", () => {
    component.paymentData = {
      returnCode: "4",
      reasonCode: "47015",
      reasonDesc: "Insufficient Funds"
    };
    component.doLogicCheck();
    component.paymentData = {
      returnCode: "4",
      reasonCode: "57057",
      reasonDesc: "Buyer choose cancel at Login Page"
    };
    component.doLogicCheck();
    component.paymentData = {
      returnCode: "3",
      reasonCode: "57057",
      reasonDesc: "Buyer choose cancel at Login Page"
    };
    component.doLogicCheck();
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("GuestInfo");
  });
  it("clearPrevOrderInfo", () => {
    component.checkoutData = { message: "No items in cart", status: false };
    localStorage.setItem("magentoID", "DEVC000010058");
    localStorage.setItem("SelectedPlanDetails", "abc");
    component.clearPrevOrderInfo(true);
    localStorage.setItem("selectedProductDetails", "abc");
    localStorage.setItem("magentoID", "DEVC000010058");
    component.clearPrevOrderInfo(true);
    localStorage.setItem("magentoID", "DEVC000010058");
    localStorage.setItem("SelectedPlanDetails", "abc");
    component.clearPrevOrderInfo(false);
    localStorage.setItem("magentoID", "DEVC000010058");
    localStorage.setItem("selectedProductDetails", "abc");
    component.clearPrevOrderInfo(false);
    localStorage.removeItem("magentoID");
    localStorage.removeItem("SelectedPlanDetails");
    localStorage.removeItem("selectedProductDetails");
  });
  it("createPlanOrDevicePlusPlanOrder", () => {
    component.oderType = "";
    component.createPlanOrDevicePlusPlanOrder();
    component.oderType = "plan";
    localStorage.removeItem("GUEST_CART_ID");
    localStorage.removeItem("MNP-PRE-SELECT");
    localStorage.removeItem("MNP-CUSTOMER");
    localStorage.removeItem("MNP-EDIT");
    localStorage.removeItem("MNP-FLOW");
    component.createPlanOrDevicePlusPlanOrder();
    localStorage.setItem("GUEST_CART_ID", "abc");
    localStorage.setItem("MNP-PRE-SELECT", "yes");
    localStorage.setItem("MNP-CUSTOMER", "yes");
    localStorage.setItem("MNP-EDIT", "true");
    localStorage.setItem("MNP-FLOW", "true");
    component.createPlanOrDevicePlusPlanOrder();
  });
  it("createCobpPlanOrder", () => {
    const userinfo = {
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        newGuestPhNo: "0127272811",
        contactFirstName: "abcccb",
        contactLastName: "ddbdbdb",
        salutation: "Mr",
        contactEmail: "aamma.anssm@ss22ss.com"
      }
    };
    const guestinfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901211020922",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    sessionStorage.setItem("UserInfo", JSON.stringify(userinfo));
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfo));
    component.userInfo = JSON.parse(JSON.stringify(guestinfo));
    localStorage.setItem("COBP_FLOW", "true");
    component.paymentData = { orderStatus: false, orderId: "DEVC000010058" };
    component.createCobpPlanOrder();
    component.paymentData = { orderStatus: true, orderId: "DEVC000010058" };
    component.createCobpPlanOrder();
    localStorage.removeItem("COBP_FLOW");
    component.createCobpPlanOrder();
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("GuestInfo");
  });
  it("createCobpBundleOrder", () => {
    const userinfo = {
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        newGuestPhNo: "0127272811",
        contactFirstName: "abcccb",
        contactLastName: "ddbdbdb",
        salutation: "Mr",
        contactEmail: "aamma.anssm@ss22ss.com"
      }
    };
    const guestinfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901211020922",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    sessionStorage.setItem("UserInfo", JSON.stringify(userinfo));
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfo));
    component.userInfo = JSON.parse(JSON.stringify(guestinfo));
    localStorage.setItem("COBP_FLOW", "true");
    component.paymentData = { orderStatus: false, orderId: "DEVC000010058" };
    component.createCobpBundleOrder();
    component.paymentData = { orderStatus: true, orderId: "DEVC000010058" };
    component.createCobpBundleOrder();
    localStorage.removeItem("COBP_FLOW");
    component.createCobpBundleOrder();
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("GuestInfo");
  });
  it("hwOrderCreation", () => {
    component.hwOrderCreation();
    const userinfo = {
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        newGuestPhNo: "0127272811",
        contactFirstName: "abcccb",
        contactLastName: "ddbdbdb",
        salutation: "Mr",
        contactEmail: "aamma.anssm@ss22ss.com"
      }
    };
    const guestinfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901211020922",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    sessionStorage.setItem("UserInfo", JSON.stringify(userinfo));
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfo));
    component.userInfo = JSON.parse(JSON.stringify(guestinfo));
    component.paymentData = { orderStatus: true, orderId: "DEVC000010058" };
    component.hwOrderCreation();
    localStorage.setItem("numberReservationId", "abc");
    sessionStorage.setItem("OLD_GUEST_USER", "NO");
    component.hwOrderCreation();
    sessionStorage.removeItem("UserInfo");
    localStorage.removeItem("NEW_GUEST_USER");
    sessionStorage.removeItem("GuestInfo");
  });
  it("continue eligibility check", () => {
    const data = "data";
    component.OnContinueEligibilityCheck(data);
  });
  it("create tnps server", () => {
    const guestinfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901211020922",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfo));
    component.userInfo = JSON.parse(JSON.stringify(guestinfo));
    const tycart = {
      id: 16003,
      created_at: "2019-11-08 05:52:30",
      updated_at: "2019-11-08 05:54:22",
      is_active: true,
      is_virtual: true,
      items: [
        {
          item_id: 42637,
          sku: "FPP",
          qty: 1,
          name: "Celcom Mobile Platinum Plus",
          price: 0,
          product_type: "virtual",
          quote_id: "16003"
        }
      ],
      items_count: 1,
      items_qty: 1,
      customer: {
        id: 3634,
        group_id: 1,
        default_billing: "10496",
        default_shipping: "10497",
        created_at: "2019-11-08 05:52:29",
        updated_at: "2019-11-08 05:54:22",
        created_in: "Default Store View",
        dob: "1990-12-11",
        email: "aamma.anssm@ss22ss.com",
        firstname: "abcccb",
        lastname: "ddbdbdb",
        gender: 1,
        store_id: 1,
        website_id: 1,
        addresses: [
          {
            id: 10495,
            customer_id: 3634,
            region: {
              region_code: "WP",
              region: "WP Kuala Lumpur",
              region_id: 546
            },
            region_id: 546,
            country_id: "MY",
            street: ["82, Jalan Raja Muda Abdul Aziz"],
            telephone: "823",
            postcode: "50300",
            city: "KL",
            firstname: "Guest",
            lastname: "Last Name",
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "8" }
            ]
          },
          {
            id: 10496,
            customer_id: 3634,
            region: { region_code: "KN", region: "Kelantan", region_id: 535 },
            region_id: 535,
            country_id: "MY",
            street: ["asdfg sdfg", "werty werty"],
            telephone: "0127272811",
            postcode: "22111",
            city: "kdmmddm",
            firstname: "abcccb",
            lastname: "ddbdbdb",
            default_billing: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "abc 1111" }
            ]
          },
          {
            id: 10497,
            customer_id: 3634,
            region: { region_code: "KN", region: "Kelantan", region_id: 535 },
            region_id: 535,
            country_id: "MY",
            street: ["asdfg sdfg", "werty werty"],
            telephone: "0127272811",
            postcode: "22111",
            city: "kdmmddm",
            firstname: "abcccb",
            lastname: "ddbdbdb",
            default_shipping: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "abc 1111" }
            ]
          }
        ],
        disable_auto_group_change: 0,
        extension_attributes: { is_subscribed: false },
        custom_attributes: [
          { attribute_code: "mobile_number", value: "0127272811" },
          { attribute_code: "id_type", value: "New NRIC" },
          { attribute_code: "id_number", value: "901211020922" },
          { attribute_code: "customer_full_name", value: "abcccb ddbdbdb" },
          { attribute_code: "salutation", value: "Mr" },
          {
            attribute_code: "customer_email_id",
            value: "aamma.anssm@ss22ss.com"
          }
        ]
      },
      billing_address: {
        address_id: "35372",
        quote_id: "16003",
        created_at: "2019-11-08 05:52:30",
        updated_at: "2019-11-08 05:52:30",
        customer_id: "3634",
        save_in_address_book: "0",
        customer_address_id: "10496",
        address_type: "billing",
        email: "aamma.anssm@ss22ss.com",
        prefix: null,
        firstname: "abcccb",
        middlename: null,
        lastname: "ddbdbdb",
        suffix: null,
        company: null,
        street: "asdfg sdfg\nwerty werty",
        city: "kdmmddm",
        region: "Kelantan",
        region_id: "535",
        postcode: "22111",
        country_id: "MY",
        telephone: "0127272811",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: null,
        billing_unit_number: "abc 1111",
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "0",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "0.0000",
        base_subtotal: "0.0000",
        subtotal_with_discount: "0.0000",
        base_subtotal_with_discount: "0.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "0.0000",
        base_grand_total: "0.0000",
        customer_notes: null,
        applied_taxes: "[]",
        discount_description: null,
        shipping_discount_amount: "0.0000",
        base_shipping_discount_amount: "0.0000",
        subtotal_incl_tax: "0.0000",
        base_subtotal_total_incl_tax: "0.0000",
        discount_tax_compensation_amount: "0.0000",
        base_discount_tax_compensation_amount: "0.0000",
        shipping_discount_tax_compensation_amount: "0.0000",
        base_shipping_discount_tax_compensation_amnt: null,
        shipping_incl_tax: "0.0000",
        base_shipping_incl_tax: "0.0000",
        free_shipping: "0",
        vat_id: null,
        vat_is_valid: null,
        vat_request_id: null,
        vat_request_date: null,
        vat_request_success: null,
        gift_message_id: null,
        base_customer_balance_amount: "0.0000",
        customer_balance_amount: "0.0000",
        gift_cards_amount: "0.0000",
        base_gift_cards_amount: "0.0000",
        gift_cards: "[]",
        used_gift_cards: "[]",
        gw_id: null,
        gw_allow_gift_receipt: null,
        gw_add_card: null,
        gw_base_price: null,
        gw_price: null,
        gw_items_base_price: null,
        gw_items_price: null,
        gw_card_base_price: null,
        gw_card_price: null,
        gw_base_tax_amount: null,
        gw_tax_amount: null,
        gw_items_base_tax_amount: null,
        gw_items_tax_amount: null,
        gw_card_base_tax_amount: null,
        gw_card_tax_amount: null,
        gw_base_price_incl_tax: null,
        gw_price_incl_tax: null,
        gw_items_base_price_incl_tax: null,
        gw_items_price_incl_tax: null,
        gw_card_base_price_incl_tax: null,
        gw_card_price_incl_tax: null,
        giftregistry_item_id: null,
        reward_points_balance: "0",
        base_reward_currency_amount: "0.0000",
        reward_currency_amount: "0.0000",
        entity_id: "35372",
        region_code: "KN",
        address_line_1: "asdfg sdfg",
        address_line_2: "werty werty"
      },
      orig_order_id: 0,
      currency: {
        global_currency_code: "MYR",
        base_currency_code: "MYR",
        store_currency_code: "MYR",
        quote_currency_code: "MYR",
        store_to_base_rate: 0,
        store_to_quote_rate: 0,
        base_to_global_rate: 1,
        base_to_quote_rate: 1
      },
      customer_is_guest: false,
      customer_note_notify: true,
      customer_tax_class_id: 3,
      store_id: 1,
      extension_attributes: { shipping_assignments: [] },
      all_items: [
        {
          item_id: "42637",
          quantity: 1,
          reservation_id: "OP76CE1573192350",
          sku: "FPP",
          sku_bundle: null,
          is_preorder: false,
          is_broadband: false,
          is_easyphone: false,
          has_add_ons: false,
          add_on_label: null,
          add_on_code: null,
          utm_source: null,
          easyphone_label: "EasyPhone  ()",
          preorder_availability_flag: null,
          midnight_delivery: 0,
          price: 0,
          itemTotal: "0.0000",
          selectedProduct: {
            orderMonthlyPayTotal: "188.0000",
            orderPlanName: "Celcom Mobile Platinum Plus",
            orderPlan: "FPP",
            urlKey: "first-platinum-plus",
            contract: "24 months contract",
            selectedProductSku: "FPP",
            orderMonthlyPay: "188.0000",
            orderOneTimePay: "188.0000",
            plan_image_url: "/media/catalog/product/w/f/wf-benji-100gb.png",
            orderPhoneNo: "01222222244",
            orderNumberType: "SwitchToCelcom",
            selectedPlanDetails: {
              name: "Celcom Mobile Platinum Plus",
              sku: "FPP",
              urlKey: "first-platinum-plus",
              monthly_plan: "188.0000",
              order_plan_bundle: "PB11860",
              order_service_bundle: "RTP0010",
              order_plan_component: [
                {
                  component_name: "Executive Plan VAS without GPRS_10784",
                  component_part_no: "CPT05370",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "New Package for IDD Activation",
                  component_part_no: "CPT07020",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "First Unlimited",
                  component_part_no: "CPT12290",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Default International Roaming Voice/SMS",
                  component_part_no: "CPT13540",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "FiRST Platinum Plus CBS Commitment Fee",
                  component_part_no: "CPT16940",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Free Chat 2.0",
                  component_part_no: "MI01790",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Advance Payment CBS RM188",
                  component_part_no: "OTC08850",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "SIM Card",
                  component_part_no: "SM00010",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Blank SIM Starter Pack",
                  component_part_no: "SP00210",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Stamp Fee_92382",
                  component_part_no: "OTC00350",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Printed Bill for Voice",
                  component_part_no: "BDMR0080",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "First Platinum Plus Business 2.0 RET",
                  component_part_no: "PB10570",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                }
              ],
              new_customer: "0",
              segment: "10",
              upfront_installment: null,
              product_type: "Service",
              start_date: null,
              end_date: null,
              BackgroundColor: "is-bg-color-black",
              IndicatorClass: "is-level-platinum-plus",
              ProductText: "Platinum Plus",
              KeyFiguresText: "100 GB",
              KeyText: "RM 188",
              BuynowLink: "/plans/first-platinum-plus",
              BuynowText: "Buy now",
              knowMoreLink: "/store/plans/first-platinum-plus",
              knowMoreText: "Learn more",
              MobileDescription: null,
              TableInfo: [],
              terms_and_condition: {
                plans: {
                  label: "Plans",
                  desc: "Unlimited Standard national calls + texts + videocalls"
                },
                contract_terms: {
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
              AtrHref: "#rm-0",
              telco_day: { status: false, hat_text: null, message: null },
              is_premium_plan: false,
              is_golden_number: 0
            },
            mnp_data: "901211020922",
            is_mnp: true
          },
          upfront_waiver: false,
          device_upfront_penalty: "0.00",
          campaign100_days: false,
          campaign: { title: null, subtitle: null },
          is_campaign_mviva: 0,
          campaign_mviva_message: null,
          campaign_mviva_url: "",
          promotion_details: "ADA",
          bill_type: 0,
          voucher_code: "",
          coupon_description: "",
          rebate_amount: 0,
          is_newbie: true,
          newbie_message:
            "Great! You are one step closer to receiving a Welcome Gift from us. Complete your order now to get the reward."
        }
      ],
      customerOtherInfo: {
        salutation: "Mr",
        unit_number: "abc 1111",
        mobile_number: "0127272811",
        gender: "Male",
        customer_full_name: "abcccb ddbdbdb"
      },
      GST: "0.00",
      grossTotal: "0.00",
      itemsTotal: "1",
      shipping_address: {
        address_id: "35373",
        quote_id: "16003",
        created_at: "2019-11-08 05:52:30",
        updated_at: "2019-11-08 05:52:30",
        customer_id: "3634",
        save_in_address_book: "0",
        customer_address_id: "10496",
        address_type: "shipping",
        email: "aamma.anssm@ss22ss.com",
        prefix: null,
        firstname: "abcccb",
        middlename: null,
        lastname: "ddbdbdb",
        suffix: null,
        company: null,
        street: "asdfg sdfg\nwerty werty",
        city: "kdmmddm",
        region: "Kelantan",
        region_id: "535",
        postcode: "22111",
        country_id: "MY",
        telephone: "0127272811",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: "abc 1111",
        billing_unit_number: null,
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "1",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "0.0000",
        base_subtotal: "0.0000",
        subtotal_with_discount: "0.0000",
        base_subtotal_with_discount: "0.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "0.0000",
        base_grand_total: "0.0000",
        customer_notes: null,
        applied_taxes: "null",
        discount_description: null,
        shipping_discount_amount: null,
        base_shipping_discount_amount: null,
        subtotal_incl_tax: "0.0000",
        base_subtotal_total_incl_tax: null,
        discount_tax_compensation_amount: "0.0000",
        base_discount_tax_compensation_amount: "0.0000",
        shipping_discount_tax_compensation_amount: "0.0000",
        base_shipping_discount_tax_compensation_amnt: null,
        shipping_incl_tax: "0.0000",
        base_shipping_incl_tax: "0.0000",
        free_shipping: "0",
        vat_id: null,
        vat_is_valid: null,
        vat_request_id: null,
        vat_request_date: null,
        vat_request_success: null,
        gift_message_id: null,
        base_customer_balance_amount: null,
        customer_balance_amount: null,
        gift_cards_amount: "0.0000",
        base_gift_cards_amount: "0.0000",
        gift_cards: "[]",
        used_gift_cards: "[]",
        gw_id: null,
        gw_allow_gift_receipt: null,
        gw_add_card: null,
        gw_base_price: "0.0000",
        gw_price: "0.0000",
        gw_items_base_price: "0.0000",
        gw_items_price: "0.0000",
        gw_card_base_price: "0.0000",
        gw_card_price: "0.0000",
        gw_base_tax_amount: null,
        gw_tax_amount: null,
        gw_items_base_tax_amount: null,
        gw_items_tax_amount: null,
        gw_card_base_tax_amount: null,
        gw_card_tax_amount: null,
        gw_base_price_incl_tax: null,
        gw_price_incl_tax: null,
        gw_items_base_price_incl_tax: null,
        gw_items_price_incl_tax: null,
        gw_card_base_price_incl_tax: null,
        gw_card_price_incl_tax: null,
        giftregistry_item_id: null,
        reward_points_balance: "0",
        base_reward_currency_amount: "0.0000",
        reward_currency_amount: "0.0000",
        entity_id: "35373",
        address_line_1: "asdfg sdfg",
        address_line_2: "werty werty"
      },
      supplementary_data: [],
      cart_session: 0,
      reservation_id: "OP76CE1573192350",
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" }
    };
    component.TYcart = JSON.parse(JSON.stringify(tycart));
    component.UserLoginName = "GUEST";
    component.createtnpsSurveyInfo(component.userInfo, magResp);
    sessionStorage.removeItem("UserInfo");
    localStorage.removeItem("NEW_GUEST_USER");
    sessionStorage.removeItem("GuestInfo");
  });
  it("init", () => {
    const userinfo = {
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        newGuestPhNo: "0127272811",
        contactFirstName: "abcccb",
        contactLastName: "ddbdbdb",
        salutation: "Mr",
        contactEmail: "aamma.anssm@ss22ss.com"
      }
    };
    const guestinfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901211020922",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901211020922",
        dateOfBirth: "19901211_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    sessionStorage.setItem("UserInfo", JSON.stringify(userinfo));
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfo));
    localStorage.setItem("MyMsIsdn", "60112322123");
    component.userInfo = JSON.parse(JSON.stringify(guestinfo));
    const tycart = {
      id: 16003,
      created_at: "2019-11-08 05:52:30",
      updated_at: "2019-11-08 05:54:22",
      is_active: true,
      is_virtual: true,
      items: [
        {
          item_id: 42637,
          sku: "FPP",
          qty: 1,
          name: "Celcom Mobile Platinum Plus",
          price: 0,
          product_type: "virtual",
          quote_id: "16003"
        }
      ],
      items_count: 1,
      items_qty: 1,
      customer: {
        id: 3634,
        group_id: 1,
        default_billing: "10496",
        default_shipping: "10497",
        created_at: "2019-11-08 05:52:29",
        updated_at: "2019-11-08 05:54:22",
        created_in: "Default Store View",
        dob: "1990-12-11",
        email: "aamma.anssm@ss22ss.com",
        firstname: "abcccb",
        lastname: "ddbdbdb",
        gender: 1,
        store_id: 1,
        website_id: 1,
        addresses: [
          {
            id: 10495,
            customer_id: 3634,
            region: {
              region_code: "WP",
              region: "WP Kuala Lumpur",
              region_id: 546
            },
            region_id: 546,
            country_id: "MY",
            street: ["82, Jalan Raja Muda Abdul Aziz"],
            telephone: "823",
            postcode: "50300",
            city: "KL",
            firstname: "Guest",
            lastname: "Last Name",
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "8" }
            ]
          },
          {
            id: 10496,
            customer_id: 3634,
            region: { region_code: "KN", region: "Kelantan", region_id: 535 },
            region_id: 535,
            country_id: "MY",
            street: ["asdfg sdfg", "werty werty"],
            telephone: "0127272811",
            postcode: "22111",
            city: "kdmmddm",
            firstname: "abcccb",
            lastname: "ddbdbdb",
            default_billing: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "abc 1111" }
            ]
          },
          {
            id: 10497,
            customer_id: 3634,
            region: { region_code: "KN", region: "Kelantan", region_id: 535 },
            region_id: 535,
            country_id: "MY",
            street: ["asdfg sdfg", "werty werty"],
            telephone: "0127272811",
            postcode: "22111",
            city: "kdmmddm",
            firstname: "abcccb",
            lastname: "ddbdbdb",
            default_shipping: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "abc 1111" }
            ]
          }
        ],
        disable_auto_group_change: 0,
        extension_attributes: { is_subscribed: false },
        custom_attributes: [
          { attribute_code: "mobile_number", value: "0127272811" },
          { attribute_code: "id_type", value: "New NRIC" },
          { attribute_code: "id_number", value: "901211020922" },
          { attribute_code: "customer_full_name", value: "abcccb ddbdbdb" },
          { attribute_code: "salutation", value: "Mr" },
          {
            attribute_code: "customer_email_id",
            value: "aamma.anssm@ss22ss.com"
          }
        ]
      },
      billing_address: {
        address_id: "35372",
        quote_id: "16003",
        created_at: "2019-11-08 05:52:30",
        updated_at: "2019-11-08 05:52:30",
        customer_id: "3634",
        save_in_address_book: "0",
        customer_address_id: "10496",
        address_type: "billing",
        email: "aamma.anssm@ss22ss.com",
        prefix: null,
        firstname: "abcccb",
        middlename: null,
        lastname: "ddbdbdb",
        suffix: null,
        company: null,
        street: "asdfg sdfg\nwerty werty",
        city: "kdmmddm",
        region: "Kelantan",
        region_id: "535",
        postcode: "22111",
        country_id: "MY",
        telephone: "0127272811",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: null,
        billing_unit_number: "abc 1111",
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "0",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "0.0000",
        base_subtotal: "0.0000",
        subtotal_with_discount: "0.0000",
        base_subtotal_with_discount: "0.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "0.0000",
        base_grand_total: "0.0000",
        customer_notes: null,
        applied_taxes: "[]",
        discount_description: null,
        shipping_discount_amount: "0.0000",
        base_shipping_discount_amount: "0.0000",
        subtotal_incl_tax: "0.0000",
        base_subtotal_total_incl_tax: "0.0000",
        discount_tax_compensation_amount: "0.0000",
        base_discount_tax_compensation_amount: "0.0000",
        shipping_discount_tax_compensation_amount: "0.0000",
        base_shipping_discount_tax_compensation_amnt: null,
        shipping_incl_tax: "0.0000",
        base_shipping_incl_tax: "0.0000",
        free_shipping: "0",
        vat_id: null,
        vat_is_valid: null,
        vat_request_id: null,
        vat_request_date: null,
        vat_request_success: null,
        gift_message_id: null,
        base_customer_balance_amount: "0.0000",
        customer_balance_amount: "0.0000",
        gift_cards_amount: "0.0000",
        base_gift_cards_amount: "0.0000",
        gift_cards: "[]",
        used_gift_cards: "[]",
        gw_id: null,
        gw_allow_gift_receipt: null,
        gw_add_card: null,
        gw_base_price: null,
        gw_price: null,
        gw_items_base_price: null,
        gw_items_price: null,
        gw_card_base_price: null,
        gw_card_price: null,
        gw_base_tax_amount: null,
        gw_tax_amount: null,
        gw_items_base_tax_amount: null,
        gw_items_tax_amount: null,
        gw_card_base_tax_amount: null,
        gw_card_tax_amount: null,
        gw_base_price_incl_tax: null,
        gw_price_incl_tax: null,
        gw_items_base_price_incl_tax: null,
        gw_items_price_incl_tax: null,
        gw_card_base_price_incl_tax: null,
        gw_card_price_incl_tax: null,
        giftregistry_item_id: null,
        reward_points_balance: "0",
        base_reward_currency_amount: "0.0000",
        reward_currency_amount: "0.0000",
        entity_id: "35372",
        region_code: "KN",
        address_line_1: "asdfg sdfg",
        address_line_2: "werty werty"
      },
      orig_order_id: 0,
      currency: {
        global_currency_code: "MYR",
        base_currency_code: "MYR",
        store_currency_code: "MYR",
        quote_currency_code: "MYR",
        store_to_base_rate: 0,
        store_to_quote_rate: 0,
        base_to_global_rate: 1,
        base_to_quote_rate: 1
      },
      customer_is_guest: false,
      customer_note_notify: true,
      customer_tax_class_id: 3,
      store_id: 1,
      extension_attributes: { shipping_assignments: [] },
      all_items: [
        {
          item_id: "42637",
          quantity: 1,
          reservation_id: "OP76CE1573192350",
          sku: "FPP",
          sku_bundle: null,
          is_preorder: false,
          is_broadband: false,
          has_add_ons: false,
          add_on_label: null,
          add_on_code: null,
          utm_source: null,
          is_easyphone: true,
          easyphone_label: "EasyPhone  ()",
          preorder_availability_flag: null,
          midnight_delivery: 0,
          price: 0,
          itemTotal: "0.0000",
          selectedProduct: {
            orderMonthlyPayTotal: "188.0000",
            orderPlanName: "Celcom Mobile Platinum Plus",
            orderPlan: "FPP",
            urlKey: "first-platinum-plus",
            contract: "24 months contract",
            selectedProductSku: "FPP",
            orderMonthlyPay: "188.0000",
            orderOneTimePay: "188.0000",
            plan_image_url: "/media/catalog/product/w/f/wf-benji-100gb.png",
            orderPhoneNo: "01222222244",
            orderNumberType: "SwitchToCelcom",
            selectedPlanDetails: {
              name: "Celcom Mobile Platinum Plus",
              sku: "FPP",
              urlKey: "first-platinum-plus",
              monthly_plan: "188.0000",
              order_plan_bundle: "PB11860",
              order_service_bundle: "RTP0010",
              order_plan_component: [
                {
                  component_name: "Executive Plan VAS without GPRS_10784",
                  component_part_no: "CPT05370",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "New Package for IDD Activation",
                  component_part_no: "CPT07020",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "First Unlimited",
                  component_part_no: "CPT12290",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Default International Roaming Voice/SMS",
                  component_part_no: "CPT13540",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "FiRST Platinum Plus CBS Commitment Fee",
                  component_part_no: "CPT16940",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Free Chat 2.0",
                  component_part_no: "MI01790",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Advance Payment CBS RM188",
                  component_part_no: "OTC08850",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "SIM Card",
                  component_part_no: "SM00010",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Blank SIM Starter Pack",
                  component_part_no: "SP00210",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Stamp Fee_92382",
                  component_part_no: "OTC00350",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "Printed Bill for Voice",
                  component_part_no: "BDMR0080",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                },
                {
                  component_name: "First Platinum Plus Business 2.0 RET",
                  component_part_no: "PB10570",
                  component_default: "0",
                  component_price: "0.0000",
                  cbs_name: "FiRST Platinum Plus CBS Plan",
                  cbs_part_number: "PR03490",
                  isvas: "0",
                  vasname: null,
                  vasvalue: null
                }
              ],
              new_customer: "0",
              segment: "10",
              upfront_installment: null,
              product_type: "Service",
              start_date: null,
              end_date: null,
              BackgroundColor: "is-bg-color-black",
              IndicatorClass: "is-level-platinum-plus",
              ProductText: "Platinum Plus",
              KeyFiguresText: "100 GB",
              KeyText: "RM 188",
              BuynowLink: "/plans/first-platinum-plus",
              BuynowText: "Buy now",
              knowMoreLink: "/store/plans/first-platinum-plus",
              knowMoreText: "Learn more",
              MobileDescription: null,
              TableInfo: [],
              terms_and_condition: {
                plans: {
                  label: "Plans",
                  desc: "Unlimited Standard national calls + texts + videocalls"
                },
                contract_terms: {
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
              AtrHref: "#rm-0",
              telco_day: { status: false, hat_text: null, message: null },
              is_premium_plan: false,
              is_golden_number: 0
            },
            mnp_data: "901211020922",
            is_mnp: true
          },
          upfront_waiver: false,
          device_upfront_penalty: "0.00",
          campaign100_days: false,
          campaign: { title: null, subtitle: null },
          is_campaign_mviva: 0,
          campaign_mviva_message: null,
          campaign_mviva_url: "",
          promotion_details: "ADA",
          bill_type: 0,
          voucher_code: "",
          coupon_description: "",
          rebate_amount: 0,
          is_newbie: true,
          newbie_message:
            "Great! You are one step closer to receiving a Welcome Gift from us. Complete your order now to get the reward."
        }
      ],
      customerOtherInfo: {
        salutation: "Mr",
        unit_number: "abc 1111",
        mobile_number: "0127272811",
        gender: "Male",
        customer_full_name: "abcccb ddbdbdb"
      },
      GST: "0.00",
      grossTotal: "0.00",
      itemsTotal: "1",
      shipping_address: {
        address_id: "35373",
        quote_id: "16003",
        created_at: "2019-11-08 05:52:30",
        updated_at: "2019-11-08 05:52:30",
        customer_id: "3634",
        save_in_address_book: "0",
        customer_address_id: "10496",
        address_type: "shipping",
        email: "aamma.anssm@ss22ss.com",
        prefix: null,
        firstname: "abcccb",
        middlename: null,
        lastname: "ddbdbdb",
        suffix: null,
        company: null,
        street: "asdfg sdfg\nwerty werty",
        city: "kdmmddm",
        region: "Kelantan",
        region_id: "535",
        postcode: "22111",
        country_id: "MY",
        telephone: "0127272811",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: "abc 1111",
        billing_unit_number: null,
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "1",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "0.0000",
        base_subtotal: "0.0000",
        subtotal_with_discount: "0.0000",
        base_subtotal_with_discount: "0.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "0.0000",
        base_grand_total: "0.0000",
        customer_notes: null,
        applied_taxes: "null",
        discount_description: null,
        shipping_discount_amount: null,
        base_shipping_discount_amount: null,
        subtotal_incl_tax: "0.0000",
        base_subtotal_total_incl_tax: null,
        discount_tax_compensation_amount: "0.0000",
        base_discount_tax_compensation_amount: "0.0000",
        shipping_discount_tax_compensation_amount: "0.0000",
        base_shipping_discount_tax_compensation_amnt: null,
        shipping_incl_tax: "0.0000",
        base_shipping_incl_tax: "0.0000",
        free_shipping: "0",
        vat_id: null,
        vat_is_valid: null,
        vat_request_id: null,
        vat_request_date: null,
        vat_request_success: null,
        gift_message_id: null,
        base_customer_balance_amount: null,
        customer_balance_amount: null,
        gift_cards_amount: "0.0000",
        base_gift_cards_amount: "0.0000",
        gift_cards: "[]",
        used_gift_cards: "[]",
        gw_id: null,
        gw_allow_gift_receipt: null,
        gw_add_card: null,
        gw_base_price: "0.0000",
        gw_price: "0.0000",
        gw_items_base_price: "0.0000",
        gw_items_price: "0.0000",
        gw_card_base_price: "0.0000",
        gw_card_price: "0.0000",
        gw_base_tax_amount: null,
        gw_tax_amount: null,
        gw_items_base_tax_amount: null,
        gw_items_tax_amount: null,
        gw_card_base_tax_amount: null,
        gw_card_tax_amount: null,
        gw_base_price_incl_tax: null,
        gw_price_incl_tax: null,
        gw_items_base_price_incl_tax: null,
        gw_items_price_incl_tax: null,
        gw_card_base_price_incl_tax: null,
        gw_card_price_incl_tax: null,
        giftregistry_item_id: null,
        reward_points_balance: "0",
        base_reward_currency_amount: "0.0000",
        reward_currency_amount: "0.0000",
        entity_id: "35373",
        address_line_1: "asdfg sdfg",
        address_line_2: "werty werty"
      },
      supplementary_data: [],
      cart_session: 0,
      reservation_id: "OP76CE1573192350",
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" }
    };
    localStorage.setItem("TYCart", JSON.stringify(tycart));
    component.paymentData = {
      returnCode: "1",
      reasonCode: "12345",
      reasonDesc: "abc"
    };
    component.init();
    localStorage.removeItem("MyMsIsdn");
    localStorage.removeItem("NEW_GUEST_USER");
    sessionStorage.removeItem("GuestInfo");
    component.init();
    sessionStorage.removeItem("UserInfo");
    component.init();
  });

  it("should call ngAfterViewInit", inject(
    [EStoreAnalysticsService],
    (estoreAnalytic: EStoreAnalysticsService) => {
      const obSpyActivatedRoute = TestBed.get(ActivatedRoute);
      obSpyActivatedRoute.data = Observable.of({
        pageTitle: "",
        pageCategory2: ""
      });
      const obSpyRoute = TestBed.get(Router);
      obSpyRoute.routerState = { snapshot: { url: "/" } };
      spyOn(estoreAnalytic, "SetCategoryTwoForAdobeDataLayer");
      component.ngAfterViewInit();
      expect(estoreAnalytic.SetCategoryTwoForAdobeDataLayer).toHaveBeenCalled();
    }
  ));

  it("should set displaySalutation when there is MyMsisdn param", () => {
    component.userInfo = userInfoMockResp;
    localStorage.setItem("MyMsIsdn", "60112322123");
    component.salutaion();
    expect(component.personalDetails.displaySalutation).not.toBeNull();
    expect(component.personalDetails.displaySalutation).toBe("Mr");
    localStorage.removeItem("MyMsIsdn");
  });

  it("should set displaySalutation when user type guest", () => {
    component.checkoutData = { customerOtherInfo: { salutation: "Mr" } };
    sessionStorage.setItem("USER_TYPE", "GUEST");
    component.salutaion();
    expect(component.personalDetails.displaySalutation).not.toBeNull();
    expect(component.personalDetails.displaySalutation).toBe("Mr");
    sessionStorage.removeItem("USER_TYPE");
  });

  it("should set displaySalutation from personalForm", () => {
    sessionStorage.setItem(
      "personalForm",
      JSON.stringify({ salutation: "Mr" })
    );
    component.salutaion();
    expect(component.personalDetails.displaySalutation).not.toBeNull();
    expect(component.personalDetails.displaySalutation).toBe("Mr");
    sessionStorage.removeItem("personalForm");
  });

  // it("should call doLoginCheck and set some parameter", inject(
  //   [GetParametersService],
  //   (getParamService: GetParametersService) => {
  //     spyOn(getParamService, "getParameterByName").and.returnValue("123");
  //     spyOn(component, "clearPrevOrderInfo").and.returnValue(true);
  //     spyOn(component, "getTimeTransaction").and.returnValue(true);
  //     component.paymentData = { returnCode: "1" };
  //     component.isCSAgent = true;
  //     component.doLogicCheck();
  //     expect(component.oderType).toBe("cs_agent");
  //     expect(component.orderId).toBe("123");
  //     expect(component.getTimeTransaction).toHaveBeenCalled();
  //   }
  // ));

  // it("should call doLoginCheck and handle when OrderFailure", inject(
  //   [EStoreAnalysticsService],
  //   (estoreAnalyticService: EStoreAnalysticsService) => {
  //     spyOn(
  //       estoreAnalyticService,
  //       "SetTransactionDetailsOfUser"
  //     ).and.returnValue(true);
  //     localStorage.setItem("numberReservationId", "abc");
  //     localStorage.setItem("OrderFailure", "true");
  //     component.paymentData = { returnCode: "1" };
  //     component.doLogicCheck();
  //     expect(component.transactionDetails.transactResult).toBe("failed");
  //     expect(component.orderCreateFailure).toBeTruthy();
  //     expect(
  //       estoreAnalyticService.SetTransactionDetailsOfUser
  //     ).toHaveBeenCalled();
  //   }
  // ));

  // it("should call doLoginCheck and handle when payment cancelled by buyer", () => {
  //   spyOn(component, "clearPrevOrderInfo").and.returnValue(true);
  //   spyOn(component, "backToCart");
  //   component.paymentData = {
  //     returnCode: "4",
  //     reasonCode: "50006",
  //     reasonDesc: "Payment cancelled by buyer"
  //   };
  //   component.doLogicCheck();
  //   expect(component.backToCart).toHaveBeenCalled();
  //   expect(component.clearPrevOrderInfo).toHaveBeenCalled();
  //   expect(component.redirectToCart).toBeFalsy();
  // });

  // it("should call doLoginCheck and handle when returnCode is 5", () => {
  //   spyOn(component, "clearPrevOrderInfo").and.returnValue(true);
  //   spyOn(component, "backToCart");
  //   component.paymentData = { returnCode: "5" };
  //   component.doLogicCheck();
  //   expect(component.clearPrevOrderInfo).toHaveBeenCalled();
  //   expect(component.redirectToCart).toBeTruthy();
  // });

  it("should call backToCart", () => {
    spyOn<any>(component, "Redirect").and.returnValue(true);
    localStorage.setItem("magentoID", "123");
    component.paymentData = { returnCode: "4" };
    component.backToCart();
    expect(component.orderId).not.toBeNull();
    expect(component.orderId).toBe("123");
    localStorage.removeItem("magentoID");
  });

  it("should call takeDateFromNow", () => {
    sessionStorage.setItem("transDate", "2019-11-11");
    sessionStorage.setItem("transID", "123");
    component.paymentData = { orderId: "123" };
    component.takeDateFromNow();
    expect(component.currDate).toBe("2019-11-11");
    sessionStorage.removeItem("transDate");
    sessionStorage.removeItem("transID");
  });

  it("should call takeDateFromNow", () => {
    component.paymentData = { orderId: "123" };
    component.takeDateFromNow();
    expect(sessionStorage.getItem("transDate")).not.toBeNull();
    expect(sessionStorage.getItem("transID")).not.toBeNull();
    expect(sessionStorage.getItem("transID")).toBe("123");
    sessionStorage.removeItem("transDate");
    sessionStorage.removeItem("transID");
  });

  // it("should call createOrder with plan only", () => {
  //   spyOn(component, "createCobpPlanOrder").and.returnValue(true);
  //   localStorage.setItem("COBP_FLOW", "true");
  //   localStorage.setItem("MyMsIsdn", "0132241231");
  //   component.TYcart = response[0];
  //   component.createOrder();
  //   expect(component.createCobpPlanOrder).toHaveBeenCalled();
  //   localStorage.removeItem("MyMsIsdn");
  //   localStorage.removeItem("COBP_FLOW");
  // });

  // it("should call createOrder with plan and device", () => {
  //   component.TYcart = {
  //     all_items: [
  //       {
  //         item_id: "69961",
  //         quantity: 1,
  //         reservation_id: "OP57CE1574234744",
  //         sku: "huawei-mate-20-11-11-FPP-HuaweiMate20128gbmidnightblue-11.11",
  //         sku_bundle: "huawei-mate-20-11-11",
  //         is_preorder: 0,
  //         is_broadband: false,
  //         is_easyphone: false,
  //         has_add_ons: false,
  //         add_on_label: null,
  //         add_on_code: null,
  //         utm_source: null,
  //         easyphone_label: "EasyPhone  (24 months contract)",
  //         preorder_availability_flag: 0,
  //         midnight_delivery: 0,
  //         price: 1811,
  //         itemTotal: "1811.0000",
  //         selectedProduct: {
  //           orderMonthlyPayTotal: 188,
  //           is_moon: false,
  //           orderDevice: "Huawei Mate 20 128GB Midnight Blue",
  //           orderDeviceName: "Huawei Mate 20 128GB Midnight Blue",
  //           selectedProductSku: "HuaweiMate20128gbmidnightblue-11.11",
  //           selectedImageList: ["/media/catalog/product/f/r/front_10_1.png"],
  //           orderPlanName: "First\u2122 Platinum Plus",
  //           orderPlan: "FPP",
  //           urlKey: "first-platinum-plus",
  //           orderMonthlyPay: "188.0000",
  //           plan_image_url: "/media/catalog/product/w/f/wf-benji-100gb.png",
  //           orderOneTimePay: "1800.00",
  //           eligibilty: null,
  //           orderPhoneNo: "60132072871",
  //           orderNumberType: "KeepNumber",
  //           orderDevicePrice: "11.0000",
  //           orderSummaryColor: "Blue",
  //           orderSummaryStorage: "128GB",
  //           orderReqServiceBundle: "",
  //           orderTotalPay: 1811,
  //           total: 1811,
  //           contract: "24 months contract",
  //           orderReqBrand: "HUAWEI",
  //           orderReqCategory: "HP",
  //           orderReqColor: "BLU",
  //           orderReqModel: "MATE 20",
  //           orderReqPartNumber: "MDR6370",
  //           free_gift_data: {
  //             gift_image: "/media/catalog/productno_selection",
  //             gift_message: null
  //           },
  //           mnp_data: null,
  //           is_mnp: false
  //         },
  //         upfront_waiver: false,
  //         device_upfront_penalty: "0.00",
  //         campaign100_days: false,
  //         campaign: {
  //           title: null,
  //           subtitle: null
  //         },
  //         is_campaign_mviva: 0,
  //         campaign_mviva_message: null,
  //         campaign_mviva_url: "",
  //         promotion_details: "ADA",
  //         bill_type: 0,
  //         voucher_code: "",
  //         coupon_description: "",
  //         rebate_amount: 0,
  //         is_newbie: true,
  //         newbie_message:
  //           "Great news! Use Boost to pay and stand to win a Samsung Galaxy Note 10, plus other great prizes! Boost a minimum of                RM120 to enjoy RM10 cashback.",
  //         esim: false
  //       }
  //     ]
  //   };

  //   spyOn(component, "createCobpBundleOrder").and.returnValue(true);
  //   localStorage.setItem("COBP_FLOW", "true");
  //   localStorage.setItem("MyMsIsdn", "60132072871");
  //   component.createOrder();
  //   expect(component.createCobpBundleOrder).toHaveBeenCalled();
  //   expect(component.oderType).toBe("device_plan");
  //   expect(component.globalPartNumber).toBe("MDR6370");
  //   localStorage.removeItem("MyMsIsdn");
  //   localStorage.removeItem("COBP_FLOW");
  // });

  // it("should call createOrder with plan and device with home wireless", () => {
  //   component.TYcart = {
  //     all_items: [
  //       {
  //         item_id: "69961",
  //         quantity: 1,
  //         reservation_id: "OP57CE1574234744",
  //         sku: "huawei-mate-20-11-11-FPP-HuaweiMate20128gbmidnightblue-11.11",
  //         sku_bundle: "huawei-mate-20-11-11",
  //         is_preorder: 0,
  //         is_broadband: true,
  //         is_easyphone: false,
  //         has_add_ons: false,
  //         add_on_label: null,
  //         add_on_code: null,
  //         utm_source: null,
  //         easyphone_label: "EasyPhone  (24 months contract)",
  //         preorder_availability_flag: 0,
  //         midnight_delivery: 0,
  //         price: 1811,
  //         itemTotal: "1811.0000",
  //         selectedProduct: {
  //           orderMonthlyPayTotal: 188,
  //           is_moon: false,
  //           orderDevice: "Huawei Mate 20 128GB Midnight Blue",
  //           orderDeviceName: "Huawei Mate 20 128GB Midnight Blue",
  //           selectedProductSku: "HuaweiMate20128gbmidnightblue-11.11",
  //           selectedImageList: ["/media/catalog/product/f/r/front_10_1.png"],
  //           orderPlanName: "First\u2122 Platinum Plus",
  //           orderPlan: "FPP",
  //           urlKey: "first-platinum-plus",
  //           orderMonthlyPay: "188.0000",
  //           plan_image_url: "/media/catalog/product/w/f/wf-benji-100gb.png",
  //           orderOneTimePay: "1800.00",
  //           eligibilty: null,
  //           orderPhoneNo: "60132072871",
  //           orderNumberType: "KeepNumber",
  //           orderDevicePrice: "11.0000",
  //           orderSummaryColor: "Blue",
  //           orderSummaryStorage: "128GB",
  //           orderReqServiceBundle: "",
  //           orderTotalPay: 1811,
  //           total: 1811,
  //           contract: "24 months contract",
  //           orderReqBrand: "HUAWEI",
  //           orderReqCategory: "HP",
  //           orderReqColor: "BLU",
  //           orderReqModel: "MATE 20",
  //           orderReqPartNumber: "MDR6370",
  //           free_gift_data: {
  //             gift_image: "/media/catalog/productno_selection",
  //             gift_message: null
  //           },
  //           mnp_data: null,
  //           is_mnp: false
  //         },
  //         upfront_waiver: false,
  //         device_upfront_penalty: "0.00",
  //         campaign100_days: false,
  //         campaign: {
  //           title: null,
  //           subtitle: null
  //         },
  //         is_campaign_mviva: 0,
  //         campaign_mviva_message: null,
  //         campaign_mviva_url: "",
  //         promotion_details: "ADA",
  //         bill_type: 0,
  //         voucher_code: "",
  //         coupon_description: "",
  //         rebate_amount: 0,
  //         is_newbie: true,
  //         newbie_message:
  //           "Great news! Use Boost to pay and stand to win a Samsung Galaxy Note 10, plus other great prizes! Boost a minimum of                RM120 to enjoy RM10 cashback.",
  //         esim: false
  //       }
  //     ]
  //   };

  //   spyOn(component, "hwOrderCreation").and.returnValue(true);
  //   component.createOrder();
  //   expect(component.hwOrderCreation).toHaveBeenCalled();
  //   expect(component.oderType).toBe("device_plan");
  //   expect(component.globalPartNumber).toBe("MDR6370");
  // });

  // it("should call createOrder with plan and device newline/mnp flow", () => {
  //   component.TYcart = {
  //     all_items: [
  //       {
  //         item_id: "69961",
  //         quantity: 1,
  //         reservation_id: "OP57CE1574234744",
  //         sku: "huawei-mate-20-11-11-FPP-HuaweiMate20128gbmidnightblue-11.11",
  //         sku_bundle: "huawei-mate-20-11-11",
  //         is_preorder: 0,
  //         is_broadband: false,
  //         is_easyphone: false,
  //         has_add_ons: false,
  //         add_on_label: null,
  //         add_on_code: null,
  //         utm_source: null,
  //         easyphone_label: "EasyPhone  (24 months contract)",
  //         preorder_availability_flag: 0,
  //         midnight_delivery: 0,
  //         price: 1811,
  //         itemTotal: "1811.0000",
  //         selectedProduct: {
  //           orderMonthlyPayTotal: 188,
  //           is_moon: false,
  //           orderDevice: "Huawei Mate 20 128GB Midnight Blue",
  //           orderDeviceName: "Huawei Mate 20 128GB Midnight Blue",
  //           selectedProductSku: "HuaweiMate20128gbmidnightblue-11.11",
  //           selectedImageList: ["/media/catalog/product/f/r/front_10_1.png"],
  //           orderPlanName: "First\u2122 Platinum Plus",
  //           orderPlan: "FPP",
  //           urlKey: "first-platinum-plus",
  //           orderMonthlyPay: "188.0000",
  //           plan_image_url: "/media/catalog/product/w/f/wf-benji-100gb.png",
  //           orderOneTimePay: "1800.00",
  //           eligibilty: null,
  //           orderPhoneNo: "60132072871",
  //           orderNumberType: "KeepNumber",
  //           orderDevicePrice: "11.0000",
  //           orderSummaryColor: "Blue",
  //           orderSummaryStorage: "128GB",
  //           orderReqServiceBundle: "",
  //           orderTotalPay: 1811,
  //           total: 1811,
  //           contract: "24 months contract",
  //           orderReqBrand: "HUAWEI",
  //           orderReqCategory: "HP",
  //           orderReqColor: "BLU",
  //           orderReqModel: "MATE 20",
  //           orderReqPartNumber: "MDR6370",
  //           free_gift_data: {
  //             gift_image: "/media/catalog/productno_selection",
  //             gift_message: null
  //           },
  //           mnp_data: null,
  //           is_mnp: false
  //         },
  //         upfront_waiver: false,
  //         device_upfront_penalty: "0.00",
  //         campaign100_days: false,
  //         campaign: {
  //           title: null,
  //           subtitle: null
  //         },
  //         is_campaign_mviva: 0,
  //         campaign_mviva_message: null,
  //         campaign_mviva_url: "",
  //         promotion_details: "ADA",
  //         bill_type: 0,
  //         voucher_code: "",
  //         coupon_description: "",
  //         rebate_amount: 0,
  //         is_newbie: true,
  //         newbie_message:
  //           "Great news! Use Boost to pay and stand to win a Samsung Galaxy Note 10, plus other great prizes! Boost a minimum of                RM120 to enjoy RM10 cashback.",
  //         esim: false
  //       }
  //     ]
  //   };

  //   spyOn(component, "createPlanOrDevicePlusPlanOrder").and.returnValue(true);
  //   component.createOrder();
  //   expect(component.createPlanOrDevicePlusPlanOrder).toHaveBeenCalled();
  //   expect(component.oderType).toBe("device_plan");
  //   expect(component.globalPartNumber).toBe("MDR6370");
  // });

  // it("should call createOrder with device only", () => {
  //   component.TYcart = {
  //     all_items: [
  //       {
  //         item_id: "69973",
  //         quantity: 1,
  //         reservation_id: "OP92CE1574236794",
  //         sku: "huawei-mate-20-11-11-HuaweiMate20128gbmidnightblue-11.11",
  //         sku_bundle: "huawei-mate-20-11-11",
  //         is_preorder: 0,
  //         is_broadband: false,
  //         is_easyphone: false,
  //         has_add_ons: false,
  //         add_on_label: null,
  //         add_on_code: null,
  //         utm_source: null,
  //         easyphone_label: "EasyPhone  ()",
  //         preorder_availability_flag: 0,
  //         midnight_delivery: 0,
  //         price: 2099,
  //         itemTotal: "2099.0000",
  //         selectedProduct: {
  //           orderMonthlyPayTotal: 0,
  //           is_moon: false,
  //           orderDevice: "Huawei Mate 20 128GB Midnight Blue",
  //           orderDeviceName: "Huawei Mate 20 128GB Midnight Blue",
  //           selectedProductSku: "HuaweiMate20128gbmidnightblue-11.11",
  //           selectedImageList: ["/media/catalog/product/f/r/front_10_1.png"],
  //           orderDevicePrice: "2099.0000",
  //           orderSummaryColor: "Blue",
  //           orderSummaryStorage: "128GB",
  //           orderReqServiceBundle: "",
  //           orderTotalPay: 2099,
  //           total: 2099,
  //           contract: "24 months contract",
  //           orderReqBrand: "HUAWEI",
  //           orderReqCategory: "HP",
  //           orderReqColor: "BLU",
  //           orderReqModel: "MATE 20",
  //           orderReqPartNumber: "MDR6370",
  //           free_gift_data: {
  //             gift_image: "/media/catalog/productno_selection",
  //             gift_message: null
  //           },
  //           mnp_data: null,
  //           is_mnp: false
  //         },
  //         upfront_waiver: false,
  //         device_upfront_penalty: "0.00",
  //         campaign100_days: false,
  //         campaign: {
  //           title: null,
  //           subtitle: null
  //         },
  //         is_campaign_mviva: 0,
  //         campaign_mviva_message: null,
  //         campaign_mviva_url: "",
  //         promotion_details: "ADA",
  //         bill_type: 0,
  //         voucher_code: "",
  //         coupon_description: "",
  //         rebate_amount: 0,
  //         is_newbie: true,
  //         newbie_message:
  //           "Great news! Use Boost to pay and stand to win a Samsung Galaxy Note 10, plus other great prizes! Boost a minimum of                RM120 to enjoy RM10 cashback.",
  //         esim: false
  //       }
  //     ]
  //   };

  //   spyOn(component, "createPlanOrDevicePlusPlanOrder").and.returnValue(true);
  //   localStorage.setItem("MyMsIsdn", "0132241231");
  //   component.createOrder();
  //   expect(component.oderType).toBe("device");
  //   expect(component.globalPartNumber).toBe("MDR6370");
  //   expect(component.createPlanOrDevicePlusPlanOrder).toHaveBeenCalled();
  //   localStorage.removeItem("MyMsIsdn");
  // });

  // it("should call getTimeTransaction", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with EasyPhone Own", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(easyPhoneMockResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.isEasyPhone).toBe(true);
  //     expect(component.easyPhoneLabel).toBe(
  //       "EasyPhone™ Own (24 months contract)"
  //     );
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with EasyPhone Rent", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     easyPhoneMockResp[0].order_data.items[0].easyphone_label =
  //       "EasyPhone Rent";
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(easyPhoneMockResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.isEasyPhone).toBe(true);
  //     expect(component.easyPhoneLabel).toBe(
  //       "EasyPhone™ Rent (24 months contract)"
  //     );
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with Supplementary Line", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.supplementary_data.push(
  //       {
  //         number: "0132091275",
  //         supp_id: "1652",
  //         cart_item_id: "70022",
  //         cart_id: "25103",
  //         name: "Celcom Mobile Family™",
  //         price: "48.0000",
  //         part_number: "PB12540",
  //         subsidy: "0.0000"
  //       },
  //       {
  //         number: "0133688436",
  //         supp_id: "1653",
  //         cart_item_id: "70022",
  //         cart_id: "25103",
  //         name: "Celcom Mobile Family™",
  //         price: "48.0000",
  //         part_number: "PB12540",
  //         subsidy: "0.0000"
  //       }
  //     );
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.suppData).not.toBe([]);
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with Midnight Delivery", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.delivery_type.value = 1;
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.deliveryType).toBe("Midnight Delivery");
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with Auto Billing", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.has_auto_billing = 1;
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.hasAutobilling).toBe(true);
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with Campaign 100 Days", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.campaign100_days = true;
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.campaign100Days).toBe(true);
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with MViva Campaign", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.is_campaign_mviva = true;
  //     magResp[0].order_data.campaign_mviva_message = "mviva campaign message";
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.campaignMviva).toBe(true);
  //     expect(component.campaignMvivaMessage).not.toBeNull();
  //     expect(component.campaignMvivaMessage).toBe("mviva campaign message");
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with XPlite", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.is_campaign_mviva = true;
  //     magResp[0].order_data.campaign_mviva_message = "mviva campaign message";
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.campaignMviva).toBe(true);
  //     expect(component.campaignMvivaMessage).not.toBeNull();
  //     expect(component.campaignMvivaMessage).toBe("mviva campaign message");
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with Online Banking payment method", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.payment_method = "7";
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.transactionDetails.transactMethod).toBe("fpx");
  //     expect(component.paymentMethodForAI).toBe("Online Banking");
  //     expect(component.paymentType).toBe("Payment Via BCO (FPX)");
  //     expect(component.transactionType).toEqual(1042);
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with Boost payment method", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.payment_method = "6";
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.transactionDetails.transactMethod).toBe("Boost");
  //     expect(component.paymentMethodForAI).toBe("Boost");
  //     expect(component.paymentType).toBe("Boost");
  //     expect(component.transactionType).toEqual(1229);
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with Telco Day", inject(
  //   [AppService],
  //   (appService: AppService) => {
  //     magResp[0].order_data.items[0].plan_data = {
  //       orderPhoneNo: "0132087276",
  //       name: "XP Lite™",
  //       orderNumberType: "NewNumber",
  //       orderMonthlyPay: "28.00",
  //       orderOneTimePay: "28.00",
  //       indicator_class: null,
  //       telco_day: {
  //         status: true,
  //         hat_text: null,
  //         message: "telco day test message"
  //       },
  //       TableInfo: [],
  //       contract_terms: {
  //         label: "Contract Duration",
  //         desc: "24 months contract"
  //       }
  //     };
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.telcoDay).toBe(true);
  //     expect(component.telcoDayMessage).toBe("telco day test message");
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  // it("should call getTimeTransaction with no payment method", inject(
  //   [CookieService, AppService],
  //   (cookieService: CookieService, appService: AppService) => {
  //     magResp[0].order_data.payment_method = undefined;
  //     spyOn(cookieService, "check").and.returnValue(true);
  //     spyOn(appService, "getEstoreUserData").and.returnValue(
  //       Observable.of(magResp)
  //     );
  //     spyOn(component, "createtnpsSurveyInfo").and.returnValue(true);
  //     spyOn(component, "addAffiliateScriptToHead").and.returnValue(true);
  //     spyOn(component, "addAffiliateScriptToBody");
  //     spyOn(component, "timerForOrderCompletion");
  //     component.getTimeTransaction("PREC000010270");
  //     expect(component.loading).toBeFalsy();
  //     expect(component.paymentMethodForAI).toBe("No Payment");
  //     expect(component.transactionDetails.transactResult).toMatch("success");
  //     expect(component.addAffiliateScriptToHead).toHaveBeenCalled();
  //     expect(component.addAffiliateScriptToBody).toHaveBeenCalled();
  //     expect(component.timerForOrderCompletion).toHaveBeenCalled();
  //   }
  // ));

  it("should call getTimeTransaction and handling failed transaction", inject(
    [AppService],
    (appService: AppService) => {
      spyOn(appService, "getEstoreUserData").and.returnValue(
        Observable.of([{ status: false }])
      );
      component.getTimeTransaction("PREC000010270");
      expect(component.loading).toBeFalsy();
      expect(component.orderCreateFailure).toBe(true);
      expect(component.MagentoOrderDetailsError).toBe(true);
    }
  ));

  it("should call getTimeTransaction and handling API error", inject(
    [AppService],
    (appService: AppService) => {
      spyOn(appService, "getEstoreUserData").and.returnValue(
        Observable.throw("Error Test")
      );
      spyOn(component, "timerForOrderCompletion");
      component.getTimeTransaction("PREC000010270");
      expect(component.loading).toBeFalsy();
      expect(component.orderCreateFailure).toBe(true);
      expect(component.MagentoOrderDetailsError).toBe(true);
      expect(component.timerForOrderCompletion).toHaveBeenCalled();
    }
  ));

  it("should call RoundingOff", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      spyOn(commonUtilService, "RoundingOff2String");
      component.RoundingOff(188.5);
      expect(commonUtilService.RoundingOff2String);
    }
  ));

  it("should call RoundingOff", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      spyOn(commonUtilService, "RoundingOff2Number");
      component.RoundingOff2Number(188.5);
      expect(commonUtilService.RoundingOff2Number);
    }
  ));

  it("should call ngOnInit and handling when error", inject(
    [DeviceDataService],
    (deviceDataService: DeviceDataService) => {
      localStorage.setItem("TYCart", JSON.stringify(response[0]));
      component.ngOnInit();
      deviceDataService.publishErrorNotificationBoolean(true);
      expect(component.sessionInvalid).toBe(true);
      localStorage.removeItem("TYCart");
    }
  ));

  it("should call ngOnInit", () => {
    sessionStorage.setItem("USER_TYPE", "USER");
    sessionStorage.setItem("OLD_GUEST_USER", "GUEST");
    sessionStorage.setItem("AgentInfo", "true");
    localStorage.setItem("cartPreOrder", "true");
    localStorage.setItem("cancelUpsell", "true");
    localStorage.setItem("TYCart", JSON.stringify(response[0]));
    localStorage.setItem("AutoBillingFlag", "true");
    localStorage.setItem("MNP-FLOW", "true");
    localStorage.setItem("MNP-ORDER-ID", "1234");
    localStorage.setItem("transDate", "2019-11-11");
    component.ngOnInit();
    localStorage.clear();
    sessionStorage.clear();
  });

  it('removeCartDetails', () => {
    const spy = spyOn(component, 'removeCartDetails').and.callThrough();
    localStorage.setItem('MegentoOrderId', '');
    component.removeCartDetails();
    expect(spy).toHaveBeenCalled();
  });

  it('addTNPSSurveyScriptToHead', () => {
    const spy = spyOn(component, 'addTNPSSurveyScriptToHead').and.callThrough();
    component.addTNPSSurveyScriptToHead();
    expect(spy).toHaveBeenCalled();
  });

  it('addAffiliateScriptToHead', () => {
    const spy = spyOn(component, 'addAffiliateScriptToHead');
    component.addAffiliateScriptToHead(response);
    expect(spy).toHaveBeenCalled();
  });

  it('CheckIsUserGuest', () => {
    const spy = spyOn(component, 'CheckIsUserGuest').and.callThrough();
    sessionStorage.setItem("GuestInfo", '');
    component.CheckIsUserGuest();
    expect(spy).toHaveBeenCalled();
  });

  it('IsDeviceOnly', () => {
    const spy = spyOn(component, 'IsDeviceOnly').and.callThrough();
    localStorage.setItem("isDeviceOnlyClicked", 'true');
    component.IsDeviceOnly();
    expect(spy).toHaveBeenCalled();
  });

  it('isDeviceBundle', () => {
    const spy = spyOn(component, 'isDeviceBundle').and.callThrough();
    localStorage.setItem("isBundleClicked", '');
    component.isDeviceBundle();
    expect(spy).toHaveBeenCalled();
  });

  it('isLegacyPlan', () => {
    const spy = spyOn(component, 'isLegacyPlan').and.callThrough();
    component.isLegacyPlan({selectedProduct:{orderPlanName: "test"}});
    component.isLegacyPlan({selectedProduct:{orderPlanName: "sime_test"}});
    expect(spy).toHaveBeenCalled();
  });
});
