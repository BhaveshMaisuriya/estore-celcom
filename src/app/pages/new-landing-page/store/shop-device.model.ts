import { EntityState } from '@datorama/akita';
import { queryEntries as QE } from 'app/shared/constants/new-landing-page.constants';
import { ActivatedRoute } from '@angular/router';

export interface IShopDevicesTab {
  key: string;
  name: string;
  priority: string | number;
  tabKey?: string[];
  featurekey?: string;
}

interface IPreOrderData {
  is_preorder: string;
  preorder_text: string;
  preorder_from_date_text: string;
  preorder_to_date_text: string;
  preorder_from_date: string;
  preorder_to_date: string;
  preorder_end_flag: number;
}

export interface IPromotionBadge {
  promotion_badge_text: string;
  promotion_badge_text_color: string;
  promotion_badge_background_color: string;
}

interface IDiscountPromotionData {
  discount_price_label: string;
  promotion_label: string;
}

export interface IDevice {
  id: string;
  name: string;
  sku: string;
  plan_tab: string;
  categories: IShopDevicesTab[];
  operating_system: string;
  brand: string;
  mostpopular: string;
  price: number;
  bundle_price: number;
  base_plan: string;
  base_plan_title: string;
  default_plan: string;
  plan_min_price: string;
  device_min_price: string | number;
  image: string;
  /**
   * if null -> Rule 1;
   * else -> Rule 3
   */
  full_width_banner:
    | {
    image: string;
    text_color: string;
  }
    | null;
  sub_images: string[];
  pre_order_data: IPreOrderData;
  discount_promotion_data: IDiscountPromotionData;
  is_lifestyle: number;
  lifestyle_hat_text1: string;
  lifestyle_hat_text2: string;
  is_easy_phone: boolean;
  is_rent: boolean;
  price_start_from: any;
  is_premium_plan: boolean;
  visibility: boolean;
  promotion_badge: IPromotionBadge[] | null;
  default_plan_sku: string;
  device_combo_data?: IDeviceComboItems;
}

export interface IMeta {
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}

export interface IDeviceComboItems {
  items?: IDeviceComboDetail[] | null;
}

export interface IDeviceComboDetail {
  image?: string;
  name?: string;
  sku?: string;
  is_default?: boolean;
  price?: any;
}

export interface DevicesState extends EntityState<IDevice> {
  featureTabs: IShopDevicesTab[];
  selectedFeatureTab: string;
  brands: IShopDevicesTab[];
  plans: IShopDevicesTab[];
  selectedBrand: string;
  selectedPlan: string;
  currentPage: number;
  filteredDevices: IDevice[];
  filteredPlans: IShopDevicesTab[];
  filteredBrands: IShopDevicesTab[];
}

export interface IShopDevicesResponse {
  featureTabs: IShopDevicesTab[];
  tabs: IShopDevicesTab[];
  plans: IShopDevicesTab[];
  items: IDevice[];
  meta: IMeta[];
}
export type TGetFilteredBrands = (selectedFeatureTab: string, allTabs: IShopDevicesTab[]) => IShopDevicesTab[];

export type TGetFilteredDevices =
  ( selectedBrand: string, selectedPlan: string, allDevices: IDevice[]) => IDevice[];

export type TSetDefaultTab =
  (featureTabs: IShopDevicesTab[], brands: IShopDevicesTab[], plans: IShopDevicesTab[], route: ActivatedRoute) =>
    { selectedFeatureTab: string, selectedBrand: string; selectedPlan: string };
  
export type TSetResponseData =
  (response: IShopDevicesResponse, route: ActivatedRoute) => void;

export type TUpdateTab = (params: typeof QE) => void;

export type TGetFilteredPlans =
  (selectedBrand: string, allPlans: IShopDevicesTab[]) => IShopDevicesTab[];
  