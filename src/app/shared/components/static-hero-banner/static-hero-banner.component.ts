import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IShopBannerItem } from '../../../pages/new-landing-page/store/shop-banner.model';

@Component({
  selector: 'app-static-hero-banner',
  templateUrl: './static-hero-banner.component.html',
  styleUrls: [ './static-hero-banner.component.scss' ]
})
export class StaticHeroBannerComponent implements OnInit {

  @Input() banner$: Observable<IShopBannerItem>;
  banner: IShopBannerItem;
  constructor() { }

  ngOnInit(): void {
    // ? async pipes are not allowed in template action expressions
    this.banner$.subscribe(banner => {
      this.banner = banner;
    });
  }

  getHeadlineStyles(banner: IShopBannerItem): { [key: string]: string } {
    let style = {};

    if (banner?.headline_text_color) {
      style = { ...style, color: banner.headline_text_color };
    }

    if (banner?.headline_text_size) {
      style = { ...style, 'font-size': `${banner.headline_text_size}px` };
    }

    return style;
  }

  getDescriptionStyles(banner: IShopBannerItem): { [key: string]: string } {
    let style = {};

    if (banner?.description_background_color) {
      style = { ...style, background: banner.description_background_color };
    }

    if (banner?.description_text_color) {
      style = { ...style, color: banner.description_text_color };
    }

    if (banner?.description_text_size) {
      style = { ...style, 'font-size': `${banner.description_text_size}px` };
    }

    return style;
  }
}
