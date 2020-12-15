import { iBasePlan } from 'app/Service/devicedata.service';
import { iPass, iPlan } from 'app/shared/models/plan.model';
import { iPlanDevice } from 'app/shared/models/device.model';

export interface iGeneralServerResponse {
    status: boolean;
    response?: string;
    message?: string;
    validated_id?: string;
}

export interface iNumberReservationRequestData {
    partNumber?: string;
    sku?: string;
}

export interface iNumberReservationRequest {
    mobile_number: string[];
    reservationId: string;
    data: iNumberReservationRequestData;
}

export interface iNumberReservationResponse {

    // Example of failed response
    // [{
    //     "msisdns": {
    //         "0136302173": {
    //             "status": false,
    //             "message": "MSISDN with status RESERVED is not available for reservation."
    //         }
    //     },
    //     "status": false,
    //     "message": "Sorry, the number you have selected is no longer available. Please select other numbers.",
    //     "reservationId": "OP92CE1592362630"
    // }]

    msisdns: object;
    status: boolean;
    message: string;
    reservationId: string;
}

export interface iSupplementaryData {
    partNumber: string;
    number: string;
}

export class BasicAddtocartData implements addTocartBundle.iBasicAddtocartData {
    bundle_product_sku: string = "";
    selected_plan_product_sku: string = "";
    selected_pass_product_sku: string = "";
    sub_pass_sku: string = "";
    selected_device_product_sku?: any = "";
    selected_device_product_up_fornt_price: number = 0;
    selected_device_product_device_price: string = "0.00";
    bundle_product_qty: string = "1";
    bundle_product_price: string = "0";
    user: string;
    easyphone_type: string;
    is_easyphone: boolean;
    contract_period: string;

    constructor(){
        this.bundle_product_qty = "1";
        this.user = "user";
    }

    updateAttributes(
        bundle_sku: string,
        base_plan: iBasePlan,
        pass_plan: iPass,
        plan: iPlan,
        device: iPlanDevice){
        this.bundle_product_sku = bundle_sku;
        this.selected_plan_product_sku = base_plan?.sku;
        this.selected_pass_product_sku = pass_plan?.sku;
        this.sub_pass_sku = plan?.sku;
        this.selected_device_product_sku = device?.sku;
    }
}

export class NewLineAddtocartData extends BasicAddtocartData implements addTocartBundle.Data {
    selected_number: string = "";
    selected_number_type: string = "NewNumber";
    temporary_number: string = null;
    is_mnp: boolean = false;
    is_cobp: boolean = false;
    is_preorder: boolean = false;
    is_affiliate_ia: boolean = false;
    is_affiliate_ada: boolean = false;
    add_on_ids?: any = null;
    reservationId: string = "";
    is_campaign_mviva: boolean = false;
    campaign_mviva_url: string = "";
    is_golden_number: boolean = false;
    is_star_internet_share: boolean = false;

    constructor(selected_number: string, reservationId: string) {
        super();
        this.selected_number = selected_number;
        this.reservationId = reservationId;
    }

}

export class COBPAddtocartData extends NewLineAddtocartData {
    selected_number_type: string = "KeepNumber";
    is_cobp = true;
}

export class MNPAddtocartData extends NewLineAddtocartData {
    selected_number_type: string = "SwitchToCelcom";
    is_mnp = true;
    validated_id = '';

    constructor(selected_number: string, reservationId: string, temporary_number, validated_id) {
        super(selected_number, reservationId);
        this.selected_number = selected_number;
        this.reservationId = reservationId;
        this.temporary_number = temporary_number;
        this.validated_id = validated_id;
    }
}

export declare module addTocartBundle {

    export interface iBasicAddtocartData {
        /**
         * sku got from API response
         */
        bundle_product_sku: string;

        /**
         * Base plan
         */
        selected_plan_product_sku: string;

        /**
         * Pass
         */
        selected_pass_product_sku: string;

        /**
         * Plan
         */
        sub_pass_sku: string;

        /**
         * Device
         */
        selected_device_product_sku?: any;
        selected_device_product_up_fornt_price: number;
        selected_device_product_device_price: string;
        bundle_product_qty: string;
        bundle_product_price: string;
        user: string;
    }

    export interface Data extends iBasicAddtocartData {
        selected_number: string;
        selected_number_type: string;
        temporary_number: string;
        is_mnp: boolean;
        is_cobp: boolean;
        is_preorder: boolean;
        is_affiliate_ia: boolean;
        is_affiliate_ada: boolean;
        add_on_ids?: any;
        reservationId: string;
        is_campaign_mviva: boolean;
        campaign_mviva_url: string;
        is_golden_number: boolean;
        is_star_internet_share: boolean;
        is_campaign_omni?: boolean;
        selected_combo_supp_number?: string;
    }

    export interface SuppData {
        number: string;
        plan: string;
        subsidy: string;
    }

    export interface Attribute {
        Name: string;
        Value: string;
    }

    export interface ListOfAttribute {
        attributes: Attribute[];
    }

    export interface ItemDetailRequest {
        ProductType: string;
        PartNum: string | number;
        Quantity: string;
        listOfAttributes: ListOfAttribute[];
    }

    export interface ListOfItemDetailRequest {
        itemDetailRequest: ItemDetailRequest[];
    }

    export interface StockReserveQuantityInput2 {
        storeId: string;
        reservationId: string;
        listOfItemDetailRequest: ListOfItemDetailRequest;
    }

    export interface StockReserveQuantityInput {
        stockReserveQuantityInput: StockReserveQuantityInput2;
    }

    export interface RootObject {
        data: Data;
        supp_data?: SuppData[];
        stockReserveQuantityInput: StockReserveQuantityInput;
    }

    interface IFamilyLineAddtoCartData extends Data {
        validated_id: string;
    }

    export interface IFamilyLineAddToCart {
        data: IFamilyLineAddtoCartData;
        customerId: string;
        supp_data: SuppData[];
    }

    interface IFirstBlueAddtoCartData extends Data {
      validated_id: string;
    }

    export interface IFirstBlueAddToCart {
        data: IFirstBlueAddtoCartData;
        customerId: string;
        supp_data: SuppData[];
    }
}

export declare module addTocartLegacy {

    /**
     * Example req
     * {
            "data": {
                "Sku": "P98",
                "PlanName": "Sime Darby RM40 at 20GB",
                "TotalPay": 0,
                "selected_number": "0136378799",
                "user": "user",
                "is_cobp": false,
                "mnp_id": null,
                "is_mnp": false,
                "is_affiliate_ada": false,
                "is_affiliate_ia": false,
                "reservationId": "OP67CE1597373892",
                "selected_number_type": "NewNumber",
                "add_on_ids": null,
                "is_campaign_mviva": false,
                "campaign_mviva_url": "",
                "is_golden_number": false,
                "is_star_internet_share": false,
                "is_campaign_omni": false
            },
            "supp_data": []
        }
     */
    interface RootObject {
        data: Data;
        supp_data?: addTocartBundle.SuppData[];
    }
    
    interface Data {
        Sku?: string;
        PlanName?: string;
        TotalPay?: number;
        selected_number?: string;
        user?: string;
        is_cobp?: boolean;
        mnp_id?: any;
        is_mnp?: boolean;
        is_affiliate_ada?: boolean;
        is_affiliate_ia?: boolean;
        reservationId?: string;
        selected_number_type?: string;
        add_on_ids?: any;
        is_campaign_mviva?: boolean;
        campaign_mviva_url?: string;
        is_golden_number?: boolean;
        is_star_internet_share?: boolean;
        is_campaign_omni?: boolean;
    }
}