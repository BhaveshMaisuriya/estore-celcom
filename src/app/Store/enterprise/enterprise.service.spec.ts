import { TestBed } from "@angular/core/testing";
import { AppService } from "app/Service/app.service";
import {
  HttpTestingController,
  HttpClientTestingModule
} from "@angular/common/http/testing";
import { UserService } from "app/Service/user.service";
import { CommonUtilService } from "app/Service/commonUtil.service";
import { DeviceDataService } from "app/Service/devicedata.service";
import { EnterpriseService } from "./enterprise.service";

describe("EnterpriseService", () => {
  let enterpriseService: EnterpriseService;
  let httpMock: HttpTestingController;

  const data: any = [
    {
      status: true,
      loginData: {
        userinfo: { nric: "12353456" },
        user: "guest",
        id_type: "1",
        nric: "0354454",
        email: "test@gmail.com",
        name: "test"
      }
    }
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        EnterpriseService,
        AppService,
        UserService,
        CommonUtilService,
        DeviceDataService
      ]
    });
    enterpriseService = TestBed.get(EnterpriseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(enterpriseService).toBeTruthy();
  });

  it("checkServerValidEmail() should return data", done => {
    enterpriseService.checkServerValidEmail("test@gmail.com").subscribe(res => {
      expect(res).toBeFalse();
      done();
    });
  });

  // it("register() should return data", done => {
  //   let result;
  //   enterpriseService.register(data).subscribe(res => {
  //     result = res;
  //     done();
  //   });
  //   httpMock.expectOne("/rest/V1/enterprise-register").flush(data);
  //   expect(result).toEqual(data);
  // });

  // it("resendEmail() should return data", done => {
  //   let result;
  //   enterpriseService.resendEmail(data).subscribe(res => {
  //     result = res;
  //     done();
  //   });
  //   httpMock.expectOne("/rest/V1/enterprise-resend-otp").flush(data);
  //   expect(result).toEqual(data);
  // });

  // it("login() should return data", done => {
  //   let result;
  //   enterpriseService.login(data).subscribe(res => {
  //     result = res;
  //     done();
  //   });
  //   httpMock.expectOne("/rest/V1/login").flush(data);
  //   expect(result).toEqual(data);
  // });

  it("isEnterpriseUser() should return data", () => {
    spyOn(enterpriseService, "isEnterpriseUser").and.returnValue(true);
    enterpriseService.isEnterpriseUser();
    expect(enterpriseService.isEnterpriseUser).toHaveBeenCalled();
  });
});
