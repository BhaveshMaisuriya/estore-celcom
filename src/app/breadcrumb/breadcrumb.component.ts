import { Component, OnInit, Input } from '@angular/core';
import { BreadcrumbModel } from '../Model/breadcrumb.model';
import { BreadcrumbService } from './breadcrumb.service';
import { BaseComponent } from '../base.component';
import { ContentNavigation } from '../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../Service/redirection.service';

@Component({
  selector: 'app-breadcrumb-component',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
  providers: [BreadcrumbService, RedirectionService]
})

export class BreadcrumbComponent extends BaseComponent implements OnInit {

  @Input() data: any;  // breadcrumbResponse
  @Input() apiUrl: any;
  public BreadcrumbResponse = null;
  public isCSAgent = "";
  public csAgent = "cs-agent";
  public notCSAgent = "not-cs-agent";
  public BreadcrumbInfo: Array<BreadcrumbModel>;
  constructor(private _service: BreadcrumbService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService
  ) {
    super();
    this.BreadcrumbInfo = Array<BreadcrumbModel>();
  }

  ngOnInit() {
    this.Init();
  }

  public Init() {
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.isCSAgent = this.csAgent;
    } else {
      this.isCSAgent = this.notCSAgent;
    }
    if (this.apiUrl) {
      const url = "/" + this.apiUrl;
      this._service.Find(url).subscribe(
        (data: any) => {
          if ((data.Items !== null) && (data.Items.length !== 0)) {
            const length = data.Items.length;
            data.Items.forEach((item: any, index) => {
              const obj = new BreadcrumbModel(index, item.title, item.api, item.alias, length);
              this.BreadcrumbInfo.push(obj);
            });
            // For Last Object of Breadcrumb
            const obj = new BreadcrumbModel(length, data.PageTitle, '', '', length);
            obj.IsLast = true;
            this.BreadcrumbInfo.push(obj);
          }
        });
    }
  }

  public ManageContentNavigation(data: any) {
    if (data != null) {
      const obj = new ContentNavigation().ManagePageRedirection(data);
      this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
    }
  }
}

