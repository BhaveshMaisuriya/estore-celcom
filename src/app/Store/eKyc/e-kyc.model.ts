import { ILoginResponse } from 'app/shared/models/user.model';

export interface IDPayload {
  journeyId: string | null;
  imageFormat: string;
  base64ImageString: string;
  id_number: string;
  id_type: string;
}

export interface SelfiePayload {
  journeyId: string;
  idCard: string;
  selfie: string;
  id_number: string;
  id_type: string;
}

export interface ICustomerData {
  Salutation?: string;
  idType: string;
  idNumber: string;
  sex: string;
  state: string;
  postCode: string;
  city: string;
  addressLine1: string;
  addressLine2: string;
  unitNo: string;
  fullName: string;
  country: string;
  idPhoto: string;
  selfiePhoto: string;
}

export interface IEKycDataResponse {
  status: boolean;
  message: string;
  ekycStatus: "Not Valid" | "Valid";
  ekycEndDate:	string;
  customer_data: ICustomerData;
}

export interface IEKycSessionStorageData extends ICustomerData {
  idType: string;
  defaultEmail: string;
}

export interface IEKycStatusResponse {
  createdAt: string;
  verified: boolean;
  data: IEKycData;
  session: string;
}

export interface IdDetailsInterface {
    idType: string;
    idNumber: string;
}

interface IEKycData {
  usertoken: string;
  redirectTo: string;
  idDetails: IdDetailsInterface;
}

export interface IEkycIdResponse {
  status: boolean;
  message: string;
  journeyId: string;
  customer_data: IEkycCustomerdata;
  idPhoto: string;
  faceImages: string;
}

export interface IEkycCustomerdata {
  idName: string;
  idNumber: string;
  sex: string;
  fullAddress: string;
  state: string;
  postCode: string;
  city: string;
  addressLine2: string;
  addressLine1: string;
  unitNo: string;
  fullName: string;
  firstName: string;
  lastName: string;
  country: string;
  idType?: string;
  idPhoto?: string;
  selfiePhoto?: string;
  countryCode?: string;
  expiryDate?: string;
  dob?: string;
  placeOfBirth?: string;
}

export interface IMNPPrepaidData {
    idType: string;
    idNumber: string;
    loginResponse?: ILoginResponse;
    phone?: string;
    user?: "mc" | "guest";
    msdin?: string;
    validation_id?: string;
}

export interface ISelfieResponse {
  status: boolean;
  message?: any;
  journeyId: string;
  customer_data: Customerdata;
}

interface Customerdata {
  confidence: number;
  probability: number;
}
