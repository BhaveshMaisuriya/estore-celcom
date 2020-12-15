/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FooterService} from './footer.service';
import { FooterComponent } from './footer.component';
import {FooterDownloadComponent} from './Download/download.component';
import { SocialMediaComponent } from './SocialMedia/socialmedia.component';
import { AppService } from '../Service/app.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SocialMediaLinks } from './SocialMedia/socialmedialinks.service';
import { RedirectionService } from '../Service/redirection.service';
import { Broadcaster } from "../Model/broadcaster.model";
import { NotificationPopupEvent } from "../Service/broadcaster.service";
import { CookieService } from 'ngx-cookie-service';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
class MockAppServiceClass{
  get(url){
    if(url == '/api/content_details?_format=hal_json&type=custom&name=menu_details&id=footer'){
      return Observable.of(mockFooterData);
    }else if(url =="/api/content_details?_format=hal_json&type=custom&name=menu_details&id=footer-icons"){
      return Observable.of(mockFooterIconResp);
    }
    
  }
}
let mockFooterIconResp = [{"title":"MyCelcom Postpaid App","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"App Store","uri":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","alias":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","absolute":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","absolute_path":"https://itunes.apple.com/my/app/mycelcom-postpaid/id1192298514","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Google Play","uri":"http://bit.ly/2TLX3mr","alias":"http://bit.ly/2TLX3mr","absolute":"http://bit.ly/2TLX3mr","absolute_path":"http://bit.ly/2TLX3mr","external":true,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]},{"title":"Connect with us","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Facebook","uri":"https://www.facebook.com/celcom/","alias":"https://www.facebook.com/celcom/","absolute":"https://www.facebook.com/celcom/","absolute_path":"https://www.facebook.com/celcom/","external":true,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Facebook.svg"}},{"title":"Twitter","uri":"https://twitter.com/celcom","alias":"https://twitter.com/celcom","absolute":"https://twitter.com/celcom","absolute_path":"https://twitter.com/celcom","external":true,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Twitter.svg"}},{"title":"Instagram","uri":"https://www.instagram.com/celcom/","alias":"https://www.instagram.com/celcom/","absolute":"https://www.instagram.com/celcom/","absolute_path":"https://www.instagram.com/celcom/","external":true,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Instagram.svg"}},{"title":"YouTube","uri":"https://www.youtube.com/user/CelcomChannel","alias":"https://www.youtube.com/user/CelcomChannel","absolute":"https://www.youtube.com/user/CelcomChannel","absolute_path":"https://www.youtube.com/user/CelcomChannel","external":true,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":"/sites/default/files/menu_icons/Youtube.svg"}}]},{"copyright":"Copyright 2019. Celcom Axiata Berhad [167469-A]. All Rights Reserved."},{"complianceInfo":{"icon":"/sites/default/files/cms_content_images/footerimages/redress-batch.png","url":"http://complaint.cfm.my/","text":"Redress your complaints at the<br/>Consumer Forum Malaysia (CFM)"}},{"postpaidApps":{"postpaidAppsCheck":1,"title":"Our Official App","celcom_life_icon":"/sites/default/files/cms_content_images/footerimages/Celcom%20Color_0.svg","celcom_life_text":"Celcom Life","items":[{"title":"Google Play","icon":"/sites/default/files/cms_content_images/footerimages/google-play-badge.18196bcb1e2c239de8bd.svg","url":"http://bit.ly/2TLX3mr "},{"title":"Apple Store","icon":"/sites/default/files/cms_content_images/footerimages/apps-store-icon.a810e15f233a96f8f5b0.svg","url":"http://bit.ly/2TLX3mr "}]}}];
let mockFooterData = [{"title":"About Celcom","uri":"node/12294","alias":"about-celcom","absolute":"https://www.celcom.com.my/about-celcom","absolute_path":"https://www.celcom.com.my/about-celcom","external":false,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Our Company","uri":"node/17979","alias":"about-celcom/our-company","absolute":"https://www.celcom.com.my/about-celcom/our-company","absolute_path":"https://www.celcom.com.my/about-celcom/our-company","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Board of Directors","uri":"node/22561","alias":"about-celcom/board-of-directors","absolute":"https://www.celcom.com.my/about-celcom/board-of-directors","absolute_path":"https://www.celcom.com.my/about-celcom/board-of-directors","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Management Team","uri":"node/2183","alias":"about-celcom/management-team","absolute":"https://www.celcom.com.my/about-celcom/management-team","absolute_path":"https://www.celcom.com.my/about-celcom/management-team","external":false,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Awards","uri":"node/15539","alias":"about-celcom/awards","absolute":"https://www.celcom.com.my/about-celcom/awards","absolute_path":"https://www.celcom.com.my/about-celcom/awards","external":false,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Media Centre","uri":"node/23989","alias":"about-celcom/media-centre","absolute":"https://www.celcom.com.my/about-celcom/media-centre","absolute_path":"https://www.celcom.com.my/about-celcom/media-centre","external":false,"weight":"-46","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Careers","uri":"https://career.celcom.com.my/","alias":"https://career.celcom.com.my/","absolute":"https://career.celcom.com.my/","absolute_path":"https://career.celcom.com.my/","external":true,"weight":"-45","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Governance","uri":"node/1392","alias":"about-celcom/governance","absolute":"https://www.celcom.com.my/about-celcom/governance","absolute_path":"https://www.celcom.com.my/about-celcom/governance","external":false,"weight":"-44","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Axiata Group","uri":"https://www.axiata.com/","alias":"https://www.axiata.com/","absolute":"https://www.axiata.com/","absolute_path":"https://www.axiata.com/","external":true,"weight":"-43","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]},{"title":"Help & Support","uri":"node/2533","alias":"support","absolute":"https://www.celcom.com.my/support","absolute_path":"https://www.celcom.com.my/support","external":false,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Contact Us","uri":"node/22668","alias":"support/contact-us","absolute":"https://www.celcom.com.my/support/contact-us","absolute_path":"https://www.celcom.com.my/support/contact-us","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"FAQ","uri":"node/1391","alias":"support/faq","absolute":"https://www.celcom.com.my/support/faq","absolute_path":"https://www.celcom.com.my/support/faq","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Ask Community","uri":"https://community.celcom.com.my/","alias":"https://community.celcom.com.my/","absolute":"https://community.celcom.com.my/","absolute_path":"https://community.celcom.com.my/","external":true,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Store Locator","uri":"node/25509","alias":"support/store-locator","absolute":"https://www.celcom.com.my/support/store-locator","absolute_path":"https://www.celcom.com.my/support/store-locator","external":false,"weight":"-45","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Switch to Celcom","uri":"node/5375","alias":"personal/switch-to-celcom","absolute":"https://www.celcom.com.my/personal/switch-to-celcom","absolute_path":"https://www.celcom.com.my/personal/switch-to-celcom","external":false,"weight":"-44","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Device Self-Care","uri":"node/26119","alias":"support/device-self-care","absolute":"https://www.celcom.com.my/support/device-self-care","absolute_path":"https://www.celcom.com.my/support/device-self-care","external":false,"weight":"-43","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Coverage Checker","uri":"node/751","alias":"support/coverage-checker","absolute":"https://www.celcom.com.my/support/coverage-checker","absolute_path":"https://www.celcom.com.my/support/coverage-checker","external":false,"weight":"-42","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Check MNP Status","uri":"https://www.store.celcom.com.my/store/mnpCheck.jsp?Source=MNP","alias":"https://www.store.celcom.com.my/store/mnpCheck.jsp?Source=MNP","absolute":"https://www.store.celcom.com.my/store/mnpCheck.jsp?Source=MNP","absolute_path":"https://www.store.celcom.com.my/store/mnpCheck.jsp?Source=MNP","external":true,"weight":"-41","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Upgrade My Network","uri":"node/1758","alias":"support/upgrade-my-network","absolute":"https://www.celcom.com.my/support/upgrade-my-network","absolute_path":"https://www.celcom.com.my/support/upgrade-my-network","external":false,"weight":"-39","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Message Us","uri":"https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F492640667465465","alias":"https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F492640667465465","absolute":"https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F492640667465465","absolute_path":"https://www.messenger.com/login.php?next=https%3A%2F%2Fwww.messenger.com%2Ft%2F492640667465465","external":true,"weight":"-38","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]},{"title":"Legal","uri":"node","alias":"node","absolute":"https://www.celcom.com.my/node","absolute_path":"https://www.celcom.com.my/node","external":false,"weight":"-46","my_account_link":"","analytic_object":"","menu_icon":{"path":""},"below":[{"title":"Disclaimer","uri":"node/1332","alias":"legal/disclaimer","absolute":"https://www.celcom.com.my/legal/disclaimer","absolute_path":"https://www.celcom.com.my/legal/disclaimer","external":false,"weight":"-50","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Fair Usage Policy","uri":"node/1324","alias":"legal/fair-usage-policy","absolute":"https://www.celcom.com.my/legal/fair-usage-policy","absolute_path":"https://www.celcom.com.my/legal/fair-usage-policy","external":false,"weight":"-49","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Privacy Notice","uri":"node/22034","alias":"legal/privacy-matters","absolute":"https://www.celcom.com.my/legal/privacy-matters","absolute_path":"https://www.celcom.com.my/legal/privacy-matters","external":false,"weight":"-48","my_account_link":"","analytic_object":"","menu_icon":{"path":""}},{"title":"Terms & Conditions","uri":"node/1385","alias":"legal/terms-and-conditions","absolute":"https://www.celcom.com.my/legal/terms-and-conditions","absolute_path":"https://www.celcom.com.my/legal/terms-and-conditions","external":false,"weight":"-47","my_account_link":"","analytic_object":"","menu_icon":{"path":""}}]}];
class MockFooterService{
  FindFooter_New(){
    return Observable.of(mockFooterData);
  }
}
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[{provide:FooterService,useClass:MockFooterService},{provide:AppService,useClass:MockAppServiceClass},HttpClient,SocialMediaLinks,RedirectionService,
        Broadcaster,NotificationPopupEvent,CookieService],
      declarations: [ FooterComponent ,FooterDownloadComponent,SocialMediaComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('Footer component created', () => {
    expect(component).toBeTruthy();
  });
  it('Should test ngoninit function', () => {
    component.notCSAgent = 'not';
    component.ngOnInit();
    // expect(component.isCSAgent).toBe('not');
  });
  
  
});
