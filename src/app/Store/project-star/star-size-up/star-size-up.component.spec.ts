import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppService } from 'app/Service/app.service';
import { AppMockService } from 'app/Service/appmock.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { ProductService } from 'app/Service/product.service';
import { sharedPipes } from 'app/shared/pipes';
import { LifestylePlansComponent } from 'app/Store/plan/lifestyle-plans/lifestyle-plans.component';
import { PlanPurchaseService } from 'app/Store/plan/plan-purchase/plan-purchase.service';
import { configureTestSuite } from 'ng-bullet';
import { of } from 'rxjs';
import { StarSizeUpComponent } from "./star-size-up.component";
import { HttpClient } from '@angular/common/http';

class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}
class MockactivatedRoute {
    snapshot(url: string) {
        return url;
    }
}

class MockAppService {
    getEstoreData(url) {
        return of({
            "status": true,
            "message": "In stock",
            "in_stock": true
        });
    }
}

const base_plan = { "base_plan": [{ "name": "MEGA<sup style=\"font-size:0.5em;top:-1.1em;\">TM<\/sup>", "sku": "Ultra-Base", "monthlyPlan": "80.0000", "orderPlanBundle": "PB19090", "orderServiceBundle": "RTP0010", "PlanMonthlyPay": "80.0000", "OneTimePayment": null, "newCustomer": "0", "segment": null, "upfrontInstallment": null, "contract": null, "PlanName": "MEGA<sup style=\"font-size:0.5em;top:-1.1em;\">TM<\/sup>", "plan_title": "Celcom Ultra", "plan_subtitle": "Celcom Ultra", "offer": "<style>#step2 > div > section > div > div > div.tab-margin > div:nth-child(1) > div > div > div > div.star_ultra_details > p > div {\r\ndisplay: none;\r\n}<\/style><p><span><s>30GB<\/s> 40GB monthly high-speed Internet<\/span><br \/><span>Unlimited calls to all networks<\/span><br \/><span>RM0.20 per SMS<\/span><\/p>", "selected_offer_title": "10Mbps", "data_limit": "40", "banner_image": null, "mobile_image": null, "footNote": null, "upper_age_limit": null, "lower_age_limit": "18", "ngn_part_number": "PB19090", "is_xpax": false, "additional_information": null, "productType": null, "startDate": null, "endDate": null, "backgroundColor": null, "indicatorClass": null, "productText": null, "keyFiguresText": null, "keyText": "RM80", "buyNowLink": "\/plans\/mega", "buyNowText": "Buy now", "knowMoreLink": null, "knowMoreText": null, "mobileDescription": null, "tableInfo": [], "termsAndCondition": { "plans": { "label": "Delivery Locations", "desc": null }, "contractTerms": { "label": "Contract Duration", "desc": "24 months contract" }, "legal": { "label": "Ownership", "desc": null }, "cancellation": { "label": "Refund Policy", "desc": null } }, "is_premium_plan": false, "bill_type": 1 }] };

describe('StarSizeUpComponent', () => {
    let component: StarSizeUpComponent;
    let fixture: ComponentFixture<StarSizeUpComponent>;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
            ],
            declarations: [
                sharedPipes,
                StarSizeUpComponent,
            ],
            providers: [
                HttpClient,
                { provide: AppService, useClass: AppMockService },
                DeviceDataService,
                ProductService,
                PlanPurchaseService,
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
            },],
            schemas: [NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(StarSizeUpComponent);
        component = fixture.componentInstance;
    });

    it('It should create StarSizeUpComponent', () => {
        expect(component).toBeTruthy();
    });


    it('should call ngOnInit', () => {
        const spy = spyOn(component, 'ngOnInit');
        component.data = base_plan;
        component.selectedProd = { pass: "test", type: "test" };
        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
    });

    it('It should call onContinueSwitchingStarPassTab', () => {
        const spy = spyOn(component, 'onContinueSwitchingStarPassTab').and.callThrough();
        component.popupActionType = 'pass';
        component.onContinueSwitchingStarPassTab();

        component.popupActionType = 'add';
        component.onContinueSwitchingStarPassTab();

        component.popupActionType = 'remove';
        component.onContinueSwitchingStarPassTab();

        expect(spy).toHaveBeenCalled();
    });

    it('It should call onCancellingStarSwitchingPassTab', () => {
        const spy = spyOn(component, 'onCancellingStarSwitchingPassTab').and.callThrough();
        component.onCancellingStarSwitchingPassTab();
        expect(spy).toHaveBeenCalled();
    });

    it('It should call removeCurrentSubPass', () => {
        const spy = spyOn(component, 'removeCurrentSubPass');
        component.removeCurrentSubPass();
        expect(spy).toHaveBeenCalled();
    });

    it('It should call passTabSelection', () => {
        const spy = spyOn(component, 'passTabSelection').and.callThrough();
        component.data = { pass_plan: [{ data: 1, is_default: "2" }, { data: 2, is_default: "1" }] };
        component.ultraData = { data: 1, is_default: "2", data_limit: 1 };
        component.passTabSelection();
        expect(spy).toHaveBeenCalled();
    });

    it('It should call moveToCatalog', () => {
        const spy = spyOn(component, 'moveToCatalog');
        component.selectedType = true;
        component.selectedPass = { sku: "test" };
        component.moveToCatalog();
        expect(spy).toHaveBeenCalled();
    });

    it('It should call RedirectToCatalog', () => {
        const spy = spyOn(component, 'RedirectToCatalog');

        component.RedirectToCatalog();
        expect(spy).toHaveBeenCalled();
    });

    it('It should call OnRemoveTypeSelection', () => {
        const spy = spyOn(component, 'OnRemoveTypeSelection');

        component.OnRemoveTypeSelection('test');

        localStorage.setItem("MNP-FLOW", 'test');
        localStorage.setItem("PrincipleNumberSelected", '54516217');

        expect(spy).toHaveBeenCalled();
    });
});
