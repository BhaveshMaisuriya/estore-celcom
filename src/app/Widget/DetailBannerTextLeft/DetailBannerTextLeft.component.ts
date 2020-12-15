import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailBannerTextLeftService } from "./DetailBannerTextLeft.service";
import { AppWidgetComponent } from '../../Model/app.widget.component';
import { BaseComponent } from '../../base.component';
import { ContentNavigation } from '../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../Service/redirection.service';

@Component({
  selector: 'app-DetailBannerTextLeft',
  templateUrl: './DetailBannerTextLeft.component.html',
  styleUrls: ['./DetailBannerTextLeft.component.css'],
  providers: [DetailBannerTextLeftService, RedirectionService]
})
export class DetailBannerTextLeftComponent extends BaseComponent implements AppWidgetComponent, OnInit {
  @Input() data: any;
  public DetailBannerTextLeftResponse = null;

  constructor(private detailbannertextleftservice: DetailBannerTextLeftService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService) {
    super();
  }


  ngOnInit() {
    this.Init();
  }

  private Init() {
    if (this.data && this.data.Api !== "undefined") {     // componentList API for this particular page navigation
      const apiUrl = "/" + this.data.Api;
      this.detailbannertextleftservice.Find(apiUrl).subscribe(
        (response: any) => {     // component Item response from the service
          this.DetailBannerTextLeftResponse = response.Items[0];
          this.DetailBannerTextLeftResponse.BannerImage = this.ApiUrl + this.DetailBannerTextLeftResponse.BannerImage;
          this.DetailBannerTextLeftResponse.MobileImage = this.ApiUrl + this.DetailBannerTextLeftResponse.MobileImage;
        });
    }
  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }
}
