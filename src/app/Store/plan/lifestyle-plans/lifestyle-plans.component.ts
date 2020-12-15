import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { BaseComponent } from "../../../base.component";
import { AppService } from "../../../Service/app.service";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { LifestylePlansService } from "../lifestyle-plans/lifestyle-plans.service";
import { Subscription } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { GetParametersService } from '../../../Service/getParamaters.service';

@Component({
  selector: 'app-lifestyle-plans',
  templateUrl: './lifestyle-plans.component.html',
  styleUrls: ['./lifestyle-plans.component.css'],
  providers: [LifestylePlansService]
})
export class LifestylePlansComponent extends BaseComponent implements OnInit {
@Input() addOnData: any;
@Output() onAgreeTC = new EventEmitter();
private subscriber: Subscription;
public ispromotiondetails: any = null;
public isLifestyleValue: any = null;
deactivateAddon = true;
adaCookie = false;
addOnDataObj = {
  // addons: {
  addons: {
    title: "",
    items: []
  }
};
addOnSelectionData = {
  isSelected: false,
  code: ''
};
  constructor(
    private _deviceDataService: DeviceDataService,
    private _service: AppService,
    private cookieService: CookieService,
    private _lifestylePlansService: LifestylePlansService,
    private getParamsService: GetParametersService
  ) {
    super();
  }

  ngOnInit() {
    this.subscriber = this._deviceDataService.deactivateLifestyleAddons$.subscribe(data => {
      if (this.addOnData.addons && this.addOnData.addons.version && this.addOnData.addons.version !== "V2") {
        this.deactivateAddon = data;
      }
    });

    // Call to render addon function on component initialization.
    this.renderAddon();
    // Select addon based on promotion details.
    this.ispromotiondetails = this.getParamsService.getParameterByName('promotiondetails');
    this.isLifestyleValue = this.getParamsService.getParameterByName('LS');
    if (this.ispromotiondetails !== null || this.isLifestyleValue !== null) {
      this.deactivateAddon  = true;
      this.addOnSelectionData.isSelected = true;
    }
    if (this.cookieService.check('adaRemainingDays')) {
      this.adaCookie = true;
      const event = {
        target : {
          checked: true,
        }
      };
      this.termsCheck(event);
    }
    if (localStorage && localStorage.getItem("lifestylePlans")) {
      this.addOnSelectionData.isSelected = JSON.parse(localStorage.getItem("lifestylePlans")) || this.adaCookie;
      this.onAgreeTC.emit(this.addOnSelectionData);
    }
    if (localStorage && localStorage.getItem("lifestyleCOBP")) {
      this.addOnSelectionData.isSelected = JSON.parse(localStorage.getItem("lifestyleCOBP")) || this.adaCookie;
      if (this.addOnSelectionData.isSelected) {
        localStorage.setItem("addonCode", this.addOnSelectionData.code);
      } else {
        if (localStorage && localStorage.getItem("addonCode")) {
          localStorage.removeItem("addonCode");
        }
      }
      this._deviceDataService.publishLifestylePlans(this.addOnSelectionData.isSelected);
      localStorage.setItem("lifestylePlans", JSON.stringify(this.addOnSelectionData.isSelected));
      localStorage.removeItem("lifestyleCOBP");
      this.onAgreeTC.emit(this.addOnSelectionData);
    }
    if (localStorage && localStorage.getItem("lifestyleEDIT")) {
      this.addOnSelectionData.isSelected = JSON.parse(localStorage.getItem("lifestyleEDIT"));
      if (this.addOnSelectionData.isSelected) {
        localStorage.setItem("addonCode", this.addOnSelectionData.code);
      } else {
        if (localStorage && localStorage.getItem("addonCode")) {
          localStorage.removeItem("addonCode");
        }
      }
      this._deviceDataService.publishLifestylePlans(this.addOnSelectionData.isSelected);
      localStorage.setItem("lifestylePlans", JSON.stringify(this.addOnSelectionData.isSelected));
      localStorage.removeItem("lifestyleEDIT");
      this.onAgreeTC.emit(this.addOnSelectionData);
    }
  }
  // Fucntion to render lifestyle addon by reading Input addOnData.
  renderAddon() {
    // if (this.addOnData.addons !== undefined) {
    if (this.addOnData.addons !== undefined) {
      this.addOnDataObj = this.addOnData;
    }
    this.addOnSelectionData.isSelected = false;
    // this.addOnSelectionData.code = this.addOnDataObj.addons.items[0].code;
    this.addOnSelectionData.code = this.addOnDataObj.addons.items[0].code;
    this.onAgreeTC.emit(this.addOnSelectionData);
  }
  termsCheck(event) {
    // Add on selection based on checkbox toggle.
    if (event.target.checked) {
      this.addOnSelectionData.isSelected = true;
      if (typeof window !== 'undefined' && localStorage) {
        localStorage.setItem("addonCode", this.addOnSelectionData.code);
      }
    } else {
      this.addOnSelectionData.isSelected = false;
      if (typeof window !== 'undefined' && localStorage) {
        if (localStorage && localStorage.getItem("addonCode")) {
          localStorage.removeItem("addonCode");
        }
      }
    }
    // If Lifestyle 2.0 is enabled then do not set lifestyle 1.0
    if (this.ispromotiondetails === null || this.isLifestyleValue === null) {
      this._deviceDataService.publishLifestylePlans(this.addOnSelectionData.isSelected);
      localStorage.setItem("lifestylePlans", JSON.stringify(this.addOnSelectionData.isSelected));
    }
    this.onAgreeTC.emit(this.addOnSelectionData);
  }
}
