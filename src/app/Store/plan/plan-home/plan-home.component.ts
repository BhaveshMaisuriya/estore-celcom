import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {EStoreAnalysticsService} from '../../../Service/store.analytic.service';
import {BaseService} from '../../../base.service';
@Component({
  selector: 'app-plan',
  templateUrl: './plan-home.component.html',
  styleUrls: ['./plan-home.component.css']
})
export class PlanHomeComponent extends BaseService implements OnInit, AfterViewInit {
  bannerURL: any;
  banner404: any;
  public isCSAgentDealer = "";
  public csAgent = "cs-agent";
  public notCSAgent = "not-cs-agent";
  constructor(@Inject(DOCUMENT) private document,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    ) { super(); }

  ngOnInit() {
    this.bannerURL = {"Name": this.API_URL_CONST.BANNER_NAME, "Api": this.API_URL_CONST.BANNER_URL};
    this.banner404 = {"Name": this.API_URL_CONST.BANNER_404_NAME, "Api": this.API_URL_CONST.BANNER_404_URL};
    if (localStorage && localStorage.getItem("AddToCartNotification")) {
      localStorage.removeItem("AddToCartNotification");
    }
    if (localStorage && localStorage.getItem("lifestyleCOBP")) {
      localStorage.removeItem("lifestyleCOBP");
    }
    if (localStorage && localStorage.getItem("lifestylePlans")) {
      localStorage.removeItem("lifestylePlans");
    }
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = this.csAgent;
    } else {
      this.isCSAgentDealer = this.notCSAgent;
    }
  }
 ngAfterViewInit() {
    const currentUrl = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    }
}
