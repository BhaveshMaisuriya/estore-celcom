import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { NotificationComponent } from "./notification.component";
import { By } from "@angular/platform-browser";

describe("BreadcrumbComponent", () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [NotificationComponent],
      providers: []
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create NotificationComponent", () => {
    expect(component).toBeTruthy();
  });

  it("should create closeNotification", () => {
      spyOn(component,"updateNotificationStateOpen");
    let el = fixture.debugElement.query(
      By.css("div > .m-notification__close-button")
    );
    const event = new Event('click'); 
    el.nativeElement.dispatchEvent(event);
    component.closeNotification(event);
    fixture.detectChanges();
    expect(el.nativeElement.classList).toContain('is-icon-close');
  });
});
