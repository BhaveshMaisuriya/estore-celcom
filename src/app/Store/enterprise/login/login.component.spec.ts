import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { AppService } from "../../../Service/app.service";
import { EnterpriseLoginComponent } from "../../enterprise/login/login.component";
import { NotificationErrorComponent } from "../../../../app/Store/widget/notification-error/notification-error.component";
import { AgentFooterComponent } from "../../../Footer/agent-footer/agent-footer.component";
import { ActivatedRoute, Data, Params, Router } from "@angular/router";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { AnalyticsService } from "app/Service/analytic.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { EstoreInputComponent } from "app/shared/components/forms/estore-input/estore-input.component";
import { EnterpriseService } from "../enterprise.service";
import { EStoreAnalysticsService } from "app/Service/store.analytic.service";
import { RendererService } from "app/Service/renderer.service";
import { SeoService } from "app/Service/seo.service";
import { of } from "rxjs/observable/of";
import { DecimalPipe } from '@angular/common';
import { sharedPipes } from 'app/shared/pipes';

class RouterStub {
  navigate(url: string) {
    return url;
  }
}

describe("EnterpriseLoginComponent", () => {
  let component: EnterpriseLoginComponent;
  let fixture: ComponentFixture<EnterpriseLoginComponent>;
  let service: EnterpriseService;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule, ReactiveFormsModule],
      declarations: [
        EnterpriseLoginComponent,
        EstoreInputComponent,
        AgentFooterComponent,
        NotificationErrorComponent,
       sharedPipes
      ],
      providers: [
        EnterpriseService,
        DeviceDataService,
        AppService,
        AnalyticsService,
        SeoService,
        RendererService,
        DecimalPipe,
        EStoreAnalysticsService,
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            data: {
              subscribe: (fn: (value: Data) => void) =>
                fn({
                  test: "test"
                })
            },
            queryParams: {
              subscribe: (fn: (value: Params) => void) =>
                fn({
                  code:
                    "eyAibmFtZSI6InRlc3QiLCAiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsIm5yaWMiOiJ0ZXN0IiwgInN0YXRlIjoidGVzdCJ9"
                })
            },
            snapshot: {
              url: [
                {
                  path: "rest/v1/test"
                }
              ]
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterpriseLoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(EnterpriseService);
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("Enterprise Login Component created", () => {
    expect(component).toBeTruthy();
  });

  it("OTP form invalid when empty", () => {
    const router = TestBed.get(Router);
    router.url = "#test/store/enterpriselogin";
    let currentUrl = router.url;
    expect(component.otpForm.valid).toBeFalse();
  });

  it("otp field validity", () => {
    let otp = component.otpForm.controls["otp"];
    otp.setValue("1234");
    expect(otp.valid).toBeTruthy();
  });

  it("otp field required ", () => {
    let otp = component.otpForm.controls["otp"];
    otp.setValue("");
    expect(otp.valid).toBeFalsy();
  });

  it("should redirect to valid Enterprise landing page url", () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, "navigate");
    component.redirectToLandingPage();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(["/store/enterprise/landing"]);
  });

  it("should redirect to Other landing page", () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, "navigate");
    component.redirectToOtherPage();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(["/store/devices"]);
  });

  it("submitting a form emits a user", done => {
    let data: any = [
      {
        status: true,
        message: "test",
        loginData: {
          userinfo: { nric: "12353456" },
          user: "enterprise",
          id_type: "1",
          id_number: "0354454",
          email: "test@gmail.com",
          name: "test",
          state: "xxx",
          otp: "1234"
        }
      }
    ];
    spyOn(component, "redirectToLandingPage");
    spyOn(service, "login").and.returnValue(of(data));
    expect(component.otpForm.valid).toBeFalsy();
    component.otpForm.controls["otp"].setValue("12345");
    expect(component.otpForm.valid).toBeTruthy();
    let result;
    service.login(data).subscribe(res => {
      result = res;
      done();
    });
    component.onFormSubmit();
    fixture.detectChanges();
    expect(result).toEqual(data);
    expect(component.redirectToLandingPage).toHaveBeenCalled();
  });

  it("should called ngOnInIt()", () => {
    let spy = spyOn(service, "isEnterpriseUser").and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();

    spy = spyOn(service, "isOtherUser").and.returnValue(true);
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });
});
