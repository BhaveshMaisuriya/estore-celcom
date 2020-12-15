import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { FirstBluePlanComponent } from "./first-blue-plan.component";
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
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { EstoreCheckboxComponent } from "app/shared/components/forms/estore-checkbox/estore-checkbox.component";
import { NumberChooserComponent } from "app/shared/components/number-chooser/number-chooser.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { FooterDownloadComponent } from "app/Footer/Download/download.component";
import { SocialMediaComponent } from "app/Footer/SocialMedia/socialmedia.component";
import { PageLoaderComponent } from "app/shared/components/page-loader/page-loader.component";
import { PaginationComponent } from "app/shared/components/pagination/pagination.component";
import { NguCarouselModule } from "@ngu/carousel";
import { DeviceDataService } from "app/Service/devicedata.service";
import { RouterModule, Router, ActivatedRoute } from "@angular/router";
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
import { TypeofPurchaseWrapperComponent } from 'app/shared/components/type-of-purchase/typeof-purchase-wrapper/typeof-purchase-wrapper.component';
import { MatRadioModule } from '@angular/material/radio';
import { NewLineWrapperComponent } from 'app/shared/components/plans/new-line-wrapper/new-line-wrapper.component';
import { CobpWrapperComponent } from 'app/shared/components/plans/cobp-wrapper/cobp-wrapper.component';
import { MnpWrapperComponent } from 'app/shared/components/mnp-wrapper/mnp-wrapper.component';
import { McLoginComponent } from 'app/shared/components/mc-login/mc-login.component';
import { ModalComponent } from 'app/shared/components/modal/modal.component';
import { MnpService } from 'app/Store/mnp/services/mnp.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { sharedPipes } from 'app/shared/pipes';
import { sharedDirectives } from 'app/shared/directives';
import { materialModules, SharedModule } from 'app/shared/shared-module.module';

describe("FirstBluePlanComponent", () => {
  let component: FirstBluePlanComponent;
  let fixture: ComponentFixture<FirstBluePlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FirstBluePlanComponent,
        SideSummaryComponent,
        FooterComponent,
        FooterDownloadComponent,
        SocialMediaComponent,
        NotificationErrorComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        PerfectScrollbarModule,
        NguCarouselModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        SharedModule,
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
        CookieService,
        MnpService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstBluePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
