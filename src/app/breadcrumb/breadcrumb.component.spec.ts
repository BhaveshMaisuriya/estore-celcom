import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { BreadcrumbComponent } from "./breadcrumb.component";
import { Broadcaster } from "../Model/broadcaster.model";
import { NotificationPopupEvent } from "../Service/broadcaster.service";
import { CookieService } from "ngx-cookie-service";
import { RouterTestingModule } from "@angular/router/testing";
import { BreadcrumbService } from "./breadcrumb.service";
import { RedirectionService } from "../Service/redirection.service";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

class RouterStub {
  navigate(url: string) {
    return url;
  }
}

class MockBreadcrumbService {
  Find(url: string) {
    return of(data);
  }
}

let data: any = [
  {
    Items: {
      name: "test",
    }
  }
];

describe("BreadcrumbComponent", () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  let service: BreadcrumbService;
  let httpMock: HttpTestingController;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [BreadcrumbComponent],
      providers: [
        { provide: BreadcrumbService, useClass: MockBreadcrumbService },
        RedirectionService,
        Broadcaster,
        NotificationPopupEvent,
        CookieService,
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: [
                {
                  path: "rest/v1/test"
                }
              ]
            }
          }
        },
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    component.isCSAgent = component.csAgent;
    service = TestBed.get(BreadcrumbService);
    httpMock = TestBed.get(HttpTestingController);
   
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should create BreadcrumbComponent", () => {
    expect(component).toBeTruthy();
  });

  it("Should check the api data", done => {
    component.apiUrl = "rest/v1/test";
    spyOn(service, "Find").and.returnValue(of(data));
    service.Find("rest/v1/test").subscribe(res => {
      expect(res).toEqual(data);
      done();
    });
    
  });
});
