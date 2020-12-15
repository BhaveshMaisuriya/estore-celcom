import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { IPromotionBadge } from "app/pages/new-landing-page/store/shop-device.model";

@Component({
  selector: 'app-plan-card',
  templateUrl: './plan-card.component.html',
  styleUrls: ['./plan-card.component.scss'],
})
export class PlanCardComponent implements OnInit {

  @Input() image;
  @Input() title;
  @Input() description;

  /**
   * RMXX pricetag.
   *
   * HTML supported
   */
  @Input() pricetag;
  @Input() selected = false;
  @Input() height100 = false;
  @Input() disabled = false;

  /**
   * If it is default, checkbox will not be displayed
   */
  @Input() default = false;

  @Input() useMaterialTheme = false;

  /**
   * Replace collapse button with html.
   *
   * This will make card always expanded
   */
  @Input() collapseButtonTemplate: TemplateRef<any>;
  @Input() footerTemplate: TemplateRef<any>;
  @Input() pricetagTemplate: TemplateRef<any>;

  /**
   * Card will be automatically be expanded when selected
   */
  @Input() autoExpanded = false;

  /**
   * If true, footer will be collapsible, else description will
   */
  @Input() collapsibleFooter = true;

  @Input()
  get promotion_badge() {
    return this._promotion_badge;
  }
  set promotion_badge(value) {
    if (Array.isArray(value)) {
      this.badges = value;
    } else {
      this.badges = [value];
    }
    this._promotion_badge = this.badges[0];
  }
  @Input() promotion_text: string;

  collapsed = false;

  _promotion_badge: IPromotionBadge;
  badges = [];

  constructor() { }

  ngOnInit(): void {
  }

  toggleExpand(event) {
    if (this.autoExpanded) return;
    this.collapsed = !this.collapsed;
    event.stopPropagation();
  }

}
