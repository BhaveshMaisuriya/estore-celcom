import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, Headers } from '@angular/http';
import { BaseService } from '../../../base.service';
import { AppService } from '../../../Service/app.service';
import { environment } from 'environments/environment';

@Injectable()
export class SupplimentaryLinesService extends BaseService {
    prodServer: boolean = environment.production;
    constructor(private _service: AppService) {
        super();
    }
    public checkNumberOfLinesUserHasForSuppLines(customerResponse: any) {
        // to determine the max number of lines left with the user currently
        let prepaidConnections = 0;
        let postpaidConnections = 0;
        const isPostPaidExceeded = false;
        const isPrePaidExceeded = false;
        let noOfPostpaidConnections = 5;
        let maxPostpaidLinesRemaining = 0;
        if (this.prodServer) {
            noOfPostpaidConnections = 15;
        }
        if (customerResponse !== undefined) {
            customerResponse.services.forEach((item: any) => {
                if (item.pre_Pos_Indicator !== undefined) {
                    if (item.pre_Pos_Indicator === "Prepaid") {
                        prepaidConnections = prepaidConnections + 1;
                    }
                    if (item.pre_Pos_Indicator === "Postpaid") {
                        postpaidConnections = postpaidConnections + 1;
                    }
                }
            });

            if (postpaidConnections < noOfPostpaidConnections) {
                maxPostpaidLinesRemaining = (noOfPostpaidConnections - postpaidConnections);
                return {
                    "status": true,
                    "maxPostpaidLinesRemaining": maxPostpaidLinesRemaining - 1,
                }
            } else {
                return {
                    "status": false,
                    "message": "Maximum limit reached"
                };
            }
        }
    }
}
