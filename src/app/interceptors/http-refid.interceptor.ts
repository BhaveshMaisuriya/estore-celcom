import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpResponse,
  HttpParams
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class HttpRefidInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    try {
      let refid = sessionStorage.getItem('refid');
      if (refid) {
        let req_ = req.clone({
          setParams: {
            dealerid: refid,
          }
        });
        return next.handle(req_);
      }
    } catch (_error) {
      
    }
    return next.handle(req);
  }
}
