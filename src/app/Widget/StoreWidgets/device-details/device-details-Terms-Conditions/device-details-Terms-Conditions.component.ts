import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import { map } from "rxjs/operators";
import {AppWidgetComponent} from '../../../../Model/app.widget.component';
import {BaseComponent} from '../../../../base.component';
import {ContentNavigation} from '../../../../Model/contentnavigation.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RedirectionService} from '../../../../Service/redirection.service';

@Component({
  selector: 'device-details-terms-condition',
  templateUrl: './device-details-Terms-Conditions.component.html',
  styleUrls: ['./device-details-Terms-Conditions.component.css'],
  providers: [RedirectionService]
})
export class DeviceTermsConditionsComponent extends BaseComponent implements AppWidgetComponent, OnInit {
  @Input() data: any;
  @Output() CloseTermsAndConditionsPopup = new EventEmitter();
  public DeviceTermsResponse = null;

    constructor(
      private _router: Router,
      private _activatedRoute: ActivatedRoute,
      private _redirectionService: RedirectionService
    ) {
      super();
    }

    ngOnInit() {
      this.Init();
    }

    private Init() {
      if (this.data && this.data !== undefined) {
        this.DeviceTermsResponse = this.data;
        document.getElementById("keyFeat_terms_Modal").style.display = "block";
      }
    }

    public closeTermsBox() {
      this.CloseTermsAndConditionsPopup.emit();
    }

    public ManageContentNavigation(data: any) {
      const obj = new ContentNavigation().ManagePageRedirection(data);
      this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
   }

   public defaultOnClick() {
    return false;
  }
}
