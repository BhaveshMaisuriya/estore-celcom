import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { MinifiedPageLoaderComponent } from "../../../Store/widget/minified-page-loader/minified-page-loader.component";
import { FormsModule } from "@angular/forms";
import { FooterComponent } from "../../../Footer/footer.component";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { AppService } from "../../../Service/app.service";
import { Router, ActivatedRoute } from "@angular/router";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { DecimalPipe } from "@angular/common";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { UserService } from "../../../Service/user.service";
import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { AgeEligibilityPopupComponent } from "../../widget/age-eligibility-popup/ageeligiblity.popup.component";
import { CheckoutHeroBannerComponent } from "../../../Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component";
import { PageLoaderComponent } from "../../../shared/components/page-loader/page-loader.component";
import { RouterService } from "../../../Service/router.service";
import { AgentOrderHistoryComponent } from "./agent-order-history.component";
import { sharedPipes } from "app/shared/pipes";
import { RendererService } from "app/Service/renderer.service";
import { SeoService } from "app/Service/seo.service";
import { of } from "rxjs/observable/of";
import { Broadcaster } from "app/Model/broadcaster.model";
import { RouterTestingModule } from "@angular/router/testing";
import { promise } from 'protractor';
import { materialModules } from 'app/shared/shared-module.module';

class RouterStub {
  navigate(url: string) {
    return url;
  }
  navigateByUrl(url: string) {
    return url;
  }
}

const mockRouterService = {
  getPreviousUrl: () => {}
};

const resp = [
  {
    items: {},
    customer_name: "test",
    mobile_number: "0182917929",
    current_page: 1,
    total_count: 50,
    page_size: 10
  }
];

describe("AgentOrderHistoryComponent ", () => {
  let component: AgentOrderHistoryComponent;
  let fixture: ComponentFixture<AgentOrderHistoryComponent>;
  let appService: AppService;
  let routerService: RouterService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        materialModules,
      ],
      declarations: [
        sharedPipes,
        AgentOrderHistoryComponent,
        MinifiedPageLoaderComponent,
        FooterComponent,
        AgentFooterComponent,
        SocialMediaComponent,
        PageLoaderComponent,
        FooterDownloadComponent,
        NotificationErrorComponent,
        AgeEligibilityPopupComponent,
        CheckoutHeroBannerComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ NricId: "test123" }),
            snapshot: of({ url: "rest/v1/test" }),
            data: of({})
          }
        },
        {
          provide: Router,
          useClass: RouterStub
        },
        { provide: RouterService, useValue: mockRouterService },
        SeoService,
        RendererService,
        AppService,
        EStoreAnalysticsService,
        DecimalPipe,
        NotificationPopupEvent,
        CookieService,
        UserService,
        DeviceDataService,
        Broadcaster
      ]
    }).compileComponents();
  }));
  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgentOrderHistoryComponent);
    component = fixture.componentInstance;
    appService = TestBed.get(AppService);
    routerService = TestBed.get(RouterService);
    router = TestBed.get(Router);
  }));

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should create component", done => {
    const data = {
      nric: "12345",
      search_criteria: {
        page_size: 10,
        current_page: 1
      }
    };
    component.nricId = "12345";
    spyOn(appService, "postEstoreUserData").and.returnValue(of(resp));
    appService.postEstoreUserData("test", data).subscribe(resp => {
      done();
    });
    component.ngOnInit();
    component.loadMore();
    component.openSortBy();
    component.applyFilter("test");
    let spy = spyOn(router, 'navigate').and.stub();
    component.orderNumber(1);
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should go goToPrevPage", () => {
   let spy = spyOn(routerService, "getPreviousUrl").and.returnValue(null);
    component.goToPreviousPage();
    component.goToPrevPage();
    component.goToNextPage();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
  
});
