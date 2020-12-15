import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IDevice } from 'app/pages/new-landing-page/store/shop-device.model';
import { iSelectOptions } from '../forms/estore-input/estore-input.component';
import { EstoreButtonMenuComponent } from '../estore-button-menu/estore-button-menu.component';
import { ShopDevicesQuery } from 'app/pages/new-landing-page/store/shop-devices.query';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-device-combo-card',
  templateUrl: './device-combo-card.component.html',
  styleUrls: ['./device-combo-card.component.scss'],
})
export class DeviceComboCardComponent implements OnInit, OnDestroy {
  @Input() device: IDevice;
  @Input() planSku: string;
  plans$ = this.devicesQuery.select((state) => state.filteredPlans);
  selectedPlan$ = this.devicesQuery.selectedPlan$;
  selectedPass: string;
  selectedComboDevice: any;
  selectedComboDeviceprice: any;
  @ViewChild('btnMenu') btnMenu: EstoreButtonMenuComponent;
  subscription: Subscription;
  

  constructor(private devicesQuery: ShopDevicesQuery) { }
    
  ngOnInit(): void {
    this.subscription = combineLatest([this.plans$, this.selectedPlan$])
    .subscribe(([plans,selectedPlan]) => {
          const device = this.device?.device_combo_data?.items.find(d => d.is_default);
          this.selectedComboDevice = device;
          this.selectedComboDeviceprice = device?.[selectedPlan];
          this.selectedPass = plans.find(o => o.key === selectedPlan)?.name;
    });
  }

  get routerLink() {
    if (this.device?.base_plan === 'mega') {
      return ['/device-detail', this.device.sku];
    }
  }
  
  onSelectChange(sku) {
    this.subscription = combineLatest([this.plans$, this.selectedPlan$])
    .subscribe(([plans,selectedPlan]) => {
      const device = this.device.device_combo_data?.items.find(d => d.sku === sku);
      this.selectedComboDevice = device;
      this.selectedComboDeviceprice = device?.[selectedPlan];
      this.selectedPass = plans.find(o => o.key === selectedPlan).name;
    });
  }

  getComboItems(device: IDevice): iSelectOptions[] {
    return device?.device_combo_data?.items?.map(d => {
      return {
        label: d.name,
        value: d.sku,
      };
    });
  }

  onComboTitleClick(event: Event) {
    if (this.btnMenu) {
      event.stopPropagation();
      event.preventDefault();
      this.btnMenu.openMenu();
      return false;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
}
