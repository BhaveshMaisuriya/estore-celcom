import { TestBed } from "@angular/core/testing";
import { AppService } from "app/Service/app.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { HeroBannerCarouselService } from "./herobanner.carousel.service";

describe("HeroBannerCarouselService", () => {
  let service: HeroBannerCarouselService;
  let httpMock: HttpTestingController;

  const data: any = [
    {
      status: true,
      message: "test"
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroBannerCarouselService, AppService]
    });
    service = TestBed.get(HeroBannerCarouselService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
