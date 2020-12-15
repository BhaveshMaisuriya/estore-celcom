import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { CampaignPortalComponent } from "./campaign-portal.component";
import { PageLoaderComponent } from "app/shared/components/page-loader/page-loader.component";
import { FooterComponent } from "app/Footer/footer.component";
import { SocialMediaComponent } from "app/Footer/SocialMedia/socialmedia.component";
import { FooterDownloadComponent } from "app/Footer/Download/download.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { EStoreAnalysticsService } from "app/Service/store.analytic.service";
import { RendererService } from "app/Service/renderer.service";
import { ModalService } from "app/shared/components/modal/modal.service";
import { CampaignService } from "./campaign-portal.service";
import { SeoService } from "app/Service/seo.service";
import { DecimalPipe } from "@angular/common";
import { Broadcaster } from 'app/Model/broadcaster.model';
import { NotificationPopupEvent } from 'app/Service/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';
import { materialModules } from 'app/shared/shared-module.module';
import { IconModule } from 'app/shared/icon.module';

describe("CampaignPortalComponent", () => {
  let component: CampaignPortalComponent;
  let fixture: ComponentFixture<CampaignPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CampaignPortalComponent,
        PageLoaderComponent,
        FooterComponent,
        SocialMediaComponent,
        FooterDownloadComponent
      ],
      imports: [
        IconModule,
        HttpClientTestingModule,
        RouterTestingModule,
        materialModules,
      ],
      providers: [
        EStoreAnalysticsService,
        RendererService,
        ModalService,
        CampaignService,
        SeoService,
        DecimalPipe,
        Broadcaster,
        NotificationPopupEvent,
        CookieService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
