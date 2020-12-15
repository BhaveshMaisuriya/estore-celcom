import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { SideSummaryContainerComponent } from "./side-summary-container.component";
import { DeviceDataService } from "app/Service/devicedata.service";
import { PlansService } from "app/Service/plans.service";
import { PlansQuery } from "./plans.store";
import { TypeofPurchaseQuery } from "./type-of-purchase.store";
import { NO_ERRORS_SCHEMA, PLATFORM_ID } from "@angular/core";
import { of } from "rxjs/observable/of";
class RouterStub {
  navigate(url: string) {
    return url;
  }
}

describe("SideSummaryContainerComponent", () => {
  let component: SideSummaryContainerComponent;
  let fixture: ComponentFixture<SideSummaryContainerComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideSummaryContainerComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: PLATFORM_ID, useValue: true },
        DeviceDataService,
        PlansQuery,
        PlansService,
        TypeofPurchaseQuery,
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: { data: of({ data: { isBroadband: true } }) },
            children: [{ data: of({ data: { isDevicePage: true } }) }]
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).overrideComponent(SideSummaryContainerComponent, {
      add: {
         template: '<div class="r-page"></div>'
      }
   }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(SideSummaryContainerComponent);
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

  it("component call window onResize", () => {
    component.isBrowser = true;
    component.onResize(800);
   let spy = spyOnProperty(window, 'innerWidth').and.returnValue(800);
    window.dispatchEvent(new Event("resize"));
    expect(spy).toHaveBeenCalled();
  });

  it("component call onSideSummaryExpanded()", () => {
    const event = new Event("click");
    component.onSideSummaryExpanded(event);
    expect(component).toBeTruthy();
  });
});
