import { iCOBPInstruction } from '../components/cobp-instructions/cobp-instructions.component';

export interface PenaltyCheck {
    status: boolean;
    endDate?: any;
    productPromotionPartNumber: string;
    isActiveContract: boolean;
    productPromotionId: string;
    exception: boolean;
    current_plan: string;
    eligible_contract_extend: boolean;
    device_upfront_penalty: number;
}

export interface OutputOpenOrderValidationResp {
    Error_spcMessage: string;
    OrderStatus: string;
    orderNumber: string;
    serialNumber: string;
    openOrderFlag: string;
    outletId: string;
    OrderId: string;
    Error_spcCode: string;
}

export interface OpenOrder {
    status: boolean;
    exception: boolean;
    outputOpenOrderValidationResp: OutputOpenOrderValidationResp;
    message?: any;
}

export interface BlacklistChkResponse {
    blacklistIndicator: string;
}

export interface BlackList {
    blacklistChkResponse: BlacklistChkResponse;
    blacklistIndicator: string;
    status: boolean;
    exception: boolean;
    response: string;
    message: string;
}

export interface ProductEligibility {
    status: boolean;
    message: string;
    exception: boolean;
    plan: number;
    process_type: string;
}

export interface CustomerEligibility {
    status: boolean;
    exception: boolean;
    message: string;
}

export interface GoldenNumberNote {
    status: boolean;
    message: string;
}

export interface CallBaring {
    status: boolean;
    exception: boolean;
    response: string;
    message: string;
}

export interface AccountValidation {
    status: boolean;
    message: string;
    exception: boolean;
}

export interface ContractCheck {
    status: boolean;
    message: string;
    exception: boolean;
    autopayment: string;
    customer_since: string;
}

export interface UpfrontPaymentCheck {
    status: boolean;
    message: string;
    plan: string;
    exception: boolean;
}

export interface DurationCheck {
    status: boolean;
    message: string;
    device: string;
    exception: boolean;
}

export interface PlanUpgrade {
    status: boolean;
    message: string;
    exception: boolean;
    is_same: boolean;
}

export interface Response {
    notAllowed: number;
    plan: number;
    pass: number;
    penalty: number;
    upfront: number;
    device: number;
    is_same: number;
    same_pass: number;
    same_plan_type: number;
    plan_los: number;
    device_contract: number;
    pass_contract: number;
    pass_exist: boolean;
    device_exist: boolean;
}

export interface StarEligibility {
    status: boolean;
    message: string;
    response: Response;
    change_itemtype: number;
    is_ultra: number;
    is_moon?: number;
    instructions?: iCOBPInstruction;
}

export interface COBPResponse {
    status?: boolean;
    response?: string;
    message?: string;
    penaltyCheck: PenaltyCheck;
    openOrder: OpenOrder;
    blackList: BlackList;
    productEligibility: ProductEligibility;
    customer_eligibility: CustomerEligibility;
    golden_number_note: GoldenNumberNote;
    callBaring: CallBaring;
    account_validation: AccountValidation;
    contract_check: ContractCheck;
    upfront_payment_check: UpfrontPaymentCheck;
    upfront_payment?: UpfrontPaymentCheck;
    duration_check: DurationCheck;
    plan_upgrade: PlanUpgrade;
    star_eligibility: StarEligibility;
    moon_eligibility?: StarEligibility;
    validated_id: string;
    lifestyle_eligibility: LifeStyleElgibility;
}

export interface LifeStyleElgibility {
    status: boolean;
    message: ValidateVoucherMessage;
    upfront: number;
    existing_lifestyle_contract?: boolean;
}

export interface ValidateVoucherMessage {
    title: string;
    body: string;
}