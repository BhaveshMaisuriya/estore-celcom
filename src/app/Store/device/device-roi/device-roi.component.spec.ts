import { Component } from "@angular/core";

import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from "@angular/core/testing";

import { DeviceRoiComponent } from "./device-roi.component";
import { FooterComponent } from "../../../Footer/footer.component";
import { FooterDownloadComponent } from "../../../Footer/Download/download.component";
import { SocialMediaLinks } from "../../../Footer/SocialMedia/socialmedialinks.service";
import { SocialMediaComponent } from "../../../Footer/SocialMedia/socialmedia.component";
import { AppService } from "../../../Service/app.service";
import { AppMockService } from "../../../Service/appmock.service";
import { Broadcaster } from "../../../Model/broadcaster.model";
import { NotificationPopupEvent } from "../../../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { Router, ActivatedRoute } from "@angular/router";
import { DeviceRoiService } from "./device-roi.service";
import { EStoreAnalysticsService } from "../../../Service/store.analytic.service";
import { Renderer2, NgModule } from "@angular/core";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { FormsModule } from "@angular/forms";
import { SessionTimeOutPopupComponent } from "../../widget/session-timeout-popup/session-timeout-popup";
import { NotificationErrorComponent } from "../../widget/notification-error/notification-error.component";
import { DetailBannerTextLeftComponent } from "../../../Widget/DetailBannerTextLeft/DetailBannerTextLeft.component";
import { AnalyticsService } from "../../../Service/analytic.service";
import { BrowserDynamicTestingModule } from "@angular/platform-browser-dynamic/testing";
import { RendererService } from "../../../Service/renderer.service";
import { DecimalPipe } from "@angular/common";
import { SeoService } from "../../../Service/seo.service";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UserService } from 'app/Service/user.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}
class MockactivatedRoute {
  snapshot(url: string) {
    return url;
  }
}
const mockData = [
  {
    id: "519",
    name: "Samsung Galaxy A80",
    sku: "Samsung-Galaxy-A80",
    image: null,
    image_title_1: null,
    image_title_2: null,
    register_interest_text:
      " Be one of the first to Pre-Order the latest iphone in-trend!",
    register_interest_title: "Register Your Interest",
    tell_us_title: "Tell us about yourself",
    model_title: "Model",
    phone_details_title: "Select your preferred phone",
    query_option: [
      {
        question: "Q1",
        answer: ["A1", "A2"]
      },
      {
        question: "What's your name?",
        answer: ["Aima", "Sharath"]
      }
    ],
    associated_products: [
      {
        color: "White",
        hexcode: "#ffffff",
        storage: "128GB",
        model: "GALAXY A80 128GB",
        sku: "SamsungGalaxyA80128gbwhite"
      },
      {
        color: "Black",
        hexcode: "#ffffff",
        storage: "128GB",
        model: "GALAXY A80 128GB",
        sku: "SamsungGalaxyA80128gbBlack"
      },
      {
        color: "Silver",
        hexcode: "#ffffff",
        storage: "64GB",
        model: "GALAXY A80 64GB",
        sku: "SamsungGalaxyA8064gbSilver"
      }
    ]
  }
];
const mockFormValue = {
  value: {
    "0": "A1",
    "1": "Sharath",
    name: "sanity tester",
    contactEmail: "sanitytest@gmail.com",
    customerID: "861230145332",
    contactMobileNum: "01234324234",
    model: "GALAXY J3 PRO 2017",
    storage: "32GB",
    color: "Gold"
  }
};
const mockSubmitRequest = {
  data: {
    sku: "SamsungGalaxyJ3PRO",
    name: "sanity tester",
    email: "sanitytest@gmail.com",
    nric_number: "861230145332",
    mobile_number: "01234324234",
    image_path: "/media/catalog/product/c/e/celcom_top_banner_2.png",
    associated_product_sku: "SamsungGalaxyJ3PRO32GBGold",
    selected_query: [
      {
        question: "Q1",
        answer: "A1"
      },
      {
        question: "What's your name?",
        answer: "Sharath"
      }
    ]
  }
};

describe("DeviceRoiComponent", () => {
  let component: DeviceRoiComponent;
  let fixture: ComponentFixture<DeviceRoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        BrowserDynamicTestingModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        DeviceRoiComponent,
        FooterComponent,
        FooterDownloadComponent,
        SocialMediaComponent,
        SessionTimeOutPopupComponent,
        NotificationErrorComponent,
        DetailBannerTextLeftComponent,
        SafeHtmlPipe
      ],
      providers: [
        { provide: AppService, useClass: AppMockService },
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: MockactivatedRoute },
        Broadcaster,
        NotificationPopupEvent,
        CookieService,
        DeviceRoiService,
        EStoreAnalysticsService,
        Renderer2,
        DeviceDataService,
        AnalyticsService,
        RendererService,
        SeoService,
        DecimalPipe,
        HttpClient,
        UserService,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceRoiComponent);
    component = fixture.componentInstance;
    component.fieldDataResponse = mockData[0];
    component.formSubmitted = false;
    component.apiError = false;
    component.infoForDetailBannerTextLeft = {
      Name: "Device not found",
      Api: ""
    };
    component.errorOnSubmitMessage = {
      content:
        "Sorry for the inconvenience, we're giving our system a little update. Please try again later."
    };
    component.errorToasterInfo = {
      content:
        "Sorry for the inconvenience, we're giving our system a little update. Please try again later."
    };
    component.mobNumber = "9901234567";
    component.selectedQuery = [];
    component.errorOnSubmit = false;
    component.isErrorToaster = false;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call ngoninit with no error notification", inject(
    [DeviceDataService],
    (service: DeviceDataService) => {
      spyOn(component, "ngOnInit");
      spyOn(service, "publishErrorNotificationBoolean");
      //  spyOn(component, "Init");
      component.ngOnInit();
      service.publishErrorNotificationBoolean(false);
      expect(component.isErrorToaster).toBeFalsy();
      expect(component.errorOnSubmit).toBeFalsy();
      //   expect(component.Init).toHaveBeenCalledWith('SamsungGalaxyJ3PRO');
    }
  ));
  it("should call ngoninit with error notification", inject(
    [DeviceDataService],
    (service: DeviceDataService) => {
      spyOn(component, "ngOnInit");
      spyOn(service, "publishErrorNotificationBoolean");
      //  spyOn(component, "Init");
      component.ngOnInit();
      service.publishErrorNotificationBoolean(true);
      component.isErrorToaster = true;
      component.errorOnSubmit = true;
      expect(component.isErrorToaster).toBeTruthy();
      expect(component.errorOnSubmit).toBeTruthy();
      //   expect(component.Init).toHaveBeenCalledWith('SamsungGalaxyJ3PRO');
    }
  ));
  it("should call successfulResponseFromGetRequest function", () => {
    spyOn(component, "ColorandStorageInfoOftheDevice");
    component.successfulResponseFromGetRequest(mockData);
    const noOfQuery = mockData[0].query_option.length;
    const arg = component.fieldDataResponse;
    expect(component.noOfQuery).toBe(noOfQuery);
    expect(component.ColorandStorageInfoOftheDevice).toHaveBeenCalledWith(arg);
  });
  it("should call onSubmit function", () => {
    spyOn(component, "questionairesResponse");
    spyOn(component, "postFieldDataToMagento");
    component.onSubmit(mockFormValue);
    const customerSelectedDetails = {
      name: mockFormValue.value.name,
      email: mockFormValue.value.contactEmail,
      customerID: mockFormValue.value.customerID,
      mobileNumber: mockFormValue.value.contactMobileNum,
      selectedModel: mockFormValue.value.model,
      selectedStorage: mockFormValue.value.storage,
      selectedColor: mockFormValue.value.color
    };
    expect(component.roiForm).toEqual(mockFormValue.value);
    expect(component.customerSelectedDetails).toEqual(customerSelectedDetails);
    expect(component.questionairesResponse).toHaveBeenCalledWith(
      mockFormValue.value
    );
  });
  it("should call questionairesResponse function", () => {
    component.fieldDataResponse = mockData[0];
    component.questionairesResponse(mockFormValue.value);
  });
  it("should call validationForNRIC function with alphabets in NRIC", () => {
    component.validationForNRIC("");
    expect(component.formInvalid).toBeTruthy();
    expect(component.customMessageforNRIC).toBeTruthy();
    expect(component.customMsgForNRIC).toBe("Please enter a value");
    component.validationForNRIC("90122312456");
    expect(component.formInvalid).toBeTruthy();
    expect(component.maxlength).toBe(12);
    expect(component.customMessageforNRIC).toBeTruthy();
    expect(component.customMsgForNRIC).toBe(
      "Please enter a valid New NRIC ID of 12 digit"
    );
    component.validationForNRIC("9012091234ab");
    expect(component.formInvalid).toBeTruthy();
    expect(component.customMessageforNRIC).toBeTruthy();
    expect(component.customMsgForNRIC).toBe("Please enter digits only");
  });
  it("should call validationForNRIC function with correct NRIC format", () => {
    component.validationForNRIC("901109123456");
    expect(component.formInvalid).toBeFalsy();
    expect(component.customMessageforNRIC).toBeFalsy();
  });
  it("should call MobileNumberValidation function with incorrect format", () => {
    component.MobileNumberValidation();
    expect(component.formInvalid).toBeTruthy();
    expect(component.invalidMobileNumber).toBeTruthy();
    component.mobNumber = "";
    component.MobileNumberValidation();
    component.mobNumber = "asdf";
    component.MobileNumberValidation();
  });
  it("should call MobileNumberValidation function with correct number", () => {
    component.mobNumber = "0123456789";
    component.MobileNumberValidation();
    expect(component.formInvalid).toBeFalsy();
    expect(component.invalidMobileNumber).toBeFalsy();
    component.mobNumber = "60123456789";
    component.MobileNumberValidation();
  });

  it("should call ColorandStorageInfoOftheDevice function with correct number", () => {
    const spy = spyOn(component, "ColorandStorageInfoOftheDevice").and.callThrough();
    component.ColorandStorageInfoOftheDevice(component.fieldDataResponse);
    expect(spy).toHaveBeenCalled();
  });
  it("should call successfulResponseOnPostRequest function with correct number", () => {
    component.successfulResponseOnPostRequest({});
    expect(component.formSubmitted).toBeTruthy();
    expect(component.isDisplayFormSubmissionPopup).toBeTruthy();
  });

  it("should call errorOnPostRequest function with correct number", () => {
    component.errorOnPostRequest({});
    expect(component.errorOnSubmit).toBeTruthy();
    expect(component.errorOnSubmitMessage.content).toBe(
      "Sorry for the inconvenience, we're giving our system a little update. Please try again later."
    );
  });
  it("should call getsimpleSkuOfDevice function", () => {
    component.fieldDataResponse = mockData[0];
    component.customerSelectedDetails = {
      name: "abc def",
      email: "skdjfhu",
      customerID: "27364732",
      mobileNumber: "329473826",
      selectedModel: "GALAXY A80 64GB",
      selectedStorage: "64GB",
      selectedColor: "Silver"
    };
    const retval = component.getsimpleSkuOfDevice();
    expect(retval).toBe("SamsungGalaxyA8064gbSilver");
  });
  it("should call requestBodyForSubmit function", () => {
    component.fieldDataResponse = mockData[0];
    component.customerSelectedDetails = {
      name: "abc def",
      email: "skdjfhu",
      customerID: "27364732",
      mobileNumber: "329473826",
      selectedModel: "GALAXY A80 64GB",
      selectedStorage: "64GB",
      selectedColor: "Silver"
    };
    component.selectedQuery = [
      {
        question: "Q1",
        answer: "A1"
      },
      {
        question: "What's your name?",
        answer: "Sharath"
      }
    ];
    const retVal = component.requestBodyForSubmit();
    expect(retVal).toBeDefined();
  });
});
