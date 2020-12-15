import { Component, OnInit, Input } from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { DeviceSupplimentaryLinesService } from './device-supplementary-lines.service';
import { PlanPurchaseService } from '../../plan/plan-purchase/plan-purchase.service';
import { environment } from 'environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../Service/product.service';
import { UserService } from '../../../Service/user.service';
import { DeviceDetailsNumberService } from '../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import { TypeofPurchaseService } from '../../../Service/type-of-purchase.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
interface SuppLinesDetailsStruct {
  planType: string;
  planPhoneNumber: string;
  planPrice: string;
  partNumber: string;
  maxCount: string;
  specialPrice: string;
  subsidyAmount: string;

}
interface SuppPlanDataStruct {
  planName: any;
  maxLines: any;
  partNumber: any;
  planPrice: any;
}
interface FreeDeviceStruct {
  planSku: any;
  supplementaryCount: any;
  devicePrice: any;
}
@Component({
  selector: 'app-device-supplementary-lines',
  templateUrl: './device-supplementary-lines.component.html',
  styleUrls: ['./device-supplementary-lines.component.css'],
  providers: [DeviceSupplimentaryLinesService, PlanPurchaseService]
})

export class DeviceSupplementaryLinesComponent implements OnInit {
  @Input() numselected: any;
  @Input() addOnSelected: any;
  @Input() supplimentaryData: any;
  @Input() saleablePlanArray: any;
  @Input() isMoon: any;
  @Input() isProjectStar: boolean;
  @Input() isKardasianPlanSelected: boolean;
  public orderPhoneNo: any = null;
  public dataLimit: any;
  private subscriber: Subscription;
  startPoint = false;
  suppLinesOption = true;
  withSuppLines = false;
  retrieveNumbersAPI: boolean;
  noNumbersToDisplay: boolean;
  typeOfNumHighlight = "NEW_NUMBER";
  loading = false;
  isDisplayStep1 = true;

  public selectedActivity: any = null;
  public typeOfNumber: string = null;
  public numberMsisdn: any;
  public KeepCelcomNumObj: any = null;
  chooseYourWay = false;
  itemSubmitted = false;
  public errorMessage: Object;
  public preventStyle: any;
  public errorExits = false;
  public Eligibility: any;
  public msisdn: any = null;
  public isUserLogggedIn = true;
  public DeviceDetailsNumberResponse = null;
  public selectedNumber: any = null;
  public loggedInNumber: any = null;
  public showContent: any;
  public itemCart: any;
  public userInfo: any;
  public isEligible: any = null;

  public selectedPlan: any = null;
  public selectedPlanDetails: any = null;
  public searchNumber: any;
  public deviceNumberToDisplay: any[];
  public suppPrice = 0;
  public isActive: boolean;

  public IsMNPRequest = true;
  public ShowMNPBlock = false;
  public reserveNumberResponse = false;
  public SwitchToCelcom = false;

  // To check MNP flow and to disable the other two tabs
  public IsMNPFlow = false;

  public showMNPFlowNotification = false;
  public disableKeepNumber = false;
  public maximumReservation = false;
  public infoMNPflow: any = null;
  public isPostpaidFlow = false;
  public infoMaxLimit: any = null;
  public TotalSubsidyAmount = 0;
  public self: any;
  public searchStatus = false;
  public EligibleCheck: any;
  public EligibilityResponse: any;
  public contractLengthMonths: any;
  public contractLengthYears: any;
  public endDate: any;
  public isShowButton: boolean;
  public isEligibleMessages: any;
  public COBPcontract = false;
  public IsDisplayPlanEligibilityPopup = false;
  public PlanInEligibleResponse: any;
  public customerType: any = 1;
  public editOrder: any;
  public requestPromoNo: any;
  public APIFailure = false;
  public requestOldPromoNo: any;
  public isInternetActive = false;
  outletId: string = environment.outletId;
  public isFamilyActive = false;
  public isDisplaySuppLineNumList = false;
  isPrincipleNumSelected = false;
  public isInternetSharePlanSelected = false;
  public isFirstFamilyPlanSelected = false;
  public isShowAddedSuppLines = false;
  public suppLinesAddedDetails: SuppLinesDetailsStruct[] = [];
  public num = 0;
  selectedPlanType = "";
  public selectedBlueXpax = false;
  public selectedPlanData: any;
  public selectedNumbersList = [];
  public numberExists = false;
  public numExistMsg: any = null;
  public principalNumber: any;
  public PlanPurchaseResponse: any;
  public displaySuppZero = false;
  public suppLength = 0;
  public interShareData = {
    maxLines: "",
    planName: "",
    partNumber: "",
    planPrice: ""
  };
  public familyPlanData = {
    maxLines: "",
    planName: "",
    partNumber: "",
    planPrice: ""
  };
  public internetShareRemainingLimit: number;
  public familyPlanRemainingLimit: number;
  public isFinishAddingSuppLines = false;

  public userDataForSupplementaryLines: any;
  public UserInfo: any;
  public IsDisplaySupplementaryPopup = false;
  public IsDisplayLossSupplementaryPopup = false;
  public suppLinesDetailsForSelectedPlanInDevice: any;
  public suppLinesDetailsResponse: any;
  flag = 0;
  isDisplayLoginLink = true;
  enableAddToCart = false;
  disableAddToCart = true;
  noOfSuppLinesAdded = 0;
  maxLinesOfSelectedPlan: Array<number> = [];
  noOfSuppLinesOfParticularPlan: Array<number> = [];
  maximumLines = 0;
  planNotToDisable = "";
  noSupplimentaryAllowed = false;
  public displayAddedSuppList = true;
  public isPlanURL = false;
  public isDeviceURL = false;
  public noOfSupplimentaryPlanEligible: any;
  public showSuppLines = false;
  public selctedSuppPlanIndex: number;
  public selectedFamilyPlan = "First™ Gold";
  public noOfLinesMoreAllowed: number;
  public DeviceFLowSuppDetails = [];
  public suppObj: any;
  public freeDeviceConditionArray: FreeDeviceStruct[] = [];
  public confirmSubsidySelection = false;
  public subsidyAmount = '0.00';
  public showSubsidy = false;
  public subsidyMessage = null;
  public suppCount = 0;
  public hideSupplimentaryOption = false;
  public isUserLoggedIn = false;
  public enableNRICfield = false;
  public pageType = "suppLines";
  public eligibilityInfo: any;
  public isDisplayLimitExceededPopUp = false;
  public  pager: any = {};
  public totalNumbers: any[];
  totalPageItems: any[];
  public retrievenumberURL = "/rest/V1/retrieve-number";
  public suppLinesOptionSection = true;
  public shareQuotaOption = false;
  public defaultSuppOption = true;
  public isInternetSharingChecked = false;
  public suppPriceIndex = 0;
  public hideInternetSharingOption = false;
  constructor(private _deviceDataService: DeviceDataService,
    private _devicesupplimentaryLinesService: DeviceSupplimentaryLinesService,
    private _activatedRoute: ActivatedRoute,
    private planpurchaseservice: PlanPurchaseService,
    private _router: Router,
    private _productService: ProductService,
    private _userService: UserService,
    private _deviceDetailsNumberService: DeviceDetailsNumberService,
    private _topService: TypeofPurchaseService,
    private _globalErrorHandler: GlobalErrorHandler,
  ) {
    this.errorMessage = {
      message: "Uh Oh. Please enter 4 digits to search for your favourite number.",
      noNumbersDisplay: "Uh Oh. No numbers available for this pattern. Please try a different pattern.",
      apiError: "Uh Oh. Numbers are unavailable now. Please try again later."
    };
  }
  ngOnInit() {
    this.isUserLoggedIn = this._userService.isCustomer();
    // if ((this.supplimentaryData && this.supplimentaryData.lineChosen &&
    //    this.supplimentaryData.lineChosen === "PrincipleLineOnly")) {
    //     this.hideSupplimentaryOption = true;
    //     if (!this.isUserLoggedIn) {
    //     this.enableNRICfield = true;
    //     this._deviceDataService.publishAddToCartDisabling(true);
    //     } else {
    //       return;
    //     }
    // } else {
    //   this.hideSupplimentaryOption = false;
    //   this.enableNRICfield = false;
    //   this._deviceDataService.publishAddToCartDisabling(false);
    // }
    if (this.isKardasianPlanSelected) {
      this.buyWithoutSuppLinesForDevice();
    } else {
      this._deviceDataService.publishAddToCartDisabling(true);
    }
    if (typeof window !== 'undefined' && localStorage && this.numselected) {
      localStorage.setItem('suppNumber', this.numselected);
    }
    if (localStorage && localStorage.getItem("Principal_Number")) {
      this.selectedNumbersList = [];
      this.principalNumber = localStorage.getItem("Principal_Number");
      this.selectedNumbersList.push(this.principalNumber);
    } else if (localStorage.getItem('suppNumber')) {
      this.selectedNumbersList = [];
      this.principalNumber = localStorage.getItem('suppNumber');
      this.selectedNumbersList.push(this.principalNumber);
      localStorage.removeItem('suppNumber');
    }
    if (this.principalNumber) {
      this._deviceDataService.publishPrincipalLine(this.principalNumber);
    }
    this.DeviceFLowSuppDetails.push(this.supplimentaryData.supplementary_details);
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("SelectedPlanDetailsInDevice")) {
        const SelectedPlanDetailsInDevice = JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice"));
        this.selectedFamilyPlan = SelectedPlanDetailsInDevice.name;
      }
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("dataLimit")) {
      this.dataLimit = sessionStorage.getItem("dataLimit");
  }
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.orderPhoneNo = data);
    if (this.orderPhoneNo == null) {
      this.orderPhoneNo = this.numselected;
    }
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe (data => {
      this.numberExists = data;
    });
    this.subscriber = this._deviceDataService.sharedSaleablePlanArray$.subscribe(data => {
      if (data) {
      this.saleablePlanArray = data;
      }
    });
    this.subscriber = this._deviceDataService.sharedSupplimentaryLines$.subscribe(
      data => {
        this.suppCount = data.length;
      });
    if (typeof window !== 'undefined' && localStorage) {
      if ((localStorage.getItem("supplementryFlow") === "YES")) {
        let supplementaryLinesEditingFromCart = null;
         this.suppPriceIndex = this.suppCount;
        if (this.saleablePlanArray && !this.saleablePlanArray.prices[this.suppCount + 1]) {
          this.suppPriceIndex = -1;
        }
        if (localStorage.getItem("SupplementaryLinesEditingFromCart")) {
          this.TotalSubsidyAmount = 0;
          supplementaryLinesEditingFromCart = JSON.parse(localStorage.getItem("SupplementaryLinesEditingFromCart"));
          supplementaryLinesEditingFromCart.forEach(item => {
            this.suppLinesAddedDetails.push({
              planType: item.name,
              planPhoneNumber: item.number,
              planPrice: item.price,
              partNumber: item.part_number,
              maxCount: this.saleablePlanArray ? this.saleablePlanArray.prices[this.suppPriceIndex + 1].supplementary_count : null,
              specialPrice: this.saleablePlanArray ? this.saleablePlanArray.prices[this.suppPriceIndex + 1].special_price : null,
              subsidyAmount: this.saleablePlanArray ? this.saleablePlanArray.prices[this.suppPriceIndex + 1].subsidy : null
            });
           // this.TotalSubsidyAmount += Number(this.suppLinesAddedDetails[this.suppLinesAddedDetails.length - 1].subsidyAmount);
          });
        } else {
          supplementaryLinesEditingFromCart = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
          this.suppLinesAddedDetails = [];
          if (supplementaryLinesEditingFromCart != null) {
            supplementaryLinesEditingFromCart.forEach(item => {
              this.suppLinesAddedDetails.push({
                planType: item.planName,
                planPhoneNumber: item.planPhoneNumber,
                planPrice: item.planPrice,
                partNumber: item.partNumber,
                maxCount: this.saleablePlanArray ? this.saleablePlanArray.prices[this.suppPriceIndex + 1].supplementary_count : null,
                specialPrice: this.saleablePlanArray ? this.saleablePlanArray.prices[this.suppPriceIndex + 1].special_price : null,
                subsidyAmount: this.saleablePlanArray ? (this.saleablePlanArray.prices[this.suppPriceIndex  + 1].subsidy ? this.saleablePlanArray.prices[this.suppPriceIndex  + 1].subsidy : 0) : 0
              });
              this.TotalSubsidyAmount += Number(this.suppLinesAddedDetails[this.suppLinesAddedDetails.length - 1].subsidyAmount);
            });
          }
        }
        if (supplementaryLinesEditingFromCart && supplementaryLinesEditingFromCart.length > 0){
          this.shareQuotaOption = false;
          this.isShowAddedSuppLines = true;
          this.isFinishAddingSuppLines = true;
        }
        if (supplementaryLinesEditingFromCart != null) {
          if (localStorage.getItem("SupplementaryLinesEditingFromCart")) {
            localStorage.removeItem("SupplementaryLinesEditingFromCart");
            this.showSupp();
            this.redirectedToPlanPageFromCart();
            // this._deviceDataService.publishDeactivateLifestyleAddons(true);
          } else {
            this.showSupp();
            this.redirectedToPlanPageForAddingExcessPlan();
          }
          localStorage.removeItem("supplementryFlow");
        }
      } else {
        if (this.isProjectStar) {
          this.showSuppLines = false;
          this.suppLinesOptionSection = true;
          this.suppLinesOption = true;
          this.shareQuotaOption = true;
          this.defaultSuppOption = false;
        }
        // this.showSupp();
      }
    }
    this.Init();
  }
  Init() {
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("suppLinesDetailsOfUser")) {
        this.isDisplayLoginLink = false;
        this.userDataForSupplementaryLines = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
      }
    }
    this._deviceDataService.publishAddToCartDisabling(true);
    if (this.supplimentaryData && this.supplimentaryData.more_details && this.supplimentaryData.more_details.neptune_subsidy_message) {
      this.subsidyMessage = this.supplimentaryData.more_details.neptune_subsidy_message;
    }
  }

  public getRefreshNumbers() {
    this.errorExits = false;
    if (!this.editOrder) {
      this.selectedNumber = null;
    }
    this.editOrder = false;
    const dataForRetrieveNumberAPI = {
      data: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "30",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    this.searchNumber = "";
  }
  public getNewNumbers() {
    this.typeOfNumHighlight = "NEW_NUMBER";
    this.errorExits = false;
    this._deviceDataService.publishDisclaimerAgree(false);
    if (this.typeOfNumber === "NEW_NUMBER") {
      return;
    } else {
      // assign new number type
      this.typeOfNumber = "NEW_NUMBER";
    }
    const dataForRetrieveNumberAPI = {
      data: {
        numberCategory: "NORMAL",
        numberService: "POSTPAID",
        sourceSystem: "",
        numRecords: "30",
        planType: "VOICE"
      }
    };
    this.preventStyle = {
      "pointer-events": "none"
    };
    this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
  }

  callRetrieveNumbersAPI(dataForRetrieveNumberAPI: any) {
    this.retrieveNumbersAPI = false;
    this.noNumbersToDisplay = false;
    // const apiUrl = "/rest/V1/retrieve-number";
    this.loading = true;
    this._productService
      .GetNewNumbers(this.retrievenumberURL, dataForRetrieveNumberAPI)
      .subscribe(
        response => {
          if (this.typeOfNumHighlight === "NEW_NUMBER") {
            this.loading = false;
            this.totalNumbers = response;
            if (response[0].status === false) {
              this.OnRetrieveNumberAPIFailureForDeviceSupp(response);
            } else {
              this.OnRetrieveNumberAPISuccessForDeviceSupp(response);
              const el = document.getElementById("number_anchor");
              el.scrollIntoView();
            }
            // make msisdn null
            this.msisdn = null;
          }
        },
        err => {
          this.deviceNumberToDisplay = [];
          this.loading = false;
          if (this.searchStatus) {
            this.searchStatus = false;
            this.noNumbersToDisplay = true;
          } else {
            this.retrieveNumbersAPI = true;
          }
        }
      );
  }
  OnRetrieveNumberAPIFailureForDeviceSupp(response) {
    this.loading = false;
    this.deviceNumberToDisplay = [];
    this.totalNumbers = [];
    this.totalPageItems = [];
    this.DeviceDetailsNumberResponse = null;
    if (this.searchStatus) {
      this.errorMessage = { message: response[0].message };
      this.errorExits = true;
      this.searchStatus = false;
      this.noNumbersToDisplay = false;
    }
  }
  OnRetrieveNumberAPISuccessForDeviceSupp(response) {
    this.totalNumbers = response[0].mobile_numbers;
    this.setPage(1);
    response[0].mobile_numbers.forEach(element => {
    // check length for response
    if (element.number.length === 9 && element.number[0] !== 0) {
      element.number = 0 + element.number;
    }
  });
  // set numbers to display
  this.deviceNumberToDisplay = this.DeviceDetailsNumberResponse = response;
  if (this.selectedNumber) {
    for (let j = 0; j < this.deviceNumberToDisplay.length; j++) {
      // check if selected number is present in list
      if (this.deviceNumberToDisplay[j].number === this.selectedNumber) {
        this.deviceNumberToDisplay.splice(j, 1);
        break;
      }
    }
    // check for search number
    if (this.selectedNumber.indexOf(this.searchNumber) !== -1) {
      if (this.deviceNumberToDisplay.length > 11) {
        // if numbers are more than 11
        this.deviceNumberToDisplay = this.deviceNumberToDisplay.slice(0, 11);
      }
      // keep selected number first
      this.deviceNumberToDisplay.unshift({ number: this.selectedNumber });
    }
  }
  }
  public numberKeyHandler(ev) {
    this.errorExits = false;
    this.noNumbersToDisplay = false;
    const code = ev.keyCode || ev.which;
    if ( code === 13) {
      this.searchNumbersForPattern();
    }
  }
  public numberValidation(ev) {
    const code = ev.keyCode || ev.which;
    const numberValues = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 13, 16, 17];
    const result = numberValues.indexOf(code);
    // if result does not match
    if (result < 0) {
      // do nothing
      ev.preventDefault();
    }
  }
  public SelectNumber(planNumber: any) {
    this.isPrincipleNumSelected = true;
    this.selectedNumber = planNumber;
  }

  public searchNumbersForPattern() {
    const searchStringLength = this.searchNumber ? this.searchNumber.toString().length : 0;
    const dataForRetrieveNumberAPI = {
      data: {
        numberCategory: "NORMAL",
        numberService: "POSTPAID",
        sourceSystem: "",
        planType: "VOICE",
        numRecords: "30"
      }
    };
    if (this.deviceNumberToDisplay && this.deviceNumberToDisplay.length <= 12 && searchStringLength === 0) {
      this.errorExits = false;
      // call retrieve numbers api
      this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    } else if (this.searchNumber && ((searchStringLength < 2 || searchStringLength > 4) || !/^\d+$/.test(this.searchNumber))) {
      this.errorExits = true;
      return;
    } else if (this.searchNumber && (searchStringLength >= 2 && searchStringLength <= 4)) {
      this.searchStatus = true;
      this.errorExits = false;
      dataForRetrieveNumberAPI.data["numberPattern"] = this.searchNumber;
      dataForRetrieveNumberAPI.data["criteria"] = "CONTAINS";
      this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    }
  }
  buyWithoutSuppLinesForDevice() {
    this.hideInternetSharingOption = true;
    this.enableNRICfield = true;
    this.withSuppLines = false;
    this.suppLinesOption = false;
    this.suppLinesAddedDetails = [];
    this.isFinishAddingSuppLines = true;
    this._deviceDataService.publishSupplimentaryLines(this.suppLinesAddedDetails);
    if (this.isUserLoggedIn) {
      this._deviceDataService.publishAddToCartDisabling(false);
    } else {
      this._deviceDataService.publishAddToCartDisabling(true);
    }
    this._topService.updateNewLineCompleted(true);
  }
  showSupp() {
    this.suppLinesOptionSection = false;
    this.showSuppLines = false;
    this.suppLinesDetailsForSelectedPlanInDevice = [];
    this.suppLinesDetailsResponse = this.DeviceFLowSuppDetails;
    this.suppLinesDetailsForSelectedPlanInDevice = this.suppLinesDetailsResponse[0].celcom_ultra_plan ?
     this.suppLinesDetailsResponse[0].celcom_ultra_plan : this.suppLinesDetailsResponse[0].celcom_family_plan;
    this.selectedPlanType = this.suppLinesDetailsResponse[0].name;
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("suppLinesDetailsOfUser")) {
        this.isDisplayLoginLink = false;
        this.userDataForSupplementaryLines = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
      }
      this.isPlanTypeSelected(this.selectedPlanType);
    }
    this._deviceDataService.publishAddToCartDisabling(true);
    this.isDisplaySuppLineNumList = true;
    this.getRefreshNumbers();
  }
  isPlanTypeSelected(tab: string) {
    this.selectedPlanType = tab;
    this.suppLinesDetailsForSelectedPlanInDevice.forEach(element => {
      if (element.name === this.selectedFamilyPlan) {
        this.noOfLinesMoreAllowed = element.max_line;
      }
    });
    // if (this.supplimentaryData !== undefined) {
    //   this.noOfLinesMoreAllowed = this.supplimentaryData.lineChosen;
    // }
  }
  goBackStartPoint() {
    this.isDisplaySuppLineNumList = false;
    this.showSuppLines = false;
    this.isFinishAddingSuppLines = false;
    this.isShowAddedSuppLines = true;
    this.confirmSubsidySelection = false;
  }
  suppPlanSelected() {
    if (Number(this.noOfLinesMoreAllowed) > 0) {
      this.suppLinesOptionSection = false;
      this.isDisplaySuppLineNumList = true;
      this.showSuppLines = false;
      this.isFinishAddingSuppLines = true;
      this.displayAddedSuppList = false;
      this.loading = true;
      this.isDisplaySuppLineNumList = true;
      this.withSuppLines = false;
      this.confirmSubsidySelection = false;
      this.getNewNumbers();
      this.getRefreshNumbers();
    } else {
      this._globalErrorHandler.errorObjectConvert("You've exceeded the number limit that can be tied to one ID.");
      this.IsDisplaySupplementaryPopup = true;
    }
  }
  addSupplimentaryLines() {
    for (let j = 0; j < this.selectedNumbersList.length; j++) {
      if (this.selectedNumber === this.selectedNumbersList[j]) {
        this.numberExists = true;
      }
    }
    if (this.numberExists) {
      this.numExistMsg = {};
      this.numExistMsg.content = '"Uh Oh. The number has already been selected. Please select a new number';
    } else {
      this.numberExists = false;
      this.isFinishAddingSuppLines = false;
      this.isDisplaySuppLineNumList = false;
      this.showSuppLines = false;
      this.displayAddedSuppList = true;
      this.confirmSubsidySelection = false;
      this.showSubsidy = true;
      this.selectedNumbersList.push(this.selectedNumber);
      if (this.isProjectStar) {
        this.suppLinesOption = true;
      } else {
        this.suppLinesOption = false;
      }
      if (this.suppLinesDetailsForSelectedPlanInDevice) {
         this.suppPriceIndex = this.suppCount;
        if (!this.saleablePlanArray.prices[this.suppCount + 1]) {
          this.suppPriceIndex = -1;
        }
        const supp = this.suppLinesDetailsForSelectedPlanInDevice.find(key => key.name === this.selectedFamilyPlan);
        if (supp) {
          this.suppLinesAddedDetails.push({
            planType: this.selectedPlanType,
            planPhoneNumber: this.selectedNumber,
            planPrice: supp.price,
            partNumber: supp.part_number,
            maxCount:  this.saleablePlanArray ? this.saleablePlanArray.prices[this.suppPriceIndex  + 1].supplementary_count : null,
            specialPrice:  this.saleablePlanArray ? this.saleablePlanArray.prices[this.suppPriceIndex  + 1].special_price : null,
            subsidyAmount: this.saleablePlanArray ? (this.saleablePlanArray.prices[this.suppPriceIndex  + 1].subsidy ? this.saleablePlanArray.prices[this.suppPriceIndex  + 1].subsidy : 0) : 0
          });
          this.TotalSubsidyAmount += Number(this.suppLinesAddedDetails[this.suppLinesAddedDetails.length - 1].subsidyAmount);
          this.noOfLinesMoreAllowed -= 1;
          this.noOfSuppLinesAdded += 1;

          if (this.isProjectStar) {
            this.suppLinesOptionSection = true;
            this.shareQuotaOption = true;
            this.suppLinesOption = false;
            this.defaultSuppOption = false;
          }
        }
      }
      this._deviceDataService.publishSupplimentaryLines(this.suppLinesAddedDetails);
      this._deviceDataService.publishSupplinesLinesPrice(this.suppLinesAddedDetails);
      this.isShowAddedSuppLines = true;
    }
  }
  deleteSuppLine(index: number) {
    this.TotalSubsidyAmount = 0;
    if (this.noOfSuppLinesAdded === 1) {
      this.displaySuppZero = true;
      this.selectedPlanType = this.suppLinesAddedDetails[0].planType;
    }
    for (let i = 0; i < this.suppLinesAddedDetails.length; i++) {
      if (i === index) {
        for (let j = 0; j < this.selectedNumbersList.length; j++) {
          if (this.suppLinesAddedDetails[i].planPhoneNumber === this.selectedNumbersList[j]) {
            this.selectedNumbersList.splice(j, 1);
          }
        }
        this.suppLinesAddedDetails.splice(i, 1);
        this.noOfSuppLinesAdded -= 1;
        this.noOfLinesMoreAllowed += 1;
        this._deviceDataService.publishSupplimentaryLines(this.suppLinesAddedDetails);
        this._deviceDataService.publishExtraSuppLinesAddedByUser(this.noOfLinesMoreAllowed);
        this._deviceDataService.publishSupplinesLinesPrice(this.suppLinesAddedDetails);
        break;
      }
    }
    this._deviceDataService.publishAddToCartEnabling(false);
    this.displayAddedSuppList = true;
    this.isFinishAddingSuppLines = false;
    this.showSubsidy = true;
    this.enableNRICfield = false;
    // Activate addons, If supplimentary lines not added or zero supp lines.
    if (this.noOfSuppLinesAdded < 1) {
      this._deviceDataService.publishDeactivateLifestyleAddons(false);
    }
  }
  public OnContinueSupplementaryPopup() {

    const self = this;
    setTimeout(function () {
      self.IsDisplaySupplementaryPopup = false;
      self.IsDisplayLossSupplementaryPopup = false;
      self.withSuppLines = false;
    }, 0);

    this._deviceDataService.publishAddToCartEnabling(false);
    this._deviceDataService.publishSupplimentaryLines(this.suppLinesAddedDetails);
    this._deviceDataService.publishSupplinesLinesPrice(this.suppLinesAddedDetails);
    this._deviceDataService.publishPrincipalLine(true);
  }

  public OnContinueSupplementaryLosingPopup() {
    const self = this;
    setTimeout(function () {
      self.IsDisplaySupplementaryPopup = false;
      self.IsDisplayLossSupplementaryPopup = false;
      self.withSuppLines = false;
      self.displayAddedSuppList = true;
      self.confirmSubsidySelection = false;
    }, 0);
  }

  public OnLeaveSupplementaryPopup() {
    const self = this;
    setTimeout(function () {
      self.IsDisplayLossSupplementaryPopup = false;
      self.withSuppLines = true;
      self.isDisplaySuppLineNumList = false;
      self.showSuppLines = true;
      self.displayAddedSuppList = true;
      self.confirmSubsidySelection = false;
    }, 0);
  }
  backToSuppLines() {
    this.IsDisplayLossSupplementaryPopup = true;
  }
  finishAddingSuppLines() {
    this.isFinishAddingSuppLines = true;
    this.isDisplaySuppLineNumList = false;
    this.showSuppLines = false;
    this.confirmSubsidySelection = true;
    if (this.suppLinesAddedDetails && this.suppLinesAddedDetails.length < 1 && this.isUserLoggedIn) {
      this._deviceDataService.publishAddToCartDisabling(false);
    }
    this.TotalSubsidyAmount = 0;
    for (let i = 0; i < this.suppLinesAddedDetails.length; i++) {
      this.TotalSubsidyAmount += Number(this.suppLinesAddedDetails[i].subsidyAmount);
    }
    if (this.suppLinesAddedDetails && this.suppLinesAddedDetails.length < 1) {
      this.enableNRICfield = true;
      this.hideInternetSharingOption = true;
    }
  }
  ConfirmSubsidySelection() {
    this.isDisplaySuppLineNumList = false;
    this.showSuppLines = false;
    this.isDisplayLoginLink = false;
    this.confirmSubsidySelection = false;
    this.showSubsidy = false;
    this.isFinishAddingSuppLines = true;
    if (!this.isUserLoggedIn) {
    this.enableNRICfield = true;
    }
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("suppLinesAddedByTheUser")) {
        localStorage.removeItem("suppLinesAddedByTheUser");
      }
      localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(this.suppLinesAddedDetails));
    }
    if (this.isUserLoggedIn) {
      this._deviceDataService.publishRunAutoBillingCheck();
      this._deviceDataService.publishAddToCartDisabling(false);
    }
       if (this.suppLinesAddedDetails && this.suppLinesAddedDetails.length < 1) {
      this.enableNRICfield = true;
      this.hideInternetSharingOption = true;
    }
    this._topService.updateNewLineCompleted(true);
  }
  redirectedToPlanPageForAddingExcessPlan() {
    this.showSuppLines = false;
    this.suppLinesOption = false;
    this.isFinishAddingSuppLines = false;
    this.isDisplaySuppLineNumList = false;
    this.isShowAddedSuppLines = true;
    this.confirmSubsidySelection = false;
    this.showSubsidy = true;
    let suppLinesDetailsOfUser;
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem("suppLinesDetailsOfUser")) {
       suppLinesDetailsOfUser = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
      this.noOfLinesMoreAllowed = suppLinesDetailsOfUser.maxPostpaidLinesRemaining;
    }
    this.noOfLinesMoreAllowed = this.noOfLinesMoreAllowed - this.suppLinesAddedDetails.length;
    if (suppLinesDetailsOfUser && suppLinesDetailsOfUser.maxPostpaidLinesRemaining > this.suppLinesAddedDetails.length) {
      this.noOfLinesMoreAllowed = 0;
      }
    this._deviceDataService.publishExtraSuppLinesAddedByUser(this.noOfLinesMoreAllowed);
    this._deviceDataService.publishSupplimentaryLines(this.suppLinesAddedDetails);
    this._deviceDataService.publishSupplinesLinesPrice(this.suppLinesAddedDetails);
    if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
  }
  redirectedToPlanPageFromCart() {
    this.showSuppLines = false;
    this.suppLinesOption = false;
    if (this.suppLinesAddedDetails.length > 0) {
      this.isFinishAddingSuppLines = true;
    }
    this.isDisplaySuppLineNumList = false;
    this.isShowAddedSuppLines = true;
    this.confirmSubsidySelection = false;
    this.showSubsidy = true;
    this.noOfLinesMoreAllowed = this.noOfLinesMoreAllowed - this.suppLinesAddedDetails.length;
    this._deviceDataService.publishSupplimentaryLines(this.suppLinesAddedDetails);
    this._deviceDataService.publishSupplinesLinesPrice(this.suppLinesAddedDetails);
    if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
  }
  public enableChooseWay() {
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("enableChoosewayLogin", JSON.stringify(true));
    }
    // const that = this;
    // setTimeout(function () {
    //   that.chooseYourWay = false;
    // }, 0);
    // setTimeout(function () {
    //   that.chooseYourWay = true;
    // }, 0);
    // this.suppObj.lineChosen = this.supplimentaryData.lineChosen;
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem('isBundleClicked') && localStorage.getItem('isBundleClicked') === 'true') {
        this.suppObj = {};
        this.suppObj.lineChosen = this.supplimentaryData.lineChosen;
        if (localStorage.getItem("selectedStorage")) {
          this.suppObj.storage = localStorage.getItem("selectedStorage");
        }
        if (localStorage.getItem("selectedColor")) {
          this.suppObj.color = localStorage.getItem("selectedColor");
        }
        if (localStorage.getItem("SelectedPlan")) {
          this.suppObj.planSku = localStorage.getItem("SelectedPlan");
        }
        if (localStorage.getItem("suppLinesAddedByTheUser")) {
          this.suppObj.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
        }
        if (localStorage.getItem("DeviceSku")) {
          this.suppObj.sku = localStorage.getItem("DeviceSku");
        }
        if (localStorage.getItem("SelectedPlanDetails")) {
          this.suppObj.planDetails = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
        }
        if (localStorage.getItem("SelectedPlanName")) {
          this.suppObj.planName = localStorage.getItem("SelectedPlanName");
        }
        if (localStorage.getItem("Principal_Number")) {
          this.suppObj.principalNum = localStorage.getItem("Principal_Number");
        } else if (localStorage.getItem('suppNumber')) {
          this.suppObj.principalNum = localStorage.getItem("suppNumber");
        }
        if (localStorage.getItem("SelectedMonthlyPay")) {
          this.suppObj.monthlyPay = localStorage.getItem("SelectedMonthlyPay");
        }
        localStorage.setItem("selectionAfterLogin", JSON.stringify(this.suppObj));
      }
    }
    this._router.navigateByUrl("/store/login");
    // window.location.href = "/store/login";
  }
  disableChooseWay() {
    this.chooseYourWay = this.itemSubmitted = false;
  }
  OnSuccessfulLogin(e) {
   if (e) {
     this.isUserLoggedIn  = true;
     this.enableNRICfield = false;

    let lineCount;
    if (localStorage && localStorage.getItem("suppLinesDetailsOfUser")) {
      lineCount = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
    }
    if (lineCount && lineCount.status) {
      if (this.suppLinesAddedDetails.length > lineCount.maxPostpaidLinesRemaining) {
        this._deviceDataService.publishExtraSuppLinesAddedByUser(lineCount.maxPostpaidLinesRemaining - this.suppLinesAddedDetails.length);
        this.redirectedToPlanPageForAddingExcessPlan();
        this._deviceDataService.publishExcessLinesAdded(true);
        this._deviceDataService.publishAddToCartDisabling(true);
      } else {
        this._deviceDataService.publishAddToCartDisabling(false);
      }
    } else if (lineCount && !lineCount.status) {
      this.eligibilityInfo = {
        isEligibleByAge: false,
        displayType: 'LIMIT_EXCEEDED',
        type: 'xpax'
      };
      this._globalErrorHandler.errorObjectConvert(this.eligibilityInfo.displayType);
      this.isDisplayLimitExceededPopUp = true;
      this._deviceDataService.publishAddToCartDisabling(true);
    }
   }
  }
  OnClickingProceed(e) {
    this.isDisplayLimitExceededPopUp = false;
    window.location.reload();
  }
  setPage(page: number) {
    // get pager object from service
    this.pager = this._deviceDetailsNumberService.getPager(this.totalNumbers.length, page);
    // get current page of items
    this.totalPageItems = this.totalNumbers.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  OnCheckBoxChange(event) {
    this._topService.updateShareQuota(this.isInternetSharingChecked);
    this._deviceDataService.publishInternetSharingOption(this.isInternetSharingChecked);
  }
}
