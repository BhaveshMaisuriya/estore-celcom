import { Component, OnInit , Input } from '@angular/core';
import { BaseComponent } from '../../base.component';
import { ContentNavigation } from '../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../Service/redirection.service';
import { TableComparisionService } from './table-comparison.service';

@Component({
  selector: 'app-table-comparison',
  templateUrl: './table-comparison.component.html',
  styleUrls: ['./table-comparison.component.css'],
  providers: [RedirectionService, TableComparisionService]
})
export class TableComparisonComponent extends BaseComponent implements OnInit {
  @Input() data: any;
  public TableComparisonResponse = null;
  public XpaxTableComparisonResponse = null;
  public XPaxTabData = [];
  public SelectedTab = "";
  public DesktopBackgroundImage;
  public MobileBackgroundImage;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _service: TableComparisionService
  ) {
    super();
    // this.XpaxTableComparisonResponse = [];
  }

  ngOnInit() {
    this.Init();
  }

  private Init() {
    if (this.data && this.data.Api !== undefined) {
      const url = "/" + this.data.Api + "?_format=hal_json";
      if (this.data.Desktop) {
        this.DesktopBackgroundImage = this.data.Desktop.img;
      }
      if (this.data.Mobile) {
        this.MobileBackgroundImage = this.data.Mobile.img;
      }
      this._service.Find(url).subscribe(
        (response: any) => {
          this.TableComparisonResponse = response.Items;
          // to check if it is XPAX template.
          if (this.IsXpax === false) {
            this.TableComparisonResponse.forEach((itemParent: any, index) => {
              itemParent.AtrHref = "#rm-" + index;
              itemParent.TableInfo.forEach((item: any, index) => {
                item.Id = index;
                item.HrefId = "rm-" + index;
              });
            });
          } else {
            this.FindXPaxTabData();
            this.PlanTableBind();
          }
        });
    }
  }

  private PlanTableBind() {
    this.TableComparisonResponse.forEach((tabItem: any, index) => {
      if (tabItem.TabTitle === this.SelectedTab) {
        this.XpaxTableComparisonResponse = tabItem.TableInfo;
        this.XpaxTableComparisonResponse.forEach((item: any, index) => {
          item.AtrHref = "#rm-" + index;
          if (item.PlanInfo !== undefined) {
            item.PlanInfo.forEach((itemPlanInfo: any, index) => {
              item.Id = index;
              item.HrefId = "rm-" + index;
            });
          }
        });
      }
    });
  }

  private FindXPaxTabData() {
    this.TableComparisonResponse.forEach((item: any, index: number) => {
      if (index > 0) {
        if (item.TabTitle !== '') {
          this.XPaxTabData.push({
            title: item.TabTitle,
            active: false
          });
        }
      } else {
        this.SelectedTab = item.TabTitle;
        if (item.TabTitle !== '') {
          this.XPaxTabData.push({
            title: item.TabTitle,
            active: true
          });
        }
      }
    });
  }
  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public OnTabSelectFromChildComponent(result: any) {
    this.SelectedTab = result.title;
    this.PlanTableBind();
  }
}
