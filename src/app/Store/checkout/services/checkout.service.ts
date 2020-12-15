import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../../../base.service';
import { AppService } from '../../../Service/app.service';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { detectQueryString, msisdnHelper } from '../../../shared/utilities/helper.ultility';

const response = {
    "id": 10,
    "created_at": "2018-01-12 12:27:23",
    "updated_at": "2018-01-12 12:27:23",
    "is_active": true,
    "is_virtual": false,
    "items": [],
    "items_count": 0,
    "items_qty": 0,
    "customer": {
        "id": 3,
        "group_id": 1,
        "default_billing": "2",
        "default_shipping": "3",
        "created_at": "2018-01-12 12:27:16",
        "updated_at": "2018-01-13 07:48:19",
        "created_in": "Default Store View",
        "email": "jhonathan.boon@gmail.com",
        "firstname": " Jhonathan",
        "lastname": "Boon Wan",
        "store_id": 1,
        "website_id": 1,
        "addresses": [
            {
                "id": 1,
                "customer_id": 3,
                "region": {
                    "region_code": "Utah",
                    "region": "Utah",
                    "region_id": 0
                },
                "region_id": 0,
                "country_id": "IN",
                "street": [
                    "2, 4th main, 3rd cross",
                    "Madiwala"
                ],
                "company": "sdf",
                "telephone": "9995685688",
                "postcode": "560068",
                "city": "Bangalore",
                "firstname": "Jhonathan",
                "lastname": "Boon"
            },
            {
                "id": 2,
                "customer_id": 3,
                "region": {
                    "region_code": "Karnataka",
                    "region": "Karnataka",
                    "region_id": 0
                },
                "region_id": 0,
                "country_id": "IN",
                "street": [
                    "23 abc street"
                ],
                "telephone": "7845125478",
                "postcode": "560059",
                "city": "Bangalore",
                "firstname": "cust",
                "lastname": "omer",
                "default_billing": true
            },
            {
                "id": 3,
                "customer_id": 3,
                "region": {
                    "region_code": null,
                    "region": null,
                    "region_id": 584
                },
                "region_id": 584,
                "country_id": "MY",
                "street": [
                    "ads,asd"
                ],
                "telephone": "7411395002",
                "postcode": "asd",
                "city": "asd",
                "firstname": "user2",
                "lastname": "user2",
                "default_shipping": true
            }
        ],
        "disable_auto_group_change": 0
    },
    "billing_address": {
        "id": 19,
        "region": null,
        "region_id": null,
        "region_code": null,
        "country_id": null,
        "street": [
            ""
        ],
        "telephone": null,
        "postcode": null,
        "city": null,
        "firstname": null,
        "lastname": null,
        "customer_id": 3,
        "email": "jhonathan.boon@gmail.com",
        "same_as_billing": 0,
        "save_in_address_book": 0
    },
    "orig_order_id": 0,
    "currency": {
        "global_currency_code": "MYR",
        "base_currency_code": "MYR",
        "store_currency_code": "MYR",
        "quote_currency_code": "MYR",
        "store_to_base_rate": 0,
        "store_to_quote_rate": 0,
        "base_to_global_rate": 1,
        "base_to_quote_rate": 1
    },
    "customer_is_guest": false,
    "customer_note_notify": true,
    "customer_tax_class_id": 3,
    "store_id": 1,
    "extension_attributes": {
        "shipping_assignments": [
            {
                "shipping": {
                    "address": {
                        "id": 101,
                        "region": "Karnataka",
                        "region_id": 4,
                        "region_code": null,
                        "country_id": "IN",
                        "street": [
                            "whitefield, Bangalore"
                        ],
                        "company": "Capgemini",
                        "telephone": "2302538",
                        "fax": "55568568",
                        "postcode": "560068",
                        "city": "Bangalore",
                        "firstname": "Bijen",
                        "lastname": "Naorem",
                        "customer_id": 3,
                        "email": "jhonathan.boon@gmail.com",
                        "same_as_billing": 1,
                        "save_in_address_book": 0
                    },
                    "method": null
                },
                "items": [
                    {
                        "item_id": 76,
                        "sku": "iPhone7",
                        "qty": 2,
                        "name": "iPhone7",
                        "price": 55960,
                        "product_type": "simple",
                        "quote_id": "42"
                    }
                ]
            }
        ]
    }
};

@Injectable()
export class CheckoutService extends BaseService {
    private checkoutData: any;
    private ApiEndPoint = '/rest/V1/cartmine/shipping-information/';
    checkoutChanged = new Subject<void>();

    token = 'uvuxp43ei6l92pj5ynjujefiixyvfwg8';

    constructor(private _service: AppService) {
        super();
    }

    fetchCheckoutData() {
        let msisdn = '';
        let url = ApiConstant.CARTMINE_API;
        if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
            sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') &&
            sessionStorage.getItem('secretKey') !== null) {
            const orderId = sessionStorage.getItem('CAorderId');
            const orderSecret = sessionStorage.getItem('secretKey');
            url = "/rest/V1/cartmine?order_id=" + orderId + "&order_secret=" + orderSecret;
        }
        const queryStringPattern: boolean = detectQueryString(url);
        if (localStorage && localStorage.getItem("MyMsIsdn")) {
            msisdn = localStorage.getItem("MyMsIsdn");
            msisdn = msisdnHelper(msisdn);
            url = queryStringPattern ? `${url}&msisdn=${msisdn}` : `${url}?msisdn=${msisdn}`;
        }
        return this._service
            .getEstoreUserData(url)
            .pipe(map((response: any) => {
                return response;
            }))
            .subscribe(
                (data) => {
                    this.checkoutData = data;
                    this.checkoutChanged.next();
                }
            );
    }

    getCheckoutData() {
        return this.checkoutData;
    }

    setCheckoutData(checkout) {
        this.checkoutData = checkout;
        this.checkoutChanged.next();
    }

    public FindStatic() {
        return response;
    }

    public Find(apiURL): Observable<any[]> {
        let url = apiURL; // .replace(/[+_]/g, '%2B');
        let msisdn = '';
        const queryStringPattern: boolean = detectQueryString(url);
        if (typeof window !== "undefined" && localStorage && localStorage.getItem("MyMsIsdn")) {
            msisdn = localStorage.getItem("MyMsIsdn");
            msisdn = msisdnHelper(msisdn);
            url = queryStringPattern ? `${url}&msisdn=${msisdn}` : `${url}?msisdn=${msisdn}`;
        }
        // return of(bundle);
        return this._service
            .getEstoreUserData(url)
            .pipe(map((response: any) => {
                return response;
            }));
    }

    public postNewAddress(data: any) {
        const body = {
            "addressRequest": data
        };
        const details = JSON.stringify(body);
        return this._service.postROI(this.ApiEndPoint, details, this.token);
    }

    public cobpOrderCreate(data): Observable<any[]> {
        const url = '/rest/V1/cobpOrder';
        return this._service.postEstoreUserData(url, data).pipe(map((response: any) => {
            return response;
        }));
    }

}
