import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { StandardDeliveryComponent } from "./standard-delivery.component";
import { DeviceDataService } from "app/Service/devicedata.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";

describe("StandardDelivery Component ", () => {
  let component: StandardDeliveryComponent;
  let fixture: ComponentFixture<StandardDeliveryComponent>;
  let deviceService: DeviceDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StandardDeliveryComponent],
      providers: [
        DeviceDataService
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));
  beforeEach(async(() => {
    fixture = TestBed.createComponent(StandardDeliveryComponent);
    component = fixture.componentInstance;
    deviceService = TestBed.get(DeviceDataService);
    component.checkoutData = {
      all_items: [{ midnight_delivery: "1" }],
      delivery_type: { value: 1 }
    };
    fixture.detectChanges();
  }));

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should call flagMidnight with true", () => {
    let spy = spyOn(deviceService, "publishDeliveryType");
    component.flagMidnight(1);
    expect(spy).toHaveBeenCalled();
  });

  it("should emit values", done => {
    spyOn(component.sessionInvalidChange, "emit").and.returnValue(null);
    let spy = spyOn(component.errorToDisplay, "emit").and.returnValue(null);
    component.errorDisplay("test");
    component.sessionInvalidCheck("test");
    expect(spy).toHaveBeenCalled();
    done();
  });
});
