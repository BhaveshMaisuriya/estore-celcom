import { Component, OnInit, Input } from "@angular/core";
import { FooterService } from "../footer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RedirectionService } from "../../Service/redirection.service";
import { ContentNavigation } from "../../Model/contentnavigation.model";
import { PostPaidAppType } from "../footer.model";


@Component({
  selector: "footer-download",
  templateUrl: "./download.component.html",
  styleUrls: ["./download.component.css"],
  providers: [RedirectionService]
})
export class FooterDownloadComponent implements OnInit {
  public DownloadInfo: any;
  public PostPaidAppInfo: PostPaidAppType;
  @Input() data: any;
  constructor(
    private _service: FooterService,
    private _redirectionService: RedirectionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.Init();
  }
  public Init() {
    this.DownloadInfo = this._service.GetFooterContents();
    if (
      this.DownloadInfo &&
      this.DownloadInfo[4] &&
      this.DownloadInfo[4].postpaidApps
    ) {
      this.PostPaidAppInfo = this.DownloadInfo[4].postpaidApps;
    }
  }
  public ManageContentNavigation(data: any) {
    const objData = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(
      objData,
      this._router,
      this._activatedRoute
    );
  }
  getUrl(url: string) {
    return 'url(' + url + ')';
  }
  public defaultOnClick() {
    return false;
  }
}
