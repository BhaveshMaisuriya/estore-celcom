import { Injectable } from '@angular/core';
import { IShopBannerState } from './shop-banner.model';
import { EntityStore, StoreConfig } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'shopBanner' })
export class ShopBannerStore extends EntityStore<IShopBannerState> {

  constructor() {
    super();
  }

}

