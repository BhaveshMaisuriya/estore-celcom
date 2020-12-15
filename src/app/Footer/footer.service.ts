import { Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../base.service';
import { AppService } from '../Service/app.service';

@Injectable()
export class FooterService extends BaseService {
  footerContents: any;
  constructor(private _service: AppService, private _http: HttpClient) {
    super();
  }
  public FindFooterLinkks(): Observable<any[]> {
    const url = this.BaseUrl + 'samplefooterresponse.json';
    return this._http
      .get(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }
  public GetFooterContents() {
    return this.footerContents;
  }
  public SetFooterContents(data) {
    this.footerContents = data;
  }
  public FindFooterContents(): Observable<any[]> {
    const url = this.API_URL_CONST.MENU_API_URL + this.API_URL_CONST.FOOTER_ICONS_API_ID;
    return this._service
      .get(url)
      .pipe(map((response: any) => {
        this.footerContents = response;
        return response;
      }));
  }
  public FindFooter_New() {
    const url = this.API_URL_CONST.MENU_API_URL + this.API_URL_CONST.FOOTER_API_ID;
    return this._service
      .get(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }
}
