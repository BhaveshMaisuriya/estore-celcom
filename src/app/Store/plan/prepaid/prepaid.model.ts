import { iPlan } from '../../../shared/models/plan.model';
import {IPromotionBadge} from "../../../pages/new-landing-page/store/shop-device.model";

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
    status: boolean;
    hat_text?: any;
    message?: any;
    allowed_types: any[];
    not_allowed_types: string[];
    eligible_message: string;
    not_eligible_message: string;
}

export interface Dealer {
    newline: boolean;
    cobp: boolean;
    mnp: boolean;
}

export interface TypePurchse {
    dealer: Dealer;
}

export interface AutoBillTypeOfPurchase {
    NL: string;
    COBP: string;
    MNP: string;
}

export interface iPrepaidPlan {
    tabName: string;
    tabTitle?: any;
    tabSubtitle?: any;
    tabData: iPlan;
    type_purchse: TypePurchse;
    auto_bill_type_of_purchase: AutoBillTypeOfPurchase;
    passport?: boolean;
    promotion_badge?: IPromotionBadge;
    promotion_text?: string;
}

/**
 * prepaid campaign - dynamic sim
 */
export interface iInternetPass {
    category_tabs: iCategoryTab[];
    items: iPrepaidPass[];
}

export interface iCreditReload {
    name: string;
    sku: string;
    is_default: string;
    price: string;
    validity: string;
}

export interface iPrepaidPack {
    name: string;
    sku: string;
    is_default: string;
    key_text: string;
    price: string;
    offer: string;
}

export interface iCategoryTab {
    name: string;
}
export interface iPrepaidPass {
    name?: string;
    sku?: string;
    is_default?: string;
    price?: string;
    key_text?: string;
    offer?: string;
    category_tab?: string;
    promotion_badge?: iPromoBadge;
}

export interface iPromoBadge {
    promotion_badge_background_color: string;
    promotion_badge_text: string;
    promotion_badge_text_color: string;
}

export interface iAdditionalPayload {
    material_code: string;
}