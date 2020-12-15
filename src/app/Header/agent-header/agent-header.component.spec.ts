import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { AgentHeaderComponent } from './agent-header.component';
// import { AppMockService } from '../../Service/appmock.service';
import { AppService } from '../../Service/app.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderService } from '../header.service';
import { DeviceDataService } from '../../Service/devicedata.service';
import { GuestCheckoutService } from '../../Store/guest-checkout/services/guest-checkout.service';
import { CommonUtilService } from '../../Service/commonUtil.service';
import { Observable } from 'rxjs/Rx';
import { UserService } from 'app/Service/user.service';
const response = [
  {
    items: {
    basic_details: {
      name: "iPhone XR",
      id: "399",
      sku: "iPhone-XR",
      upper_age_limit: null,
      lower_age_limit: null,
      price: 0,
      quntity: 0,
      preorder: 0,
      isMnp: false,
      PrincipalLine: "",
      portNumber: "",
      preorder_availability_flag: 0,
      midnight_delivery: {
        status: 0,
        label: ""
      },
      is_easy_phone: 1,
      is_rent: false,
      is_own: true,
      default_plan: "Celcom Mobile Platinum Plus",
      default_plan_sku: "FPP",
      order_monthly_pay: "188.0000",
      nfc: "0",
      mostpopular: "0",
      rm: "1918.00",
      rrp_rm_strick_price: "999.0000",
      upfront_price: 0,
      device_price: 0,
      main_image: "/media/catalog/product/f/r/front_58_1.png",
      sub_images: ["/media/catalog/product/f/r/front_58_1.png"],
      dimension: "150.9X75.7X8.3mm",
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
      order_model: "IPHONE XR 64GB",
      order_brand: "APPLE",
      segment: "10",
      start_date: "2018-10-17 05:31:41",
      end_date: "2019-06-19 08:40:20",
      default_selected_color: "Red",
      default_selected_memory: "64GB",
      pre_order_data: {
        preorder_estimate_delivery_text: "6",
        preorder_estimate_delivery_date: "6",
        preorder_text: "PRE-ORDER ENDED",
        preorder_from_date_text: "From",
        preorder_to_date_text: "to",
        preorder_from_date: "19 Oct 2018",
        preorder_to_date: "23 Oct 2018",
        preorder_end_flag: 1,
        preorder_estimate_delivery: "6",
        preorder_submit_date: "2018-10-21 00:00:00",
        preorder_stock_available_quantity: 0,
        preorder_availble_stock_in_hand: 0,
        preorder_stock_status_flag: 0
      },
      is_campaign_mviva: null,
      campaign_mviva: null,
      campaign_mviva_invalid: null,
      is_lifestyle: 0,
      addons: []
    },
    supplementary_details: {
      name: "Celcom Mobile Family\u2122",
      celcom_family_plan: [
        {
          name: "First\u2122 Gold",
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
          name: "First\u2122 Gold Plus",
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
        }
      ]
    },
    associated_product: [
      {
        name: "iPhone XR 64GB Blue",
        sku: "iphonexr64gbblue",
        is_new: true,
        rrp: "3599.0000",
        discounted_device_rrp: null,
        color: "Blue",
        order_color: "BLU",
        order_category: "HP",
        color_hexa: "#48a5d0",
        memory: "64GB",
        image: "/media/catalog/product/f/r/front_900x900_11.png",
        sub_images: [],
        order_model: "IPHONE XR 64GB",
        part_number: "MDR6020",
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
              device_price: "2348",
              penalty_price: "1000",
              supplementary_count: 0,
              special_price: 0
            }
          },
          {
            sku: "FGP",
            prices: {
              upfront_price: "700",
              device_price: "2568",
              penalty_price: "1000",
              supplementary_count: 0,
              special_price: 0
            }
          },
          {
            sku: "FP",
            prices: {
              upfront_price: "1100",
              device_price: "2208",
              penalty_price: "1500",
              supplementary_count: 0,
              special_price: 0
            }
          },
          {
            sku: "FPP",
            prices: {
              upfront_price: "1300",
              device_price: "1918",
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
          gift_image: "/media/catalog/productno_selection",
          gift_message:
            "FREE black carbon casing* (worth RM109) when you pre-order iPhone. *While stock lasts. \nOrders before 21/10 receive phone delivery on 26/10.\nOrders after 21/10 receive phone delivery on 27/10 onwards."
        },
        easy_phone: {
          rent: [
            {
              FPP: "58"
            },
            {
              FGP: "85"
            },
            {
              FGS: "73"
            },
            {
              FP: "68"
            }
          ],
          own: [
            {
              FPP: "89"
            },
            {
              FGP: "117"
            },
            {
              FGS: "104"
            },
            {
              FP: "99"
            }
          ],
          rent_selected_plan: ["FPP", "FGP", "FGS", "FP"],
          own_selected_plan: ["FPP", "FGP", "FGS", "FP"],
          penalityown: [
            {
              FPP: "3264"
            },
            {
              FGP: "3264"
            },
            {
              FGS: "3264"
            },
            {
              FP: "3264"
            }
          ],
          penalityrent: [
            {
              FPP: "2520"
            },
            {
              FGP: "2520"
            },
            {
              FGS: "2520"
            },
            {
              FP: "2520"
            }
          ]
        },
        campaign_100days: true,
        is_neptune_subsidy: true
      },
      {
        name: "iPhone XR 64GB White",
        sku: "iphonexr64gbwhite",
        is_new: true,
        rrp: "3599.0000",
        discounted_device_rrp: null,
        color: "White",
        order_color: "WHT",
        order_category: "HP",
        color_hexa: "#ffffff",
        memory: "64GB",
        image: "/media/catalog/product/f/r/front_900x900_11.png",
        sub_images: [],
        order_model: "IPHONE XR 64GB",
        part_number: "MDR6020",
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
              device_price: "2348",
              penalty_price: "1000",
              supplementary_count: 0,
              special_price: 0
            }
          },
          {
            sku: "FGP",
            prices: {
              upfront_price: "700",
              device_price: "2568",
              penalty_price: "1000",
              supplementary_count: 0,
              special_price: 0
            }
          },
          {
            sku: "FP",
            prices: {
              upfront_price: "1100",
              device_price: "2208",
              penalty_price: "1500",
              supplementary_count: 0,
              special_price: 0
            }
          },
          {
            sku: "FPP",
            prices: {
              upfront_price: "1300",
              device_price: "1918",
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
          gift_image: "/media/catalog/productno_selection",
          gift_message:
            "FREE black carbon casing* (worth RM109) when you pre-order iPhone. *While stock lasts. \nOrders before 21/10 receive phone delivery on 26/10.\nOrders after 21/10 receive phone delivery on 27/10 onwards."
        },
        easy_phone: {
          rent: [
            {
              FPP: "58"
            },
            {
              FGP: "85"
            },
            {
              FGS: "73"
            },
            {
              FP: "68"
            }
          ],
          own: [
            {
              FPP: "89"
            },
            {
              FGP: "117"
            },
            {
              FGS: "104"
            },
            {
              FP: "99"
            }
          ],
          rent_selected_plan: ["FPP", "FGP", "FGS", "FP"],
          own_selected_plan: ["FPP", "FGP", "FGS", "FP"],
          penalityown: [
            {
              FPP: "3264"
            },
            {
              FGP: "3264"
            },
            {
              FGS: "3264"
            },
            {
              FP: "3264"
            }
          ],
          penalityrent: [
            {
              FPP: "2520"
            },
            {
              FGP: "2520"
            },
            {
              FGS: "2520"
            },
            {
              FP: "2520"
            }
          ]
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
            name: "First\u2122 Gold Plus",
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
            PlanName: "First\u2122 Gold Plus",
            plan_title: "First\u2122 Gold Plus. Affordable. Complete",
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
            is_premium_plan: false
          },
          {
            name: "First\u2122 Gold Supreme",
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
            PlanName: "First\u2122 Gold Supreme",
            plan_title: "First\u2122 Gold Supreme",
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
            is_premium_plan: false
          }
        ]
      },
      {
        tabName: "Xpax\u2122 Plans",
        tabTitle: null,
        tabSubtitle: null,
        is_xpax: true,
        tabData: [
          {
            name: "Xpax\u2122 XP60",
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
            PlanName: "Xpax\u2122 XP60",
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
            productText: "Xpax\u2122 XP60",
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
            is_premium_plan: false
          }
        ]
      }
    ],
    related_products: [
      {
        name: "iPhone XS Max",
        sku: "iPhone-XS-Max"
      },
      {
        name: "iPhone XS",
        sku: "iPhone-XS"
      }
    ],
    analytics_key_addtocart: {
      fb_add_cart_id: "AddToCart_iPhoneXR",
      google_add_cart_id: "lfskCLWZm5ABENjpoqMD",
      twitter_add_cart_id: "nzuzt",
      fb_learn_more_id: null,
      google_learn_more_id: null,
      twitter_learn_more_id: null,
      fb_buy_now_id: null,
      google_buy_now_id: null,
      twitter_buy_now_id: null
    }
  }
  }
];

describe('AgentHeaderComponent', () => {
  let component: AgentHeaderComponent;
  let fixture: ComponentFixture<AgentHeaderComponent>;
  let service: AppService;

  const MockAppService = {

    getEstoreData(url: any) {
        return Observable.of(response);
    }
}
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentHeaderComponent ],
      imports: [HttpClientTestingModule],
      providers: [{ provide: AppService, useValue: MockAppService }, HeaderService,
        CommonUtilService, DeviceDataService, GuestCheckoutService, UserService,]
    })
    .compileComponents();
  }));

  beforeEach(inject([AppService], (appService) => {
    service = TestBed.get(AppService);
    fixture = TestBed.createComponent(AgentHeaderComponent);
    component = fixture.componentInstance;
  }));

 it('Agent Header component created', () => {
    expect(component).toBeTruthy();
  });
  it('Agent Header component ToggleHamburgerMenu for false', () => {
    component.toggleMenu = false;
    component.ToggleHamburgerMenu();
    expect(component.toggleMenu).toBeTruthy();
  });
  it('Agent Header component ToggleHamburgerMenu for true', () => {
    component.toggleMenu = true;
    component.ToggleHamburgerMenu();
    expect(component.toggleMenu).toBeFalsy();
  });
  it('Agent Header component Cart function', () => {
    spyOn(component, "RedirectHeader");
    component.loadCart();
    expect(component.RedirectHeader).toHaveBeenCalledWith('/store/cart');
  });
  it('Agent Header component login function', () => {
    spyOn(component, "RedirectHeader");
    component.login();
    if (typeof window !== 'undefined' && sessionStorage) {
      if (sessionStorage.getItem("AgentInfo")) {
        expect(component.RedirectHeader).toHaveBeenCalledWith('/store/agentlandingpage');
      } else if (sessionStorage.getItem("DealerInfo")) {
        expect(component.RedirectHeader).toHaveBeenCalledWith("/store/devices");
      } else {
        expect(component.RedirectHeader).toHaveBeenCalledWith('/store/agentlogin');
      }
    }
  });
  // it('Agent Header component RedirectHeader function', () => {
  //   const url = window.location.href;
  //   component.RedirectHeader(url + "#test");
  //   expect(window.location.href).toBe(url + "#test");
  // });
  // it('Agent Header component onAgentLogout function', () => {
  //   spyOn(localStorage, "clear");
  //   spyOn(sessionStorage, "clear");
  //   spyOn(component, "RedirectHeader");
  //   let agent = null;
  //   let dealer = null;
  //   if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
  //     agent = JSON.parse(sessionStorage.getItem("AgentInfo"));
  //   }
  //   if (sessionStorage && sessionStorage.getItem("DealerInfo")) {
  //     dealer = JSON.parse(sessionStorage.getItem("DealerInfo"));
  //   }
  //   component.onAgentLogout();
  //   expect(localStorage.clear).toHaveBeenCalled();
  //   expect(sessionStorage.clear).toHaveBeenCalled();
  //   if (agent) {
  //     expect(component.RedirectHeader).toHaveBeenCalledWith('/store/agentlogin');
  //   }
  //   if (dealer) {
  //     expect(component.RedirectHeader).toHaveBeenCalledWith('/store/dealerlogin');
  //   }
  // });
  it('Agent Header component LogoutAgent function', () => {
    spyOn(component, "close__terms__login");
    spyOn(component, "logoutAgentMagento");
    component.LogoutAgent();
    expect(component.close__terms__login).toHaveBeenCalled();
    expect(component.logoutAgentMagento).toHaveBeenCalled();
  });
  it('Agent Header component logout confirmation function', () => {
    component.logoutConfirmation();
    expect(document.getElementById("guest-choose-way").style.display).toBe("block");
  });
  it('Agent Header component close terms function', () => {
    const abc = component.close__terms__login();
    // component.close__terms__login();
    expect(document.getElementById("guest-choose-way").style.display).toBe("none");
    expect(abc).toBe(false);
  });
  it('should test loadUser function', () => {
    sessionStorage.setItem("AgentInfo",JSON.stringify({agent_name:"Test agent"}));
    sessionStorage.setItem("DealerInfo",JSON.stringify({agent_name:"Test dealer"}));
    sessionStorage.setItem("GuestInfo",JSON.stringify({agent_name:"Test dealer"}));
    // component.close__terms__login();
    component.loadUser();
    expect(component.agentName).toBe('Test agent');
    expect(component.agentLoggedIn).toBeTruthy();
    expect(component.dealerName).toBe('Test dealer');
    expect(component.userName).toBe('GUEST');
    sessionStorage.removeItem("AgentInfo");
    sessionStorage.removeItem("DealerInfo");
  });
  it('should test loadUser function', () => {
    sessionStorage.setItem("AgentInfo",JSON.stringify({agent_name:"Test agent"}));
    sessionStorage.setItem("DealerInfo",JSON.stringify({agent_name:"Test dealer"}));
    sessionStorage.removeItem("GuestInfo");
    sessionStorage.setItem("UserInfo",JSON.stringify({outputCPResp:{name:"Test User"}}));
    // component.close__terms__login();
    component.loadUser();
    expect(component.agentName).toBe('Test agent');
    expect(component.agentLoggedIn).toBeTruthy();
    expect(component.dealerName).toBe('Test dealer');
    expect(component.userName).toBe('Test User');
    sessionStorage.removeItem("AgentInfo");
    sessionStorage.removeItem("DealerInfo");
  });
  // it('should test ngoninit function', () => {
  //   sessionStorage.setItem("AgentInfo",JSON.stringify({agent_name:"Test agent"}));
  //   sessionStorage.removeItem("DealerInfo");
  //   sessionStorage.removeItem("GuestInfo");
  //   sessionStorage.removeItem("UserInfo");
  //   window.location.href = '#store/devices';
  //   // component.close__terms__login();
  //   component.ngOnInit();
  //   expect(component.catalogPage).toBeTruthy();
  //   sessionStorage.removeItem("AgentInfo");
  // });
  // it('should test ngoninit function for noAgentSpecificPage false', () => {
  //   sessionStorage.setItem("AgentInfo",JSON.stringify({agent_name:"Test agent"}));
  //   sessionStorage.removeItem("DealerInfo");
  //   sessionStorage.removeItem("GuestInfo");
  //   sessionStorage.removeItem("UserInfo");
  //   window.location.href = '#store/agentlogin';
  //   // component.close__terms__login();
  //   component.ngOnInit();
  //   expect(component.noAgentSpecificPage).toBeFalsy();
  //   sessionStorage.removeItem("AgentInfo");
  // });
  // it('should test ngoninit function for noDealerLoginPage false', () => {
  //   sessionStorage.setItem("AgentInfo",JSON.stringify({agent_name:"Test agent"}));
  //   sessionStorage.removeItem("DealerInfo");
  //   sessionStorage.removeItem("GuestInfo");
  //   sessionStorage.removeItem("UserInfo");
  //   window.location.href = '#store/dealerlogin';
  //   // component.close__terms__login();
  //   component.ngOnInit();
  //   expect(component.noDealerLoginPage).toBeFalsy();
  //   sessionStorage.removeItem("AgentInfo");

  // });
  // it('should test ngoninit function for landingpage true', () => {
  //   sessionStorage.setItem("AgentInfo",JSON.stringify({agent_name:"Test agent"}));
  //   sessionStorage.removeItem("DealerInfo");
  //   sessionStorage.removeItem("GuestInfo");
  //   sessionStorage.removeItem("UserInfo");
  //   window.location.href = '#store/agentlandingpage';
  //   // component.close__terms__login();
  //   component.ngOnInit();
  //   expect(component.landingPage).toBeTruthy();
  //   sessionStorage.removeItem("AgentInfo");

  // });
  it('should test logoutAgentMagento function',() =>{
    sessionStorage.removeItem('UserToken');
    component.logoutAgentMagento();

  });
  it('should test logout function',() =>{
    sessionStorage.removeItem('UserToken');
    component.LogoutUser();

  });
});
