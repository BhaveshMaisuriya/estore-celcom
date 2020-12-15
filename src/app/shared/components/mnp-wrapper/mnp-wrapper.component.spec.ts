import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MnpWrapperComponent } from "./mnp-wrapper.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EstoreCheckboxComponent } from "../forms/estore-checkbox/estore-checkbox.component";
import { EstoreInputComponent } from "../forms/estore-input/estore-input.component";
import { McLoginComponent } from "../mc-login/mc-login.component";
import { SupplementaryLineWrapperComponent } from "../type-of-purchase/supplementary-line-wrapper/supplementary-line-wrapper.component";
 "@angular/material/icon";
import { ModalComponent } from "../modal/modal.component";
import { NewOtpInputComponent } from "../new-otp-input/new-otp-input.component";
import { NumberChooserComponent } from "../number-chooser/number-chooser.component";
import { PaginationComponent } from "../pagination/pagination.component";
import { PageLoaderComponent } from "../page-loader/page-loader.component";
import { NguCarouselModule } from "@ngu/carousel";
import { DeviceCarouselComponent } from "../device-carousel/device-carousel.component";
import { MnpService } from "app/Store/mnp/services/mnp.service";
import { HttpClient } from "@angular/common/http";
import { DecimalPipe } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DeviceDataService } from "app/Service/devicedata.service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { materialModules } from "app/shared/shared-module.module";
import { sharedPipes } from 'app/shared/pipes';
import { sharedDirectives } from 'app/shared/directives';

describe("MnpWrapperComponent", () => {
  let component: MnpWrapperComponent;
  let fixture: ComponentFixture<MnpWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        materialModules,
        NguCarouselModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        MnpWrapperComponent,
        EstoreCheckboxComponent,
        EstoreInputComponent,
        McLoginComponent,
        SupplementaryLineWrapperComponent,
        ModalComponent,
        NewOtpInputComponent,
        NumberChooserComponent,
        PaginationComponent,
        PageLoaderComponent,
        DeviceCarouselComponent,
        sharedPipes,
        sharedDirectives
      ],
      providers: [HttpClient, DecimalPipe, MnpService, DeviceDataService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnpWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
