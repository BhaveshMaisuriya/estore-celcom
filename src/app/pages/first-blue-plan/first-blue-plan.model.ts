import { AutoBillTypeOfPurchase, iPlanTypePurchse, iPlanTabData } from "../../shared/models/plan.model";
import { IPromotionBadge } from "../new-landing-page/store/shop-device.model";
import { iSupplementary } from "../../shared/models/device.model";

export interface IFBAnalyticsKeyAddtocart {
  fb_add_cart_id?: any;
  google_add_cart_id?: any;
  twitter_add_cart_id?: any;
  fb_learn_more_id?: any;
  google_learn_more_id?: any;
  twitter_learn_more_id?: any;
  fb_buy_now_id?: any;
  google_buy_now_id?: any;
  twitter_buy_now_id?: any;
}

export interface IFBTelcoDay {
  status: boolean;
  hat_text?: any;
  message?: any;
  allowed_types: string[];
  not_allowed_types: any[];
  eligible_message: string;
  not_eligible_message: string;
}

export interface IFBSupplementaryData {
  name: string;
  max_line: string;
  part_number: string;
  price: string;
}

export interface IFBTabData {
  name: string;
  PlanName: string;
  sku: string;
  url_key: string;
  order_plan_bundle: string;
  ngn_part_number: string;
  order_service_bundle?: any;
  order_plan_component: any[];
  PlanMonthlyPay: string;
  OneTimePayment?: any;
  contract: string;
  offer: string;
  promotion_text?: any;
  promotion_terms?: any;
  promotion_badge: IPromotionBadge;
  data_limit?: any;
  monthlyPlan: string;
  monthly_plan: string;
  is_saleable?: any;
  speed_limit?: any;
  plan_title: string;
  plan_subtitle: string;
  BackgroundColor?: any;
  upfront_installment?: any;
  IndicatorClass?: any;
  ProductText?: any;
  KeyFiguresText?: any;
  KeyText: string;
  product_text?: any;
  key_figures_text?: any;
  key_text: string;
  BuynowLink: string;
  BuynowText: string;
  knowMoreLink?: any;
  knowMoreText?: any;
  upper_age_limit?: any;
  lower_age_limit: string;
  banner_image?: any;
  mobile_image?: any;
  is_xpax: boolean;
  MobileDescription?: any;
  product_type?: any;
  footNote?: any;
  TableInfo: any[];
  image_url: string;
  supplementary_data: IFBSupplementaryData[];
  addons: any[];
  is_campaign_mviva?: any;
  campaign_mviva?: any;
  campaign_mviva_invalid?: any;
  analytics_key_addtocart: IFBAnalyticsKeyAddtocart;
  telco_day: IFBTelcoDay;
  is_premium_plan: boolean;
  bill_type: number;
  notes: string;
  family_line_notes: string;
}

export interface IFirstBluePlanResponse {
  tabName: string;
  tabTitle?: any;
  tabSubtitle?: any;
  tabData: IFBTabData;
  type_purchse: iPlanTypePurchse;
  auto_bill_type_of_purchase: AutoBillTypeOfPurchase;
}

// * Eligility Check
export interface IFBECSupplyDetail {
  supplyNo: string;
  supplyName: string;
}

export interface IFBECAccountdetail {
  principle_no: string;
  plan_name: string;
  supply_count: number;
  supply_details: IFBECSupplyDetail[];
}

export interface IFBEligiblityCheckResponse {
  status: boolean;
  message: string;
  placement: string;
  validation_id: string;
  los_check_upfront_status:	boolean;
  accountdetails: IFBECAccountdetail[];
}

export interface IFBPFlags {
  step: number;
  loading: boolean;
  loggedIn: boolean;
  otpRequested: boolean;
  otpExpired: boolean;
  resendLinkDisabled: boolean;
  isEligible: boolean;
  maxLimitReached: boolean;
}

export interface IFBPData  {
  totalPayment: number;
  state: any; // TODO add type
  accountDetails: null | IFBECAccountdetail;
  validation_id: string | null;
  supplementaryLines: iSupplementary[];
  basePlan: IFBTabData | null;
  losCheckUpfrontStatus: boolean | null;
}

export interface iPlanFirstBlue {
      tabData: iPlanTabData;
      type_purchse: iPlanTypePurchse;
      auto_bill_type_of_purchase: AutoBillTypeOfPurchase;
  }
