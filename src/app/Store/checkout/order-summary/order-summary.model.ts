export interface IO2oDealerCustomerData {
  value: string;
  editing: boolean;
  prePayment: boolean;
  error:
    | {
        title: string;
        content: string;
        button: string;
      }
    | undefined;
}

export interface IPaymentOptions {
  prePayment?: boolean;
}

export interface IDeliveryMethod {
  name: string;
  code: string;
  value: number;
  label?: string;
}

export interface IDeliveryAddress {
  name: string;
  value: string;
}

export interface IComboDeviceDetails {
  orderDevice: string;
  orderDeviceName: string;
  orderDevicePrice: string;
  selectedProductSku: string;
  orderSummaryColor: string;
  orderSummaryStorage: string;
  orderReqServiceBundle: string;
  orderTotalPay: number;
  total: number;
  contract: string;
  orderReqBrand: string;
  orderReqCategory: string;
  orderReqColor: string;
  orderReqModel: string;
  orderReqPartNumber: string;
  selectedImageList: string[];
  free_gift_data: IFreeGiftData;
}

export interface IFreeGiftData {
  gift_image: string;
  gift_message: null;
}