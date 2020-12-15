import { EntityState } from '@datorama/akita';

export type TBannerCategory =
  | 'top_right'
  | 'top_left'
  | 'shop_plans'
  | 'featured';

export interface IShopBannerItem {
  is_newtab?: '0' | '1';
  headline: string;
  headline_text_size: string;
  headline_text_color: string;
  description: string;
  description_text_size: string;
  description_background_color: string;
  description_text_color: string;
  image_url: string;
  image_url_webp: string;
  banner_background_color: string;
  button_text: string;
  button_url: string;
  button_bgcolor: string;
  button_text_color: string;
  promo_code_text: string;
  promo_code_text_size: string;
  promo_code_text_color: string;
  promo_code_background_color: string;
  position: string;
  banner_category: TBannerCategory;
  banner_html: string;
  image_mobile_url: string;
  image_mobile_url_webp: string;
}

export interface IShopBannerResponse {
  status: boolean;
  response: IShopBannerItem[];
  duration: string;
}

export interface IShopBannerState extends EntityState<IShopBannerItem> {
}
