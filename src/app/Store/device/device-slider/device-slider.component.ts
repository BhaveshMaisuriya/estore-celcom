import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../../base.component';

@Component({
  selector: 'app-device-slider-component',
  templateUrl: './device-slider.component.html',
  styleUrls: ['./device-slider.component.css']
})
export class DeviceSliderComponent extends BaseComponent implements OnInit {

  @Input() data: any;
  public SliderList = [];
  public ColourList = [];
  public colorName: any;
  constructor(
  ) {
    super();
  }

  ngOnInit() {

    if (typeof (this.data.sub_images) !== "undefined") {
      this.data.sub_images.forEach(item => {
        this.SliderList.push(item);
      });
    } else {
      // After color selection
      this.data.forEach((item) => {
        let existingColor;
        this.colorName = item.color;
        // Do not push if already exists.
        if (this.ColourList.length > 0) {
          this.ColourList.forEach(element => {
            if (element === this.colorName) {
              existingColor = element;
            } else {
              return;
            }
          });
        }
        if (!existingColor) {
          item.sub_images.forEach((subItem) => {
            this.SliderList.push(subItem);
            this.ColourList.push(this.colorName);
          });
        }
      });
    }
  }
}
