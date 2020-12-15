import { AutoBillTypeOfPurchase, iOmniCampaign, IDevicePurchaseType } from './plan.model';
import { IPromotionBadge } from 'app/pages/new-landing-page/store/shop-device.model';
import { iBasePlan } from 'app/Service/devicedata.service';
import { iGeneralServerResponse } from './general.model';

export const COMBO_DEVICE_TYPE_ACCESSORY = 'Phone + Accessories';
export const COMBO_DEVICE_TYPE_PHONE = 'Mix & Match';

export interface iPlanDevicePrices {
    upfront_price: string;
    device_price: string;
    penalty_price: string;
    supplementary_count: number;
    special_price: number;
}

export interface iPlanDevice {
    name?: string;
    sku?: string;
    rrp?: string;
    discounted_device_rrp?: string;
    color?: string;
    memory?: string;
    size?: string;
    order_color?: string;
    order_category?: string;
    color_hexa?: string;
    image?: string;
    desc?: string;
    sub_images?: string[];
    order_model?: string;
    part_number?: string;
    product_type?: string;
    new_customer?: string;
    segment?: any;
    contract?: string;
    upfront_installment?: any;
    prices?: iPlanDevicePrices;
    is_new?: boolean;
    start_date?: any;
    end_date?: any;
    saleable_plans?: SaleablePlan[];
    pre_order_data?: PreOrderData;
    free_gift_data?: FreeGiftData;
    easy_phone?: EasyPhone;
    campaign_100days?: boolean;
    is_neptune_subsidy?: boolean;
}

export interface iSaleablePlanPrice {
    upfront_price?: string;
    device_price?: string;
    penalty_price?: string;
    supplimentary_sku?: string;
    subsidy?: string;
    contract_period?: {
      [key: string]: iSaleablePlanPrice;
    };
}

export interface SaleablePlan {
    sku: string;
    parent_product_sku?: string;
    prices: iSaleablePlanPrice[];
}

export interface PreOrderData {
    preorder_estimate_delivery_text: string;
    preorder_estimate_delivery_date: string;
    preorder_text: string;
    preorder_from_date_text: string;
    preorder_to_date_text: string;
    preorder_from_date: string;
    preorder_to_date: string;
    preorder_end_flag: number;
    preorder_estimate_delivery?: any;
    preorder_submit_date: string;
    preorder_stock_available_quantity: number;
    preorder_availble_stock_in_hand: number;
    preorder_stock_status_flag: number;
    preorder_hat: string;
}

export interface FreeGiftData {
    gift_image: string;
    gift_message: string;
}

export interface EasyPhone {
    rent: Object[];
    own: iEasyPhonePricing[];
    rent_selected_plan: string[];
    own_selected_plan: string[];
    penalityown: Object[];
    penalityrent: Object[];
    default_price_sku?: string;
}

export interface iEasyPhonePricing {
  parent_product_sku?: string;
  [sku: string]: string;
  contract_periods?: any;
}

export interface iPlanDeviceBundle {
    name: string;
    sku: string;
    price?: number;
    quntity?: any;
    preorder?: number;
    preorder_availability_flag?: number;
    is_rent?: boolean;
    is_own?: boolean;
    order_monthly_pay?: string;
    most_popular?: string;
    rm?: string;
    rrp_rm_strick_price?: string;
    main_image?: string;
    sub_images?: string[];
    dimension?: any;
    weight?: any;
    splash_water_dust_resistant?: string;
    stock?: string;
    order_category?: string;
    order_model?: string;
    order_brand?: string;
    segment?: string;
    default_selected_color?: string;
    default_selected_memory?: string;
    stock_indicator_image?: string;
    stock_indicator_text?: any;
    default_device_option?: string;
    associated_device_product?: iPlanDevice[];
    pre_order_data?: PreOrderData;
    free_gift_data?: FreeGiftData;
    easyphone_autobill?: string;
}

export interface iSupplementary {
    planPhoneNumber: string;
    planPrice: string;
    planType: string;
    partNumber: string;
    isVerified?: boolean;
    isDisabled?: boolean;
    number?: string;
}

export interface iStockResponse {
    status: boolean;
    message?: string;
    in_stock: boolean;
}

export interface iStockCheck {
    sku: string,
    response: iStockResponse;
}

export interface iMvivaCampaign {
    desktop_content: string;
    mobile_content: string;
    device_bundle: string;
    easyphone: string;
    targeted_plan: string[];
    no_upfront_payment: boolean;
    related_campaigns: string;
    purchase_type: string[];
    is_moon_campaign: string;
    summary_message: string;
    optional_easyphone_auto_billing: string;
    can_buy_supplementary_lines?: string;
}

export enum deviceBundleTypeEnum {
    easyPhone = 'Easyphone',
    deviceBundle = 'Device Bundle',
    deviceOnly = 'Device Only',
}

export interface iToPAvailability {
    newline: boolean;
    cobp: boolean;
    mnp: boolean;
}

export interface iDeviceTypePurchase {
    dealer: iToPAvailability;
    enterprise: iToPAvailability;
}

export interface iDeviceResponse {
    items: IDeviceDetailResponseItem;
    type_purchase: iDeviceTypePurchase;
    auto_bill_type_of_purchase: AutoBillTypeOfPurchase;
}
// * Device Detail Response
export interface MidnightDelivery {
  status: string;
  label?: any;
}

export interface IDeviceBasicDetails {
  name: string;
  id: string;
  sku: string;
  upper_age_limit?: any;
  lower_age_limit?: any;
  price: number;
  quntity: number;
  preorder: number;
  preorder_availability_flag: number;
  midnight_delivery: MidnightDelivery;
  is_easy_phone: number;
  is_rent: boolean;
  is_own: boolean;
  default_plan: string;
  default_plan_sku: string;
  default_easyphone_plan_sku?: string;
  order_monthly_pay: string;
  nfc: string;
  mostpopular: string;
  rm: string;
  rrp_rm_strick_price: string;
  upfront_price: number;
  device_price: number;
  main_image: string;
  sub_images: string[];
  dimension: string;
  choose_memory?: any;
  weight: number;
  chip_processor: string;
  splash_water_dust_resistant: string;
  talk_time?: any;
  standby_time?: any;
  sim_type: string;
  stock: string;
  preorder_estimate_delivery_text?: any;
  new_customer: string;
  order_category: string;
  order_model: string;
  order_brand: string;
  segment: string;
  start_date: string;
  end_date: string;
  default_selected_color: string;
  default_selected_memory: string;
  pre_order_data: PreOrderData;
  is_campaign_mviva?: any;
  campaign_mviva?: any;
  campaign_mviva_invalid?: any;
  is_campaign_omni?: boolean;
  campaign_omni?: iOmniCampaign;
  is_lifestyle: number;
  addons: any[];
  stock_indicator_image: string;
  stock_indicator_text: string;
  default_device_option: string;
  promotion_badge?: IPromotionBadge;
  product_text?: string;
}

export interface Specification {
  display: string;
  screen_size: string;
  operating_system: string;
  camera: string;
}

export interface IDeviceMoreDetails {
  features: string;
  shipping_details: string;
  whatInTheBox: string;
  specification: Specification;
  neptune_subsidy_message: string;
}

export interface ITermsAndConditionEntries {
  label: string;
  desc?: string;
}

export interface TermsAndCondition {
  plans: ITermsAndConditionEntries;
  contract_terms: ITermsAndConditionEntries;
  legal: ITermsAndConditionEntries;
  cancellation: ITermsAndConditionEntries;
}

export interface CelcomUltraPlan {
  name: string;
  sku: string;
  max_line: string;
  part_number: string;
  price: string;
  subsidy: string;
  enable_plan_skus: string[];
}

export interface IDeviceSupplementaryDetails {
  name: string;
  celcom_ultra_plan: CelcomUltraPlan[];
}

export interface IDevicePrice {
  upfront_price: string;
  device_price: string;
  penalty_price: string;
  supplementary_count: number;
  supplimentary_sku: string;
  subsidy?: number;
}

export interface FreeGiftData {
  gift_image: string;
  gift_message: string;
}

export interface IDeviceAssociatedProduct {
  name: string;
  sku: string;
  is_new: boolean;
  rrp: string;
  discounted_device_rrp: number;
  color: string;
  order_color: string;
  order_category: string;
  color_hexa: string;
  memory: string;
  image: string;
  sub_images: string[];
  order_model: string;
  part_number: string;
  product_type: string;
  new_customer: string;
  segment: string;
  contract: string;
  start_date?: any;
  end_date?: any;
  upfront_installment: string;
  saleable_plans: SaleablePlan[];
  pre_order_data: any[];
  free_gift_data: FreeGiftData;
  easy_phone: any[];
  campaign_100days: boolean;
  is_neptune_subsidy: boolean;
  screen_size: string;
}

export interface TabData {
  name: string;
  sku: string;
  monthlyPlan: string;
  orderPlanBundle: string;
  orderServiceBundle: string;
  PlanMonthlyPay: number;
  OneTimePayment?: any;
  newCustomer: string;
  segment: string;
  upfrontInstallment?: any;
  contract: string;
  PlanName: string;
  plan_title: string;
  plan_subtitle: string;
  offer: string;
  selected_offer_title: string;
  data_limit: string;
  banner_image?: any;
  mobile_image?: any;
  footNote?: any;
  upper_age_limit: string;
  lower_age_limit: string;
  ngn_part_number: string;
  is_xpax: boolean;
  additional_information?: any;
  productType: string;
  startDate?: any;
  endDate?: any;
  backgroundColor: string;
  indicatorClass: string;
  productText: string;
  keyFiguresText: string;
  keyText: string;
  buyNowLink: string;
  buyNowText: string;
  knowMoreLink: string;
  knowMoreText: string;
  mobileDescription?: any;
  tableInfo: any[];
  termsAndCondition: TermsAndCondition;
  is_premium_plan: boolean;
  is_default?: string;
  bill_type: number;
  promotion_badge?: IPromotionBadge;
  promotion_text?: string;
  promotion_terms?: string;
}

export interface ChoosePlan {
  tabName: string;
  tabTitle?: any;
  tabSubtitle?: any;
  is_xpax: boolean;
  tabData: TabData[];
  is_default?: string;
  image_url?: string;
  name?: string;
  sku?: string;
  offer?: string;
  promotion_badge?: IPromotionBadge;
  promotion_text?: string;
  promotion_terms?: string;
}

export interface AnalyticsKeyAddtocart {
  fb_add_cart_id: string;
  google_add_cart_id: string;
  twitter_add_cart_id: string;
  fb_learn_more_id?: any;
  google_learn_more_id?: any;
  twitter_learn_more_id?: any;
  fb_buy_now_id?: any;
  google_buy_now_id?: any;
  twitter_buy_now_id?: any;
}

export interface IDeviceDetailResponseItem {
  basic_details?: IDeviceBasicDetails;
  more_details?: IDeviceMoreDetails;
  terms_and_condition?: TermsAndCondition;
  supplementary_details?: IDeviceSupplementaryDetails;
  associated_product?: iPlanDevice[];
  base_plan?: iBasePlan[];
  choose_plan?: ChoosePlan[];
  related_products?: iRelatedProduct[];
  combo_products?: IDeviceDetailResponse[];
  combo_type?: string;
  upsell_products?: any[];
  analytics_key_addtocart?: AnalyticsKeyAddtocart;
  notes?: string;
}

export interface iRelatedProduct {
  name: string;
  sku: string;
  campaign_url?: string;
}

export interface Dealer {
  newline: boolean;
  cobp: boolean;
  mnp: boolean;
}

export interface Enterprise {
  newline: boolean;
  cobp: boolean;
  mnp: boolean;
}

export interface TypePurchse {
  dealer: Dealer;
  enterprise: Enterprise;
}

export interface IDeviceDetailResponse extends iGeneralServerResponse {
  items?: IDeviceDetailResponseItem;
  type_purchse?: TypePurchse;
  auto_bill_type_of_purchase?: AutoBillTypeOfPurchase;
  supp_rebate_label?: string;
  device_purchase_type?: IDevicePurchaseType;
}

export interface ChooseFirstBluePlan {
  title: string;
  price: string;
}
