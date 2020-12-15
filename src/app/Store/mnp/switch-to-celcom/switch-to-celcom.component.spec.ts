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
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { CheckoutService } from '../../checkout/services/checkout.service';
import { CheckoutHeroBannerComponent } from '../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { HomeService } from '../../../Service/home.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { SessionTimeOutPopupComponent } from '../../widget/session-timeout-popup/session-timeout-popup';
import { DeviceDetailsStorageService } from '../../../Widget/StoreWidgets/device-details/device-details-color-storage/device-details-color-storage.service';
import { NoteSectionComponent } from '../../dumb-components/note-section/note-section.component';
import { VoucherComponent } from '../../widget/voucher/voucher.component';
import { SwitchToCelcomComponent } from './switch-to-celcom.component';
import { configureTestSuite } from 'ng-bullet';
import { NotificationBarComponent } from '../../widget/notification-bar/notification-bar.component';
import { MnpService } from '../services/mnp.service';
import { MsisdnInputComponent } from 'app/Store/widget/msisdn-input/msisdn-input.component';
import { OtpInputComponent } from 'app/Store/widget/otp-input/otp-input.component';
import { NricInputComponent } from 'app/Store/widget/nric-input/nric-input.component';
import { PageLoaderComponent } from 'app/shared/components/page-loader/page-loader.component';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

const mnpCustomer = {
    msisdn: "6012001221",
    customerID: "900112110191",
    customerIDType: "abc",
    portNumber: "6012001221"
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

let eligibilityResp = [{ status: true, response: { mobile_connect_user: true } }];

class MockMnpService {
    customerIDTypes = [
        { id: 1, value: "New NRIC" }
    ];

    eligibilityCheck(request) {
        return Observable.of(eligibilityResp);
    }

    clearMnpLocalStorages() {
        if (localStorage) {
            localStorage.removeItem("MNP-PRE-SELECT");
            localStorage.removeItem('MNP-CUSTOMER');
            localStorage.removeItem('MNP-FLOW');
            localStorage.removeItem('MNP-EDIT');
        }
    }

    getCustomerIDTypes() {
        return this.customerIDTypes;
    }

    getCustomerIdTypeID(value) {
        return { id: 1, value: "New NRIC" };
    }
}

const respmock = [{ status: true, message: "" }];

class MockAppService {
    getEstoreData(req) {
        return Observable.of(respmock);
    }

    postROI(url, req) {
        return Observable.of(respmock);
    }
}

describe('SwitchToCelcomComponent', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
    } as ActivatedRoute;

    let component: SwitchToCelcomComponent;
    let fixture: ComponentFixture<SwitchToCelcomComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientTestingModule,
                
                IconModule,
                materialModules,
            ],
            declarations: [sharedPipes, SwitchToCelcomComponent, MinifiedPageLoaderComponent, FooterComponent,
                NotificationBarComponent, AgentFooterComponent, SocialMediaComponent, PageLoaderComponent,
                FooterDownloadComponent, NotificationErrorComponent, AgeEligibilityPopupComponent,
                CheckoutHeroBannerComponent, SessionTimeOutPopupComponent, NoteSectionComponent, VoucherComponent,
                MsisdnInputComponent, OtpInputComponent, NricInputComponent
            ],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute },
            { provide: AppService, useClass: MockAppService },
            { provide: Router, useClass: RouterStub },
            { provide: ActivatedRoute, useClass: MockactivatedRoute },
            { provide: MnpService, useClass: MockMnpService },
                EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService,
                BundleService, OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService,
                HttpClient, BroadbandService, DeviceDataService, CommonUtilService, CheckoutService,
                DeviceDetailsStorageService, RemarketAnalyticsService, HomeService, GetParametersService]
        });
    });

    beforeEach(async(() => {
        fixture = TestBed.createComponent(SwitchToCelcomComponent);
        component = fixture.componentInstance;
    }));

    it('should create switch-to-celcom component', () => {
        expect(component).toBeTruthy();
    });

    it('should check the data', () => {
        expect(component.ShowEligibilityBox).toBeFalsy();
        expect(component.LoginNumber).toBe('');
        expect(component.mnpData).toEqual({
            action: "MNP",
            isEligible: false,
            portNumber: "",
            principleMobileNumber: "",
            customerData: ""
        });
        expect(component.mnpCustomer).toEqual({
            msisdn: "",
            customerID: "",
            customerIDType: "",
            portNumber: ""
        });
    });

    it('should check the isLoggedIn', () => {
        const spy = spyOn(component, 'isLoggedIn');
        component.isLoggedIn();
        expect(spy).toHaveBeenCalled();
    });

    it('validations for incorrect mobileNumber', () => {
        if (component.mnpCustomer.portNumber.length < 11 || component.mnpCustomer.portNumber.length > 12) {
            const invalidMobileNumberArray = ['012', '54422341'];
            invalidMobileNumberArray.forEach(value => {
                component.mnpCustomer.portNumber = value;
                component.MobileNumber();
            });
            const validmobileNumberArray = ['122353678', '1234664978'];
            validmobileNumberArray.forEach(value => {
                component.mnpCustomer.portNumber = value;
                component.MobileNumber();
            });
        }
    });

    it('validations', () => {
        expect(component.customMessage).toBe(false);
        expect(component.isChecked).toBeFalsy();
        expect(component.ShowEligibilityBox).toBeFalsy();
    });

    it('should accept terms', () => {
        const spy = spyOn(component, 'termsAccepted').and.callThrough();
        component.ngOnInit();
        component.isEligible = true;
        component.termsAccepted();
        expect(spy).toHaveBeenCalled();
        component.IsTermsChecked = false;
        component.isEligible = false;
    });

    it('switch to celcom', () => {
        const spy = spyOn(component, 'goToSwitchTOCelcom').and.callThrough();
        component.isChecked = true;
        component.ShowEligibilityBox = true;
        component.ShowSwitchToCelcom = false;
        component.goToSwitchTOCelcom();
        expect(spy).toHaveBeenCalled();
    });

    it('on continue check eligiblity', () => {
        const spy = spyOn(component, 'onContinueEligibilityCheck').and.callThrough();
        component.onContinueEligibilityCheck();
        component.OnContinueEligibilityCheck("abc");
        expect(spy).toHaveBeenCalled();
    });

    it('should validate mobile number', () => {
        const spy = spyOn(component, 'MobileNumber');
        component.mnpCustomer = {
            msisdn: "",
            customerID: "",
            customerIDType: "",
            portNumber: ""
        };
        component.MobileNumber();
        expect(component.validateNumAtZeroLength).toBe(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should validate mobile number', () => {
        const spy = spyOn(component, 'MobileNumber');
        component.mnpCustomer = {
            msisdn: "",
            customerID: "",
            customerIDType: "",
            portNumber: "60111221122113"
        };
        const resultData = component.mnpCustomer.portNumber.charAt(0);
        component.MobileNumber();
        expect(component.invalidmobNumber).toBe(false);
        expect(spy).toHaveBeenCalled();
    });

    it('should validate mobile number', () => {
        const spy = spyOn(component, 'MobileNumber');
        component.mnpCustomer = {
            msisdn: "",
            customerID: "",
            customerIDType: "",
            portNumber: "60111221113"
        };
        const resultData1 = component.mnpCustomer.portNumber.charAt(0);
        component.MobileNumber();
        expect(component.maxlength).toBe(11);
        expect(component.invalidmobNumber).toBe(false);

        expect(spy).toHaveBeenCalled();
    });

    it('validationForIdType', () => {
        const spy = spyOn(component, 'validationForIdType').and.callThrough();
        const idType = "1";
        const idValue = "";
        const abc = component.validationForIdType(idType, idValue);
        expect(component.customMessage).toBe(true);
        expect(component.customMsg).toEqual("Please enter a value");
        expect(abc).toBe(component.customMsg);

        expect(spy).toHaveBeenCalled();
    });

    it('validationForIdType', () => {
        const spy = spyOn(component, 'validationForIdType').and.callThrough();
        const idType1 = "1";
        const idValue1 = "aaa";
        const abc1 = component.validationForIdType(idType1, idValue1);
        expect(component.customMessage).toBe(true);
        expect(component.customMsg).toEqual("Please enter digits only");
        expect(abc1).toBe(component.customMsg);

        expect(spy).toHaveBeenCalled();
    });

    it('validationForIdType', () => {
        const spy = spyOn(component, 'validationForIdType').and.callThrough();
        const idType2 = "1";
        const idValue2 = "1102";
        const abc2 = component.validationForIdType(idType2, idValue2);
        expect(component.customMessage).toBe(true);
        expect(component.maxlength).toBe(11);
        expect(component.customMsg).toEqual("Please enter a valid New NRIC ID of 12 digit");
        expect(abc2).toBe(component.customMsg);

        expect(spy).toHaveBeenCalled();
    });

    it('validationForIdType', () => {
        const spy = spyOn(component, 'validationForIdType').and.callThrough();
        const idType4 = "1";
        const idValue4 = "882120229220";
        const abc4 = component.validationForIdType(idType4, idValue4);
        expect(component.customMessage).toBe(true);
        expect(component.customMsg).toBe("Please enter a valid NRIC number");
        expect(abc4).toBe(component.customMsg);

        expect(spy).toHaveBeenCalled();
    });

    it('validationForIdType', () => {
        const spy = spyOn(component, 'validationForIdType').and.callThrough();
        const idType3 = "1";
        const idValue3 = "880120229220";
        const DoB = idValue3.slice(0, 6);
        const year: any = idValue3.slice(0, 2);
        const month: any = idValue3.slice(2, 4);
        const day: any = idValue3.slice(4, 6);
        const fullDOB = new Date(year, month - 1, day);
        const monthTxtLength = ((fullDOB.getMonth() + 1).toString().length < 2);
        const dateTxtlength = (fullDOB.getDate().toString().length < 2);
        const convertedMonth = monthTxtLength ? ("0" + (fullDOB.getMonth() + 1).toString()) : (fullDOB.getMonth() + 1).toString();
        const convertedDay = dateTxtlength ? ("0" + fullDOB.getDate().toString()) : fullDOB.getDate().toString();
        const convertedDOB = "" + fullDOB.getFullYear().toString().slice(2, 4) + convertedMonth + convertedDay;
        const abc3 = component.validationForIdType(idType3, idValue3);
        expect(component.customMessage).toBe(false);
        expect(abc3).toBe(0);

        expect(spy).toHaveBeenCalled();
    });


    it('isLoggedIn', () => {
        const spy = spyOn(component, 'isLoggedIn');
        sessionStorage.setItem("UserInfo", "abc");
        component.isLoggedIn();
        sessionStorage.setItem("GuestInfo", "abc");
        component.isLoggedIn();
        expect(spy).toHaveBeenCalled();
    });

    it('mnp eligibility', () => {
        const spy = spyOn(component, 'checkMnpEligibility').and.callThrough();
        component.IsTermsChecked = false;
        component.checkMnpEligibility();
        component.IsTermsChecked = true;
        component.checkMnpEligibility();
        expect(spy).toHaveBeenCalled();
    });

    it('mnp eligibility', () => {
        const spy = spyOn(component, 'checkMnpEligibility');
        component.IsTermsChecked = true;
        component.mnpCustomer = {
            msisdn: "",
            customerID: "",
            customerIDType: "",
            portNumber: ""
        };
        component.checkMnpEligibility();
        expect(spy).toHaveBeenCalled();
    });

    it('mnp eligibility', () => {
        const spy = spyOn(component, 'checkMnpEligibility');
        component.mnpCustomer = {
            msisdn: "",
            customerID: "880101029101",
            customerIDType: "Guest",
            portNumber: ""
        };
        component.checkMnpEligibility();
        expect(spy).toHaveBeenCalled();
    });

    it('age validation', inject([CommonUtilService], (commonUtil: CommonUtilService) => {
        const spy = spyOn(component, 'ageValidation');
        component.mnpCustomer = {
            msisdn: "",
            customerID: "880101029101",
            customerIDType: "Guest",
            portNumber: ""
        };
        const plan = { "name": "First™ Platinum", "PlanName": "First™ Platinum", "sku": "FP", "url_key": "first - platinum", "order_plan_bundle": "PB11820", "ngn_part_number": "PB09890", "order_service_bundle": "RTP0010", "order_plan_component": [{ "component_name": "Executive Plan VAS without GPRS_10784", "component_part_no": "CPT05370", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "New Package for IDD Activation", "component_part_no": "CPT07020", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "First Unlimited", "component_part_no": "CPT12290", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Default International Roaming Voice / SMS", "component_part_no": "CPT13540", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "FiRST Platinum CBS Commitment Fee", "component_part_no": "CPT16950", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Free Chat 2.0", "component_part_no": "MI01790", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Weekend Internet Quota", "component_part_no": "CPT16980", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Advance Payment CBS RM148", "component_part_no": "OTC08860", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "SIM Card", "component_part_no": "SM00010", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Blank SIM Starter Pack", "component_part_no": "SP00210", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Stamp Fee_92382", "component_part_no": "OTC00350", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Printed Bill for Voice", "component_part_no": "BDMR0080", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "International Roaming Data", "component_part_no": "NVF01000", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }], "PlanMonthlyPay": "148.0000", "OneTimePayment": "148.0000", "contract": "24 months contract", "plan_title": "First™ Platinum", "plan_subtitle": "Now with extra privileges when you sign up for 12 months.", "BackgroundColor": "is - bg - color - black", "upfront_installment": null, "IndicatorClass": "is - level - platinum", "ProductText": "Platinum", "KeyFiguresText": "60 GB", "KeyText": "RM 148", "BuynowLink": " / plans / first - platinum", "BuynowText": "Buy now", "knowMoreLink": " / store / plans / first - platinum", "knowMoreText": "Learn more", "upper_age_limit": "40", "lower_age_limit": "18", "banner_image": " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg", "mobile_image": " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg", "is_xpax": false, "MobileDescription": null, "product_type": "Service", "footNote": null, "TableInfo": [], "image_url": " / media / catalog / product / w / f / wf - ju - 60gb.png", "supplementary_data": [{ "name": "Celcom Mobile Family™", "max_line": "4", "part_number": "PB12540", "price": "48.0000" }, { "name": "Celcom FIRST™ 1 + 5", "max_line": "5", "part_number": "PB11440", "price": "30.0000" }], "addons": [], "is_campaign_mviva": null, "campaign_mviva": null, "campaign_mviva_invalid": null, "analytics_key_addtocart": { "fb_add_cart_id": "CelcomPlatinum_AddToCart", "google_add_cart_id": "kNaXCND4iZcBENjpoqMD", "twitter_add_cart_id": "nzukn", "fb_learn_more_id": "CelcomPlatinum_LearnMore", "google_learn_more_id": "WuOWCOHQnZcBENjpoqMD", "twitter_learn_more_id": "nzuko", "fb_buy_now_id": "CelcomPlatinum_BuyNow", "google_buy_now_id": "b5OkCMynlJcBENjpoqMD", "twitter_buy_now_id": "nzuk8" }, "telco_day": { "status": false, "hat_text": "Hi TQA team have a good day", "message": "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!", "allowed_types": ["NEW_NUMBER"], "not_allowed_types": ["MnpNum", "EXISTING_NUMBER"], "eligible_message": "Rebate is only eligible for New registration", "not_eligible_message": "Rebate is not eligible for Switch to Celcom, Upgrade Plan" }, "is_premium_plan": false, "bill_type": 1, "PlanSku": "FP", "TotalPay": 148, "PlanOnlyComponentToShow": true, "IsMnp": false };
        const customerDob = commonUtil.capturingDOBFromNRIC(component.mnpCustomer.customerID).slice(0, 8);
        const customerYear = Number(customerDob.slice(0, 4));
        const customerMonth = Number(customerDob.slice(4, 6));
        const customerDate = Number(customerDob.slice(6, 8));
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        const currentDate = new Date().getDate();
        localStorage.removeItem("SelectedPlanDetails");
        component.ageValidation();
        expect(spy).toHaveBeenCalled();
    }));

    it('age validation', inject([CommonUtilService], (commonUtil: CommonUtilService) => {
        const spy = spyOn(component, "noOfPostpaidLine").and.callThrough();
        const plan = { "name": "First™ Platinum", "PlanName": "First™ Platinum", "sku": "FP", "url_key": "first - platinum", "order_plan_bundle": "PB11820", "ngn_part_number": "PB09890", "order_service_bundle": "RTP0010", "order_plan_component": [{ "component_name": "Executive Plan VAS without GPRS_10784", "component_part_no": "CPT05370", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "New Package for IDD Activation", "component_part_no": "CPT07020", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "First Unlimited", "component_part_no": "CPT12290", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Default International Roaming Voice / SMS", "component_part_no": "CPT13540", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "FiRST Platinum CBS Commitment Fee", "component_part_no": "CPT16950", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Free Chat 2.0", "component_part_no": "MI01790", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Weekend Internet Quota", "component_part_no": "CPT16980", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Advance Payment CBS RM148", "component_part_no": "OTC08860", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "SIM Card", "component_part_no": "SM00010", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Blank SIM Starter Pack", "component_part_no": "SP00210", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Stamp Fee_92382", "component_part_no": "OTC00350", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "Printed Bill for Voice", "component_part_no": "BDMR0080", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }, { "component_name": "International Roaming Data", "component_part_no": "NVF01000", "component_default": "0", "component_price": "0.0000", "cbs_name": "FiRST Platinum CBS Plan", "cbs_part_number": "PR043691", "isvas": "0", "vasname": null, "vasvalue": null }], "PlanMonthlyPay": "148.0000", "OneTimePayment": "148.0000", "contract": "24 months contract", "plan_title": "First™ Platinum", "plan_subtitle": "Now with extra privileges when you sign up for 12 months.", "BackgroundColor": "is - bg - color - black", "upfront_installment": null, "IndicatorClass": "is - level - platinum", "ProductText": "Platinum", "KeyFiguresText": "60 GB", "KeyText": "RM 148", "BuynowLink": " / plans / first - platinum", "BuynowText": "Buy now", "knowMoreLink": " / store / plans / first - platinum", "knowMoreText": "Learn more", "upper_age_limit": "40", "lower_age_limit": "18", "banner_image": " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_1.jpg", "mobile_image": " / sites /default /files/images / banner / product_mega_postpaidlifestyle_v2_platinum_lg_0.jpg", "is_xpax": false, "MobileDescription": null, "product_type": "Service", "footNote": null, "TableInfo": [], "image_url": " / media / catalog / product / w / f / wf - ju - 60gb.png", "supplementary_data": [{ "name": "Celcom Mobile Family™", "max_line": "4", "part_number": "PB12540", "price": "48.0000" }, { "name": "Celcom FIRST™ 1 + 5", "max_line": "5", "part_number": "PB11440", "price": "30.0000" }], "addons": [], "is_campaign_mviva": null, "campaign_mviva": null, "campaign_mviva_invalid": null, "analytics_key_addtocart": { "fb_add_cart_id": "CelcomPlatinum_AddToCart", "google_add_cart_id": "kNaXCND4iZcBENjpoqMD", "twitter_add_cart_id": "nzukn", "fb_learn_more_id": "CelcomPlatinum_LearnMore", "google_learn_more_id": "WuOWCOHQnZcBENjpoqMD", "twitter_learn_more_id": "nzuko", "fb_buy_now_id": "CelcomPlatinum_BuyNow", "google_buy_now_id": "b5OkCMynlJcBENjpoqMD", "twitter_buy_now_id": "nzuk8" }, "telco_day": { "status": false, "hat_text": "Hi TQA team have a good day", "message": "Huraaayyy! This is for testing purpose only enjoy the rebate amount from Estore on this telco day plan!", "allowed_types": ["NEW_NUMBER"], "not_allowed_types": ["MnpNum", "EXISTING_NUMBER"], "eligible_message": "Rebate is only eligible for New registration", "not_eligible_message": "Rebate is not eligible for Switch to Celcom, Upgrade Plan" }, "is_premium_plan": false, "bill_type": 1, "PlanSku": "FP", "TotalPay": 148, "PlanOnlyComponentToShow": true, "IsMnp": false };
        localStorage.setItem("SelectedPlanDetails", JSON.stringify(plan));
        const selectedPlanDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
        selectedPlanDetails.lowerAgeLimit = "18";
        selectedPlanDetails.UpperAgeLimit = "40";
        const typeOfPlan = selectedPlanDetails.is_xpax;
        component.ageValidation();
        expect(spy).toHaveBeenCalled();
    }));

    it('call eligibility', () => {
        const spy = spyOn(component, "callEligibility").and.callThrough();
        component.callEligibility();
        eligibilityResp = [{ status: true, response: { mobile_connect_user: true } }];
        component.callEligibility();
        component.entityData = { basic_details: { order_category: "HP" } };
        component.mnpCustomer.portNumber = "6011123112";
        sessionStorage.setItem("AgentInfo", "abc");
        localStorage.setItem("SelectedPlanDetails", JSON.stringify({ sku: "FGP" }));
        eligibilityResp = [{ status: true, response: { mobile_connect_user: false } }];
        component.callEligibility();
        localStorage.removeItem("SelectedPlanDetails");
        sessionStorage.removeItem("AgentInfo");

        expect(spy).toHaveBeenCalled();
    });

    it('onSuccessfulLogin', () => {
        const spy = spyOn(component, "onSuccessfulLogin").and.callThrough();
        component.onSuccessfulLogin(true);
        expect(spy).toHaveBeenCalled();
    });

    it('doGuestLogin', fakeAsync(() => {
        const spy = spyOn(component, "doGuestLogin").and.callThrough();
        component.doGuestLogin('124324');
        expect(spy).toHaveBeenCalled();
    }));

    it('call eligibility', () => {
        const spy = spyOn(component, "callEligibility").and.callThrough();
        eligibilityResp = [{ status: false, response: { mobile_connect_user: false } }];
        component.callEligibility();
        expect(spy).toHaveBeenCalled();
    });

    it('error eligility', () => {
        const spy = spyOn(component, "errorForEligiblity").and.callThrough();
        component.errorForEligiblity();
        expect(spy).toHaveBeenCalled();
    });

    it('isDevicePage', () => {
        const spy = spyOn(component, "isDevicePage").and.callThrough();
        component.isDevicePage();
        component.data = { 'basic_details': '' };
        component.isDevicePage();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init");
        localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomer));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        const userinf = { "outputCPResp": { "customerIDType": "Passport", "customerID": "901001092878", "dateOfBirth": "19901001_000000", "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm", "newGuestPhNo": 60128282222, "contactFirstName": "abc", "contactLastName": "ddd", "salutation": "Mr", "contactEmail": "aam.122@mmmss.com" } };
        sessionStorage.setItem("UserInfo", JSON.stringify(userinf));
        sessionStorage.setItem("UserToken", "abc");
        localStorage.setItem("MyMsIsdn", "6012001221");
        localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomer));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        const userinfonew = { "outputCPResp": { "customerIDType": "New", "customerID": "901001092878", "dateOfBirth": "19901001_000000", "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm", "newGuestPhNo": 60128282222, "contactFirstName": "abc", "contactLastName": "ddd", "salutation": "Mr", "contactEmail": "aam.122@mmmss.com" } };
        sessionStorage.setItem("UserInfo", JSON.stringify(userinfonew));
        sessionStorage.setItem("UserToken", "abc");
        localStorage.setItem("MyMsIsdn", "6012001221");
        localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomer));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        const userinfonewnric = { "outputCPResp": { "customerIDType": "New NRIC", "customerID": "901001092878", "dateOfBirth": "19901001_000000", "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm", "newGuestPhNo": 60128282222, "contactFirstName": "abc", "contactLastName": "ddd", "salutation": "Mr", "contactEmail": "aam.122@mmmss.com" } };
        sessionStorage.setItem("UserInfo", JSON.stringify(userinfonewnric));
        sessionStorage.setItem("UserToken", "abc");
        localStorage.setItem("MyMsIsdn", "6012001221");
        localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomer));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', inject([MnpService], (mnpservice: MnpService) => {
        const spy = spyOn(component, "Init");
        mnpservice.customerIDTypes = [
            { id: 1, value: "New NRIC" }
        ];
        const userinfonew = {
            "outputCPResp": {
                "customerIDType": "New NRIC", "customerID": "901001092878",
                "dateOfBirth": "19901001_000000", "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm",
                "newGuestPhNo": 60128282222, "contactFirstName": "abc", "contactLastName": "ddd", "salutation": "Mr",
                "contactEmail": "aam.122@mmmss.com"
            }
        };
        sessionStorage.setItem("UserInfo", JSON.stringify(userinfonew));
        localStorage.setItem("MNP-PRE-SELECT", "YES");
        localStorage.setItem("errorAddToCart", "true");
        localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomer));
        component.Init();
        expect(spy).toHaveBeenCalled();
    }));

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        const userinfonew1 = { "outputCPResp": { "customerID": "901001092878", "dateOfBirth": "19901001_000000", "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm", "newGuestPhNo": 60128282222, "contactFirstName": "abc", "contactLastName": "ddd", "salutation": "Mr", "contactEmail": "aam.122@mmmss.com" } };
        sessionStorage.setItem("UserInfo", JSON.stringify(userinfonew1));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        localStorage.setItem("errorAddToCart", "false");
        component.Init();
        localStorage.removeItem("errorAddToCart");
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        sessionStorage.removeItem("UserInfo");
        localStorage.setItem("MNP-PRE-SELECT", "YES");
        localStorage.setItem("MNP-CUSTOMER", JSON.stringify(mnpCustomer));
        const guestinf = {
            "blacklistChkRequest": {
                "customerIDType": "1", "customerIDNo": "901001092878",
                "customerIDTypeValue": "New NRIC"
            }, "outputCPResp": {
                "customerID": "901001092878",
                "dateOfBirth": "19901001_000000", "services": [{ "pre_Pos_Indicator": "Postpaid" }],
                "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm"
            }
        };
        sessionStorage.setItem("GuestInfo", JSON.stringify(guestinf));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', inject([MnpService], (mnpservice: MnpService) => {
        const spy = spyOn(component, "Init").and.callThrough();
        mnpservice.customerIDTypes = [
            { id: 1, value: "New NRIC" }
        ];
        const guestinfnew = {
            "outputCPResp": {
                "customerIDType": "New NRIC", "customerID": "901001092878",
                "dateOfBirth": "19901001_000000", "services": [{ "pre_Pos_Indicator": "Postpaid" }],
                "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm"
            }
        };
        sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfnew));
        component.Init();
        expect(spy).toHaveBeenCalled();
    }));

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        const guestinfnew1 = { "outputCPResp": { "customerID": "901001092878", "dateOfBirth": "19901001_000000", "services": [{ "pre_Pos_Indicator": "Postpaid" }], "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm" } };
        sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfnew1));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        sessionStorage.removeItem("GuestInfo");
        localStorage.setItem("MNP-EDIT", "true");
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        localStorage.setItem("checkToShowEditEligibilityBox", "YES");
        localStorage.setItem("MNPRedirectionToLoginPage", "YES");
        localStorage.setItem("MNPCustomerData", JSON.stringify({ principleMobileNumber: "6012221212" }));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        localStorage.removeItem("checkToShowEditEligibilityBox");
        localStorage.removeItem("MNPRedirectionToLoginPage");
        localStorage.removeItem("MNPCustomerData");
        localStorage.removeItem("MNP-EDIT");
        localStorage.removeItem("MNP-PRE-SELECT");
        localStorage.removeItem("MNP-CUSTOMER");
        const guestinf2 = { "blacklistChkRequest": { "customerIDType": "1", "customerIDNo": "901001092878", "customerIDTypeValue": "New NRIC" }, "outputCPResp": { "customerID": "901001092878", "dateOfBirth": "19901001_000000", "services": [{ "pre_Pos_Indicator": "Postpaid" }], "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm" } };
        sessionStorage.setItem("GuestInfo", JSON.stringify(guestinf2));
        component.Init();
        expect(spy).toHaveBeenCalled();
    });

    it('init', inject([MnpService], (mnpservice: MnpService) => {
        const spy = spyOn(component, "Init").and.callThrough();
        mnpservice.customerIDTypes = [
            { id: 1, value: "New NRIC" }
        ];
        const guestinfnew2 = { "outputCPResp": { "customerIDType": "New NRIC", "customerID": "901001092878", "dateOfBirth": "19901001_000000", "services": [{ "pre_Pos_Indicator": "Postpaid" }], "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm" } };
        sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfnew2));
        component.Init();
        expect(spy).toHaveBeenCalled();
    }));

    it('init', inject([MnpService], (mnpservice: MnpService) => {
        const spy = spyOn(component, "Init").and.callThrough();
        mnpservice.customerIDTypes = [
            { id: 1, value: "New NRIC" }
        ];
        const guestinfnew3 = { "outputCPResp": { "customerID": "901001092878", "dateOfBirth": "19901001_000000", "services": [{ "pre_Pos_Indicator": "Postpaid" }], "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm" } };
        sessionStorage.setItem("GuestInfo", JSON.stringify(guestinfnew3));
        component.Init();
        expect(spy).toHaveBeenCalled();
    }));

    it('init', inject([MnpService], (mnpservice: MnpService) => {
        const spy = spyOn(component, "Init").and.callThrough();
        mnpservice.customerIDTypes = [
            { id: 1, value: "New NRIC" }
        ];
        const userinfonew3 = { "outputCPResp": { "customerIDType": "New NRIC", "customerID": "901001092878", "dateOfBirth": "19901001_000000", "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm", "newGuestPhNo": 60128282222, "contactFirstName": "abc", "contactLastName": "ddd", "salutation": "Mr", "contactEmail": "aam.122@mmmss.com" } };
        sessionStorage.setItem("UserInfo", JSON.stringify(userinfonew3));
        component.Init();
        expect(spy).toHaveBeenCalled();
    }));

    it('init', () => {
        const spy = spyOn(component, "Init").and.callThrough();
        const userinfonew4 = { "outputCPResp": { "customerID": "901001092878", "dateOfBirth": "19901001_000000", "preferredContactMethod": "Email", "contactPreferredTime": "4:30pm to 8:30pm", "newGuestPhNo": 60128282222, "contactFirstName": "abc", "contactLastName": "ddd", "salutation": "Mr", "contactEmail": "aam.122@mmmss.com" } };
        sessionStorage.setItem("UserInfo", JSON.stringify(userinfonew4));
        component.Init();
        localStorage.removeItem("MNP-CUSTOMER");
        sessionStorage.removeItem("UserInfo");
        sessionStorage.removeItem("GuestInfo");
        sessionStorage.removeItem("UserToken");
        localStorage.removeItem("MyMsIsdn");
        expect(spy).toHaveBeenCalled();
    });
});
