import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { iOmniCampaign } from 'app/shared/models/plan.model';
import { CLMOmniDataSanitizer } from 'app/shared/utilities/helper.ultility';

@Component({
  selector: 'app-omni-banner',
  templateUrl: './omni-banner.component.html',
  styleUrls: ['./omni-banner.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class OmniBannerComponent implements OnInit {
  _omni: iOmniCampaign;
  @Input('data')
  get omni() {
    return this._omni;
  }

  set omni(value) {
    this._omni = CLMOmniDataSanitizer(value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
