import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { HeroBannerCarouselService } from "./herobanner.carousel.service";
import { HeroBannerCarouselComponent } from "./herobanner.carousel.component";
import { ActivatedRoute, Router } from "@angular/router";
import { RedirectionService } from "app/Service/redirection.service";
import { RouterTestingModule } from "@angular/router/testing";
import { Broadcaster } from "app/Model/broadcaster.model";
import { CookieService } from "ngx-cookie-service";
import { NotificationPopupEvent } from "app/Service/broadcaster.service";
class RouterStub {
  navigate(url: string) {
    return url;
  }
}

describe("HeroBannerCarouselComponent", () => {
  let component: HeroBannerCarouselComponent;
  let fixture: ComponentFixture<HeroBannerCarouselComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeroBannerCarouselComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get(): string {
                  return "123";
                }
              }
            }
          }
        },
        RedirectionService,
        HeroBannerCarouselService,
        Broadcaster,
        CookieService,
        NotificationPopupEvent
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeroBannerCarouselComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("component should be created", () => {
    expect(component).toBeTruthy();
  });
});
