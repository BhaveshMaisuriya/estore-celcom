import { Component, OnInit, Input } from '@angular/core';
import { FooterService } from '../footer.service';
import { SocialMediaLinks } from './socialmedialinks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../Service/redirection.service';
import { ContentNavigation } from '../../Model/contentnavigation.model';
import { CompliantType, AppItemsType } from '../footer.model';
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'socialmedialinks-component',
  templateUrl: './socialmedialinks.component.html',
  providers: [SocialMediaLinks, RedirectionService],
  styleUrls: ["./socialmedia.component.css"]
})
export class SocialMediaComponent implements OnInit {
  public SocialMediaLinksInfoList = null;
  public SocialMediaLinksIconsFb = null;
  public SocialMediaLinksInfoTitle: string;
  public SocialMediaLinksInfoTwitter: AppItemsType;
  public SocialMediaLinksInfoFb: AppItemsType;
  public SocialMediaLinksInfoInsta: AppItemsType;
  public SocialMediaLinksInfoYoutube: AppItemsType;
  public CompliantInfo: CompliantType;
  public FbIcon: string;
  public InstaIcon: string;
  public TwitterIcon: string;
  public YoutubeIcon: string;
  public freeContentResponse: any;

  @Input() data: any;
  constructor(private _service: FooterService,
    private _redirectionService: RedirectionService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.Init();
  }
  public Init() {
    const contentList = this._service.GetFooterContents();
    if (contentList && contentList[1] && contentList[1]['below']) {
      this.SocialMediaLinksInfoList = contentList[1]['below'] || [];
      this.SocialMediaLinksInfoFb = this.SocialMediaLinksInfoList[0] || {};
      this.SocialMediaLinksInfoTwitter = this.SocialMediaLinksInfoList[1] || {};
      this.SocialMediaLinksInfoInsta = this.SocialMediaLinksInfoList[2] || {};
      this.SocialMediaLinksInfoYoutube = this.SocialMediaLinksInfoList[3] || {};
    }
    if (contentList && contentList[1] && contentList[1]['below'] && contentList[1]['below'][0]['menu_icon']) {
      this.FbIcon = this.SocialMediaLinksInfoList[0]['menu_icon'] || {};
      this.TwitterIcon = this.SocialMediaLinksInfoList[1]['menu_icon'] || {};
      this.InstaIcon = this.SocialMediaLinksInfoList[2]['menu_icon'] || {};
      this.YoutubeIcon = this.SocialMediaLinksInfoList[3]['menu_icon'] || {};
    }
    if (contentList && contentList[1] && contentList[1]['title']) {
      this.SocialMediaLinksInfoTitle = contentList[1]['title'];
    }
    if (
      contentList &&
      contentList[3] &&
      contentList[3].complianceInfo
    ) {
      this.CompliantInfo = contentList[3].complianceInfo;
      this.freeContentResponse = this.sanitizer.bypassSecurityTrustHtml(this.CompliantInfo.text);

    }
  }
  public ManageContentNavigation(data: any) {
    const objData = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(objData, this._router, this._activatedRoute);
  }
  public defaultOnClick() {
    return false;
  }
}
