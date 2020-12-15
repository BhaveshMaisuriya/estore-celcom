import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FooterService } from './footer.service';
import { ContentNavigation } from '../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../Service/redirection.service';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'footer-component',
  templateUrl: './footer.component.html',
  providers: [FooterService, RedirectionService],
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  FooterNavigationInfo: any;
  FooterContentInfo: any;
  RoutesData: any;
  FooterCopyrightInfo: string;
  FooterpostpaidApps: string;
  dataAnalyticsRegion: any;
  isCSAgent = "";
  csAgent = "cs-agent";
  notCSAgent = "not-cs-agent";
  constructor(private _service: FooterService,
    private _redirectionService: RedirectionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId
  ) {

  }
  ngOnInit() {
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.isCSAgent = this.csAgent;
    } else {
      this.isCSAgent = this.notCSAgent;
    }
    this.Init();
    this.dataAnalyticsRegion = "FOOTER";
  }
  private Init() {
    setTimeout(() => {
      this.getFooterNav();
      this.getFooterContent();
    }, 13);
  }
  private getFooterNav() {
    this.InitFooterServiceForNavigation();
  }
  private getFooterContent() {
    this.InitFooterServiceForContent();
  }
  private InitFooterServiceForNavigation() {
    this._service.FindFooter_New().subscribe((data) => {
      this.FooterNavigationInfo = data;
    });
  }
  private InitFooterServiceForContent() {
    this._service.FindFooterContents().subscribe((data) => {
      this.FooterContentInfo = data;
      if (!isPlatformServer(this.platformId)) {
        this._service.SetFooterContents(this.FooterContentInfo);
        if (this.FooterContentInfo && this.FooterContentInfo[2] && this.FooterContentInfo[2].copyright) {
          this.FooterCopyrightInfo = this.FooterContentInfo[2].copyright;
        }
        if (this.FooterContentInfo && this.FooterContentInfo[4] && this.FooterContentInfo[4].postpaidApps) {
          this.FooterpostpaidApps = this.FooterContentInfo[4].postpaidApps;
        }
      }
    });
  }
  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }
  public defaultOnClick() {
    return false;
  }
}


