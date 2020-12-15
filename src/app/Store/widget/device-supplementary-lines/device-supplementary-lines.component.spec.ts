import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { DeviceSupplementaryLinesComponent } from '../../../Store/widget/device-supplementary-lines/device-supplementary-lines.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { FormsModule } from '@angular/forms';
import { ChooseYourWayComponent } from '../../guest-checkout/choose-your-way/choose-your-way.component';
import { MoreSupplementaryPopupComponent } from '../more-supplementary-popup/more-supplementary-popup.component';
import { LosingSupplementaryLinePopupComponent } from '../losing-supplementary-line-popup/losing-supplementary-line-popup.component';
import { NotificationErrorComponent } from '../notification-error/notification-error.component';
import { AppService } from '../../../Service/app.service';
import { AppMockService } from '../../../Service/appmock.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { element } from 'protractor';
import { Broadcaster } from '../../../Model/broadcaster.model';
import { ProductService } from '../../../Service/product.service';
import { UserService } from '../../../Service/user.service';
import { PlanPurchaseService } from "./../../plan/plan-purchase/plan-purchase.service";
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { MsisdnInputComponent } from '../msisdn-input/msisdn-input.component';
import { NricInputComponent } from '../nric-input/nric-input.component';
import { OtpInputComponent } from '../otp-input/otp-input.component';
import { MnpService } from '../../mnp/services/mnp.service';
import { SwitchToCelcomComponent } from '../../mnp/switch-to-celcom/switch-to-celcom.component';
import { NotificationBarComponent } from '../notification-bar/notification-bar.component';
import { AgeEligibilityPopupComponent } from '../age-eligibility-popup/ageeligiblity.popup.component';
import { SearchHighlight } from '../../../shared/pipes/search-highlight.pipe';
import { CookieService } from 'ngx-cookie-service';
import { BroadbandService } from '../../../Service/broadband.service';
import { GuestCheckoutService } from '../../guest-checkout/services/guest-checkout.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { AnalyticsService } from '../../../Service/analytic.service';
import { RendererService } from '../../../Service/renderer.service';
import { SeoService } from '../../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { DeviceDetailsNumberService } from '../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import { Observable } from 'rxjs';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';

let numberResp:any = [{"status":true,"is_premium_plan_message":"","mobile_numbers":[{"number":"0193267552"},{"number":"0132525247"},{"number":"0196822544"},{"number":"0193269316"},{"number":"0132265788"},{"number":"0133664420"},{"number":"0133353420"},{"number":"0136776443"},{"number":"0132428394"},{"number":"0132061734"},{"number":"0133505523"},{"number":"0196305447"},{"number":"0196789461"},{"number":"0133641269"},{"number":"0133717885"},{"number":"0136218994"},{"number":"0196080158"},{"number":"0133366130"},{"number":"0196435407"},{"number":"0132057066"},{"number":"0136607636"},{"number":"0133011724"},{"number":"0133718242"},{"number":"0133836046"},{"number":"0196435029"},{"number":"0193485351"},{"number":"0193841647"},{"number":"0193378396"},{"number":"0136948846"},{"number":"0196040522"}]}];

class MockAppService {
 apiUrlA = "/rest/V1/retrieve-number";
 dataForRetrieveNumberA = {
    data: {
      numberService: "POSTPAID",
      numberCategory: "NORMAL",
      numRecords: "30",
      sourceSystem: "",
      planType: "VOICE"
    }
  };
    postROI(apiUrlA, dataForRetrieveNumberA) {
        return Observable.of(numberResp);
    }
}

class MockProductService {
    apiUrlB = "/rest/V1/retrieve-number";
    dataForRetrieveNumberB = {
       data: {
        numberCategory: "NORMAL",
         numberService: "POSTPAID",
         numRecords: "30",
         planType: "VOICE",
         sourceSystem: ""
       }
     };
    GetNewNumbers(apiUrlB, dataForRetrieveNumberB) {
        if(apiUrlB == '/error'){
            return Observable.throw({error: {errorObj: '000', errorMessage: "error"}});
        }
        return Observable.of(numberResp);
    }
}

describe('DeviceSupplementaryLinesComponent', () => {
    let component: DeviceSupplementaryLinesComponent;
    let fixture: ComponentFixture<DeviceSupplementaryLinesComponent>;
    const fakeActivatedRoute = {
        snapshot: {}
    } as ActivatedRoute;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
              FormsModule,
              RouterTestingModule,
              
              IconModule,
              materialModules,
            ],
            declarations: [DeviceSupplementaryLinesComponent, PageLoaderComponent, ChooseYourWayComponent, MoreSupplementaryPopupComponent,
                LosingSupplementaryLinePopupComponent, NotificationErrorComponent, MsisdnInputComponent, NricInputComponent,
                 OtpInputComponent,  AgeEligibilityPopupComponent, NotificationBarComponent, SwitchToCelcomComponent, SearchHighlight,
                 sharedPipes,
            ],
            providers: [PlanPurchaseService, CommonUtilService,
                { provide: AppService, useClass: MockAppService }, { provide: ActivatedRoute, useValue: fakeActivatedRoute },
                DeviceDataService, { provide: ProductService, useClass: MockProductService }, UserService,
                 MnpService, CookieService, BroadbandService,
                 GuestCheckoutService, EStoreAnalysticsService, AnalyticsService, RendererService, SeoService,
                  DecimalPipe, DeviceDetailsNumberService]
        })
            .compileComponents();
    }));
    beforeEach(async(() => {
        fixture = TestBed.createComponent(DeviceSupplementaryLinesComponent);
        component = fixture.componentInstance;
        component.supplimentaryData = {};
        component.supplimentaryData.supplementary_details = {
            "name": "Celcom Mobile Family™",
            "celcom_family_plan": [
                {
                    "name": "First™ Gold",
                    "max_line": "1",
                    "part_number": "PB12540",
                    "price": "48.0000",
                    "enable_plan_skus": ["FG", "FGP", "FP", "FPP", "FGS"],
                    "subsidy": "10"
                },
                {
                    "name": "First™ Gold Plus",
                    "max_line": "2",
                    "part_number": "PB12540",
                    "price": "48.0000",
                    "enable_plan_skus": ["FGP", "FP", "FPP", "FGS"],
                    "subsidy": "10"
                },
                {
                    "name": "First™ Platinum",
                    "max_line": "4",
                    "part_number": "PB12540",
                    "price": "48.0000",
                    "enable_plan_skus": ["FP", "FPP"],
                    "subsidy": "10"
                },
                {
                    "name": "First™ Platinum Plus",
                    "max_line": "5",
                    "part_number": "PB12540",
                    "price": "48.0000",
                    "enable_plan_skus": ["FPP"],
                    "subsidy": "10"
                },
                {
                    "name": "First™ Gold Supreme",
                    "max_line": "3",
                    "part_number": "PB12540",
                    "price": "48.0000",
                    "enable_plan_skus": ["FP", "FPP", "FGS"],
                    "subsidy": "10"
                }
            ]
        };
        component.suppLinesAddedDetails = [
            {
            "maxCount": "0",
            "partNumber": "PB12540",
            "planPhoneNumber": "0133634565",
            "planPrice": "48.0000",
            "planType": "Celcom Mobile Family™",
            "specialPrice": "0",
            "subsidyAmount": "150"
        }
    ];
    component.selectedNumbersList = [];
        fixture.detectChanges();
    }));

    it('should create', async(() => {
        fixture.whenStable().then(() => {
            expect(component).toBeTruthy();
        });
    }));
    it('should check the ngModel input', () => {
        if (component.deviceNumberToDisplay != null) {
            component.searchNumbersForPattern();
            fixture.detectChanges();
            const de = fixture.debugElement.nativeElement.querySelector('input');
            expect(de.textContent).toEqual('6758');
            expect(de.textContent.length).toBeLessThanOrEqual(4);
        }
    });
    it('showSupp function called', () => {
        component.showSupp();
        fixture.detectChanges();
    });

    it('isPlanTypeSelected function called', () => {
        component.selectedPlanType = "Celcom Mobile Family™";
        component.noOfLinesMoreAllowed = 1;
        expect(component.supplimentaryData).toBeDefined();
    });

     it('goBackStartPoint function called', () => {
        component.goBackStartPoint();
        fixture.detectChanges();
        expect(component.isDisplaySuppLineNumList).toBeFalsy();
        expect(component.showSuppLines).toBeFalsy();
        expect(component.isFinishAddingSuppLines).toBeFalsy();
        expect(component.isShowAddedSuppLines).toBeTruthy();
        expect(component.confirmSubsidySelection).toBeFalsy();
     });

     it('suppPlanSelected function called', () => {
        fixture.detectChanges();
        component.noOfLinesMoreAllowed = 1;
        component.suppPlanSelected();
        // if (component.noOfLinesMoreAllowed >= 1 && !component.isProjectStar) {
        //   expect(component.isDisplaySuppLineNumList).toBeTruthy();
        //   expect(component.showSuppLines).toBeFalsy();
        //   expect(component.isFinishAddingSuppLines).toBeTruthy();
        //   expect(component.displayAddedSuppList).toBeFalsy();
        //   expect(component.loading).toBeTruthy();
        //   expect(component.isDisplaySuppLineNumList).toBeTruthy();
        //   expect(component.withSuppLines).toBeFalsy();
        // }
        // component.noOfLinesMoreAllowed = 0;
        // if (component.noOfLinesMoreAllowed < 1 && !component.isProjectStar) {
        //   expect(component.IsDisplaySupplementaryPopup).toBeTruthy();
        // }
     });

     it('addSupplimentaryLines fucntion called', () => {
    component.addSupplimentaryLines();
    fixture.detectChanges();
    const numberExists = false;
    if (!numberExists) {
        // expect(component.numberExists).toBeFalsy();
        // expect(component.isFinishAddingSuppLines).toBeFalsy();
        // expect(component.isDisplaySuppLineNumList).toBeFalsy();
        // expect(component.showSuppLines).toBeFalsy();
        // expect(component.displayAddedSuppList).toBeTruthy();
        // expect(component.confirmSubsidySelection).toBeFalsy();
        // expect(component.showSubsidy).toBeTruthy();
         component.selectedNumbersList.push('0123456789');
        // expect(component.selectedNumbersList).toBeDefined();
        // expect(component.suppLinesAddedDetails).toBeDefined();
        // expect(component.isShowAddedSuppLines).toBeTruthy();
    }
     });

     it('deleteSuppLine function called by user', () => {
        const index = 1;
        component.deleteSuppLine(index);
        fixture.detectChanges();
        expect(component.displayAddedSuppList).toBeTruthy();
        expect(component.isFinishAddingSuppLines).toBeFalsy();
        expect(component.showSubsidy).toBeTruthy();
     });

    it('Subsidy selection confirmed by user', () => {
        component.ConfirmSubsidySelection();
        fixture.detectChanges();
        expect(component.isDisplaySuppLineNumList).toBeFalsy();
        expect(component.showSuppLines).toBeFalsy();
        expect(component.isDisplayLoginLink).toBeFalsy();
        expect(component.confirmSubsidySelection).toBeFalsy();
        expect(component.showSubsidy).toBeFalsy();
        if (typeof window !== "undefined" && localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
            const suppLinesAddedByTheUser = localStorage.getItem("suppLinesAddedByTheUser");
            expect(suppLinesAddedByTheUser).toBeDefined();
        }
    });
    it('Finished Adding Supplementary lines by the user', () => {
        component.finishAddingSuppLines();
        fixture.detectChanges();
        expect(component.isFinishAddingSuppLines).toBeTruthy();
        expect(component.isDisplaySuppLineNumList).toBeFalsy();
        expect(component.showSuppLines).toBeFalsy();
        expect(component.confirmSubsidySelection).toBeTruthy();
    });
    it('User clicked on back button from supplementary addition section', () => {
        component.backToSuppLines();
        fixture.detectChanges();
        expect(component.IsDisplayLossSupplementaryPopup).toBeTruthy();
    });
    it('should test refresh numbers', () => {
        component.editOrder = false;
        spyOn(component, "callRetrieveNumbersAPI");
        const dataForRetrieveNumberAPI = {
            data: {
              numberService: "POSTPAID",
              numberCategory: "NORMAL",
              numRecords: "30",
              sourceSystem: "",
              planType: "VOICE"
            }
          };
        component.getRefreshNumbers();
        expect(component.errorExits).toBe(false);
        expect(component.editOrder).toBe(false);
        expect(component.selectedNumber).toBe(null);
        expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(dataForRetrieveNumberAPI);
        expect(component.searchNumber).toBe("");
    });
    it('should test searchNumbersForPattern', () => {
        component.searchNumber = "";
        spyOn(component, "callRetrieveNumbersAPI");
        const dataForRetrieveNumberAPI = {
            data: {
              numberCategory: "NORMAL",
              numberService: "POSTPAID",
              sourceSystem: "",
              planType: "VOICE",
              numRecords: "30"
            }
          };
        component.deviceNumberToDisplay = [{"number":"0193267552"},{"number":"0132525247"},{"number":"0196822544"},{"number":"0193269316"},{"number":"0132265788"}];
        component.searchNumbersForPattern();
        expect(component.errorExits).toBe(false);
        expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(dataForRetrieveNumberAPI);
        component.searchNumber = 11111;
        component.searchNumbersForPattern();
        expect(component.errorExits).toBe(true);
        component.searchNumber = 1;
        component.searchNumbersForPattern();
        expect(component.errorExits).toBe(true);
        component.searchNumber = 2222;
        dataForRetrieveNumberAPI.data["criteria"] =
            "CONTAINS";
          dataForRetrieveNumberAPI.data[
            "numberPattern"
          ] = component.searchNumber;
        component.searchNumbersForPattern();
        expect(component.errorExits).toBe(false);
        expect(component.searchStatus).toBe(true);
        expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(dataForRetrieveNumberAPI);
    });
    it('should test getnewnumbers', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        spyOn(devicedataservice, "publishDisclaimerAgree");
        spyOn(component, "callRetrieveNumbersAPI");
        const dataForRetrieveNumberAPI = {
            data: {
              numberService: "POSTPAID",
              numberCategory: "NORMAL",
              numRecords: "30",
              sourceSystem: "",
              planType: "VOICE"
            }
          };
          component.typeOfNumber = "abc";
        component.getNewNumbers();
        expect(devicedataservice.publishDisclaimerAgree).toHaveBeenCalledWith(false);
        expect(component.typeOfNumHighlight).toBe("NEW_NUMBER");
        expect(component.errorExits).toBe(false);
        expect(component.preventStyle).toEqual({
            "pointer-events": "none"
          });
          expect(component.typeOfNumber).toBe("NEW_NUMBER");
        expect(component.callRetrieveNumbersAPI).toHaveBeenCalledWith(dataForRetrieveNumberAPI);
        component.typeOfNumber = "NEW_NUMBER";
        component.getNewNumbers();
    }));
    it('should test SelectNumber', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.SelectNumber("0111020102");
        expect(component.selectedNumber).toBe("0111020102");
        expect(component.isPrincipleNumSelected).toBe(true);
    }));
    it('should test numberKeyHandler', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        const ev = {keyCode: 13, which: 12};
        spyOn(component, "searchNumbersForPattern");
        component.numberKeyHandler(ev);
        expect(component.errorExits).toBe(false);
        expect(component.noNumbersToDisplay).toBe(false);
        expect(component.searchNumbersForPattern).toHaveBeenCalled();
    }));
    it('should test numberValidation', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        const ev = {keyCode: 7, which: 7, preventDefault: jasmine.createSpy()};
        spyOn(component, "searchNumbersForPattern");
        component.numberValidation(ev);
        expect(ev.preventDefault).toHaveBeenCalled();
        const a = {keyCode: 13, which: 13, preventDefault: jasmine.createSpy()};
        component.numberValidation(a);
    }));
    it('should test OnRetrieveNumberAPIFailureForDeviceSupp', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        const resp = [{status: false, message: "error message"}];
        component.searchStatus = true;
        component.OnRetrieveNumberAPIFailureForDeviceSupp(resp);
        expect(component.loading).toBe(false);
        expect(component.deviceNumberToDisplay).toEqual([]);
        expect(component.totalNumbers).toEqual([]);
        expect(component.totalPageItems).toEqual([]);
        expect(component.DeviceDetailsNumberResponse).toBe(null);
        expect(component.noNumbersToDisplay).toBe(false);
        expect(component.searchStatus).toBe(false);
        expect(component.errorExits).toBe(true);
        expect(component.errorMessage).toEqual({ message: resp[0].message });
    }));
    it('should test OnRetrieveNumberAPISuccessForDeviceSupp', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        spyOn(component, "setPage");
        component.selectedNumber = null;
        const numberResponse = [{"status": true, "is_premium_plan_message": "", "mobile_numbers": [{"number": "0193267552"}, {"number": "132525247"}]}];
        component.OnRetrieveNumberAPISuccessForDeviceSupp(numberResponse);
        expect(component.totalNumbers).toEqual([{"number": "0193267552"}, {"number": "0132525247"}]);
        expect(component.setPage).toHaveBeenCalledWith(1);
        expect(component.DeviceDetailsNumberResponse).toEqual([{"status": true, "is_premium_plan_message": "", "mobile_numbers": [{"number": "0193267552"}, {"number": "0132525247"}]}]);
        expect(component.deviceNumberToDisplay).toBe(component.DeviceDetailsNumberResponse);
    }));
    it('test goBackStartPoint', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.noOfSuppLinesAdded = 0;
        component.goBackStartPoint();
        expect(component.showSuppLines).toBe(false);
        expect(component.isFinishAddingSuppLines).toBe(false);
        expect(component.confirmSubsidySelection).toBe(false);
        expect(component.isDisplaySuppLineNumList).toBe(false);
        expect(component.isShowAddedSuppLines).toBe(true);
    }));
    it('test backToSuppLines', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.backToSuppLines();
        expect(component.IsDisplayLossSupplementaryPopup).toBe(true);
    }));
    it('should test OnContinueSupplementaryLosingPopup', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.OnContinueSupplementaryLosingPopup();
        expect(component.IsDisplaySupplementaryPopup).toBe(false);
        expect(component.IsDisplayLossSupplementaryPopup).toBe(false);
        expect(component.withSuppLines).toBe(false);
        expect(component.displayAddedSuppList).toBe(true);
        expect(component.confirmSubsidySelection).toBe(false);
    }));
    it('should test OnLeaveSupplementaryPopup', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.withSuppLines = true;
        component.OnLeaveSupplementaryPopup();
        // expect(component.IsDisplayLossSupplementaryPopup).toBe(false);
        // expect(component.isDisplaySuppLineNumList).toBe(false);
        // expect(component.withSuppLines).toBe(true);
        // expect(component.showSuppLines).toBe(true);
        // expect(component.displayAddedSuppList).toBe(true);
        // expect(component.confirmSubsidySelection).toBe(false);
        component.withSuppLines = false;
    }));
    it('should test OnContinueSupplementaryPopup', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        component.suppLinesAddedDetails = [];
        spyOn(devicedataservice, "publishAddToCartEnabling");
        spyOn(devicedataservice, "publishSupplimentaryLines");
        spyOn(devicedataservice, "publishSupplinesLinesPrice");
        spyOn(devicedataservice, "publishPrincipalLine");
        component.OnContinueSupplementaryPopup();
        expect(component.IsDisplayLossSupplementaryPopup).toBe(false);
        expect(component.isDisplaySuppLineNumList).toBe(false);
        expect(component.withSuppLines).toBe(false);
        expect(devicedataservice.publishAddToCartEnabling).toHaveBeenCalledWith(false);
        expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith(component.suppLinesAddedDetails);
        expect(devicedataservice.publishSupplinesLinesPrice).toHaveBeenCalledWith(component.suppLinesAddedDetails);
        expect(devicedataservice.publishPrincipalLine).toHaveBeenCalledWith(true);
    }));
    it('should test finishaddingsupplines', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
        localStorage.setItem("suppLinesAddedByTheUser", "[]");
        component.suppLinesAddedDetails = [
            {
            planPhoneNumber: "0122222111",
            planPrice: "11",
            planType: "family",
            partNumber: "ABC",
            maxCount: "2",
            specialPrice: "123",
            subsidyAmount: "111"
            }, {
                planPhoneNumber: "0133122114",
                planPrice: "12",
                planType: "family",
                partNumber: "ABC",
                maxCount: "2",
                 specialPrice: "133",
                 subsidyAmount: "121"
            }
        ];
        spyOn(devicedataservice, "publishAddToCartDisabling");
        component.isUserLoggedIn = true;
        component.ConfirmSubsidySelection();
        expect(component.enableNRICfield).toBe(false);
        expect(component.showSuppLines).toBe(false);
        expect(component.isDisplaySuppLineNumList).toBe(false);
        expect(component.isDisplayLoginLink).toBe(false);
        expect(component.confirmSubsidySelection).toBe(false);
        expect(component.showSubsidy).toBe(false);
        const abc = localStorage.getItem("suppLinesAddedByTheUser");
        expect(abc).toBe(JSON.stringify(component.suppLinesAddedDetails));
        expect(devicedataservice.publishAddToCartDisabling).toHaveBeenCalledWith(false);
        localStorage.removeItem("suppLinesAddedByTheUser");
        component.suppLinesAddedDetails = [];
        component.isUserLoggedIn = false;
        component.ConfirmSubsidySelection();
        expect(component.enableNRICfield).toBe(true);
        }));
        it('test redirectedToPlanPageFromCart', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
            spyOn(devicedataservice, "publishSupplinesLinesPrice");
            spyOn(devicedataservice, "publishSupplimentaryLines");
            spyOn(localStorage, "removeItem");
            const abc = [
                {
                planPhoneNumber: "0122222111",
                planPrice: "11",
                planType: "family",
                partNumber: "ABC",
                maxCount: "2",
                specialPrice: "123",
                subsidyAmount: "111"
                }, {
                    planPhoneNumber: "0133122114",
                    planPrice: "12",
                    planType: "family",
                    partNumber: "ABC",
                    maxCount: "2",
                     specialPrice: "133",
                     subsidyAmount: "121"
                }
            ];
            component.suppLinesAddedDetails = abc;
            component.noOfLinesMoreAllowed = 3;
            localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(abc));
            component.redirectedToPlanPageFromCart();
            expect(component.showSuppLines).toBe(false);
            expect(component.suppLinesOption).toBe(false);
            expect(component.isShowAddedSuppLines).toBe(true);
            expect(component.confirmSubsidySelection).toBe(false);
            expect(component.isDisplaySuppLineNumList).toBe(false);
            expect(component.isFinishAddingSuppLines).toBe(true);
            expect(component.showSubsidy).toBe(true);
            expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith(component.suppLinesAddedDetails);
            expect(devicedataservice.publishSupplinesLinesPrice).toHaveBeenCalledWith(component.suppLinesAddedDetails);
            expect(component.noOfLinesMoreAllowed).toBe(1);
            // expect(localStorage.removeItem).toHaveBeenCalledWith("suppLinesAddedByTheUser");
            component.suppLinesAddedDetails = [];
        }));
        it('test redirectedToPlanPageForAddingExcessPlan', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
            spyOn(devicedataservice, "publishSupplinesLinesPrice");
            spyOn(devicedataservice, "publishSupplimentaryLines");
            spyOn(devicedataservice, "publishExtraSuppLinesAddedByUser");
            spyOn(localStorage, "removeItem");
            const abc = [
                {
                planPhoneNumber: "0122222111",
                planPrice: "11",
                planType: "family",
                partNumber: "ABC",
                maxCount: "2",
                specialPrice: "123",
                subsidyAmount: "111"
                }, {
                    planPhoneNumber: "0133122114",
                    planPrice: "12",
                    planType: "family",
                    partNumber: "ABC",
                    maxCount: "2",
                     specialPrice: "133",
                     subsidyAmount: "121"
                }
            ];
            const a = {maxPostpaidLinesRemaining: 3};
            component.suppLinesAddedDetails = abc;
            localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(abc));
            localStorage.setItem("suppLinesDetailsOfUser", JSON.stringify(a));
            component.redirectedToPlanPageForAddingExcessPlan();
            expect(component.showSuppLines).toBe(false);
            expect(component.suppLinesOption).toBe(false);
            expect(component.isShowAddedSuppLines).toBe(true);
            expect(component.confirmSubsidySelection).toBe(false);
            expect(component.isDisplaySuppLineNumList).toBe(false);
            expect(component.isFinishAddingSuppLines).toBe(false);
            expect(component.showSubsidy).toBe(true);
            expect(component.noOfLinesMoreAllowed).toBe(0);
            expect(devicedataservice.publishExtraSuppLinesAddedByUser).toHaveBeenCalledWith(component.noOfLinesMoreAllowed);
            expect(devicedataservice.publishSupplimentaryLines).toHaveBeenCalledWith(component.suppLinesAddedDetails);
            expect(devicedataservice.publishSupplinesLinesPrice).toHaveBeenCalledWith(component.suppLinesAddedDetails);
            expect(localStorage.removeItem).toHaveBeenCalledWith("suppLinesAddedByTheUser");
            localStorage.removeItem("suppLinesDetailsOfUser");
            component.suppLinesAddedDetails = [];
        }));
        it('test suppplanselected', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
            component.noOfLinesMoreAllowed = 0;
            component.suppPlanSelected();
            expect(component.IsDisplaySupplementaryPopup).toBe(true);
            component.noOfLinesMoreAllowed = 1;
            spyOn(component, "getNewNumbers");
            spyOn(component, "getRefreshNumbers");
            component.suppPlanSelected();
            expect(component.isDisplaySuppLineNumList).toBe(true);
            expect(component.showSuppLines).toBe(false);
            expect(component.isFinishAddingSuppLines).toBe(true);
            expect(component.displayAddedSuppList).toBe(false);
            expect(component.loading).toBe(true);
            expect(component.withSuppLines).toBe(false);
            expect(component.isDisplaySuppLineNumList).toBe(true);
            expect(component.confirmSubsidySelection).toBe(false);
            expect(component.getNewNumbers).toHaveBeenCalled();
            expect(component.getRefreshNumbers).toHaveBeenCalled();
        }));
        it('test finishAddingSuppLines', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
            component.suppLinesAddedDetails = [
                {
                planPhoneNumber: "0122222111",
                planPrice: "11",
                planType: "family",
                partNumber: "ABC",
                maxCount: "2",
                specialPrice: "123",
                subsidyAmount: "111"
                }, {
                    planPhoneNumber: "0133122114",
                    planPrice: "12",
                    planType: "family",
                    partNumber: "ABC",
                    maxCount: "2",
                     specialPrice: "133",
                     subsidyAmount: "121"
                }
            ];
            component.finishAddingSuppLines();
            expect(component.confirmSubsidySelection).toBe(true);
            expect(component.showSuppLines).toBe(false);
            expect(component.isDisplaySuppLineNumList).toBe(false);
            expect(component.isFinishAddingSuppLines).toBe(true);
            expect(component.TotalSubsidyAmount).toBe(232);
            component.suppLinesAddedDetails = [];
            spyOn(devicedataservice, "publishAddToCartDisabling");
            component.isUserLoggedIn = true;
            component.finishAddingSuppLines();
            expect(devicedataservice.publishAddToCartDisabling).toHaveBeenCalledWith(false);
            component.isUserLoggedIn = false;
        }));
        it('test callRetrieveNumbersAPI with status false', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
            const dataForRetrieveNumberAPI = {
                data: {
                  numberService: "POSTPAID",
                  numberCategory: "NORMAL",
                  numRecords: "30",
                  sourceSystem: "",
                  planType: "VOICE"
                }
              };
            component.retrievenumberURL = '/status-true';
            component.typeOfNumHighlight = 'NEW_NUMBER';
            component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
            numberResp = [{"status": false, "is_premium_plan_message": "", "message": "error message"}];
            component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
            component.typeOfNumHighlight = 'NEW_NUMBERs';
            component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
        }));
        it('test callRetrieveNumbersAPI with status error', inject([DeviceDataService], (devicedataservice: DeviceDataService) => {
            const dataForRetrieveNumberAPI = {
                data: {
                  numberService: "POSTPAID",
                  numberCategory: "NORMAL",
                  numRecords: "30",
                  sourceSystem: "",
                  planType: "VOICE"
                }
              };
            component.retrievenumberURL = '/error';
            component.typeOfNumHighlight = 'NEW_NUMBER';
            component.searchStatus = true;
            component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
            component.searchStatus = false;
            component.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
            
        }));

        it('should call ngOnInit', () => {
            spyOn(component, "Init");
            localStorage.setItem("Principal_Number", "0132205293");
            localStorage.setItem("SelectedPlanDetailsInDevice", JSON.stringify({
              "name": "First\u2122 Platinum Plus",
              "sku": "FPP",
              "monthlyPlan": "188.0000",
              "orderPlanBundle": "PB11860",
              "orderServiceBundle": "RTP0010",
              "PlanMonthlyPay": "188.0000",
              "OneTimePayment": null,
              "newCustomer": "0",
              "segment": "10",
              "upfrontInstallment": null,
              "contract": "24",
              "PlanName": "First\u2122 Platinum Plus",
              "plan_title": "First\u2122 Platinum Plus",
              "plan_subtitle": "Happiness unlimited. Sign up for 12 months and get extra privileges.",
              "banner_image": "\/sites\/default\/files\/images\/banner\/product_mega_postpaidlifestyle_v2_platinumplus_lg_1.jpg",
              "mobile_image": "\/sites\/default\/files\/images\/banner\/product_mega_postpaidlifestyle_v2_platinumplus_lg_0.jpg",
              "footNote": null,
              "upper_age_limit": null,
              "lower_age_limit": "18",
              "ngn_part_number": "PB11900",
              "is_xpax": false,
              "additional_information": null,
              "productType": "Service",
              "startDate": null,
              "endDate": null,
              "backgroundColor": "is-bg-color-black",
              "indicatorClass": "is-level-platinum-plus",
              "productText": "Platinum Plus",
              "keyFiguresText": "100 GB",
              "keyText": "RM 188",
              "buyNowLink": "\/plans\/first-platinum-plus",
              "buyNowText": "Buy now",
              "knowMoreLink": "\/store\/plans\/first-platinum-plus",
              "knowMoreText": "Learn more",
              "mobileDescription": null,
              "tableInfo": [
                
              ],
              "termsAndCondition": {
                "plans": {
                  "label": "Plans",
                  "desc": null
                },
                "contractTerms": {
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
              "is_premium_plan": false,
              "bill_type": 0,
              "AtrHref": "#rm-3",
              "atrHref": "#rm-38",
              "bundleData": "3188",
              "bundleUpfrontData": "1300"
            }));
            component.supplimentaryData = {
                lineChosen: "PrincipleLineOnly",
                supplementary_details: {
                    "name": "Celcom Mobile Family™",
                    "celcom_family_plan": [
                      {
                        "name": "First™ Gold",
                        "sku": "FG",
                        "max_line": "1",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FG",
                          "FGP",
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Plus",
                        "sku": "FGP",
                        "max_line": "2",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FGP",
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Platinum",
                        "sku": "FP",
                        "max_line": "4",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FP",
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Platinum Plus",
                        "sku": "FPP",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Supreme",
                        "sku": "FGS",
                        "max_line": "3",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Xpax™ XP60",
                        "sku": "xpax_60",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Celcom First™ Gold Plus Mviva",
                        "sku": "FGP-MVIVA",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Plus (RET)",
                        "sku": "TQAPlan-RET-MVIVA",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Kardashian",
                        "sku": "kardashian",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Gold",
                        "sku": "hwg",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Gold Plus",
                        "sku": "hwgp",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Platinum",
                        "sku": "hwpp",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      }
                    ]
                  }
            }
            component.saleablePlanArray = {
                "sku": "FP",
                "prices": [
                  {
                    "upfront_price": "1100",
                    "device_price": "3478",
                    "penalty_price": "1500",
                    "supplementary_count": "2"
                  },
                  {
                    "upfront_price": "1200",
                    "device_price": "3378",
                    "penalty_price": "1600",
                    "supplimentary_sku": "FP_1",
                    "subsidy": 100
                  },
                  {
                    "upfront_price": "1300",
                    "device_price": "3278",
                    "penalty_price": "1700",
                    "supplimentary_sku": "FP_2",
                    "subsidy": 100
                  },
                  {
                    "upfront_price": "1400",
                    "device_price": "3178",
                    "penalty_price": "1800",
                    "supplimentary_sku": "FP_3",
                    "subsidy": 100
                  },
                  {
                    "upfront_price": "1500",
                    "device_price": "3078",
                    "penalty_price": "1900",
                    "supplimentary_sku": "FP_4",
                    "subsidy": 100
                  }
                ]
            };
            component.ngOnInit();
            expect(component.Init).toHaveBeenCalled();
            localStorage.removeItem("Principal_Number");
        });

        it('should call ngOnInit and handle when user already logged in', () => {
            sessionStorage.setItem("UserInfo", JSON.stringify({
                "blacklistChkRequest": {
                  "customerIDType": "1",
                  "customerIDNo": "960606969696",
                  "customerIDTypeValue": "New NRIC"
                },
                "outputCPResp": {
                  "customerID": "960606969696",
                  "dateOfBirth": "19960606_000000",
                  "services": [
                    {
                      "pre_Pos_Indicator": "Postpaid"
                    }
                  ]
                }
              })
            );
            component.ngOnInit();
            expect(component.isUserLoggedIn).toBe(true);
            sessionStorage.removeItem("UserInfo");
        });

        it('should call ngOnInit and handle when user not logged in', () => {
            component.supplimentaryData = {
                lineChosen: "PrincipleLineOnly",
                supplementary_details: {
                    "name": "Celcom Mobile Family™",
                    "celcom_family_plan": [
                      {
                        "name": "First™ Gold",
                        "sku": "FG",
                        "max_line": "1",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FG",
                          "FGP",
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Plus",
                        "sku": "FGP",
                        "max_line": "2",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FGP",
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Platinum",
                        "sku": "FP",
                        "max_line": "4",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FP",
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Platinum Plus",
                        "sku": "FPP",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Supreme",
                        "sku": "FGS",
                        "max_line": "3",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Xpax™ XP60",
                        "sku": "xpax_60",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Celcom First™ Gold Plus Mviva",
                        "sku": "FGP-MVIVA",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Plus (RET)",
                        "sku": "TQAPlan-RET-MVIVA",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Kardashian",
                        "sku": "kardashian",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Gold",
                        "sku": "hwg",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Gold Plus",
                        "sku": "hwgp",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Platinum",
                        "sku": "hwpp",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      }
                    ]
                  }
            }
            component.ngOnInit();
        });

        it('should call ngOnInit and handle when user not logged in but already chose supplementary line', () => {
          component.suppPriceIndex = -1;
            localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify([
                {
                  "planType": "Celcom Mobile Family™",
                  "planPhoneNumber": "0132893607",
                  "planPrice": "48.0000",
                  "partNumber": "PB12540",
                  "subsidyAmount": 100
                }
              ])
            );
            component.supplimentaryData = {
                lineChosen: "PrincipleLineOnly",
                supplementary_details: {
                    "name": "Celcom Mobile Family™",
                    "celcom_family_plan": [
                      {
                        "name": "First™ Gold",
                        "sku": "FG",
                        "max_line": "1",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FG",
                          "FGP",
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Plus",
                        "sku": "FGP",
                        "max_line": "2",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FGP",
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Platinum",
                        "sku": "FP",
                        "max_line": "4",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FP",
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Platinum Plus",
                        "sku": "FPP",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Supreme",
                        "sku": "FGS",
                        "max_line": "3",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FP",
                          "FPP",
                          "FGS",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Xpax™ XP60",
                        "sku": "xpax_60",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Celcom First™ Gold Plus Mviva",
                        "sku": "FGP-MVIVA",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "First™ Gold Plus (RET)",
                        "sku": "TQAPlan-RET-MVIVA",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Kardashian",
                        "sku": "kardashian",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Gold",
                        "sku": "hwg",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Gold Plus",
                        "sku": "hwgp",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      },
                      {
                        "name": "Home Wireless Platinum",
                        "sku": "hwpp",
                        "max_line": "5",
                        "part_number": "PB12540",
                        "price": "48.0000",
                        "subsidy": "150",
                        "enable_plan_skus": [
                          "FPP",
                          "xpax_60",
                          "FGP-MVIVA",
                          "TQAPlan-RET-MVIVA",
                          "kardashian",
                          "hwg",
                          "hwgp",
                          "hwpp"
                        ]
                      }
                    ]
                  }
            }
            localStorage.setItem("supplementryFlow", "YES");
            component.ngOnInit();
            localStorage.removeItem("supplementryFlow");
            localStorage.removeItem("suppLinesAddedByTheUser");
        });

        it('should call ngOnInit and get suppNumber from local storage', () => {
          spyOn(component, "Init");
          component.numselected = "0132205293";
          component.ngOnInit();
          expect(component.principalNumber).toBe("0132205293");
          expect(component.Init).toHaveBeenCalled();
        });
});
