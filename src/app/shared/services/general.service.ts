import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from 'app/Service/app.service';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { iGeneralServerResponse } from 'app/shared/models/general.model';
import { SYS_DOWN_MSG } from 'app/shared/constants/error.constants';
import { ITNPSSurveyItem } from '../components/tnps-popup/tnps-popup.component';

@Injectable({
    providedIn: 'root'
})
export class GeneralPurposeService {
    domain = HOST;

    constructor(
        private http: HttpClient,
    ) { }

    public getTNPSSettings(params = null): Observable<ITNPSSurveyItem[]> {
        const uri = `rest/V1/questionRetrive`
        return this.http.get<ITNPSSurveyItem[]>(
            `${this.domain}/${uri}`,
            { params }
        ).pipe(
            map(response => <any>response[0]),
            catchError(this.handleError)
        );
    }

    public postTNPSData(data): Observable<iGeneralServerResponse> {
        const endpoint = "rest/V1/questionSubmit";

        return this.http.post<iGeneralServerResponse[]>(
            `${this.domain}/${endpoint}`,
            { ...data }
        )
            .pipe(
                map(response => response[0]),
                catchError(this.handleError)
            );
    }

    public getNewNumbers(apiURL: string, dataForRetrieveNumberAPI: any): Observable<any[]> {
        const data = dataForRetrieveNumberAPI;
        return this.http.post<any[]>(`${this.domain}${apiURL}`, data)
            .pipe(
                map((response: any) => {
                if (response.NumberDetailsRetrieveResponse) {
                    return response.NumberDetailsRetrieveResponse.ListOfItemDetails[0].ItemDetails;
                }
                return response;
            }));
    }

    getNumberPager(totalItems: number, currentPage: number = 1, pageSize: number = 8) {
        const totalPages = Math.ceil(totalItems / pageSize);
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        let startPage: number, endPage: number;
        
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

        if (totalPages <= 3) {
            startPage = 1;
            endPage = totalPages;
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

    handleError(_err) {
        let message = _err?.error?.message || _err?.error?.error || SYS_DOWN_MSG;
        // if (_err?.status === 401) {
        //     message = 'Session expired'
        // }
        const error = {
            message,
            status: false,
            error: _err,
        };
        return of(error);
    }
}
