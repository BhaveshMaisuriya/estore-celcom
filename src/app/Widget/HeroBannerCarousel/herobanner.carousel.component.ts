import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HeroBannerCarouselService } from "./herobanner.carousel.service";
import { BaseComponent } from '../../base.component';
import { ContentNavigation } from '../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../Service/redirection.service';


@Component({
  selector: 'herobanner-carousel-component',
  styleUrls:  ['./herobanner.carousel.component.css'],
  templateUrl: './herobanner.carousel.component.html',
  providers: [HeroBannerCarouselService, RedirectionService]
})

export class HeroBannerCarouselComponent extends BaseComponent implements OnInit {
  @Input() data: any;
  HeroBanner: any;
  color: any;
  subtitleColor: any;
  dataAnalyticsRegion: any;
  constructor(private _service: HeroBannerCarouselService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService
  ) {
    super();
    this.HeroBanner = null;
  }

  ngOnInit() {
    this.Init();
  }

  private Init() {
    if (this.data && this.data.Api !== "undefined") {
      this._service.Find(this.data.Api.trim()).subscribe(
        (response) => {
          this.HeroBanner = response['Items'];
          this.HeroBanner.forEach((item: any) => {
            if (item.Organism === "heroBanner_right") {
              item.displayClass = "hero-banner-right-layout";
            } else {
              item.displayClass = "hero-banner-left-layout";
            }

            item.BannerImage = this.ApiUrl + item.BannerImage;
            item.MobileImage = this.ApiUrl + item.MobileImage;
            item.color = item.TitleColor;
            item.subtitleColor = item.SubtitleColor;
            this.dataAnalyticsRegion = item.Title;
          });
        });
    }
  }

  public ManageContentNavigation(data: any) {
    let obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  //  public defaultOnClick(){
  //    return false;
  //  }
}
