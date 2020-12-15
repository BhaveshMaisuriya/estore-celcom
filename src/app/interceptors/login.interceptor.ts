import { Injectable, Inject, PLATFORM_ID, forwardRef } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { UserService } from 'app/Service/user.service';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginInterceptor implements HttpInterceptor {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(forwardRef(() => UserService)) private _userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const isEnterprise = this._userService.isUserEnterprise();
    const isDealer = this._userService.isDealer();
    const isAgent = this._userService.isCSAgent();
    let agenttype;
    if ((isEnterprise || isDealer || isAgent) && !req.urlWithParams.includes('agenttype')) {
      if (isEnterprise) {
        agenttype = 'enterprise';
      }
      if (isDealer) {
        agenttype = 'dealer';
      }
      if (isAgent) {
        agenttype = 'agent';
      }
    }

    // agent token for newlandingpage /home api
    const loginURLs = [
      '/rest/v1/login',
    ];
    const matchedURL = loginURLs.find(u => {
      return req.url.toLowerCase().includes(u);
    });
    let agentInfo = null;
    let dealerInfo = null;
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      agentInfo = JSON.parse(sessionStorage.getItem("AgentInfo"));
    }
    if (sessionStorage && sessionStorage.getItem("DealerInfo")) {
      dealerInfo = JSON.parse(sessionStorage.getItem("DealerInfo"));
    }

    if (matchedURL && agenttype) {
      return next.handle(req).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              if(event.body && event.status === 200 && event.body[0].status){
                const payload = {
                  agenttype,
                  agentDetails: agentInfo || dealerInfo,
                  userDetails: req.body,
                }
                this._userService.postDealerAgentDetails(payload);
              }
            }
            return event;
        }));
    }

    return next.handle(req);
  }
}
