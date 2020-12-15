import { Injectable } from "@angular/core";
import { QueryEntity } from "@datorama/akita";
import {
  shopDevicesItemsPerPage as itemsPerPage,
  ShopDevicesStore,
} from './shop-devices.store';
import { DevicesState, IDevice } from './shop-device.model';

@Injectable({ providedIn: 'root' })
export class ShopDevicesQuery extends QueryEntity<DevicesState, IDevice> {

  selectedFeatureTab$ = this.select('selectedFeatureTab');
  
  selectedBrand$ = this.select('selectedBrand');

  selectedPlan$ = this.select('selectedPlan');

  totalPages$ = this.select(state => Math.ceil(
    state.filteredDevices.length / itemsPerPage
  ));

  filteredDevices$ = this.select('filteredDevices');

  devicesToDisplay$ = this.select(
    state => state.filteredDevices.slice(
      (state.currentPage - 1) * itemsPerPage,
      state.currentPage * itemsPerPage
    )
  );

  constructor(protected store: ShopDevicesStore) {
    super(store);
  }
}
