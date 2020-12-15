import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ChangeDetectorRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { iPlanDeviceBundle, iPlanDevice } from 'app/shared/models/device.model';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';
import { MoonDeviceCardComponent } from '../moon-device-card/moon-device-card.component';
import { isNullOrUndefined } from 'app/shared/utilities/helper.ultility';

@Component({
  selector: 'app-moon-device-card-wrapper',
  templateUrl: './moon-device-card-wrapper.component.html',
  styleUrls: ['./moon-device-card-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MoonDeviceCardWrapperComponent implements OnInit, AfterViewInit {
  _data: iPlanDeviceBundle[];
  @Input()
  get data() {
    return this._data;
  }

  set data(value) {
    const existingVal = this.data?.map(p => `${p.sku}|${p.price}`);
    const newVal = value?.map(p => `${p.sku}|${p.price}`);
    if (existingVal?.join('') !== newVal?.join('')) {
      this._data = value.filter(d => d.sku?.length > 0);
    }
  }
  @Input() selectedBundleSku: string;
  @Input() selectedSku: string;
  @Input() isLoading = true;
  @Input() disabled = false;
  @Input() ignoreError = false;

  @Output() onSelect = new EventEmitter<{deviceBundle: iPlanDeviceBundle, device: iPlanDevice}>();

  @ViewChild('myCarousel') myCarousel: NguCarousel<iPlanDeviceBundle>;
  carouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 2, lg: 2, all: 0 },
    load: 3,
    touch: true,
  };

  loadingType: 'spinner' | 'shimmer' = 'shimmer';

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  selectVariant(deviceBundle: iPlanDeviceBundle, device: iPlanDevice) {
    // const findDevice = deviceBundle.associated_device_product.find(d => d.sku === this.selectedSku);
    if (deviceBundle.sku === this.selectedBundleSku) {
      const hasInvalidPricing = !!isNullOrUndefined(device?.prices?.device_price);
      // Device card with invalid pricing config cannot be selected
      if (hasInvalidPricing && !this.ignoreError) {
        this.selectDevice(null, null);
      } else {
        this.selectDevice(deviceBundle, device);
      }
    }
  }

  selectDevice(deviceBundle: iPlanDeviceBundle, device: iPlanDevice) {
    if (this.selectedSku !== device?.sku && !this.disabled && !this.isLoading) {
      this.onSelect.emit({deviceBundle, device});
      // this.checkStock(sku).subscribe(resp => );
    }
  }

  reset() {
    this.myCarousel.reset(false);
  }

  moveTo(slide) {
    this.myCarousel.moveTo(slide, false);
  }

  hasInvalidPricing(deviceCard: MoonDeviceCardComponent) {
    return !!isNullOrUndefined(deviceCard?.selectedVariant?.prices?.device_price);
  }

}
