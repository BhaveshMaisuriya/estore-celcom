/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppService } from '../../Service/app.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RedirectionService } from '../../Service/redirection.service';
import { Broadcaster } from "../../Model/broadcaster.model";
import { FooterService } from "../footer.service";
import { NotificationPopupEvent } from "../../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { SocialMediaComponent } from './socialmedia.component';

describe('SocialMediaComponent', () => {
  let component: SocialMediaComponent;
  let fixture: ComponentFixture<SocialMediaComponent>;
  // let service:FooterService;
  // class MockFooterService{

  // }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialMediaComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[FooterService,AppService,RedirectionService,Broadcaster,NotificationPopupEvent,CookieService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMediaComponent);
    component = fixture.componentInstance;
  });
  it('Should Create component',()=>{
    expect(component).toBeTruthy();
  })
  it('Should test ngoninit', inject([FooterService],(footerService:FooterService) => {
    footerService.footerContents = [{"title":"MyCelcom Postpaid App","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"App Store","uri":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","alias":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","absolute":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","absolute_path":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Google Play","uri":"http://bit.ly/2TLX3mr","alias":"http://bit.ly/2TLX3mr","absolute":"http://bit.ly/2TLX3mr","absolute_path":"http://bit.ly/2TLX3mr","external":true,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]},{"title":"Connect with us","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Facebook","uri":"https://www.facebook.com/celcom/","alias":"https://www.facebook.com/celcom/","absolute":"https://www.facebook.com/celcom/","absolute_path":"https://www.facebook.com/celcom/","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Facebook.svg"}},{"title":"Twitter","uri":"https://twitter.com/celcom","alias":"https://twitter.com/celcom","absolute":"https://twitter.com/celcom","absolute_path":"https://twitter.com/celcom","external":true,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Twitter.svg"}},{"title":"Instagram","uri":"https://www.instagram.com/celcom/","alias":"https://www.instagram.com/celcom/","absolute":"https://www.instagram.com/celcom/","absolute_path":"https://www.instagram.com/celcom/","external":true,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Instagram.svg"}},{"title":"YouTube","uri":"https://www.youtube.com/user/CelcomChannel","alias":"https://www.youtube.com/user/CelcomChannel","absolute":"https://www.youtube.com/user/CelcomChannel","absolute_path":"https://www.youtube.com/user/CelcomChannel","external":true,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Youtube.svg"}}]},{"copyright":"Copyright 2019. Celcom Axiata Berhad [167469-A]. All Rights Reserved."},{"complianceInfo":{"icon":"/sites/default/files/cms_content_images/footerimages/redress-batch.png","url":"http://complaint.cfm.my/","text":"Redress your complaints at the<br/>Consumer Forum Malaysia (CFM)"}},{"postpaidApps":{"postpaidAppsCheck":1,"title":"Our Official App","celcom_life_icon":"/sites/default/files/cms_content_images/footerimages/Celcom%20Color_0.svg","celcom_life_text":"Celcom Life","items":[{"title":"Google Play","icon":"/sites/default/files/cms_content_images/footerimages/google-play-badge.18196bcb1e2c239de8bd.svg","url":"http://bit.ly/2TLX3mr "},{"title":"Apple Store","icon":"/sites/default/files/cms_content_images/footerimages/apps-store-icon.a810e15f233a96f8f5b0.svg","url":"http://bit.ly/2TLX3mr "}]}}];
    component.ngOnInit();
    expect(component.SocialMediaLinksInfoList.length).toBe(4);
    expect(component.SocialMediaLinksInfoFb.title).toBe('Facebook');
    expect(component.SocialMediaLinksInfoTwitter.title).toBe('Twitter');
    expect(component.SocialMediaLinksInfoInsta.title).toBe('Instagram');
    expect(component.SocialMediaLinksInfoYoutube.title).toBe('YouTube');
  }));

  //[{"title":"MyCelcom Postpaid App","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"App Store","uri":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","alias":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","absolute":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","absolute_path":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Google Play","uri":"http://bit.ly/2TLX3mr","alias":"http://bit.ly/2TLX3mr","absolute":"http://bit.ly/2TLX3mr","absolute_path":"http://bit.ly/2TLX3mr","external":true,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]},{"title":"Connect with us","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Facebook","uri":"https://www.facebook.com/celcom/","alias":"https://www.facebook.com/celcom/","absolute":"https://www.facebook.com/celcom/","absolute_path":"https://www.facebook.com/celcom/","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Facebook.svg"}},{"title":"Twitter","uri":"https://twitter.com/celcom","alias":"https://twitter.com/celcom","absolute":"https://twitter.com/celcom","absolute_path":"https://twitter.com/celcom","external":true,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Twitter.svg"}},{"title":"Instagram","uri":"https://www.instagram.com/celcom/","alias":"https://www.instagram.com/celcom/","absolute":"https://www.instagram.com/celcom/","absolute_path":"https://www.instagram.com/celcom/","external":true,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Instagram.svg"}},{"title":"YouTube","uri":"https://www.youtube.com/user/CelcomChannel","alias":"https://www.youtube.com/user/CelcomChannel","absolute":"https://www.youtube.com/user/CelcomChannel","absolute_path":"https://www.youtube.com/user/CelcomChannel","external":true,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Youtube.svg"}}]},{"copyright":"Copyright 2019. Celcom Axiata Berhad [167469-A]. All Rights Reserved."},{"complianceInfo":{"icon":"/sites/default/files/cms_content_images/footerimages/redress-batch.png","url":"http://complaint.cfm.my/","text":"Redress your complaints at the<br/>Consumer Forum Malaysia (CFM)"}},{"postpaidApps":{"postpaidAppsCheck":1,"title":"Our Official App","celcom_life_icon":"/sites/default/files/cms_content_images/footerimages/Celcom%20Color_0.svg","celcom_life_text":"Celcom Life","items":[{"title":"Google Play","icon":"/sites/default/files/cms_content_images/footerimages/google-play-badge.18196bcb1e2c239de8bd.svg","url":"http://bit.ly/2TLX3mr "},{"title":"Apple Store","icon":"/sites/default/files/cms_content_images/footerimages/apps-store-icon.a810e15f233a96f8f5b0.svg","url":"http://bit.ly/2TLX3mr "}]}}]
  
});

