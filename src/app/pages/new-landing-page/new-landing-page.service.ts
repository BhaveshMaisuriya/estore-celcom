import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IShopBannerResponse } from './store/shop-banner.model';
import { IShopDevicesResponse } from './store/shop-device.model';
import { HOST } from '../../Service/app.service';

@Injectable({
  providedIn: 'root',
})
export class NewLandingPageService {

  host = HOST;
  urls = {
    shopDevices: `/rest/V1/shopdevices`,
    mobileShopPlans: `/rest/V1/multibanner/mobile`,
    desktopShopPlans: `/rest/V1/multibanner/desktop`
  };

  constructor(
    private http: HttpClient,
  ) { }

  get shopDevicesApi$(): Observable<IShopDevicesResponse> {
    return this.http
      .get<IShopDevicesResponse[]>(`${ this.host }${ this.urls.shopDevices }`)
      .pipe(map((response) => response[0]));
  }

  get shopBannerApi$(): Observable<IShopBannerResponse> {
    return this.http
      .get<IShopBannerResponse[]>(`${ this.host }${ this.shopBannerUrl }`)
      .pipe(map((response) => response[0]));
  }

  get shopBannerUrl(): string {
    return !!(
      navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    )
      ? this.urls.mobileShopPlans
      : this.urls.desktopShopPlans;
  }
}
