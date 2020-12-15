import { iGeneralServerResponse } from './general.model';

export interface iMobileNumber {
    number: string;
}

export interface iNewNumber extends iGeneralServerResponse{
    mobile_numbers?: iMobileNumber[];
}

export interface iData {
    numberService: string;
    sourceSystem: string;
    numRecords: string;
    planType: string;
    numberCategory: string;
    numberPattern?: string;
    criteria?: string;
}

export interface iRetrieveNumberData {
    data: iData;
}

export interface IReserveNumberResponse {
  message: string;
  status: boolean;
  number: string;
  reservation_id: string;
}
