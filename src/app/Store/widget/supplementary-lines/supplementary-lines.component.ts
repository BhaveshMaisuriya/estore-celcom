import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { SupplimentaryLinesService } from './supplementary-lines.service';
import { PlanPurchaseService } from '../../plan/plan-purchase/plan-purchase.service';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../Service/product.service';
import { UserService } from '../../../Service/user.service';
import { DeviceDetailsNumberService } from '../../../Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import { TypeofPurchaseService } from '../../../Service/type-of-purchase.service';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
interface SuppLinesDetailsStruct {
  planPhoneNumber: string;
  planPrice: string;
  planType: string;
  partNumber: string;
}
interface SuppPlanDataStruct {
  maxLines: string;
  planName: string;
  partNumber: string;
  planPrice: string;
}
@Component({
  selector: 'app-supplementary-lines',
  templateUrl: './supplementary-lines.component.html',
  styleUrls: ['./supplementary-lines.component.css'],
  providers: [SupplimentaryLinesService , PlanPurchaseService]
})

export class SupplementaryLinesComponent implements OnInit {
  @Input() numselected: any;
  @Input() addOnSelected: any;
  @Input() isKardasianPlanSelected: any;
  @Input() isSelectedBlueXpax: any;
  @Input() isMoon: any;
  @Input() isProjectStar: boolean; // remove value if api ready
  @Input() planDetailsObj: any;
  @Input() internetShareOption = false;
  @Input() skipSelection = false;

  @Output() removePrincipleLine = new EventEmitter();

  private subscriber: Subscription;
  public orderPhoneNo: any = null;
  public dataLimit: any;
  startPoint = false;
  withSuppLines = false;
  loading = false;
  noNumbersToDisplay: boolean;
  retrieveNumbersAPI: boolean;
  typeOfNumHighlight = "NEW_NUMBER";
  isDisplayStep1 = true;
  suppLinesOption = true;
  // new variables
  public typeOfNumber: string = null; // Possible values: NULL, NEW_NUMBER, EXISTING_NUMBER, MNP_NUMBER

  public isUserLogggedIn = true;
  public userInfo: any;
  public msisdn: any = null;
  public DeviceDetailsNumberResponse = null;
  public selectedNumber: any = null;
  public loggedInNumber: any = null;
  public showContent: any;
  public isEligible: any = null;
  public Eligibility: any;
  public searchNumber: any;
  public itemCart: any;
  public selectedPlan: any = null;
  public selectedPlanDetails: any = null;
  public deviceNumberToDisplay: any[];
  public isActive: boolean;
  public suppPrice = 0;

  public selectedActivity: any = null;
  public KeepCelcomNumObj: any = null;
  public numberMsisdn: any;
  public errorMessage: Object;
  public errorExits = false;
  public preventStyle: any;
  chooseYourWay = false;
  itemSubmitted = false;

  public reserveNumberResponse = false;
  public ShowMNPBlock = false;
  public SwitchToCelcom = false;
  public IsMNPRequest = true;
  public IsMNPFlow = false; // To check MNP flow and to disable the other two tabs
  public disableKeepNumber = false;
  public showMNPFlowNotification = false;
  public maximumReservation = false;
  public isPostpaidFlow = false;
  public infoMNPflow: any = null;
  public infoMaxLimit: any = null;
  public searchStatus = false;
  public self: any;
  public EligibilityResponse: any;
  public EligibleCheck: any;
  public contractLengthYears: any;
  public contractLengthMonths: any;
  public endDate: any;
  public isEligibleMessages: any;
  public isShowButton: boolean;
  public IsDisplayPlanEligibilityPopup = false;
  public COBPcontract = false;
  public customerType: any = 1;
  public PlanInEligibleResponse: any;
  public requestPromoNo: any;
  public editOrder: any;
  public requestOldPromoNo: any;
  public APIFailure = false;
  public isInternetActive = false;
  public isFamilyActive = false;
  outletId: string = environment.outletId;
  isPrincipleNumSelected = false;
  public isDisplaySuppLineNumList = false;
  public isFirstFamilyPlanSelected = false;
  public isInternetSharePlanSelected = false;
  public isShowAddedSuppLines = false;
  public num = 0;
  public suppLinesDetails: SuppLinesDetailsStruct[] = [];
  selectedPlanType = "";
  public selectedBlueXpax = false;
  public selectedPlanData: any;
  public selectedNumbersList = [];
  public numberExists = false;
  public numExistMsg: any = null;
  public principalNumber: any;
  public PlanPurchaseResponse: any;
  public displaySuppZero = false;
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
  public suppLinesDetailsForSelectedPlan: SuppPlanDataStruct[] = [];
  flag = 0;
  isDisplayLoginLink = true;
  enableAddToCart = false;
  noOfSuppLinesAdded = 0;
  maxLinesOfSelectedPlan: Array<number> = [];
  noOfSuppLinesOfParticularPlan: Array<number> = [];
  maximumLines = 0;
  planNotToDisable = "";
  noSupplimentaryAllowed = false;
  public displayAddedSuppList = true;
  public isUserLoggedIn = false;
  public enableNRIC = false;
  public pageType = 'suppLines';
  public eligibilityInfo: any;
  public isDisplayLimitExceededPopUp = false;
  public  pager: any = {};
  public totalNumbers: any[];
  totalPageItems: any[];
  public retrievenumberURL = '/rest/V1/retrieve-number';
  public shareQuotaOption = false;
  public isInternetSharingChecked = false;
  public suppLinesOptionSection = true;
  public defaultSuppOption = true;
  public userPass = '';
  public isGBPassSelected = '';
  public hideSharingOption = false;
  public buyWithSupplementary = false;
  agentType: 'dealer' | 'csAgent';
  // GB_PASS = 'First™ Gold Plus'; // change to specific Pass name for Project Star


  /**
   * Delete this after the campaign is over
   */
  start_date = new Date("2020-03-18 20:00:00");
  end_date = new Date("2020-04-15 00:00:00");
  is_campaign_active = this.start_date < new Date() && this.end_date > new Date();
  isInternallyBlacklisted = false;
  errorBlacklisted = null;

  constructor(private _deviceDataService: DeviceDataService,
    private _supplimentaryLinesService: SupplimentaryLinesService,
    private _activatedRoute: ActivatedRoute,
    private planpurchaseservice: PlanPurchaseService,
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
    this.shareQuotaOption = this.internetShareOption;

    this.isInternallyBlacklisted = false;
    this.errorBlacklisted = null;

    if (this.isKardasianPlanSelected || this.isSelectedBlueXpax || this.isMoon) {
      this.enableNRIC = true;
      this.isFinishAddingSuppLines = true;
      if (this.isUserLoggedIn) {
       this._deviceDataService.publishAddToCartEnabling(true);
      } else {
       this._deviceDataService.publishAddToCartDisabling(true);
      }
    } else {
    this._deviceDataService.publishAddToCartEnabling(false);
    }
    if (localStorage && localStorage.getItem("Principal_Number")) {
      this.selectedNumbersList = [];
      this.principalNumber = localStorage.getItem("Principal_Number");
      this.selectedNumbersList.push(this.principalNumber);
    }
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.orderPhoneNo = data);
    if (this.orderPhoneNo == null) {
      this.orderPhoneNo = this.numselected;
    }
    if (typeof window !== 'undefined' && localStorage) {
      if ((localStorage.getItem("supplementryFlow") === "YES") && !localStorage.getItem("SupplementaryLinesEditingFromCart")) {
        this.redirectedToPlanPageForAddingExcessPlan();
      } else if ((localStorage.getItem("supplementryFlow") === "YES") && localStorage.getItem("SupplementaryLinesEditingFromCart")) {
        const supplementaryLinesEditingFromCart = JSON.parse(localStorage.getItem("SupplementaryLinesEditingFromCart"));
        this.suppLinesDetails = [];
        if (supplementaryLinesEditingFromCart != null) {
          supplementaryLinesEditingFromCart.forEach(item => {
            this.suppLinesDetails.push({
              planPhoneNumber: item.number,
              planPrice: item.price,
              planType: item.name,
              partNumber: item.part_number
            });
          });
          this._deviceDataService.publishDeactivateLifestyleAddons(true);
        }
        localStorage.removeItem("SupplementaryLinesEditingFromCart");
        this.redirectedToPlanPageFromCart();
      }
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("dataLimit")) {
        this.dataLimit = sessionStorage.getItem("dataLimit");
    }
    this.subscriber = this._deviceDataService.sharedPlanDetails$.subscribe(data => {
      if (data) {
        this.selectedPlanData = data;
        if (this.selectedPlanData.name.indexOf("Blue") > -1 || this.selectedPlanData.name.indexOf("Xpax") > -1) {
          this.selectedBlueXpax = true;
        } else {
          this.selectedBlueXpax = false;
        }
      }
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe (data => {
      this.numberExists = data;
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe (data => {
      this.numberExists = data;
    });
    this.Init();
    this.subscriber = this._deviceDataService.sharedIsGBPassSelected$.subscribe(data => {
      this.shareQuotaOption = data;
      if (!data) {
        this.defaultSuppOption = true;
      } else {
        this.defaultSuppOption = false;
      }
    });
    if (this.addOnSelected) {
      this.buyWithoutSuppLines();
    }

    if (typeof window !== "undefined" && sessionStorage) {
      this.agentType = sessionStorage.getItem("AgentInfo")
        ? "csAgent"
        : sessionStorage.getItem("DealerInfo")
          ? "dealer"
          : undefined;
    }

    if (this.skipSelection) {
      this.buyWithoutSuppLines();
    }
  }

  Init() {
    let apiUrlKey;
     const selectedDetails: any = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
    // this.userPass = selectedDetails.PlanName || '';
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("suppLinesDetailsOfUser")) {
          this.isDisplayLoginLink = false;
          this.userDataForSupplementaryLines = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
      }
    }
    if (selectedDetails && selectedDetails.url_key) {
      apiUrlKey = selectedDetails.url_key;
    }
    // Show the Internet Sharing option when user choose GB Pass
    if (this.isProjectStar) {
      this.setSupplimentaryObj(this.planDetailsObj.base_plan[0].supplementary_data ?
        this.planDetailsObj.base_plan[0].supplementary_data : []);
      this.maxLInesToAllowLogic();
      this.isGBPassSelected = sessionStorage.getItem("isGBPassSelected");
      if (this.isGBPassSelected == "true") {
        this.defaultSuppOption = false;
      } else {
        this.defaultSuppOption = true;
      }
    } else {
    this.planpurchaseservice
      .Find(apiUrlKey)
      .subscribe((response: any) => {
        this.loading = false;
        this.PlanPurchaseResponse = response[0].tabData;
        if (this.PlanPurchaseResponse != null) {
          // this.PlanPurchaseResponse.supplementary_data.forEach(item => {
          //   this.suppLinesDetailsForSelectedPlan.push({
          //     maxLines: item.max_line,
          //     planName: item.name,
          //     partNumber: item.part_number,
          //     planPrice: item.price
          //   });
          // });
          this.setSupplimentaryObj(this.PlanPurchaseResponse.supplementary_data);
        }
        this.maxLInesToAllowLogic();
      }
        ,
        (error: any) => {
          this.loading = false;
        });

      }
  }
  public getRefreshNumbers() {
    this.errorExits = false;
    this.loading = true;
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

  public searchNumbersForPattern() {
    const searchStringLength = this.searchNumber ?
      this.searchNumber.toString().length :
      0;
    const dataForRetrieveNumberAPI = {
      data: {
        numberService: "POSTPAID",
        numberCategory: "NORMAL",
        numRecords: "12",
        sourceSystem: "",
        planType: "VOICE"
      }
    };
    // If user has cleared the Search string completely, call for all list
    if (
      searchStringLength === 0 &&
      this.deviceNumberToDisplay &&
      this.deviceNumberToDisplay.length <= 12
    ) {
      this.errorExits = false;
      this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    } else if (
      this.searchNumber &&
      ((searchStringLength < 2 || searchStringLength > 4) || !/^\d+$/.test(this.searchNumber))
    ) {
      // Search string is entered but not equal to 4 chars
      this.errorExits = true;
      return;
    } else if (this.searchNumber && (searchStringLength >= 2 && searchStringLength <= 4)) {
      this.errorExits = false;
      dataForRetrieveNumberAPI.data["criteria"] =
        "CONTAINS";
      dataForRetrieveNumberAPI.data[
        "numberPattern"
      ] = this.searchNumber;
      this.searchStatus = true;
      this.callRetrieveNumbersAPI(dataForRetrieveNumberAPI);
    }
  }

  public getNewNumbers() {
    this._deviceDataService.publishDisclaimerAgree(false);
    this.typeOfNumHighlight = "NEW_NUMBER";

    this.errorExits = false;
    if (this.typeOfNumber === "NEW_NUMBER") {
      return;
    } else {
      this.typeOfNumber = "NEW_NUMBER";
    }
    this.preventStyle = {
      "pointer-events": "none"
    };
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
  }

  callRetrieveNumbersAPI(dataForRetrieveNumberAPI: any) {
    this.noNumbersToDisplay = false;
    this.retrieveNumbersAPI = false;
    this.loading = true;
    this._productService
      .GetNewNumbers(this.retrievenumberURL, dataForRetrieveNumberAPI)
      .subscribe(
        response => {
          if (this.typeOfNumHighlight === "NEW_NUMBER") {
            this.loading = false;
            this.totalNumbers = response;
            if (response[0].status === false) {
              this.OnRetrieveNumberAPIFailureForPlanSupp(response);
            } else {
            this.OnRetrieveNumberAPISuccessForPlanSupp(response);
            const el = document.getElementById("number_anchor");
            el.scrollIntoView();
          }
            this.msisdn = null;
        }
      },
        err => {
          this.loading = false;
          this.deviceNumberToDisplay = [];
          if (this.searchStatus) {
            this.noNumbersToDisplay = true;
            this.searchStatus = false;
          } else {
            this.retrieveNumbersAPI = true;
          }
        }
      );
  }
  OnRetrieveNumberAPIFailureForPlanSupp(response) {
    this.loading = false;
    this.setPage(1);
    this.deviceNumberToDisplay = [];
    this.totalNumbers = [];
    this.totalPageItems = [];
    this.DeviceDetailsNumberResponse = null;
    if (this.searchStatus) {
      this.noNumbersToDisplay = false;
      this.searchStatus = false;
      this.errorExits = true;
      this.errorMessage = { message: response[0].message };
    }
  }
  OnRetrieveNumberAPISuccessForPlanSupp(response) {
    this.totalNumbers = response[0].mobile_numbers;
    this.setPage(1);
    response[0].mobile_numbers.forEach(element => {
      if (element.number[0] !== 0 && element.number.length === 9) {
        element.number = 0 + element.number;
      }
    });
    this.deviceNumberToDisplay = this.DeviceDetailsNumberResponse = response;
    if (this.selectedNumber) {
      for (let i = 0; i < this.deviceNumberToDisplay.length; i++) {
        if (this.deviceNumberToDisplay[i].number === this.selectedNumber) {
          this.deviceNumberToDisplay.splice(i, 1);
          break;
        }
      }
      if (this.selectedNumber.indexOf(this.searchNumber) !== -1) {
        if (this.deviceNumberToDisplay.length > 11) {
          this.deviceNumberToDisplay = this.deviceNumberToDisplay.slice(0, 11);
        }
        this.deviceNumberToDisplay.unshift({ number: this.selectedNumber });
      }
    }
    // setTimeout(() => {
    //   this._deviceDataService.publishUpdateStep(5);
    // }, 0 );
  }

  public SelectNumber(planNumber: any) {
    this.selectedNumber = planNumber;
    this.isPrincipleNumSelected = true;
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
    // Added keyCodes for backspace, enter. FF doesn't support ev.keyCode, so using ev.which
    const numberValues = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 8, 13, 16, 17];
    const code = ev.keyCode || ev.which;
    const result = numberValues.indexOf(code);
    if (result < 0) {
      ev.preventDefault();
    }
  }
  removeSuppLines() {
    this.startPoint = true;
    this.orderPhoneNo = null;
    this.suppLinesOption = true;
    this.withSuppLines = false;
  }
  buyWithoutSuppLines() {
    this.hideSharingOption = true;
    this.enableNRIC = true;
    this.withSuppLines = false;
    this.suppLinesOption = false;
    this.suppLinesDetails = [];
    this.isFinishAddingSuppLines = true;
    this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
    if (this.isUserLoggedIn) {
      this._deviceDataService.publishAddToCartEnabling(true);
    } else {
      this._deviceDataService.publishAddToCartEnabling(false);
    }
    this._topService.updateNewLineCompleted(true);
  }
  buyWithSuppLines() {
    this.hideSharingOption = true;
    this.buyWithSupplementary = true;
    this._deviceDataService.publishDeactivateLifestyleAddons(true);
    for (let k = 0; k < this.suppLinesDetailsForSelectedPlan.length; k++) {
      if ((this.userDataForSupplementaryLines === undefined || this.userDataForSupplementaryLines.status) &&
       this.maxLinesOfSelectedPlan[k] > 0) {
        const len = this.suppLinesDetails.length;
        if (len < 1) {
          this.suppLinesOption = false;
          this.isShowAddedSuppLines = false;
          this.planNotToDisable = "";
          this.suppLinesOptionSection = false;

          if (this.isProjectStar) {
            this.withSuppLines = false;
            this.isDisplaySuppLineNumList = true;
          } else {
            this.withSuppLines = true;
            this.isDisplaySuppLineNumList = false;
          }
        } else if (len >= 1 && this.suppLinesDetails[len - 1].planType === this.suppLinesDetailsForSelectedPlan[k].planName) {
          for (let i = 0; i < this.suppLinesDetailsForSelectedPlan.length; i++) {
            if (this.suppLinesDetails[len - 1].planType === this.suppLinesDetailsForSelectedPlan[i].planName) {
              this.planNotToDisable = this.suppLinesDetailsForSelectedPlan[i].planName;
              this.suppLinesOption = false;
              this.isShowAddedSuppLines = true;
              this.suppLinesOptionSection = false;

              if (this.isProjectStar) {
                this.withSuppLines = false;
                this.isDisplaySuppLineNumList = true;
              } else {
                this.withSuppLines = true;
                this.isDisplaySuppLineNumList = false;
              }
            }
          }

        }
      } else {
        this.IsDisplaySupplementaryPopup = true;
        this.errorMessage = "Uh Oh. You have too many lines.";
        this._globalErrorHandler.errorObjectConvert(this.errorMessage);
        if (this.isProjectStar) {
          this.suppLinesOptionSection = true;
        }
        break;
      }
    }

    if (this.isProjectStar) {
      /**
       * bypass Supplementary Plan option
       * and show Number List option
       */
      this.getRefreshNumbers();
    }
  }
  suppPlanSelected() {
    for (let i = 0; i < this.suppLinesDetailsForSelectedPlan.length; i++) {
      if (this.suppLinesDetailsForSelectedPlan[i].planName === this.selectedPlanType) {
        if (this.maxLinesOfSelectedPlan[i] > 0) {
          this.loading = true;
          this.isDisplaySuppLineNumList = true;
          this.withSuppLines = false;
          this.getNewNumbers();
        }
      }
    }
    this.getRefreshNumbers();
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
    //  for (let i = 0; i < this.suppLinesDetailsForSelectedPlan.length; i++) {
      //  if (this.suppLinesDetailsForSelectedPlan[i].planName === this.selectedPlanType) {
          this.suppLinesDetails.push({
            planPhoneNumber: this.selectedNumber,
            planPrice: this.suppLinesDetailsForSelectedPlan[0].planPrice,
            planType: this.suppLinesDetailsForSelectedPlan[0].planName,
            partNumber: this.suppLinesDetailsForSelectedPlan[0].partNumber
          });
          this.selectedNumbersList.push(this.selectedNumber);
          this.isShowAddedSuppLines = true;
          this.isDisplaySuppLineNumList = false;
          this.withSuppLines = false;
          this.isInternetSharePlanSelected = false;
          this.isFirstFamilyPlanSelected = false;
          this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
          this.maxLinesOfSelectedPlan[0] -= 1;
          this.noOfSuppLinesOfParticularPlan[0] += 1;
          this.noOfSuppLinesAdded += 1;
        //  break;
      //  }
    //  }
    }
  }
  isPlanTypeSelected(planName: string) {
    this.selectedPlanType = planName;
  }
  disableChooseWay() {
    this.chooseYourWay = this.itemSubmitted = false;
  }
  deleteSuppLine(index: number) {
    let deletedPlan: string;
    if (this.noOfSuppLinesAdded === 1) {
      this.displaySuppZero = true;
      this.selectedPlanType = this.suppLinesDetails[0].planType;
    }
    for (let i = 0; i < this.suppLinesDetails.length; i++) {
      if (i === index) {
        deletedPlan = this.suppLinesDetails[i].planType;
        for (let j = 0; j < this.selectedNumbersList.length; j++) {
          if (this.suppLinesDetails[i].planPhoneNumber === this.selectedNumbersList[j]) {
            this.selectedNumbersList.splice(j, 1);
         }
       }
        this.suppLinesDetails.splice(i, 1);
        this.noOfSuppLinesAdded -= 1;
        break;
      }
    }
    for (let i = 0; i < this.suppLinesDetailsForSelectedPlan.length; i++) {
      if (this.suppLinesDetailsForSelectedPlan[i].planName === deletedPlan) {
        this.noOfSuppLinesOfParticularPlan[i] -= 1;
        this.maxLinesOfSelectedPlan[i] += 1;
      }
      if (this.maxLinesOfSelectedPlan[i] > Number(this.suppLinesDetailsForSelectedPlan[i].maxLines)) {
        this.maxLinesOfSelectedPlan[i] -= 1;
      }
       this._deviceDataService.
       publishExtraSuppLinesAddedByUser(Number(this.suppLinesDetailsForSelectedPlan[i].maxLines) - this.noOfSuppLinesAdded);
    }
    this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
    this._deviceDataService.publishAddToCartEnabling(false);
    this.displayAddedSuppList = true;
    this.isFinishAddingSuppLines = false;

     // Activate addons, If supplimentary lines not added or zero supp lines.
     if (this.noOfSuppLinesAdded < 1) {
       this._deviceDataService.publishDeactivateLifestyleAddons(false);
     }
  }

  public hideSupplementaryPopup() {
    const self = this;
    setTimeout(function () {
      self.IsDisplaySupplementaryPopup = false;
      self.IsDisplayLossSupplementaryPopup = false;
      if (self.isProjectStar) {
        self.suppLinesOptionSection = true;
        self.withSuppLines = false;
      } else {
        self.withSuppLines = true;
      }
    }, 0);
  };

  public OnContinueSupplementaryPopup() {
    this.hideSupplementaryPopup();
    for (let j = 0; j < this.suppLinesDetailsForSelectedPlan.length; j++) {
      if (this.suppLinesDetails !== undefined && this.suppLinesDetails[0].planType === this.suppLinesDetailsForSelectedPlan[j].planName) {
        this.maximumLines = Number(this.suppLinesDetailsForSelectedPlan[j].maxLines);
      }
    }
    this._deviceDataService.publishExtraSuppLinesAddedByUser(this.maximumLines - this.suppLinesDetails.length);
    this._deviceDataService.publishAddToCartEnabling(false);
    this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
    this._deviceDataService.publishPrincipalLine(true);
  }

  public OnContinueSupplementaryLosingPopup() {
    this.hideSupplementaryPopup();
  }

  public OnLeaveSupplementaryPopup() {
    const self = this;
    setTimeout(function () {
      self.IsDisplayLossSupplementaryPopup = false;
      self.isDisplaySuppLineNumList = false;
      self.isShowAddedSuppLines = true;
      if (self.isProjectStar) {
        self.suppLinesOptionSection = true;
        self.withSuppLines = false;
      } else {
        self.withSuppLines = true;
      }
    }, 0);
  }
  buyWithSuppLinesWithLimitedConnection() {
    this._deviceDataService.publishAddToCartEnabling(true);
  }
  finishAddingSuppLines() {
    this.enableNRIC = true;
    this.isFinishAddingSuppLines = true;
    this.withSuppLines = false;
    this.suppLinesOption = false;
    this.isShowAddedSuppLines = true;
    this.isInternetActive = false;
    this.isDisplaySuppLineNumList = false;
    this.displayAddedSuppList = true;
    this.isFinishAddingSuppLines = true;
    if (this.isGBPassSelected === 'true') {
      this.suppLinesOptionSection = true;
    }
    if (typeof window !== 'undefined' && localStorage) {
      if (localStorage.getItem("suppLinesAddedByTheUser")) {
        localStorage.removeItem("suppLinesAddedByTheUser");
      }
      localStorage.setItem("suppLinesAddedByTheUser", JSON.stringify(this.suppLinesDetails));
    }
    if (this.isUserLoggedIn) {
      this._deviceDataService.publishRunAutoBillingCheck();
      this._deviceDataService.publishAddToCartEnabling(true);
    }
    if (this.suppLinesDetails.length < 1) {
      this.hideSharingOption = true;
      this.internetShareOption = false;
    }
    this._topService.updateNewLineCompleted(true);
  }

  goBackStartPoint() {
    this.suppLinesOption = false;
    this.isInternetActive = false;
    this.withSuppLines = false;
    this.isDisplaySuppLineNumList = false;
    this.isShowAddedSuppLines = true;
    // Activate addons, If supplimentary lines not added.
    if (this.noOfSuppLinesAdded < 1) {
      this._deviceDataService.publishDeactivateLifestyleAddons(false);
    }
  }
  backToSuppLines() {
    this.IsDisplayLossSupplementaryPopup = true;
  }
  redirectedToPlanPageForAddingExcessPlan() {
    this.IsDisplaySupplementaryPopup = true;
    this.withSuppLines = false;
    this.suppLinesOption = false;
    this.isShowAddedSuppLines = true;
    this.isInternetActive = false;
    this.isDisplaySuppLineNumList = false;
    this.isFinishAddingSuppLines = false;
    if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
      this.suppLinesDetails = JSON.parse(localStorage.getItem("suppLinesAddedByTheUser"));
    }

    this._deviceDataService.publishAddToCartEnabling(false);
  }
  redirectedToPlanPageFromCart() {
    this.withSuppLines = false;
    this.suppLinesOption = false;
    this.isShowAddedSuppLines = true;
    this.isInternetActive = false;
    this.isDisplaySuppLineNumList = false;
    this.isFinishAddingSuppLines = false;
    this._deviceDataService.publishSupplimentaryLines(this.suppLinesDetails);
    if (localStorage && localStorage.getItem("suppLinesAddedByTheUser")) {
      localStorage.removeItem("suppLinesAddedByTheUser");
    }
    this._deviceDataService.publishAddToCartEnabling(false);
  }
  maxLInesToAllowLogic() {
    if (this.suppLinesDetailsForSelectedPlan.length > 0) {
      this.selectedPlanType = this.suppLinesDetailsForSelectedPlan[0].planName;
      if (typeof window !== 'undefined') {
        if (localStorage && (localStorage.getItem("supplementryFlow") !== "YES") && localStorage.getItem("suppLinesAddedByTheUser")) {
          localStorage.removeItem("suppLinesAddedByTheUser");
        }
        if (this.userDataForSupplementaryLines && this.userDataForSupplementaryLines.status &&
           this.userDataForSupplementaryLines.maxPostpaidLinesRemaining <= 5) {
          for (let i = 0; i < this.suppLinesDetailsForSelectedPlan.length; i++) {
            this.maxLinesOfSelectedPlan[i] = this.userDataForSupplementaryLines.maxPostpaidLinesRemaining;
        if (Number(this.suppLinesDetailsForSelectedPlan[i].maxLines) > this.userDataForSupplementaryLines.maxPostpaidLinesRemaining) {
              this.suppLinesDetailsForSelectedPlan[i].maxLines =
               (this.userDataForSupplementaryLines.maxPostpaidLinesRemaining).toString();
            }
          }
        }
        for (let i = 0; i < this.suppLinesDetailsForSelectedPlan.length; i++) {
          this.maxLinesOfSelectedPlan[i] = Number(this.suppLinesDetailsForSelectedPlan[i].maxLines);
          this.noOfSuppLinesOfParticularPlan[i] = 0;
        }
        if ((localStorage && localStorage.getItem("supplementryFlow") === "YES")) {
          const is = 0;
          const fp = 0;
          for (let i = 0; i < this.suppLinesDetails.length; i++) {
            for (let j = 0; j < this.suppLinesDetailsForSelectedPlan.length; j++) {
              if (this.suppLinesDetailsForSelectedPlan[j].planName === this.suppLinesDetails[i].planType) {
                this.noOfSuppLinesOfParticularPlan[j] += 1;
                this.maxLinesOfSelectedPlan[j] -= 1;
                this.noOfSuppLinesAdded += 1;
              }
            }
          }
          for (let i = 0; i < this.suppLinesDetailsForSelectedPlan.length; i++) {
            if (this.suppLinesDetails.length > 0) {
              if (this.suppLinesDetailsForSelectedPlan[i].planName === this.suppLinesDetails[0].planType) {
                this.maximumLines = Number(this.suppLinesDetailsForSelectedPlan[i].maxLines);
              }
            }
          }
          this.selectedPlanType = "";
        }
        localStorage.removeItem("supplementryFlow");
        localStorage.removeItem("suppLinesAddedByTheUser");
      }
    } else {
      this.noSupplimentaryAllowed = true;
      this._deviceDataService.publishAddToCartEnabling(true);
    }
  }
  callOnSuccessfulLogin(e) {
  if (e) {
    const userInfo = this._userService.getPersonalForm();
    this.isInternallyBlacklisted = true;
    this.errorBlacklisted = null;

    if (
        userInfo?.type === "user" &&
        userInfo.data.outputCPResp?.blacklist?.status &&
        userInfo.data.outputCPResp?.blacklist?.system === "Internal"
    ) {
      this.isInternallyBlacklisted = true;
      this.errorBlacklisted = {
        title: 'Uh Oh!',
        content: userInfo.data.outputCPResp.blacklist.message,
        button: 'Got it!',
      };
    }

   this.isUserLoggedIn = true;
   let lineCount;
   if (localStorage && localStorage.getItem("suppLinesDetailsOfUser")) {
    lineCount = JSON.parse(localStorage.getItem("suppLinesDetailsOfUser"));
    this.userDataForSupplementaryLines = lineCount;
   }
   if (lineCount && lineCount.status) {
    if (this.suppLinesDetails.length > lineCount.maxPostpaidLinesRemaining) {
    this.maxLInesToAllowLogic();
    this.redirectedToPlanPageForAddingExcessPlan();
    this.noOfSuppLinesAdded = this.suppLinesDetails.length;
    this._deviceDataService.publishExtraSuppLinesAddedByUser(lineCount.maxPostpaidLinesRemaining - this.suppLinesDetails.length);
    this._deviceDataService.publishAddToCartEnabling(false);
    this._deviceDataService.publishAddToCartDisabling(true);
    } else {
      this._deviceDataService.publishAddToCartEnabling(true);
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
    this._deviceDataService.publishAddToCartEnabling(false);
    this._deviceDataService.publishAddToCartDisabling(true);
   }
   }
  }

  onAcceptBlacklistError() {
    this.errorBlacklisted = null;
    this.removePrincipleLine.emit()
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this._deviceDetailsNumberService.getPager(this.totalNumbers.length, page);
    // get current page of items
    this.totalPageItems = this.totalNumbers.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
  OnProceed(e) {
  this.isDisplayLimitExceededPopUp = false;
  window.location.reload();
  }
  OnCheckBoxChange(event) {
    this._topService.updateShareQuota(this.isInternetSharingChecked);
    this._deviceDataService.publishInternetSharingOption(this.isInternetSharingChecked);
  }
  setSupplimentaryObj(response: any) {
    response.forEach(item => {
      this.suppLinesDetailsForSelectedPlan.push({
        maxLines: item.max_line,
        planName: item.name,
        partNumber: item.part_number,
        planPrice: item.price
      });
    });
  }
}
