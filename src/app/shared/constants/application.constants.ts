// Compare Product Constants
export const MAX_PRODUCT_TO_COMPARE_DESKTOP = 3;
export const MAX_PRODUCT_TO_COMPARE_MOBILE = 2;
// GST

export const GST_IN_PERCENTAGE = 0.00; // Ex : 0.06
export const COOKIE_EXPIRE = 30; // In Days.
export const ADA_COOKIE_EXPIRE = 7; // In Days.

export const TYPE_OF_PURCHASE = {
    NEW_LINE: "NL",
    CHANGE_OF_BUSSINESS_PLAN: "COBP",
    MOBILE_NUMBER_PORTABILITY: "MNP"
}

export const AUTO_BILLING = {
    MANDATODRY: 2,
    OPTIONAL: 1,
    NO: 0
}

export const emailRegex = "^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\\.([a-zA-Z]{2,5})$";

export const ACTION_TYPE = {
    POSTPAID_NEW_REG: 1, // plan new line
    POSTPAID_NEW_REG_SUPP: 2, // plan new line with supp
    PREPAID_NEW_REG: 3,
    POSTPAID_MNP: 4, // plan mnp
    POSTPAID_MNP_SUPP: 5,
    PREPAID_MNP: 6,
    POSTPAID_COBP: 7, // plan cobp
    POSTPAID_COBP_SUPP: 8,
    POSTPAID_SUPP_COBP: 9,
    PREPAID_COBP: 10,
    DEVICE_ONLY: 11, // device only
    PRE_ORDER_NEW_REG: 12, // preorder device new line
    PRE_ORDER_NEW_SUPP: 13,  // preorder device new line with supp
    PRE_ORDER_COBP: 14, // preorder device cobp
    PRE_ORDER_COBP_SUPP: 15,
    PRE_ORDER_MNP: 16,
    PRE_ORDER_MNP_SUPP: 17,
    BUNDLE_NEW_REG: 18, // device bundle new line
    BUNDLE_NEW_REG_SUPP: 19, // device bundle new line with supp
    BUNDLE_COBP: 20, // device bundle cobp
    BUNDLE_COBP_SUPP: 21,
    BUNDLE_MNP: 22,
    BUNDLE_MNP_SUPP: 23,
    PRE_ORDER_COBP_PREP: 24,
    PRE_ORDER_COBP_EASY_RENT_OWN: 25, // preorder easyphone
    COBP_EASY_PHONE_RENT_OWN: 26, // easyphone cobp
    BUNDLE_COBP_PREP: 27,
    BROADBAND_BUNDLE_NEW_REG: 28, // home wireless
    ESIM_REPLACEMENT: 29,
}