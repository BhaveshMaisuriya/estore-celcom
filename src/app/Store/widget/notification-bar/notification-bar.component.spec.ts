import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationBarComponent } from '../../../Store/widget/notification-bar/notification-bar.component';
import { By } from '@angular/platform-browser';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { DebugElement } from "@angular/core";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NotificationBarComponent', () => {
  let component: NotificationBarComponent;
  let fixture: ComponentFixture<NotificationBarComponent>;
  let service: DeviceDataService;
  let el: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NotificationBarComponent],
      providers: [DeviceDataService],
      imports: [
        HttpClientTestingModule,
      ]
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBarComponent);
    component = fixture.componentInstance;
    service = TestBed.get(DeviceDataService);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the success logo', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p.b-notification__text>img').src).toContain('/assets/img/Drop_3/icon/success.svg');
  });
  it('It should contain methods', () => {
    expect(component.close_icon).toBeDefined();
    expect(service.publishBarNotificationBoolean).toBeDefined();
  });
  it('It should render class in notification-bar HTML', () => {
    const notification = fixture.debugElement.query(By.css('.b-notification__text')).nativeElement;
    expect(notification.innerHTML).toBeTruthy();
  });
  it('should check the ngIf condition', () => {
    if (!component.data) {
      el = fixture.debugElement.query(By.css('span'));
      expect(el.nativeElement.textContent).toBe('Item Successfully Added to Cart');
    }
    if (component.data) {
      el = fixture.debugElement.query(By.css('span'));
      expect(el.nativeElement.textContent).toBe(component.data);
    }
  });
  it('should close the notification bar', () => {
    spyOn(service, 'publishBarNotificationBoolean');
    component.close_icon();
    fixture.detectChanges();
    expect(service.publishBarNotificationBoolean).toHaveBeenCalledWith(false);
  });

});
