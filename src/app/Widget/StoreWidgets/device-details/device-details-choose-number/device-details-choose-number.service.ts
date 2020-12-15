import { Injectable, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { RequestOptions, Headers } from '@angular/http';
import { BaseService } from '../../../../base.service';
import { AppService } from '../../../../Service/app.service';
import { DeviceDataService } from "../../../../Service/devicedata.service";
import { TypeofPurchaseService } from '../../../../Service/type-of-purchase.service';

@Injectable()
export class DeviceDetailsNumberService extends BaseService {

    constructor(
        private _service: AppService, 
        private _deviceDataService: DeviceDataService,
        @Inject(forwardRef(() => TypeofPurchaseService)) private topService: TypeofPurchaseService,
    ) {
        super();
    }
    getPager(totalItems: number, currentPage: number = 1, pageSize: number = 8) {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        let startPage: number, endPage: number;
        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 1) {
                startPage = 1;
                endPage = 3;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 2;
                endPage = totalPages;
            } else {
                startPage = currentPage - 1;
                endPage = currentPage + 1;
            }
        }
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        const pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }

    public AutoBillingCheck({ sku = "", typeOfPurchase = "", actionType = 0, msisdn = "" }) {
        const uri = `/rest/V1/autobillcheck?sku=${sku}&typeOfPurchase=${typeOfPurchase}&actionType=${actionType}&msisdn=${msisdn}`
        return this._service
            .getEstoreUserData(uri)
            .pipe(
                tap((resp) => {
                    this.topService.updateAutobilling(resp);
                }),
                map((response: any) => {
                    return response;
                })
            );
    }
}
