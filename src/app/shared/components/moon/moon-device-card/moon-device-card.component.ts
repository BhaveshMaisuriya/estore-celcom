import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { iPlanDeviceBundle, iPlanDevice } from 'app/shared/models/device.model';
import { IColor } from 'app/shared/components/device-color-storage-picker/device-color-storage-picker.component';
import { DeviceDetailPageService } from 'app/pages/device-detail-page/device-detail-page.service';
import { finalize } from 'rxjs/operators';
import { isNullOrUndefined } from 'app/shared/utilities/helper.ultility';
import { PlansService } from 'app/Service/plans.service';

@Component({
  selector: 'app-moon-device-card',
  templateUrl: './moon-device-card.component.html',
  styleUrls: ['./moon-device-card.component.scss']
})
export class MoonDeviceCardComponent implements OnInit {

  @Input() image: string;
  @Input() isLoading = false;
  @Input() selected = false;
  @Input()
  get product() {
    return this._product;
  }

  set product(value: iPlanDeviceBundle) {
    this._product = value;
    this.variants = [...value?.associated_device_product];
    if (value) {
      this.selectColorStorage(value);
    }
  }
  get selectedVariant() {
    return this._selectedVariant;
  }

  set selectedVariant(value: iPlanDevice) {
    // if (this.selected) {
    //   this.selectVariant(value);
    //   return;
    // }
    if (value) {
      this._selectedVariant = value;
      this.selectColorStorage(value);
      this.checkStock(value?.sku);
      this.selectVariant(value);
    } else {
      this.selectDefaultDevice();
    }
  }
  @Input() isInStock = true;
  @Input()
  set selectedSKU(value) {
    const selectedItem = this.variants.find(d => d.sku === value);
    if (this.selected && selectedItem) {
      // this.selected = false;
      this.selectedVariant = selectedItem;
      // this.selected = true;
    }
  }

  @Input() isDisabled = false;

  @Output() onSelectDevice = new EventEmitter<iPlanDevice>();
  @Output() onSelectVariant = new EventEmitter<iPlanDevice>();

  _product: iPlanDeviceBundle;
  _selectedVariant: iPlanDevice;
  // _selectedSKU: string;
  selectedColorStorage: {
    color: IColor;
    storage: string
  };

  variants: iPlanDevice[];

  stockCache: {
    [sku: string]: boolean;
  } = {};

  constructor(
    private _deviceService: DeviceDetailPageService,
    private _plansService: PlansService,
  ) { }

  ngOnInit(): void {
    if (!this.selectedVariant) {
      if (this.product) {
        this.selectDefaultDevice();
      }
    }
    if (this.selectedSKU) {
      // this.variants?.
    }
  }

  selectDefaultDevice() {
    if (this.selectedVariant) {
      return;
    }
    const device = [...this.product.associated_device_product];
    if (device) {
      const default_device = device.find(d => {
        return d.color === this.product.default_selected_color
          && d.memory === this.product.default_selected_memory;
      }) || device[0];
      this.selectedVariant = default_device;
    }
  }

  selectColorStorage(device: iPlanDevice) {
    this.selectedColorStorage = {
      color: {
        name: device.color,
        hex: device.color_hexa,
      },
      storage: device.memory,
    };
  }

  selectColor(color: IColor) {
    const device = this.variants.find(d => d.color_hexa === color.hex && d.memory === this.selectedColorStorage?.storage);
    if (device) {
      this.selectedVariant = device;
    }
  }

  selectStorage(storage: string) {
    const device = this.variants.find(d => d.memory === storage && d.color_hexa === this.selectedColorStorage?.color?.hex);
    if (device) {
      this.selectedVariant = device;
    }
  }

  checkStock(sku: string, cb = null) {
    this.isLoading = true;
    if (!isNullOrUndefined(this.stockCache[sku])) {
      this.isInStock = this.stockCache[sku];
      this.isLoading = false;
      this._plansService.updateDeviceStock(sku, {
        "status": true,
        "message": "In stock",
        "in_stock": this.isInStock,
      });
      return;
    }
    return this._deviceService.getDeviceStock(sku)
      .pipe(
        finalize(() => this.isLoading = false)
      )
      .subscribe(resp => {
        this.isInStock = !!resp?.in_stock;
        this.stockCache[sku] = this.isInStock;
        this._plansService.updateDeviceStock(sku, resp);
      }, err => {
        this._plansService.updateDeviceStock(sku, err);
      });
  }

  selectDevice() {
    if (!this.isDisabled) {
      this.onSelectDevice.emit(this.selectedVariant);
    }
  }

  selectVariant(variant: iPlanDevice) {
    this.onSelectVariant.emit(variant);
  }

}
