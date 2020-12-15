import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { ShopBannerStore } from './shop-banner.store';
import { IShopBannerState } from './shop-banner.model';

@Injectable({ providedIn: 'root' })
export class ShopBannerQuery extends QueryEntity<IShopBannerState> {
  featured$ = this.selectAll({
    filterBy: entity => entity.banner_category === 'featured'
  });

  topRightCarousel$ = this.selectAll({
    filterBy: entity => entity.banner_category === 'top_right'
  });

  topLeftCarousel$ = this.selectEntity('top_left-1');

  shopPlans$ = this.selectAll({
    filterBy: entity => entity.banner_category === 'shop_plans'
  });

  constructor(protected store: ShopBannerStore) {
    super(store);
  }

}
