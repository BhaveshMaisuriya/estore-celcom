import { Injectable } from "@angular/core";
import { AppService } from "../../../Service/app.service";
import { map } from "rxjs/operators";

@Injectable()
export class OrderTrackingService {
    constructor(private _service: AppService) { }
    public TrackOrder(url: any, params: any) {
        return this._service
            .postEstoreUserData(url, params)
            .pipe(map((response: any) => {
                return response;
            }));
    }
}