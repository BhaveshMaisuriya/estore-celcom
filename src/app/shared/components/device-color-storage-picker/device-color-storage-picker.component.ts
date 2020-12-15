import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {IDeviceAssociatedProduct, iPlanDevice} from "../../models/device.model";

export interface IColor {
  name: string;
  hex: string;
}

@Component({
  selector: 'app-device-color-storage-picker',
  templateUrl: './device-color-storage-picker.component.html',
  styleUrls: ['./device-color-storage-picker.component.scss']
})
export class DeviceColorStoragePickerComponent implements OnInit, OnChanges {

  @Input() productList: iPlanDevice[];
  @Input()
  get selectedProduct() {
    return this._selectedProduct;
  }
  set selectedProduct(value) {
    this._selectedProduct = value;
    this.getAttributeList();
  }

  @Input()  selected: {
    color: IColor;
    storage: string
  };

  @Input() isLoading = false;
  @Input()
  public get additionalAttributes() {
    return this._additionalAttributes;
  }
  
  public set additionalAttributes(v) {
    if (JSON.stringify(v) !== JSON.stringify(this._additionalAttributes)) {
      this._additionalAttributes = v;
      this.attributeList = [
        ...this.attributeList,
        ...v,
      ];
    }
  }

  @Output() onSelectColor: EventEmitter<IColor> = new EventEmitter<IColor>();
  @Output() onSelectStorage: EventEmitter<string> = new EventEmitter<string>();
  // New API
  @Output() onSelectProduct = new EventEmitter<iPlanDevice>();

  _selectedProduct: iPlanDevice;
  colorsList: IColor[];
  selectedColor = null;
  _additionalAttributes;
  attributeList = [
    {
      'attribute': 'memory',
      'label': 'Storage',
      'list': [],
      'selected': null,
    },
    {
      'attribute': 'size',
      'label': 'Size',
      'list': [],
      'selected': null,
    },
  ];

  constructor() { }

  ngOnInit(): void {
    this.getAttributeList();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.productList?.previousValue?.length !== changes.productList?.currentValue?.length) {
      this.getAttributeList();
    }
  }

  getAttributeList() {
    this.selectedColor = this.selectedProduct?.color_hexa;
    this.colorsList = this.getColorsList();
    this.attributeList.forEach((attr, idx) => {
      this.attributeList[idx].list = this.getStringAttributeList(attr.attribute);
      this.attributeList[idx].selected = this.selectedProduct?.[attr.attribute];
    });
  }

  getColorsList(): IColor[] {
    if (!this.productList) {
      return [];
    }

    const colorsSet = new Set(this.productList.map(({color}) => color));
    return Array.from(colorsSet).map(color => ({
      name: color,
      hex: this.productList.find(x => x.color === color).color_hexa
    }));
  }


  getStringAttributeList(attribute: string): string[] {
    if (!this.productList) {
      return [];
    }

    const dataSet = new Set(this.productList.map((device) => device[attribute]));
    return Array.from(dataSet).filter(s => !!s);
  }

  handleSelectColor(ev: Event, color: IColor) {
    if (this.isLoading) {
      return false;
    }
    ev.preventDefault();
    this.onSelectColor.emit(color);
    // New API
    const availableDevices = this.productList?.filter(d => d.color_hexa === color.hex);
    let selectedDevice = availableDevices?.find(d => {
      const prodAttr = this.attributeList.map(att => d[att.attribute]).join('');
      const localAttr = this.attributeList.map(att => this.selectedProduct[att.attribute]).join('');
      const condition = d.color_hexa === color.hex
        && localAttr === prodAttr;
      return condition;
    });
    if (!selectedDevice) {
      selectedDevice = availableDevices[0];
    }
    this.onSelectProduct.emit(selectedDevice);
  }

  handleSelectAttribute(ev: Event, attribute: string, value: string) {
    if (this.isLoading) {
      return false;
    }
    ev.preventDefault();
    const selectedDevice = this.productList?.find(d => d.color_hexa === this.selectedProduct?.color_hexa && d[attribute] === value);
    if (selectedDevice) {
      this.onSelectProduct.emit(selectedDevice);
    }
  }

  isAttributeAvailable(attribute: string, value: string) {
    return this.productList?.find(p => p[attribute] === value && p.color_hexa === this.selectedProduct?.color_hexa);
  }
}