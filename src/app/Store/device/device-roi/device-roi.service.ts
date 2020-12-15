import { Injectable } from "@angular/core";
import { BaseService } from "../../../base.service";
import { AppService } from "../../../Service/app.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class DeviceRoiService extends BaseService {

    constructor(
        private _appService: AppService
    ) {
        super();
    }
    public data = [
        {
            "id": "519",
            "name": "Samsung Galaxy A80",
            "sku": "Samsung-Galaxy-A80",
            "image": null,
            "image_title_1": null,
            "image_title_2": null,
             "register_interest_text" : " Be one of the first to Pre-Order the latest iphone in-trend!",
            "register_interest_title": "Register Your Interest",
            "tell_us_title": "Tell us about yourself",
            "model_title": "Model",
            "phone_details_title": "Select your preferred phone",
            "associated_products": [ {
                "color": "White",
                "hexcode": "#ffffff",
                "storage": "128GB",
                "model": "GALAXY A80 128GB",
                "sku": "SamsungGalaxyA80128gbwhite"
            },
            {
                "color": "Black",
                "hexcode": "#ffffff",
                "storage": "128GB",
                "model": "GALAXY A80 128GB",
                "sku": "SamsungGalaxyA80128gbBlack"
            },
            {
                "color": "Silver",
                "hexcode": "#ffffff",
                "storage": "64GB",
                "model": "GALAXY A80 64GB",
                "sku": "SamsungGalaxyA8064gbSilver"
            }
        ]
        }
     ];

    public FindFormData(url): Observable<any> {
        return this._appService
            .getEstoreData(url)
            .pipe(map((response: any) => {
                return response;
            }));
    }
    public PostFormData(url: string, requestBody: any) {
        return this._appService
          .postROI(url, requestBody)
          .pipe(map((response: any) => {
            return response;
          }));
      }

    public getData() {
        return this.data[0];
    }

}