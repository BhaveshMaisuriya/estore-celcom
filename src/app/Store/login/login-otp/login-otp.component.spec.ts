import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MinifiedPageLoaderComponent } from '../../../Store/widget/minified-page-loader/minified-page-loader.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../../../Footer/footer.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { SocialMediaComponent } from '../../../Footer/SocialMedia/socialmedia.component';
import { FooterDownloadComponent } from '../../../Footer/Download/download.component';
import { AppService } from '../../../Service/app.service';
import { AppMockService } from '../../../Service/appmock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../Service/user.service';
import { LoginOtpComponent } from './login-otp.component';
import { CartService } from '../../../Service/cart.service';
import { BundleService } from '../../../Service/bundle.service';
import { OrderInfoService } from '../../../Service/orderinfo.service';
import { HeaderService } from '../../../Header/header.service';
import { RedirectionService } from '../../../Service/redirection.service';
import { SupplimentaryLinesService } from '../../widget/supplementary-lines/supplementary-lines.service';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BroadbandService } from '../../../Service/broadband.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { ProductService } from '../../../Service/product.service';
import { PlanPurchaseService } from '../../plan/plan-purchase/plan-purchase.service';
import { configureTestSuite } from 'ng-bullet';
import { sharedPipes } from 'app/shared/pipes';
import { of } from 'rxjs';

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

const mockResponse =  {
    "status": true,
    "valid": true,
    "user_token": "01obg1fbmxmmzqxpj7kieyn7g5s76zvc",
    "message": "Customer Updated",
    "customer_data": {
        "country": "Malaysia",
        "planSegmentType": "",
        "unitNo": "11-4",
        "segmentGroup": "Consumer",
        "postalCode": "50411",
        "contactFirstName": "DOJI",
        "section": "",
        "contactType": "",
        "type": "Non Premier",
        "poBox": "",
        "contactHomePhone": "",
        "state": "WP",
        "streetType": "Jalan",
        "contactMobileNum": "0115143124",
        "motherMaidenName": "",
        "gstTaxRelief": "",
        "XPAX_DB_FLG": "N",
        "buildingName": "",
        "XPAX_OPEN_FLG": "0",
        "nationality": "Malaysia",
        "preferredContactMethod": "Email",
        "customerIDType": "New NRIC",
        "preferredContactLang": "English",
        "customerID": "881212432154",
        "name": "DOJI TTA",
        "contactPreferredTime": "4:30pm to 8:30pm",
        "segmentSubGroup": "Retail",
        "floorNo": "",
        "contactLastName": "TTA",
        "salutation": "Mr",
        "headerCustomerProfile": {
            "errorMessage": "",
            "errorCode": "",
            "status": "OK"
        },
        "PREPAIDOPENORD_FLG": "0",
        "gender": "Male",
        "city": "Kuala Lumpur",
        "contactAlternateNum": "",
        "contactRowID": "1-8Y1HJJ2",
        "facebookID": "",
        "pakejOpenCount": "0",
        "googlePlusID": "",
        "YOUTH_ACTIVE_COUNT": "0",
        "gstTaxReliefID": "",
        "DB_OPEN_COUNT": "0",
        "billingType": "Billable",
        "customerRowId": "1-8Y1HKBG",
        "contactBusinessPhone": "",
        "addressYType": "High-Rise",
        "PREPAID_LINES_COUNT": "0",
        "race": "",
        "contactEmail": "881212432154@getnada.com",
        "dateOfBirth": "19881212_000000",
        "services": [
            {
                "serviceType": "",
                "smeGroupId": "",
                "planSegmentType": "",
                "pakejFlag": "N",
                "mobileNumber": "0132046407",
                "assetBillingAccountNo": "300601069",
                "billingProfileId": "1-8Y1GVVU",
                "principleMobileNumber": "",
                "assetBillingAccountRowId": "1-8Y1GVVP",
                "promotionId": "1-XYUNQP",
                "pre_Pos_Indicator": "Postpaid",
                "prodPromName": "FiRST Gold Plus CBS",
                "billingType": "Billable",
                "hh_consumed_flag": "N",
                "prin_Sup_Indicator": "",
                "prodPromPartNum": "PB12070",
                "plan": "FiRST Gold Plus CBS Plan",
                "productType": "Service",
                "assetSubStatus": "Active",
                "product": "RTP Voice Service",
                "creditTreatmentCode": "6",
                "billType": "CNVRGTPostpaid",
                "assetModel": "",
                "SVC_LVL_DVC_COUNT": "0",
                "segmentCode": "10",
                "assetIntegrationID": "1-8Y1H46D",
                "partialControlFlag": "",
                "masterAccountNumber": "",
                "billingAccountStatus": "Active",
                "assetID": "1-8Y1HU5Q",
                "assetImei": "",
                "kenanAccountID": "300601069",
                "kenanName": "",
                "vipCode": "VIP 5",
                "assetStatus": "Active",
                "billCycle": "28"
            },
            {
                "serviceType": "",
                "smeGroupId": "",
                "planSegmentType": "",
                "pakejFlag": "N",
                "mobileNumber": "0132876952",
                "assetBillingAccountNo": "300601325",
                "billingProfileId": "1-8Y1YQTD",
                "principleMobileNumber": "",
                "assetBillingAccountRowId": "1-8Y1YQT8",
                "promotionId": "1-XMK1EL",
                "pre_Pos_Indicator": "Postpaid",
                "prodPromName": "FiRST Platinum Plus CBS",
                "billingType": "Billable",
                "hh_consumed_flag": "N",
                "prin_Sup_Indicator": "",
                "prodPromPartNum": "PB11860",
                "plan": "FiRST Platinum Plus CBS Plan",
                "productType": "Service",
                "assetSubStatus": "Active",
                "product": "RTP Voice Service",
                "creditTreatmentCode": "35",
                "billType": "CNVRGTPostpaid",
                "assetModel": "",
                "SVC_LVL_DVC_COUNT": "0",
                "segmentCode": "10",
                "assetIntegrationID": "1-8Y1Z2WL",
                "partialControlFlag": "",
                "masterAccountNumber": "",
                "billingAccountStatus": "Active",
                "assetID": "1-8Y1ZLOD",
                "assetImei": "",
                "kenanAccountID": "300601325",
                "kenanName": "",
                "vipCode": "VIP 5",
                "assetStatus": "Active",
                "billCycle": "3"
            }
        ],
        "twitterID": "",
        "customerSince": "20190119_000000",
        "pakejActiveCount": "0",
        "DB_COUNT": "0",
        "masterAccountNumber": "",
        "billingAccountStatus": "Active",
        "streetAddress": "safafaf",
        "contactSalutation": "Mr.",
        "YOUTH_OPEN_COUNT": "0"
    },
    "authtoken": "e2ac71e3e50a6b9e089f21f35b1c86704b913db84c7c47fef81d4eb0e1ef2e377f616d9b31deb15d2724e749c90e58c8309b77765db5a2c0d9dc18b0b06c0471aea30952e405da1068a0fdaf74e1068a3d4184db85111065c57be22fe951f55b3919ea10ee96b9b0de2bbdd944ff141119b5467cf738d5f13a65997c866518a41613c9b0ceb714fd479afcb28295e5fc80e638220f4d72c8e5acb1db9d55d7fccf3403c869feec2e355dd253dd80419269c4b9f82e195c3961dd8ecb5fcc374b264494a91d994582e9783bbb670b9d4a6915f6302f3dc58b88486a55"
};

const mockSelectedProduct = {
    "orderDevice": "Huawei-P20",
    "selectedProductSku": "HuaweiP20128GBPink",
    "orderDeviceName": "Huawei P20",
    "selectedImageList": [
        "/media/catalog/product/9/0/900x900_5_20.png"
    ],
    "orderSummaryStorage": "128GB",
    "orderSummaryColor": "Pink",
    "orderPhoneNo": "0132058549",
    "eligibilty": null,
    "orderPlan": "FPP",
    "selectedPlanDetails": {
        "name": "First™ Platinum Plus",
        "sku": "FPP",
        "monthlyPlan": "188.0000",
        "orderPlanBundle": "PB11860",
        "orderServiceBundle": "RTP0010",
        "PlanMonthlyPay": "188.0000",
        "OneTimePayment": null,
        "newCustomer": "0",
        "segment": "10",
        "upfrontInstallment": null,
        "contract": "24",
        "PlanName": "First™ Platinum Plus",
        "plan_title": "First™ Platinum Plus",
        "plan_subtitle": "Happiness unlimited. Sign up for 12 months and get extra privileges.",
        "banner_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg",
        "mobile_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg",
        "footNote": null,
        "upper_age_limit": null,
        "lower_age_limit": "18",
        "ngn_part_number": "PB11900",
        "is_xpax": false,
        "additional_information": null,
        "productType": "Service",
        "startDate": null,
        "endDate": null,
        "backgroundColor": "is-bg-color-black",
        "indicatorClass": "is-level-platinum-plus",
        "productText": "Platinum Plus",
        "keyFiguresText": "100 GB",
        "keyText": "RM 188",
        "buyNowLink": "/plans/first-platinum-plus",
        "buyNowText": "Buy now",
        "knowMoreLink": "/store/plans/first-platinum-plus",
        "knowMoreText": "Learn more",
        "mobileDescription": null,
        "tableInfo": [],
        "termsAndCondition": {
            "plans": {
                "label": "Plans",
                "desc": null
            },
            "contractTerms": {
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
        "is_premium_plan": false,
        "AtrHref": "#rm-3",
        "atrHref": "#rm-7",
        "bundleData": "0",
        "bundleUpfrontData": "1500"
    },
    "orderPlanName": "First™ Platinum Plus",
    "orderDevicePrice": "0",
    "orderMonthlyPay": "188.0000",
    "orderOneTimePay": "1500",
    "orderTotalPay": 1500,
    "orderNumberType": "NewNumber",
    "total": 1500,
    "stockDetails": {
        "status": "In Stock",
        "data": {
            "bundleSku": "",
            "simpleSku": "HuaweiP20128GBPink",
            "sku": ""
        }
    },
    "orderReqCategory": "HP",
    "orderReqModel": "P20 128GB",
    "orderReqBrand": "HUAWEI",
    "orderReqColor": "PNK",
    "orderReqPartNumber": "MDR5667",
    "orderReqPlanBundle": "PB11860",
    "orderReqServiceBundle": "RTP0010",
    "orderMoon": false
};

const mockCartMineResponse = [
    {
        "id": 24669,
        "created_at": "2019-09-18 04:58:36",
        "updated_at": "2019-09-18 04:58:37",
        "is_active": true,
        "is_virtual": false,
        "items": [
            {
                "item_id": 68810,
                "sku": "Huawei-P20-HuaweiP20128GBPink-FPP",
                "qty": 1,
                "name": "Huawei P20",
                "price": 1500,
                "product_type": "bundle",
                "quote_id": "24669"
            }
        ],
        "items_count": 1,
        "items_qty": 1,
        "customer": {
            "id": 3447,
            "group_id": 1,
            "default_billing": "10088",
            "default_shipping": "10089",
            "created_at": "2019-08-07 07:12:47",
            "updated_at": "2019-09-18 04:57:48",
            "created_in": "Default Store View",
            "dob": "1988-12-12",
            "email": "881212432154@getnada.com",
            "firstname": "DOJI",
            "lastname": "TTA",
            "gender": 1,
            "store_id": 1,
            "website_id": 1,
            "addresses": [
                {
                    "id": 10088,
                    "customer_id": 3447,
                    "region": {
                        "region_code": "WP",
                        "region": "WP Kuala Lumpur",
                        "region_id": 546
                    },
                    "region_id": 546,
                    "country_id": "MY",
                    "street": [
                        "safafaf"
                    ],
                    "telephone": "0115143124",
                    "postcode": "50411",
                    "city": "Kuala Lumpur",
                    "firstname": "DOJI",
                    "lastname": "TTA",
                    "default_billing": true,
                    "custom_attributes": [
                        {
                            "attribute_code": "residence_type",
                            "value": "High-Rise"
                        },
                        {
                            "attribute_code": "salutation",
                            "value": "Mr"
                        },
                        {
                            "attribute_code": "unit_number",
                            "value": "11-4"
                        }
                    ]
                },
                {
                    "id": 10089,
                    "customer_id": 3447,
                    "region": {
                        "region_code": "WP",
                        "region": "WP Kuala Lumpur",
                        "region_id": 546
                    },
                    "region_id": 546,
                    "country_id": "MY",
                    "street": [
                        "safafaf"
                    ],
                    "telephone": "0115143124",
                    "postcode": "50411",
                    "city": "Kuala Lumpur",
                    "firstname": "DOJI",
                    "lastname": "TTA",
                    "default_shipping": true,
                    "custom_attributes": [
                        {
                            "attribute_code": "residence_type",
                            "value": "High-Rise"
                        },
                        {
                            "attribute_code": "salutation",
                            "value": "Mr"
                        },
                        {
                            "attribute_code": "unit_number",
                            "value": "11-4"
                        }
                    ]
                }
            ],
            "disable_auto_group_change": 0,
            "extension_attributes": {
                "is_subscribed": false
            },
            "custom_attributes": [
                {
                    "attribute_code": "mobile_number",
                    "value": "0115143124"
                },
                {
                    "attribute_code": "id_type",
                    "value": "New NRIC"
                },
                {
                    "attribute_code": "id_number",
                    "value": "881212432154"
                },
                {
                    "attribute_code": "customer_full_name",
                    "value": "DOJI TTA"
                },
                {
                    "attribute_code": "salutation",
                    "value": "Mr"
                },
                {
                    "attribute_code": "contact_row_id",
                    "value": "1-8Y1HJJ2"
                }
            ]
        },
        "billing_address": {
            "address_id": "52437",
            "quote_id": "24669",
            "created_at": "2019-09-18 04:58:37",
            "updated_at": "2019-09-18 04:58:37",
            "customer_id": "3447",
            "save_in_address_book": "0",
            "customer_address_id": "10088",
            "address_type": "billing",
            "email": "881212432154@getnada.com",
            "prefix": null,
            "firstname": "DOJI",
            "middlename": null,
            "lastname": "TTA",
            "suffix": null,
            "company": null,
            "street": "safafaf",
            "city": "Kuala Lumpur",
            "region": "WP Kuala Lumpur",
            "region_id": "546",
            "postcode": "50411",
            "country_id": "MY",
            "telephone": "0115143124",
            "fax": null,
            "virtual_shipping_id": null,
            "shipping_unit_number": null,
            "billing_unit_number": "11-4",
            "salutation": "Mr",
            "residence_type": "High-Rise",
            "same_as_billing": "0",
            "collect_shipping_rates": "0",
            "shipping_method": null,
            "shipping_description": null,
            "weight": "0.0000",
            "subtotal": "0.0000",
            "base_subtotal": "0.0000",
            "subtotal_with_discount": "0.0000",
            "base_subtotal_with_discount": "0.0000",
            "tax_amount": "0.0000",
            "base_tax_amount": "0.0000",
            "shipping_amount": "0.0000",
            "base_shipping_amount": "0.0000",
            "shipping_tax_amount": "0.0000",
            "base_shipping_tax_amount": "0.0000",
            "discount_amount": "0.0000",
            "base_discount_amount": "0.0000",
            "grand_total": "0.0000",
            "base_grand_total": "0.0000",
            "customer_notes": null,
            "applied_taxes": "null",
            "discount_description": null,
            "shipping_discount_amount": null,
            "base_shipping_discount_amount": null,
            "subtotal_incl_tax": "0.0000",
            "base_subtotal_total_incl_tax": null,
            "discount_tax_compensation_amount": "0.0000",
            "base_discount_tax_compensation_amount": "0.0000",
            "shipping_discount_tax_compensation_amount": "0.0000",
            "base_shipping_discount_tax_compensation_amnt": null,
            "shipping_incl_tax": "0.0000",
            "base_shipping_incl_tax": "0.0000",
            "free_shipping": "0",
            "vat_id": null,
            "vat_is_valid": null,
            "vat_request_id": null,
            "vat_request_date": null,
            "vat_request_success": null,
            "gift_message_id": null,
            "base_customer_balance_amount": "0.0000",
            "customer_balance_amount": "0.0000",
            "gift_cards_amount": "0.0000",
            "base_gift_cards_amount": "0.0000",
            "gift_cards": "[]",
            "used_gift_cards": "[]",
            "gw_id": null,
            "gw_allow_gift_receipt": null,
            "gw_add_card": null,
            "gw_base_price": null,
            "gw_price": null,
            "gw_items_base_price": null,
            "gw_items_price": null,
            "gw_card_base_price": null,
            "gw_card_price": null,
            "gw_base_tax_amount": null,
            "gw_tax_amount": null,
            "gw_items_base_tax_amount": null,
            "gw_items_tax_amount": null,
            "gw_card_base_tax_amount": null,
            "gw_card_tax_amount": null,
            "gw_base_price_incl_tax": null,
            "gw_price_incl_tax": null,
            "gw_items_base_price_incl_tax": null,
            "gw_items_price_incl_tax": null,
            "gw_card_base_price_incl_tax": null,
            "gw_card_price_incl_tax": null,
            "giftregistry_item_id": null,
            "reward_points_balance": "0",
            "base_reward_currency_amount": "0.0000",
            "reward_currency_amount": "0.0000",
            "entity_id": "52437",
            "region_code": "WP"
        },
        "orig_order_id": 0,
        "currency": {
            "global_currency_code": "MYR",
            "base_currency_code": "MYR",
            "store_currency_code": "MYR",
            "quote_currency_code": "MYR",
            "store_to_base_rate": 0,
            "store_to_quote_rate": 0,
            "base_to_global_rate": 1,
            "base_to_quote_rate": 1
        },
        "customer_is_guest": false,
        "customer_note_notify": true,
        "customer_tax_class_id": 3,
        "store_id": 1,
        "extension_attributes": {
            "shipping_assignments": [
                {
                    "shipping": {
                        "address": {
                            "id": 52438,
                            "region": "WP Kuala Lumpur",
                            "region_id": 546,
                            "region_code": "WP",
                            "country_id": "MY",
                            "street": [
                                "safafaf"
                            ],
                            "telephone": "0115143124",
                            "postcode": "50411",
                            "city": "Kuala Lumpur",
                            "firstname": "DOJI",
                            "lastname": "TTA",
                            "customer_id": 3447,
                            "email": "881212432154@getnada.com",
                            "same_as_billing": 0,
                            "customer_address_id": 10089,
                            "save_in_address_book": 0,
                            "custom_attributes": [
                                {
                                    "attribute_code": "residence_type",
                                    "value": "High-Rise"
                                },
                                {
                                    "attribute_code": "salutation",
                                    "value": "Mr"
                                }
                            ]
                        },
                        "method": null
                    },
                    "items": [
                        {
                            "item_id": 68810,
                            "sku": "Huawei-P20-HuaweiP20128GBPink-FPP",
                            "qty": 1,
                            "name": "Huawei P20",
                            "price": 1500,
                            "product_type": "bundle",
                            "quote_id": "24669"
                        }
                    ]
                }
            ]
        },
        "all_items": [
            {
                "item_id": "68810",
                "quantity": 1,
                "reservation_id": "OP13CE1568782053",
                "sku": "Huawei-P20-HuaweiP20128GBPink-FPP",
                "sku_bundle": "Huawei-P20",
                "is_preorder": 0,
                "is_broadband": false,
                "is_easyphone": false,
                "has_add_ons": false,
                "add_on_label": null,
                "add_on_code": null,
                "utm_source": null,
                "easyphone_label": "EasyPhone  (24 months contract)",
                "preorder_availability_flag": 0,
                "midnight_delivery": 0,
                "price": "1500.0000",
                "itemTotal": "1500.0000",
                "selectedProduct": {
                    "orderMonthlyPayTotal": 188,
                    "is_moon": false,
                    "orderDevice": "Huawei P20 128GB Pink",
                    "orderDeviceName": "Huawei P20 128GB Pink",
                    "selectedProductSku": "HuaweiP20128GBPink",
                    "selectedImageList": [
                        "/media/catalog/product/9/0/900x900_5_20.png"
                    ],
                    "orderPlanName": "First™ Platinum Plus",
                    "orderPlan": "FPP",
                    "urlKey": "first-platinum-plus",
                    "orderMonthlyPay": "188.0000",
                    "plan_image_url": "/media/catalog/product/w/f/wf-benji-100gb.png",
                    "orderOneTimePay": "1500.00",
                    "eligibilty": null,
                    "orderPhoneNo": "0132045526",
                    "orderNumberType": "NewNumber",
                    "orderReqPlanComponent": [
                        {
                            "component_name": "Executive Plan VAS without GPRS_10784",
                            "component_part_no": "CPT05370",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "New Package for IDD Activation",
                            "component_part_no": "CPT07020",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "First Unlimited",
                            "component_part_no": "CPT12290",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "Default International Roaming Voice/SMS",
                            "component_part_no": "CPT13540",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "FiRST Platinum Plus CBS Commitment Fee",
                            "component_part_no": "CPT16940",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "Free Chat 2.0",
                            "component_part_no": "MI01790",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "Advance Payment CBS RM188",
                            "component_part_no": "OTC08850",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "SIM Card",
                            "component_part_no": "SM00010",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "Blank SIM Starter Pack",
                            "component_part_no": "SP00210",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "Stamp Fee_92382",
                            "component_part_no": "OTC00350",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "Printed Bill for Voice",
                            "component_part_no": "BDMR0080",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        },
                        {
                            "component_name": "First Platinum Plus Business 2.0 RET",
                            "component_part_no": "PB10570",
                            "component_default": "0",
                            "component_price": "0.0000",
                            "cbs_name": "FiRST Platinum Plus CBS Plan",
                            "cbs_part_number": "PR03490",
                            "isvas": "0",
                            "vasname": null,
                            "vasvalue": null
                        }
                    ],
                    "selectedPlanDetails": {
                        "name": "First™ Platinum Plus",
                        "sku": "FPP",
                        "urlKey": "first-platinum-plus",
                        "monthly_plan": "188.0000",
                        "order_plan_bundle": "PB11860",
                        "order_service_bundle": "RTP0010",
                        "order_plan_component": [
                            {
                                "component_name": "Executive Plan VAS without GPRS_10784",
                                "component_part_no": "CPT05370",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "New Package for IDD Activation",
                                "component_part_no": "CPT07020",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "First Unlimited",
                                "component_part_no": "CPT12290",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "Default International Roaming Voice/SMS",
                                "component_part_no": "CPT13540",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "FiRST Platinum Plus CBS Commitment Fee",
                                "component_part_no": "CPT16940",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "Free Chat 2.0",
                                "component_part_no": "MI01790",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "Advance Payment CBS RM188",
                                "component_part_no": "OTC08850",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "SIM Card",
                                "component_part_no": "SM00010",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "Blank SIM Starter Pack",
                                "component_part_no": "SP00210",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "Stamp Fee_92382",
                                "component_part_no": "OTC00350",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "Printed Bill for Voice",
                                "component_part_no": "BDMR0080",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            },
                            {
                                "component_name": "First Platinum Plus Business 2.0 RET",
                                "component_part_no": "PB10570",
                                "component_default": "0",
                                "component_price": "0.0000",
                                "cbs_name": "FiRST Platinum Plus CBS Plan",
                                "cbs_part_number": "PR03490",
                                "isvas": "0",
                                "vasname": null,
                                "vasvalue": null
                            }
                        ],
                        "new_customer": "0",
                        "segment": "10",
                        "upfront_installment": null,
                        "product_type": "Service",
                        "start_date": null,
                        "end_date": null,
                        "BackgroundColor": "is-bg-color-black",
                        "IndicatorClass": "is-level-platinum-plus",
                        "ProductText": "Platinum Plus",
                        "KeyFiguresText": "100 GB",
                        "KeyText": "RM 188",
                        "BuynowLink": "/plans/first-platinum-plus",
                        "BuynowText": "Buy now",
                        "knowMoreLink": "/store/plans/first-platinum-plus",
                        "knowMoreText": "Learn more",
                        "MobileDescription": null,
                        "TableInfo": [],
                        "terms_and_condition": {
                            "plans": {
                                "label": "Plans",
                                "desc": "Unlimited Standard national calls + texts + videocalls"
                            },
                            "contract_terms": {
                                "label": "Contract Duration",
                                "desc": "24 months contract"
                            },
                            "legal": {
                                "label": "Legal",
                                "desc": "All information, documents, products and services, trademarks, logos, graphics, and images (\"Materials\") provided on this site  are copyrighted or trademarked and are the property of Samsung Group, Samsung Electronics and it's listed subsidiaries. Any una"
                            },
                            "cancellation": {
                                "label": "Cancellation",
                                "desc": "Email to support.estore@samsung.com within 24 hours of placing the order or before a dispatch notification is sent by Samsung Shop or Savex Technologies.  If you wish to change the order, please book a new order while we cancel the original order placed b"
                            }
                        },
                        "AtrHref": "#rm-0",
                        "telco_day": {
                            "status": false,
                            "hat_text": null,
                            "message": null
                        },
                        "is_premium_plan": false,
                        "additional_information": null
                    },
                    "orderDevicePrice": "0.0000",
                    "orderSummaryColor": "Pink",
                    "orderSummaryStorage": "128GB",
                    "orderReqServiceBundle": "",
                    "orderTotalPay": "1500.0000",
                    "total": "1500.0000",
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
                    "is_neptune_subsidy": true,
                    "mnp_data": null,
                    "is_mnp": false
                },
                "upfront_waiver": false,
                "campaign100_days": false,
                "campaign": {
                    "title": null,
                    "subtitle": null
                },
                "is_campaign_mviva": false,
                "campaign_mviva_message": null,
                "campaign_mviva_url": "",
                "promotion_details": "ADA"
            }
        ],
        "customerOtherInfo": {
            "salutation": "Mr",
            "unit_number": "11-4",
            "mobile_number": "0115143124",
            "gender": "Male",
            "customer_full_name": "DOJI TTA"
        },
        "GST": "0.00",
        "grossTotal": "1500.00",
        "itemsTotal": "1",
        "shipping_address": {
            "address_id": "52438",
            "quote_id": "24669",
            "created_at": "2019-09-18 04:58:37",
            "updated_at": "2019-09-18 04:58:37",
            "customer_id": "3447",
            "save_in_address_book": "0",
            "customer_address_id": "10089",
            "address_type": "shipping",
            "email": "881212432154@getnada.com",
            "prefix": null,
            "firstname": "DOJI",
            "middlename": null,
            "lastname": "TTA",
            "suffix": null,
            "company": null,
            "street": "safafaf",
            "city": "Kuala Lumpur",
            "region": "WP Kuala Lumpur",
            "region_id": "546",
            "postcode": "50411",
            "country_id": "MY",
            "telephone": "0115143124",
            "fax": null,
            "virtual_shipping_id": null,
            "shipping_unit_number": "11-4",
            "billing_unit_number": null,
            "salutation": "Mr",
            "residence_type": "High-Rise",
            "same_as_billing": "0",
            "collect_shipping_rates": "0",
            "shipping_method": null,
            "shipping_description": null,
            "weight": "195.0000",
            "subtotal": "1500.0000",
            "base_subtotal": "1500.0000",
            "subtotal_with_discount": "1500.0000",
            "base_subtotal_with_discount": "1500.0000",
            "tax_amount": "0.0000",
            "base_tax_amount": "0.0000",
            "shipping_amount": "0.0000",
            "base_shipping_amount": "0.0000",
            "shipping_tax_amount": "0.0000",
            "base_shipping_tax_amount": "0.0000",
            "discount_amount": "0.0000",
            "base_discount_amount": "0.0000",
            "grand_total": "1500.0000",
            "base_grand_total": "1500.0000",
            "customer_notes": null,
            "applied_taxes": "[]",
            "discount_description": null,
            "shipping_discount_amount": "0.0000",
            "base_shipping_discount_amount": "0.0000",
            "subtotal_incl_tax": "1500.0000",
            "base_subtotal_total_incl_tax": "1500.0000",
            "discount_tax_compensation_amount": "0.0000",
            "base_discount_tax_compensation_amount": "0.0000",
            "shipping_discount_tax_compensation_amount": "0.0000",
            "base_shipping_discount_tax_compensation_amnt": null,
            "shipping_incl_tax": "0.0000",
            "base_shipping_incl_tax": "0.0000",
            "free_shipping": "0",
            "vat_id": null,
            "vat_is_valid": null,
            "vat_request_id": null,
            "vat_request_date": null,
            "vat_request_success": null,
            "gift_message_id": null,
            "base_customer_balance_amount": "0.0000",
            "customer_balance_amount": "0.0000",
            "gift_cards_amount": "0.0000",
            "base_gift_cards_amount": "0.0000",
            "gift_cards": "[]",
            "used_gift_cards": "[]",
            "gw_id": null,
            "gw_allow_gift_receipt": null,
            "gw_add_card": null,
            "gw_base_price": "0.0000",
            "gw_price": "0.0000",
            "gw_items_base_price": "0.0000",
            "gw_items_price": "0.0000",
            "gw_card_base_price": "0.0000",
            "gw_card_price": "0.0000",
            "gw_base_tax_amount": null,
            "gw_tax_amount": null,
            "gw_items_base_tax_amount": null,
            "gw_items_tax_amount": null,
            "gw_card_base_tax_amount": null,
            "gw_card_tax_amount": null,
            "gw_base_price_incl_tax": null,
            "gw_price_incl_tax": null,
            "gw_items_base_price_incl_tax": null,
            "gw_items_price_incl_tax": null,
            "gw_card_base_price_incl_tax": null,
            "gw_card_price_incl_tax": null,
            "giftregistry_item_id": null,
            "reward_points_balance": "0",
            "base_reward_currency_amount": "0.0000",
            "reward_currency_amount": "0.0000",
            "entity_id": "52438",
            "region_code": "WP"
        },
        "supplementary_data": [],
        "cart_session": 0,
        "reservation_id": "OP13CE1568782053",
        "tax": {
            "total_tax": "0.00",
            "items": []
        },
        "delivery_type": {
            "value": 0,
            "code": "standard"
        }
    }
];

describe('LoginOtpComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;

    let component: LoginOtpComponent;
    let fixture: ComponentFixture<LoginOtpComponent>;
    let service: LoginService;
    let response:any = [
        {
            "status": true,
            "state": "1553668962834261",
            "customer_data":{
                "name":"test user"
              },
            "message": "MessageWaiting",
            "exists": true
        }
    ];

    class MockloginService  {
        MobileConnect(){
            return Observable.of(response)
        }

        public validateMsisdnLength(msisdn): boolean {
            let invalidmsisdn;
            const patternMSISDN = /^[0-9]*$/;
            if (!patternMSISDN.test(msisdn)) {
              invalidmsisdn = true;
            } else {
              if (msisdn.length === 0 || msisdn.length === 11) {
                invalidmsisdn = false;
              }
            }
            return invalidmsisdn;
          }

          public isCobpLogin(): boolean {
            if (typeof window !== "undefined"
              && localStorage
              && localStorage.getItem('COBP_login')
              && localStorage.getItem('COBP_login') === "YES"
              && localStorage.getItem("COBP_FLOW") === "YES"
              && localStorage.getItem('COBP_login_Check') === "YES"
              && localStorage.getItem("COBP_FLOW_CHECK") === "YES") {
              return true;
            }
          }

          public ResetOTPTextBoxById(currentTextBoxId: string) {
            if (document !== undefined) {
              const id = "txtOtp_" + currentTextBoxId;
              const objTextBox: any = document.getElementById(id);
              objTextBox.value = "";
            }
          }
          
          public ManageOTPMaxLength(currentTextBoxId: string) {
            if (document !== undefined) {
              const id = "txtOtp_" + currentTextBoxId;
              const objTextBox: any = document.getElementById(id);
              if (objTextBox.value.length > 1) {
                objTextBox.value = objTextBox.value.substring(0, 1);
              }
            }
          }

          public SetOtpTextBoxFocus(otpTextBoxId: string) {
            if (document !== undefined) {
              const id = "txtOtp_" + otpTextBoxId;
              document.getElementById(id).focus();
            }
          }
    };

    let orderInfoData = {
        "exception":false,
        "order_data":{
            "total_lines":14
        }

    }
    
    class MockOrderInfoService{
        ViewOrderInfo(){
            return Observable.of(orderInfoData);
        }
    }
    
    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule],
            declarations: [LoginOtpComponent, MinifiedPageLoaderComponent, FooterComponent, AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, NotificationErrorComponent, sharedPipes],
            providers: [PlanPurchaseService,
            { provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: AppMockService },
            { provide: Router, useClass: RouterStub },
            { provide: LoginService, useClass: MockloginService },
            {
                provide: ActivatedRoute, useClass: MockactivatedRoute
            }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
             OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
              DeviceDataService, CommonUtilService, ProductService]
        }).overrideComponent(LoginOtpComponent,{
            set:{
                providers:[{provide: LoginService, useClass: MockloginService}]
            }
        });
    });

    beforeEach(inject([LoginService], (loginService) => {
        service = loginService;
        fixture = TestBed.createComponent(LoginOtpComponent);
        component = fixture.componentInstance;
        component.resp = mockResponse;
        component.orderDetails = {
            "price": 1500,
            "sku": "Huawei-P20"
        };
        component.selectedProductDetails = mockSelectedProduct;
        component.userInfo = {
            "outputCPResp": mockResponse.customer_data
        };
        component.suppLinesDetails = [];
        component.reservationId = "OP20CE1568274262";
        component.isLimitReachedError = false;
        component.isLimitReachedError = false;
        component.StoreCartUrl = '#testurl';
    }));

    it('should create Login Otp component', () => {
        expect(component).toBeTruthy();
    });

    it('should call BindCustomerDetails function ', () => {
        const spy = spyOn(component, 'BindCustomerDetails');
        component.BindCustomerDetails(component.resp);
        expect(spy).toHaveBeenCalled();
    });

    it('should call ShowingLimitReachedError function', () => {
        const spy = spyOn(component, 'ShowingLimitReachedError');
        spyOn(component, "Redirect");
        component.ShowingLimitReachedError({
            "message" : "Limit Exceeded !"
        });
        expect(spy).toHaveBeenCalled();
    });

    it('should call checkForLimitExceeded function', () => {
        const spy = spyOn(component, "checkForLimitExceeded");
        spyOn(component, "callAddToCartService");
        component.isLimitReachedError = false;
        component.isLimitExceededIncludingOpenOrders = false;
        component.checkForLimitExceeded();
        expect(spy).toHaveBeenCalled();
    });

    it('should call checkForLimitExceeded function with limit reached', () => {
        const spy = spyOn(component, "Redirect");
        spyOn(component, "callAddToCartService");
        component.isLimitReachedError = true;
        component.isLimitExceededIncludingOpenOrders = false;
        component.checkForLimitExceeded();
        expect(spy).toHaveBeenCalledWith('/device-detail/Huawei-P20');
    });

    it('should call checkForLimitExceeded function with limit exceeded with open Orders', () => {
        const spy = spyOn(component, "Redirect");
        spyOn(component, "callAddToCartService");
        component.isLimitReachedError = false;
        component.isLimitExceededIncludingOpenOrders = true;
        component.checkForLimitExceeded();
        const eligibilityInfo = {
            isEligibleByAge: false,
            displayType: 'LIMIT_EXCEEDED_WITH_OPEN_COUNT',
            type: 'xpax'
        };
        
        if (typeof window !== 'undefined' && localStorage && localStorage.getItem("eligiblePopupType")) {
            const eInfo = JSON.parse(localStorage.getItem("eligiblePopupType"));
            expect(eligibilityInfo).toEqual(eInfo);
            
            component.IsDisplayAgeEligibilityPopup = true;
            localStorage.setItem('displayEligiblePopup', JSON.stringify(component.IsDisplayAgeEligibilityPopup));
            expect(component.IsDisplayAgeEligibilityPopup).toBeTruthy();
            
            if (localStorage.getItem('displayEligiblePopup')) {
                const displayEligiblePopup = JSON.parse(localStorage.getItem('displayEligiblePopup'));
                expect(displayEligiblePopup).toBeTruthy();
            }
        }
        expect(spy).toHaveBeenCalledWith('/device-detail/Huawei-P20');
    });

    it('should call callAddToCartService function ', () => {
        const spy = spyOn(component, "callAddToCartService");
        component.callAddToCartService();
        expect((component.suppLineRequestBody).length).toBe(0);
        expect(spy).toHaveBeenCalled();
    });
    
    it('should call ResetOtpDetails function ', () => {
        const spy = spyOn(component, 'ResetOtpDetails').and.callThrough();
        component.ResetOtpDetails();
        expect(spy).toHaveBeenCalled();
    });

    it('should call disclaimerShow function ', () => {
        const spy = spyOn(component, 'disclaimerShow');
        component.disclaimerShow();
        expect(spy).toHaveBeenCalled();
    });

    it('should call checkSuppLinesCountValidation function ', () => {
        const spy = spyOn(component, 'checkSuppLinesCountValidation');
        const suppLimitOfUser = {
            "status": true,
            "maxPostpaidLinesRemaining": 12
        };
        const val = component.checkSuppLinesCountValidation(suppLimitOfUser);
        expect(spy).toHaveBeenCalled();
    });

    it('should call checkSuppLinesCountValidation function ', () => {
        const spy = spyOn(component, 'checkSuppLinesCountValidation');
        const suppLimitOfUser = {
            "status": true,
            "maxPostpaidLinesRemaining": 1
        };
        const val = component.checkSuppLinesCountValidation(suppLimitOfUser);
        expect(spy).toHaveBeenCalled();
    });

    it('should call createRequestBodyForPlanOnlySupp function 1', () => {
        const spy = spyOn(component, 'createRequestBodyForPlanOnlySupp').and.callThrough();
        component.createRequestBodyForPlanOnlySupp();
        expect((component.suppLineRequestBody).length).toBe(0);
        expect((component.suppLinesDetails).length).toBe(0);
    });

    it('should call createRequestBodyForPlanOnlySupp function 2', () => {
        const spy = spyOn(component, 'createRequestBodyForPlanOnlySupp').and.callThrough();
        component.suppLinesDetails = [{planPhoneNumber: 24245454, partNumber: 873647, subsidyAmount : 10}, {planPhoneNumber: 24245454, partNumber: 873647}];
        component.createRequestBodyForPlanOnlySupp();
        
        expect(spy).toHaveBeenCalled();
    });

    it('should call createRequestBodyForSupp function 1', () => {
        const spy = spyOn(component, 'createRequestBodyForSupp').and.callThrough();
        component.createRequestBodyForSupp();
        expect((component.suppLineRequestBody).length).toBe(0);
        expect((component.suppLinesDetails).length).toBe(0);
    });

    it('should call createRequestBodyForSupp function 2', () => {
        const spy = spyOn(component, 'createRequestBodyForSupp').and.callThrough();
        component.suppLinesDetails = [{planPhoneNumber: 24245454, partNumber: 873647, subsidyAmount : 10}, {planPhoneNumber: 24245454, partNumber: 873647}];
        component.createRequestBodyForSupp();
        
        expect(spy).toHaveBeenCalled();
    });

    it('should call callErrorMessage function', () => {
        const spy = spyOn(component, 'callErrorMessage').and.callThrough();
        component.callErrorMessage('OTP_EXPIRED');
        component.callErrorMessage('SYS_DOWN');
        expect(spy).toHaveBeenCalled();
    });

    it('should call ManageOTP function with number ', () => {
        const spy = spyOn(component, 'ManageOTP').and.callThrough();
        const event = {
            'target': {
                'value': '1'
            }
        };
        component.ManageOTP('2' , event, '1');
        expect(spy).toHaveBeenCalled();
    });

    it('should call ManageOTP function with alphabet A', () => {
        const spy = spyOn(component, 'ManageOTP')
        const event = {
            'target': {
                'value': 'A'
            }
        };
     
        component.ManageOTP('2' , event, '1');
        expect(spy).toHaveBeenCalled();
    });

    it('add to cart notification error', () => {
        const spy = spyOn(component, 'AddToCartNotificationError').and.callThrough();
        component.AddToCartNotificationError();
        expect(spy).toHaveBeenCalled();
    });

    it('disableResendOtpLink', () => {
        const spy = spyOn(component, 'disableResendOtpLink').and.callThrough();
        component.disableResendOtpLink({});
        component.disableResendOtpLink({disable_resend_link : 10});
        expect(spy).toHaveBeenCalled();
    });

    it('AgeEligibilityWorkFlow', () => {
        const spy = spyOn(component, 'AgeEligibilityWorkFlow');
        component.AgeEligibilityWorkFlow(mockSelectedProduct);
        expect(spy).toHaveBeenCalled();
    });

    it('ResetOTPTextBoxById', () => {
        const spy = spyOn(component, 'ResetOTPTextBoxById');
        component.ResetOTPTextBoxById('1');
        expect(spy).toHaveBeenCalled();
    });

    it('enableDisableLinkAfterSpecifiedTime', () => {
        const spy = spyOn(component, 'enableDisableLinkAfterSpecifiedTime').and.callThrough();
        component.enableDisableLinkAfterSpecifiedTime();
        expect(spy).toHaveBeenCalled();
    });

    it('add to cart notification', () => {
        const spy = spyOn(component, 'AddToCartNotification').and.callThrough();
        component.AddToCartNotification();
        expect(spy).toHaveBeenCalled();
    });

    it('otpInputBoxClicked', () => {
        const spy = spyOn(component, 'otpInputBoxClicked').and.callThrough();
        const event = {
            'target': {
                'value': '1'
            }
        };
        component.otpInputBoxClicked(event, '1')
        expect(spy).toHaveBeenCalled();
    });
    
    it('check validation', () => {
        const spy = spyOn(component, 'checkValidation');
        component.checkValidation();
        component.otp1 = "1111";
        component.otp2 = "2222";
        component.otp3 = "3333";
        component.otp4 = "4444";
        component.otp5 = "4444";
        component.otp6 = "4444";
        component.checkValidation();
        component.otp1 = "";
        component.otp2 = "";
        component.otp3 = "";
        component.otp4 = "";
        component.otp5 = "";
        component.otp6 = "";
        expect(spy).toHaveBeenCalled();
    });
   
    it('setotp timeout', () => {
        const spy = spyOn(component, 'setOtpTimeout').and.callThrough();
        component.setOtpTimeout();
        expect(spy).toHaveBeenCalled();
    });

    it('ngAfterViewInit', () => {
        const spy = spyOn(component, 'ngAfterViewInit');
        component.ngAfterViewInit();
        expect(spy).toHaveBeenCalled();
    });

    it('loginAfterOtp', () => {
        const spy = spyOn(component, 'loginAfterOtp').and.callThrough();
        component.loginAfterOtp();
        expect(spy).toHaveBeenCalled();
    });
   
    it('ngoninit publish', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        const spy = spyOn(component, 'ngOnInit');
        component.ngOnInit();
        devicedataservice.publishErrorNotificationBoolean(false);
        devicedataservice.publishNumberReservationId("1234567");
        devicedataservice.publishIsGoldenNo(false);
        devicedataservice.publishSupplimentaryLines([]);
        expect(spy).toHaveBeenCalled();
    }));

    it('loginThroughEnterButton', () => {
        const spy = spyOn(component, 'loginThroughEnterButton');
        let ev = {keyCode: 12};
        component.loginThroughEnterButton(ev);
         ev = {keyCode: 13};
         component.validOtp = false;
        component.loginThroughEnterButton(ev);
        component.validOtp = true;
        component.loginThroughEnterButton(ev);
        expect(spy).toHaveBeenCalled();
    });

    it('ngoninit', () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();
        sessionStorage.removeItem('AgentInfo');
        sessionStorage.setItem('AgentInfo',JSON.stringify({'status':'true'}));
        localStorage.setItem('numberReservationId','12345');
        localStorage.setItem('isMviva','true');
        localStorage.setItem('addonCode','abcde');
        localStorage.setItem('AddToCartNotification','test');
        component.reservationId = '';
        component.ngOnInit();
        sessionStorage.removeItem('AgentInfo');
        localStorage.removeItem('numberReservationId');
        localStorage.removeItem('isMviva');
        localStorage.removeItem('addonCode');
        localStorage.removeItem('AddToCartNotification');
        expect(spy).toHaveBeenCalled();
    });
    
    it('ValidateOTP', () => {
        const spy = spyOn(component, 'ValidateOTP').and.callThrough();
        sessionStorage.setItem('CAorderId','12345');
        sessionStorage.setItem('secretKey','test');
        component.ValidateOTP();

        sessionStorage.removeItem('CAorderId');
        sessionStorage.removeItem('secretKey');
        expect(spy).toHaveBeenCalled();
    });

    it('ValidateOTP with status false', () => {
        const spy = spyOn(component, 'ValidateOTP').and.callThrough();
        sessionStorage.setItem('CAorderId','12345');
        sessionStorage.setItem('secretKey','test');
        response = [
            {
                "status": false,
                "state": "1553668962834261",
                "valid":false,
                "customer_data":{
                    "name":"test user"
                  },
                "message": "MessageWaiting",
                "exists": true
            }
        ];
        
        component.ValidateOTP();

        sessionStorage.removeItem('CAorderId');
        sessionStorage.removeItem('secretKey');
        expect(spy).toHaveBeenCalled();
    });

    it('checkNumberOfLinesUserHas with response 1', () => {
        const spy = spyOn(component, 'checkNumberOfLinesUserHas');
        const orderInfoService = TestBed.get(OrderInfoService);
        spyOn(orderInfoService, 'ViewOrderInfo').and.returnValue(of( {
            "status": true,
            "state": "1553668962834261",
            "order_data":{
                "total_lines": 30
              },
            "message": "MessageWaiting",
            "exists": true,
            "exception" : false
        }))
        component.customerNRIC = "1234567890";
        let data = [{
            id:1
        }]
        localStorage.setItem('suppLinesAddedByTheUser',JSON.stringify(data));
        component.ngOnInit();
        component.checkNumberOfLinesUserHas();
        expect(spy).toHaveBeenCalled();
    });

    it('checkNumberOfLinesUserHas with response 2', () => {
        const spy = spyOn(component, 'checkNumberOfLinesUserHas');
        const orderInfoService = TestBed.get(OrderInfoService);
        spyOn(orderInfoService, 'ViewOrderInfo').and.returnValue(of( {
            "status": true,
            "state": "1553668962834261",
            "order_data":{
                "total_lines": 1
              },
            "message": "MessageWaiting",
            "exists": true,
            "exception" : false
        }))
        component.customerNRIC = "1234567890";
        let data = [{
            id:1
        }]
        localStorage.setItem('suppLinesAddedByTheUser',JSON.stringify(data));
        component.ngOnInit();
        component.checkNumberOfLinesUserHas();
        expect(spy).toHaveBeenCalled();
    });

    // it('checkNumberOfLinesUserHas with response 3', () => {
    //     const spy = spyOn(component, 'checkNumberOfLinesUserHas').and.callThrough();
    //     const orderInfoService = TestBed.get(OrderInfoService);
    //     spyOn(orderInfoService, 'ViewOrderInfo').and.returnValue(of( {
    //         "status": false,
    //         "state": "1553668962834261",
    //         "order_data":{
    //             "total_lines": 1
    //           },
    //         "message": "MessageWaiting",
    //         "exists": true,
    //         "exception" : true
    //     }))
    //     component.customerNRIC = "1234567890";
    //     let data = [{
    //         id:1
    //     }]
    //     localStorage.setItem('suppLinesAddedByTheUser',JSON.stringify(data));
    //     component.checkNumberOfLinesUserHas();
    //     expect(spy).toHaveBeenCalled();
    // });
});
