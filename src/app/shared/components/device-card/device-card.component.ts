import {Component, Input, OnInit} from '@angular/core';
import {IDevice} from "../../../pages/new-landing-page/store/shop-device.model";
import { ActivatedRoute } from "@angular/router";
import { queryEntries as landingPageQE } from "../../constants/new-landing-page.constants";

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit {
  @Input() device: IDevice;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

  }

  get deviceQueryParams(): { [p: string]: string } {
    // ? Clone the object, so that delete operator
    // ? doesn't mutate the original query object
    let queryParams  = { ...this.route.snapshot.queryParams };

    // ? Delete brand and plan-tab from the query params
    delete queryParams[landingPageQE.BRAND];
    delete queryParams[landingPageQE.PLAN_TAB];

    if(this.device.base_plan === 'xp-b-plan') {
      queryParams = {
        ...queryParams,
        type: this.device.default_plan_sku,
        device: this.device.sku
      }
  }

    return queryParams;
  }

  get routerLink(): string[] {
    if (this.device.base_plan === 'mega') {
      return ['/device-detail', this.device.sku];
    } else if (this.device.base_plan === 'xp-b-plan') {
      return ['/plans', 'xp-lite'];
    }
    // ? handling edge cases or exception cases
      return ['/device-detail', this.device.sku];
  }

  get deviceFullBannerStyle(): { [key: string]: string } {
    return this.device.full_width_banner // ? if yes -> Rule 3; else -> Rule 1
           ? {
              'background-image': `url('${this.device.full_width_banner.image}')`,
              color: this.device.full_width_banner.text_color
            }
           : {};
  }
}
