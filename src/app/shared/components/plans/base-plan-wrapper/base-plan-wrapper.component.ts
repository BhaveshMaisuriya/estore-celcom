import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPromotionBadge } from 'app/pages/new-landing-page/store/shop-device.model';

export interface iBasePlanToDisplay {
  sku: string;
  title: string;
  price?: string;
  image?: string;
  offers?: string;
  selected?: boolean;
  badge?: IPromotionBadge;
  promotion_text?: string;
}

@Component({
  selector: 'app-base-plan-wrapper',
  templateUrl: './base-plan-wrapper.component.html',
  styleUrls: ['./base-plan-wrapper.component.scss'],
})
export class BasePlanWrapperComponent implements OnInit {
  _plans: iBasePlanToDisplay[];
  @Input()
  get plans() {
    return this._plans;
  }

  set plans(value) {
    const existingVal = this.plans?.map(p => `${p.sku}|${p.price}`);
    const newVal = value?.map(p => `${p.sku}|${p.price}`);
    if (existingVal?.join('') !== newVal?.join('')) {
      this._plans = value;
      this.hasBadge = !!value?.find(p => {
        return (p.badge?.[0]?.['promotion_badge_text'] || p.badge?.['promotion_badge_text'])?.trim()?.length > 0;
      });
    }
  }
  @Input() selectedSku: string;
  @Input() isLoading = true;
  @Input() disabled = false;

  @Output() onSelect = new EventEmitter<string>();
  loadingType: 'spinner' | 'shimmer' = 'shimmer';

  hasBadge = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectPlan(sku: string) {
    if (this.selectedSku !== sku && !this.disabled) {
      this.onSelect.emit(sku);
    }
  }

}
