// menu api details

export const CONTENT_DETAILS_BASE = `/api/content_details?_format=hal_json`;
export const CONTENT_DETAILS_API_BASE = `api/content_details?_format=hal_json`;
export const MENU_API_URL = `${CONTENT_DETAILS_BASE}&type=custom&name=menu_details&id=`;

// list of menu ids

export const HEADER_API_ID = `global-navigation`;
export const FOOTER_API_ID = `footer`;
export const FOOTER_ICONS_API_ID = `footer-icons`;

// alias url

export const ALIAS_API_URL = `${CONTENT_DETAILS_BASE}&type=custom&name=uri_alias`;

// breadcrum

export const BREADCRUM_API_URL = `${CONTENT_DETAILS_BASE}&type=custom&name=breadcrumb&id=`;

export const BANNER_URL = `${CONTENT_DETAILS_API_BASE}&type=views&name=banner_api&api=heroBannerImgClickable&id=50`;

export const BANNER_NAME = 'heroBanner_img_clickable';

export const IMAGE_CARD_OVERLAY = `${CONTENT_DETAILS_BASE}&type=views&name=callout_api&
api=imageCardOverlayWithoutTab&id=870+871+872+873+874+875+876`;

export const ICON_NAME = 'iconLayout';

export const ICON_URL = `${CONTENT_DETAILS_API_BASE}&type=views&name=banner_api&api=iconLayout&id=159`;

export const BANNER_404_NAME = 'heroBanner_carousel';

export const BANNER_404_URL = `${CONTENT_DETAILS_API_BASE}&type=views&name=banner_api&api=heroBanner&id=404`;

export const PAGE_NOT_FOUND_URL = `${CONTENT_DETAILS_API_BASE}&&type=views&name=banner_api&api=detailBanner&id=594`;

export const PRODUCT_BANNER_MEGA_URL = `${CONTENT_DETAILS_API_BASE}&type=views&name=banner_api&api=ProductBannerMega&id=239`;
