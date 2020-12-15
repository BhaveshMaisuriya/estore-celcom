import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { AppWidgetComponent } from '../../../Model/app.widget.component';
import { BaseComponent } from '../../../base.component';
import { ContentNavigation } from '../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { PlanTableComparisionService } from './plan-table-comparison.service';
import "lodash";
import { RemarketAnalyticsService } from '../../../Service/remarket-analytics.service';
import { UserService } from '../../../Service/user.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';

declare var _: any;

@Component({
  selector: 'app-plan-table-comparison',
  templateUrl: './plan-table-comparison.component.html',
  styleUrls: ['./plan-table-comparison.component.css'],
  providers: [RedirectionService, PlanTableComparisionService, RemarketAnalyticsService]
})
export class PlanTableComparisonComponent extends BaseComponent implements OnInit {
  @Input() data: any;
  public TableComparisonResponse = null;
  public DesktopBackgroundImage;
  public MobileBackgroundImage;
  public isCSAgent = false;
  public classActive = false;
  public IsDisplayDealerPopup = false;
  public DealerPopupType:any = "";
  public SelectedTab = "";
  public PlanData: any;
  public storeDeviceUrl = "/store/devices";
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _service: PlanTableComparisionService,
    private _remarketAnalyticsService: RemarketAnalyticsService,
    private _userService: UserService,
    private _globalErrorHandler: GlobalErrorHandler,

  ) {
    super();
  }

  accordianOpen(ev, i) {
    ev.preventDefault();
    // document.getElementById("rm-"+i).classList.toggle('is-active'); -- commented for now un comment if required in some scenario
    //  this.classActive = !this.classActive;

    if (typeof document !== 'undefined') {
      const listLnth = document.getElementsByClassName('plan-comparison__list__item__header');
      for (let index = 0; index < listLnth.length; index++) {
        if (index === i) {
          listLnth[index].classList.toggle('is-active');
        } else if (listLnth[index].classList.contains('is-active')) { // remaining items header to be deselected
          listLnth[index].classList.toggle('is-active');
        }
      }

      for (let index = 0; index < this.PlanData.tabdata.Items.length; index++) {
        if (i !== index) {
          // document.getElementById("rm-"+i).classList.toggle('is-active'); -- commented for now un comment if required in some scenario
          // remaining item list to be deslected
          if (document.getElementById("rm-" + index).classList.contains('is-active')) {
            document.getElementById("rm-" + index).classList.toggle('is-active');
          }
        }
      }
    }
  }

  ngOnInit() {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("DealerInfo")) {
      const eligibilityInfo = {
        isEligibleByAge: false,
        displayType: 'INVALID_DEALER_URL',
        type: 'xpax'
      };
      this._globalErrorHandler.errorObjectConvert(eligibilityInfo.displayType);
      this.DealerPopupType = JSON.parse(JSON.stringify(eligibilityInfo));
      this.IsDisplayDealerPopup = true;
    } else {
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.isCSAgent = true;
    }
    this.Init();
  }
  }

  private Init() {

    if (this.data && this.data.Api !== "undefined") {
      let url = "/rest/V1/planproductlist/4/0";
      url = this._userService.updateApiUrl(url);
      this._service.Find(url)
        .pipe(map((response: any) => {
            return response;
        }))
        .subscribe(
          (response: any) => {
            this.TableComparisonResponse = response;
            this.SetPlanType();
            this.SelectedTab = this.TableComparisonResponse[0].tabname;
            this.FindPlanDataByIndex(0);
          });
    }

    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("isMviva")) {
      localStorage.removeItem("isMviva");
      if (localStorage.getItem("mvivaSummaryMessage")) {
        localStorage.removeItem("mvivaSummaryMessage");
      }
      if (localStorage.getItem("mvivaPlanUpfront")) {
        localStorage.removeItem("mvivaPlanUpfront");
      }
      if (localStorage.getItem("mvivaBundleUpfront")) {
        localStorage.removeItem("mvivaBundleUpfront");
      }
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("COBP_login_Check")) {
      localStorage.removeItem("COBP_login_Check");
    }
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("COBP_FLOW_CHECK")) {
      localStorage.removeItem("COBP_FLOW_CHECK");
    }
  }

  private SetPlanType() {
    this.TableComparisonResponse.forEach((item, index) => {
      if (index === 0) {
        item['planType'] = "POSTPAID";
        item['isXpax'] = false;
      }
      if (index === 1) {
        item['planType'] = "XPAX";
        item['isXpax'] = true;
      }
    });
  }
  public RedirectToPlanPurchasePage(data: any) {
    this._redirectionService.HandlePlanPurchaseNavigation(data);
  }

  public OnContinueDealerCheck(data: any) {
    if (typeof window !== "undefined") {
      this.IsDisplayDealerPopup = false;
      window.location.href = this.storeDeviceUrl;//"/store/devices";
    }
  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public OnTabSelect(item, index) {
    this.SelectedTab = item.tabname;
    this.FindPlanDataByIndex(index);
  }

  private FindPlanDataByIndex(index: number) {
    const result: any = null;
    this.PlanData = this.TableComparisonResponse[index];
    // to check if it is XPAX template.
    this.PlanData.tabdata.Items.forEach((itemParent: any, index)  =>  {
      itemParent.AtrHref = "#rm-" + index;
      itemParent.TableInfo.forEach((item: any, index)  =>  {
        item.Id  =  index;
        item.HrefId = "rm-" + index;
      });
    });
  }
  loadAnalyticsBuyPlanScript(analytics_key_addtocart) {
    const analyticsKey = {
      FB_ID: analytics_key_addtocart.fb_buy_now_id,
      GOOGLE_GTAG_ID: analytics_key_addtocart.google_buy_now_id,
      TWITTER_PID: analytics_key_addtocart.twitter_buy_now_id
    };
    this._remarketAnalyticsService.LoadOnClickScripts(analyticsKey);
  }
  loadAnalyticsLearnPlanScript(analytics_key_addtocart) {
    const analyticsKey = {
      FB_ID: analytics_key_addtocart.fb_learn_more_id,
      GOOGLE_GTAG_ID: analytics_key_addtocart.google_learn_more_id,
      TWITTER_PID: analytics_key_addtocart.twitter_learn_more_id
    };
    this._remarketAnalyticsService.LoadOnClickScripts(analyticsKey);
  }
}
