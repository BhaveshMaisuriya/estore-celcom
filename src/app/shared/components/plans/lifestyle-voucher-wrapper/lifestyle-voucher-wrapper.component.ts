import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPromotionBadge } from 'app/pages/new-landing-page/store/shop-device.model';

export interface iLifeStyleVoucherToDisplay {
  sku: string;
  title: string;
  price?: string;
  image?: string;
  offers?: string;
  selected?: boolean;
  badge?: IPromotionBadge;
  promotion_text?: string;
  promotion_terms?: string;
  device_price?: string;
  lifestylevoucher?: boolean;
  selected_lifestylecontract?: string;
  selected_lifestylevoucher?: boolean;
}

@Component({
  selector: 'app-lifestyle-voucher-wrapper',
  templateUrl: './lifestyle-voucher-wrapper.component.html',
  styleUrls: ['./lifestyle-voucher-wrapper.component.scss']
})
export class LifestyleVoucherWrapperComponent implements OnInit {

  _plans: iLifeStyleVoucherToDisplay[];
  @Input()
  get plans() {
    return this._plans;
  }

  set plans(value) {
    const existingVal = this.plans?.map(p => `${p.sku}|${p.device_price}`);
    const newVal = value?.map(p => `${p.sku}|${p.device_price}`);
    if (existingVal?.join('') !== newVal?.join('')) {
      this._plans = value;
      this.hasBadge = !!value?.find(p => p.badge?.promotion_badge_text?.trim()?.length > 0);
    }
  }
  @Input() selectedSku: string;
  @Input() isLoading = true;
  @Input() disabled = false;
  @Input() lifestylevoucher: false;

  @Input() cardType: 'plan' | 'device' | 'easyphone' = 'plan';
  @Input() planType = '';
  @Input() customPrice = true;
  @Input() priceLabel = 'Total ';
  @Output() onSelect = new EventEmitter<any>();

  loadingType: 'spinner' | 'shimmer' = 'shimmer';

  hasBadge = false;

  constructor() { }

  ngOnInit(): void {
  }

  selectPlan(plan: iLifeStyleVoucherToDisplay) {
    if (plan.lifestylevoucher) {
      this.onSelect.emit(plan);
    }
  }

}
