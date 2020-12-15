import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroBannerImageClickableService } from './hero-banner-image-clickable.service';
import { BaseComponent } from '../../base.component';
//
import { ContentNavigation } from '../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../Service/redirection.service';

@Component({
  selector: 'app-hero-banner-image-clickable',
  templateUrl: './hero-banner-image-clickable.component.html',
  styleUrls: ['./hero-banner-image-clickable.component.css'],
  providers: [HeroBannerImageClickableService, RedirectionService]
})
export class HeroBannerImageClickableComponent extends BaseComponent implements OnInit {

  @Input() data: any;
  public HeroBannerImgClickResponse = null;
  BannerTextPresent: boolean;
  constructor(private herobannerimgclickable: HeroBannerImageClickableService,
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
    if (this.data && this.data.Api !== "undefined") {
      const url = "/" + this.data.Api;
      this.herobannerimgclickable.Find(url).subscribe(
        (data: any) => {
          this.HeroBannerImgClickResponse = data.Items[0];
          if (this.HeroBannerImgClickResponse && this.HeroBannerImgClickResponse.BannerType &&
              this.HeroBannerImgClickResponse.BannerType === 'Text') {
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
