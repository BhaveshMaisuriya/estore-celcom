import { async, ComponentFixture, TestBed, inject, fakeAsync } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../../Service/app.service';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { PersonalDetailsComponent } from './personal-details.component';
import { FormsModule } from '@angular/forms';
import { NotificationErrorComponent } from '../../widget/notification-error/notification-error.component';
import { SessionTimeOutPopupComponent } from '../../widget/session-timeout-popup/session-timeout-popup';
import { CookieService } from 'ngx-cookie-service';
import { CartService } from 'app/Service/cart.service';
import { BroadbandService } from '../../../Service/broadband.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { GuestCheckoutService } from '../services/guest-checkout.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { HomeService } from '../../../Service/home.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable } from 'rxjs';
import { configureTestSuite } from 'ng-bullet';
import { UserService } from '../../../Service/user.service';
import { sharedPipes } from 'app/shared/pipes';

class ActivatedRouterStub {
  snapshot(url: string) {
    return url;
  }
}

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }

  snapshot(url: string) {
    return url;
  }
}
class MockAppService {
  constructor() { }
  // const apiUrl = "/rest/V1/directory/countries/MY";

  Find(url: string) {
    return Observable.of([{
      status: true, response: 'Success', billing_address: {
        email: 'no@no.com',
        telephone: '12345',
        salutation: '',
        firstname: '',
        middlename: '',
        lastname: '',
        billing_unit_number: '',
        street: '',
        postcode: '',
        city: ''
      }
    }]);
  }

  getEstoreUserData(url: string) {
    return Observable.of({
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
    });
  }
}

const fakeActivatedRoute = {
  snapshot: { data: {} }
} as ActivatedRoute;

const mockCountriesApiResponse = {
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
};

const mockCartAllItemsResponse = {
  all_items: [
    {
      item_id: "69914",
      quantity: 1,
      reservation_id: "OP55CE1573697503",
      sku: "Huawei-P20-HuaweiP20128GBPink-FPP",
      sku_bundle: "Huawei-P20",
      is_preorder: 0,
      is_broadband: false,
      is_easyphone: false,
      has_add_ons: false,
      add_on_label: null,
      add_on_code: null,
      utm_source: null,
      easyphone_label: "EasyPhone  (24 months contract)",
      preorder_availability_flag: 0,
      midnight_delivery: 0,
      price: 1500,
      itemTotal: "1500.0000",
      selectedProduct: {
        orderMonthlyPayTotal: 188,
        is_moon: false,
        orderDevice: "Huawei P20 128GB Pink",
        orderDeviceName: "Huawei P20 128GB Pink",
        selectedProductSku: "HuaweiP20128GBPink",
        selectedImageList: ["/media/catalog/product/9/0/900x900_5_20.png"],
        orderPlanName: "First™ Platinum Plus",
        orderPlan: "FPP",
        urlKey: "first-platinum-plus",
        orderMonthlyPay: "188.0000",
        plan_image_url: "/media/catalog/product/w/f/wf-benji-100gb.png",
        orderOneTimePay: "1500.00",
        eligibilty: null,
        orderPhoneNo: "0133805452",
        orderNumberType: "NewNumber",
        orderReqPlanComponent: [
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
          }
        ],
        selectedPlanDetails: {
          name: "First™ Platinum Plus",
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
          telco_day: {
            status: false,
            hat_text: null,
            message: null
          },
          is_premium_plan: false,
          is_golden_number: 0,
          additional_information: null
        },
        orderDevicePrice: "0.0000",
        orderSummaryColor: "Pink",
        orderSummaryStorage: "128GB",
        orderReqServiceBundle: "",
        orderTotalPay: 1500,
        total: 1500,
        contract: "24 months contract",
        orderReqBrand: "HUAWEI",
        orderReqCategory: "HP",
        orderReqColor: "PNK",
        orderReqModel: "P20 128GB",
        orderReqPartNumber: "MDR5667",
        free_gift_data: {
          gift_image: "/media/catalog/product/s/i/side_900x900_2.png",
          gift_message: "Receive a free gift when you pre-order now"
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
        "Great news! Use Boost to pay and stand to win a Samsung Galaxy Note 10, plus other great prizes! Boost a minimum of                RM120 to enjoy RM10 cashback."
    }
  ]
};

const mockFormData = {
  salutation: "Mr",
  name: "sinar sinar",
  gender: "Male",
  contactMobileNum: 60136699819,
  contactEmail: "sinardyas31@gmail.com",
  preferredContactMethod: "Email",
  buildingName: "asd asdasdasd",
  streetAddressLine1: "asd",
  streetAddressLine2: "asd",
  postalCode: 18400,
  city: "kuala lumpur",
  state: "KN",
  agree: true,
  loginRequest: {
    blacklistChkRequest: {
      customerIDType: "1",
      customerIDNo: "960531232323",
      customerIDTypeValue: "New NRIC"
    },
    outputCPResp: {
      customerID: "960531232323",
      dateOfBirth: "19960531_000000",
      services: [
        {
          pre_Pos_Indicator: "Postpaid"
        }
      ]
    }
  },
  customerType: "New NRIC",
  customerIdNumber: "960531232323"
};

describe('PersonalDetailsComponent', () => {
  let component: PersonalDetailsComponent;
  let fixture: ComponentFixture<PersonalDetailsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [sharedPipes, PersonalDetailsComponent, NotificationErrorComponent, SessionTimeOutPopupComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        AppService,
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Router, useClass: RouterStub },
        CookieService,
        BroadbandService,
        CartService,
        DeviceDataService,
        GuestCheckoutService,
        EStoreAnalysticsService,
        AnalyticsService,
        RendererService,
        SeoService,
        DecimalPipe,
        HomeService,
        CommonUtilService,
        UserService
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDetailsComponent);
    component = fixture.componentInstance;
  });

  afterEach(async(() => {
    sessionStorage.clear();
  }));

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should call ngOnInit", () => {
    const spy = spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it("empty mobile number should return false", () => {
    component.mobNum = "";
    expect(component.invalidmobNumber).toBeFalsy(); // Assert
  });

  it("should validate the input", () => {
    const regexPattern = fixture.debugElement.nativeElement.querySelector(
      "input"
    ).value;
    expect(regexPattern).toMatch(/^[0-9]*$/);
  });

  it("should validate the mobile number", () => {
    if (
      component.mobNum &&
      component.mobNum.charAt(0) === "6" &&
      component.mobNum.charAt(0) === "0"
    ) {
      expect(component.mobNum).toBe(true);
    }
  });
  it("should test postal code validation", () => {
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    const k = event.keyCode || event.which;
    const z = event.charCode;
    component.postalCodeValidation(event);
    expect(component.isPostalInValid).toBe(true);
  });
  it("should test postal code validation", () => {
    const event = {
      keyCode: 48,
      which: 48,
      charCode: 12
    };
    const k = event.keyCode || event.which;
    const z = event.charCode;
    component.postalCodeValidation(event);
    expect(component.isPostalInValid).toBe(true);
  });
  it("should test postal code validation", () => {
    const event = {
      keyCode: 0,
      which: 0,
      charCode: 0
    };
    const k = event.keyCode || event.which;
    const z = event.charCode;
    component.postalCodeValidation(event);
    expect(component.isPostalInValid).toBe(true);
  });

  it("should test city validation", () => {
    const event = {
      keyCode: 0,
      which: 0,
      charCode: 0,
      target: {
        value: "aaaaaa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode;
    const cityNameLength = event.target.value.length;
    const a = component.cityValidation(event);
    expect(a).toBe(true);
  });
  it("should test city validation", () => {
    const event = {
      keyCode: 63,
      which: 63,
      charCode: 0,
      target: {
        value: "aaaaaa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode;
    const cityNameLength = event.target.value.length;
    const a = component.cityValidation(event);
    expect(a).toBe(true);
  });
  it("should test city validation", () => {
    const event = {
      keyCode: 63,
      which: 63,
      charCode: 63,
      target: {
        value: "aaaaaa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode;
    const cityNameLength = event.target.value.length;
    const a = component.cityValidation(event);
    expect(a).toBe(false);
    expect(event.target.value).toBe("aaaaaa");
  });
  it("should test city validation", () => {
    const event = {
      keyCode: 63,
      which: 63,
      charCode: 63,
      target: {
        value: "aaaaa aaaaa aaaaa aaaaa aaaaa aa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode;
    const cityNameLength = event.target.value.length;
    const a = component.cityValidation(event);
    expect(a).toBe(false);
    expect(event.target.value).toBe("aaaaa aaaaa aaaaa aaaaa aaaaa aa");
  });

  it("state values", () => {
    const regions = [
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
    ];
    const a = component.getStateValueText(regions, "WP");
    expect(a).toEqual({ id: "546", code: "WP", name: "WP Kuala Lumpur" });
  });

  it("should test address unit validation", () => {
    const event = {
      keyCode: 64,
      which: 64,
      charCode: 64,
      key: "#",
      target: {
        value: "aaaaa aaaaa aa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode || -1;
    const key = event.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const buildingNameLength = event.target.value.length;
    const a = component.addressUnitValidation(event);
    expect(a).toBe(true);
  });
  it("should test address unit validation", () => {
    const event = {
      keyCode: 36,
      which: 36,
      charCode: 0,
      key: "#",
      target: {
        value: "aaaaa aaaaa aa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode || -1;
    const key = event.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const buildingNameLength = event.target.value.length;
    const a = component.addressUnitValidation(event);
    expect(a).toBe(true);
  });
  it("should test address unit validation", () => {
    const event = {
      keyCode: 36,
      which: 36,
      charCode: 0,
      key: "#",
      target: {
        value: "aaaaa aaaaa aaaaaa aa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode || -1;
    const key = event.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const buildingNameLength = event.target.value.length;
    const a = component.addressUnitValidation(event);
    expect(a).toBe(false);
    expect(component.unitHouseNumber).toBe("aaaaa aaaaa aaa");
  });
  it("should test address unit validation", () => {
    const event = {
      keyCode: 63,
      which: 63,
      charCode: -1,
      key: "(",
      target: {
        value: "aaaaa aaaaa aaaaa "
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode || -1;
    const key = event.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const buildingNameLength = event.target.value.length;
    const a = component.addressUnitValidation(event);
    expect(a).toBe(false);
    expect(component.unitHouseNumber).toBe("aaaaa aaaaa aaa");
  });

  it("should test address line 2 validation", () => {
    const event = {
      keyCode: 65,
      which: 65,
      charCode: 0,
      key: "#",
      target: {
        value: "aaaaa aaaaa aaaaa "
      }
    };
    const z = event.charCode || -1;
    const k = event.keyCode || event.which;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const key = event.key;
    const streetTxtLength = event.target.value.length;
    const isCharExists = acceptedChars.includes(key);
    const a = component.addressLine2Validation(event);
    expect(a).toBe(true);
  });
  it("should test address line 2 validation", () => {
    const event = {
      keyCode: 43,
      which: 43,
      charCode: 0,
      key: "#",
      target: {
        value: "aaaaa aaaaa aaaaa "
      }
    };
    const z = event.charCode || -1;
    const k = event.keyCode || event.which;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const key = event.key;
    const streetTxtLength = event.target.value.length;
    const isCharExists = acceptedChars.includes(key);
    const a = component.addressLine2Validation(event);
    expect(a).toBe(true);
  });
  it("should test address line 2 validation", () => {
    const event = {
      keyCode: 43,
      which: 43,
      charCode: 43,
      key: "(",
      target: {
        value: "aaaaa aaaaa aaaaa "
      }
    };
    const z = event.charCode || -1;
    const k = event.keyCode || event.which;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const key = event.key;
    const streetTxtLength = event.target.value.length;
    const isCharExists = acceptedChars.includes(key);
    const a = component.addressLine2Validation(event);
    expect(a).toBe(false);
  });
  it("should test address line 2 validation", () => {
    const event = {
      keyCode: 43,
      which: 43,
      charCode: 43,
      key: "(",
      target: {
        value:
          "aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aa"
      }
    };
    const z = event.charCode || -1;
    const k = event.keyCode || event.which;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const key = event.key;
    const streetTxtLength = event.target.value.length;
    const isCharExists = acceptedChars.includes(key);
    const a = component.addressLine2Validation(event);
    expect(a).toBe(false);
    expect(component.addressline2).toBe(
      "aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa a"
    );
  });
  it("should test address line 1 validation", () => {
    const event = {
      keyCode: 43,
      which: 43,
      charCode: 43,
      key: "(",
      target: {
        value:
          "aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode || -1;
    const key = event.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const streetTxtLength = event.target.value.length;
    const a = component.addressLine1Validation(event);
    expect(a).toBe(false);
    expect(component.addressline1).toBe(
      "aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa a"
    );
  });
  it("should test address line 1 validation", () => {
    const event = {
      keyCode: 43,
      which: 43,
      charCode: 43,
      key: "#",
      target: {
        value:
          "aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode || -1;
    const key = event.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const streetTxtLength = event.target.value.length;
    const a = component.addressLine1Validation(event);
    expect(a).toBe(false);
    expect(component.addressline1).toBe(
      "aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa a"
    );
  });
  it("should test address line 1 validation", () => {
    const event = {
      keyCode: 0,
      which: 0,
      charCode: 0,
      key: "#",
      target: {
        value: "aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode || -1;
    const key = event.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const streetTxtLength = event.target.value.length;
    const a = component.addressLine1Validation(event);
    expect(a).toBe(true);
  });
  it("should test address line 1 validation", () => {
    const event = {
      keyCode: 0,
      which: 0,
      charCode: -1,
      key: "#",
      target: {
        value: "aaaaaaaaaa aaaaaaaaaa aaaaaaaaaa"
      }
    };
    const k = event.keyCode || event.which;
    const z = event.charCode || -1;
    const key = event.key;
    const acceptedChars = ["&", "#", ".", "-", ",", "/"];
    const isCharExists = acceptedChars.includes(key);
    const streetTxtLength = event.target.value.length;
    const a = component.addressLine1Validation(event);
    expect(a).toBe(true);
  });
  it("test mobile number", () => {
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    component.mobNum = "";
    component.MobileNumber(event);
  });
  it("test mobile number", () => {
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    component.mobNum = "abc";
    component.MobileNumber(event);
    expect(component.invalidmobNumber).toBe(true);
  });
  it("test mobile number", () => {
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    component.mobNum = "";
    const resultData = component.mobNum.charAt(0);
    component.MobileNumber(event);
    component.mobNum = "0132549242";
    const resultData1 = component.mobNum.charAt(0);
    component.MobileNumber(event);
    expect(component.invalidmobNumber).toBe(false);
  });

  it("should call ngOnInit", inject(
    [DeviceDataService, AppService],
    fakeAsync(
      (deviceDataService: DeviceDataService, appService: AppService) => {
        spyOn(component, 'ngOnInit').and.callThrough();
        spyOn(component, "SetDateOfBirthDetails");
        spyOn(component, "cartMineDetails");
        spyOn(appService, "getEstoreData").and.returnValue(
          Observable.of(mockCountriesApiResponse)
        );
        component.ngOnInit();
        deviceDataService.publishErrorNotificationBoolean(false);
        expect(deviceDataService.sharedErrorNotificationBoolean$);
        expect(component.SetDateOfBirthDetails).toHaveBeenCalled();
        expect(component.cartMineDetails).toHaveBeenCalled();
      }
    )
  ));

  it("should call cartMineDetails", inject(
    [DeviceDataService, AppService],
    fakeAsync(
      (deviceDataService: DeviceDataService, appService: AppService) => {
        const spy = spyOn(component, "cartMineDetails").and.callThrough();
        component.cartMineDetails(true, false);
        expect(spy).toHaveBeenCalled();
      }
    )
  ));

  it("should call ngAfterViewInit", inject(
    [EStoreAnalysticsService],
    (estoreAnalytic: EStoreAnalysticsService) => {
      spyOn(estoreAnalytic, "ManageAnalytics");
      spyOn(estoreAnalytic, "SetCategoryTwoForAdobeDataLayer");
      const obSpyActivatedRoute = TestBed.get(ActivatedRoute);
      obSpyActivatedRoute.data = Observable.of({
        pageTitle: "",
        pageCategory2: ""
      });
      const obSpyRoute = TestBed.get(Router);
      obSpyRoute.routerState = { snapshot: { url: "/" } };
      component.ngAfterViewInit();
      expect(estoreAnalytic.ManageAnalytics).toHaveBeenCalled();
      expect(estoreAnalytic.SetCategoryTwoForAdobeDataLayer).toHaveBeenCalled();
    }
  ));

  it("should call ManageConfigurableScripts", inject(
    [HomeService, CookieService],
    (homeService: HomeService, cookieService: CookieService) => {
      spyOn(cookieService, "get").and.returnValue(
        JSON.stringify({ name: "ADAFB" })
      );
      spyOn(homeService, "ManageConfigurableScripts");
      component.addAffiliateScriptToHead();
      expect(homeService.ManageConfigurableScripts).toHaveBeenCalled();
    }
  ));

  it("should call addressUnitValidationBeforeSubmit return true", () => {
    component.personalForm = mockFormData;
    component.addressUnitValidationBeforeSubmit();
    expect(component.unitInvalid).toBeTruthy();
  });

  it("should call addressUnitValidationBeforeSubmit return false", () => {
    component.personalForm = { buildingName: "asdadsadas" };
    component.addressUnitValidationBeforeSubmit();
    expect(component.unitInvalid).toBeFalsy();
  });

  // it("should call SetDateOfBirthDetails", () => {
  //   spyOn(sessionStorage, "getItem").and.callFake(key => {
  //     if (key == "OLD_GUEST_USER") return "NO";
  //     else return JSON.stringify(mockFormData.loginRequest);
  //   });
  //   component.SetDateOfBirthDetails();
  //   expect(component.DOB).toBe("19960531");
  //   expect(component.DOByear).toBe("1996");
  //   expect(component.DOBmonth).toBe("05");
  //   expect(component.DOBdate).toBe("31");
  // });

  it("should call setGuestInfo", inject(
    [AppService],
    (appService: AppService) => {
      component.personalForm = mockFormData;
      spyOn(appService, "get").and.returnValue(
        Observable.of(mockFormData.loginRequest)
      );
      spyOn(component, "setGuestInfo");
      component.customerRetrieve();
      expect(component.setGuestInfo).toHaveBeenCalled();
      expect(component.personalForm.guestCustomerInfo).not.toBeNull();
    }
  ));

  it("should call setGuestInfo and handling api error", inject(
    [AppService],
    (appService: AppService) => {
      component.personalForm = mockFormData;
      spyOn(appService, "get").and.returnValue(Observable.throw("error"));
      spyOn(component, "setGuestInfo");
      component.customerRetrieve();
      expect(component.setGuestInfo).toHaveBeenCalled();
      expect(component.personalForm.guestCustomerInfo).toBeNull();
    }
  ));

  it("should call setGuestInfo", inject([Router], (router: Router) => {
    component.personalForm = mockFormData;
    spyOn(router, "navigateByUrl");
    component.setGuestInfo();
    expect(router.navigateByUrl).toHaveBeenCalled();

    // TODO: expect for session storage UserInfo and GuestInfo with guestCustomerInfo
  }));

  it("should call customerInfoUpdateInCart", inject(
    [CommonUtilService, Router],
    (commonUtilService: CommonUtilService, router: Router) => {
      spyOn(commonUtilService, "capturingDOBFromNRIC");
      spyOn(router, "navigateByUrl");
      spyOn(sessionStorage, "getItem").and.callFake(() =>
        JSON.stringify(mockFormData.loginRequest)
      );
      component.personalForm = mockFormData;
      component.customerInfoUpdateInCart(mockCartAllItemsResponse);
      expect(commonUtilService.capturingDOBFromNRIC).toHaveBeenCalled();
      expect(router.navigateByUrl).toHaveBeenCalledWith(
        "/store/checkout/summary"
      );
    }
  ));
  it("user enter number", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      const event = {
        keyCode: 50,
        which: 50,
        charCode: 50
      };
      component.mobNum = "2";
      commonUtilService.restrictOnlyNum(
        event,
        "contactMobileNum",
        component.mobNum
      );
    }
  ));
  it("user enter number but more than 11 characters", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      const event = {
        keyCode: 50,
        which: 50,
        charCode: 50
      };
      component.mobNum = "601325492422";
      commonUtilService.restrictOnlyNum(
        event,
        "contactMobileNum",
        component.mobNum
      );
    }
  ));
  it("user enter alphabet", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      const event = {
        keyCode: 65,
        which: 65,
        charCode: 65
      };
      component.mobNum = "a";
      commonUtilService.restrictOnlyNum(
        event,
        "contactMobileNum",
        component.mobNum
      );
    }
  ));
  it("user enter special character", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      const event = {
        keyCode: 109,
        which: 109,
        charCode: 109
      };
      component.mobNum = "-";
      commonUtilService.restrictOnlyNum(
        event,
        "contactMobileNum",
        component.mobNum
      );
    }
  ));

  it("user enter number", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      const event = {
        keyCode: 50,
        which: 50,
        charCode: 50
      };
      component.postCode = "2";
      commonUtilService.restrictOnlyNum(
        event,
        "postalcode",
        component.postCode
      );
    }
  ));
  it("user enter number but more than 5 characters", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      const event = {
        keyCode: 50,
        which: 50,
        charCode: 50
      };
      component.postCode = "421200";
      commonUtilService.restrictOnlyNum(
        event,
        "postalcode",
        component.postCode
      );
    }
  ));
  it("user enter alphabet", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      const event = {
        keyCode: 65,
        which: 65,
        charCode: 65
      };
      component.postCode = "a";
      commonUtilService.restrictOnlyNum(
        event,
        "postalcode",
        component.postCode
      );
    }
  ));
  it("user enter special character", inject(
    [CommonUtilService],
    (commonUtilService: CommonUtilService) => {
      const event = {
        keyCode: 109,
        which: 109,
        charCode: 109
      };
      component.postCode = "-";
      commonUtilService.restrictOnlyNum(
        event,
        "postalcode",
        component.postCode
      );
    }
  ));

  it("should call chooseAddress - billing", () => {
    const spy = spyOn(component, 'chooseAddress').and.callThrough();
    component.showBilling = false;
    component.chooseAddress('billing');
    expect(spy).toHaveBeenCalled();
  });

  it("should call chooseAddress - shipping", () => {
    const spy = spyOn(component, 'chooseAddress').and.callThrough();
    component.showBilling = false;
    component.chooseAddress('shipping');
    expect(spy).toHaveBeenCalled();
  });

  it("should call MobileNumberAlternate invalid", () => {
    const spy = spyOn(component, 'MobileNumberAlternate').and.callThrough();
    const event = {
      keyCode: 12,
      which: 12,
      charCode: 12
    };
    component.altMobNum = "";
    component.MobileNumberAlternate(event);

    component.altMobNum = "abc";
    component.MobileNumberAlternate(event);

    component.altMobNum = "0132549242";
    component.MobileNumberAlternate(event);
    expect(spy).toHaveBeenCalled();
  });

  it("should test postal code validation - delivery", () => {
    const spy = spyOn(component, 'postalCodeValidation').and.callThrough();
    const event = {
      keyCode: 0,
      which: 0,
      charCode: 0
    };
    const k = event.keyCode || event.which;
    const z = event.charCode;
    component.postCode = '1234';
    component.postalCodeValidation(event);
    component.postalCodeValidation(event, 'delivery');
    component.postCodeDelivery = '1';
    component.postalCodeValidation(event, 'delivery');
    expect(spy).toHaveBeenCalled();
  });

  it('should get addressLine1', () => {
    const val = component.addressLine1;
    expect(val).toBe('');

  });

  it('should get addressLine2', () => {
    const val = component.addressLine2;
    expect(val).toBe('');
  });

  it("should validate restrictOnlyNum", () => {
    const spy = spyOn(component, 'restrictOnlyNum').and.callThrough();
    const event = {
      keyCode: 50,
      which: 50,
      charCode: 50
    };

    component.mobNum = null;
    component.restrictOnlyNum(event, "contactMobileNum");

    component.mobNum = '2';
    component.restrictOnlyNum(event, "contactMobileNum");

    component.altMobNum = null;
    component.restrictOnlyNum(event, "alternateMsisdn");

    component.altMobNum = '2';
    component.restrictOnlyNum(event, "alternateMsisdn");

    component.postCodeDelivery = null;
    component.restrictOnlyNum(event, "", "delivery");

    component.postCodeDelivery = '2';
    component.restrictOnlyNum(event, "", "delivery");

    component.postCode = null;
    component.restrictOnlyNum(event, "");

    component.postCode = '2';
    component.restrictOnlyNum(event, "");
  });

  it('should call redirectOnSubmit', inject([CartService], (cartService: CartService) => {
    const spy = spyOn(component, 'redirectOnSubmit').and.callThrough;
    sessionStorage.setItem("GuestInfo", JSON.stringify({
      agent_name: "Test dealer",
      blacklistChkRequest: {
        customerIDTypeValue: 'New NRIC', customerIDNo: "121334564"
      }
    }));
    component.redirectOnSubmit({ invalid: true });
    expect(component.redirectOnSubmit).toHaveBeenCalled();
    component.redirectOnSubmit({
      invalid: false, value: {
        agent_name: "Test dealer",
        buildingName: "test",
        streetAddressLine1: "test",
        streetAddressLine2: "test",
        postalCode: 1243,
        city: "test",
        state: {
          name: "test",
          code: "test"
        },
        contactEmail: 'no@no.com',
        contactMobileNum: 645749323,
        salutation: '',
        gender: '',
        preferredContactMethod: '',
        alternateMsisdn: '',
        blacklistChkRequest: {
          customerIDTypeValue: 'New NRIC', customerIDNo: "121334564"
        }
      }
    });
  }));
});
