import { Injectable } from "@angular/core";
import { AppService } from "../../../Service/app.service";
import { environment } from 'environments/environment';
import { map } from "rxjs/operators";
import "lodash";
import { Observable } from 'rxjs';
import { UserService } from 'app/Service/user.service';
import { DeviceDataService } from 'app/Service/devicedata.service';

declare var _: any;

@Injectable()
export class MnpService {
  blackListedSystem: string = environment.blackListedSystem;
  mnpDetails = {
    preSelectSwitchToCelcom: false,
    customer: {
      msisdn: null,
      customerID: null,
      customerIDType: null
    }
  };
  customerIDTypes = [
    { id: 1, value: "New NRIC" }
  ];

  rejectionCode = [
    { code: "SP10", value: "New NIRC is incorrect" },
    { code: "SP11", value: "New NIRC is incorrect" },
    { code: "SP12", value: "Police/Army ID is incorrect" },
    { code: "SP13", value: "Passport Number is incorrect" },
    { code: "SP30", value: "Company Registration Number is incorrect" },
    { code: "SP31", value: "Account Number is incorrect" },
    { code: "SP51", value: "Non Fulfillment of contract obligation" },
    { code: "SP52", value: "Account overdue" },
    {
      code: "SP54",
      value: "Some or all lines numbers do not belong to the Donor"
    },
    { code: "SP55", value: "Some or all numbers is not in service" },
    {
      code: "SP56",
      value: "Principle line has supplementary line(s) that should be ported"
    },
    {
      code: "SP57",
      value: "Supplementary line has principle line that should be ported"
    },
    {
      code: "SP58",
      value:
        "Some or all numbers do not belong to principle subscriber or company"
    },
    { code: "SP59", value: "Credit limit exceeded" },
    {
      code: "SP61",
      value: "Customer numbers are temporarily disconnected - involuntarily"
    },
    {
      code: "SP71",
      value: "One or more MSISDN did not reply to SMS validation"
    },
    {
      code: "SP72",
      value: "One or more MSISDN replied to NO to SMS validation"
    }
  ];

  constructor(private _service: AppService,
    private _userService: UserService,
    private _deviceDataService: DeviceDataService) { }

  getCustomerIDTypes() {
    return this.customerIDTypes;
  }

  getCustomerIdTypeValue(id) {
    return _.find(this.customerIDTypes, function (o) {
      return o.id === id;
    });
  }

  getCustomerIdTypeID(value) {
    return _.find(this.customerIDTypes, function (o) {
      return o.value === value;
    });
  }

  getCurrentCustomerDetails() {
    return this.mnpDetails;
  }

  setCurrentCustomerDetails(cust) {
    this.mnpDetails.customer = cust;
  }

  setMnpFlowPreSelect(flow) {
    this.mnpDetails.preSelectSwitchToCelcom = flow;
  }

  queryPortInStatus(requestParams) {
    const url = "/bssmnp/v1/queryPortInStatus?";
    return this._service.get(url + requestParams).pipe(map((response: any) => {
      return response;
    }));
  }

  customerRetrieve(requestParams) {
    const url = "/oneapi/queryprofile/v1/customerretrieve?";
    return this._service.get(url + requestParams).pipe(map((customerResponse: any) => {
      return customerResponse;
    }));
  }

  CustomerRetrieveCheck(customerIDType: string, customerID: string) {
    const url = "/oneapi/queryprofile/v1/customerretrieve";
    const requestParams = "?customerId=" + customerID + "&customerType=" + customerIDType;
    return this._service.get(url + requestParams).pipe(map((response: any) => {
      return response;
    }));
  }

  QueryDonorTelcoCheck(msisdnNumber: string) {
    const url = "/mnp/v1/" + msisdnNumber + "/queryDonorTelco";
    return this._service.get(url).pipe(map((response: any) => {
      return response;
    }));
  }

  BlacklistCheck(customerId: string, customerType: string) {
    const data = {
      blacklistChkRequest: {
        customerIDType: customerType,
        customerIDNo: customerId,
        system: this.blackListedSystem
      }
    };
    const url = "/oneapi/validation/v1/blacklistinfo";
    const requestParams = JSON.stringify(data);
    return this._service.postROI(url, requestParams).pipe(map((response: any) => {
      return response;
    }));
  }

  // Megento APIs
  getPortStatus(requestParams) {
    const url = "/rest/V1/getportstatus?";
    return this._service.getEstoreData(url + requestParams).pipe(map((response: any) => {
      return response;
    }));
  }

  eligibilityCheck(requestParams) {
    const url = "/rest/V1/eligibilitycheck?";
    return this._service.getEstoreData(url + requestParams).pipe(map((eligibleResponse: any) => {
      return eligibleResponse;
    }));
  }

  GetNewNumbers(dataForRetrieveNumberAPI: any): Observable<any[]> {
    const data = dataForRetrieveNumberAPI;
    return this._service
      .postROI("/store/v1/retrievenumbers?_format=hal_json", data)
      .pipe(map((response: any) => {
        if (response.NumberDetailsRetrieveResponse) {
          return response.NumberDetailsRetrieveResponse.ListOfItemDetails[0].ItemDetails;
        } else {
          return response;
        }
      }));
  }

  getRandomNumber(numberList: any): Observable<any> {
    const data = numberList;
    return this._service
      .postROI("/rest/V1/random-number", data)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  clearMnpLocalStorages() {
    if (localStorage) {
      localStorage.removeItem("MNP-PRE-SELECT");
      localStorage.removeItem('MNP-CUSTOMER');
      localStorage.removeItem('MNP-FLOW');
      localStorage.removeItem('MNP-EDIT');
    }
  }

  doGuestLogin(response, customerIDNo) {
    this._userService.doGuestLogin(response, customerIDNo);
    this._deviceDataService.publishLoggerInUserName('GUEST');
  }

}
