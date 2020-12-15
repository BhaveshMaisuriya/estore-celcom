import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { AppMockService } from "../../../../Service/appmock.service";
import { Router, ActivatedRoute } from "@angular/router";
import { DecimalPipe } from "@angular/common";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { OrderFilter } from "../../../shared/order-filter.pipe";
import { RouterTestingModule } from "@angular/router/testing";
import { ChooseAddressComponent } from "./choose-address.component";
import { MinifiedPageLoaderComponent } from "../../../widget/minified-page-loader/minified-page-loader.component";
import { FooterComponent } from "../../../../Footer/footer.component";
import { AgentFooterComponent } from "../../../../Footer/agent-footer/agent-footer.component";
import { SocialMediaComponent } from "../../../../Footer/SocialMedia/socialmedia.component";
import { PageLoaderComponent } from '../../../../shared/components/page-loader/page-loader.component';
import { FooterDownloadComponent } from "../../../../Footer/Download/download.component";
import { NotificationErrorComponent } from "../../../widget/notification-error/notification-error.component";
import { AgeEligibilityPopupComponent } from "../../../widget/age-eligibility-popup/ageeligiblity.popup.component";
import { CheckoutHeroBannerComponent } from "../../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component";
import { AppService } from "../../../../Service/app.service";
import { EStoreAnalysticsService } from "../../../../Service/store.analytic.service";
import { RendererService } from "../../../../Service/renderer.service";
import { AnalyticsService } from "../../../../Service/analytic.service";
import { SeoService } from "../../../../Service/seo.service";
import { Broadcaster } from "../../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../../Service/broadcaster.service";
import { UserService } from "../../../../Service/user.service";
import { OrderInfoService } from "../../../../Service/orderinfo.service";
import { DeviceDataService } from "../../../../Service/devicedata.service";
import { GetParametersService } from "../../../../Service/getParamaters.service";
import { CommonUtilService } from "../../../../Service/commonUtil.service";
import { HeaderService } from "../../../../Header/header.service";
import { RedirectionService } from "../../../../Service/redirection.service";
import { SupplimentaryLinesService } from "../../../widget/supplementary-lines/supplementary-lines.service";
import { RemarketAnalyticsService } from "../../../../Service/remarket-analytics.service";
import { BundleService } from "../../../../Service/bundle.service";
import { CartService } from "../../../../Service/cart.service";
import { CheckoutService } from "../../services/checkout.service";
import { BroadbandService } from "../../../../Service/broadband.service";
import { HomeService } from "../../../../Service/home.service";
import { RouterService } from "../../../../Service/router.service";
import { SessionTimeOutPopupComponent } from "../../../widget/session-timeout-popup/session-timeout-popup";
import { configureTestSuite } from "ng-bullet";
import { SafeHtmlPipe } from '../../../../shared/pipes/safe-html.pipe';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

class RouterStub {
  navigateByUrl(url: string) {
    return new Promise(() => url);
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
describe("ChooseAddressComponent ", () => {
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  let component: ChooseAddressComponent;
  let fixture: ComponentFixture<ChooseAddressComponent>;
  const response = [
    {
      id: 15816,
      created_at: "2019-09-18 10:35:06",
      updated_at: "2019-09-20 12:01:24",
      is_active: true,
      is_virtual: true,
      items: [
        {
          item_id: 42054,
          sku: "FG",
          qty: 1,
          name: "First™ Gold",
          price: 80,
          product_type: "virtual",
          quote_id: "15816"
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
        updated_at: "2019-09-20 12:01:22",
        created_in: "Default Store View",
        dob: "1990-02-19",
        email: "900219453434@celcom.com.my",
        firstname: "AAZAM",
        lastname: "value",
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
        address_id: "34808",
        quote_id: "15816",
        created_at: "2019-09-20 12:01:24",
        updated_at: "2019-09-20 12:01:24",
        customer_id: "2866",
        save_in_address_book: "0",
        customer_address_id: "8836",
        address_type: "billing",
        email: "900219453434@celcom.com.my",
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
        entity_id: "34808",
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
      all_items: [
        {
          item_id: "42054",
          quantity: 1,
          reservation_id: "OP24CE1568890183",
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
          itemTotal: 80,
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
            orderPhoneNo: "0133506920",
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
                  label: "Legal"
                },
                cancellation: {
                  label: "Cancellation"
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
          rebate_amount: "0.0000"
        }
      ],
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
        address_id: "34809",
        quote_id: "15816",
        created_at: "2019-09-20 12:01:24",
        updated_at: "2019-09-20 12:01:24",
        customer_id: "2866",
        save_in_address_book: "0",
        customer_address_id: "8837",
        address_type: "shipping",
        email: "900219453434@celcom.com.my",
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
        entity_id: "34809"
      },
      supplementary_data: [],
      cart_session: 1,
      reservation_id: "OP24CE1568890183",
      tax: {
        total_tax: "0.00",
        items: []
      },
      delivery_type: "0"
    }
  ];
  const stateresponse = [
    {
      id: "MY",
      two_letter_abbreviation: "MY",
      three_letter_abbreviation: "MYS",
      full_name_locale: "Malaysia",
      full_name_english: "Malaysia",
      available_regions: [
        {
          id: "533",
          code: "JH",
          name: "Johor"
        },
        {
          id: "534",
          code: "KD",
          name: "Kedah"
        },
        {
          id: "535",
          code: "KN",
          name: "Kelantan"
        },
        {
          id: "536",
          code: "MK",
          name: "Melaka"
        },
        {
          id: "537",
          code: "NS",
          name: "Negeri Sembilan"
        },
        {
          id: "538",
          code: "PH",
          name: "Pahang"
        },
        {
          id: "539",
          code: "PK",
          name: "Perak"
        },
        {
          id: "540",
          code: "PS",
          name: "Perlis"
        },
        {
          id: "541",
          code: "PP",
          name: "Pulau Pinang"
        },
        {
          id: "542",
          code: "SB",
          name: "Sabah"
        },
        {
          id: "543",
          code: "SW",
          name: "Sarawak"
        },
        {
          id: "544",
          code: "SL",
          name: "Selangor"
        },
        {
          id: "545",
          code: "TG",
          name: "Terengganu"
        },
        {
          id: "546",
          code: "WP",
          name: "WP Kuala Lumpur"
        },
        {
          id: "547",
          code: "LB",
          name: "WP Labuan"
        },
        {
          id: "548",
          code: "PJ",
          name: "WP Putrajaya"
        }
      ]
    }
  ];
  const updateResp = [{ status: true, message: "" }];
  const updateRespFail = [{ status: false, message: "abc" }];
  const billingErrResp = { error: { success: false, message: "def" } };
  class MockAppService {
    postEstoreUserData(billingAddress, request) {
      if (billingAddress === "/rest/V1/update-profile") {
        return Observable.of(updateResp);
      }
      if (billingAddress === "/rest/V1/update-profile/false") {
        return Observable.of(updateRespFail);
      }
      if (billingAddress === "/rest/V1/update-profile/error") {
        return Observable.throw(updateRespFail);
      }
      if (billingAddress === "/rest/V1/setBillingAsShipping/") {
        return Observable.of(updateResp);
      }
      if (billingAddress === "/rest/V1/setBillingAsShipping/error") {
        return Observable.throw(billingErrResp);
      }
      if (billingAddress === "/rest/V1/addshipping") {
        return Observable.of(updateResp);
      }
      if (billingAddress === "/rest/V1/addshipping/error") {
        return Observable.throw(billingErrResp);
      }
    }
  }
  const stateresponsefail = {
    status: false
  };
  class MockCheckOutService {
    Find(url) {
      if (url === "/rest/V1/directory/countries/MY") {
        return Observable.of(stateresponse);
      }
      return Observable.throw(stateresponsefail);
    }
  }
  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        IconModule,
        materialModules,
      ],
      declarations: [
        ChooseAddressComponent,
        MinifiedPageLoaderComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        PageLoaderComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        CheckoutHeroBannerComponent,
        OrderFilter,
        SessionTimeOutPopupComponent,
        NotificationErrorComponent,
        SafeHtmlPipe
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
        { provide: CheckoutService, useClass: MockCheckOutService },
        RemarketAnalyticsService,
        HomeService,
        GetParametersService,
        { provide: RouterService, useValue: mockRouterService }
      ]
    });
  });
  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChooseAddressComponent);
    component = fixture.componentInstance;
  }));
  it("should create Choose Address Component", () => {
    expect(component).toBeTruthy();
  });
  // it('should call ngOninit()', () => {
  //     expect(component.ngOnInit).toBeDefined();
  //     component.ngOnInit();
  // });
  it("should check init method", () => {
    spyOn(component, "init");
    expect(component.init).toBeDefined();
  });
  it("Set User information", () => {
    if (typeof window !== "undefined") {
      if (sessionStorage && sessionStorage.getItem("UserInfo") != null) {
        const userInfo = sessionStorage.getItem("UserInfo");
        expect(userInfo).toBeDefined();
      }
    }
  });
  it("Set Old Guest User information", () => {
    if (typeof window !== "undefined") {
      if (sessionStorage && sessionStorage.getItem("OLD_GUEST_USER") != null) {
        const oldUserInfo = sessionStorage.getItem("OLD_GUEST_USER");
        expect(oldUserInfo).toBeDefined();
      }
    }
  });
  it("Set Guest information", () => {
    if (typeof window !== "undefined") {
      if (sessionStorage && sessionStorage.getItem("GuestInfo") != null) {
        const guestInfo = sessionStorage.getItem("GuestInfo");
        expect(guestInfo).toBeDefined();
      }
    }
  });

  it("should check EditAddress", () => {
    spyOn(component, "init");
    expect(component.init).toBeDefined();
    if (localStorage && localStorage.getItem("EditAddress")) {
      const address = localStorage.getItem("EditAddress");
      component.setAddress(address);
      expect(component.setAddress).toHaveBeenCalledWith(address);
      expect(component.chooseAddress).toHaveBeenCalledWith("shipToDiffAdd");
      expect(component.showBillingAdd).toBeFalsy();
    }
  });
  it("should call chooseAddress method", () => {
    spyOn(component, "chooseAddress");
    expect(component.disableButton).toBeFalsy();
  });
  it("should test address unit validation", () => {
    const event = {
      keyCode: 48,
      which: 48,
      charCode: 48
    };
    const k = event.keyCode || event.which;
    const charStr = String.fromCharCode(k);
    const z = event.charCode;
    const a = component.addressUnitValidation(event);
    expect(a).toBe(true);
  });
  it("should test address unit validation", () => {
    const event = {
      keyCode: 7,
      which: 7,
      charCode: 7
    };
    const k = event.keyCode || event.which;
    const charStr = String.fromCharCode(k);
    const z = event.charCode;
    const a = component.addressUnitValidation(event);
    expect(a).toBe(false);
  });
  it("should test address unit validation", () => {
    const event = {
      keyCode: 8,
      which: 8,
      charCode: 1
    };
    const k = event.keyCode || event.which;
    const charStr = String.fromCharCode(k);
    const z = event.charCode;
    const a = component.addressUnitValidation(event);
    expect(a).toBe(true);
  });
  it("should test postal code validation", () => {
    const event = {
      keyCode: 8,
      which: 8,
      charCode: 8
    };
    const postalkey = event.keyCode || event.which;
    const z = event.charCode;
    component.postalCodeValidation(event);
    expect(component.isPostalInValid).toBe(true);
  });
  it("should test postal code validation", () => {
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    const key = event.keyCode || event.which;
    const z = event.charCode;
    component.posCod = '123456';
    component.postalCodeValidation(event);
    expect(component.isPostalInValid).toBe(false);
  });
  it("should test postal code validation", () => {
    const event = {
      keyCode: 48,
      which: 48,
      charCode: 12
    };
    const key = event.keyCode || event.which;
    const z = event.charCode;
    component.postalCodeValidation(event);
    expect(component.isPostalInValid).toBe(true);
  });
  it("should test city validation", () => {
    const event = {
      keyCode: 0,
      which: 0,
      charCode: 0
    };
    const citykey = event.keyCode || event.which;
    const z = event.charCode;
    const a = component.cityValidation(event);
    expect(a).toBe(true);
  });
  it("should test city validation", () => {
    const event = {
      keyCode: 63,
      which: 63,
      charCode: 63
    };
    const citykey = event.keyCode || event.which;
    const z = event.charCode;
    const a = component.cityValidation(event);
    expect(a).toBe(false);
  });
  it("should test city validation", () => {
    const event = {
      keyCode: 0,
      which: 0,
      charCode: 16
    };
    const citykey = event.keyCode || event.which;
    const z = event.charCode;
    const a = component.cityValidation(event);
    expect(a).toBe(true);
  });
  it("should test init", () => {
    // component.init();
    sessionStorage.setItem("OLD_GUEST_USER", "NO");
    localStorage.setItem("EditAddress", "new");
    const userinf = {
      outputCPResp: {
        customerID: "901001092878",
        dateOfBirth: "19901001_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        newGuestPhNo: 60128282222,
        contactFirstName: "abc",
        contactLastName: "ddd",
        salutation: "Mr",
        contactEmail: "aam.122@mmmss.com"
      }
    };
    sessionStorage.setItem("UserInfo", JSON.stringify(userinf));
    const guestinf = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901001092878",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901001092878",
        dateOfBirth: "19901001_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      }
    };
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinf));
    const checkout = {
      id: 16031,
      created_at: "2019-11-20 06:28:18",
      updated_at: "2019-11-20 06:53:53",
      is_active: true,
      is_virtual: true,
      items: [
        {
          item_id: 42684,
          sku: "FPP",
          qty: 1,
          name: "Celcom Mobile Platinum Plus",
          price: 188,
          product_type: "virtual",
          quote_id: "16031"
        }
      ],
      items_count: 1,
      items_qty: 1,
      customer: {
        id: 3467,
        group_id: 1,
        default_billing: "10528",
        default_shipping: "10529",
        created_at: "2019-08-14 08:43:12",
        updated_at: "2019-11-20 06:53:53",
        created_in: "Default Store View",
        dob: "1990-10-01",
        email: "aam.122@mmmss.com",
        firstname: "abc",
        lastname: "ddd",
        gender: 1,
        store_id: 1,
        website_id: 1,
        addresses: [
          {
            id: 10135,
            customer_id: 3467,
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
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "8" }
            ]
          },
          {
            id: 10136,
            customer_id: 3467,
            region: {
              region_code: "NS",
              region: "Negeri Sembilan",
              region_id: 537
            },
            region_id: 537,
            country_id: "MY",
            street: ["adfhet gfghghrgset"],
            telephone: "0144255222",
            postcode: "34532",
            city: "wearety",
            firstname: "aabcd",
            lastname: "dfgfhhf",
            custom_attributes: [
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "90/1234" }
            ]
          },
          {
            id: 10137,
            customer_id: 3467,
            region: {
              region_code: "NS",
              region: "Negeri Sembilan",
              region_id: 537
            },
            region_id: 537,
            country_id: "MY",
            street: ["adfhet gfghghrgset"],
            telephone: "0144255222",
            postcode: "34532",
            city: "wearety",
            firstname: "aabcd",
            lastname: "dfgfhhf",
            custom_attributes: [
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "90/1234" }
            ]
          },
          {
            id: 10528,
            customer_id: 3467,
            region: { region_code: "MK", region: "Melaka", region_id: 536 },
            region_id: 536,
            country_id: "MY",
            street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
            telephone: "60128282222",
            postcode: "12211",
            city: "aabccc",
            firstname: "abc",
            lastname: "ddd",
            default_billing: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "12/1111-anccc" }
            ]
          },
          {
            id: 10529,
            customer_id: 3467,
            region: { region_code: "MK", region: "Melaka", region_id: 536 },
            region_id: 536,
            country_id: "MY",
            street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
            telephone: "60128282222",
            postcode: "12211",
            city: "aabccc",
            firstname: "abc",
            lastname: "ddd",
            default_shipping: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "12/1111-anccc" }
            ]
          }
        ],
        disable_auto_group_change: 0,
        extension_attributes: { is_subscribed: false },
        custom_attributes: [
          { attribute_code: "mobile_number", value: "60128282222" },
          { attribute_code: "id_type", value: "New NRIC" },
          { attribute_code: "id_number", value: "901001092878" },
          { attribute_code: "customer_full_name", value: "abc ddd" },
          { attribute_code: "salutation", value: "Mr" },
          { attribute_code: "customer_email_id", value: "aam.122@mmmss.com" }
        ]
      },
      billing_address: {
        address_id: "35440",
        quote_id: "16031",
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:28:18",
        customer_id: "3467",
        save_in_address_book: "0",
        customer_address_id: "10528",
        address_type: "billing",
        email: "aam.122@mmmss.com",
        prefix: null,
        firstname: "abc",
        middlename: null,
        lastname: "ddd",
        suffix: null,
        company: null,
        street: "asdfgf dsfgh\nasd dfgh sdfgf",
        city: "aabccc",
        region: "Melaka",
        region_id: "536",
        postcode: "12211",
        country_id: "MY",
        telephone: "60128282222",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: null,
        billing_unit_number: "12/1111-anccc",
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "0",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "188.0000",
        base_subtotal: "188.0000",
        subtotal_with_discount: "188.0000",
        base_subtotal_with_discount: "188.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "188.0000",
        base_grand_total: "188.0000",
        customer_notes: null,
        applied_taxes: "[]",
        discount_description: null,
        shipping_discount_amount: "0.0000",
        base_shipping_discount_amount: "0.0000",
        subtotal_incl_tax: "188.0000",
        base_subtotal_total_incl_tax: "188.0000",
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
        entity_id: "35440",
        region_code: "MK",
        address_line_1: "asdfgf dsfgh",
        address_line_2: "asd dfgh sdfgf"
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
          item_id: "42684",
          quantity: 1,
          reservation_id: "OP58CE1574231295",
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
          price: 188,
          itemTotal: "188.0000",
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
            orderPhoneNo: "0132612569",
            orderNumberType: "NewNumber",
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
            mnp_data: null,
            is_mnp: false
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
            "Great! You are one step closer to receiving a Welcome Gift from us. Complete your order now to get the reward.",
          esim: false
        }
      ],
      customerOtherInfo: {
        salutation: "Mr",
        unit_number: "12/1111-anccc",
        mobile_number: "60128282222",
        gender: "Male",
        customer_full_name: "abc ddd"
      },
      GST: "0.00",
      grossTotal: "188.00",
      itemsTotal: "1",
      simType: "Physical SIM",
      shipping_address: {
        address_id: "35441",
        quote_id: "16031",
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:28:18",
        customer_id: "3467",
        save_in_address_book: "0",
        customer_address_id: "10528",
        address_type: "shipping",
        email: "aam.122@mmmss.com",
        prefix: null,
        firstname: "abc",
        middlename: null,
        lastname: "ddd",
        suffix: null,
        company: null,
        street: "asdfgf dsfgh\nasd dfgh sdfgf",
        city: "aabccc",
        region: "Melaka",
        region_id: "536",
        postcode: "12211",
        country_id: "MY",
        telephone: "60128282222",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: "12/1111-anccc",
        billing_unit_number: null,
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
        entity_id: "35441",
        address_line_1: "asdfgf dsfgh",
        address_line_2: "asd dfgh sdfgf"
      },
      supplementary_data: [],
      cart_session: 4,
      reservation_id: "OP58CE1574231295",
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" }
    };
    component.checkoutData = JSON.parse(JSON.stringify(checkout));
    component.init();
    sessionStorage.removeItem("OLD_GUEST_USER");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("GuestInfo");
  });
  it("should test ngoninit", inject(
    [DeviceDataService],
    (devicedataservice: DeviceDataService) => {
      const userinf = {
        outputCPResp: {
          customerID: "901001092878",
          dateOfBirth: "19901001_000000",
          preferredContactMethod: "Email",
          contactPreferredTime: "4:30pm to 8:30pm",
          newGuestPhNo: 60128282222,
          contactFirstName: "abc",
          contactLastName: "ddd",
          salutation: "Mr",
          contactEmail: "aam.122@mmmss.com"
        }
      };
      sessionStorage.setItem("UserInfo", JSON.stringify(userinf));
      const checkout = {
        id: 16031,
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:53:53",
        is_active: true,
        is_virtual: true,
        items: [
          {
            item_id: 42684,
            sku: "FPP",
            qty: 1,
            name: "Celcom Mobile Platinum Plus",
            price: 188,
            product_type: "virtual",
            quote_id: "16031"
          }
        ],
        items_count: 1,
        items_qty: 1,
        customer: {
          id: 3467,
          group_id: 1,
          default_billing: "10528",
          default_shipping: "10529",
          created_at: "2019-08-14 08:43:12",
          updated_at: "2019-11-20 06:53:53",
          created_in: "Default Store View",
          dob: "1990-10-01",
          email: "aam.122@mmmss.com",
          firstname: "abc",
          lastname: "ddd",
          gender: 1,
          store_id: 1,
          website_id: 1,
          addresses: [
            {
              id: 10135,
              customer_id: 3467,
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
                { attribute_code: "residence_type", value: "Landed" },
                { attribute_code: "salutation", value: "Mr" },
                { attribute_code: "unit_number", value: "8" }
              ]
            },
            {
              id: 10136,
              customer_id: 3467,
              region: {
                region_code: "NS",
                region: "Negeri Sembilan",
                region_id: 537
              },
              region_id: 537,
              country_id: "MY",
              street: ["adfhet gfghghrgset"],
              telephone: "0144255222",
              postcode: "34532",
              city: "wearety",
              firstname: "aabcd",
              lastname: "dfgfhhf",
              custom_attributes: [
                { attribute_code: "residence_type", value: "Landed" },
                { attribute_code: "salutation", value: "Mr" },
                { attribute_code: "unit_number", value: "90/1234" }
              ]
            },
            {
              id: 10137,
              customer_id: 3467,
              region: {
                region_code: "NS",
                region: "Negeri Sembilan",
                region_id: 537
              },
              region_id: 537,
              country_id: "MY",
              street: ["adfhet gfghghrgset"],
              telephone: "0144255222",
              postcode: "34532",
              city: "wearety",
              firstname: "aabcd",
              lastname: "dfgfhhf",
              custom_attributes: [
                { attribute_code: "residence_type", value: "Landed" },
                { attribute_code: "salutation", value: "Mr" },
                { attribute_code: "unit_number", value: "90/1234" }
              ]
            },
            {
              id: 10528,
              customer_id: 3467,
              region: { region_code: "MK", region: "Melaka", region_id: 536 },
              region_id: 536,
              country_id: "MY",
              street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
              telephone: "60128282222",
              postcode: "12211",
              city: "aabccc",
              firstname: "abc",
              lastname: "ddd",
              default_billing: true,
              custom_attributes: [
                { attribute_code: "residence_type", value: "High-Rise" },
                { attribute_code: "salutation", value: "Mr" },
                { attribute_code: "unit_number", value: "12/1111-anccc" }
              ]
            },
            {
              id: 10529,
              customer_id: 3467,
              region: { region_code: "MK", region: "Melaka", region_id: 536 },
              region_id: 536,
              country_id: "MY",
              street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
              telephone: "60128282222",
              postcode: "12211",
              city: "aabccc",
              firstname: "abc",
              lastname: "ddd",
              default_shipping: true,
              custom_attributes: [
                { attribute_code: "residence_type", value: "High-Rise" },
                { attribute_code: "salutation", value: "Mr" },
                { attribute_code: "unit_number", value: "12/1111-anccc" }
              ]
            }
          ],
          disable_auto_group_change: 0,
          extension_attributes: { is_subscribed: false },
          custom_attributes: [
            { attribute_code: "mobile_number", value: "60128282222" },
            { attribute_code: "id_type", value: "New NRIC" },
            { attribute_code: "id_number", value: "901001092878" },
            { attribute_code: "customer_full_name", value: "abc ddd" },
            { attribute_code: "salutation", value: "Mr" },
            { attribute_code: "customer_email_id", value: "aam.122@mmmss.com" }
          ]
        },
        billing_address: {
          address_id: "35440",
          quote_id: "16031",
          created_at: "2019-11-20 06:28:18",
          updated_at: "2019-11-20 06:28:18",
          customer_id: "3467",
          save_in_address_book: "0",
          customer_address_id: "10528",
          address_type: "billing",
          email: "aam.122@mmmss.com",
          prefix: null,
          firstname: "abc",
          middlename: null,
          lastname: "ddd",
          suffix: null,
          company: null,
          street: "asdfgf dsfgh\nasd dfgh sdfgf",
          city: "aabccc",
          region: "Melaka",
          region_id: "536",
          postcode: "12211",
          country_id: "MY",
          telephone: "60128282222",
          fax: null,
          virtual_shipping_id: null,
          shipping_unit_number: null,
          billing_unit_number: "12/1111-anccc",
          salutation: "Mr",
          residence_type: "High-Rise",
          same_as_billing: "0",
          collect_shipping_rates: "0",
          shipping_method: null,
          shipping_description: null,
          weight: "0.0000",
          subtotal: "188.0000",
          base_subtotal: "188.0000",
          subtotal_with_discount: "188.0000",
          base_subtotal_with_discount: "188.0000",
          tax_amount: "0.0000",
          base_tax_amount: "0.0000",
          shipping_amount: "0.0000",
          base_shipping_amount: "0.0000",
          shipping_tax_amount: "0.0000",
          base_shipping_tax_amount: "0.0000",
          discount_amount: "0.0000",
          base_discount_amount: "0.0000",
          grand_total: "188.0000",
          base_grand_total: "188.0000",
          customer_notes: null,
          applied_taxes: "[]",
          discount_description: null,
          shipping_discount_amount: "0.0000",
          base_shipping_discount_amount: "0.0000",
          subtotal_incl_tax: "188.0000",
          base_subtotal_total_incl_tax: "188.0000",
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
          entity_id: "35440",
          region_code: "MK",
          address_line_1: "asdfgf dsfgh",
          address_line_2: "asd dfgh sdfgf"
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
            item_id: "42684",
            quantity: 1,
            reservation_id: "OP58CE1574231295",
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
            price: 188,
            itemTotal: "188.0000",
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
              orderPhoneNo: "0132612569",
              orderNumberType: "NewNumber",
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
                    desc:
                      "Unlimited Standard national calls + texts + videocalls"
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
              mnp_data: null,
              is_mnp: false
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
              "Great! You are one step closer to receiving a Welcome Gift from us. Complete your order now to get the reward.",
            esim: false
          }
        ],
        customerOtherInfo: {
          salutation: "Mr",
          unit_number: "12/1111-anccc",
          mobile_number: "60128282222",
          gender: "Male",
          customer_full_name: "abc ddd"
        },
        GST: "0.00",
        grossTotal: "188.00",
        itemsTotal: "1",
        simType: "Physical SIM",
        shipping_address: {
          address_id: "35441",
          quote_id: "16031",
          created_at: "2019-11-20 06:28:18",
          updated_at: "2019-11-20 06:28:18",
          customer_id: "3467",
          save_in_address_book: "0",
          customer_address_id: "10528",
          address_type: "shipping",
          email: "aam.122@mmmss.com",
          prefix: null,
          firstname: "abc",
          middlename: null,
          lastname: "ddd",
          suffix: null,
          company: null,
          street: "asdfgf dsfgh\nasd dfgh sdfgf",
          city: "aabccc",
          region: "Melaka",
          region_id: "536",
          postcode: "12211",
          country_id: "MY",
          telephone: "60128282222",
          fax: null,
          virtual_shipping_id: null,
          shipping_unit_number: "12/1111-anccc",
          billing_unit_number: null,
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
          entity_id: "35441",
          address_line_1: "asdfgf dsfgh",
          address_line_2: "asd dfgh sdfgf"
        },
        supplementary_data: [],
        cart_session: 4,
        reservation_id: "OP58CE1574231295",
        tax: { total_tax: "0.00", items: [] },
        delivery_type: { value: 0, code: "standard" }
      };
      component.checkoutData = JSON.parse(JSON.stringify(checkout));
      component.ngOnInit();
      component.countriesUrl = "/abc";
      component.ngOnInit();
      devicedataservice.publishEditBilling(true);
      component.ngOnInit();
      devicedataservice.publishEditBilling(false);
      sessionStorage.removeItem("UserInfo");
    }
  ));
  it("should test scroll", () => {
    const ev = null;
    component.scrollToError(ev);
  });
  it("should test scroll", () => {
    component.chooseAddress("shipToBillingAdd");
    component.chooseAddress("");
    let updateinfo: any = {
      salutation: null,
      email: null,
      typedEmail: null,
      validate: true
    };
    localStorage.setItem("updateInfo", JSON.stringify(updateinfo));
    component.chooseAddress("shipToBillingAdd");
    updateinfo = {
      email: "abc@gmail.com",
      typedEmail: "bac@gmail.com"
    };
    localStorage.setItem("updateInfo", JSON.stringify(updateinfo));
    component.chooseAddress("shipToBillingAdd");
  });
  it("Validate form field", () => {
    component.ValidateNotFormField();
    component.showBillingAddress = "new";
    component.ValidateNotFormField();
  });
  it("update user info", () => {
    const userinf = {
      outputCPResp: {
        customerID: "901001092878",
        dateOfBirth: "19901001_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        newGuestPhNo: 60128282222,
        contactFirstName: "abc",
        contactLastName: "ddd",
        salutation: "Mr",
        contactEmail: "aam.122@mmmss.com"
      }
    };
    sessionStorage.setItem("UserInfo", JSON.stringify(userinf));
    const guestinf = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901001092878",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901001092878",
        dateOfBirth: "19901001_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      }
    };
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinf));
    const checkout = {
      id: 16031,
      created_at: "2019-11-20 06:28:18",
      updated_at: "2019-11-20 06:53:53",
      is_active: true,
      is_virtual: true,
      items: [
        {
          item_id: 42684,
          sku: "FPP",
          qty: 1,
          name: "Celcom Mobile Platinum Plus",
          price: 188,
          product_type: "virtual",
          quote_id: "16031"
        }
      ],
      items_count: 1,
      items_qty: 1,
      customer: {
        id: 3467,
        group_id: 1,
        default_billing: "10528",
        default_shipping: "10529",
        created_at: "2019-08-14 08:43:12",
        updated_at: "2019-11-20 06:53:53",
        created_in: "Default Store View",
        dob: "1990-10-01",
        email: "aam.122@mmmss.com",
        firstname: "abc",
        lastname: "ddd",
        gender: 1,
        store_id: 1,
        website_id: 1,
        addresses: [
          {
            id: 10135,
            customer_id: 3467,
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
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "8" }
            ]
          },
          {
            id: 10136,
            customer_id: 3467,
            region: {
              region_code: "NS",
              region: "Negeri Sembilan",
              region_id: 537
            },
            region_id: 537,
            country_id: "MY",
            street: ["adfhet gfghghrgset"],
            telephone: "0144255222",
            postcode: "34532",
            city: "wearety",
            firstname: "aabcd",
            lastname: "dfgfhhf",
            custom_attributes: [
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "90/1234" }
            ]
          },
          {
            id: 10137,
            customer_id: 3467,
            region: {
              region_code: "NS",
              region: "Negeri Sembilan",
              region_id: 537
            },
            region_id: 537,
            country_id: "MY",
            street: ["adfhet gfghghrgset"],
            telephone: "0144255222",
            postcode: "34532",
            city: "wearety",
            firstname: "aabcd",
            lastname: "dfgfhhf",
            custom_attributes: [
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "90/1234" }
            ]
          },
          {
            id: 10528,
            customer_id: 3467,
            region: { region_code: "MK", region: "Melaka", region_id: 536 },
            region_id: 536,
            country_id: "MY",
            street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
            telephone: "60128282222",
            postcode: "12211",
            city: "aabccc",
            firstname: "abc",
            lastname: "ddd",
            default_billing: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "12/1111-anccc" }
            ]
          },
          {
            id: 10529,
            customer_id: 3467,
            region: { region_code: "MK", region: "Melaka", region_id: 536 },
            region_id: 536,
            country_id: "MY",
            street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
            telephone: "60128282222",
            postcode: "12211",
            city: "aabccc",
            firstname: "abc",
            lastname: "ddd",
            default_shipping: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "12/1111-anccc" }
            ]
          }
        ],
        disable_auto_group_change: 0,
        extension_attributes: { is_subscribed: false },
        custom_attributes: [
          { attribute_code: "mobile_number", value: "60128282222" },
          { attribute_code: "id_type", value: "New NRIC" },
          { attribute_code: "id_number", value: "901001092878" },
          { attribute_code: "customer_full_name", value: "abc ddd" },
          { attribute_code: "salutation", value: "Mr" },
          { attribute_code: "customer_email_id", value: "aam.122@mmmss.com" }
        ]
      },
      billing_address: {
        address_id: "35440",
        quote_id: "16031",
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:28:18",
        customer_id: "3467",
        save_in_address_book: "0",
        customer_address_id: "10528",
        address_type: "billing",
        email: "aam.122@mmmss.com",
        prefix: null,
        firstname: "abc",
        middlename: null,
        lastname: "ddd",
        suffix: null,
        company: null,
        street: "asdfgf dsfgh\nasd dfgh sdfgf",
        city: "aabccc",
        region: "Melaka",
        region_id: "536",
        postcode: "12211",
        country_id: "MY",
        telephone: "60128282222",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: null,
        billing_unit_number: "12/1111-anccc",
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "0",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "188.0000",
        base_subtotal: "188.0000",
        subtotal_with_discount: "188.0000",
        base_subtotal_with_discount: "188.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "188.0000",
        base_grand_total: "188.0000",
        customer_notes: null,
        applied_taxes: "[]",
        discount_description: null,
        shipping_discount_amount: "0.0000",
        base_shipping_discount_amount: "0.0000",
        subtotal_incl_tax: "188.0000",
        base_subtotal_total_incl_tax: "188.0000",
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
        entity_id: "35440",
        region_code: "MK",
        address_line_1: "asdfgf dsfgh",
        address_line_2: "asd dfgh sdfgf"
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
          item_id: "42684",
          quantity: 1,
          reservation_id: "OP58CE1574231295",
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
          price: 188,
          itemTotal: "188.0000",
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
            orderPhoneNo: "0132612569",
            orderNumberType: "NewNumber",
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
            mnp_data: null,
            is_mnp: false
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
            "Great! You are one step closer to receiving a Welcome Gift from us. Complete your order now to get the reward.",
          esim: false
        }
      ],
      customerOtherInfo: {
        salutation: "Mr",
        unit_number: "12/1111-anccc",
        mobile_number: "60128282222",
        gender: "Male",
        customer_full_name: "abc ddd"
      },
      GST: "0.00",
      grossTotal: "188.00",
      itemsTotal: "1",
      simType: "Physical SIM",
      shipping_address: {
        address_id: "35441",
        quote_id: "16031",
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:28:18",
        customer_id: "3467",
        save_in_address_book: "0",
        customer_address_id: "10528",
        address_type: "shipping",
        email: "aam.122@mmmss.com",
        prefix: null,
        firstname: "abc",
        middlename: null,
        lastname: "ddd",
        suffix: null,
        company: null,
        street: "asdfgf dsfgh\nasd dfgh sdfgf",
        city: "aabccc",
        region: "Melaka",
        region_id: "536",
        postcode: "12211",
        country_id: "MY",
        telephone: "60128282222",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: "12/1111-anccc",
        billing_unit_number: null,
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
        entity_id: "35441",
        address_line_1: "asdfgf dsfgh",
        address_line_2: "asd dfgh sdfgf"
      },
      supplementary_data: [],
      cart_session: 4,
      reservation_id: "OP58CE1574231295",
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" }
    };
    component.checkoutData = JSON.parse(JSON.stringify(checkout));
    const idform = {
      value: {
        state: "abc",
        postalCode: 12345,
        city: "KL",
        addressLine1: "abbb cccc",
        addressLine2: "abbb cccc",
        address: "aaaabb"
      }
    };
    component.updatingUserInfo(idform, "onSubmit");
    const updateinfo = {
      salutation: null,
      email: null,
      typedEmail: null,
      validate: true
    };
    localStorage.setItem("updateInfo", JSON.stringify(updateinfo));
    component.updatingUserInfo(idform, "onSubmit");
    localStorage.setItem("updateInfo", JSON.stringify(updateinfo));
    component.updateprofileurl = "/rest/V1/update-profile/false";
    component.updatingUserInfo(idform, "onSubmit");
    localStorage.setItem("updateInfo", JSON.stringify(updateinfo));
    component.updateprofileurl = "/rest/V1/update-profile/error";
    component.updatingUserInfo(idform, "onSubmit");
    localStorage.removeItem("updateInfo");
    component.updatingUserInfo(idform, "onSubmit");
    component.navigateUrl = "#abc";
    component.updatingUserInfo(1, "setShippingAddress");
    component.reserveTimeOut = true;
    component.updatingUserInfo(1, "setShippingAddress");
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("GuestInfo");
  });
  it("show shipping address", () => {
    component.setShippingAddress(1);
    component.showBillingAddress = "existing";
    component.navigateUrl = "#abc";
    component.setShippingAddress(1);
    component.showBillingAddress = "existing";
    component.disableButton = false;
    const checkout = {
      id: 16031,
      created_at: "2019-11-20 06:28:18",
      updated_at: "2019-11-20 06:53:53",
      is_active: true,
      is_virtual: true,
      items: [
        {
          item_id: 42684,
          sku: "FPP",
          qty: 1,
          name: "Celcom Mobile Platinum Plus",
          price: 188,
          product_type: "virtual",
          quote_id: "16031"
        }
      ],
      items_count: 1,
      items_qty: 1,
      customer: {
        id: 3467,
        group_id: 1,
        default_billing: "10528",
        default_shipping: "10529",
        created_at: "2019-08-14 08:43:12",
        updated_at: "2019-11-20 06:53:53",
        created_in: "Default Store View",
        dob: "1990-10-01",
        email: "aam.122@mmmss.com",
        firstname: "abc",
        lastname: "ddd",
        gender: 1,
        store_id: 1,
        website_id: 1,
        addresses: [
          {
            id: 10135,
            customer_id: 3467,
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
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "8" }
            ]
          },
          {
            id: 10136,
            customer_id: 3467,
            region: {
              region_code: "NS",
              region: "Negeri Sembilan",
              region_id: 537
            },
            region_id: 537,
            country_id: "MY",
            street: ["adfhet gfghghrgset"],
            telephone: "0144255222",
            postcode: "34532",
            city: "wearety",
            firstname: "aabcd",
            lastname: "dfgfhhf",
            custom_attributes: [
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "90/1234" }
            ]
          },
          {
            id: 10137,
            customer_id: 3467,
            region: {
              region_code: "NS",
              region: "Negeri Sembilan",
              region_id: 537
            },
            region_id: 537,
            country_id: "MY",
            street: ["adfhet gfghghrgset"],
            telephone: "0144255222",
            postcode: "34532",
            city: "wearety",
            firstname: "aabcd",
            lastname: "dfgfhhf",
            custom_attributes: [
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "90/1234" }
            ]
          },
          {
            id: 10528,
            customer_id: 3467,
            region: { region_code: "MK", region: "Melaka", region_id: 536 },
            region_id: 536,
            country_id: "MY",
            street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
            telephone: "60128282222",
            postcode: "12211",
            city: "aabccc",
            firstname: "abc",
            lastname: "ddd",
            default_billing: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "12/1111-anccc" }
            ]
          },
          {
            id: 10529,
            customer_id: 3467,
            region: { region_code: "MK", region: "Melaka", region_id: 536 },
            region_id: 536,
            country_id: "MY",
            street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
            telephone: "60128282222",
            postcode: "12211",
            city: "aabccc",
            firstname: "abc",
            lastname: "ddd",
            default_shipping: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "12/1111-anccc" }
            ]
          }
        ],
        disable_auto_group_change: 0,
        extension_attributes: { is_subscribed: false },
        custom_attributes: [
          { attribute_code: "mobile_number", value: "60128282222" },
          { attribute_code: "id_type", value: "New NRIC" },
          { attribute_code: "id_number", value: "901001092878" },
          { attribute_code: "customer_full_name", value: "abc ddd" },
          { attribute_code: "salutation", value: "Mr" },
          { attribute_code: "customer_email_id", value: "aam.122@mmmss.com" }
        ]
      },
      billing_address: {
        address_id: "35440",
        quote_id: "16031",
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:28:18",
        customer_id: "3467",
        save_in_address_book: "0",
        customer_address_id: "10528",
        address_type: "billing",
        email: "aam.122@mmmss.com",
        prefix: null,
        firstname: "abc",
        middlename: null,
        lastname: "ddd",
        suffix: null,
        company: null,
        street: "asdfgf dsfgh\nasd dfgh sdfgf",
        city: "aabccc",
        region: "Melaka",
        region_id: "536",
        postcode: "12211",
        country_id: "MY",
        telephone: "60128282222",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: null,
        billing_unit_number: "12/1111-anccc",
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "0",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "188.0000",
        base_subtotal: "188.0000",
        subtotal_with_discount: "188.0000",
        base_subtotal_with_discount: "188.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "188.0000",
        base_grand_total: "188.0000",
        customer_notes: null,
        applied_taxes: "[]",
        discount_description: null,
        shipping_discount_amount: "0.0000",
        base_shipping_discount_amount: "0.0000",
        subtotal_incl_tax: "188.0000",
        base_subtotal_total_incl_tax: "188.0000",
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
        entity_id: "35440",
        region_code: "MK",
        address_line_1: "asdfgf dsfgh",
        address_line_2: "asd dfgh sdfgf"
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
          item_id: "42684",
          quantity: 1,
          reservation_id: "OP58CE1574231295",
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
          price: 188,
          itemTotal: "188.0000",
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
            orderPhoneNo: "0132612569",
            orderNumberType: "NewNumber",
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
            mnp_data: null,
            is_mnp: false
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
            "Great! You are one step closer to receiving a Welcome Gift from us. Complete your order now to get the reward.",
          esim: false
        }
      ],
      customerOtherInfo: {
        salutation: "Mr",
        unit_number: "12/1111-anccc",
        mobile_number: "60128282222",
        gender: "Male",
        customer_full_name: "abc ddd"
      },
      GST: "0.00",
      grossTotal: "188.00",
      itemsTotal: "1",
      simType: "Physical SIM",
      shipping_address: {
        address_id: "35441",
        quote_id: "16031",
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:28:18",
        customer_id: "3467",
        save_in_address_book: "0",
        customer_address_id: "10528",
        address_type: "shipping",
        email: "aam.122@mmmss.com",
        prefix: null,
        firstname: "abc",
        middlename: null,
        lastname: "ddd",
        suffix: null,
        company: null,
        street: "asdfgf dsfgh\nasd dfgh sdfgf",
        city: "aabccc",
        region: "Melaka",
        region_id: "536",
        postcode: "12211",
        country_id: "MY",
        telephone: "60128282222",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: "12/1111-anccc",
        billing_unit_number: null,
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
        entity_id: "35441",
        address_line_1: "asdfgf dsfgh",
        address_line_2: "asd dfgh sdfgf"
      },
      supplementary_data: [],
      cart_session: 4,
      reservation_id: "OP58CE1574231295",
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" }
    };
    component.checkoutData = JSON.parse(JSON.stringify(checkout));
    component.billingAddress = { city: "abc" };
    component.setShippingAddress(1);
    sessionStorage.setItem("UserToken", "abc");
    component.setBillingUrl = "/rest/V1/setBillingAsShipping/error";
    component.setShippingAddress(null);
  });
  it("onsubmit", () => {
    const formsample = { invalid: true };
    component.gotoOnSubmit(formsample);
    component.addshippingurl = "/rest/V1/addshipping/error";
    const idform = {
      value: {
        state: "abc",
        postalCode: 12345,
        city: "KL",
        addressLine1: "abbb cccc",
        addressLine2: "abbb cccc",
        address: "aaaabb"
      }
    };
    const userinf = {
      outputCPResp: {
        customerID: "901001092878",
        dateOfBirth: "19901001_000000",
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm",
        newGuestPhNo: 60128282222,
        contactFirstName: "abc",
        contactLastName: "ddd",
        salutation: "Mr",
        contactEmail: "aam.122@mmmss.com"
      }
    };
    sessionStorage.setItem("UserInfo", JSON.stringify(userinf));
    const guestinf = {
      blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "901001092878",
        customerIDTypeValue: "New NRIC"
      },
      outputCPResp: {
        customerID: "901001092878",
        dateOfBirth: "19901001_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }],
        preferredContactMethod: "Email",
        contactPreferredTime: "4:30pm to 8:30pm"
      }
    };
    sessionStorage.setItem("GuestInfo", JSON.stringify(guestinf));
    const checkout = {
      id: 16031,
      created_at: "2019-11-20 06:28:18",
      updated_at: "2019-11-20 06:53:53",
      is_active: true,
      is_virtual: true,
      items: [
        {
          item_id: 42684,
          sku: "FPP",
          qty: 1,
          name: "Celcom Mobile Platinum Plus",
          price: 188,
          product_type: "virtual",
          quote_id: "16031"
        }
      ],
      items_count: 1,
      items_qty: 1,
      customer: {
        id: 3467,
        group_id: 1,
        default_billing: "10528",
        default_shipping: "10529",
        created_at: "2019-08-14 08:43:12",
        updated_at: "2019-11-20 06:53:53",
        created_in: "Default Store View",
        dob: "1990-10-01",
        email: "aam.122@mmmss.com",
        firstname: "abc",
        lastname: "ddd",
        gender: 1,
        store_id: 1,
        website_id: 1,
        addresses: [
          {
            id: 10135,
            customer_id: 3467,
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
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "8" }
            ]
          },
          {
            id: 10136,
            customer_id: 3467,
            region: {
              region_code: "NS",
              region: "Negeri Sembilan",
              region_id: 537
            },
            region_id: 537,
            country_id: "MY",
            street: ["adfhet gfghghrgset"],
            telephone: "0144255222",
            postcode: "34532",
            city: "wearety",
            firstname: "aabcd",
            lastname: "dfgfhhf",
            custom_attributes: [
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "90/1234" }
            ]
          },
          {
            id: 10137,
            customer_id: 3467,
            region: {
              region_code: "NS",
              region: "Negeri Sembilan",
              region_id: 537
            },
            region_id: 537,
            country_id: "MY",
            street: ["adfhet gfghghrgset"],
            telephone: "0144255222",
            postcode: "34532",
            city: "wearety",
            firstname: "aabcd",
            lastname: "dfgfhhf",
            custom_attributes: [
              { attribute_code: "residence_type", value: "Landed" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "90/1234" }
            ]
          },
          {
            id: 10528,
            customer_id: 3467,
            region: { region_code: "MK", region: "Melaka", region_id: 536 },
            region_id: 536,
            country_id: "MY",
            street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
            telephone: "60128282222",
            postcode: "12211",
            city: "aabccc",
            firstname: "abc",
            lastname: "ddd",
            default_billing: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "12/1111-anccc" }
            ]
          },
          {
            id: 10529,
            customer_id: 3467,
            region: { region_code: "MK", region: "Melaka", region_id: 536 },
            region_id: 536,
            country_id: "MY",
            street: ["asdfgf dsfgh", "asd dfgh sdfgf"],
            telephone: "60128282222",
            postcode: "12211",
            city: "aabccc",
            firstname: "abc",
            lastname: "ddd",
            default_shipping: true,
            custom_attributes: [
              { attribute_code: "residence_type", value: "High-Rise" },
              { attribute_code: "salutation", value: "Mr" },
              { attribute_code: "unit_number", value: "12/1111-anccc" }
            ]
          }
        ],
        disable_auto_group_change: 0,
        extension_attributes: { is_subscribed: false },
        custom_attributes: [
          { attribute_code: "mobile_number", value: "60128282222" },
          { attribute_code: "id_type", value: "New NRIC" },
          { attribute_code: "id_number", value: "901001092878" },
          { attribute_code: "customer_full_name", value: "abc ddd" },
          { attribute_code: "salutation", value: "Mr" },
          { attribute_code: "customer_email_id", value: "aam.122@mmmss.com" }
        ]
      },
      billing_address: {
        address_id: "35440",
        quote_id: "16031",
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:28:18",
        customer_id: "3467",
        save_in_address_book: "0",
        customer_address_id: "10528",
        address_type: "billing",
        email: "aam.122@mmmss.com",
        prefix: null,
        firstname: "abc",
        middlename: null,
        lastname: "ddd",
        suffix: null,
        company: null,
        street: "asdfgf dsfgh\nasd dfgh sdfgf",
        city: "aabccc",
        region: "Melaka",
        region_id: "536",
        postcode: "12211",
        country_id: "MY",
        telephone: "60128282222",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: null,
        billing_unit_number: "12/1111-anccc",
        salutation: "Mr",
        residence_type: "High-Rise",
        same_as_billing: "0",
        collect_shipping_rates: "0",
        shipping_method: null,
        shipping_description: null,
        weight: "0.0000",
        subtotal: "188.0000",
        base_subtotal: "188.0000",
        subtotal_with_discount: "188.0000",
        base_subtotal_with_discount: "188.0000",
        tax_amount: "0.0000",
        base_tax_amount: "0.0000",
        shipping_amount: "0.0000",
        base_shipping_amount: "0.0000",
        shipping_tax_amount: "0.0000",
        base_shipping_tax_amount: "0.0000",
        discount_amount: "0.0000",
        base_discount_amount: "0.0000",
        grand_total: "188.0000",
        base_grand_total: "188.0000",
        customer_notes: null,
        applied_taxes: "[]",
        discount_description: null,
        shipping_discount_amount: "0.0000",
        base_shipping_discount_amount: "0.0000",
        subtotal_incl_tax: "188.0000",
        base_subtotal_total_incl_tax: "188.0000",
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
        entity_id: "35440",
        region_code: "MK",
        address_line_1: "asdfgf dsfgh",
        address_line_2: "asd dfgh sdfgf"
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
          item_id: "42684",
          quantity: 1,
          reservation_id: "OP58CE1574231295",
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
          price: 188,
          itemTotal: "188.0000",
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
            orderPhoneNo: "0132612569",
            orderNumberType: "NewNumber",
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
            mnp_data: null,
            is_mnp: false
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
            "Great! You are one step closer to receiving a Welcome Gift from us. Complete your order now to get the reward.",
          esim: false
        }
      ],
      customerOtherInfo: {
        salutation: "Mr",
        unit_number: "12/1111-anccc",
        mobile_number: "60128282222",
        gender: "Male",
        customer_full_name: "abc ddd"
      },
      GST: "0.00",
      grossTotal: "188.00",
      itemsTotal: "1",
      simType: "Physical SIM",
      shipping_address: {
        address_id: "35441",
        quote_id: "16031",
        created_at: "2019-11-20 06:28:18",
        updated_at: "2019-11-20 06:28:18",
        customer_id: "3467",
        save_in_address_book: "0",
        customer_address_id: "10528",
        address_type: "shipping",
        email: "aam.122@mmmss.com",
        prefix: null,
        firstname: "abc",
        middlename: null,
        lastname: "ddd",
        suffix: null,
        company: null,
        street: "asdfgf dsfgh\nasd dfgh sdfgf",
        city: "aabccc",
        region: "Melaka",
        region_id: "536",
        postcode: "12211",
        country_id: "MY",
        telephone: "60128282222",
        fax: null,
        virtual_shipping_id: null,
        shipping_unit_number: "12/1111-anccc",
        billing_unit_number: null,
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
        entity_id: "35441",
        address_line_1: "asdfgf dsfgh",
        address_line_2: "asd dfgh sdfgf"
      },
      supplementary_data: [],
      cart_session: 4,
      reservation_id: "OP58CE1574231295",
      tax: { total_tax: "0.00", items: [] },
      delivery_type: { value: 0, code: "standard" }
    };
    component.checkoutData = JSON.parse(JSON.stringify(checkout));
    component.gotoOnSubmit(idform);
    component.checkoutData.customerOtherInfo.salutation = null;
    component.userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    component.gotoOnSubmit(idform);
    component.userInfo.outputCPResp.salutation = null;
    component.gotoOnSubmit(idform);
    sessionStorage.removeItem("UserInfo");
    sessionStorage.removeItem("GuestInfo");
  });
});
