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
import { AgeEligibilityPopupComponent } from '../../widget/age-eligibility-popup/ageeligiblity.popup.component';
import { CheckoutService } from '../../checkout/services/checkout.service';
import { CheckoutHeroBannerComponent } from '../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { HomeService } from '../../../Service/home.service';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { ShippingAddressComponent } from './shipping-address.component';
import { EmailRetrievalComponent } from '../email-retrieval/email-retrieval.component';
import { SelectDeliveryMethodComponent } from '../delivery-method/select-delivery-method/select-delivery-method.component';
import { MignightDeliveryComponent } from '../delivery-method/mignight-delivery/mignight-delivery.component';
import { MidnightDeliveryInfoComponent } from '../../dumb-components/midnight-delivery-info/midnight-delivery-info.component';
import { StandardDeliveryComponent } from '../delivery-method/standard-delivery/standard-delivery.component';
import { ChooseAddressComponent } from '../delivery-method/choose-address/choose-address.component';
import { ChooseYourWayComponent } from '../../guest-checkout/choose-your-way/choose-your-way.component';
import { SessionTimeOutPopupComponent } from '../../widget/session-timeout-popup/session-timeout-popup';
import { configureTestSuite } from 'ng-bullet';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { IconModule } from 'app/shared/icon.module';
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
const stateresp: any = [
    {
      "id": "533",
      "code": "JH",
      "name": "Johor"
    },
    {
      "id": "534",
      "code": "KD",
      "name": "Kedah"
    },
    {
      "id": "535",
      "code": "KN",
      "name": "Kelantan"
    }
];
let cartmineResp: any = [
    {
        customerOtherInfo : {
            mobile_number: "6011132212",
            customer_full_name: "abc def",
            unit_number: "123"
        },
        customer: {
            firstname: "abc",
            lastname: "def",

        },
        shipping_address: {},
        billing_address: {}
    }
];
class MockCheckoutService {
    Find(url) {
        if (url === "/rest/V1/directory/countries/MY") {
            return Observable.of(stateresp);
        }
        if (url === "/rest/V1/directory/countries/MY/error") {
            return Observable.throw({status: false});
        }
        if (url === "/rest/V1/cartmine/false") {
            return Observable.of([{status: false, message: "SESSION INVALID"}]);
        }
        if (url === "/rest/V1/cartmine/error") {
            return Observable.throw({error: {success: false}});
        }
        if (url === "/rest/V1/cartmine/errorsuccess") {
            return Observable.throw({error: {success: true}});
        }
        return Observable.of(cartmineResp);
    }
}
class MockAppService {
    postEstoreUserData(billingurl, request) {
        if (billingurl === "/rest/V1/addshipping") {
            return Observable.of({status: true});
        }
        if (billingurl === "/rest/V1/addshipping/error") {
            return Observable.throw({error: {success: false}});
        }
        if (billingurl === "/rest/V1/addshipping/errorsuccess") {
            return Observable.throw({error: {success: true}});
        }
    }
}
describe('ShippingAddressComponent ', () => {
    const fakeActivatedRoute = {
        snapshot: { data: {} }
      } as ActivatedRoute;
    let component: ShippingAddressComponent;
    let fixture: ComponentFixture<ShippingAddressComponent>;
    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                HttpClientTestingModule,
                IconModule,
                materialModules,
            ],
            declarations: [ShippingAddressComponent, MinifiedPageLoaderComponent, FooterComponent,
                 AgentFooterComponent, SocialMediaComponent, PageLoaderComponent, EmailRetrievalComponent,
                FooterDownloadComponent, NotificationErrorComponent, AgeEligibilityPopupComponent,
                 CheckoutHeroBannerComponent, SelectDeliveryMethodComponent, MignightDeliveryComponent,
                  MidnightDeliveryInfoComponent, StandardDeliveryComponent, ChooseAddressComponent,
                   ChooseYourWayComponent, SessionTimeOutPopupComponent, SafeHtmlPipe],
            providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }, { provide: AppService, useClass: MockAppService },
            { provide: Router, useClass: RouterStub },
            {
                provide: ActivatedRoute, useClass: MockactivatedRoute
            }, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                DecimalPipe, Broadcaster, NotificationPopupEvent, CookieService, UserService, CartService, BundleService,
             OrderInfoService, HeaderService, RedirectionService, SupplimentaryLinesService, HttpClient, BroadbandService,
              DeviceDataService, CommonUtilService, {provide: CheckoutService, useClass: MockCheckoutService},
               RemarketAnalyticsService, HomeService,
             GetParametersService]
        }).overrideComponent(ShippingAddressComponent, {
            set: {
              providers: [{provide: CheckoutService, useClass: MockCheckoutService},
                { provide: AppService, useClass: MockAppService }
              ]
            }
          });
    });
    beforeEach(async(() => {
        fixture = TestBed.createComponent(ShippingAddressComponent);
        component = fixture.componentInstance;
    }));
    it('should create shipping address component', () => {
        expect(component).toBeTruthy();
    });
    it('should test getDeliveryType', () => {
        component.getDeliveryType('standardDelivery');
        expect(component.deliveryType).toBe('Standard Delivery');
    });
    it('should test getDeliveryType Midnight', () => {
        component.getDeliveryType('midnightDelivery');
        expect(component.deliveryType).toBe('Midnight Delivery');
    });
    it('should test address unit validation', () => {
        const event = {
            keyCode: 48,
            which: 48,
            charCode: 48
        };
        const k = event.keyCode || event.which;
        const unitChar = String.fromCharCode(k);
        const y = event.charCode;
        const a = component.addressUnitValidation(event);
        expect(a).toBe(true);
    });
    it('should test address unit validation', () => {
        const event = {
            keyCode: 7,
            which: 7,
            charCode: 7
        };
        const k = event.keyCode || event.which;
        const unitChar = String.fromCharCode(k);
        const y = event.charCode;
        const a = component.addressUnitValidation(event);
        expect(a).toBe(false);
    });
    it('should test address unit validation', () => {
        const event = {
            keyCode: 8,
            which: 8,
            charCode: 1
        };
        const k = event.keyCode || event.which;
        const unitChar = String.fromCharCode(k);
        const y = event.charCode;
        const a = component.addressUnitValidation(event);
        expect(a).toBe(true);
    });
    it('should test postal code validation', () => {
        const event = {
            keyCode: 8,
            which: 8,
            charCode: 8
        };
        const postalkey = event.keyCode || event.which;
        const z = event.charCode;
        const a = component.postalCodeValidation(event);
        expect(a).toBe(true);
    });
    it('should test postal code validation', () => {
        const event = {
            keyCode: 12,
            which: 12,
            charCode: 12
        };
        const postalkey = event.keyCode || event.which;
        const z = event.charCode;
        const a = component.postalCodeValidation(event);
        expect(a).toBe(false);
    });
    it('should test postal code validation', () => {
        const event = {
            keyCode: 48,
            which: 48,
            charCode: 12
        };
        const postalkey = event.keyCode || event.which;
        const z = event.charCode;
        const a = component.postalCodeValidation(event);
        expect(a).toBe(true);
    });
    it('should test city validation', () => {
        const event = {
            keyCode: 0,
            which: 0,
            charCode: 0
        };
        const editkey = event.keyCode || event.which;
        const z = event.charCode;
        const a = component.cityValidation(event);
        expect(a).toBe(true);
    });
    it('should test city validation', () => {
        const event = {
            keyCode: 63,
            which: 63,
            charCode: 63
        };
        const editkey = event.keyCode || event.which;
        const z = event.charCode;
        const a = component.cityValidation(event);
        expect(a).toBe(false);
    });
    it('should test city validation', () => {
        const event = {
            keyCode: 0,
            which: 0,
            charCode: 16
        };
        const editkey = event.keyCode || event.which;
        const z = event.charCode;
        const a = component.cityValidation(event);
        expect(a).toBe(true);
    });
    it('customer retrieve', () => {
        component.userInfo = {
            outputCPResp: {
                streetAddress: "abc",
                city: "KL",
                postalCode: 23111,
                state: "PJ",
                country: "Malaysia",
                addressYType: "Landed"
            }
        };
        component.getCustomerRetrievalAddress();
    });
    it('salutaion', () => {
        localStorage.setItem("MyMsIsdn", "6011221111");
        component.userInfo = {
            outputCPResp: {
                contactSalutation: "Mr"
            }
        };
        component.salutaion();
        localStorage.removeItem("MyMsIsdn");
        sessionStorage.setItem("USER_TYPE", "GUEST");
        component.checkoutData = {
            customerOtherInfo: {
                salutation: "Mr"
            }
        };
        component.salutaion();
        sessionStorage.removeItem("USER_TYPE");
        component.salutaion();
    });
    it('mail id', () => {
        component.userInfo = {
            outputCPResp: {
                contactEmail: "abc@def.com"
            }
        };
        component.mailId();
        component.userInfo = null;
        sessionStorage.setItem("USER_TYPE", "GUEST");
        component.checkoutData = {
            customer: {
                email: "abc@def.com"
            }
        };
        component.mailId();
        sessionStorage.removeItem("USER_TYPE");
        component.mailId();
    });
    it('phone no', () => {
        component.PhoneNumber();
        component.checkoutData = {
            customerOtherInfo : {
                mobile_number: "6011132212"
            }
        };
        component.PhoneNumber();
        component.checkoutData = null;
        component.userInfo = {
            outputCPResp: {
                contactMobileNum: "6011132212"
            }
        };
        component.PhoneNumber();
        component.userInfo = {
            outputCPResp: {
                newGuestPhNo: "6011132212"
            }
        };
        component.PhoneNumber();
        component.userInfo = null;
        localStorage.setItem("MyMsIsdn", "6011132212");
        component.PhoneNumber();
        localStorage.removeItem("MyMsIsdn");
    });
    it('scroll', () => {
        const element = null;
        component.scrollToError(element);
    });
    it('disableProceed', () => {
        component.disableProceed(false);
    });
    // it('redirect', () => {
    //     component.redirectURL = "#abc";
    //     component.redirectAfterUpdate();
    // });
    it('edit address', () => {
        component.billingAddress = {
            billing_unit_number: "123",
            address_line_1: "abc",
            address_line_2: "def",
            postcode: 12221,
            city: "KL",
            region_id: "Kuala Lumpur"
        };
        component.editAddress();
    });
    it('customerInputMissingData', () => {
        component.customerInputMissingData();
        const guest = {"blacklistChkRequest":{"customerIDType":"1","customerIDNo":"880102010291","customerIDTypeValue":"New NRIC"},"outputCPResp":{"customerID":"880102010291","dateOfBirth":"19880102_000000","services":[{"pre_Pos_Indicator":"Postpaid"}]}};
    sessionStorage.setItem("GuestInfo", JSON.stringify(guest));
    sessionStorage.setItem("OLD_GUEST_USER", "YES");
    sessionStorage.setItem("UserToken", "abc");
    component.customerInputMissingData();
    const newguest = {"blacklistChkRequest":{"customerIDType":"1","customerIDNo":"880102010291","customerIDTypeValue":"New NRIC"},"outputCPResp":{"customerID":"880102010291","contactEmail":"abc@def.com","contactSalutation":"Mr","dateOfBirth":"19880102_000000","services":[{"pre_Pos_Indicator":"Postpaid"}]}};
    sessionStorage.setItem("GuestInfo", JSON.stringify(newguest));
    component.customerInputMissingData();
    sessionStorage.removeItem("GuestInfo");
    sessionStorage.removeItem("OLD_GUEST_USER");
    sessionStorage.removeItem("UserToken");
    });
    it('ngoninit', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        sessionStorage.setItem("OLD_GUEST_USER", "YES");
        const guest = {"blacklistChkRequest":{"customerIDType":"1","customerIDNo":"880102010291","customerIDTypeValue":"New NRIC"},"outputCPResp":{"customerID":"880102010291","dateOfBirth":"19880102_000000","services":[{"pre_Pos_Indicator":"Postpaid"}]}};
    sessionStorage.setItem("GuestInfo", JSON.stringify(guest));
    const user = {"outputCPResp":{"country":"Malaysia","planSegmentType":"","unitNo":"12#001","segmentGroup":"Consumer","postalCode":"50034","contactFirstName":"Customer","section":"","contactType":"","type":"Non Premier","poBox":"","contactHomePhone":"","state":"JH","streetType":"Jalan","contactMobileNum":"0197866453","motherMaidenName":"","gstTaxRelief":"","XPAX_DB_FLG":"N","buildingName":"","XPAX_OPEN_FLG":"0","nationality":"Malaysia","preferredContactMethod":"Email","customerIDType":"New NRIC","preferredContactLang":"English","customerID":"661208855567","name":"CUSTOMER ESTORE","contactPreferredTime":"","segmentSubGroup":"Retail","floorNo":"","contactLastName":"Estore","salutation":"Mr","headerCustomerProfile":{"errorMessage":"","errorCode":"","status":"OK"},"PREPAIDOPENORD_FLG":"0","gender":"Male","city":"Downgrade","contactAlternateNum":"","contactRowID":"1-DDASB34","facebookID":"","pakejOpenCount":"0","googlePlusID":"","YOUTH_ACTIVE_COUNT":"0","gstTaxReliefID":"","DB_OPEN_COUNT":"0","billingType":"Billable","customerRowId":"1-DDARK4A","contactBusinessPhone":"","addressYType":"Landed","PREPAID_LINES_COUNT":"0","race":"","contactEmail":"661208855567@getnada.com","dateOfBirth":"19661208_000000","services":[{"serviceType":"","smeGroupId":"","planSegmentType":"","pakejFlag":"N","mobileNumber":"0133191598","assetBillingAccountNo":"300627429","billingProfileId":"1-DDAOJ2U","principleMobileNumber":"","assetBillingAccountRowId":"1-DDAOJ2P","promotionId":"1-XM4GBX","pre_Pos_Indicator":"Postpaid","prodPromName":"FiRST Platinum CBS","billingType":"Billable","hh_consumed_flag":"N","prin_Sup_Indicator":"","prodPromPartNum":"PB11820","plan":"FiRST Platinum CBS Plan","productType":"Service","assetSubStatus":"Active","product":"RTP Voice Service","creditTreatmentCode":"35","billType":"CNVRGTPostpaid","assetModel":"IPHONE 8 64GB","SVC_LVL_DVC_COUNT":"1","segmentCode":"10","assetIntegrationID":"1-DDAQZBR","partialControlFlag":"","masterAccountNumber":"","billingAccountStatus":"Active","assetID":"1-DDB0N2G","assetImei":"200103151803001","kenanAccountID":"300627429","kenanName":"","vipCode":"VIP 6","assetStatus":"Active","billCycle":"3"}],"twitterID":"","customerSince":"20180101_000000","pakejActiveCount":"0","DB_COUNT":"1","masterAccountNumber":"","billingAccountStatus":"Active","streetAddress":"Under VIP","contactSalutation":"Mr.","YOUTH_OPEN_COUNT":"0","simType":"Physical SIM","esimInfo":"<li>Test esim info with RM.15</li><li>second line info.</li>"}};
    sessionStorage.setItem("UserInfo", JSON.stringify(user));
        component.ngOnInit();
        sessionStorage.removeItem("OLD_GUEST_USER");
        sessionStorage.removeItem("GuestInfo");
        sessionStorage.removeItem("UserInfo");
    }));
    it('ngoninit', () => {
        sessionStorage.setItem('CAorderId', "abc");
        sessionStorage.setItem('secretKey', "abc");
        component.ngOnInit();
        component.billingAddress = null;
        component.shippingAddress = null;
        const user = {"outputCPResp":{"country":"Malaysia","planSegmentType":"","unitNo":"12#001","segmentGroup":"Consumer","postalCode":"50034","contactFirstName":"Customer","section":"","contactType":"","type":"Non Premier","poBox":"","contactHomePhone":"","state":"JH","streetType":"Jalan","contactMobileNum":"0197866453","motherMaidenName":"","gstTaxRelief":"","XPAX_DB_FLG":"N","buildingName":"","XPAX_OPEN_FLG":"0","nationality":"Malaysia","preferredContactMethod":"Email","customerIDType":"New NRIC","preferredContactLang":"English","customerID":"661208855567","name":"CUSTOMER ESTORE","contactPreferredTime":"","segmentSubGroup":"Retail","floorNo":"","contactLastName":"Estore","salutation":"Mr","headerCustomerProfile":{"errorMessage":"","errorCode":"","status":"OK"},"PREPAIDOPENORD_FLG":"0","gender":"Male","city":"Downgrade","contactAlternateNum":"","contactRowID":"1-DDASB34","facebookID":"","pakejOpenCount":"0","googlePlusID":"","YOUTH_ACTIVE_COUNT":"0","gstTaxReliefID":"","DB_OPEN_COUNT":"0","billingType":"Billable","customerRowId":"1-DDARK4A","contactBusinessPhone":"","addressYType":"Landed","PREPAID_LINES_COUNT":"0","race":"","contactEmail":"661208855567@getnada.com","dateOfBirth":"19661208_000000","services":[{"serviceType":"","smeGroupId":"","planSegmentType":"","pakejFlag":"N","mobileNumber":"0133191598","assetBillingAccountNo":"300627429","billingProfileId":"1-DDAOJ2U","principleMobileNumber":"","assetBillingAccountRowId":"1-DDAOJ2P","promotionId":"1-XM4GBX","pre_Pos_Indicator":"Postpaid","prodPromName":"FiRST Platinum CBS","billingType":"Billable","hh_consumed_flag":"N","prin_Sup_Indicator":"","prodPromPartNum":"PB11820","plan":"FiRST Platinum CBS Plan","productType":"Service","assetSubStatus":"Active","product":"RTP Voice Service","creditTreatmentCode":"35","billType":"CNVRGTPostpaid","assetModel":"IPHONE 8 64GB","SVC_LVL_DVC_COUNT":"1","segmentCode":"10","assetIntegrationID":"1-DDAQZBR","partialControlFlag":"","masterAccountNumber":"","billingAccountStatus":"Active","assetID":"1-DDB0N2G","assetImei":"200103151803001","kenanAccountID":"300627429","kenanName":"","vipCode":"VIP 6","assetStatus":"Active","billCycle":"3"}],"twitterID":"","customerSince":"20180101_000000","pakejActiveCount":"0","DB_COUNT":"1","masterAccountNumber":"","billingAccountStatus":"Active","streetAddress":"Under VIP","contactSalutation":"Mr.","YOUTH_OPEN_COUNT":"0","simType":"Physical SIM","esimInfo":"<li>Test esim info with RM.15</li><li>second line info.</li>"}};
        sessionStorage.setItem("UserInfo", JSON.stringify(user));
        cartmineResp = [{
            billing_address: null,
            shipping_address: null
        }];
        component.ngOnInit();
        cartmineResp = [{}];
        component.ngOnInit();
        sessionStorage.removeItem("CAorderId");
        sessionStorage.removeItem("secretKey");
        sessionStorage.removeItem("UserInfo");
        cartmineResp = [];
        component.ngOnInit();
    });
    it('ngoninit', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.billingStatesUrl = "/rest/V1/directory/countries/MY/error";
        component.apiUrl = "/rest/V1/cartmine/error";
        component.ngOnInit();
        component.apiUrl = "/rest/V1/cartmine/errorsuccess";
        component.ngOnInit();
    }));
    it('publish', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.getDeliveryType(null);
        component.apiUrl = "/rest/V1/cartmine/false";
        component.ngOnInit();
        devicedataservice.publishErrorNotificationBoolean(false);
        devicedataservice.publishEditBilling(false);
        devicedataservice.publishEditAddValidation();
        devicedataservice.publishEditBilling(true);
        devicedataservice.publishEditAddValidation();
        devicedataservice.publishDeliveryType(null);
        devicedataservice.publishDeliveryType("standardDelivery");
    }));
    // it('onsubmit', () => {
    //     let billingForm: any = { form: {
    //         valid: true
    //     }, value: {
    //         postalCode: 12345,
    //         state: "KL",
    //         city: "ABC",
    //         addressLine2: "aaa",
    //         addressLine1: "bbb",
    //         address: "aaa bbb"
    //     }};
    //     component.checkoutData = {
    //         customer: {
    //             firstname: "abc",
    //             lastname: "def",
    //             id: "123"
    //         },
    //         customerOtherInfo: {
    //             mobile_number: "1233333",
    //             salutation: "Mr"
    //         },
    //         delivery_type: "Midnight"
    //     };
    //     component.redirectURL = "#abc";
    //     component.userInfo = {
    //         outputCPResp: {
    //         }
    //     };
    //     component.states = {
    //         available_regions: [
    //             {
    //                 "id": "533",
    //                 "code": "JH",
    //                 "name": "Johor"
    //               },
    //               {
    //                 "id": "534",
    //                 "code": "KD",
    //                 "name": "Kedah"
    //               },
    //               {
    //                 "id": "535",
    //                 "code": "KN",
    //                 "name": "Kelantan"
    //               }
    //         ]
    //     };
    //     const user = {"outputCPResp":{"country":"Malaysia","planSegmentType":"","unitNo":"12#001","segmentGroup":"Consumer","postalCode":"50034","contactFirstName":"Customer","section":"","contactType":"","type":"Non Premier","poBox":"","contactHomePhone":"","state":"JH","streetType":"Jalan","contactMobileNum":"0197866453","motherMaidenName":"","gstTaxRelief":"","XPAX_DB_FLG":"N","buildingName":"","XPAX_OPEN_FLG":"0","nationality":"Malaysia","preferredContactMethod":"Email","customerIDType":"New NRIC","preferredContactLang":"English","customerID":"661208855567","name":"CUSTOMER ESTORE","contactPreferredTime":"","segmentSubGroup":"Retail","floorNo":"","contactLastName":"Estore","salutation":"Mr","headerCustomerProfile":{"errorMessage":"","errorCode":"","status":"OK"},"PREPAIDOPENORD_FLG":"0","gender":"Male","city":"Downgrade","contactAlternateNum":"","contactRowID":"1-DDASB34","facebookID":"","pakejOpenCount":"0","googlePlusID":"","YOUTH_ACTIVE_COUNT":"0","gstTaxReliefID":"","DB_OPEN_COUNT":"0","billingType":"Billable","customerRowId":"1-DDARK4A","contactBusinessPhone":"","addressYType":"Landed","PREPAID_LINES_COUNT":"0","race":"","contactEmail":"661208855567@getnada.com","dateOfBirth":"19661208_000000","services":[{"serviceType":"","smeGroupId":"","planSegmentType":"","pakejFlag":"N","mobileNumber":"0133191598","assetBillingAccountNo":"300627429","billingProfileId":"1-DDAOJ2U","principleMobileNumber":"","assetBillingAccountRowId":"1-DDAOJ2P","promotionId":"1-XM4GBX","pre_Pos_Indicator":"Postpaid","prodPromName":"FiRST Platinum CBS","billingType":"Billable","hh_consumed_flag":"N","prin_Sup_Indicator":"","prodPromPartNum":"PB11820","plan":"FiRST Platinum CBS Plan","productType":"Service","assetSubStatus":"Active","product":"RTP Voice Service","creditTreatmentCode":"35","billType":"CNVRGTPostpaid","assetModel":"IPHONE 8 64GB","SVC_LVL_DVC_COUNT":"1","segmentCode":"10","assetIntegrationID":"1-DDAQZBR","partialControlFlag":"","masterAccountNumber":"","billingAccountStatus":"Active","assetID":"1-DDB0N2G","assetImei":"200103151803001","kenanAccountID":"300627429","kenanName":"","vipCode":"VIP 6","assetStatus":"Active","billCycle":"3"}],"twitterID":"","customerSince":"20180101_000000","pakejActiveCount":"0","DB_COUNT":"1","masterAccountNumber":"","billingAccountStatus":"Active","streetAddress":"Under VIP","contactSalutation":"Mr.","YOUTH_OPEN_COUNT":"0","simType":"Physical SIM","esimInfo":"<li>Test esim info with RM.15</li><li>second line info.</li>"}};
    //     sessionStorage.setItem("UserInfo", JSON.stringify(user));
    //     sessionStorage.setItem("USER_TYPE", "EXISTING");
    //     localStorage.setItem("MyMsIsdn", "60122123122");
    //     component.onSubmit(billingForm);

    //     sessionStorage.removeItem("USER_TYPE");
    //     sessionStorage.removeItem("UserInfo");
    //     localStorage.removeItem("MyMsIsdn");
    //     component.billingurl = "/rest/V1/addshipping/error";
    //     component.checkoutData.customerOtherInfo.salutation = null;
    //     component.onSubmit(billingForm);
    //     component.userInfo = {
    //         outputCPResp: {
    //             salutation: "Mr"
    //         }
    //     };
    //     component.billingurl = "/rest/V1/addshipping/errorsuccess";
    //     component.onSubmit(billingForm);
    //     billingForm = {
    //         form: {valid: true},
    //         invalid: true
    //     };
    //     component.onSubmit(billingForm);
    // });
});
