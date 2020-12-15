import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
// import { DeviceDetailsStorageService } from "./device-details-color-storage.service";
import { AppWidgetComponent } from '../../../../Model/app.widget.component';
import { BaseComponent } from '../../../../base.component';
import { ContentNavigation } from '../../../../Model/contentnavigation.model'
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../../Service/redirection.service'
import { DeviceDataService } from '../../../../Service/devicedata.service';

@Component({
  selector: 'device-details-more-details',
  templateUrl: './device-details-more-details.component.html',
  styleUrls: ['./device-details-more-details.component.css'],
  providers: [DeviceDataService, RedirectionService]
})
export class DeviceMoreDetailsComponent extends BaseComponent implements AppWidgetComponent, OnInit {
  @Input() data: any;
  @Output() CloseMoreDetailsPopup = new EventEmitter();
  public DeviceMoreDetailsResponse = null;
  public DeviceName: string = null;
  IsDetailsAndTermsClosed: boolean;
  public DeviceTermsResponse: any = null;
  constructor(
    // private
    // devicedetailstorageservice:DeviceDetailsStorageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _devicedata: DeviceDataService
  ) {
    super();
  }

  ngOnInit() {
    this.Init();
  }

  private Init() {
    this._devicedata.currentMessage.subscribe(message => this.IsDetailsAndTermsClosed = message);
    if (this.data && this.data !== undefined) {
      this.DeviceName = (this.data.basic_details !== undefined) ? this.data.basic_details.name : this.data.name;
      this.DeviceMoreDetailsResponse = this.data.more_details;
      this.DeviceTermsResponse = this.data.terms_and_condition;
      document.getElementById("keyFeat_terms_Modal").style.display = "block";
    }
  }

  public closeBox() {
    this.CloseMoreDetailsPopup.emit();
  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public defaultOnClick() {
    return false;
  }
}
