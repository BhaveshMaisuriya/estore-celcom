import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BreadcrumbService } from "app/breadcrumb/breadcrumb.service";
import { Broadcaster } from "app/Model/broadcaster.model";
import { AppService } from 'app/Service/app.service';
import { NotificationPopupEvent } from "app/Service/broadcaster.service";
import { RedirectionService } from "app/Service/redirection.service";
import { ModalService } from "app/shared/components/modal/modal.service";
import { OrderTrackingService } from 'app/Store/shared/services/order-tracking.service';
import { CookieService } from "ngx-cookie-service";
import { of } from "rxjs";
import { MnpSimVerificationComponent } from "./mnp-sim-verification.component";
import { MnpSimVerificationService } from "./mnp-sim-verification.service";

class RouterStub {
  navigate(url: string) {
    return url;
  }
}

const simPayload = {
  "track_order_data": {
    "siebel_order_num": '1-136005290569',
    "id_number": '670318565656',
    "sim_serial_num": '0786'
  }
}

describe("MnpSimVerificationComponent", () => {
  let component: MnpSimVerificationComponent;
  let fixture: ComponentFixture<MnpSimVerificationComponent>;
  let appService: AppService;
  let orderTrackingService: OrderTrackingService;
  let mnpSimVerificationService: MnpSimVerificationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MnpSimVerificationComponent],
      providers: [
        AppService,
        OrderTrackingService,
        BreadcrumbService,
        MnpSimVerificationService,
        RedirectionService,
        Broadcaster,
        ModalService,
        NotificationPopupEvent,
        CookieService,
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ orderId: "1-136005290569" }),
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MnpSimVerificationComponent);
    component = fixture.componentInstance;
    appService = TestBed.inject(AppService);
    orderTrackingService = TestBed.inject(OrderTrackingService);
    mnpSimVerificationService = TestBed.inject(MnpSimVerificationService);
    component.mnpSimVerifyForm = new FormGroup({
      idType: new FormControl("New NRIC", [Validators.required]),
      nric: new FormControl("", [
        Validators.required,
        Validators.pattern(component.formConstants.nric)
      ]),
      orderId: new FormControl("", [Validators.required])
    });
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should check verifyID function", (done) => {
    const data = {
      "track_order_data": {
        "siebel_order_num": '1-136005290569',
        "id_number": '670318565656',
      }
    };
    const resp = {
      "message": "Track My Order Success",
      "status": true,
      "token": "8w7bb5u0d09iegjwcq350px94raig9f3",
      "ismnpredirect": "1",
      "ismnpcomplete": "1",
      "simserialnumber": "****************",
      "cngenerated": "1",
      "authtoken": ""
    };
    const innerSpy = spyOn(appService, "postEstoreUserData").and.returnValue(of(resp));
    appService.postEstoreUserData("/rest/V1/trackOrder", data).subscribe(() => {
      done();
    });
    expect(innerSpy).toHaveBeenCalled();
    const spy = spyOn(orderTrackingService, "TrackOrder").and.returnValue(of(resp));
    orderTrackingService.TrackOrder("/rest/V1/trackOrder", data).subscribe(() => {
      done();
    });
    component.verifyID();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should check verifySimDetails function for True status", (done) => {
    const verifySimResponse = [{
      status: true
    }];

    const spy = spyOn(mnpSimVerificationService, "verifySimDetail").and.returnValue(of(verifySimResponse));
    mnpSimVerificationService.verifySimDetail(simPayload).subscribe(() => {
      done();
    });
    component.verifySimDetails();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it("should check verifySimDetails function for False status", (done) => {
    const verifySimResponse = [{
      status: false
    }];
    const spy = spyOn(mnpSimVerificationService, "verifySimDetail").and.returnValue(of(verifySimResponse));
    mnpSimVerificationService.verifySimDetail(simPayload).subscribe(() => {
      done();
    });
    component.verifySimDetails();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});
