import { iBasePlan } from 'app/Service/devicedata.service';
import { iGeneralServerResponse } from './general.model';
import { IPromotionBadge } from 'app/pages/new-landing-page/store/shop-device.model';
import { iDeviceResponse, iMvivaCampaign, iPlanDevice, iPlanDeviceBundle } from './device.model';
import { iCreditReload, iInternetPass, iPrepaidPack } from 'app/Store/plan/prepaid/prepaid.model';

export const STAR_SPEED_PASS_SKU = 'Ultra-Speed';
export const STAR_GB_PASS_SKU = 'Ultra-GB';
export const STAR_PLAN_PREFIX = 'mega';
export const STAR_PLAN_PREFIX_ALT = 'ultra';
export const MOON_PLAN_PREFIX = 'xp-lite';
export const MOON_PLAN_PREFIX_ALT = 'xp-b-plan';
export const FIRST_BLUE_INTERNET = 'FB-Internet';

export interface SupplementaryData {
    name?: string;
    max_line?: string;
    part_number?: string;
    price?: string;
}

export interface AnalyticsKeyAddtocart {
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

export interface TelcoDay {
    status?: boolean;
    hat_text?: any;
    message?: any;
    allowed_types?: any[];
    not_allowed_types?: string[];
    eligible_message?: string;
    not_eligible_message?: string;
}

export interface iPlan {
    name?: string;
    PlanName?: string;
    sku?: string;
    url_key?: string;
    order_plan_bundle?: string;
    ngn_part_number?: string;
    order_service_bundle?: any;
    order_plan_component?: any[];
    PlanMonthlyPay?: number;
    OneTimePayment?: any;
    contract?: string;
    offer?: string;
    referrer_data?: string;
    data_limit?: string;
    monthlyPlan?: string;
    monthly_plan?: string;
    is_saleable?: string;
    speed_limit?: string;
    plan_title?: string;
    plan_subtitle?: string;
    BackgroundColor?: any;
    upfront_installment?: any;
    IndicatorClass?: any;
    ProductText?: any;
    KeyFiguresText?: string;
    KeyText?: string;
    product_text?: any;
    key_figures_text?: string;
    key_text?: string;
    BuynowLink?: any;
    BuynowText?: any;
    knowMoreLink?: any;
    knowMoreText?: any;
    upper_age_limit?: any;
    lower_age_limit?: any;
    banner_image?: any;
    mobile_image?: any;
    is_xpax?: boolean;
    MobileDescription?: any;
    product_type?: any;
    footNote?: any;
    TableInfo?: any[];
    image_url?: string;
    small_image_url?: string;
    supplementary_data?: SupplementaryData[];
    addons?: any[];
    is_campaign_mviva?: any;
    campaign_mviva?: iMvivaCampaign;
    campaign_mviva_invalid?: any;
    analytics_key_addtocart?: AnalyticsKeyAddtocart;
    telco_day?: TelcoDay;
    is_premium_plan?: boolean;
    bill_type?: number;
    base_plan?: any;
    pass_plan?: any;
    parent_pass?: string;
    is_default?: string;
    associated_bundle_product?: Array<iPlanDeviceBundle>;
    promotion_badge?: IPromotionBadge;
    promotion_text?: string;
    promotion_terms?: string;
    is_campaign_omni?: boolean;
    campaign_omni?: iOmniCampaign;
    lifestyle_contract?: {
        [key: string]: iLifeStyleContract
    };
    /**
     * prepaid campaign - dynamic sim
     */
    prepaid_campaign?: iPrepaidCampaign;
    internet_passes?: iInternetPass[];
    credit_reload?: iCreditReload[];
    prepaid_pack?: iPrepaidPack;
    material_code?: string;
}

export interface iPrepaidCampaign {
    "campaign_code": string;
    "banner_image": string;
    "banner_title": string;
    "banner_subtitle": string;
    "purchase_type": string[];
}

export interface iPass {
    name?: string;
    sku?: string;
    order_plan_bundle?: string;
    is_saleable?: string;
    is_default?: string;
    associated_passes?: iPlan[];
    offer?: string;
    image_url?: string;
    promotion_badge?: IPromotionBadge;
    promotion_text?: string;
    promotion_terms?: string;
    internet_share?: iInternetShare;
}

export interface iInternetShare {
    enabled?: boolean;
    label?: string;
    monthly_price?: string;
}

export interface iPlanPrice {
    base_price: number;
    plan_price: number;
}

export interface iLifeStyleContract {
    lifestyle_upfront: string;
    lifestyle_voucher: string;
    offers: string;
    default_selectedvoucher:boolean;
    contract_period: string;
}
  /**
   * Extends iGeneralServerResponse so can get iGeneralServerResponse object when error thrown from Magento
   */
  export interface iPlanTabData extends iGeneralServerResponse {
      name: string;
      PlanName: string;
      sku: string;
      url_key: string;
      order_plan_bundle?: any;
      ngn_part_number?: any;
      order_service_bundle?: any;
      order_plan_component: any[];
      PlanMonthlyPay: number;
      OneTimePayment?: any;
      contract: string;
      offer?: any;
      data_limit?: any;
      monthlyPlan: number;
      monthly_plan: number;
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
      supplementary_data: any[];
      addons: any[];
      is_campaign_mviva?: any;
      campaign_mviva?: iMvivaCampaign;
      campaign_mviva_invalid?: any;
      analytics_key_addtocart: AnalyticsKeyAddtocart;
      telco_day: TelcoDay;
      is_premium_plan: boolean;
      bill_type: number;
      base_plan: iBasePlan[];
      pass_plan: iPass[];
      notes: string;
      is_campaign_omni?: boolean;
      campaign_omni?: iOmniCampaign;
      enableLifeStyleSection?: boolean;
      prepaid_pack?: iPrepaidPack;
  }

  export interface iTypeofPurchase {
      newline: boolean;
      cobp: boolean;
      mnp: boolean;
      easyphone?: boolean;
  }

  export interface iPlanTypePurchse {
      dealer: iTypeofPurchase;
  }

  export interface AutoBillTypeOfPurchase {
      NL: string;
      COBP: string;
      MNP: string;
  }

  export interface IDevicePurchaseType {
    easyphone: string;
    device_bundle: string;
    device_only: string;
  }

  export interface iPlanMega {
      tabData: iPlanTabData;
      type_purchse: iPlanTypePurchse;
      auto_bill_type_of_purchase: AutoBillTypeOfPurchase;
      supp_rebate_label: string;
  }


  export interface iAPIResponse extends iPlanMega, iDeviceResponse {

  }

export interface iBannerInfo {
    promotion_text_banner?: string;
    planonly_inline_text?: string;
}
export interface iOmniCampaign {
    campaign_title: string;
    campaign_desc: string;
    offer_category: string;
    offer_desc: string;
    device_sku: string;
    device_retail_price?: number;
    device_disc_amt?: number;
    device_bundle_price?: number;
    plan_sku: string;
    pass_sku: string;
    rebate_amount?: number;
    rebate_frequency?: number;
    upfront_payment: boolean;
    banner_info?: iBannerInfo;
    purchase_type?: string[];
}

export interface iPlanMoon {
    name: string;
    sku: string;
    url_key: string;
    base_plan: iBasePlan[];
    pass_plan: iPlan[];
    upper_age_limit: string;
    lower_age_limit: string;
    promotion_message: string;
    notes: string;
    type_purchse: iPlanTypePurchse;
    auto_bill_type_of_purchase: AutoBillTypeOfPurchase;
}

/**
 * Customized plans / first plans / legacy plans
 */
export interface iPlanCustomized {
    tabname: string;
    taburl: string;
    tabtitle: string;
    tabsubtitle: string;
    is_xpax: boolean;
    tabdata: iCMPPlanTabData;
}

export interface iCMPPlanTabData {
    Items: iCMPSinglePlanTabData[];
    StatusMessage: string;
    Status: string;
}

export interface iCMPSinglePlanTabData extends iPlan {
    name?: string;
    PlanName?: string;
    sku?: string;
    url_key?: string;
    order_plan_bundle?: string;
    ngn_part_number?: string;
    order_service_bundle?: string;
    order_plan_component?: any[];
    PlanMonthlyPay?: number;
    OneTimePayment?: any;
    contract?: string;
    offer?: string;
    promotion_text?: any;
    promotion_terms?: any;
    promotion_badge?: any;
    data_limit?: string;
    monthlyPlan?: string;
    monthly_plan?: string;
    is_saleable?: any;
    speed_limit?: any;
    plan_title?: string;
    plan_subtitle?: string;
    BackgroundColor?: string;
    upfront_installment?: any;
    IndicatorClass?: string;
    ProductText?: string;
    KeyFiguresText?: any;
    KeyText?: string;
    product_text?: string;
    key_figures_text?: any;
    key_text?: string;
    BuynowLink?: string;
    BuynowText?: string;
    knowMoreLink?: string;
    knowMoreText?: string;
    upper_age_limit?: any;
    lower_age_limit?: string;
    banner_image?: string;
    mobile_image?: string;
    is_xpax?: boolean;
    MobileDescription?: any;
    product_type?: string;
    footNote?: any;
    TableInfo?: any[];
    image_url?: string;
    supplementary_data?: any[];
    addons?: any[];
    is_campaign_mviva?: boolean;
    campaign_mviva?: iMvivaCampaign;
    campaign_mviva_invalid?: any;
    analytics_key_addtocart?: AnalyticsKeyAddtocart;
    telco_day?: TelcoDay;
    is_premium_plan?: boolean;
    bill_type?: number;
    notes?: string;
    family_line_notes?: string;
    /**
     * properties only in parent
     */
    lowerAgeLimit?: string;
    IsMnp?: boolean;
    plan_part_number?: string;
    PlanOnlyComponentToShow?: boolean;
    PlanSku?: string;
    TotalPay?: string;
    UpperAgeLimit?: any;
}

/**
 * This is singel plan
 */
export interface iSinglePlanCustomized extends GenericPlanData {
    tabname?: string;
    tabTitle?: any;
    tabSubtitle?: any;
    tabData?: iCMPSinglePlanTabData;
    type_purchse?: iPlanTypePurchse;
    auto_bill_type_of_purchase?: AutoBillTypeOfPurchase;
}

export interface GenericPlanData extends iGeneralServerResponse {
    plan_type?: planTypeEnum;
    bundle_product_sku?: string;
    base_plans?: iBasePlan[];
    pass_plans?: iPass[];
    plans?: iPlan[];
    devices?: iPlanDevice[];
    campaign_mviva?: iMvivaCampaign;
    campaign_omni?: iOmniCampaign;
    campaign_invalid_message?: string;
    type_of_purchase_options?: iTypeofPurchase;
    auto_bill_type_of_purchase?: AutoBillTypeOfPurchase;
    notes?: string;
    /**
     * XP-Lite special
     */
    promotion_message?: string;
    /**
     * Backward compatibility
     * TODO: Migrate & Remove this
     */
    original_response?: any;
    enable_lifestyle?: boolean;
}

export enum planTypeEnum {
    star = 'mega',
    moon = 'xp-lite',
    cmp = 'customized',
}

export interface iLifeStyleVoucherDetails {
    lifestyle_contract_label?: string;
    lifestyle_contract?: string;
    lifestyle_upfront?: string;
}