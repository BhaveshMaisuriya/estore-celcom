import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceCarouselComponent } from './device-carousel.component';
import { NguCarouselModule } from '@ngu/carousel';

describe('DeviceCarouselComponent', () => {
  let component: DeviceCarouselComponent;
  let fixture: ComponentFixture<DeviceCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NguCarouselModule],
      declarations: [ DeviceCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCarouselComponent);
    component = fixture.componentInstance;
    component.deviceImages = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
