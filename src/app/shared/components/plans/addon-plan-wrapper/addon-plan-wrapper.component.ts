import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IPromotionBadge } from 'app/pages/new-landing-page/store/shop-device.model';


export interface iEasyphoneData {
  base_label: string;
  base_price: number;
  pass_price: number;
  phone_price: number;
  multiple_devices?: boolean;
}
export interface iAddonPlanToDisplay {
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
  easyphone_data?: iEasyphoneData;
}

@Component({
  selector: 'app-addon-plan-wrapper',
  templateUrl: './addon-plan-wrapper.component.html',
  styleUrls: ['./addon-plan-wrapper.component.scss'],
})
export class AddonPlanWrapperComponent implements OnInit {

  _plans: iAddonPlanToDisplay[];
  @Input()
  get plans() {
    return this._plans;
  }

  set plans(value) {
    const existingVal = this.plans?.map(p => `${p.sku}|${p.device_price}|${p.easyphone_data?.phone_price}`);
    const newVal = value?.map(p => `${p.sku}|${p.device_price}|${p.easyphone_data?.phone_price}`);
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

  @Input() cardType: 'plan' | 'device' | 'easyphone' = 'plan';
  @Input() planType = '';
  @Input() customPrice = false;
  @Input() priceLabel = 'Total ';
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