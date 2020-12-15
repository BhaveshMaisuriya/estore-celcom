export interface IHeaderCustomerProfile {
  errorMessage: string;
  errorCode: string;
  status: string;
}

export interface IService {
  serviceType: string;
  smeGroupId: string;
  planSegmentType: string;
  pakejFlag: string;
  mobileNumber: string;
  assetBillingAccountNo: string;
  billingProfileId: string;
  principleMobileNumber: string;
  assetBillingAccountRowId: string;
  promotionId: string;
  pre_Pos_Indicator: string;
  prodPromName: string;
  billingType: string;
  hh_consumed_flag: string;
  prin_Sup_Indicator: string;
  prodPromPartNum: string;
  plan: string;
  productType: string;
  assetSubStatus: string;
  product: string;
  creditTreatmentCode: string;
  billType: string;
  assetModel: string;
  SVC_LVL_DVC_COUNT: string;
  segmentCode: string;
  assetIntegrationID: string;
  partialControlFlag: string;
  masterAccountNumber: string;
  billingAccountStatus: string;
  assetID: string;
  assetImei: string;
  kenanAccountID: string;
  kenanName: string;
  vipCode: string;
  assetStatus: string;
  billCycle: string;
}

export interface IBlacklist {
  status: boolean;
  system: 'External' | 'Internal';
  message: string;
}

export interface IOutputCPResp {
  country: string;
  planSegmentType: string;
  unitNo: string;
  segmentGroup: string;
  postalCode: string;
  contactFirstName: string;
  section: string;
  contactType: string;
  type: string;
  poBox: string;
  contactHomePhone: string;
  state: string;
  streetType: string;
  contactMobileNum: string;
  motherMaidenName: string;
  gstTaxRelief: string;
  XPAX_DB_FLG: string;
  buildingName: string;
  XPAX_OPEN_FLG: string;
  nationality: string;
  preferredContactMethod: string;
  customerIDType: string;
  preferredContactLang: string;
  customerID: string;
  name: string;
  contactPreferredTime: string;
  segmentSubGroup: string;
  floorNo: string;
  contactLastName: string;
  salutation: string;
  headerCustomerProfile: IHeaderCustomerProfile;
  PREPAIDOPENORD_FLG: string;
  gender: string;
  city: string;
  contactAlternateNum: string;
  contactRowID: string;
  facebookID: string;
  pakejOpenCount: string;
  googlePlusID: string;
  YOUTH_ACTIVE_COUNT: string;
  gstTaxReliefID: string;
  DB_OPEN_COUNT: string;
  billingType: string;
  customerRowId: string;
  contactBusinessPhone: string;
  addressYType: string;
  PREPAID_LINES_COUNT: string;
  race: string;
  contactEmail: string;
  dateOfBirth: string;
  services: IService[];
  twitterID: string;
  customerSince: string;
  pakejActiveCount: string;
  DB_COUNT: string;
  masterAccountNumber: string;
  billingAccountStatus: string;
  streetAddress: string;
  contactSalutation: string;
  YOUTH_OPEN_COUNT: string;
  blacklist: IBlacklist;
  simType: string;
  esimInfo: string;
}

export interface IMobileConnectUser {
  outputCPResp: IOutputCPResp;
}

export interface IBlacklistChkRequestGuest {
  customerIDType: string;
  customerIDNo: string;
  customerIDTypeValue: string;
}

export interface IServiceGuest {
  pre_Pos_Indicator: string;
  serviceType?: string;
  smeGroupId?: string;
  planSegmentType?: string;
  pakejFlag?: string;
  mobileNumber?: string;
  assetBillingAccountNo?: string;
  billingProfileId?: string;
  principleMobileNumber?: string;
  assetBillingAccountRowId?: string;
  promotionId?: string;
  prodPromName?: string;
  billingType?: string;
  hh_consumed_flag?: string;
  prin_Sup_Indicator?: string;
  prodPromPartNum?: string;
  plan?: string;
  productType?: string;
  assetSubStatus?: string;
  product?: string;
  creditTreatmentCode?: string;
  billType?: string;
  assetModel?: string;
  SVC_LVL_DVC_COUNT?: string;
  segmentCode?: string;
  assetIntegrationID?: string;
  partialControlFlag?: string;
  masterAccountNumber?: string;
  billingAccountStatus?: string;
  assetID?: string;
  assetImei?: string;
  kenanAccountID?: string;
  kenanName?: string;
  vipCode?: string;
  assetStatus?: string;
  billCycle?: string;
}

export interface IOutputCPRespGuest {
  customerID: string;
  dateOfBirth: string;
  preferredContactMethod: string;
  contactPreferredTime: string;
  contactEmail: string;
  contactSalutation: string;
  contactFirstName?: string;
  services: IServiceGuest[];

  country?: string;
  planSegmentType?: string;
  unitNo?: string;
  segmentGroup?: string;
  postalCode?: string;
  section?: string;
  contactType?: string;
  type?: string;
  poBox?: string;
  contactHomePhone?: string;
  state?: string;
  streetType?: string;
  contactMobileNum?: string;
  motherMaidenName?: string;
  gstTaxRelief?: string;
  XPAX_DB_FLG?: string;
  buildingName?: string;
  XPAX_OPEN_FLG?: string;
  nationality?: string;
  customerIDType?: string;
  preferredContactLang?: string;
  name?: string;
  segmentSubGroup?: string;
  floorNo?: string;
  contactLastName?: string;
  salutation?: string;
  PREPAIDOPENORD_FLG?: string;
  gender?: string;
  city?: string;
  contactAlternateNum?: string;
  contactRowID?: string;
  facebookID?: string;
  pakejOpenCount?: string;
  googlePlusID?: string;
  YOUTH_ACTIVE_COUNT?: string;
  gstTaxReliefID?: string;
  DB_OPEN_COUNT?: string;
  billingType?: string;
  customerRowId?: string;
  contactBusinessPhone?: string;
  addressYType?: string;
  PREPAID_LINES_COUNT?: string;
  race?: string;
  twitterID?: string;
  customerSince?: string;
  pakejActiveCount?: string;
  DB_COUNT?: string;
  masterAccountNumber?: string;
  billingAccountStatus?: string;
  streetAddress?: string;
  YOUTH_OPEN_COUNT?: string;
  simType?: string;
  esimInfo?: string;
}

export interface IGuestUser {
  blacklistChkRequest: IBlacklistChkRequestGuest;
  outputCPResp: IOutputCPRespGuest;
}

/**
 * PersonalForm data as stored in session storage
 */
export type TPersonalForm =
  | { type: 'user', data: IMobileConnectUser }
  | { type: 'guest', data: IGuestUser }
  | null ;

export interface ILoginResponse {
  status: boolean;
  mobile_connect_user: boolean;
  token: string;
  new_guest: boolean;
  blacklisted: boolean;
  date_of_birth: string;
  user_prepaid_lines: number;
  user_postpaid_lines: number;
  allowed_prepaid_lines: string;
  allowed_postpaid_lines: string;
  preferred_contact_method: string;
  preferred_contact_time: string;
  email: string;
  contact_salutation: string;
  message: string;
  nric: string;
  authtoken: string;
  user_token?: string;
}

export interface IVerifyCustomerResponse {
  status: boolean;
  exception: boolean;
  message: string;
  sim_type: string;
  is_nric_verified: boolean;
}