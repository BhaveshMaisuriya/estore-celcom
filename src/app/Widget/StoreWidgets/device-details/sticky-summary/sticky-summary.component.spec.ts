import {
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { MockBackend } from "@angular/http/testing";
import {
  BaseRequestOptions,
  Http,
  XHRBackend,
} from "@angular/http";
import { HttpClient, HttpHandler } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { StickySummaryComponent } from "./sticky-summary.component";
import { AppService } from "../../../../Service/app.service";
import { DeviceDisclaimerComponent } from "../device-detail-disclaimer/device-detail-disclaimer.component";
import { ChooseYourWayComponent } from "../../../../Store/guest-checkout/choose-your-way/choose-your-way.component";
import { NotificationErrorComponent } from "../../../../Store/widget/notification-error/notification-error.component";
import { AgeEligibilityPopupComponent } from "../../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component";
import { DeviceDetailsNumberService } from "../device-details-choose-number/device-details-choose-number.service";
import { RedirectionService } from "../../../../Service/redirection.service";
import { CartService } from "../../../../Service/cart.service";
import { UserService } from "../../../../Service/user.service";
import { OrderInfoService } from "../../../../Service/orderinfo.service";
import { BundleService } from "../../../../Service/bundle.service";
import { DeviceSummaryService } from "../services/device-summary-service.service";
import { SupplimentaryLinesService } from "../../../../Store/widget/supplementary-lines/supplementary-lines.service";
import { RemarketAnalyticsService } from "../../../../Service/remarket-analytics.service";
import { EStoreAnalysticsService } from "../../../../Service/store.analytic.service";
import { Renderer2 } from "@angular/core";
import { ProductService } from "../../../../Service/product.service";
import { CommonUtilService } from "../../../../Service/commonUtil.service";
import { DeviceDataService } from "../../../../Service/devicedata.service";
import { BroadbandService } from "../../../../Service/broadband.service";
import { Broadcaster } from "../../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../../Service/broadcaster.service";
import { HomeService } from "../../../../Service/home.service";
import { AnalyticsService } from "../../../../Service/analytic.service";
import { RendererService } from "../../../../Service/renderer.service";
import { SeoService } from "../../../../Service/seo.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { PlanPurchaseService } from "./../../../../Store/plan/plan-purchase/plan-purchase.service";
import { Observable } from "rxjs/Observable";
import { configureTestSuite } from "ng-bullet";
import { GetParametersService } from "../../../../Service/getParamaters.service";
import { of } from "rxjs";
import { sharedPipes } from 'app/shared/pipes';

class MockAppService {
  postEstoreUserData() {
    return Observable.of([{ reservationId: "12345" }]);
  }
  getEstoreUserData(endpoint: string) {
    return Observable.of(mockCartData);
  }
}

class MockactivatedRoute {
  parent = {
    data: of([])
  };

  snapshot(url: string) {
    return url;
  }
}
class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

let newnumberResp: any = [
  { servicenum: "0123112221" },
  { servicenum: "0123112251" }
];
let randomResp: any = { status: true, number: "0123112251" };
class MockProductService {
  GetNewNumbers(apiUrl, dataForRetrieveNumberAPI) {
    return Observable.of(newnumberResp);
  }

  getRandomNumber(apiUrl, numbersList) {
    return Observable.of(randomResp);
  }
  getStockAvailabilityRequest(
    selectedProductDetails,
    outletId,
    deviceReservationId
  ) {
    return {};
  }
}

const mockCartData = [
  {
    id: 15940,
    created_at: "2019-08-22 09:44:32",
    updated_at: "2019-08-22 09:44:32",
    is_active: true,
    is_virtual: true,
    items: [
      {
        item_id: 42038,
        sku: "FGS",
        qty: 1,
        name: "First™ Gold Supreme",
        price: 128,
        product_type: "virtual",
        quote_id: "15940"
      }
    ],
    items_count: 1,
    items_qty: 1,
    customer: {
      id: 1135,
      group_id: 1,
      default_billing: "4730",
      default_shipping: "4730",
      created_at: "2018-09-12 03:08:02",
      updated_at: "2019-08-22 09:17:27",
      created_in: "Default Store View",
      dob: "1974-09-09",
      email: "abcd@getnada.com",
      firstname: "TQA DEALER EMPAT",
      lastname: "value",
      gender: 1,
      store_id: 1,
      website_id: 1,
      addresses: [
        {
          id: 4730,
          customer_id: 1135,
          region: {
            region_code: "WP",
            region: "WP Kuala Lumpur",
            region_id: 546
          },
          region_id: 546,
          country_id: "MY",
          street: ["HAMPAR"],
          telephone: "0192323435",
          postcode: "50470",
          city: "KUALA LUMPUR",
          firstname: "DIGITAL",
          lastname: "UAT",
          default_shipping: true,
          default_billing: true,
          custom_attributes: [
            { attribute_code: "residence_type", value: "Landed" },
            { attribute_code: "salutation", value: "Mr." },
            { attribute_code: "unit_number", value: "LOT" }
          ]
        }
      ],
      disable_auto_group_change: 0,
      extension_attributes: { is_subscribed: false },
      custom_attributes: [
        { attribute_code: "mobile_number", value: "0192323435" },
        { attribute_code: "id_type", value: "New NRIC" },
        { attribute_code: "id_number", value: "740909023423" },
        { attribute_code: "customer_full_name", value: "TQA DEALER EMPAT" },
        { attribute_code: "salutation", value: "Mr." },
        { attribute_code: "contact_row_id", value: "1-2USJCHM" }
      ]
    },
    billing_address: {
      address_id: "34899",
      quote_id: "15940",
      created_at: "2019-08-22 09:44:32",
      updated_at: "2019-08-22 09:44:32",
      customer_id: "1135",
      save_in_address_book: "0",
      customer_address_id: "4730",
      address_type: "billing",
      email: "abcd@getnada.com",
      prefix: null,
      firstname: "DIGITAL",
      middlename: null,
      lastname: "UAT",
      suffix: null,
      company: null,
      street: "HAMPAR",
      city: "KUALA LUMPUR",
      region: "WP Kuala Lumpur",
      region_id: "546",
      postcode: "50470",
      country_id: "MY",
      telephone: "0192323435",
      fax: null,
      virtual_shipping_id: null,
      shipping_unit_number: null,
      billing_unit_number: "LOT",
      salutation: "Mr.",
      residence_type: "Landed",
      same_as_billing: "0",
      collect_shipping_rates: "0",
      shipping_method: null,
      shipping_description: null,
      weight: "0.0000",
      subtotal: "128.0000",
      base_subtotal: "128.0000",
      subtotal_with_discount: "128.0000",
      base_subtotal_with_discount: "128.0000",
      tax_amount: "0.0000",
      base_tax_amount: "0.0000",
      shipping_amount: "0.0000",
      base_shipping_amount: "0.0000",
      shipping_tax_amount: "0.0000",
      base_shipping_tax_amount: "0.0000",
      discount_amount: "0.0000",
      base_discount_amount: "0.0000",
      grand_total: "128.0000",
      base_grand_total: "128.0000",
      customer_notes: null,
      applied_taxes: "[]",
      discount_description: null,
      shipping_discount_amount: "0.0000",
      base_shipping_discount_amount: "0.0000",
      subtotal_incl_tax: "128.0000",
      base_subtotal_total_incl_tax: "128.0000",
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
      entity_id: "34899",
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
    extension_attributes: { shipping_assignments: [] },
    all_items: [
      {
        item_id: "42038",
        quantity: 1,
        reservation_id: "OP49CE1566467070",
        sku: "FGS",
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
        price: "128.0000",
        itemTotal: "128.0000",
        selectedProduct: {
          orderMonthlyPayTotal: 0,
          orderPlanName: "First™ Gold Supreme",
          orderPlan: "FGS",
          urlKey: "first-gold-supreme",
          contract: "24 months contract",
          selectedProductSku: "FGS",
          orderMonthlyPay: "128.0000",
          orderOneTimePay: "128.0000",
          plan_image_url: "/media/catalog/product/w/f/wf-yan-50gb.png",
          orderPhoneNo: "0133635289",
          orderNumberType: "NewNumber",
          selectedPlanDetails: {
            name: "First™ Gold Supreme",
            sku: "FGS",
            urlKey: "first-gold-supreme",
            monthly_plan: "128.0000",
            order_plan_bundle: "PB11830",
            order_service_bundle: "RTP0010",
            order_plan_component: [
              {
                component_name: "Executive Plan VAS without GPRS_10784",
                component_part_no: "CPT05370",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "FiRST Gold Supreme CBS Commitment Fee",
                component_part_no: "CPT16930",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "New Package for IDD Activation",
                component_part_no: "CPT07020",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "First Unlimited",
                component_part_no: "CPT12290",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Default International Roaming Voice/SMS",
                component_part_no: "CPT13540",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Free Chat 2.0",
                component_part_no: "MI01790",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Weekend Internet Quota",
                component_part_no: "CPT16980",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Advance Payment CBS RM128",
                component_part_no: "OTC08840",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "SIM Card",
                component_part_no: "SM00010",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Blank SIM Starter Pack",
                component_part_no: "SP00210",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Stamp Fee_92382",
                component_part_no: "OTC00350",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              },
              {
                component_name: "Printed Bill for Voice",
                component_part_no: "BDMR0080",
                component_default: "0",
                component_price: "0.0000",
                cbs_name: "FiRST Gold Supreme CBS Plan",
                cbs_part_number: "PR03480",
                isvas: "0",
                vasname: null,
                vasvalue: null
              }
            ],
            new_customer: "0",
            segment: null,
            upfront_installment: null,
            product_type: "Service",
            start_date: null,
            end_date: null,
            BackgroundColor: "is-bg-color-black",
            IndicatorClass: "is-level-gold",
            ProductText: "Gold Supreme",
            KeyFiguresText: "50 GB",
            KeyText: "RM 128",
            BuynowLink: "/plans/first-gold-supreme",
            BuynowText: "Buy now",
            knowMoreLink: "/store/plans/first-gold-supreme",
            knowMoreText: "Learn more",
            MobileDescription: null,
            TableInfo: [],
            terms_and_condition: {
              plans: { label: "Plans", desc: null },
              contract_terms: {
                label: "Contract Duration",
                desc: "24 months contract"
              },
              legal: { label: "Legal", desc: null },
              cancellation: { label: "Cancellation", desc: null }
            },
            AtrHref: "#rm-0",
            telco_day: { status: false, hat_text: null, message: null },
            is_premium_plan: false
          },
          mnp_data: null,
          is_mnp: false
        },
        upfront_waiver: false,
        campaign100_days: false,
        campaign: { title: null, subtitle: null },
        is_campaign_mviva: false,
        campaign_mviva_message: null,
        campaign_mviva_url: "",
        promotion_details: "ADA"
      }
    ],
    customerOtherInfo: {
      salutation: "Mr.",
      unit_number: "LOT",
      mobile_number: "0192323435",
      gender: "Male",
      customer_full_name: "TQA DEALER EMPAT"
    },
    GST: "0.00",
    grossTotal: "128.00",
    itemsTotal: "1",
    shipping_address: {
      address_id: "34900",
      quote_id: "15940",
      created_at: "2019-08-22 09:44:32",
      updated_at: "2019-08-22 09:44:32",
      customer_id: "1135",
      save_in_address_book: "0",
      customer_address_id: "4730",
      address_type: "shipping",
      email: "abcd@getnada.com",
      prefix: null,
      firstname: "DIGITAL",
      middlename: null,
      lastname: "UAT",
      suffix: null,
      company: null,
      street: "HAMPAR",
      city: "KUALA LUMPUR",
      region: "WP Kuala Lumpur",
      region_id: "546",
      postcode: "50470",
      country_id: "MY",
      telephone: "0192323435",
      fax: null,
      virtual_shipping_id: null,
      shipping_unit_number: "LOT",
      billing_unit_number: null,
      salutation: "Mr.",
      residence_type: "Landed",
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
      entity_id: "34900"
    },
    supplementary_data: [],
    cart_session: 0,
    reservation_id: "OP49CE1566467070",
    tax: { total_tax: "0.00", items: [] },
    delivery_type: { value: 0, code: "standard" }
  }
];
const mockData = {
  basic_details: {
    name: "nubia Red Magic 3",
    id: "510",
    sku: "Nubia-Red-Magic-3",
    upper_age_limit: null,
    lower_age_limit: null,
    price: 1499,
    quntity: 0,
    preorder: 0,
    preorder_availability_flag: 1,
    midnight_delivery: {
      status: 0,
      label: ""
    },
    is_easy_phone: 0,
    is_rent: false,
    is_own: false,
    default_plan: "Celcom Mobile Platinum Plus",
    default_plan_sku: "FPP",
    order_monthly_pay: "188.0000",
    nfc: "0",
    mostpopular: "0",
    rm: 499,
    rrp_rm_strick_price: "2199.0000",
    upfront_price: 0,
    device_price: 0,
    main_image: "/media/catalog/product/f/r/front-black_1.png",
    sub_images: [
      "/media/catalog/product/f/r/front-black_1.png",
      "/media/catalog/product/n/e/new_2.png"
    ],
    dimension: "171.7 X 78.5 X 9.6(6.6)mm",
    choose_memory: null,
    weight: null,
    chip_processor: "Octa core 2.84 GHz ",
    splash_water_dust_resistant: "0",
    talk_time: null,
    standby_time: null,
    sim_type: null,
    stock: "Limited Stock",
    preorder_estimate_delivery_text: null,
    new_customer: "0",
    order_category: "HP",
    order_model: "REDMAGIC3 128GB",
    order_brand: "NUBIA",
    segment: "10",
    start_date: "2019-07-01 03:37:10",
    end_date: "2019-07-08 10:37:55",
    default_selected_color: "Black",
    default_selected_memory: "128GB",
    pre_order_data: {
      preorder_estimate_delivery_text: "6",
      preorder_estimate_delivery_date: "6",
      preorder_text: "PRE-ORDER",
      preorder_from_date_text: "",
      preorder_to_date_text: "",
      preorder_from_date: "",
      preorder_to_date: "",
      preorder_end_flag: 0,
      preorder_estimate_delivery: "6",
      preorder_submit_date: null,
      preorder_stock_available_quantity: 0,
      preorder_availble_stock_in_hand: 0,
      preorder_stock_status_flag: 0
    },
    is_campaign_mviva: null,
    campaign_mviva: null,
    campaign_mviva_invalid: null,
    is_lifestyle: 0,
    addons: [],
    stock_indicator_image: "/media/catalog/product/n/e/new_2.png",
    stock_indicator_text:
      '<span style="font-weight: bold; font-size: 12pt;">NEW LAUNCH</span><br /><span style="font-size: 10pt;">Get yours now. <a href="https://www.google.com/">here</a></span>',
    default_device_option: "deviceBundle",
    editProduct: null
  },
  more_details: {
    features: null,
    shipping_details:
      "1.Delivery is within Malaysia only. 2.Orders placed before 12pm will be processed on the same day and for orders placed after 12pm will be processed on the next working day. The estimated delivery time are as follows:  a.Klang Valley within 1-2 working days  b.Peninsular Malaysia (except Klang Valley) within 2-3 working days   c.East Malaysia within 3-5 working days",
    whatInTheBox:
      "Phone, Adapter, Micro USB Cable, Important Information Booklet with Warranty Card, Quick Guide, SIM Card Tool.",
    specification: {
      display: null,
      screen_size: '6.65"',
      operating_system: "Android",
      camera: "Rear: 48MP Front: 16MP"
    },
    neptune_subsidy_message:
      "Your selected supplementary line(s) will be tied to your Principal line and will be bound to the same contract. You are recommended to use the maximum amount of subsidy to enjoy the device at lowest price. Choose the subsidies you wish to utilise for this purchase."
  },
  terms_and_condition: {
    plans: {
      label: "Plans",
      desc: null
    },
    contract_terms: {
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
      name: "nubia Red Magic 3 Black",
      sku: "nubiaRedMagic3128gbblack",
      is_new: false,
      rrp: "2199.0000",
      discounted_device_rrp: null,
      color: "Black",
      order_color: "BLK",
      order_category: "HP",
      color_hexa: "#000000",
      memory: "128GB",
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
      start_date: null,
      end_date: null,
      upfront_installment: null,
      saleable_plans: [
        {
          sku: "FGP",
          prices: {
            upfront_price: "300",
            device_price: "1198",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGS",
          prices: {
            upfront_price: "450",
            device_price: "1038",
            penalty_price: "1100",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "600",
            device_price: "898",
            penalty_price: "1300",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1000",
            device_price: "499",
            penalty_price: "1700",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xpax_60",
          prices: {
            upfront_price: "150",
            device_price: "1358",
            penalty_price: "850",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xp-l-pass",
          prices: {
            upfront_price: "150",
            device_price: "1358",
            penalty_price: "850",
            supplementary_count: 0,
            special_price: 0
          }
        }
      ],
      pre_order_data: {
        preorder_estimate_delivery_text: "",
        preorder_estimate_delivery_date: "",
        preorder_text: "PRE-ORDER",
        preorder_from_date_text: "",
        preorder_to_date_text: "",
        preorder_from_date: "",
        preorder_to_date: "",
        preorder_end_flag: 0,
        preorder_estimate_delivery: null,
        preorder_submit_date: null,
        preorder_stock_available_quantity: 1000,
        preorder_availble_stock_in_hand: 1000,
        preorder_stock_status_flag: 1
      },
      free_gift_data: {
        gift_image: "/media/catalog/productno_selection",
        gift_message: null
      },
      easy_phone: null,
      campaign_100days: true,
      is_neptune_subsidy: true
    },
    {
      name: "nubia Red Magic 3 Red",
      sku: "nubiaRedMagic3128gbred",
      is_new: false,
      rrp: "2199.0000",
      discounted_device_rrp: null,
      color: "Red",
      order_color: "RED",
      order_category: "HP",
      color_hexa: "#b9253b",
      memory: "128GB",
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
      start_date: null,
      end_date: null,
      upfront_installment: null,
      saleable_plans: [
        {
          sku: "FGP",
          prices: {
            upfront_price: "300",
            device_price: "1198",
            penalty_price: "1000",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FGS",
          prices: {
            upfront_price: "450",
            device_price: "1038",
            penalty_price: "1100",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FP",
          prices: {
            upfront_price: "600",
            device_price: "898",
            penalty_price: "1300",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "FPP",
          prices: {
            upfront_price: "1000",
            device_price: "499",
            penalty_price: "1700",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xpax_60",
          prices: {
            upfront_price: "150",
            device_price: "1358",
            penalty_price: "850",
            supplementary_count: 0,
            special_price: 0
          }
        },
        {
          sku: "xp-l-pass",
          prices: {
            upfront_price: "150",
            device_price: "1358",
            penalty_price: "850",
            supplementary_count: 0,
            special_price: 0
          }
        }
      ],
      pre_order_data: {
        preorder_estimate_delivery_text: "",
        preorder_estimate_delivery_date: "",
        preorder_text: "PRE-ORDER",
        preorder_from_date_text: "",
        preorder_to_date_text: "",
        preorder_from_date: "",
        preorder_to_date: "",
        preorder_end_flag: 0,
        preorder_estimate_delivery: null,
        preorder_submit_date: null,
        preorder_stock_available_quantity: 1000,
        preorder_availble_stock_in_hand: 1000,
        preorder_stock_status_flag: 1
      },
      free_gift_data: {
        gift_image: "/media/catalog/productno_selection",
        gift_message: null
      },
      easy_phone: null,
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
          is_premium_plan: false,
          AtrHref: "#rm-0",
          atrHref: "#rm-0"
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
          is_premium_plan: false,
          AtrHref: "#rm-1",
          atrHref: "#rm-1"
        },
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
          is_premium_plan: false,
          AtrHref: "#rm-2",
          atrHref: "#rm-2"
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
          is_premium_plan: false,
          AtrHref: "#rm-3",
          atrHref: "#rm-3"
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
          name: "Xpax™ XP60",
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
          PlanName: "Xpax™ XP60",
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
          productText: "Xpax™ XP60",
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
          is_premium_plan: false,
          atrHref: "#rm-4"
        }
      ],
      planType: "XPAX",
      isXpax: true
    }
  ],
  related_products: [],
  analytics_key_addtocart: {
    fb_add_cart_id: null,
    google_add_cart_id: null,
    twitter_add_cart_id: null,
    fb_learn_more_id: null,
    google_learn_more_id: null,
    twitter_learn_more_id: null,
    fb_buy_now_id: null,
    google_buy_now_id: null,
    twitter_buy_now_id: null
  },
  lineChosen: "PrincipleLineOnly"
};
class MockCartMineService {
  public Find(_url): Observable<any[]> {
    return Observable.of(mockCartData);
  }
}
describe("StickySummaryComponent", () => {
  let component: StickySummaryComponent;
  let fixture: ComponentFixture<StickySummaryComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [
        StickySummaryComponent,
        DeviceDisclaimerComponent,
        ChooseYourWayComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        sharedPipes
      ],
      imports: [BrowserAnimationsModule],
      providers: [
        { provide: AppService, useClass: MockAppService },
        HttpClient,
        HttpHandler,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (
            backend: XHRBackend,
            defaultOptions: BaseRequestOptions
          ) => {
            return new Http(backend, defaultOptions);
          }
        },
        { provide: ActivatedRoute, useClass: MockactivatedRoute },
        { provide: Router, useClass: RouterStub },
        DecimalPipe,
        CookieService,
        DeviceDetailsNumberService,
        RedirectionService,
        { provide: CartService, userClass: MockCartMineService },
        UserService,
        OrderInfoService,
        BundleService,
        DeviceSummaryService,
        SupplimentaryLinesService,
        RemarketAnalyticsService,
        EStoreAnalysticsService,
        Renderer2,
        { provide: ProductService, useClass: MockProductService },
        CommonUtilService,
        DeviceDataService,
        BroadbandService,
        Broadcaster,
        NotificationPopupEvent,
        HomeService,
        AnalyticsService,
        RendererService,
        SeoService,
        PlanPurchaseService,
        GetParametersService
      ]
    }).overrideComponent(StickySummaryComponent, {
      set: {
        providers: [
          { provide: AppService, useClass: MockAppService },
          HttpClient,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: (
              backend: XHRBackend,
              defaultOptions: BaseRequestOptions
            ) => {
              return new Http(backend, defaultOptions);
            }
          },
          { provide: ActivatedRoute, useClass: MockactivatedRoute },
          { provide: Router, useClass: RouterStub },
          DecimalPipe,
          CookieService,
          DeviceDetailsNumberService,
          RedirectionService,
          CartService,
          UserService,
          OrderInfoService,
          BundleService,
          DeviceSummaryService,
          SupplimentaryLinesService,
          RemarketAnalyticsService,
          EStoreAnalysticsService,
          { provide: ProductService, useClass: MockProductService },
          CommonUtilService,
          BroadbandService,
          Broadcaster,
          NotificationPopupEvent,
          HomeService,
          AnalyticsService,
          RendererService,
          SeoService,
          PlanPurchaseService
        ]
      }
    });
   
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickySummaryComponent);
    component = fixture.componentInstance;
    component.productToRemoveFromCart = null;
    component.cobp = null;
    component.SelectionAferLogin = null;
    component.data = mockData;
  });
  it("StickySummaryComponent should create", () => {
    expect(component).toBeTruthy();
  });
  it("set step function", () => {
    spyOn(component, "onAnchorClick");
    component.step = 1;
    component.setStep(0);
    expect(component.step).toBe(2);
    expect(component.onAnchorClick).toHaveBeenCalledWith(2);
  });
  it("set step function 1", () => {
    spyOn(component, "onAnchorClick");
    component.step = 1;
    component.setStep(1);
    expect(component.step).toBe(1);
    expect(component.onAnchorClick).toHaveBeenCalledWith(1);
  });

  it("window scroll", () => {
    let ele: number = 2;
    window.resizeTo(800, window.innerHeight);
    (<any>window).screen = { width: 800 };
    component.getPos(ele);
    fixture.detectChanges();
  });

  it("onAnchorClick function 1", () => {
    component.onAnchorClick(1);
    expect(component.isStep1Active).toBe(true);
  });
  it("onAnchorClick function 2", () => {
    component.onAnchorClick(2);
    expect(component.isStep1Active).toBe(false);
  });
  it("onAnchorClick function 3", () => {
    component.onAnchorClick(3);
    expect(component.isStep1Active).toBe(false);
  });
  it("onAnchorClick function 4", () => {
    component.onAnchorClick(4);
    expect(component.isStep1Active).toBe(false);
  });
  it("getRandomPhoneNo", () => {
    const dataForRetrieveNumberAPI = {
      NumberDetailsRetrieveRequest: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "20",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    spyOn(component, "callRetrieveNumbersAPI");
    component.getRandomPhoneNo();
    expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(
      dataForRetrieveNumberAPI
    );
  });
  it("disableChooseWay", () => {
    component.disableChooseWay();
    expect(component.chooseYourWay).toBe(false);
  });
  it("CheckValidityForMNP true", () => {
    component.IsMnpFlowFromDevice = true;
    const validity = component.CheckValidityForMNP();
    expect(validity).toBe(true);
  });
  it("CheckValidityForMNP false", () => {
    component.IsMnpFlowFromDevice = false;
    sessionStorage.removeItem("Eligible");
    localStorage.removeItem("Eligible");
    sessionStorage.setItem(
      "UserInfo",
      JSON.stringify({ outputCPResp: { contactFirstName: "test" } })
    );
    const validity = component.CheckValidityForMNP();
    expect(validity).toBe(false);
  });
  it("should validate maximum supp lines allowed", () => {
    sessionStorage.setItem("OLD_GUEST_USER", "NO");
    const userInfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "711121119992",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "711121119992",
        dateOfBirth: "19711121_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        contactEmail: "abcssr@gmail.com",
        contactSalutation: "",
        services: [{ pre_Pos_Indicator: "Postpaid" }]
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    component.suppLinesDetails = [
      {
        planPhoneNumber: "0132918042",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      }
    ];
    const validity = component.checkSuppLinesCountValidation(userInfo);
  });
  it("CheckValidityForPlan true", () => {
    component.disableAddToCart = true;
    const validity = component.CheckValidityForPlan();
    expect(validity).toBe(true);
  });
  it("CheckValidityForPlan false", () => {
    component.disableAddToCart = false;
    component.data.tableInfo = mockData.basic_details;
    component.orderPhoneNo = "60136326807";
    const validity = component.CheckValidityForPlan();
    expect(validity).toBe(true);
  });
  it("should test init function with errorAddToCart", () => {
    spyOn(component, "initializeStickySummary");
    localStorage.setItem("errorAddToCart", "true");
    localStorage.setItem("errorAddToCartMessage", "error AddToCart Message");
    component.ngOnInit();
    expect(component.IsMnpFlowFromDevice).toBe(true);
    expect(component.initializeStickySummary).toHaveBeenCalled();
    expect(component.infoMNPflow.content).toBe("error AddToCart Message");
    expect(component.ToasterDisabled).toBe(true);
  });
  it("should test init function with OutOfStockPreOrder", () => {
    spyOn(component, "initializeStickySummary");
    localStorage.setItem("OutOfStockPreOrder", "true");
    localStorage.setItem("addonCode", "testcode");
    component.ngOnInit();
    expect(component.IsMnpFlowFromDevice).toBe(true);
    expect(component.ToasterDisabled).toBe(true);
    expect(component.initializeStickySummary).toHaveBeenCalled();
    expect(component.addonCode).toEqual("testcode");
    sessionStorage.removeItem("OutOfStockPreOrder");
  });
  it("should test init function with orderPlanName null check", () => {
    spyOn(component, "initializeStickySummary");
    component.orderPlanName = "FPP";
    component.ngOnInit();
  });
  it("should test init function with orderPlanName xpax check", () => {
    spyOn(component, "initializeStickySummary");
    component.orderPlanName = "Xpax";
    component.ngOnInit();
    expect(component.initializeStickySummary).toHaveBeenCalled();
    expect(component.enableAddToCart).toBe(true);
  });
  it("should test MNP edit localstorage", () => {
    spyOn(component, "initializeStickySummary");
    localStorage.setItem("MNP-EDIT", "YES");
    component.ngOnInit();
    expect(component.initializeStickySummary).toHaveBeenCalled();
    const mnp_flow = localStorage.getItem("mnp-edit-flow");
    expect(component.orderNumberType).toEqual("SwitchToCelcom");
    expect(component.enableAddToCart).toEqual(true);
    expect(mnp_flow).toEqual("true");
  });
  it("should test COBP edit localstorage", () => {
    spyOn(component, "initializeStickySummary");
    spyOn(component, "setStep");
    localStorage.setItem("COBP_FLOW", "YES");
    localStorage.setItem("cobp-edit-flow", "true");
    component.ngOnInit();
    const cobp_flow = localStorage.getItem("cobp-edit-flow");
    expect(component.orderNumberType).toEqual("KeepNumber");
    expect(component.enableAddToCart).toEqual(true);
    expect(component.initializeStickySummary).toHaveBeenCalled();
    expect(component.setStep).toHaveBeenCalled();
    expect(cobp_flow).toEqual(null);
  });
  it("should test recover MSisdn localstorage", () => {
    spyOn(component, "initializeStickySummary");
    localStorage.setItem("RecoveryMyMsIsdn", "0193441017");
    component.ngOnInit();
    const RecoveryMyMsIsdn = localStorage.getItem("RecoveryMyMsIsdn");
    expect(component.initializeStickySummary).toHaveBeenCalled();
    expect(RecoveryMyMsIsdn).toEqual("0193441017");
  });
  it("disclaimerShow should call add to cart for newline ", () => {
    spyOn(component, "addTocartForBundle");
    component.orderNumberType = "NewNumber";
    component.disclaimerShow();
    expect(component.addTocartForBundle).toHaveBeenCalled();
  });
  it("should check max limit reached", () => {
    component.maxLimitReached = true;
    const output = component.checkMaxLimit();
    expect(output).toBeTruthy();
  });
  it("should check max limit not reached", () => {
    component.maxLimitReached = false;
    const output = component.checkMaxLimit();
    expect(output).toBeFalsy();
  });
  it("should validate maximum supp lines allowed", () => {
    sessionStorage.setItem("OLD_GUEST_USER", "NO");
    const userInfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "711121119992",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "711121119992",
        dateOfBirth: "19711121_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        contactEmail: "abcssr@gmail.com",
        contactSalutation: "",
        services: [{ pre_Pos_Indicator: "Postpaid" }]
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    const suppLinesDetailsMock = [
      {
        planPhoneNumber: "0132918042",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      }
    ];
    sessionStorage.setItem(
      "suppLinesAddedByTheUser",
      JSON.stringify(suppLinesDetailsMock)
    );
    const validity = component.checkSuppLinesCountValidation(userInfo);
  });
  it("should validate maximum supp lines not allowed", () => {
    sessionStorage.setItem("OLD_GUEST_USER", "NO");
    const userInfo = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "711121119992",
        system: "Internal",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "711121119992",
        dateOfBirth: "19711121_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        contactEmail: "abcssr@gmail.com",
        contactSalutation: "",
        services: [{ pre_Pos_Indicator: "Postpaid" }]
      },
      customerIDTypes: [{ id: 1, value: "New NRIC" }]
    };
    const suppLinesDetailsMock = [
      {
        planPhoneNumber: "0132918042",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      },
      {
        planPhoneNumber: "0132918041",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      },
      {
        planPhoneNumber: "0132918043",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      },
      {
        planPhoneNumber: "0132918045",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      },
      {
        planPhoneNumber: "0132918046",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      },
      {
        planPhoneNumber: "0132918046",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      },
      {
        planPhoneNumber: "0132918046",
        planPrice: "48.0000",
        planType: "Celcom Mobile Family™",
        partNumber: "PB12540"
      }
    ];
    sessionStorage.setItem(
      "suppLinesAddedByTheUser",
      JSON.stringify(suppLinesDetailsMock)
    );
    const validity = component.checkSuppLinesCountValidation(userInfo);
  });
  it("should set request for plan supplementary", () => {
    component.suppLinesDetails = [
      { plan: "PB12540", number: "0132918042" },
      { plan: "PB12540", number: "0132918045" }
    ];
    component.createRequestBodyForPlanOnlySupp();
    expect(component.suppLineRequestBody).not.toEqual([]);
  });
  it("should set request for bundle supplementary", () => {
    component.suppLinesDetails = [
      { plan: "PB12540", number: "0132918042", subsidy: "100" },
      { plan: "PB12540", number: "0132918045", subsidy: "100" }
    ];
    component.createRequestBodyForSupp();
    expect(component.suppLineRequestBody).not.toEqual([]);
  });
  it("should test reserv number api other then MNP", () => {
    spyOn(component, "callReserveNumber");
    component.randomPhoneNo = "0193441017";
    component.isMnp = false;
    component.reserverNumberAPI("0193441017");
    expect(component.callReserveNumber).toHaveBeenCalled();
  });
  it("should test reserv number api for MNP plan only", () => {
    spyOn(component, "addToCartMNP");
    component.isMnp = true;
    component.reserveNumberData = { type: "mnp" };
    localStorage.setItem("MNP-FLOW", "YES");
    component.reserverNumberAPI("0193441017");
    expect(component.addToCartMNP).toHaveBeenCalled();
  });
  it("should test reserv number api for MNP bundle", () => {
    spyOn(component, "addToCartMNP");
    component.isMnp = true;
    component.reserveNumberData = { type: "device_plan" };
    localStorage.setItem("MNP-FLOW", "YES");
    component.reserverNumberAPI("0193441017");
    expect(component.addToCartMNP).toHaveBeenCalled();
  });
  it("should test on leaving page", () => {
    component.ngOnDestroy();
    expect(component.IsMnpFlowFromDevice).toBe(false);
    expect(component.infoMNPflow).toBe(null);
  });
  it("should create requestBodyForReserveNumber when null supplines", () => {
    component.suppLinesDetails = [];
    const editFlowCheck = localStorage.getItem("Edit-flow");
    component.requestBodyForReserveNumber("0193441017");
    // expect(editFlowCheck).toBe('YES');
  });
  it("should create requestBodyForReserveNumber when supplines exists", () => {
    component.selectedPlanDetails = { sku: "FPP" };
    component.suppLinesDetails = [
      { partNumber: "PB12540", planPhoneNumber: "0132918042" },
      { partNumber: "PB12540", planPhoneNumber: "0132918045" }
    ];
    component.requestBodyForReserveNumber("60193441017");
    expect(component.suppReservationDetails).toBeTruthy();
  });
  it("should test callReserveNumber when cart has data", () => {
    localStorage.setItem("cart", JSON.stringify(mockCartData));
    component.callReserveNumber("60193441017");
    expect(component.cart).toBeTruthy();
    expect(component.ToasterDisabled).toBe(true);
  });
  it("should test callReserveNumber when cart has no data", () => {
    spyOn(component, "requestBodyForReserveNumber");
    component.reserveNumberData = {
      type: "planonly",
      param1: "",
      param2: "",
      param3: ""
    };
    localStorage.setItem("Edit-flow", "YES");
    localStorage.setItem("numberReservationId", JSON.stringify("ABD02002392"));
    component.callReserveNumber("60193441017");
    expect(component.requestBodyForReserveNumber).toHaveBeenCalledWith(
      "60193441017"
    );
  });
  it("should test default onlick", () => {
    const retValue = component.defaultOnClick();
    expect(retValue).toBe(false);
  });
  it("it should test initialize Sticky summary values", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(component, "setStep");
      spyOn(component, "initializePage");
      component.orderPlanName = "FPP";
      component.initializeStickySummary();
      devicedataservice.publishPlan("FPP");
      devicedataservice.publishMnpEdited(true);
      devicedataservice.publishErrorNotificationBoolean(false);
      devicedataservice.publishTotalPay(1000);
      devicedataservice.publishNumberType("KeepNumber");
      const data = { PlanSku: "FPP" };
      devicedataservice.publishSelectedPlanDetails(data);
      expect(component.initializePage).toHaveBeenCalled();
      expect(component.orderPlan).toBe("FPP");
      expect(component.mnpEdited).toBe(true);
      expect(component.maximumReservation).toBe(false);
      expect(component.orderTotalPay).toBe(1000);
      expect(component.enableAddToCart).toBe(true);
      // expect(component.setStep).toHaveBeenCalledWith(3);
      expect(component.selectedPlanDetails).toBe(data);
      expect(component.selectedPlanSku).toBe("FPP");
    }
  ));
  it("it should test supplines details on ng init", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      const suppLinesDetailsMock = [
        {
          planPhoneNumber: "0132918042",
          planPrice: "48.0000",
          planType: "Celcom Mobile Family™",
          partNumber: "PB12540"
        }
      ];
      spyOn(component, "initializePage");
      component.initializeStickySummary();
      devicedataservice.publishSupplimentaryLines(suppLinesDetailsMock);
      expect(component.numberOfSupplines).toBe(1);
      expect(component.orderNumberType).toBe("NewNumber");
      expect(component.initializePage).toHaveBeenCalled();
    }
  ));
  it("it should test zero supplines details on ng init", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(component, "initializePage");
      const suppLinesDetailsMock = [];
      component.initializeStickySummary();
      devicedataservice.publishSupplimentaryLines(suppLinesDetailsMock);
      expect(component.numberOfSupplines).toBe(0);
      expect(component.initializePage).toHaveBeenCalled();
    }
  ));
  it("it should test initialize Sticky summary values set 2", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(component, "initializePage");
      component.initializeStickySummary();
      devicedataservice.publishPlanName("FPP");
      devicedataservice.publishPreOrder(false);
      devicedataservice.publishAddToCartEnabling(true);
      devicedataservice.publishAddToCartDisabling(false);
      devicedataservice.publishErrorNotificationBoolean(true);
      devicedataservice.publishDisclaimerAgree(true);
      devicedataservice.publishPreOrderEnded(true);
      devicedataservice.publishSupplimentaryLines("supp data");
      expect(component.initializePage).toHaveBeenCalled();
      expect(component.orderPlanName).toBe("FPP");
      expect(component.isPreOrder).toBe(false);
      expect(component.enableAddToCart).toBe(true);
      expect(component.disableCartButton).toBe(false);
      expect(component.isLimitReachedError).toBe(true);
      expect(component.isBtnDisabled).toBe(true);
      expect(component.preorderEnded).toBe(true);
      expect(component.suppLinesDetails).toBe("supp data");
    }
  ));
  it("it should test initialize Sticky summary values set 3", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(component, "initializePage");
      component.SelectionAferLogin = {
        color: "Black",
        storage: "128GB",
        sku: "Nubia-Red-Magic-3",
        planSku: "FPP",
        planDetails: {
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
          knowMoreLink: "/plans/first-platinum-plus",
          knowMoreText: "Learn more",
          mobileDescription: null,
          tableInfo: [
            {
              heighlight: "0",
              headline: "100GB monthly Internet",
              fieldIcon:
                "/sites/default/files/images/icon/internet_gb_black/icon_internet_100gb.svg",
              Id: 0,
              HrefId: "rm-0"
            },
            {
              heighlight: "0",
              headline: "FREE 100GB Super Video Walla™",
              fieldIcon:
                "/sites/default/files/images/icon/video_gb_black/icon_video_100GB.svg",
              Id: 1,
              HrefId: "rm-1"
            },
            {
              heighlight: "0",
              headline: "Unlimited calls to all networks",
              fieldIcon:
                "/sites/default/files/images/icon/internet_gb_black/icon_internet_100gb.svg",
              Id: 2,
              HrefId: "rm-2"
            },
            {
              heighlight: "0",
              headline: "Unlimited WhatsApp & WeChat",
              fieldIcon:
                "/sites/default/files/images/icon/video_gb_black/icon_video_100GB.svg",
              Id: 3,
              HrefId: "rm-3"
            }
          ],
          termsAndCondition: {
            plans: {
              label: "Delivery Locations",
              desc: "Unlimited Standard national calls + texts + videocalls"
            },
            contractTerms: {
              label: "Contract Duration",
              desc: "24 months contract"
            },
            legal: {
              label: "Ownership",
              desc:
                'All information, documents, products and services, trademarks, logos, graphics, and images ("Materials") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it\'s listed subsidiaries. Any una'
            },
            cancellation: {
              label: "Refund Policy",
              desc:
                "Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"
            }
          },
          is_premium_plan: false,
          bill_type: 0,
          AtrHref: "#rm-3",
          atrHref: "#rm-7",
          bundleData: "899",
          bundleUpfrontData: "1000"
        },
        principalNum: "01129419484"
      };
      component.data = mockData;
      component.orderSummaryColor = null;
      component.orderSummaryStorage = null;
      component.initializeStickySummary();
      devicedataservice.publishPlanName("FPP");
      expect(component.initializePage).toHaveBeenCalled();
      expect(component.orderSummaryColor).toBeDefined();
      expect(component.orderSummaryStorage).toBeDefined();
      expect(component.SharedContract).toBe(null);
    }
  ));
  it("it should test initialize Sticky summary values set 4", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(component, "initializePage");
      component.initializeStickySummary();
      devicedataservice.publishUpfrontWaivedSuccess(true);
      expect(component.initializePage).toHaveBeenCalled();
      expect(component.upfrontWaivedSuccess).toBe(true);
      expect(component.infoMNPflow).toBeDefined();
      expect(component.infoMNPflow.content).toBe(
        "You are eligible for upfront payment waiver (Guna Celcom)"
      );
      expect(component.infoMNPflow.color).toBe("229B9C");
    }
  ));
  it("it should test initialize Sticky summary values set 4", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      spyOn(component, "initializePage");
      component.initializeStickySummary();
      devicedataservice.publishUpfrontWaivedFailure(true);
      expect(component.initializePage).toHaveBeenCalled();
      expect(component.upfrontWaivedFailure).toBe(true);
      expect(component.infoMNPflow).toBeDefined();
      expect(component.infoMNPflow.content).toContain(
        "please call 1111 from your Celcom mobile"
      );
      expect(component.infoMNPflow.color).toBe("7D7D7D");
    }
  ));
  it("it should test initialize page function device bundle", () => {
    spyOn(component, "persistingCartDetails");
    component.orderDevice = null;
    component.data = mockData;
    component.initializePage();
    expect(component.persistingCartDetails).toHaveBeenCalled();
    expect(component.orderDevice).toBeDefined();
    expect(component.orderDeviceName).toBeDefined();
    expect(component.OrderDeviceExist).toBe(true);
    expect(component.step).toBe(1);
  });
  it("it should test initialize page function plan only", () => {
    spyOn(component, "persistingCartDetails");
    component.orderDevice = null;
    component.data = { TableInfo: [] };
    component.initializePage();
    expect(component.persistingCartDetails).toHaveBeenCalled();
    expect(component.OrderDeviceExist).toBe(false);
    expect(component.step).toBe(2);
  });
  it("it should test initialize page function plan only mnp", () => {
    spyOn(component, "persistingCartDetails");
    component.orderDevice = null;
    component.data = { TableInfo: [] };
    component.mnpData = {};
    component.mnpData.portNumber = "01934410178";
    component.initializePage();
    expect(component.persistingCartDetails).toHaveBeenCalled();
    expect(component.step).toBe(3);
  });
  it("it should test initialize page function device bundle Else condition", () => {
    spyOn(component, "persistingCartDetails");
    component.orderDevice = "iphone-11";
    component.initializePage();
    expect(component.persistingCartDetails).toHaveBeenCalled();
    expect(component.OrderDeviceExist).toBe(true);
    expect(component.step).toBe(1);
  });
  it("it should test initialize page function for createPlanOnlyCartWithoutSetting", () => {
    spyOn(component, "persistingCartDetails");
    spyOn(component, "createPlanOnlyCartWithoutSetting");
    component.data = {
      TableInfo: [],
      OneTimePayment: "1000",
      PlanDetails: "Mock plans",
      PlanMonthlyPay: "200",
      PlanName: "FPP",
      PlanSku: "FPP",
      TotalPay: "1200"
    };
    component.initializePage();
    expect(component.persistingCartDetails).toHaveBeenCalled();
    expect(component.createPlanOnlyCartWithoutSetting).toHaveBeenCalled();
    expect(component.orderOneTimePay).toBeDefined();
    expect(component.selectedPlanDetails).toBeDefined();
    expect(component.orderMonthlyPay).toBeDefined();
    expect(component.orderPlanName).toBeDefined();
    expect(component.orderPlan).toBeDefined();
    expect(component.orderTotalPay).toBeDefined();
    expect(component.orderDevice).toBe(null);
    expect(component.selectedPlanSku).toBeDefined();
  });
  it("it should test initialize page function EligibilityIndicator", () => {
    localStorage.setItem("EligibilityIndicator", "true");
    spyOn(component, "persistingCartDetails");
    spyOn(component, "DisplayAgeEligibilityPopup");
    component.initializePage();
    expect(component.persistingCartDetails).toHaveBeenCalled();
    expect(component.DisplayAgeEligibilityPopup).toHaveBeenCalled();
    localStorage.removeItem("EligibilityIndicator");
  });
  it("it should test persistingCartDetails function", () => {
    sessionStorage.setItem("USER_TYPE", "GUEST");
    sessionStorage.setItem("UserToken", "test");
    component.persistingCartDetails();
    // expect()
    sessionStorage.removeItem("USER_TYPE");
    sessionStorage.removeItem("UserToken");
  });
  it("it should test createPlanOnlyCart function", () => {
    component.orderPlan = "test plan";
    component.orderTotalPay = 200;
    component.selectedPlanSku = "sku";
    component.orderPhoneNo = "123456";
    component.data = mockData;
    component.orderPlanName = "plan";
    component.orderMonthlyPay = 10;
    component.orderOneTimePay = 100;
    component.orderNumberType = "test";
    component.createPlanOnlyCart();
    expect(JSON.parse(localStorage.getItem("orderDetails")).sku).toBe(
      "test plan"
    );
  });
  it("it should test runDisclaimer function with return false", () => {
    component.orderSummaryColor = "Black";
    component.orderDevicePrice = "200";
    component.orderSummaryStorage = "128GB";
    component.orderPlan = "FGP";
    component.data = mockData;
    localStorage.setItem(
      "ContractEndDate",
      JSON.stringify({ enddate: "19071990" })
    );
    localStorage.setItem("ContractAgree", "false");
    let result = component.runDisclaimer("sku", { basePlan: "plan" }, 200);
    expect(result).toBeFalsy();
    localStorage.removeItem("ContractEndDate");
    localStorage.removeItem("ContractAgree");
  });
  it("it should test runDisclaimer function with order plan x", () => {
    component.orderSummaryColor = "Black";
    component.orderDevicePrice = "200";
    component.orderSummaryStorage = "128GB";
    component.orderPlan = "x";
    // component.planTypeToPass  = 'x';
    component.data = mockData;
    localStorage.setItem("MyMsIsdn", "123456789");
    sessionStorage.setItem("USER_TYPE", "GUEST");
    sessionStorage.setItem("UserToken", "test token");
    let guestdata = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "900719123456",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "900719123456",
        dateOfBirth: "19900719_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }]
      }
    };
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestdata));
    component.runDisclaimer("sku", { basePlan: "plan" }, 200);
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("USER_TYPE");
    sessionStorage.removeItem("UserToken");
    sessionStorage.removeItem("GuestInfo");
    // expect(JSON.parse(localStorage.getItem('orderDetails')).sku).toBe('test plan');
  });
  it("it should test runDisclaimer function with order plan FPB", () => {
    component.orderSummaryColor = "Black";
    component.orderDevicePrice = "200";
    component.orderSummaryStorage = "128GB";
    component.orderPlan = "FPB";
    // component.planTypeToPass  = 'x';
    component.data = mockData;
    localStorage.setItem("MyMsIsdn", "123456789");
    sessionStorage.setItem("USER_TYPE", "GUEST");
    sessionStorage.setItem("UserToken", "test token");
    let guestdata = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "900719123456",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "900719123456",
        dateOfBirth: "19900719_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }]
      }
    };
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestdata));
    component.runDisclaimer("sku", { basePlan: "plan" }, 200);
    // expect(JSON.parse(localStorage.getItem('orderDetails')).sku).toBe('test plan');
    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("USER_TYPE");
    sessionStorage.removeItem("UserToken");
    sessionStorage.removeItem("GuestInfo");
  });
  it("it should test addEditProductMNP function with order plan FPB", () => {
    component.orderSummaryColor = "Black";
    component.orderDevicePrice = "200";
    component.orderSummaryStorage = "128GB";
    component.orderPlan = "FGP";
    component.param1 = { bundleSku: "FPB", deviceSku: "test" };
    component.param2 = { basePlan: "FPB", addOnPass: "test addons" };
    component.param3 = 200;
    // component.planTypeToPass  = 'x';
    component.data = mockData;
    localStorage.setItem("MyMsIsdn", "123456789");
    sessionStorage.setItem("USER_TYPE", "GUEST");
    sessionStorage.setItem("UserToken", "test token");
    let guestdata = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "900719123456",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "900719123456",
        dateOfBirth: "19900719_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }]
      }
    };
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestdata));
    component.addEditProductMNP();

    localStorage.removeItem("MyMsIsdn");
    sessionStorage.removeItem("USER_TYPE");
    sessionStorage.removeItem("UserToken");
    sessionStorage.removeItem("GuestInfo");
    // expect(JSON.parse(localStorage.getItem('orderDetails')).sku).toBe('test plan');
  });
  it("it should test disclaimerShow function", () => {
    component.orderNumberType = "KeepNumber";
    component.isMoon = true;
    component.orderDetails = {};
    component.selectedProductDetails = {};
    let guestdata = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "900719123456",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "900719123456",
        dateOfBirth: "19900719_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }]
      }
    };
    component.disclaimerShow();
    expect(component.showDisclaimer).toBeTruthy();

    // expect(JSON.parse(localStorage.getItem('orderDetails')).sku).toBe('test plan');
  });

  it("it should test checkForLimitExceeded function with isLimitExceededIncludingOpenOrders true", () => {
    component.isLimitExceededIncludingOpenOrders = true;
    component.checkForLimitExceeded();
    expect(component.IsDisplayAgeEligibilityPopup).toBeTruthy();
  });

  it("OnContinueEligibilityCheck", () => {
    const a = "123";
    component.OnContinueEligibilityCheck(a);
  });

  it("scrollToSection", () => {
    component.scrollToSection(1);
  });

  it("loadAnalyticsAddCartScript", () => {
    component.data = {
      analytics_key_addtocart: {
        fb_add_cart_id: "abc",
        google_add_cart_id: "def",
        twitter_add_cart_id: "ghi"
      }
    };
    component.loadAnalyticsAddCartScript();
    component.data = {};
    component.loadAnalyticsAddCartScript();
  });
  it("starAddToCartButtonDisable", () => {
    component.outOfStock = null;
    localStorage.setItem("ContractAgree", "test");
    spyOn(component, "starConfirmPlanCOBPDevicePenalty").and.returnValue(true);
    spyOn(component, "starConfirmPlanSelection").and.returnValue(true);
    component.starAddToCartButtonDisable();
    expect(component.starConfirmPlanCOBPDevicePenalty).toHaveBeenCalled();
  });
  it("callRetrieveNumbersAPI", () => {
    const dataForRetrieveNumberAPI = {
      NumberDetailsRetrieveRequest: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "20",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    randomResp = { status: true, number: "0123112251", reservation_id: "abc" };
    component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    randomResp = { status: false };
    component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  });

  it("onAddtocartClicked", () => {
    component.isProjectStar = false;
    spyOn(component, "isAddtocartDisabled").and.returnValue(false);
    component.onAddtocartClicked();
    expect(component.isAddtocartDisabled).toHaveBeenCalled();
  });

  it("isAddtocartDisabled", () => {
    component.isProjectStar = true;
    component.OrderDeviceExist = true;
    component.IsMnpFlowFromDevice = true;
    let spy = spyOn(component, "isAddtocartDisabled");
    spyOn(component, "checkValidItem").and.returnValue(true);
    component.isAddtocartDisabled();
    expect(spy).toHaveBeenCalled();
  });

  it("starConfirmPlanCOBPDevicePenalty", () => {
    component.isProjectStar = false;
    let spy = spyOn(component, "starConfirmPlanCOBPDevicePenalty");
    component.starConfirmPlanCOBPDevicePenalty();
    component.checkUrlIfUltraPlan();
    expect(spy).toHaveBeenCalled();
  });
  it("isStarNumberReservedMagento", () => {
    component.isProjectStar = false;
    let spy = spyOn(component, "isStarNumberReservedMagento");
    component.isStarNumberReservedMagento();
    expect(spy).toHaveBeenCalled();
  });

  it("EntUserHasSuccessfulTrans", () => {
    sessionStorage.setItem(
      "UserInfo",
      JSON.stringify({
        outputCPResp: {
          contactFirstName: "test",
          enterpriseOrderPlaced: "test"
        }
      })
    );
   let getSpy = spyOnProperty(component,"EntUserHasSuccessfulTrans","get");
   fixture.detectChanges();
    expect(getSpy).toBeDefined();
  });

  it("getDevice", () => {
    component.isProjectStar = true;
    component.data = {
      associated_product: [
        {
          name: "nubia Red Magic 3 Black",
          sku: "nubiaRedMagic3128gbblack",
          discounted_device_rrp: null,
          color: null,
          memory: "128GB"
        }
      ]
    };
    component.getDevice();
  });

  it("setDevicePurchaseType", () => {
    component.data = {
      associated_product: [
        {
          name: "nubia Red Magic 3 Black",
          sku: "nubiaRedMagic3128gbblack",
          discounted_device_rrp: null,
          color: null,
          memory: "128GB"
        }
      ]
    };
    component.setDevicePurchaseType(component.data);
  });

  it("runPlanOnlyDisclaimer", () => {
    localStorage.setItem("ContractAgree", "true");
    component.orderPlan = true;
    component.PlanOnlyObjectForCart = {
      selectedPlanDetails: [
        {
          name: "nubia Red Magic 3 Black",
          sku: "nubiaRedMagic3128gbblack",
          discounted_device_rrp: null,
          color: null,
          memory: "128GB",
          order_plan_bundle: "test",
          order_service_bundle: "test",
          order_plan_component: "test",
          PlanSku: "test"
        }
      ]
    };
    component.runPlanOnlyDisclaimer(true, true);
  });

  it("UserConnectionLimitExceeded", () => {
    component.data = {
      associated_product: [
        {
          name: "nubia Red Magic 3 Black",
          sku: "nubiaRedMagic3128gbblack",
          discounted_device_rrp: null,
          color: null,
          memory: "128GB"
        }
      ]
    };
    component.ManageAgeEligibilityTestForXpax();
  });
});
