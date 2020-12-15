import { Component, OnInit, AfterViewInit } from '@angular/core';
import { PlanComparisonService } from "./plan-comparison.service";
import { BaseComponent } from '../../../base.component';
import { ContentNavigation } from '../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { CompareProductService } from '../../../Service/compareproduct.service';
@Component({
  selector: 'app-plan-comparison',
  templateUrl: './plan-comparison.component.html',
  styleUrls: ['./plan-comparison.component.css'],
  providers: [PlanComparisonService, RedirectionService, CompareProductService]
})
export class PlanComparisonComponent extends BaseComponent implements OnInit, AfterViewInit {
  public isCSAgentDealer = "";
  public csAgent = "cs-agent";
  public notCSAgent = "not-cs-agent";
  public productList: any;
  bannerURL: any;
  constructor(private productcardservice: PlanComparisonService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    @Inject(DOCUMENT) private document,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _compareProductService: CompareProductService
  ) {
    super();
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = this.csAgent;
    } else {
      this.isCSAgentDealer = this.notCSAgent;
    }
  }
  ngAfterViewInit() {
    this.productList = this._compareProductService.retrieveProduct();
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
      this._estoreAnalyticsService.SetCompareProductArray(this.productList, this._renderer);
    });
  }

  Init() {
    this.bannerURL = { "Name": this.API_URL_CONST.BANNER_NAME, "Api": this.API_URL_CONST.BANNER_URL };
  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

}
