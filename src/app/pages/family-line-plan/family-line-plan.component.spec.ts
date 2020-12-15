import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FamilyLinePlanComponent } from "./family-line-plan.component";
import { SideSummaryComponent } from "app/Widget/side-summary/side-summary.component";
import { PlanCardComponent } from "app/shared/components/plan-card/plan-card.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { EstoreInputComponent } from "app/shared/components/forms/estore-input/estore-input.component";
import { SupplementaryLineWrapperComponent } from "app/shared/components/type-of-purchase/supplementary-line-wrapper/supplementary-line-wrapper.component";
import { NotesComponent } from "app/shared/components/notes/notes.component";
import { FooterComponent } from "app/Footer/footer.component";
import { NewOtpInputComponent } from "app/shared/components/new-otp-input/new-otp-input.component";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NotificationErrorComponent } from "app/Store/widget/notification-error/notification-error.component";
import { NumberStandardFilter } from "app/shared/pipes/number-standard.pipe";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DigitOnlyDirective } from "app/shared/directives/digit-only/digit-only.directive";
import { EstoreCheckboxComponent } from "app/shared/components/forms/estore-checkbox/estore-checkbox.component";
import { NumberChooserComponent } from "app/shared/components/number-chooser/number-chooser.component";
import { FooterDownloadComponent } from "app/Footer/Download/download.component";
import { SocialMediaComponent } from "app/Footer/SocialMedia/socialmedia.component";
import { PageLoaderComponent } from "app/shared/components/page-loader/page-loader.component";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
import { SearchHighlight } from "app/shared/pipes/search-highlight.pipe";
import { NguCarouselModule } from "@ngu/carousel";
import { DeviceDataService } from "app/Service/devicedata.service";
import { RouterTestingModule } from "@angular/router/testing";
import { EStoreAnalysticsService } from "app/Service/store.analytic.service";
import { RendererService } from "app/Service/renderer.service";
import { SeoService } from "app/Service/seo.service";
import { DecimalPipe } from "@angular/common";
import { GuestCheckoutService } from "app/Store/guest-checkout/services/guest-checkout.service";
import { Broadcaster } from 'app/Model/broadcaster.model';
import { NotificationPopupEvent } from 'app/Service/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { McLoginComponent } from 'app/shared/components/mc-login/mc-login.component';
import { ModalComponent } from 'app/shared/components/modal/modal.component';
import { OmniBannerComponent } from 'app/shared/components/omni-banner/omni-banner.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { sharedPipes } from 'app/shared/pipes';
import { materialModules } from 'app/shared/shared-module.module';

describe("FamilyLinePlanComponent", () => {
  let component: FamilyLinePlanComponent;
  let fixture: ComponentFixture<FamilyLinePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FamilyLinePlanComponent,
        SideSummaryComponent,
        PlanCardComponent,
        sharedPipes,
        EstoreInputComponent,
        SupplementaryLineWrapperComponent,
        NotesComponent,
        FooterComponent,
        NewOtpInputComponent,
        NotificationErrorComponent,
        NumberStandardFilter,
        DigitOnlyDirective,
        EstoreCheckboxComponent,
        NumberChooserComponent,
        FooterDownloadComponent,
        SocialMediaComponent,
        PageLoaderComponent,
        PaginationComponent,
        SearchHighlight,
        McLoginComponent,
        ModalComponent,
        OmniBannerComponent
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        PerfectScrollbarModule,
        NguCarouselModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        materialModules,
      ],
      providers: [
        DeviceDataService,
        EStoreAnalysticsService,
        RendererService,
        SeoService,
        DecimalPipe,
        GuestCheckoutService,
        Broadcaster,
        NotificationPopupEvent,
        CookieService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyLinePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
