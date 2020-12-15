import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bb-device-name-price',
  templateUrl: './bb-device-name-price.component.html',
  styleUrls: ['./bb-device-name-price.component.css']
})
export class BbDeviceNamePriceComponent implements OnInit {
  @Input() price: any;
  bbBundleBasicDetails: any = null;
  constructor() { }

  ngOnInit() {
  }

}
