import { Injectable } from "@angular/core";
import { Subject ,  Observable } from "rxjs";
import { AppService } from "../../../../Service/app.service";
import { map } from "rxjs/operators";
import "lodash";

@Injectable()
export class DeviceSummaryService {

    constructor(private _service: AppService) {}

public AddToCartForMNPService(orderPlanName: string) {
    // const url="/rest/V1/planaddtocart/"+ orderPlanName + "/planname/PlanMonthlyPay/OneTimePayment/0/user/";
    const url = "/rest/V1/planaddtocart/" + orderPlanName + "/planname/PlanMonthlyPay/OneTimePayment/0/guest/null";
    // const url="/rest/V1/planaddtocart/" + orderPlanName + "/planname/"+ PlanMonthlyPay + "/" + OneTimePayment +
    //  "/0/user/op3l1r47lnkn38304yxdhjlcjxosyown";
   // const requestParams="";
    return this._service
    .postEstoreData(url)
    .pipe(map((response: any) => {
        return response;
     }));
    }
}
