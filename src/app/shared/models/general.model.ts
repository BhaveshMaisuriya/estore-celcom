export interface iGeneralServerResponse {
    status?: boolean;
    response?: string;
    message?: string;
    statusNumber?: number;
}
export interface ICardOptions {
    label: string;
    value: string;
    image?: string;
}