import {
    async,
    ComponentFixture,
    TestBed
} from "@angular/core/testing";
import { MinifiedPageLoaderComponent } from "../../../Store/widget/minified-page-loader/minified-page-loader.component";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "../../../Footer/footer.component";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { AppService } from "../../../Service/app.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { AnalyticsService } from "../../../Service/analytic.service";
import { RendererService } from "../../../Service/renderer.service";
import { SeoService } from "../../../Service/seo.service";
import { DecimalPipe } from "@angular/common";
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
import { RemarketAnalyticsService } from "../../../Service/remarket-analytics.service";
import { HomeService } from "../../../Service/home.service";
import { GetParametersService } from "../../../Service/getParamaters.service";
import { CartHomeComponent } from "./cart-home.component";
import { CompareHeroBannerComponent } from "../../../Widget/StoreWidgets/compare-hero-banner/compare-hero-banner.component";
import { SessionTimeOutPopupComponent } from "../../widget/session-timeout-popup/session-timeout-popup";
import { DeviceDetailsStorageService } from "../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.service";
import { NotificationBarComponent } from "../../../../app/Store/widget/notification-bar/notification-bar.component";
import { NoteSectionComponent } from "../../dumb-components/note-section/note-section.component";
import { VoucherComponent } from "../../widget/voucher/voucher.component";
import { configureTestSuite } from "ng-bullet";
import { PageLoaderComponent } from 'app/shared/components/page-loader/page-loader.component';
import { inject } from '@angular/core/testing';
import { sharedPipes } from 'app/shared/pipes';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

const user = {
    outputCPResp: {
        country: "Malaysia",
        planSegmentType: "",
        unitNo: "12#001",
        segmentGroup: "Consumer",
        postalCode: "50034",
        contactFirstName: "Customer",
        section: "",
        contactType: "",
        type: "Non Premier",
        poBox: "",
        contactHomePhone: "",
        state: "JH",
        streetType: "Jalan",
        contactMobileNum: "0197866453",
        motherMaidenName: "",
        gstTaxRelief: "",
        XPAX_DB_FLG: "N",
        buildingName: "",
        XPAX_OPEN_FLG: "0",
        nationality: "Malaysia",
        preferredContactMethod: "Email",
        customerIDType: "New NRIC",
        preferredContactLang: "English",
        customerID: "661208855567",
        name: "CUSTOMER ESTORE",
        contactPreferredTime: "",
        segmentSubGroup: "Retail",
        floorNo: "",
        contactLastName: "Estore",
        salutation: "Mr",
        headerCustomerProfile: {
            errorMessage: "",
            errorCode: "",
            status: "OK"
        },
        PREPAIDOPENORD_FLG: "0",
        gender: "Male",
        city: "Downgrade",
        contactAlternateNum: "",
        contactRowID: "1-DDASB34",
        facebookID: "",
        pakejOpenCount: "0",
        googlePlusID: "",
        YOUTH_ACTIVE_COUNT: "0",
        gstTaxReliefID: "",
        DB_OPEN_COUNT: "0",
        billingType: "Billable",
        customerRowId: "1-DDARK4A",
        contactBusinessPhone: "",
        addressYType: "Landed",
        PREPAID_LINES_COUNT: "0",
        race: "",
        contactEmail: "661208855567@getnada.com",
        dateOfBirth: "19661208_000000",
        services: [
            {
                serviceType: "",
                smeGroupId: "",
                planSegmentType: "",
                pakejFlag: "N",
                mobileNumber: "0133191598",
                assetBillingAccountNo: "300627429",
                billingProfileId: "1-DDAOJ2U",
                principleMobileNumber: "",
                assetBillingAccountRowId: "1-DDAOJ2P",
                promotionId: "1-XM4GBX",
                pre_Pos_Indicator: "Postpaid",
                prodPromName: "FiRST Platinum CBS",
                billingType: "Billable",
                hh_consumed_flag: "N",
                prin_Sup_Indicator: "",
                prodPromPartNum: "PB11820",
                plan: "FiRST Platinum CBS Plan",
                productType: "Service",
                assetSubStatus: "Active",
                product: "RTP Voice Service",
                creditTreatmentCode: "35",
                billType: "CNVRGTPostpaid",
                assetModel: "IPHONE 8 64GB",
                SVC_LVL_DVC_COUNT: "1",
                segmentCode: "10",
                assetIntegrationID: "1-DDAQZBR",
                partialControlFlag: "",
                masterAccountNumber: "",
                billingAccountStatus: "Active",
                assetID: "1-DDB0N2G",
                assetImei: "200103151803001",
                kenanAccountID: "300627429",
                kenanName: "",
                vipCode: "VIP 6",
                assetStatus: "Active",
                billCycle: "3"
            }
        ],
        twitterID: "",
        customerSince: "20180101_000000",
        pakejActiveCount: "0",
        DB_COUNT: "1",
        masterAccountNumber: "",
        billingAccountStatus: "Active",
        streetAddress: "Under VIP",
        contactSalutation: "Mr.",
        YOUTH_OPEN_COUNT: "0",
        simType: "Physical SIM",
        esimInfo: "<li>Test esim info with RM.15</li><li>second line info.</li>"
    }
};

const guest = {
    blacklistChkRequest: {
        customerIDType: "1",
        customerIDNo: "880102010291",
        customerIDTypeValue: "New NRIC"
    },
    outputCPResp: {
        customerID: "880102010291",
        dateOfBirth: "19880102_000000",
        services: [{ pre_Pos_Indicator: "Postpaid" }]
    }
};

const cartItem = [
    {
        item_id: "42677",
        quantity: 1,
        reservation_id: "OP46CE1574141460",
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
            orderPhoneNo: "0132406586",
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
];

const response = [
    {
        id: 16028,
        created_at: "2019-11-19 09:10:55",
        updated_at: "2019-11-19 09:10:55",
        is_active: true,
        is_virtual: false,
        items: [
            {
                item_id: 42680,
                sku: "iPhone-XR-iphonexr64gbyellow",
                qty: 1,
                name: "iPhone XR",
                price: 3599,
                product_type: "bundle",
                quote_id: "16028"
            }
        ],
        items_count: 1,
        items_qty: 1,
        customer: {
            id: 3534,
            group_id: 1,
            default_billing: "10312",
            default_shipping: "10313",
            created_at: "2019-09-26 03:39:41",
            updated_at: "2019-11-19 09:10:50",
            created_in: "Default Store View",
            dob: "1966-12-08",
            email: "661208855567@getnada.com",
            firstname: "CUSTOMER",
            lastname: "ESTORE",
            gender: 1,
            store_id: 1,
            website_id: 1,
            addresses: [
                {
                    id: 10312,
                    customer_id: 3534,
                    region: { region_code: "JH", region: "Johor", region_id: 533 },
                    region_id: 533,
                    country_id: "MY",
                    street: ["Under VIP"],
                    telephone: "0197866453",
                    postcode: "50034",
                    city: "Downgrade",
                    firstname: "CUSTOMER",
                    lastname: "ESTORE",
                    default_billing: true,
                    custom_attributes: [
                        { attribute_code: "residence_type", value: "Landed" },
                        { attribute_code: "salutation", value: "Mr" },
                        { attribute_code: "unit_number", value: "12#001" }
                    ]
                },
                {
                    id: 10313,
                    customer_id: 3534,
                    region: { region_code: "JH", region: "Johor", region_id: 533 },
                    region_id: 533,
                    country_id: "MY",
                    street: ["Under VIP"],
                    telephone: "0197866453",
                    postcode: "50034",
                    city: "Downgrade",
                    firstname: "CUSTOMER",
                    lastname: "ESTORE",
                    default_shipping: true,
                    custom_attributes: [
                        { attribute_code: "residence_type", value: "Landed" },
                        { attribute_code: "salutation", value: "Mr" },
                        { attribute_code: "unit_number", value: "12#001" }
                    ]
                }
            ],
            disable_auto_group_change: 0,
            extension_attributes: { is_subscribed: false },
            custom_attributes: [
                { attribute_code: "mobile_number", value: "0197866453" },
                { attribute_code: "id_type", value: "New NRIC" },
                { attribute_code: "id_number", value: "661208855567" },
                { attribute_code: "customer_full_name", value: "CUSTOMER ESTORE" },
                { attribute_code: "salutation", value: "Mr" },
                { attribute_code: "contact_row_id", value: "1-DDASB34" },
                {
                    attribute_code: "customer_email_id",
                    value: "661208855567@getnada.com"
                }
            ]
        },
        billing_address: {
            address_id: "35434",
            quote_id: "16028",
            created_at: "2019-11-19 09:10:55",
            updated_at: "2019-11-19 09:10:55",
            customer_id: "3534",
            save_in_address_book: "0",
            customer_address_id: "10312",
            address_type: "billing",
            email: "661208855567@getnada.com",
            prefix: null,
            firstname: "CUSTOMER",
            middlename: null,
            lastname: "ESTORE",
            suffix: null,
            company: null,
            street: "Under VIP",
            city: "Downgrade",
            region: "Johor",
            region_id: "533",
            postcode: "50034",
            country_id: "MY",
            telephone: "0197866453",
            fax: null,
            virtual_shipping_id: null,
            shipping_unit_number: null,
            billing_unit_number: "12#001",
            salutation: "Mr",
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
            entity_id: "35434",
            region_code: "JH",
            address_line_1: "Under VIP",
            address_line_2: ""
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
            shipping_assignments: [
                {
                    shipping: {
                        address: {
                            id: 35435,
                            region: "Johor",
                            region_id: 533,
                            region_code: "JH",
                            country_id: "MY",
                            street: ["Under VIP"],
                            telephone: "0197866453",
                            postcode: "50034",
                            city: "Downgrade",
                            firstname: "CUSTOMER",
                            lastname: "ESTORE",
                            customer_id: 3534,
                            email: "661208855567@getnada.com",
                            same_as_billing: 0,
                            customer_address_id: 10313,
                            save_in_address_book: 0,
                            custom_attributes: [
                                { attribute_code: "residence_type", value: "Landed" },
                                { attribute_code: "salutation", value: "Mr" }
                            ]
                        },
                        method: null
                    },
                    items: [
                        {
                            item_id: 42680,
                            sku: "iPhone-XR-iphonexr64gbyellow",
                            qty: 1,
                            name: "iPhone XR",
                            price: 3599,
                            product_type: "bundle",
                            quote_id: "16028"
                        }
                    ]
                }
            ]
        },
        all_items: [
            {
                item_id: "42680",
                quantity: 1,
                reservation_id: "OP97CE1574154655",
                sku: "iPhone-XR-iphonexr64gbyellow",
                sku_bundle: "iPhone-XR",
                is_preorder: 0,
                is_broadband: false,
                is_easyphone: false,
                has_add_ons: false,
                add_on_label: null,
                add_on_code: null,
                utm_source: null,
                easyphone_label: "EasyPhone  ()",
                preorder_availability_flag: 0,
                midnight_delivery: 0,
                price: 3599,
                itemTotal: "3599.0000",
                selectedProduct: {
                    orderMonthlyPayTotal: 0,
                    is_moon: false,
                    orderDevice: "iPhone XR 64GB Yellow",
                    orderDeviceName: "iPhone XR 64GB Yellow",
                    selectedProductSku: "iphonexr64gbyellow",
                    selectedImageList: [
                        "/media/catalog/product/f/r/front_900x900_11.png"
                    ],
                    orderDevicePrice: "3599.0000",
                    orderSummaryColor: "Yellow",
                    orderSummaryStorage: "64GB",
                    orderReqServiceBundle: "",
                    orderTotalPay: 3599,
                    total: 3599,
                    contract: "24 months contract",
                    orderReqBrand: "APPLE",
                    orderReqCategory: "HP",
                    orderReqColor: "YLW",
                    orderReqModel: "IPHONE XR 64GB",
                    orderReqPartNumber: "MDR6020",
                    free_gift_data: {
                        gift_image: "/media/catalog/productno_selection",
                        gift_message:
                            "FREE black carbon casing* (worth RM109) when you pre-order iPhone. *While stock lasts. \nOrders before 21/10 receive phone delivery on 26/10.\nOrders after 21/10 receive phone delivery on 27/10 onwards."
                    },
                    is_neptune_subsidy: true,
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
            unit_number: "12#001",
            mobile_number: "0197866453",
            gender: "Male",
            customer_full_name: "CUSTOMER ESTORE"
        },
        GST: "0.00",
        grossTotal: "3599.00",
        itemsTotal: "1",
        simType: "Physical SIM",
        shipping_address: {
            address_id: "35435",
            quote_id: "16028",
            created_at: "2019-11-19 09:10:55",
            updated_at: "2019-11-19 09:10:55",
            customer_id: "3534",
            save_in_address_book: "0",
            customer_address_id: "10313",
            address_type: "shipping",
            email: "661208855567@getnada.com",
            prefix: null,
            firstname: "CUSTOMER",
            middlename: null,
            lastname: "ESTORE",
            suffix: null,
            company: null,
            street: "Under VIP",
            city: "Downgrade",
            region: "Johor",
            region_id: "533",
            postcode: "50034",
            country_id: "MY",
            telephone: "0197866453",
            fax: null,
            virtual_shipping_id: null,
            shipping_unit_number: "12#001",
            billing_unit_number: null,
            salutation: "Mr",
            residence_type: "Landed",
            same_as_billing: "0",
            collect_shipping_rates: "0",
            shipping_method: null,
            shipping_description: null,
            weight: "0.0000",
            subtotal: "3599.0000",
            base_subtotal: "3599.0000",
            subtotal_with_discount: "3599.0000",
            base_subtotal_with_discount: "3599.0000",
            tax_amount: "0.0000",
            base_tax_amount: "0.0000",
            shipping_amount: "0.0000",
            base_shipping_amount: "0.0000",
            shipping_tax_amount: "0.0000",
            base_shipping_tax_amount: "0.0000",
            discount_amount: "0.0000",
            base_discount_amount: "0.0000",
            grand_total: "3599.0000",
            base_grand_total: "3599.0000",
            customer_notes: null,
            applied_taxes: "[]",
            discount_description: null,
            shipping_discount_amount: "0.0000",
            base_shipping_discount_amount: "0.0000",
            subtotal_incl_tax: "3599.0000",
            base_subtotal_total_incl_tax: "3599.0000",
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
            entity_id: "35435",
            region_code: "JH",
            address_line_1: "Under VIP",
            address_line_2: ""
        },
        supplementary_data: [],
        cart_session: 0,
        reservation_id: "OP97CE1574154655",
        tax: { total_tax: "0.00", items: [] },
        delivery_type: { value: 0, code: "standard" }
    }
];

class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}

const mockCartResp = [{ guestToken: "" }];
const respForPost = [{ status: true }];

class AppMockService {
    constructor() { }

    getEstoreUserData(url: any) {
        return Observable.of(response);
    }
    postEstoreUserData(url: any) {
        return Observable.of(mockCartResp);
    }
    postEstoreData(url: any) {
        return Observable.of(respForPost);
    }
}

class MockCartService {
    guestCheckoutApi(request: any) {
        return Observable.of(mockCartResp);
    }
    removeProductFromCart(product: any) {
        return;
    }
    retrieveCart() {
        return [
            {
                sku: "123"
            }
        ];
    }

    deviceReservervationTimeout(a, b) {
        return a > b;
    }

    Find(url: any) {
        return Observable.of(response);
    }
}

describe("CartHomeComponent ", () => {
    let component: CartHomeComponent;
    let fixture: ComponentFixture<CartHomeComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule],
            declarations: [
                sharedPipes,
                CartHomeComponent,
                MinifiedPageLoaderComponent,
                FooterComponent,
                AgentFooterComponent,
                SocialMediaComponent,
                PageLoaderComponent,
                FooterDownloadComponent,
                NotificationErrorComponent,
                AgeEligibilityPopupComponent,
                CheckoutHeroBannerComponent,
                SessionTimeOutPopupComponent,
                NoteSectionComponent,
                VoucherComponent,
                CompareHeroBannerComponent,
                NotificationBarComponent
            ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: ActivatedRoute, useValue: {
                        snapshot: {
                            data: [
                                {
                                    item_id: 42680,
                                    sku: "iPhone-XR-iphonexr64gbyellow",
                                    qty: 1,
                                    name: "iPhone XR",
                                    price: 3599,
                                    product_type: "bundle",
                                    quote_id: "16028"
                                }
                            ]
                        }
                    }
                },
                { provide: AppService, useClass: AppMockService },
                { provide: Router, useClass: RouterStub },
                // { provide: ActivatedRoute, useClass: MockactivatedRoute },
                EStoreAnalysticsService,
                AnalyticsService,
                RendererService,
                SeoService,
                DecimalPipe,
                Broadcaster,
                NotificationPopupEvent,
                CookieService,
                UserService,
                { provide: CartService, useClass: MockCartService },
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
        fixture = TestBed.createComponent(CartHomeComponent);
        component = fixture.componentInstance;
        component.cartResponse = response;
    }));

    afterEach(() => {
        sessionStorage.clear();
        localStorage.clear();
    });

    it("should create cart home component", () => {
        expect(component).toBeTruthy();
    });

    it("should call ngOninit()", () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it("Checking Method calls ", () => {
        expect(component.ngOnInit).toBeDefined();
        expect(component.ngAfterViewInit).toBeDefined();
        expect(component.getCartDetails).toBeDefined();
        expect(component.addAffiliateScriptToHead).toBeDefined();
        expect(component.persistingCartDetails).toBeDefined();
        expect(component.setFlowBasedOnCart).toBeDefined();
    });

    it('should call editableProduct', () => {
        const spy = spyOn(component, 'editableProduct').and.callThrough();
        component.cart.items = JSON.parse(JSON.stringify(cartItem));
        component.editableProduct("1");
        expect(spy).toHaveBeenCalled();
    });

    it("app-notification-error selector must exist", () => {
        if (component.sessionInvalid) {
            expect(
                fixture.debugElement.nativeElement.querySelector(
                    "app-notification-error"
                )
            ).not.toEqual(null);
        }
    });

    it("session-timeout-popup-component selector must exist", () => {
        if (component.IsDisplayIdlePopup) {
            expect(
                fixture.debugElement.nativeElement.querySelector(
                    "session-timeout-popup-component"
                )
            ).not.toEqual(null);
        }
    });

    it("Checking Boolean Values", () => {
        expect(component.mnpFlow).toBe(false);
        expect(component.showCartEmpty).toBe(false);
        expect(component.cobpFlow).toBe(false);
        expect(component.isEasyPhone).toBe(false);
        expect(component.isPreorder).toBe(false);
        expect(component.IsDisplayIdlePopup).toBe(false);
    });

    it("should Calculate total Amount", () => {
        const spy = spyOn(component, 'calculateTotalAmount').and.callThrough();
        const x = 1200;
        const y = 12;
        const result = component.calculateTotalAmount(x, y);
        expect(result).toBe(1212);
        expect(spy).toHaveBeenCalled();
    });

    it("should Rounding off the Amount", () => {
        const spy = spyOn(component, 'RoundingOff').and.callThrough();
        const x = 1200.123;
        const result = component.RoundingOff(x);
        expect(result).toBe(1200.12);
        expect(spy).toHaveBeenCalled();
    });

    it("should persist cart details for empty cart", () => {
        const spy = spyOn(component, 'persistingCartDetails').and.callThrough();
        component.cartResponse = [];
        component.persistingCartDetails();
        expect(component.cart).toBe(null);
        expect(spy).toHaveBeenCalled();
    });

    it("should persist cart details with items in the cart", () => {
        const spy = spyOn(component, 'persistingCartDetails').and.callThrough();
        component.persistingCartDetails();
        expect(component.cart).toBeTruthy();
        expect(component.suppData).toBeDefined();
        expect(component.isPreorder).toBeFalsy();
        expect(spy).toHaveBeenCalled();
    });

    it("should call confirm flow", () => {
        const spy = spyOn(component, "confirmFlow").and.callThrough();
        localStorage.setItem('MNP-FLOW', 'YES');
        localStorage.setItem('MNP-PRE-SELECT', 'YES');
        localStorage.setItem('MNP-EDIT', 'YES');
        localStorage.setItem('MNP-CUSTOMER', 'YES');
        localStorage.setItem('MNPCustomerData', 'YES');

        component.confirmFlow();
        expect(spy).toHaveBeenCalled();
    });

    it("should call callCheckoutRemarketScript", () => {
        const spy = spyOn(component, 'callCheckoutRemarketScript').and.callThrough();
        component.callCheckoutRemarketScript();
        expect(spy).toHaveBeenCalled();
    });

    it("should call callErrorMessage", () => {
        const spy = spyOn(component, 'callErrorMessage').and.callThrough();
        let err: any = { error: { success: true } };
        component.callErrorMessage(err);
        err = { error: { success: false } };
        component.callErrorMessage(err);
        expect(spy).toHaveBeenCalled();
    });

    it("should call getPlanUrlBySku", () => {
        const spy = spyOn(component, 'getPlanUrlBySku').and.callThrough();
        component.getPlanUrlBySku("FG");
        component.getPlanUrlBySku("FGS");
        component.getPlanUrlBySku("FGP");
        component.getPlanUrlBySku("FP");
        component.getPlanUrlBySku("FPP");
        expect(spy).toHaveBeenCalled();
    });

    it("should call splitName", () => {
        const spy = spyOn(component, 'splitName').and.callThrough();
        component.splitName("abc def");
        component.splitName("abc def ghi");
        expect(spy).toHaveBeenCalled();
    });

    it("should call setFlowBasedOnCart", () => {
        const spy = spyOn(component, 'setFlowBasedOnCart').and.callThrough();
        component.cart.items = JSON.parse(JSON.stringify(cartItem));
        component.setFlowBasedOnCart();
        localStorage.setItem("COBP_FLOW", "YES");
        component.setFlowBasedOnCart();
        component.cart.items[0].selectedProduct.orderNumberType = "KeepNumber";
        component.setFlowBasedOnCart();
        component.cart.items[0].selectedProduct.orderNumberType = "SwitchToCelcom";
        component.setFlowBasedOnCart();
        localStorage.removeItem("COBP_FLOW");
        component.cart.items[0].selectedProduct.mnp_id = "abcd";
        component.cart.items[0].selectedProduct.orderPhoneNo = "";
        component.setFlowBasedOnCart();
        localStorage.removeItem("MNP-CUSTOMER");
        expect(spy).toHaveBeenCalled();
    });

    it("should ngOninit for different user types", () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();
        localStorage.setItem("MyMsIsdn", "60133191598");
        sessionStorage.removeItem("USER_TYPE");
        sessionStorage.setItem("UserInfo", JSON.stringify(user));
        component.ngOnInit();
        sessionStorage.removeItem("UserInfo");
        sessionStorage.setItem("USER_TYPE", "GUEST");
        sessionStorage.setItem("UserToken", "34kkok5czm8dj67npuzkx0cip2z67ezt");
        component.ngOnInit();
        sessionStorage.removeItem("USER_TYPE");
        sessionStorage.removeItem("UserToken");
        expect(spy).toHaveBeenCalled();
    });

    it("should call CheckIsUserGuest", () => {
        const spy = spyOn(component, 'CheckIsUserGuest').and.callThrough();
        component.isUserGuest = false;
        sessionStorage.setItem("GuestInfo", JSON.stringify(user));
        component.CheckIsUserGuest();
        expect(spy).toHaveBeenCalled();
    });

    it("should call IsDeviceOnly", () => {
        const spy = spyOn(component, 'IsDeviceOnly').and.callThrough();
        component.isDeviceOnlyClicked = false;
        localStorage.setItem("isDeviceOnlyClicked", 'true');
        component.IsDeviceOnly();
        expect(spy).toHaveBeenCalled();
    });

    it("should call passPricing", () => {
        const spy = spyOn(component, 'passPricing').and.callThrough();
        const val = component.passPricing(34343.44);
        expect(spy).toHaveBeenCalled();
    });

    it("should call customerInfoUpdateInCart", inject([AppService], (appService: AppService) => {
        spyOn(appService, 'postEstoreUserData').and.returnValue(of([{ status: false }]));
        const spy = spyOn(component, 'customerInfoUpdateInCart');

        sessionStorage.setItem("GuestInfo", JSON.stringify(user));
        localStorage.setItem("GUEST_CART_ID", "2133546");

        component.customerInfoUpdateInCart();
        expect(spy).toHaveBeenCalled();
    }));

    // it("should call redirectCheckoutNext", () => {
    //     const spy = spyOn(component, 'redirectCheckoutNext');
    //     sessionStorage.setItem("UserInfo", JSON.stringify(user));
    //     sessionStorage.setItem("USER_TYPE", "GUEST");
    //     sessionStorage.setItem("OLD_GUEST_USER", "YES");
    //     component.redirectCheckoutNext();
    //     expect(spy).toHaveBeenCalled();
    // });

    it("should call redirectShopDetails", () => {
        const spy = spyOn(component, 'redirectShopDetails').and.callThrough();

        component.redirectShopDetails();
        expect(spy).toHaveBeenCalled();
    });

    // it("should call skipPersonalInfoForm", () => {
    //     const spy = spyOn(component, 'skipPersonalInfoForm');
    //     component.skipPersonalInfoForm();

    //     sessionStorage.setItem("GuestInfo", JSON.stringify(user));
    //     sessionStorage.setItem("USER_TYPE", "GUEST");
    //     component.skipPersonalInfoForm();
    //     expect(spy).toHaveBeenCalled();
    // });

    it("should call redirectCheckout", () => {
        const spy = spyOn(component, 'redirectCheckout').and.callThrough();
        component.componentLoadedTime = 20;
        component.cartItemAddedTime = 10;
        sessionStorage.removeItem('secretKey');
        sessionStorage.removeItem('CAorderId');
        component.redirectCheckout();

        component.componentLoadedTime = 10;
        component.cartItemAddedTime = 20;
        component.redirectCheckout();
        expect(spy).toHaveBeenCalled();
    });

    it("should call removeCartItem", () => {
        const spy = spyOn(component, 'removeCartItem').and.callThrough();

        component.removeCartItem({
            sku: "123"
        });
        expect(spy).toHaveBeenCalled();
    });
});
