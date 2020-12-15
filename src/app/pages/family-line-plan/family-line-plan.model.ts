import { AutoBillTypeOfPurchase, iPlan, iPlanTypePurchse } from "../../shared/models/plan.model";
import { iSupplementary } from "../../shared/models/device.model";

export interface IFLAnalyticsKeyAddtocart {
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

export interface IFLTelcoDay {
  status: boolean;
  hat_text?: any;
  message?: any;
  allowed_types: string[];
  not_allowed_types: any[];
  eligible_message: string;
  not_eligible_message: string;
}

export interface IFLSupplementaryData {
  name: string;
  max_line: string;
  part_number: string;
  price: string;
}

export interface IFLTabData extends iPlan {
  family_line_notes: string;
  supplementary_data: IFLSupplementaryData[];
  analytics_key_addtocart: IFLAnalyticsKeyAddtocart;
  telco_day: IFLTelcoDay;
}

export interface IFamilyLinePlanResponse {
  tabName: string;
  tabTitle?: any;
  tabSubtitle?: any;
  tabData: IFLTabData;
  type_purchse: iPlanTypePurchse;
  auto_bill_type_of_purchase: AutoBillTypeOfPurchase;
  supp_rebate_label: string;
}

// * Eligility Check
export interface IFLECSupplyDetail {
  supplyNo: string;
  supplyName: string;
}

export interface IFLECAccountdetail {
  principle_no: string;
  plan_name: string;
  supply_count: number;
  supply_details: IFLECSupplyDetail[];
}

export interface IFLEligiblityCheckResponse {
  status: boolean;
  message: string;
  placement: string;
  validation_id: string;
  los_check_upfront_status:	boolean;
  accountdetails: IFLECAccountdetail[];
  device_combo_subsidy: boolean;
}

export interface IFLPFlags {
  step: number;
  loading: boolean;
  loggedIn: boolean;
  otpRequested: boolean;
  otpExpired: boolean;
  resendLinkDisabled: boolean;
  isEligible: boolean;
  maxLimitReached: boolean;
}

export interface IFLPData  {
  totalPayment: number;
  state: any; // TODO add type
  accountDetails: null | IFLECAccountdetail;
  validation_id: string | null;
  supplementaryLines: iSupplementary[];
  basePlan: IFLTabData | null;
  losCheckUpfrontStatus: boolean | null;
}
