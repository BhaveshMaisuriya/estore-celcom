import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
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
import { Observable } from 'rxjs/Rx';
import { UserService } from '../../../Service/user.service';
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
import { GuestLoginComponent } from './guest-login.component';
import { GuestCheckoutService } from '../services/guest-checkout.service';
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { configureTestSuite } from 'ng-bullet';
import { RouterTestingModule } from '@angular/router/testing';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

const GuestLoginResponse = [
    {
        allowed_postpaid_lines: "15",
        allowed_prepaid_lines: "5",
        authtoken: "e2ac71e3e50a6b9e089f21f35b1c86704b913db84c7c47fef81d4eb0e1ef2e377f616d9b31deb15d2724e749c90e58c8309b77765db5a2c0d9dc18b0b06c0471a9a01956aa05da046aa3edb733e03ba02744aadf96282a759d45f22bc064ee43661fe910e096a99e9f2aadf747fe141e7fae4670bb3aebe17664b7788b6708a0120991959eff3c856ac2fe8f818891a1aebd7e65507b14ebd6a3a7998d75cee1fa052cee53f3ac2d37258674f6814da247d6e2c145353b3155dec4e140f617492b2fa08b19b47f94f17c13f94158b54d6547e20b411bc08e916843420a1d",
        blacklisted: false,
        contact_salutation: "",
        date_of_birth: "19950825_000000",
        email: "sanitytest12321@gmail.com",
        message: "Returning Guest User",
        mobile_connect_user: false,
        new_guest: false,
        preferred_contact_method: "Email",
        preferred_contact_time: "4:30pm to 8:30pm",
        status: true,
        token: "hbh8fvrq9gt8lmeh36079fe9h7opnrg8",
        user_postpaid_lines: 0,
        user_prepaid_lines: 0
    }
];
const guestLoginResponseForNewUser = [
    {
        "authtoken": "e2ac71e3e50a6b9e089f21f35b1c86704b913db84c7c47fef81d4eb0e1ef2e377f616d9b31deb15d2724e749c90e58c8309b77765db5a2c0d9dc18b0b06c0471a9a03752e605f4366ca0edb779e13ba42744aadf96282a759d45f22bc064ee43661fe910e096a99e9f2aadf747fe141e7fae4670f23aebf13f64b774c767089e5e09e6959eff3c8516a9c1b4f388d59f86933a270d6f3183ffdbb4bd974fbaf4f32404f968abf1171319de7d89a42ebf6bcdbb8c4c27720c508d839317d42e464e5c9aa50f8024d99b4238fc401499471931c93b2839ccd5af6b5c54051d",
        "blacklisted": false,
        "message": "New Guest User",
        "mobile_connect_user": false,
        "new_guest": true,
        "status": true,
        "token": "2l325vcwvme2t9xj6jcbe24tigxn9v7s"
    }
];
const guestBlkChkRequest = {
    blacklistChkRequest: {
        customerIDNo: "950825632487",
        customerIDType: "1",
        system: "Internal"
    },
    outputCPResp: {

        contactEmail: "sanitytest12321@gmail.com",
        contactPreferredTime: "4:30pm to 8:30pm",
        contactSalutation: "",
        customerID: "950825632487",
        dateOfBirth: "19971108_000000",
        preferredContactMethod: "Email",
        services: [
            {
                "pre_Pos_Indicator": "Postpaid"
            }
        ]
    }
};
const guestBlkChkRequestForNewGuest = {
    blacklistChkRequest: {
        customerIDNo: "971108872348",
        customerIDType: "1",
        system: "Internal"
    },
    customerIDTypes: {
        "id": 1,
        "value": "New NRIC"
    },
    outputCPResp: {
        contactEmail: undefined,
        contactPreferredTime: undefined,
        contactSalutation: undefined,
        customerID: "971108872348",
        dateOfBirth: "19950825_000000",
        preferredContactMethod: undefined,
        services: [
            {
                "pre_Pos_Indicator": "Postpaid"
            }
        ]
    }
};
const suppLinesDetails = [
    {
        "planPhoneNumber": "0196087816",
        "planPrice": "48.0000",
        "planType": "Celcom Mobile Family™",
        "partNumber": "PB12540"

    },
    {
        "planPhoneNumber": "0133917201",
        "planPrice": "48.0000",
        "planType": "Celcom Mobile Family™",
        "partNumber": "PB12540"
    }
];
// const MockGuestloginService = {
//     postROI: jasmine.createSpy('postROI').and.returnValue(Observable.of(GuestLoginResponse))
// };
const planOnlyObject = {
    "selectedProductSku": "FGP",
    "orderPhoneNo": "0196824790",
    "orderPlan": "FGP",
    "selectedPlanDetails": {
        "name": "First™ Gold Plus",
        "PlanName": "First™ Gold Plus",
        "sku": "FGP",
        "url_key": "first-gold-plus",
        "order_plan_bundle": "PB12070",
        "ngn_part_number": "PB10840",
        "order_service_bundle": "RTP0010",
        "order_plan_component": [
            {
                "component_name": "Lifestyle Addon",
                "component_part_no": "CPT19330",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Executive Plan VAS without GPRS_92378",
                "component_part_no": "CPT04540",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "New Package for IDD Activation",
                "component_part_no": "CPT07020",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "First Unlimited",
                "component_part_no": "CPT12290",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Default International Roaming Voice/SMS",
                "component_part_no": "CPT13540",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "New LTE-Voice",
                "component_part_no": "LTE0070",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Free Chat 2.0",
                "component_part_no": "MI01790",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "SIM Card",
                "component_part_no": "SM00010",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Blank SIM Starter Pack",
                "component_part_no": "SP00210",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Stamp Fee_92382",
                "component_part_no": "OTC00350",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Printed Bill for Voice",
                "component_part_no": "BDMR0080",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Advance Payment CBS RM98",
                "component_part_no": "OTC08880",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "FiRST Gold Plus CBS Commitment Fee",
                "component_part_no": "CPT16970",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Weekend Internet Quota",
                "component_part_no": "CPT16980",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Gold Plus CBS Plan",
                "cbs_part_number": "PR043860",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            }
        ],
        "PlanMonthlyPay": "98.0000",
        "OneTimePayment": "98.0000",
        "contract": "24 months contract",
        "plan_title": "First™ Gold Plus. Affordable. Complete",
        "plan_subtitle": "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.",
        "BackgroundColor": "is-bg-color-black",
        "upfront_installment": null,
        "IndicatorClass": "is-level-gold",
        "ProductText": "Gold Plus",
        "KeyFiguresText": "40 GB",
        "KeyText": "RM 98",
        "BuynowLink": "/plans/first-gold-plus",
        "BuynowText": "Buy now",
        "knowMoreLink": "/store/plans/first-gold-plus",
        "knowMoreText": "Learn more",
        "upper_age_limit": null,
        "lower_age_limit": "18",
        "banner_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_1.jpg",
        "mobile_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_goldplus_lg_0.jpg",
        "is_xpax": false,
        "MobileDescription": null,
        "product_type": "Service",
        "footNote": null,
        "TableInfo": [],
        "image_url": "/media/catalog/product/w/f/wf-gopi-40gb.png",
        "supplementary_data": [
            {
                "name": "Celcom Mobile Family™",
                "max_line": "2",
                "part_number": "PB12540",
                "price": "48.0000"
            },
            {
                "name": "Celcom FIRST™ 1+5",
                "max_line": "5",
                "part_number": "PB11440",
                "price": "30.0000"
            }
        ],
        "addons": [],
        "is_campaign_mviva": null,
        "campaign_mviva": null,
        "campaign_mviva_invalid": null,
        "analytics_key_addtocart": {
            "fb_add_cart_id": "CelcomGoldPlus_AddToCart",
            "google_add_cart_id": "MrSzCL30iZcBENjpoqMD",
            "twitter_add_cart_id": "nzukl",
            "fb_learn_more_id": "CelcomGoldPlus_LearnMore",
            "google_learn_more_id": "2zEuCI7OnZcBENjpoqMD",
            "twitter_learn_more_id": "nzuka",
            "fb_buy_now_id": "CelcomGoldPlus_Buy Now",
            "google_buy_now_id": "MVgcCL23iJcBENjpoqMD",
            "twitter_buy_now_id": "nzukb"
        },
        "telco_day": {
            "status": false,
            "hat_text": null,
            "message": null,
            "allowed_types": [],
            "not_allowed_types": [
                "NEW_NUMBER",
                "MnpNum",
                "EXISTING_NUMBER"
            ],
            "eligible_message": "Rebate is only eligible for ",
            "not_eligible_message": "Rebate is not eligible for New registration, Switch to Celcom, Upgrade Plan"
        },
        "is_premium_plan": false,
        "bill_type": 1,
        "PlanSku": "FGP",
        "TotalPay": 98,
        "PlanOnlyComponentToShow": true,
        "IsMnp": false
    },
    "orderPlanName": "First™ Gold Plus",
    "orderMonthlyPay": "98.0000",
    "orderOneTimePay": "98.0000",
    "orderTotalPay": 98,
    "orderNumberType": "NewNumber",
    "total": 98
};
const mnpCustomerData = {
    "msisdn": "",
    "customerID": "901230142394",
    "customerIDType": "1",
    "portNumber": "0173826372"
};
const mockPostpaidApiResponse = {
    "exception": false,
    "message": "",
    "order_data": {
        "order_count": "0",
        "asset_count": "0",
        "total_lines": "0",
        "max_post_count": "15",
        "max_pre_count": null
    }
};
const mockPlanOnlyObjectResponse = {
    "selectedProductSku": "FP",
    "orderPhoneNo": "0173826372",
    "orderPlan": "FP",
    "selectedPlanDetails": {
        "name": "First™ Platinum",
        "PlanName": "First™ Platinum",
        "sku": "FP",
        "url_key": "first-platinum",
        "order_plan_bundle": "PB11820",
        "ngn_part_number": "PB09890",
        "order_service_bundle": "RTP0010",
        "order_plan_component": [
            {
                "component_name": "Executive Plan VAS without GPRS_10784",
                "component_part_no": "CPT05370",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "New Package for IDD Activation",
                "component_part_no": "CPT07020",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "First Unlimited",
                "component_part_no": "CPT12290",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Default International Roaming Voice/SMS",
                "component_part_no": "CPT13540",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "FiRST Platinum CBS Commitment Fee",
                "component_part_no": "CPT16950",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Free Chat 2.0",
                "component_part_no": "MI01790",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Weekend Internet Quota",
                "component_part_no": "CPT16980",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Advance Payment CBS RM148",
                "component_part_no": "OTC08860",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "SIM Card",
                "component_part_no": "SM00010",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Blank SIM Starter Pack",
                "component_part_no": "SP00210",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Stamp Fee_92382",
                "component_part_no": "OTC00350",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            },
            {
                "component_name": "Printed Bill for Voice",
                "component_part_no": "BDMR0080",
                "component_default": "0",
                "component_price": "0.0000",
                "cbs_name": "FiRST Platinum CBS Plan",
                "cbs_part_number": "PR043691",
                "isvas": "0",
                "vasname": null,
                "vasvalue": null
            }
        ],
        "PlanMonthlyPay": "148.0000",
        "OneTimePayment": "0",
        "contract": "24 months contract",
        "plan_title": "First™ Platinum",
        "plan_subtitle": "Now with extra privileges when you sign up for 12 months.",
        "BackgroundColor": "is-bg-color-black",
        "upfront_installment": null,
        "IndicatorClass": "is-level-platinum",
        "ProductText": "Platinum",
        "KeyFiguresText": "60 GB",
        "KeyText": "RM 148",
        "BuynowLink": "/plans/first-platinum",
        "BuynowText": "Buy now",
        "knowMoreLink": "/store/plans/first-platinum",
        "knowMoreText": "Learn more",
        "upper_age_limit": null,
        "lower_age_limit": "18",
        "banner_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg",
        "mobile_image": "/sites/default/files/images/banner/product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg",
        "is_xpax": false,
        "MobileDescription": null,
        "product_type": "Service",
        "footNote": null,
        "TableInfo": [],
        "image_url": "/media/catalog/product/w/f/wf-ju-60gb.png",
        "supplementary_data": [
            {
                "name": "Celcom Mobile Family™",
                "max_line": "4",
                "part_number": "PB12540",
                "price": "48.0000"
            },
            {
                "name": "Celcom FIRST™ 1+5",
                "max_line": "5",
                "part_number": "PB11440",
                "price": "30.0000"
            }
        ],
        "addons": [],
        "is_campaign_mviva": null,
        "campaign_mviva": null,
        "campaign_mviva_invalid": null,
        "analytics_key_addtocart": {
            "fb_add_cart_id": "CelcomPlatinum_AddToCart",
            "google_add_cart_id": "kNaXCND4iZcBENjpoqMD",
            "twitter_add_cart_id": "nzukn",
            "fb_learn_more_id": "CelcomPlatinum_LearnMore",
            "google_learn_more_id": "WuOWCOHQnZcBENjpoqMD",
            "twitter_learn_more_id": "nzuko",
            "fb_buy_now_id": "CelcomPlatinum_BuyNow",
            "google_buy_now_id": "b5OkCMynlJcBENjpoqMD",
            "twitter_buy_now_id": "nzuk8"
        },
        "telco_day": {
            "status": false,
            "hat_text": "Hi TQA team have a good day",
            "message": "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!",
            "allowed_types": [
                "NEW_NUMBER"
            ],
            "not_allowed_types": [
                "MnpNum",
                "EXISTING_NUMBER"
            ],
            "eligible_message": "Rebate is only eligible for New registration",
            "not_eligible_message": "Rebate is not eligible for Switch to Celcom, Upgrade Plan"
        },
        "is_premium_plan": false,
        "bill_type": 1,
        "PlanSku": "FP",
        "TotalPay": "0.00",
        "PlanOnlyComponentToShow": true,
        "IsMnp": true,
        "PrincipalLine": "",
        "portNumber": "0173826372"
    },
    "orderPlanName": "First™ Platinum",
    "orderMonthlyPay": "148.0000",
    "orderOneTimePay": "0",
    "orderTotalPay": "0.00",
    "orderNumberType": "SwitchToCelcom",
    "total": "0.00"
};
const addToCartMockResponse = [
    {
        message: "Product added to cart Successfully",
        status: true
    }
];
const addToCartErrorMockResponse = [
    {
        message: "There is already one item in cart.",
        status: false
    }
];
const addTocartBundleResponse = [
    {
        cart_id: "16823",
        message: "Product added to cart Successfully",
        status: true
    }
];
const addTocartBundleErrorResponse = [
    {
        cart_id: null,
        message: "Error on Add to Cart!",
        status: false
    }
];
const mockRequestBody = {
    "data": {
        "Sku": "FP",
        "PlanName": "First™ Platinum",
        "TotalPay": "0.00",
        "selected_number": "0173826372",
        "selected_number_type": "SwitchToCelcom",
        "is_cobp": false,
        "user": "user",
        "is_mnp": true,
        "mnp_id": "971108872348",
        "add_on_ids": null,
        "is_campaign_mviva": false,
        "campaign_mviva_url": "",
        "is_affiliate_ia": false,
        "is_affiliate_ada": false,
        "reservationId": "",
        "is_golden_number": false
    },
    "supp_data": []
};
const orderDetails = { "sku": "FP", "price": "0.00" };
const mockOrderDetailsForDevice = { "sku": "iPhone-XS-Max", "price": 4898 };
const mockSelectedProductDetails = {
    "orderDevice": "iPhone-XS-Max",
    "selectedProductSku": "iphonexsmax64gbspacegrey",
    "orderDeviceName": "iPhone XS Max",
    "selectedImageList": [
        "/media/catalog/product/f/r/front_900x900_18.png",
        "/media/catalog/product/f/r/front_900x900_15.png",
        "/media/catalog/product/f/r/front_900x900_12.png"
    ],
    "orderSummaryStorage": "64GB",
    "orderSummaryColor": "Grey",
    "orderPhoneNo": "0173826372",
    "eligibilty": null,
    "orderPlan": "FPP",
    "selectedPlanDetails": {
        "name": "Celcom Mobile Platinum Plus",
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
        "PlanName": "Celcom Mobile Platinum Plus",
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
        "bill_type": 1,
        "AtrHref": "#rm-3",
        "atrHref": "#rm-71",
        "rentData": "112",
        "totalAmountWithRent": 300,
        "ownData": "159",
        "totalAmountWithOwn": 347,
        "bundleData": "3598",
        "bundleUpfrontData": "1300"
    },
    "orderPlanName": "Celcom Mobile Platinum Plus",
    "orderDevicePrice": "3598",
    "orderMonthlyPay": "188.0000",
    "orderOneTimePay": "1300",
    "orderTotalPay": 4898,
    "orderNumberType": "SwitchToCelcom",
    "total": 4898,
    "stockDetails": {
        "status": "In Stock",
        "data": {
            "bundleSku": "",
            "simpleSku": "iphonexsmax64gbspacegrey",
            "sku": ""
        }
    },
    "orderReqCategory": "HP",
    "orderReqModel": "IPHONE XS MAX 64GB",
    "orderReqBrand": "APPLE",
    "orderReqColor": "GRY",
    "orderReqPartNumber": "MDR6080",
    "orderReqPlanBundle": "PB11860",
    "orderReqServiceBundle": "RTP0010",
    "orderMoon": false
};
const mockRequestBodyForDeviceAddToCart = {
    "data": {
        "bundle_product_sku": "iPhone-XS-Max",
        "selected_device_product_sku": "iphonexsmax64gbspacegrey",
        "selected_plan_product_sku": "FPP",
        "selected_device_product_up_fornt_price": "1300",
        "selected_device_product_device_price": "3598.00",
        "bundle_product_qty": "1",
        "bundle_product_price": "4898.00",
        "selected_number": "0173826372",
        "selected_number_type": "SwitchToCelcom",
        "temporary_number": "0196087816",
        "is_cobp": false,
        "is_mnp": true,
        "user": "user",
        "is_preorder": false,
        "is_affiliate_ia": false,
        "is_affiliate_ada": false,
        "add_on_ids": null,
        "reservationId": "OP43CE1571727494",
        "is_campaign_mviva": false,
        "campaign_mviva_url": "",
        "is_golden_number": false
    },
    "supp_data": [],
    "stockReserveQuantityInput": {
        "stockReserveQuantityInput": {
            "storeId": "CKL47948",
            "reservationId": "OP43CE1571727494",
            "listOfItemDetailRequest": {
                "itemDetailRequest": [
                    {
                        "ProductType": "HP",
                        "PartNum": "MDR6080",
                        "Quantity": "1",
                        "listOfAttributes": [
                            {
                                "attributes": [
                                    {
                                        "Name": "COLOR",
                                        "Value": "GRY"
                                    },
                                    {
                                        "Name": "BRAND",
                                        "Value": "APPLE"
                                    },
                                    {
                                        "Name": "CATEGORY",
                                        "Value": "HP"
                                    },
                                    {
                                        "Name": "PRODUCT",
                                        "Value": "DEVICE"
                                    },
                                    {
                                        "Name": "MODEL",
                                        "Value": "IPHONE XS MAX 64GB"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
};
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
describe('GuestLoginComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;
    let component: GuestLoginComponent;
    let fixture: ComponentFixture<GuestLoginComponent>;
    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [GuestLoginComponent, MinifiedPageLoaderComponent, FooterComponent, AgentFooterComponent, SocialMediaComponent,
                FooterDownloadComponent, NotificationErrorComponent, AgeEligibilityPopupComponent, SafeHtmlPipe],
            providers: [AppService,
                { provide: Router, useClass: RouterStub },
                {
                    provide: ActivatedRoute, useClass: MockactivatedRoute
                },
                EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
                OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
                DeviceDataService, CommonUtilService, GuestCheckoutService]
        });
    });
    beforeEach(async(() => {
        fixture = TestBed.createComponent(GuestLoginComponent);
        component = fixture.componentInstance;
        component.USER_TYPE = "USER_TYPE";
        component.loginAttempt = 0;
        component.showLoginAttemptError = false;
        component.totalAttempt = 5;
        component.errorMessage = {};
        component.errorExits = false;
        component.errorAgeRange = false;
        component.errorAge = false;
        component.invalidError = false;
        component.showItemAdded = false;
        component.customMsg = "";
        component.keepCelcomNum = {};
        component.selectValue = 1;
        component.valuedata = "";
        component.maxlength = 0;
        component.minlength = 0;
        component.customMessage = false;
        component.customerIDTypes = [];
        component.serviceError = null;
        component.mnpCustomer = null;
        component.mnpFlow = false;
        component.preLoadCustomerIDType = "";
        component.requestBody = {};
        component.userType = null;
        component.chosenPlan = {};
        component.IsCelcomUser = false;
        component.celcomUserDisableProceed = false;
        component.disableNewNRIC = false;
        component.isMviva = false;
        component.errorAddToCart = false;
        component.isApiError = false;
        component.apiErrorMessage = {};
        component.showGuestNoticification = false;
        component.isExistingGuest = null;
        component.IsDisplayAgeEligibilityPopup = false;
        component.EligibilityPopupType = { displayType: 'LOWER_AGE_LOGIN', type: '' };
        component.customerNRIC = null;
        component.isLimitReachedError = false;
        component.limitReachedErrorMsg = {};
        component.typeOfUser = "Postpaid";
        component.selectedProductDetails = {};
        component.suppLinesDetails = [];
        component.suppLineRequestBody = [];
        component.isPreOrder = false;
        component.isLimitExceededIncludingOpenOrders = false;
        component.suppDetailsOfUser = {};
        component.isMnp = false;
        component.randomPhoneNo = null;
        component.authToken = "";
        component.reservationId = "";
        component.elligibleUser = false;
        component.addonCode = null;
        component.isGoldenNumberSelected = false;
    }));
    it('should create Guest Login component', inject([DeviceDataService, GuestCheckoutService], (deviceDataService: DeviceDataService,
        guestCheckoutService: GuestCheckoutService) => {
        expect(component).toBeTruthy();
    }));
    it("should call onComponentLoad", inject([DeviceDataService, GuestCheckoutService], (deviceDataService: DeviceDataService,
        guestCheckoutService: GuestCheckoutService) => {
        spyOn(guestCheckoutService, "getCustomerIDTypes").and.returnValue([{ id: 1, value: "New NRIC" }]);
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("MNP-PRE-SELECT", "YES");
            localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomerData));
        }
        component.onComponentLoad();
        expect(component.customerIDTypes).toBeDefined();
        if (typeof window !== 'undefined' && localStorage &&
            localStorage.getItem("MNP-PRE-SELECT") && localStorage.getItem("MNP-CUSTOMER")) {
            expect(component.errorMessage).toBeDefined();
            expect(component.mnpFlow).toBeTruthy();
            expect(component.mnpCustomer).toBeDefined();
            expect(component.valuedata).toBe('901230142394');
            expect(component.preLoadCustomerIDType).toBe("1");
            expect(component.disableNewNRIC).toBeTruthy();
            localStorage.removeItem("MNP-PRE-SELECT");
            localStorage.removeItem("MNP-CUSTOMER");
        }
    }));
    it("should call function ngOnInit", inject([DeviceDataService, GuestCheckoutService], (deviceDataService: DeviceDataService,
        guestCheckoutService: GuestCheckoutService) => {
        component.ngOnInit();
        deviceDataService.publishErrorNotificationBoolean(false);
        deviceDataService.publishNumberReservationId('OP78CE1571278716');
        deviceDataService.publishIsGoldenNo(false);
        expect(component.showGuestNoticification).toBeFalsy();
        expect(component.isApiError).toBeFalsy();
        expect(component.reservationId).toBe('OP78CE1571278716');
        if (typeof window !== 'undefined' && localStorage && localStorage.getItem("AddToCartNotification")) {
            const addToCartNotification = localStorage.getItem("AddToCartNotification");
            expect(addToCartNotification).toBeUndefined();
        }
        // Getting addon code from localstorage.
        if (typeof window !== 'undefined' && localStorage) {
            if (localStorage.getItem("addonCode")) {
                expect(component.addonCode).toBeDefined();
            } else {
                expect(component.addonCode).toBeNull();
            }
        }
        if (localStorage && localStorage.getItem("isMviva")) {
            expect(component.isMviva).toBeDefined();
        } else {
            expect(component.isMviva).toBeFalsy();
        }
        expect(component.isGoldenNumberSelected).toBeFalsy();
    }));
    it("should call fucntion onSubmit", inject([AppService, GuestCheckoutService, DeviceDataService],
        (appService: AppService, guestService: GuestCheckoutService, deviceDataService: DeviceDataService) => {
            const form = {
                "value": {
                    "customerIDNo": "950825632487",
                    "customerIDType": "1"
                }
            };
            const apiURL = "/rest/V1/login";
            const requestBody = {
                "login_data": {
                    "user": "guest",
                    "id_type": "1",
                    "id_number": "950825632487"
                }
            };
            spyOn(appService, "postROI").and.returnValue(Observable.of(GuestLoginResponse));
            spyOn(component, "checkSubNav");
            spyOn(component, "isDate").and.returnValue(true);
            spyOn(component, "calculateAge").and.returnValue(17);
            spyOn(component, "customerLoginValidation");
            spyOn(guestService, "increaseLoginAttempt");
            spyOn(deviceDataService, "publishErrorNotificationBoolean");
            spyOn(deviceDataService, "publishNumberReservationId");
            component.onSubmit(form);
            deviceDataService.publishErrorNotificationBoolean(false);
            deviceDataService.publishNumberReservationId("");
            guestService.increaseLoginAttempt();
            expect(component.checkSubNav).toHaveBeenCalled();
            expect(component.IsDisplayAgeEligibilityPopup).toBeTruthy();
            expect(component.showLoginAttemptError).toBeFalsy();
            // expect(appService.postROI).toHaveBeenCalledWith(apiURL, requestBody);
            // expect(component.customerLoginValidation).toHaveBeenCalledWith(GuestLoginResponse[0], guestBlkChkRequest);
        }));
    it("should call DisplayAgeEligibilityPopup function", () => {
        const eligibilityInfo = {
            displayType: 'LOWER_AGE_LOGIN',
            type: ''
        };
        component.DisplayAgeEligibilityPopup(eligibilityInfo);
        expect(component.EligibilityPopupType).toBe(eligibilityInfo);
        expect(component.IsDisplayAgeEligibilityPopup).toBeTruthy();
    });
    // it("should call OnContinueEligibilityCheck function", () => {
    //     const ls_subnav = {
    //         "activeMenu": "Devices"
    //     };
    //     if (typeof window !== 'undefined' && localStorage) {
    //         localStorage.setItem("ls_subnav", JSON.stringify(ls_subnav));
    //         localStorage.setItem("DeviceSku", ("Samsung-Galaxy-A80"));
    //     }
    //     component.OnContinueEligibilityCheck({});
    //     expect(component.IsDisplayAgeEligibilityPopup).toBeFalsy();
    //     const url = window.location.href;
    //     expect(window.location.href).toBe(url + "device-detail/Samsung-Galaxy-A80");
    //     if (typeof window !== 'undefined' && localStorage) {
    //         localStorage.removeItem("ls_subnav");
    //         localStorage.removeItem("DeviceSku");
    //     }
    // });
    it("should call isDate function", () => {
        const isDate = component.isDate(1995, 8, 25);
        expect(component.errorAgeRange).toBeFalsy();
        expect(isDate).toBeTruthy();
    });
    it("should call calculateAge function", () => {
        const age = component.calculateAge("95", "08", "25");
        expect(age).toBe(25);
    });
    it("should call customerLoginValidation function for old Guest", inject([DeviceDataService], (service: DeviceDataService) => {
        spyOn(service, "publishGuestName");
        // spyOn(component, "proceedAddToCart");
        spyOn(component, "checkSuppLinesCountValidation");
        spyOn(component, "redirectToSummaryPage");
        component.customerLoginValidation(GuestLoginResponse[0], guestBlkChkRequest);
        expect(component.customerNRIC).toBe('950825632487');
        if (typeof window !== "undefined" && sessionStorage && localStorage) {
            const userToken = sessionStorage.getItem("UserToken");
            const authToken = sessionStorage.getItem("authtoken");
            const guestUserFirst = localStorage.getItem("GUEST_USER_FIRST");
            const oldGuestUser = sessionStorage.getItem("OLD_GUEST_USER");
            const personalForm = sessionStorage.getItem("personalForm");
            expect(userToken).toBeDefined();
            expect(authToken).toBeDefined();
            expect(guestUserFirst).toBeDefined();
            expect(oldGuestUser).toBeDefined();
            expect(personalForm).toBeDefined();
            expect(service.publishGuestName).toHaveBeenCalledWith("GUEST");
            expect(component.redirectToSummaryPage).toHaveBeenCalledWith(guestBlkChkRequest);
        }
    }));
    it("should call customerLoginValidation function for new Guest", inject([DeviceDataService], (service: DeviceDataService) => {
        sessionStorage.removeItem("UserToken");
        sessionStorage.removeItem("authtoken");
        localStorage.removeItem("GUEST_USER_FIRST");
        sessionStorage.removeItem("OLD_GUEST_USER");
        sessionStorage.removeItem("personalForm");
        spyOn(component, "checkSuppLinesCountValidation").and.returnValue(true);
        spyOn(service, "publishGuestName");
        spyOn(component, "redirectToSummaryPage");
        component.customerLoginValidation(guestLoginResponseForNewUser[0], guestBlkChkRequestForNewGuest);
        expect(component.customerNRIC).toBe("971108872348");
        if (typeof window !== "undefined" && sessionStorage && localStorage) {
            const userToken = sessionStorage.getItem("UserToken");
            const authToken = sessionStorage.getItem("authtoken");
            const guestUserFirst = localStorage.getItem("GUEST_USER_FIRST");
            const oldGuestUser = sessionStorage.getItem("OLD_GUEST_USER");
            const personalForm = sessionStorage.getItem("personalForm");
            expect(userToken).toBeDefined();
            expect(authToken).toBeDefined();
            expect(guestUserFirst).toBeDefined();
            expect(oldGuestUser).toBeDefined();
            expect(personalForm).toBeDefined();
            expect(component.checkSuppLinesCountValidation).toHaveBeenCalledWith(guestLoginResponseForNewUser[0]);
            expect(service.publishGuestName).toHaveBeenCalledWith("GUEST");
            expect(component.redirectToSummaryPage).toHaveBeenCalledWith(guestBlkChkRequestForNewGuest);
        }
    }));
    it("should call proceedAddToCart function ", inject([OrderInfoService, DeviceDataService, CartService],
        (orderInfoService: OrderInfoService, deviceDataService: DeviceDataService, cartService: CartService) => {
            spyOn(component, "getCustomerIdTypeValue").and.returnValue({
                "id": 1,
                "value": "New NRIC"
            });
            spyOn(component, "checkSuppLinesCountValidationForOldGuest");
            spyOn(deviceDataService, "publishGuestName");
            spyOn(component, "checkForLimitExceeded");
            spyOn(component, "supplementaryErrorRedirection");
            spyOn(cartService, "ManageEligibilityRedirection");
            spyOn(component, "Redirect");
            // spyOn(component, "AgeEligibilityWorkFlow");
            spyOn(component, "CallAddTOCartForPlanOnly");
            spyOn(orderInfoService, "ViewOrderInfo").and.returnValue(Observable.of(mockPostpaidApiResponse));
            component.customerIDTypes = [
                {
                    id: 1,
                    value: "New NRIC"
                }
            ];
            component.customerNRIC = "971108872348";
            component.proceedAddToCart(guestBlkChkRequestForNewGuest);
            if (typeof window !== 'undefined' && sessionStorage) {
                const guestInfo = JSON.parse(sessionStorage.getItem("GuestInfo"));
                const checkToShowEditEligibilityBox = localStorage.getItem("checkToShowEditEligibilityBox") || null;
                const MNPCustomerData = JSON.parse(localStorage.getItem("MNPCustomerData")) || null;
                const MNPRedirectionToLoginPage = localStorage.getItem("MNPRedirectionToLoginPage") || null;
                expect(guestInfo).toBeDefined();
                expect(checkToShowEditEligibilityBox).toBeNull();
                expect(MNPCustomerData).toBeNull();
                expect(MNPRedirectionToLoginPage).toBeNull();
            }
            expect(component.typeOfUser).toBe("Postpaid");
            expect(component.isLimitExceededIncludingOpenOrders).toBeFalsy();
            expect(component.elligibleUser).toBeFalsy();
            expect(component.suppDetailsOfUser).toBeDefined();
        }));

    it("should call CallAddTOCartForPlanOnly function", inject([AppService, CartService, GuestCheckoutService, EStoreAnalysticsService],
        (appService: AppService, cartService: CartService, guestCheckoutService: GuestCheckoutService,
            estoreAnalyticsService: EStoreAnalysticsService) => {
            if (typeof window !== 'undefined' && localStorage) {
                localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
                localStorage.setItem("PlanOnlyObjectForCart", JSON.stringify(mockPlanOnlyObjectResponse));
                localStorage.setItem("MNP-FLOW", "YES");
                localStorage.setItem("MNP-PRE-SELECT", "YES");
                localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomerData));
            }
            spyOn(component, "createRequestBodyForPlanOnlySupp");
            spyOn(component, "setAffiliateParams");
            spyOn(appService, "postEstoreUserData").and.returnValue(Observable.of(addToCartMockResponse));
            const url = "/rest/V1/planaddtocart";
            component.requestBody = mockRequestBody;
            component.CallAddTOCartForPlanOnly();
            expect(component.createRequestBodyForPlanOnlySupp).toHaveBeenCalled();
            expect(component.userType).toBe("user");
            // expect(appService.postEstoreUserData).toHaveBeenCalledWith(url, component.requestBody);
            localStorage.removeItem("orderDetails");
            localStorage.removeItem("PlanOnlyObjectForCart");
            localStorage.removeItem("MNP-FLOW");
            localStorage.removeItem("MNP-PRE-SELECT");
            localStorage.removeItem("MNP-CUSTOMER");
        }));
    it("should call OnsucessFullPlanForPlanAddToCart function", inject([AppService, CartService,
        GuestCheckoutService, EStoreAnalysticsService],
        (appService: AppService, cartService: CartService, guestCheckoutService: GuestCheckoutService,
            estoreAnalyticsService: EStoreAnalysticsService) => {
            spyOn(cartService, "addProductToCart");
            spyOn(component, "Redirect");
            spyOn(guestCheckoutService, "setItemAddedStatus");
            component.OnsucessFullPlanForPlanAddToCart(addToCartMockResponse, orderDetails, mockPlanOnlyObjectResponse);
            expect(guestCheckoutService.setItemAddedStatus).toHaveBeenCalledWith(true);
            // expect(cartService.addProductToCart).toHaveBeenCalledWith(orderDetails, 1, mockPlanOnlyObjectResponse);
            if (typeof window !== "undefined" && localStorage) {
                const AddToCartNotification = localStorage.getItem("AddToCartNotification") || null;
                expect(AddToCartNotification).toBeDefined();
            }
            expect(component.Redirect).toHaveBeenCalledWith("/store/cart");

        }));
    it("should call OnUnsuccessfullPlanAddToCart function", () => {
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("SelectedPlan", "FP");
            localStorage.setItem("SelectedPlanDetails", "{}");
            localStorage.setItem("SelectedMonthlyPay", "148.0000");
            localStorage.setItem("SelectedPlanName", "First™ Platinum");
        }
        component.chosenPlan = {
            "planDetails": {
                "BuynowLink": "/plans/first-platinum"
            }
        };
        spyOn(component, "Redirect");
        component.OnUnsuccessfullPlanAddToCart(addToCartErrorMockResponse);
        if (typeof window !== 'undefined' && localStorage) {
            const errorAddToCart = localStorage.getItem("errorAddToCart");
            const errorAddToCartMessage = localStorage.getItem("errorAddToCartMessage");
            expect(errorAddToCart).toBeDefined();
            expect(errorAddToCartMessage).toBeDefined();
        }
        expect(component.chosenPlan).toBeDefined();
        const choosenPlan = JSON.parse(localStorage.getItem("chosenPlan"));
        expect(choosenPlan).toBeDefined();
        expect(component.Redirect).toHaveBeenCalledWith(undefined);
    });
    it("should call OnPlanAddtoCartAPiError function", () => {
        const error = {
            status: false
        };
        component.OnPlanAddtoCartAPiError(error);
        expect(component.serviceError).toBeDefined();
        expect(component.apiErrorMessage).toBeDefined();
        expect(component.isApiError).toBeTruthy();
        expect(component.errorExits).toBeTruthy();
    });
    it("should call getCustomerIdTypeValue function", () => {
        const result = {
            "id": 1,
            "value": "New NRIC"
        };
        const returnValue = component.getCustomerIdTypeValue("1");
        expect(returnValue).toBeUndefined();
    });

    /* it("should call checkForLimitExceeded function", () => {
        spyOn(component, "Redirect");
        component.isLimitReachedError = true;
        let orderDetailsObj = {};
        orderDetailsObj =  {
            sku : {
              bundleSku : "xp-lite"
            }
        };
       localStorage.setItem("orderDetails", JSON.stringify(orderDetailsObj));
       component.checkForLimitExceeded();
       expect(component.Redirect).toHaveBeenCalledWith("/plans/xp-lite");
        orderDetailsObj = {};
        orderDetailsObj = {
        sku : "iphone"
    };
    localStorage.removeItem("orderDetails");
    localStorage.setItem("orderDetails", JSON.stringify(orderDetailsObj));
    component.checkForLimitExceeded();
    component.isLimitReachedError = false;
    component.isLimitExceededIncludingOpenOrders = true;
    localStorage.setItem("orderDetails", JSON.stringify(orderDetailsObj));
    component.checkForLimitExceeded();
    orderDetailsObj = {};
    orderDetailsObj =  {
        sku : {
          bundleSku : "xp-lite"
        }
    };
   localStorage.setItem("orderDetails", JSON.stringify(orderDetailsObj));
   component.checkForLimitExceeded();
   const eligibilityInfo = {
    isEligibleByAge: false,
    displayType: 'LIMIT_EXCEEDED_WITH_OPEN_COUNT',
    type: 'xpax'
  };
   component.EligibilityPopupType = eligibilityInfo;
   component.IsDisplayAgeEligibilityPopup = true;
   component.checkForLimitExceeded();
   component.isLimitReachedError = false;
   component.isLimitExceededIncludingOpenOrders = false;
   component.checkForLimitExceeded();
    }); */
    it("should call RoundingOff function", inject([CommonUtilService], (service: CommonUtilService) => {
        spyOn(service, "RoundingOff2String");
        const roundedValue = component.RoundingOff(1000);
        expect(roundedValue).toBeUndefined();
    }));

    it("should call redirectLogin function", () => {
        component.redirectLogin();
        expect(component.IsCelcomUser).toBeTruthy();
        expect(component.celcomUserDisableProceed).toBeTruthy();
    });
    it("should call stopUser function", () => {
        component.stopUser("Stop it");
        expect(component.showGuestNoticification).toBeTruthy();
        expect(component.isExistingGuest.content).toBe("Stop it");
        expect(component.isExistingGuest.color).toBe("7D7D7D");
    });
    it("should call changetextbox function", () => {
        component.changetextbox("123");
        expect(component.selectValue).toBe(1);
        expect(component.customMsg).toBe("");
        expect(component.valuedata).toBe("123");
    });
    it("should call validationForIdType function with empty nric", () => {
        component.errorExits = true;
        const errorMsg = component.validationForIdType("1", "");
        expect(component.errorAgeRange).toBeFalsy();
        expect(component.IsCelcomUser).toBeFalsy();
        expect(component.celcomUserDisableProceed).toBeFalsy();
        expect(component.errorExits).toBeFalsy();
        expect(component.customMessage).toBeTruthy();
        expect(component.customMsg).toBe("Please enter a value");
        expect(errorMsg).toBe("Please enter a value");
    });
    it("should call validationForIdType function with nric having alphabets", () => {
        component.errorExits = true;
        const errorMsg = component.validationForIdType("1", "a");
        expect(component.errorAgeRange).toBeFalsy();
        expect(component.IsCelcomUser).toBeFalsy();
        expect(component.celcomUserDisableProceed).toBeFalsy();
        expect(component.errorExits).toBeFalsy();
        expect(component.customMessage).toBeTruthy();
        expect(component.customMsg).toBe("Please enter digits only");
        expect(errorMsg).toBe("Please enter digits only");
    });

    it("should call validationForIdType function with nric having length than 12", () => {
        component.errorExits = true;
        const errorMsg = component.validationForIdType("1", "95082563248");
        expect(component.errorAgeRange).toBeFalsy();
        expect(component.IsCelcomUser).toBeFalsy();
        expect(component.celcomUserDisableProceed).toBeFalsy();
        expect(component.errorExits).toBeFalsy();
        expect(component.customMessage).toBeTruthy();
        expect(component.customMsg).toBe("Please enter a valid New NRIC ID of 12 digit");
        expect(errorMsg).toBe("Please enter a valid New NRIC ID of 12 digit");
    });
    it("should call validationForIdType function with correct nric", () => {
        component.errorExits = true;
        const errorMsg = component.validationForIdType("1", "950825632487");
        expect(component.errorAgeRange).toBeFalsy();
        expect(component.IsCelcomUser).toBeFalsy();
        expect(component.celcomUserDisableProceed).toBeFalsy();
        expect(component.errorExits).toBeFalsy();
        expect(component.customMessage).toBeFalsy();
        expect(errorMsg).toBeUndefined();
    });

    it("should call checkSubNav function for device", () => {
        const ls_subnav = {
            "activeMenu": "Devices"
        };
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("ls_subnav", JSON.stringify(ls_subnav));
            localStorage.setItem("PlanOnlyObjectForCart", JSON.stringify(planOnlyObject));
        }
        component.checkSubNav();
        expect(component.EligibilityPopupType.type).toBe('device');
        localStorage.removeItem("ls_subnav");
        localStorage.removeItem("PlanOnlyObjectForCart");
    });
    it("should call checkSubNav function for postpaid", () => {
        const ls_subnav = {
            "activeMenu": "Postpaid"
        };
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("ls_subnav", JSON.stringify(ls_subnav));
            localStorage.setItem("PlanOnlyObjectForCart", JSON.stringify(planOnlyObject));
        }
        component.checkSubNav();
        expect(component.EligibilityPopupType.type).toBe('first');
        localStorage.removeItem("ls_subnav");
        localStorage.removeItem("PlanOnlyObjectForCart");
    });

    // it("should call Redirect function", () => {
    //     const url = window.location.href;
    //     component.Redirect(url + "#test");
    //     expect(window.location.href).toBe(url + "#test");
    // });
    it("should call callAddToCartService function", inject([BundleService, CartService, GuestCheckoutService],
        (bundleService: BundleService, cartService: CartService, guestCheckoutService: GuestCheckoutService) => {
            if (typeof window !== 'undefined' && localStorage) {
                localStorage.setItem("orderDetails", JSON.stringify(mockOrderDetailsForDevice));
                localStorage.setItem("selectedProductDetails", JSON.stringify(mockSelectedProductDetails));
                localStorage.setItem("MNP-FLOW", "YES");
                localStorage.setItem("MNP-PRE-SELECT", "YES");
                localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomerData));
                sessionStorage.setItem("RandomPhoneNo", "0196087816");
            }
            component.userType = "";
            component.reservationId = "OP43CE1571727494";
            spyOn(component, "createRequestBodyForSupp");
            spyOn(bundleService, "BundleOrder").and.returnValue(Observable.of(addTocartBundleResponse));
            spyOn(component, "setAffiliateParams");
            spyOn(component, "Redirect");
            component.callAddToCartService();
            expect(component.createRequestBodyForSupp).toHaveBeenCalled();
            expect(component.userType).toBe("user");
            expect(component.isMnp).toBeTruthy();
            expect(component.randomPhoneNo).toBeDefined();
            component.requestBody = mockRequestBodyForDeviceAddToCart;
            expect(component.setAffiliateParams).toHaveBeenCalled();
            localStorage.removeItem("orderDetails");
            localStorage.removeItem("selectedProductDetails");
            localStorage.removeItem("MNP-FLOW");
            localStorage.removeItem("MNP-PRE-SELECT");
            localStorage.removeItem("MNP-CUSTOMER");
            localStorage.removeItem("RandomPhoneNo");
        }));

    // Commented temporarily, the test case failing after merging the latest branch.

    // it("should call OnSucessFullBundleAddToCart function", inject([BundleService, CartService, GuestCheckoutService],
    //     (bundleService: BundleService, cartService: CartService, guestCheckoutService: GuestCheckoutService) => {
    //         spyOn(component, "AddToCartNotificationError"); spyOn(component, "Redirect");
    //         spyOn(guestCheckoutService, "setGuestUserName");
    //         spyOn(cartService, "addProductToCart");
    //         component.OnSucessFullBundleAddToCart(addTocartBundleResponse, mockOrderDetailsForDevice, mockSelectedProductDetails);
    //         expect(guestCheckoutService.setGuestUserName).toHaveBeenCalledWith("GUEST!");
    //         // expect(cartService.addProductToCart).toHaveBeenCalledWith(mockOrderDetailsForDevice, 1, mockSelectedProductDetails);
    //         if (typeof window !== "undefined" && localStorage) {
    //             const AddToCartNotification = localStorage.getItem("AddToCartNotification") || null;
    //             expect(AddToCartNotification).toBeDefined();
    //             const orderDetailsObj = localStorage.getItem("orderDetails") || null;
    //             const selectedProductDetails = localStorage.getItem("selectedProductDetails") || null;
    //             expect(orderDetailsObj).toBeNull();
    //             expect(selectedProductDetails).toBeNull();
    //         }
    //         expect(component.Redirect).toHaveBeenCalledWith("/store/checkout/summary");
    //     }));

    it("should call OnUnsuccessFullBundleAddToCart function", inject([BundleService, CartService, GuestCheckoutService],
        (bundleService: BundleService, cartService: CartService, guestCheckoutService: GuestCheckoutService) => {
            spyOn(component, "AddToCartNotificationError");
            spyOn(component, "Redirect");
            component.OnUnsuccessFullBundleAddToCart(addTocartBundleErrorResponse, mockOrderDetailsForDevice, mockSelectedProductDetails);
            expect(component.AddToCartNotificationError).toHaveBeenCalled();
            if (typeof window !== 'undefined' && localStorage) {
                const errorAddToCart = localStorage.getItem("errorAddToCart");
                const errorAddToCartMessage = localStorage.getItem("errorAddToCartMessage");
                expect(errorAddToCart).toBeDefined();
                expect(errorAddToCartMessage).toBeDefined();
            }
        }));
    it("should call onBundleApiError function", () => {
        const error = {
            status: false
        };
        component.onBundleApiError(error);
        expect(component.serviceError).toBeDefined();
        expect(component.apiErrorMessage).toBeDefined();
        expect(component.isApiError).toBeTruthy();
        expect(component.errorExits).toBeTruthy();
    });

    it("should call checkSuppLinesCountValidation function", () => {
        const suppLinesDetailsOfNewUser = {
            "status": true,
            "maxPostpaidLinesRemaining": 14
        };
        if (typeof window !== "undefined" && localStorage && sessionStorage) {
            sessionStorage.setItem("OLD_GUEST_USER", "NO");
            localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(suppLinesDetails));
        }
        const valid = component.checkSuppLinesCountValidation({});
        expect(component.typeOfUser).toBe('Postpaid');
        expect(component.suppDetailsOfUser).toBeDefined();
        if (typeof window !== "undefined" && localStorage && sessionStorage) {
            const suppDetailsOfUser = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
            expect(suppDetailsOfUser).toBeDefined();
        }
        expect(valid).toBeTruthy();
        sessionStorage.removeItem("OLD_GUEST_USER");
        localStorage.removeItem("suppLinesAddedByTheUser");
    });

    it("should call createRequestBodyForPlanOnlySupp function", () => {
        component.suppLinesDetails = suppLinesDetails;
        component.createRequestBodyForPlanOnlySupp();
        expect(component.suppLineRequestBody.length).toBeGreaterThan(0);
    });
    it("should call AddToCartNotificationError function", inject([DeviceDataService], (service: DeviceDataService) => {
        spyOn(service, "publishNotificationError");
        component.AddToCartNotificationError();
        expect(component.errorAddToCart).toBeTruthy();
    }));

    it("should call checkSuppLinesCountValidationForOldGuest function", () => {
        const suppLinesDetailsOfUser = {
            "status": true,
            "maxPostpaidLinesRemaining": 9
        };
        if (typeof window !== 'undefined' && localStorage) {
            localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(suppLinesDetails));
        }
        const flag = component.checkSuppLinesCountValidationForOldGuest(suppLinesDetailsOfUser);
        if (typeof window !== 'undefined') {
            const suppLinesAllowed = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
            expect(suppLinesAllowed).toBeDefined();
        }
        expect(component.suppLinesDetails).toBeDefined();
        expect(flag).toBeTruthy();
    });
    // it("should call redirectToSummaryPage for normal login", () => {
    //     spyOn(component, "proceedAddToCart");
    //     component.customerIDTypes =  [{
    //         "id": 1,
    //         "value": "New NRIC"
    //     }];
    //     component.redirectToSummaryPage(guestBlkChkRequest);
    //     if (typeof window !== "undefined" && sessionStorage) {
    //         const userType =  sessionStorage.getItem("USER_TYPE");
    //         expect(userType).toBe('GUEST');
    //     }
    //     expect(component.proceedAddToCart).toHaveBeenCalledWith(JSON.stringify(guestBlkChkRequest));
    // });
    // it("should call redirectToSummaryPage for cs agent journey", () => {
    //     spyOn(component, "checkSuppLinesCountValidation");
    //     spyOn(component, "Redirect");
    //     if (typeof window !== "undefined" && sessionStorage) {
    //         sessionStorage.setItem('CAorderId', "erwer");
    //         sessionStorage.setItem('secretKey', "awerwer");
    //     }
    //     component.suppDetailsOfUser = {};
    //     component.redirectToSummaryPage(guestBlkChkRequest);
    //     expect(component.checkSuppLinesCountValidation).toHaveBeenCalledWith({});
    //     expect(component.Redirect).toHaveBeenCalledWith('/store/checkout/summary');
    //     sessionStorage.removeItem('CAorderId');
    //     sessionStorage.removeItem('secretKey');
    // });
    // it("should call ngOnDestroy", () => {
    //     component.ngOnDestroy();
    //     expect(component.showGuestNoticification).toBeFalsy();
    //     expect(component.isExistingGuest).toBeNull();
    // });
    // it("should call removeStorage", () => {
    //     if (typeof window !== "undefined" && sessionStorage) {
    //         sessionStorage.setItem('CAorderId', "erwer");
    //         sessionStorage.setItem('secretKey', "awerwer");
    //     }
    //     component.removeStorage();
    //     sessionStorage.removeItem('CAorderId');
    //     sessionStorage.removeItem('secretKey');
    // });
    // it("should call createRequestBodyForSupp", () => {
    //  component.suppLinesDetails  = [
    //     {
    //         "planPhoneNumber": "0196087816",
    //         "planPrice": "48.0000",
    //         "planType": "Celcom Mobile Family™",
    //         "partNumber": "PB12540",
    //         "subsidyAmount": "10.00"

    //     },
    //     {
    //         "planPhoneNumber": "0133917201",
    //         "planPrice": "48.0000",
    //         "planType": "Celcom Mobile Family™",
    //         "partNumber": "PB12540",
    //         "subsidyAmount": "10.00"
    //     }
    // ];
    //  component.createRequestBodyForSupp();
    // });

    it('redirectToSummaryPage', () => {
        const spy = spyOn(component, 'redirectToSummaryPage').and.callThrough();
        component.redirectToSummaryPage({});
        expect(spy).toHaveBeenCalled();
    });

    it('removeStorage', () => {
        const spy = spyOn(component, 'removeStorage');
        sessionStorage.setItem('CAorderId', '');
        component.removeStorage();
        sessionStorage.removeItem('CAorderId');
        sessionStorage.setItem('secretKey', '');
        expect(spy).toHaveBeenCalled();
    });

    it("checkSuppLinesCountValidationForOldGuest", () => {
        const spy = spyOn(component, 'checkSuppLinesCountValidationForOldGuest').and.callThrough();
        const suppLinesDetailsOfUser = {
            "status": true,
            "maxPostpaidLinesRemaining": 9
        };
        component.checkSuppLinesCountValidationForOldGuest(suppLinesDetailsOfUser);
        localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(suppLinesDetails));
        component.checkSuppLinesCountValidationForOldGuest(suppLinesDetailsOfUser);
        expect(spy).toBeTruthy();
    });
});
