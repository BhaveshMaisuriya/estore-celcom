import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home.component';

// EStore.
import { DeviceCatalogueComponent } from './Store/device/device-catalogue/device-catalogue.component';
import { PlanHomeComponent } from './Store/plan/plan-home/plan-home.component';
import { PlanComparisonComponent } from './Store/plan/plan-comparison/plan-comparison.component';
import { CartHomeComponent } from './Store/cart/cart-home/cart-home.component';
import { OrderSummaryComponent } from './Store/checkout/order-summary/order-summary.component';
import { ShippingAddressComponent } from './Store/checkout/shipping-address/shipping-address.component';
import { CheckoutHomeComponent } from './Store/checkout/checkout-home/checkout-home.component';
import { DeviceDetailsComponent } from "./Store/device/device-details/device-details.component";
import { LoginHomeComponent } from './Store/login/login-home/login-home.component';
import { AgentLoginComponent } from './Store/login/agent-login/agent-login.component';
import { AgentLandingComponent } from './Store/login/agent-landing/agent-landing.component';
import { AgentSearchComponent } from './Store/login/agent-search/agent-search.component';
import { LoginOtpComponent } from './Store/login/login-otp/login-otp.component';
import { ViewOrderHomeComponent } from "./Store/checkout/vieworder/view-order-home.component";
import { OrderHistoryComponent } from "./Store/account/order-history/order-history.component";
import { TrackOrderComponent } from './Store/account/track-order/track-order.component';
import { ViewProfileComponent } from './Store/account/view-profile/view-profile.component';
import { PlanPurchaseComponent } from './Store/plan/plan-purchase/plan-purchase.component';
import { GuestLoginComponent } from './Store/guest-checkout/guest-login/guest-login.component';
import { PersonalDetailsComponent } from './Store/guest-checkout/personal-details/personal-details.component';
import { CheckMnpStatusComponent } from './Store/mnp/check-mnp-status/check-mnp-status.component';
import { OrderTrackingComponent } from './Store/order-tracking/order-tracking.component';
import { BbDeviceDetailsComponent } from './Store/broadband/bb-device-details/bb-device-details.component';
import { AuthGuardService } from './Service/auth-guard.service';
import { AgentOrderHistoryComponent } from "./Store/account/agent-order-history/agent-order-history.component";
import { DeviceRoiComponent } from './Store/device/device-roi/device-roi.component';
import { EsimComponent } from './Store/esim/esim/esim.component';
import { CsagentCampaignDetailsComponent } from './Store/csagent-campaign-details/csagent-campaign-details.component';
import { EmailVerificationComponent } from './Store/email-verification/email-verification.component';

import { AppleWatchComponent } from './Store/apple-watch/apple-watch.component';
import { EnterpriseRegistrationComponent } from './Store/enterprise/registration/registration.component';
import { EnterpriseLoginComponent } from './Store/enterprise/login/login.component';
import { EnterpriseLandingComponent } from './Store/enterprise/landing/landing.component';
import { SideSummaryContainerComponent } from './Widget/side-summary/side-summary-container/side-summary-container.component';
import { PrepaidComponent } from './Store/plan/prepaid/prepaid.component';
import { NewLandingPageComponent } from "./pages/new-landing-page/new-landing-page.component";
import { PostpaidComponent } from './pages/postpaid/postpaid.component';
import { CanActivateMassGuard } from "./shared/guards/can-activate-mass.guard";
import { CanActivateNonMassGuard } from "./shared/guards/can-activate-non-mass.guard";
import { NotificationErrorComponent } from "./Store/widget/notification-error/notification-error.component";
import { DeviceDetailPageComponent } from './pages/device-detail-page/device-detail-page.component';
import {FamilyLinePlanComponent} from "./pages/family-line-plan/family-line-plan.component";
import { CampaignPortalComponent } from './pages/campaign-portal/campaign-portal.component';
import { GameEligibilityCheckComponent } from './pages/game-eligibility-check/game-eligibility-check.component';
import { FirstBluePlanComponent } from './pages/first-blue-plan/first-blue-plan.component';
import { MnpSimVerificationComponent } from './pages/mnp-sim-verification/mnp-sim-verification.component';
import { EKycComponent } from './Store/eKyc/e-kyc/e-kyc.component';

export const router: Routes = [
  // {
  //   path: 'device-detail/:deviceId',
  //   component: DeviceDetailsComponent,
  //   data: {
  //     pageTitle: "Device Details | Celcom",
  //     pageCategory2: "Devices"
  //   }
  // },
  {
    path: 'home',
    component: NewLandingPageComponent,
    data: {
      pageTitle: null, // ? Will be set from CMS
      pageCategory2: "Devices",
      // onDeactivate: { redirect: '/unauthorized' }
      seo: {
        title: 'Home Page | Dynamic Title and Meta Tags Demo',
        metaTags: [
          { property: 'og:title', content: 'Shop Device | Celcom' },
          { proprety: 'og:description', content: 'Celcom - Catch & Win it Now!' },
          { property: 'og:image', content:'https://estore-celcom.herokuapp.com/assets/celcom_banner.jpg' },
          { property: 'og:url', content: 'https://estore-celcom.herokuapp.com/home' },
        ]
      }
    },
    // canActivate: [CanActivateMassGuard]
  },
  {
    path: 'store/personalization',
    component: CampaignPortalComponent,
    data: {
      pageTitle: "Home"
    },
  },
  {
    path: 'personal/postpaid',
    component: PlanHomeComponent,
    data: {
      pageTitle: "Postpaid Plans | Celcom",
      pageCategory2: "Postpaid"
    }
  },
  {
    path: 'store/plan/comparison',
    component: PlanComparisonComponent,
    data: {
      pageTitle: "Plan Comparison | Celcom",
      pageCategory2: "Devices"
    }
  },
  {
    path: 'e-kyc',
    component: EKycComponent,
  },
  {
    path: 'store/devices',
    component: DeviceCatalogueComponent,
    data: {
      pageTitle: "All Devices | Celcom",
      pageCategory2: "Devices",
      // onDeactivate: { redirect: '/unauthorized' }
    },
    // canActivate: [CanActivateNonMassGuard]
  },
  {
    path: 'unauthorized',
    component: NotificationErrorComponent,
    data: {
      pageTitle: "Unauthorized | Celcom",
      pageCategory2: "Error"
    }
  },
  {
    path: 'store/cart',
    redirectTo: 'store/checkout',
    pathMatch: 'full',
  //   component: CartHomeComponent,
  //   data: {
  //     pageTitle: "Cart | Celcom",
  //     pageCategory2: ""
  //   }
  },
  {
    path: 'store/login',
    component: LoginHomeComponent,
    data: {
      pageTitle: "Login | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/agentlogin',
    component: AgentLoginComponent,
    data: {
      pageTitle: "Agent Login | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/dealerlogin',
    component: AgentLoginComponent,
    data: {
      pageTitle: "Dealer Login | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/agentlandingpage',
    component: AgentLandingComponent,
    data: {
      pageTitle: "Agent Landing | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/dealerlandingpage',
    component: AgentLandingComponent,
    data: {
      pageTitle: "Dealer Landing | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/game-eligibility-check',
    component: GameEligibilityCheckComponent,
    data: {
      pageTitle: "Game Eligibility Check | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/mnp-sim-verification/:orderId',
    component: MnpSimVerificationComponent,
    data: {
      pageTitle: "MNP SIM Verification | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/agentSearchOrder',
    component: AgentSearchComponent,
    data: {
      pageTitle: "Agent Search | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/login/otp',
    component: LoginOtpComponent,
    data: {
      pageTitle: "Login OTP | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/checkout/orderconfirmation',
    component: ViewOrderHomeComponent,
    data: {
      pageTitle: "Order Confirmation | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/account/order-history',
    component: ViewProfileComponent,
    data: {
      pageTitle: "Store View My Profile | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/account/order-search',
    component: AgentSearchComponent,
    data: {
      pageTitle: "Search Order | Celcom",
      pageCategory2: ""
    },
    canActivate: [AuthGuardService]
  },
  {
    path: 'store/account/order-search/:NricId',
    component: AgentOrderHistoryComponent,
    data: {
      pageTitle: "Order History | Celcom",
      pageCategory2: ""
    },
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'plans/:planPurchaseId',
  //   component: PlanPurchaseComponent,
  //   data: {
  //     pageTitle: "Plan Purchase | Celcom",
  //     pageCategory2: "Postpaid"
  //   }
  // },
  {
    path: 'roi-form/:deviceId',
    component: DeviceRoiComponent,
    data: {
      pageTitle: " ROI | Celcom",
      pageCategory: "Devices"
    }

  },
  {
    path: 'campaign/:campaignType',
    component: CsagentCampaignDetailsComponent,
    data: {
      pageTitle: "Campaign Details | Celcom",
      pageCategory: ""
    }

  },
  {
    path: 'store/emailverification/:token',
    component: EmailVerificationComponent,
    data: {
      pageTitle: "Email Verification | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/checkout',
    component: CheckoutHomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'summary',
        pathMatch: 'full'
      },
      // {
      //   path: 'shipping',
      //   component: ShippingAddressComponent,
      //   data: {
      //     pageTitle: "Shipping | Celcom",
      //     pageCategory2: ""
      //   }
      // },
      {
        path: 'summary',
        component: OrderSummaryComponent,
        data: {
          pageTitle: "Summary | Celcom",
          pageCategory2: ""
        }
      },
      {
        path: 'personal-details',
        component: PersonalDetailsComponent,
        data: {
          pageTitle: "Personal Details | Celcom",
          pageCategory2: ""
        }
      }
    ]
  },
  {
    path: 'store/checkout/trackorderdetails/:orderId',
    component: TrackOrderComponent,
    data: {
      pageTitle: "Track Order Details | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/checkout/viewmyprofile',
    component: ViewProfileComponent,
    data: {
      pageTitle: "View My Profile | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/guest/login',
    component: GuestLoginComponent,
    data: {
      pageTitle: "Guest Login | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/viewmyprofile',
    component: ViewProfileComponent,
    data: {
      pageTitle: "Store View My Profile | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/profile/vouchers',
    component: ViewProfileComponent,
    data: {
      pageTitle: "Store View My Profile | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/check-mnp-status',
    component: CheckMnpStatusComponent,
    data: {
      pageTitle: "Check MNP Status | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'emailtrackorder/:orderId',
    component: OrderTrackingComponent
  },
  {
    path: 'emailtrackorder',
    component: OrderTrackingComponent
  },
  {
    path: 'store/accessories/nschecker',
    component: AppleWatchComponent,
    data: {
      pageTitle: "Apple Watch | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/enterprise/registration',
    component: EnterpriseRegistrationComponent,
    data: {
      pageTitle: "Enterprise Registration | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/enterprise/login',
    component: EnterpriseLoginComponent,
    data: {
      pageTitle: "Enterprise Login | Celcom",
      pageCategory2: ""
    }
  },
  {
    path: 'store/enterprise/landing',
    component: EnterpriseLandingComponent,
    data: {
      pageTitle: "Enterprise Landing | Celcom",
      pageCategory2: ""
    }
  },
  // {
  //   path: 'plans/mega',
  //   component: PostpaidComponent,
  //   data: {
  //     pageTitle: "Plan Purchase | Celcom",
  //     pageCategory2: "Postpaid",
  //     isPlanPage: true,
  //     useMaterialTheme: true,
  //   }
  // },
  {
    path: 'plans/family-line',
    component: FamilyLinePlanComponent,
    data: {
      pageTitle: "Plan Purchase | Celcom",
      pageCategory2: "Postpaid",
      isPlanPage: true,
      useMaterialTheme: true,
      isFamilyPlan: true
    }
  },
  {
    path: 'plans/prepaid/:sku',
    component: PrepaidComponent,
    data: {
      pageTitle: "Plan Purchase | Celcom",
      pageCategory2: "Prepaid",
      isPlanPage: true,
      useMaterialTheme: true,
      isPrepaid: true,
      seo: {
        title: 'Plan Prepaid | Dynamic Title and Meta Tags Demo',
        metaTags: [
          { property: 'og:title', content: 'Plan Prepaid | Celcom' },
          { proprety: 'og:description', content: 'Cool!  Prepaid Plan.' },
          { property: 'og:image', content: 'https://estore-celcom.herokuapp.com/assets/img/bg-rocket.png' },
          { property: 'og:url', content: 'https://estore-celcom.herokuapp.com/plans/mega' },
        ]
      }
    }
  },
  {
    path: 'plans/:sku',
    component: PostpaidComponent,
    data: {
      pageTitle: "Plan Purchase | Celcom",
      pageCategory2: "Postpaid",
      isPlanPage: true,
      useMaterialTheme: true,
    }
    
  },
  {
    path: 'device-detail/:deviceId',
    component: DeviceDetailPageComponent,
    data: {
      pageTitle: "Device Details | Celcom",
      pageCategory2: "Devices",
      isDevicePage: true,
      useMaterialTheme: true,
    }
  },
  {
    path: '',
    component: SideSummaryContainerComponent,
    data: {
      parent: 'SideSummaryContainerComponent'
    },
    children: [
      { path: "", pathMatch: "full", redirectTo: '/home', data: { "EndPoint": "" } },
      {
        path: 'device-detail-cmp/:deviceId',
        component: DeviceDetailsComponent,
        data: {
          pageTitle: "Device Details | Celcom",
          pageCategory2: "Devices"
        }
      },
      {
        path: 'plans-legacy/:planPurchaseId',
        component: PlanPurchaseComponent,
        data: {
          pageTitle: "Plan Purchase | Celcom",
          pageCategory2: "Postpaid",
          isPlanPage: true,
        }
      },
      {
        path: 'broadband/:bbDeviceId',
        component: BbDeviceDetailsComponent,
        data: {
          pageTitle: "Home WireLess | Celcom",
          pageCategory2: "Broadband",
          isBroadband: true,
        }
      },
      {
        path: 'esim',
        component: EsimComponent,
        data: {
          pageTitle: "Celcom eSIM | Celcom",
          pageCategory2: "eSIM",
          isEsim: true,
        }
      },
    ]
  },
  { path: "**", component: HomeComponent, data: { "EndPoint": "", "Star": "*" } }
];
