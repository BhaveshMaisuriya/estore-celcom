import { Injectable, Inject, PLATFORM_ID, forwardRef } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { environment } from "environments/environment";
import { isPlatformBrowser } from "@angular/common";
import { UserService } from 'app/Service/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(forwardRef(() => UserService)) private _userService: UserService,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // * For home wireless
    // if (req.url.includes(`/store/v1/stockAvailabilityCheck`)) {
    //   if (!req.headers.get("agenttoken")) {
    //     return of(
    //       new HttpResponse({
    //         status: 200,
    //         body: { stockAvailabilityCheckResponse: false }
    //       })
    //     );
    //   }
    // }

    
    /**
     * getAdobeUrl
     */
    try {
      if (req.url?.toLowerCase()?.endsWith(`getadobeurl`)) {
        const isProd = environment.production;
        const prodAdobUrl = '<script src="https://assets.adobedtm.com/launch-EN0829d4a75d5c4a1397797f7f23708844.min.js"></script>';
        const stagingAdobURL = '<script src="https://assets.adobedtm.com/launch-ENe7577517d75c4a789c62a6cb4dc09681-staging.min.js"></script>';

        const actualAdobeURL = isProd ? prodAdobUrl : stagingAdobURL;
        return of(
          new HttpResponse({
            status: 200,
            body: {
              "GlobalSettings": [
                {
                  "type": "header_script",
                  "value": actualAdobeURL,
                }
              ]
            }
          })
        );
      }
    } catch (_error) {
      
    }

    const whitelistAPIs = [
      'planproductview',
      'planproductlist',
      'devicelist',
      'devicedetails',
      'ultraplanproductview',
      'project-moon-details',
      'shopdevices',
      'multibanner',
    ];
    const isEnterprise = this._userService.isUserEnterprise();
    const isDealer = this._userService.isDealer();
    const isAgent = this._userService.isCSAgent();
    const found = whitelistAPIs.find(s => {
      return req.url.includes(s);
    });
    if (found && (isEnterprise || isDealer || isAgent) && !req.urlWithParams.includes('agenttype')) {
      let agenttype;
      if (isEnterprise) {
        agenttype = 'enterprise';
      }
      if (isDealer) {
        agenttype = 'dealer';
      }
      if (isAgent) {
        agenttype = 'agent';
      }
      req = req.clone({
        setParams: {
          'agenttype': agenttype
        }
      });
    }

    // agent token for newlandingpage /home api
    const loginURLs = [
      '/rest/v1/login',
    ];

    // * for temp user tokens
    const tempUserTokenURLs = [
      `/rest/v1/ekycdata`,
      `/rest/v1/ekyc`,
    ];

    const matchedURL = loginURLs.find(u => {
      return req.url.toLowerCase().includes(u);
    });
    if (!matchedURL) {

      const tempUserTokenURL = tempUserTokenURLs.find(x => {
        return req.url.toLowerCase().includes(x);
      });

      let sessionId = "PHPSESSID=";
      if (environment.production || environment.preProduction) {
        sessionId = "SESSIONID=";
      }

      let agentToken = undefined;
      let dealerToken = undefined;
      if (this.isBrowser) {
        let userInfo;
        let agentInfo;
        let dealerInfo;
        let userToken;
        let authToken;
        let xToken;
        let eKYCToken;

        try {
          userInfo = JSON.parse(sessionStorage.getItem("UserInfo")) || undefined;
          agentInfo = JSON.parse(sessionStorage.getItem("AgentInfo")) || undefined;
          dealerInfo = JSON.parse(sessionStorage.getItem("DealerInfo")) || undefined;
          authToken = sessionStorage.getItem('authtoken') || undefined;
          xToken = sessionStorage.getItem('AltToken') || undefined;
          eKYCToken = sessionStorage.getItem('ekyc') || undefined;
          if (tempUserTokenURL) {
            userToken = sessionStorage.getItem('TempUserToken') || undefined;
          } else {
            userToken = sessionStorage.getItem('UserToken') || undefined;
          }
        } catch (_e) {

        }

        if (userInfo && userInfo["agent_token"]) {
          agentToken = sessionId + userInfo["agent_token"];
        }
        if (agentInfo && agentInfo.agent_token) {
          agentToken = sessionId + agentInfo.agent_token;
        }
        if (dealerInfo && dealerInfo.agent_token) {
          dealerToken = sessionId + dealerInfo.agent_token;
        }

        const headers = {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          'agentToken': agentToken,
          'dealerToken': dealerToken,
          'userToken': userToken,
          'authToken': authToken,
          'x-token': xToken,
          'ekyc-token': eKYCToken,
        }

        for (const key in headers) {
          if (!headers[key]) {
            delete headers[key];
          }
        }

        const authReq = req.clone({
          setHeaders: headers,
        });
        return next.handle(authReq);
      }
    }

    return next.handle(req);
  }
}
