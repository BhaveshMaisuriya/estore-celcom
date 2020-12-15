import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpMockRequestInterceptor } from "./http-mock.interceptor.service";
import { GlobalErrorHandler } from './error.interceptor';
import { TokenInterceptor } from './token.interceptor';
import { HttpRefidInterceptor } from './http-refid.interceptor';
import { LoginInterceptor } from './login.interceptor';
//import {BrowserStateInterceptor } from './browserstate.interceptor';

export const httpInterceptorProviders = [
    /**
     * Use Mock Interceptor request only for development
     * Please comment back before committing
     */
    // { provide: HTTP_INTERCEPTORS, useClass: HttpMockRequestInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: GlobalErrorHandler, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpRefidInterceptor, multi: true },
    //{ provide: HTTP_INTERCEPTORS, useClass: BrowserStateInterceptor, multi: true },
];
