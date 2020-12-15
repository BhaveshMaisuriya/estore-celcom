import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { AppService } from "app/Service/app.service";
import { SupplimentaryLinesService } from "./supplementary-lines.service";
import { environment } from "environments/environment";

describe("SupplimentaryLinesService", () => {
  let service: SupplimentaryLinesService;

  let response = {
    services: [{ pre_Pos_Indicator: "Prepaid" }]
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppService, SupplimentaryLinesService]
    });
    service = TestBed.get(SupplimentaryLinesService);
   
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("checkNumberOfLinesUserHasForSuppLines() with Prepaid should return data", () => {
    service.prodServer = environment.production;
    let result = service.checkNumberOfLinesUserHasForSuppLines(response);
    expect(result).toEqual({ status: true, maxPostpaidLinesRemaining: 4 });

  });

   it("checkNumberOfLinesUserHasForSuppLines() with Postpaid should return data", () => {
    response = { services: [{ pre_Pos_Indicator: "Postpaid" }] };
    service.prodServer = true;
    let result = service.checkNumberOfLinesUserHasForSuppLines(response);
    expect(result).toEqual({ status: true, maxPostpaidLinesRemaining: 13 });
  });
});
