import { Component, OnInit, AfterViewInit } from '@angular/core';
// core
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AppService } from '../../../Service/app.service';
// import { RendererService } from '../../../Service/renderer.service';
// import { AnalyticsService } from '../../../Service/analytic.service';
import { BaseService } from '../../../base.service';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'app-device-catalogue',
  templateUrl: './device-catalogue.component.html',
  styleUrls: ['./device-catalogue.component.css'],
})

export class DeviceCatalogueComponent extends BaseService implements OnInit, AfterViewInit {
  public isCSAgentDealer = "";
  public csAgent = "cs-agent";
  public notCSAgent = "not-cs-agent";
  bannerURL: any;

  dataForCatalogueBanner: any = {
    // Title: "The ultimate deal on the best devices, just for you",
    // SubTitle: " only when you shop on the Celcom Online Shop"
    Title: "The ENTERTAINER pass giveaway",
    SubTitle: "For any device with Celcom Mobile Plan or EasyPhone™ subscription",
    carousals: [],
    duration : 0
    // FootNote: "* Only applicable for selected models"
  };

  constructor(@Inject(DOCUMENT) private document,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
    private _appService: AppService,
    private _userService: UserService,
  ) { super(); }

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem("ls_subnav", JSON.stringify({ "activeMenu": "Devices", "currentURL": "personal/devices" }));
    }
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = this.csAgent;
    } else {
      this.isCSAgentDealer = this.notCSAgent;
    }
    this.Init();
  }
  isMobile() {
    if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
    ) {
       return true;
     } else {
       return false;
     }
   }
  LoadCarousal() {
    let apiUrl = '';
    if (this.isMobile()) {
      apiUrl = '/rest/V1/banner/mobile';
    } else {
      apiUrl = '/rest/V1/banner/desktop';
    }
    apiUrl = this._userService.updateApiUrl(apiUrl);
    this._appService.getEstoreUserData(apiUrl).subscribe(
      (response: any) => {
        if (response[0].status) {
          this.dataForCatalogueBanner.duration = response[0].duration * 1000;
          this.dataForCatalogueBanner.carousals = response[0].response.map((el, index) => {
            const o: any = {};
            o.html = el.banner_html;
            o.active = false;
            o.page = index;
            return o;
          });
          this.dataForCatalogueBanner.carousals[0].active = true;
        }
    },  (errorResponse: any) => {
    });
  }
  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
  Init() {
    this.bannerURL = { "Name": this.API_URL_CONST.BANNER_NAME, "Api": this.API_URL_CONST.BANNER_URL };
    if (!this._userService.isUserEnterprise())
      this.LoadCarousal();
  }
}