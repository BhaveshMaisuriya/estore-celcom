import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, Headers } from '@angular/http';
import { map } from "rxjs/operators";
import { AppService } from "../../../Service/app.service";
import { BaseService } from '../../../base.service';

@Injectable()
export class BbDeviceDetailsService extends BaseService {
  BbDeviceDetailsResponse = [];
  mockBbDeviceDetailsResponse =  [
    {
      "name": "HW iPhone 8",
      "sku": "hwiPhone-8",
      "price": 0,
      "quntity": null,
      "default_plan": "Home Wireless First\u2122 Gold",
      "default_plan_sku": "hwFG",
      "order_monthly_pay": "80.0000",
      "most_popular": "1",
      "rm": "",
      "rrp_rm_strick_price": "3394.0000",
      "main_image": "\/media\/catalog\/product",
      "sub_images": [
      ],
      "dimension": "138.3 x 67.1 x 7.1 mm",
      "weight": null,
      "splash_water_dust_resistant": "0",
      "stock": "Limited Stock",
      "order_category": "HP",
      "order_model": "Apple A10 Fusion",
      "order_brand": "APPLE",
      "segment": null,
      "default_selected_color": "Gold",
      "stock_indicator_image": "\/media\/catalog\/product",
      "stock_indicator_text": null,
      "default_device_option": "0",
      "more_details": {
        "features": "Fingerprint (front-mounted), accelerometer, gyro, proximity, compass, barometer",
        "shipping_details": null,
        "what_in_the_box": null
      },
      "terms_and_condition": {
        "plans": {
          "label": "Plans",
          "desc": null
        },
        "contract_terms": {
          "label": "Contract Duration",
          "desc": "24 months contract"
        },
        "legal": {
          "label": "Legal",
          "desc": null
        },
        "cancellation": {
          "label": "Cancellation",
          "desc": null
        }
      },
      "device_product_details": [
        {
          "name": "HW iPhone 8 64GB Gold",
          "sku": "hwi8gld64GB",
          "rrp": "3394.0000",
          "discounted_device_rrp": null,
          "color": "Gold",
          "order_color": "Gold",
          "order_category": "HP",
          "color_hexa": "#cdbeab",
          "image": "\/media\/catalog\/product",
          "sub_images": [
          ],
          "order_model": "IPHONE 8 64GB",
          "part_number": "MDR5589",
          "product_type": null,
          "new_customer": "0",
          "segment": null,
          "contract": "24 months",
          "upfront_installment": null,
          "saleable_plans": [
            {
              "sku": "hFGP",
              "prices": {
                "upfront_price": "100",
                "device_price": "150",
                "penalty_price": ""
              }
            }
          ]
        },
        {
          "name": "HW iPhone 8 64GB Silver",
          "sku": "hwi8slv64GB",
          "rrp": "3394.0000",
          "discounted_device_rrp": null,
          "color": "Silver",
          "order_color": "Silver",
          "order_category": "HP",
          "color_hexa": "#c0c0c0",
          "image": "\/media\/catalog\/product",
          "sub_images": [
          ],
          "order_model": "IPHONE 8 64GB",
          "part_number": "MDR5589",
          "product_type": null,
          "new_customer": "0",
          "segment": null,
          "contract": "24 months",
          "upfront_installment": null,
          "saleable_plans": [
            {
              "sku": "hFGP",
              "prices": {
                "upfront_price": "100",
                "device_price": "150",
                "penalty_price": ""
              }
            }
          ]
        }
      ],
      "plan_product_details": [
        {
          "tab_name": "Home Wireless Plans",
          "tab_title": null,
          "tab_subtitle": null,
          "tab_data": [
            {
              "name": "Home Wireless First\u2122 Gold",
              "sku": "hwFG",
              "monthly_plan": "80.0000",
              "order_plan_bundle": "PB12090",
              "plan_monthly_pay": "80.0000",
              "segment": null,
              "upfront_installment": null,
              "contract": null,
              "plan_name": "Home Wireless First\u2122 Gold",
              "plan_title": "First\u2122 Gold. Affordable. Complete",
              "plan_subtitle": "All you need in a pocket-friendly plan. Sign up for 12 months for more privileges.",
              "product_type": null,
              "background_color": "is-bg-color-black",
              "indicator_class": null,
              "product_text": null,
              "table_info": [
                {
                  "heighlight": "0",
                  "headline": "10GB weekday + 10GB FREE weekend Internet",
                  "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg"
                },
                {
                  "heighlight": "0",
                  "headline": "10GB weekday + 10GB FREE weekend Internet",
                  "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg"
                }
              ],
              "terms_and_condition": {
                "plans": {
                  "label": "Plans",
                  "desc": null
                },
                "contract_terms": {
                  "label": "Contract Duration",
                  "desc": "24 months contract"
                },
                "legal": {
                  "label": "Legal",
                  "desc": null
                },
                "cancellation": {
                  "label": "Cancellation",
                  "desc": null
                }
              }
            },
            {
              "name": "eless Home WiFirst\u2122 Gold Plus",
              "sku": "hFGP",
              "monthly_plan": "98.0000",
              "order_plan_bundle": "PB12070",
              "plan_monthly_pay": "98.0000",
              "segment": null,
              "upfront_installment": null,
              "contract": null,
              "plan_name": "eless Home WiFirst\u2122 Gold Plus",
              "plan_title": "First\u2122 Gold Plus. Affordable. Complete",
              "plan_subtitle": "Doubleriffic dose, doubleriffic usage! Sign up for 12 months for more privileges.",
              "product_type": null,
              "background_color": "is-bg-color-black",
              "indicator_class": null,
              "product_text": null,
              "table_info": [
                {
                  "heighlight": "0",
                  "headline": "10GB weekday + 10GB FREE weekend Internet",
                  "fieldIcon": "\/sites\/default\/files\/images\/icon\/internet_gb_black\/icon_internet_10gb.svg"
                }
              ],
              "terms_and_condition": {
                "plans": {
                  "label": "Plans",
                  "desc": null
                },
                "contract_terms": {
                  "label": "Contract Duration",
                  "desc": "24 months contract"
                },
                "legal": {
                  "label": "Legal",
                  "desc": null
                },
                "cancellation": {
                  "label": "Cancellation",
                  "desc": null
                }
              }
            }
          ]
        }
      ]
    }
  ];

  constructor(private _service: AppService) {
    super();
  }

    public Find(url): Observable<any[]> {
        return this._service
            .getEstoreData(url)
            .pipe(map((response: any) => {
                return response;
            }));
    }
}
