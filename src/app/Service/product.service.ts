import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { PlanPurchaseService } from '../Store/plan/plan-purchase/plan-purchase.service';

@Injectable()
export class ProductService {

    constructor(
        private _service: AppService,
        private _planPurchaseService: PlanPurchaseService) { }

    public Find(apiURL: string): Observable<any[]> {
        return this._service
            .get(apiURL)
            .pipe(map((response: any) => {
                return response;
            }));
    }
    public GetNewNumbers(apiURL: string, dataForRetrieveNumberAPI: any): Observable<any[]> {
        const data = dataForRetrieveNumberAPI;
        return this._service
            .postROI(apiURL, data)
            .pipe(map((response: any) => {
                if (response.NumberDetailsRetrieveResponse) {
                    return response.NumberDetailsRetrieveResponse.ListOfItemDetails[0].ItemDetails;
                } else {
                    return response;
                }
            }));
    }

    public getRandomNumber(apiURL: string, numberList: any): Observable<any> {
        const data = numberList;
        return this._service
            .postROI(apiURL, data)
            .pipe(map((response: any) => {
                return response;
            }));
    }

    public getSkuOfDevice(associatedProduct: any, selectedColor: any, selectedStorage: any) {
        let devicesku;
        associatedProduct.forEach(element => {
            const elementColor: string = element.color;
            const elementMemory: string = element.memory;
            if (elementColor === selectedColor && elementMemory === selectedStorage) {
                devicesku = element.sku;
            }
        });
        return devicesku;
    }
    public getStockStatus(stock): Object {
        if (stock && stock.status === 'Checking stock...') {
            return {
                status: 1,
                message: 'Checking stock...'
            };
        } else if (stock && stock.status === 'In Stock') {
            return {
                status: 2,
                message: 'In Stock'
            };
        } else if (stock && stock.status === 'Out of Stock') {
            return {
                status: 3,
                message: 'Out of Stock. Try another colour or storage'
            };
        } else {
            return {
                status: 0,
                message: ''
            };
        }
    }
    public getStockAvailabilityRequest(selectedProductDetails, outletId, deviceReservationId): Object {
        return {
            "stockReserveQuantityInput": {
                "storeId": outletId,
                "reservationId": deviceReservationId,
                "listOfItemDetailRequest": {
                    "itemDetailRequest": [{
                        "ProductType": "HP",
                        "PartNum": (selectedProductDetails.orderReqPartNumber !== null) ? selectedProductDetails.orderReqPartNumber : 0,
                        "Quantity": "1",
                        "listOfAttributes": [{
                            "attributes": [
                                {
                                    "Name": "BRAND",
                                    "Value": (selectedProductDetails.orderReqBrand !== null) ?
                                    selectedProductDetails.orderReqBrand.toUpperCase() : null,
                                },
                                {
                                    "Name": "MODEL",
                                    "Value": (selectedProductDetails.orderReqModel !== null) ?
                                    selectedProductDetails.orderReqModel.toUpperCase() : null,
                                },
                                {
                                    "Name": "COLOR",
                                    "Value": (selectedProductDetails.orderReqColor !== null) ?
                                    selectedProductDetails.orderReqColor.toUpperCase() : null,
                                },
                                {
                                    "Name": "CATEGORY",
                                    "Value": (selectedProductDetails.orderReqCategory !== null) ?
                                    selectedProductDetails.orderReqCategory.toUpperCase() : null,
                                },
                                {
                                    "Name": "PRODUCT",
                                    "Value": "DEVICE"
                                }
                            ]
                        }]
                    }
                    ]
                }
            }
        };
    }

public  OnCOntinueSwitchingTab() {
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
    this._planPurchaseService.ReInitializeChooseNumberComponent();
    localStorage.removeItem("PrincipleNumberSelected");
    localStorage.removeItem('Principal_Number');
    localStorage.removeItem("COBP_FLOW");
    localStorage.removeItem("MNP-FLOW");
}
}
