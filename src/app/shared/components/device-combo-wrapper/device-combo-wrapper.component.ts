import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ChangeDetectionStrategy, ViewRef } from '@angular/core';
import {
  iPlanDevice,
  IDeviceDetailResponseItem,
  iPlanDeviceBundle,
  COMBO_DEVICE_TYPE_ACCESSORY,
} from 'app/shared/models/device.model';
import { iOmniCampaign } from 'app/shared/models/plan.model';
import { isNullOrUndefined } from 'app/shared/utilities/helper.ultility';
import { DeviceDetailPageService } from 'app/pages/device-detail-page/device-detail-page.service';
import { finalize, tap, map, first } from 'rxjs/operators';
import { PlansService } from 'app/Service/plans.service';
import { trigger, transition, style, animate, group } from '@angular/animations';
import { ICardOptions } from 'app/shared/models/general.model';
import { Observable } from 'rxjs';
import { PlansQuery } from 'app/Widget/side-summary/side-summary-container/plans.store';

@Component({
  selector: '[app-device-combo-wrapper]',
  templateUrl: './device-combo-wrapper.component.html',
  styleUrls: ['./device-combo-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({ 
          opacity: 0,
          overflow: 'visible',
          height: 0,
        }),
        group([
          animate('200ms', style({
            height: '*',
          })),
          animate('500ms ease-in', style({
            opacity: 1,
          })),
        ]),
      ]),
      transition(':leave', [
        animate('100ms', style({
          opacity: 0,
          height: 0,
        }))
      ])
    ]),
  ]
})
export class DeviceComboWrapperComponent implements OnInit {

  @Input()
  get response() {
    return this._data;
  }
  set response(value) {
    if (value) {
      this._data = {
        ...value,
        combo_products: value.combo_products?.filter(p => !!p?.items?.basic_details?.sku),
      };
      if (!this.contentInit) {
        this.setDisplayedProduct(value);
        this.contentInit = true;
      }
      this.isComboPhone = value.combo_type !== COMBO_DEVICE_TYPE_ACCESSORY;
    }
  }
  @Input() campaignOmni: iOmniCampaign;

  @Input()
  get selectedDevice() {
    return this._selectedDevice;
  }

  set selectedDevice(value) {
    if (this.selectedDevice?.sku !== value?.sku) {
      this._selectedDevice = value;
      this.setImages();
    }
  }

  @Input()
  get selectedDeviceCombo() {
    return this._selectedDeviceCombo;
  }

  set selectedDeviceCombo(value) {
    if (this.selectedDeviceCombo?.sku !== value?.sku) {
      this._selectedDeviceCombo = value;
      this.comboDevice = this.getBundleFromSKU(this.selectedDeviceCombo?.sku)?.items;
      this.populateAvailableCombo();
      this.setImages();
      this.onTabClick(this.isMainTabSelected, true);
      this.showDeviceSelection = false;
    }
  }

  @Input() isPreorder = false;
  @Input() isLoading = false;

  @Input() devicePrice = 0;

  @Output() onOpenFeaturesSpecsClick = new EventEmitter<boolean>();
  @Output() onSelectProduct = new EventEmitter();
  @Output() onSelectProductCombo = new EventEmitter();

  _data: IDeviceDetailResponseItem;
  comboDevice: IDeviceDetailResponseItem;
  _selectedDevice: iPlanDevice;
  _selectedDeviceCombo: iPlanDevice;
  images: string[];
  displayedProduct: IDeviceDetailResponseItem;
  isCheckingStock = false;
  stockCache: {
    [sku: string]: boolean;
  } = {};

  isMainTabSelected;
  
  roiDevice: any;
  availableROI = [
    {
      bundleSKU: 'iphone-12',
      roiSKU : 'iphone-12-roi'
    },
    {
      bundleSKU: 'iphone-12-mini',
      roiSKU: 'iphone-12-roi'
    },
    {
      bundleSKU: 'iphone-12-pro',
      roiSKU: 'iphone-12-pro-roi'
    },
    {
      bundleSKU: 'iphone-12-pro-max',
      roiSKU: 'iphone-12-pro-roi'
    }
  ];

  showDeviceSelection = false;

  availableComboDevices: ICardOptions[];
  isComboPhone = false;
  contentInit = false;
  devicePrice$: Observable<number>;

  constructor(
    private _deviceService: DeviceDetailPageService,
    private _plansService: PlansService,
    private cdr: ChangeDetectorRef,
    private _planQuery: PlansQuery,
  ) { }

  ngOnInit(): void {
    this.isMainTabSelected = true;
    this.devicePrice$ = this._planQuery.select(store => store.device_price);
  }

  openFeaturesSpecs() {
    this.onOpenFeaturesSpecsClick.emit(true);
  }

  checkDeviceforROI() {
    this.roiDevice = this.availableROI?.find(sku => {
      return sku?.bundleSKU === this.response?.basic_details?.sku
    });

    if (!this.roiDevice || !this.isPreorder) {
      return true;
    }

    return !!this.stockCache[this.selectedDevice?.sku];
  }

  getDeviceStock(sku: string) {
    if (this.isLoading || this.isCheckingStock || !sku) {
      return (false);
    }
    if (this.isPartOfMainBundle(sku) && this.isPreorder) {
      const preorderDataDeviceLevel = this.selectedDevice?.pre_order_data;
      const preOrderStock = !!preorderDataDeviceLevel.preorder_stock_status_flag &&
      (
        preorderDataDeviceLevel.preorder_availble_stock_in_hand > 0 ||
        preorderDataDeviceLevel.preorder_stock_available_quantity > 0
      );

      this.stockCache[sku] = preOrderStock;
      return preOrderStock;
    }
    if (!isNullOrUndefined(this.stockCache[sku])) {
      return (this.stockCache[sku]);
    }
    this.isCheckingStock = true;
    this._deviceService.getDeviceStock(sku)
      .pipe(
        first(),
        finalize(() => this.isCheckingStock = false),
        tap(resp => {
          const in_stock = !!resp?.in_stock;
          this.stockCache[sku] = in_stock;
          const res = {
            in_stock,
            message: '',
            status: true,
          };
          const partOfMainBundle = this.isPartOfMainBundle(sku);
          if (partOfMainBundle) {
            this._plansService.updateDeviceStock(sku, res);
          } else {
            this._plansService.updateDeviceComboStock(sku, res);
          }
          if (this.cdr && !(this.cdr as ViewRef).destroyed) {
            this.cdr.detectChanges();
          }
        }),
        map(resp => {
          return !!resp?.in_stock;
        }),
      ).subscribe();
    return false;
  }

  isPartOfMainBundle(sku: string) {
    return !!this.response?.associated_product?.find(d => d.sku === sku);
  }

  onSelectProductClick(device) {
    if (this.isMainTabSelected) {
      this.onSelectProduct.emit(device);
    } else {
      const bundle: iPlanDeviceBundle = this.getBundleFromSKU(device?.sku)?.items.basic_details;
      this.onSelectProductCombo.emit({device, bundle});
    }
  }

  onChooseComboClick(sku: string) {
    const bundle: iPlanDeviceBundle = this.response?.combo_products?.find(d => {
      return d.items?.basic_details?.sku === sku;
    })?.items?.basic_details;
    if (bundle) {
      const bundleData = this.response?.combo_products?.find(b => b.items?.basic_details?.sku === bundle?.sku);
      const device = bundleData?.items?.associated_product?.find(d => d?.['is_default'] === '1')
        || bundleData?.items?.associated_product?.[0];
      this.onSelectProductCombo.emit({device, bundle});
    }
  }

  setDisplayedProduct(data: IDeviceDetailResponseItem) {
    if (data) {
      this.displayedProduct = data;
      this.setImages();
    }
  }

  setImages() {
    let device;
    if (this.isMainTabSelected) {
      device = this.selectedDevice;
    } else {
      device = this.selectedDeviceCombo;
    }
    this.images = device?.sub_images;
  }

  onTabClick(mainTab = true, force = false) {
    if (mainTab === this.isMainTabSelected && !force) {
      return;
    }
    this.isMainTabSelected = mainTab;
    if (this.isMainTabSelected) {
      this.setDisplayedProduct(this.response);
      this.showDeviceSelection = false;
    } else {
      this.setDisplayedProduct(this.comboDevice);
    }
  }

  getBundleFromSKU(device_sku: string) {
    return this.response?.combo_products?.find(d => {
      return d.items?.associated_product?.find(dev => dev.sku === device_sku);
    });
  }

  get isComboLayout() {
    return this.response?.combo_products?.length > 0;
  }

  onToggleEditComboDevice(event?: Event) {
    event?.preventDefault();
    this.showDeviceSelection = !this.showDeviceSelection;
  }

  populateAvailableCombo() {
    // [
    //   {
    //       image: 'https://estore-03.celcom.com.my/media/catalog/product/f/r/front_900x900_8.png',
    //       label: 'Samsung Galaxy A11',
    //       value: 'apple-watch-se-AB'
    //   },
    //   {
    //       image: 'https://estore-03.celcom.com.my/media/catalog/product/f/r/front_900x900_8.png',
    //       label: 'Samsung Galaxy A01',
    //       value: 'easyPhone'
    //   },
    //   {
    //       image: 'https://estore-03.celcom.com.my/media/catalog/product/f/r/front_900x900_8.png',
    //       label: 'Oppo A12',
    //       value: 'easyPhone'
    //   },
    //   {
    //       image: 'https://estore-03.celcom.com.my/media/catalog/product/f/r/front_900x900_8.png',
    //       label: 'Vivo Y11',
    //       value: 'easyPhone'
    //   }
    // ]
    this.availableComboDevices = this.response?.combo_products?.map(d => {
      const defaultProduct = d.items?.associated_product?.find(d => d?.['is_default'] === '1') || d.items?.associated_product?.[0];
      const image = d.items?.basic_details?.main_image || defaultProduct?.image;
      return {
        image,
        label: d.items?.basic_details?.name,
        value: d.items?.basic_details?.sku,
      }
    });
  }

}
