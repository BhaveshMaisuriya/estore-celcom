import { HttpErrorResponse, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable, ErrorHandler, Inject, forwardRef, PLATFORM_ID } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { AnalyticsService } from '../Service/analytic.service';
import { isPlatformBrowser } from '@angular/common';
@Injectable({
    providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {
    public captureAllErrors = [];
     // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(     
        @Inject(forwardRef(() => AnalyticsService)) private _analyticsService: AnalyticsService,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) { }
    errorObjectConvert(errorValue) {
        try {
            const err = new Error(errorValue);
            this.handleError(err);
        } catch(_error) {}     
    }
    handleError(error: Error | HttpErrorResponse) {
        try {
            this._analyticsService.transactErrormessage = error.message;
            (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
        } catch (_error) { }
        /**
         * This will only print error on browser
         * Not printing Reference error on server because of legacy codes
         * 
         * Need to show error in the future if we are fully implementing SSR
         */
        if (isPlatformBrowser(this.platformId)) {
            console.error(error);
        } else {
            if (!error.message?.includes('is not defined'))
                console.error(error);
        }
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((resp: HttpResponse<any>) => {
                if (resp.body && resp.body['status'] === false) {
                    this.errorObjectConvert(resp.body['message']);                    
                }
                if (resp.body && resp.body[0] && resp.body[0]['status'] === false) {
                    this.errorObjectConvert(resp.body[0]['message']);
                }
            }),
            catchError((error: HttpErrorResponse) => {
                this.handleError(error);
                return throwError(error);
            })
        );    
    }
}