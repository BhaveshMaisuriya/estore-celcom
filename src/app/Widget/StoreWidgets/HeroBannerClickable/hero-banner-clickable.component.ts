import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroBannerClickableService } from './hero-banner-clickable.service';
import { BaseComponent } from '../../../base.component';
//
import { ContentNavigation } from '../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';

@Component({
  selector: 'app-store-hero-banner-clickable',
  templateUrl: './hero-banner-clickable.component.html',
  styleUrls: ['./hero-banner-clickable.component.css'],
  providers: [HeroBannerClickableService, RedirectionService]
})
export class HeroBannerClickableComponent extends BaseComponent implements OnInit {

  @Input() data: any;
  public HeroBannerImgClickResponse = null;
  BannerTextPresent: boolean;
  isCSAgent = "";
  csAgent = "cs-agent";
  notCSAgent = "not-cs-agent";

  constructor(private heroBannerClickableService: HeroBannerClickableService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService
  ) {
    super();
  }

  ngOnInit() {
    this.Init();
  }

  private Init() {
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.isCSAgent = this.csAgent;
    } else {
      this.isCSAgent = this.notCSAgent;
    }
    if (this.data && this.data.Api !== "undefined") {
      const url = "/" + this.data.Api;
      this.heroBannerClickableService.Find(url).subscribe(
        (data: any) => {
          this.HeroBannerImgClickResponse = data.Items[0];
          if (this.HeroBannerImgClickResponse.BannerType === 'Text') {
            this.BannerTextPresent = true;
          } else {
            this.BannerTextPresent = false;
          }
        });
    }
  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }
}
