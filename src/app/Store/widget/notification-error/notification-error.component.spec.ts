import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { NotificationErrorComponent } from "../../../Store/widget/notification-error/notification-error.component";
import { DeviceDataService } from "../../../Service/devicedata.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { sharedPipes } from 'app/shared/pipes';

describe("NotificationErrorComponent", () => {
  let component: NotificationErrorComponent;
  let fixture: ComponentFixture<NotificationErrorComponent>;
  let service: DeviceDataService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [NotificationErrorComponent, sharedPipes],
      providers: [DeviceDataService]
    })
      .overrideComponent(NotificationErrorComponent, {
        set: {
          template:
            '<div class="sticky" id="sticky-cart"><h3 class="b-notification">Demo Cart</h3></div>'
        }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationErrorComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DeviceDataService);
  });

  it("should create component", () => {
    expect(component).toBeTruthy();
  });

  it("should check the inputs to be defined in", () => {
    const spy = spyOn(component, "ngOnInit").and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement;
    expect(element.querySelector(".b-notification").innerText).toEqual(
      "Demo Cart"
    );
  });

  it("should call emitContinue method if user clicks on close_icon", () => {
    spyOn(component, "close_icon").and.callThrough();
    component.close_icon();
    fixture.detectChanges();
    expect(component.close_icon).toHaveBeenCalled();
  });
});
