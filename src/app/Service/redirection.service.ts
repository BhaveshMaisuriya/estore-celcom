import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContentNavigationInfo} from '../Model/contentnavigation.model';
import {NotificationPopupEvent} from '../Service/broadcaster.service';
import {Broadcaster} from '../Model/broadcaster.model';
import {CookieService} from 'ngx-cookie-service';

@Injectable()
export class RedirectionService {
    private MY_ROUTE = "MY_ROUTE";
    constructor(
        private broadcaster: Broadcaster,
        private notificationEvent: NotificationPopupEvent,
        private cookieService: CookieService
    ) {}

    public HandleNavigation(obj: ContentNavigationInfo, _router: Router, _activatedRoute: ActivatedRoute) {
        if (obj.IsHttpOrHttps) {
            // check if the user already submitted the feedback , using clickscount cookie
            // if(!(obj.IsUrlContainsBetaWebSiteLink) && !(this.cookieService.check('isFeedBackSubmitted'))){
            //     let data ={
            //         Type:"OPEN",
            //         Data:obj
            //     }
            //     this.notificationEvent.fire(data);
            // }
            // else{
            window.location.href = obj.Url;
            // }
        } else {
            const isUrlContainsHash = this.IsUrlContainsHash(obj.Url);
            if (!isUrlContainsHash) {
                _router.navigate([obj.Url]);
            } else {
                const updatedUrl = this.SplitAndFindUrl(obj.Url);
                _router.navigate([updatedUrl]);
                if (typeof window !== 'undefined' && localStorage) {
                    localStorage.setItem("FaqAcnhor", this.SplitAndFindHashPartInUrl(obj.Url));
                }
            }
        }
    }

    public HandlePlanPurchaseNavigation(_linkToNavigate) {
         window.location.href = _linkToNavigate;
    }

    private SetCurrentRouteToLocalStorageAndNavigate(alias: string, _router: Router) {
        let data: any = '';
        if (typeof window !== 'undefined' && localStorage) {
            data = JSON.parse(localStorage.getItem(this.MY_ROUTE));
        }
        const result: any = data.filter((item: any) => {
          return (item.alias.toLowerCase() === alias.toLowerCase());
        });
        if (result.length > 0) {
            const curretRoute = result[0];
            if (typeof window !== 'undefined' && localStorage) {
                localStorage.setItem("current-route", JSON.stringify(curretRoute));
            }
            _router.navigate([alias]);
        }


    }

    public IsUrlContainsHash(currentUrl) {
        return currentUrl.indexOf("#") > -1;
    }
    public SplitAndFindHashPartInUrl(currentHashUrl) {
        let splitResult = "";
        if (currentHashUrl !== null) {
          const result = currentHashUrl.split('#');
          if (result.length > 0) {
            splitResult =  "#" + result[1];
          }
        }
        return splitResult;
    }
    public SplitAndFindUrl(currentHashUrl) {
        let splitResult = "";
        if (currentHashUrl !== null) {
          const result = currentHashUrl.split('#');
          if (result.length > 0) {
            splitResult =  result[0];
          }
        }
        return splitResult;
    }
}
