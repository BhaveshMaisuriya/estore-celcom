import { Component, OnInit, ViewContainerRef, Input, OnDestroy } from '@angular/core';
import { AppWidgetComponent } from '../../../../Model/app.widget.component';
import { BaseComponent } from '../../../../base.component';
import { ContentNavigation } from '../../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../../Service/redirection.service';
import { DeviceDataService } from '../../../../Service/devicedata.service';
import { CommonUtilService } from '../../../../Service/commonUtil.service';
import { Observable, Subscription } from 'rxjs';
import { PlansQuery } from "../../../side-summary/side-summary-container/plans.store";
import { iMvivaCampaign } from "../../../../shared/models/device.model";
import { iPlan } from 'app/shared/models/plan.model';

@Component({
  selector: 'app-devicedetails-summary-section-component',
  templateUrl: './device-details-summary-section.component.html',
  styleUrls: ['./device-details-summary-section.component.css'],
  providers: [RedirectionService]
})
export class DeviceDetailsSummaryComponent extends BaseComponent implements AppWidgetComponent, OnInit, OnDestroy {
  @Input() data: any;
  @Input() mnpData: any;
  @Input() selectedProd: any;
  @Input() isPromotion: any;
  @Input() productToRemoveFromCart: any;
  @Input() isProjectStar: any;
  public basePlanStarName: any = null;
  public basePlanStarPrice: any = null;
  public DeviceDetailsSummaryResponse = null;
  public orderDevice: any = null;
  public orderSummaryColor: any = null;
  public orderReqPartNumber: any = null;
  public orderReqColor: any = null;
  public orderReqModel: any = null;
  public orderSummaryStorage: any = null;
  public orderPlan: any = null;
  public orderPlanName: any = null;
  public orderPlanPass: any = null;
  public orderEasyphonePrice: any = null;
  public orderPhoneNo: any = null;
  public eligibilty: any = null;
  public orderDevicePrice: any = null;
  public orderOneTimePay: any = null;
  public orderMonthlyPay: number = null;
  public totalPayEasyPhone: number = null;
  public orderTotalPay: number = null;
  public isMviva = false;
  public showEligibleRebate = false;
  public mvivaSummaryMessage = "";
  public isTelcoDay = false;
  public telcoDayMessage = "";
  public mvivaPlanUpfront = false;
  public mvivaBundleUpfront = false;
  public orderNumberType: string = null;
  public orderReqPlanBundle: string = null;
  public orderReqServiceBundle: string = null;
  public orderReqPlanComponent: string = null;
  public showDisclaimer = false;
  public desclaimerUrl = "/rest/V1/declaimer/1";
  public orderDetails: any;
  public selectedProductSku: string;
  public selectedPlanDetails: any;
  public selectedProductDetails: any;
  public selectedImageList: any;
  public preOrderData: any;
  public isEasyPhone = false;
  public isRentClicked = false;
  public isOwnClicked = false;
  public isBundleClicked = false;
  public lifestylePlans = false;
  public lifestyleSummaryText: string = null;
  public promotionallifestylePlans: any;
  public rentPrice = 0;
  public ownPrice = 0;
  public bundlePrice = 0;
  public bundleUpfrontPrice = 0;
  public deviceUpfront = null;
  public deviceUpfrontToDisplay = null;
  public planUpfront = null;
  public planUpfrontToDisplay = null;
  public rentTotal = 0;
  public ownTotal = 0;
  public orderMonthlyPayTotal = 0;
  itemSubmitted = false;
  public OrderDeviceExist = false;
  public selectedPlanSku: any = null;
  public PlanOnlyObjectForCart: any;
  public orderDeviceName: any;
  stockDetials: any;
  outOfStock: any = false;
  chooseYourWay = false;
  public errorMessage = false;
  public mnplines = false;
  public errorAddToCart = false;
  public MNPAddToCartResponse: any = null;
  public infoMNPflow: any = null;
  public SharedContract: any = null;
  public contract = "";
  public cart: any;
  public userType: any;
  public requestBody: any = null;
  public disableAddToCart = false;
  public upfrontWaived = false;
  public selectedImage: any;
  public suppLinesDetails: any = [];
  suppLinesLength = 0;
  private subscriber: Subscription;
  public DevicePagePurachaseTypeCLicked: string;
  public tabSelected = false;
  public suppPrice = 0;
  public additionalInfo = null;
  public upfrontInstallment = null;
  public isUpfrontInstallment = false;
  public subsidyAmount = '0.00';
  public totalSubsidyAmount = 0;
  public devicePriceWithSubsidy;
  public saleablePlanArray: any;
  public billType = 0;
  public mandatoryAutoBilling;
  public isUserGuest = false;
  public suppCount = 0;
  public deviceUpfrontPenalty = 0;
  public isGoldenNumberSelected = false;
  public isKardasianPlanSelected = false;
  public isCOBPFlow = false;
  public isDeviceOnlyClicked = false;
  typeOfPurchase = '';
  plan$: Observable<iPlan>;
  public passSelected = false;

  /**
   * mvivaCampaign from plans store - state management
   * Since current value is needed in this code
   * instead of observable value,
   * I have created an object for easier reference
   */
  private mvivaCampaign: {
    observable$: Observable<iMvivaCampaign>;
    subscriber: Subscription | null;
    current: iMvivaCampaign | null
  } = {
    observable$: this.plansQuery.select(state => state.mviva_campaign),
    subscriber: null,
    current: null
  };

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _deviceDataService: DeviceDataService,
    private _commonUtilService: CommonUtilService,
    private plansQuery: PlansQuery
  ) {
    super();
  }

  ngOnInit() {
    this.Init();
    /* Added for enabling and disabling of the success errors and info popup's at the bottom */
    this.subscriber = this._deviceDataService.sharedDeviceUpfrontPenalty$.subscribe(data => {
      if (data !== undefined) {
        this.deviceUpfrontPenalty = Number(data);
      }
    });
    this.subscriber = this._deviceDataService.sharedBillingType$.subscribe(data => {
      this.billType = data;
    });
    this.subscriber = this._deviceDataService.sharedAutoBilling$.subscribe(data => {
      this.mandatoryAutoBilling = `${data}`;
    });
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.errorMessage = data)
    );
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.errorAddToCart = data)
    );
    this.subscriber = this._deviceDataService.sharedSaleablePlanArray$.subscribe(data => {
      if (data) {
        this.saleablePlanArray = data;
        if (this.isBundleClicked && this.suppLinesDetails && this.suppLinesDetails.length > 0) {
          if (Number(this.saleablePlanArray.prices[this.suppCount].supplementary_count) !==
            Number(this.suppLinesDetails[this.suppLinesDetails.length - 1].maxCount)) {
            this.updateSupplementaryPrice(this.saleablePlanArray);
          }
        }
      }
    });
    this.plan$ = this.plansQuery.select(store => store.plan);
    this.plan$.subscribe((data) =>{
      if (data) {
        this.passSelected = true;
      } else{
        this.passSelected = false;
      }
    })
    this.subscriber = this._deviceDataService.sharedSupplimentaryLines$.subscribe(
      data => {
        this.suppLinesDetails = data;
        if (this.suppLinesDetails && this.suppLinesDetails.length > 0) {
          if (typeof window !== 'undefined') {
            if (this.orderDevicePrice !== null && this.orderOneTimePay !== null) {
              if (this.isBundleClicked) {
                this.updateSupplementaryPrice(this.saleablePlanArray);
              }
            } else {
              if (this.orderMonthlyPay) {
              this.orderTotalPay = Number((this.orderMonthlyPay).toString());
                if (this.isProjectStar && this.orderPlanPass && this.orderPlanPass.associatedPassSku !== undefined) {
                  this.orderTotalPay = Number(this.orderMonthlyPay) + Number(this.basePlanStarPrice);
                }
                if (this.suppLinesDetails.length > 0) {
                  for (let i = 0; i < this.suppLinesDetails.length; i++) {
                    this.orderTotalPay = this.orderTotalPay + Number(this.suppLinesDetails[i].planPrice);
                  }
                  this.suppLinesLength = this.suppLinesDetails.length;
                }
              } else if (this.isProjectStar && this.UpfrontGB()) {
                this.orderTotalPay = Number(this.orderMonthlyPay) + Number(this.basePlanStarPrice);
                this.suppLinesDetails.forEach(data => this.orderTotalPay += +data.planPrice);
              }
              this._deviceDataService.publishTotalPay(
                this.mvivaCampaign.current?.no_upfront_payment
                  ? 0 : this.orderTotalPay
              );
            }
          }
        }else{
          if (!this.passSelected) {
            if(!this.IsDeviceOnly()){
            this.orderTotalPay = Number(this.basePlanStarPrice);
            }
          } else {
            if (this.orderDevicePrice !== null && this.orderOneTimePay !== null) {
              if (this.isBundleClicked) {
                this.updateSupplementaryPrice(this.saleablePlanArray);
              }
            }else{
          this.orderTotalPay = Number(this.orderMonthlyPay) + Number(this.basePlanStarPrice);
          }
        }
          this._deviceDataService.publishTotalPay(
            this.mvivaCampaign.current?.no_upfront_payment
              ? 0 : this.orderTotalPay
          );
        }
      }
    );
    this.subscriber = this._deviceDataService.sharedIsKardashianPlan$.subscribe(data => {
      this.isKardasianPlanSelected = data;
    });
    if (this.selectedProd) {
      this.isGoldenNumberSelected = this.selectedProd.is_golden_number;
    } else {
      this.subscriber = this._deviceDataService.sharedGoldenNumber$.subscribe(data => {
        this.isGoldenNumberSelected = data;
      });
    }
    this.subscriber = this._deviceDataService.upfrontWaived$.subscribe(
      data => {
        this.upfrontWaived = data;
        if (this.upfrontWaived) {
          this._deviceDataService.publishTotalPay(this.orderDevicePrice);
        }
      }
    );
    this.subscriber = this._deviceDataService.sharedDevicePagePurachaseTypeTab$.subscribe(data => {
      this.DevicePagePurachaseTypeCLicked = data;
      if (this.DevicePagePurachaseTypeCLicked === 'Easyphone') {
        this.isEasyPhone = true;
      } else {
        this.isEasyPhone = false;
      }
    });
    this.subscriber = this._deviceDataService.eligibleRebate$.subscribe(data => {
      this.showEligibleRebate = data;
    });
    this.subscriber = this._deviceDataService.sharedTabSelected$.subscribe(data => this.tabSelected = data);
    if (localStorage && localStorage.getItem("lifestylePlans")) {
      this.lifestylePlans = JSON.parse(localStorage.getItem("lifestylePlans"));
    }
    if (localStorage && localStorage.getItem("promotionallifestylePlans")) {
      this.promotionallifestylePlans = JSON.parse(localStorage.getItem("promotionallifestylePlans"));
    }
    if (localStorage && localStorage.getItem("isEasyPhone")) {
      this.isEasyPhone = JSON.parse(localStorage.getItem("isEasyPhone"));
    }

    if (this.isEasyPhone && !localStorage.getItem('afterLoginEasyPhone')) {
      this.isRentClicked = true;
    }

    if (localStorage && localStorage.getItem('afterLoginEasyPhone')) {
      if (localStorage && localStorage.getItem("isRentClicked")) {
        this.isRentClicked = JSON.parse(localStorage.getItem("isRentClicked"));
        if (this.isRentClicked) {
          this.isOwnClicked = false;
          if (localStorage && localStorage.getItem("rentPrice")) {
            this.rentPrice = JSON.parse(localStorage.getItem("rentPrice"));
            if (localStorage && localStorage.getItem("rentMonthlyPay")) {
              this.orderMonthlyPay = Number(JSON.parse(localStorage.getItem("rentMonthlyPay")));
            }
            if (this.rentPrice && this.orderMonthlyPay) {
              this.rentTotal = Number(this.rentPrice);
              this.orderMonthlyPayTotal = Number(this.orderMonthlyPay);
              this.orderTotalPay = Number(this.rentPrice) + Number(this.orderMonthlyPay);
              this._deviceDataService.publishTotalPay(Number(this.rentPrice) + Number(this.orderMonthlyPay));
            }
          }
        }
      }

      if (localStorage && localStorage.getItem("isOwnClicked")) {
        this.isOwnClicked = JSON.parse(localStorage.getItem("isOwnClicked"));
        if (this.isOwnClicked) {
          this.isRentClicked = false;
          if (localStorage && localStorage.getItem("ownPrice")) {
            this.ownPrice = JSON.parse(localStorage.getItem("ownPrice"));
            if (localStorage && localStorage.getItem("ownMonthlyPay")) {
              this.orderMonthlyPay = Number(JSON.parse(localStorage.getItem("ownMonthlyPay")));
            }
            if (this.ownPrice && this.orderMonthlyPay) {
              this.ownTotal = Number(this.ownPrice);
              this.orderMonthlyPayTotal = Number(this.orderMonthlyPay);
              this.orderTotalPay = Number(this.ownPrice) + Number(this.orderMonthlyPay);
              this._deviceDataService.publishTotalPay(Number(this.ownPrice) + Number(this.orderMonthlyPay));
            }
          }
        }
      }

      if (localStorage && localStorage.getItem("isBundleClicked")) {
        this.isBundleClicked = JSON.parse(localStorage.getItem("isBundleClicked"));
        if (this.isBundleClicked) {
          this.isOwnClicked = false;
          this.isRentClicked = false;
          if (localStorage && localStorage.getItem("bundlePrice")) {
            this.bundlePrice = JSON.parse(localStorage.getItem("bundlePrice"));
          }
          if (localStorage && localStorage.getItem("bundleUpfrontPrice")) {
            this.bundleUpfrontPrice = JSON.parse(localStorage.getItem("bundleUpfrontPrice"));
          }
          if (this.bundlePrice && this.bundleUpfrontPrice) {
            this.orderTotalPay = (Number(this.bundlePrice) + Number(this.bundleUpfrontPrice));
            this._deviceDataService.publishTotalPay((Number(this.bundlePrice) + Number(this.bundleUpfrontPrice)));
          }
        }
      }
      if (localStorage) {
        localStorage.removeItem("afterLoginEasyPhone");
      }
    }

    this.subscriber = this._deviceDataService.preOrderData$.subscribe(data => {
      this.preOrderData = data;
    });
    this.subscriber = this._deviceDataService.isEasyPhone$.subscribe(data => {
      if (typeof window !== 'undefined' && localStorage && localStorage.getItem("isDeviceOnlyClicked")) {
        this.isEasyPhone = false;
        this.isBundleClicked = false;
        this.isRentClicked = false;
        this.isOwnClicked = false;
      } else {
        this.isEasyPhone = data;
        if (this.isEasyPhone && localStorage && !localStorage.getItem("EditEasyPhone")) {
          if (localStorage.getItem("isOwnClicked") && JSON.parse(localStorage.getItem("isOwnClicked"))) {
            this.isOwnClicked = true;
          } else {
            this.isRentClicked = true;
          }
        }
      }
      if (localStorage && localStorage.getItem("EditEasyPhone")) {
        localStorage.removeItem("EditEasyPhone");
      }
    });
    this.subscriber = this._deviceDataService.isRentClicked$.subscribe(data => {
      this.isRentClicked = data;
      if (this.isRentClicked) {
        this.isOwnClicked = false;
        this.isBundleClicked = false;
      }
    });
    this.subscriber = this._deviceDataService.isOwnClicked$.subscribe(data => {
      this.isOwnClicked = data;
      if (this.isOwnClicked) {
        this.isRentClicked = false;
        this.isBundleClicked = false;
      }
    });
    this.subscriber = this._deviceDataService.isBundleClicked$.subscribe(data => {
      this.isBundleClicked = data;
      if (this.isBundleClicked) {
        this.isRentClicked = false;
        this.isOwnClicked = false;
      }
    });
    this.subscriber = this._deviceDataService.rentPrice$.subscribe(data => {
      this.rentPrice = data;
      if (this.rentPrice) {
        this.rentPrice = Number(this.rentPrice);
        if (localStorage && localStorage.getItem("rentMonthlyPay")) {
          this.orderMonthlyPay = Number(JSON.parse(localStorage.getItem("rentMonthlyPay")));
        }
        if (this.isRentClicked && this.orderMonthlyPay) {
          this.rentTotal = Number(this.rentPrice);
          this.orderMonthlyPayTotal = Number(this.orderMonthlyPay);
          this.orderTotalPay = Number(this.rentPrice) + Number(this.orderMonthlyPay);
          this._deviceDataService.publishTotalPay(this.orderTotalPay);
        }
      }
    });
    this.subscriber = this._deviceDataService.ownPrice$.subscribe(data => {
      this.ownPrice = data;
      if (this.ownPrice) {
        this.ownPrice = Number(this.ownPrice);
        if (localStorage && localStorage.getItem("ownMonthlyPay")) {
          this.orderMonthlyPay = Number(JSON.parse(localStorage.getItem("ownMonthlyPay")));
        }
        if (this.isOwnClicked && this.orderMonthlyPay) {
          this.ownTotal = Number(this.ownPrice);
          this.orderMonthlyPayTotal = Number(this.orderMonthlyPay);
          this.orderTotalPay = Number(this.ownPrice) + Number(this.orderMonthlyPay);
          this._deviceDataService.publishTotalPay(this.orderTotalPay);
        }
      }
    });
    this.subscriber = this._deviceDataService.bundlePrice$.subscribe(data => {
      this.bundlePrice = data;
      if (this.bundlePrice) {
        this.bundlePrice = Number(this.bundlePrice);
      }
      if (!this.isMviva) {
        if (this.bundleUpfrontPrice) {
          this.bundleUpfrontPrice = Number(this.bundleUpfrontPrice);
          if (this.isBundleClicked && this.bundleUpfrontPrice) {
            this.orderTotalPay = (Number(this.bundlePrice) + Number(this.bundleUpfrontPrice));
            this._deviceDataService.publishTotalPay(Number(this.bundlePrice) + Number(this.bundleUpfrontPrice));
          }
        }
      }
    });
    this.subscriber = this._deviceDataService.bundleUpfrontPrice$.subscribe(data => {
      if (!this.isMviva) {
        this.bundleUpfrontPrice = data;
        if (this.bundleUpfrontPrice) {
          this.bundleUpfrontPrice = Number(this.bundleUpfrontPrice);
          if (this.isBundleClicked && this.bundleUpfrontPrice) {
            this.orderTotalPay = (Number(this.bundlePrice) + Number(this.bundleUpfrontPrice));
            this._deviceDataService.publishTotalPay(Number(this.bundlePrice) + Number(this.bundleUpfrontPrice));
          }
        }
      }
    });
    this.subscriber = this._deviceDataService.isMviva$.subscribe(data => {
      this.isMviva = data;
      if (this.isMviva) {
        this.setMvivaParams();
      }
    });
    this.subscriber = this._deviceDataService.deviceUpfront$.subscribe(data => {
      if (this.isProjectStar && data !== null && data.duration_check && data.duration_check.device) {
        this.deviceUpfront = data.duration_check.device;
      } else {
        this.deviceUpfront = data;
      }
      if (this.deviceUpfront) {
        this.deviceUpfrontToDisplay = Number(this.deviceUpfront);
        if (this.isRentClicked && this.rentPrice) {
          this.rentTotal = Number(this.rentPrice) * Number(this.deviceUpfront);
          this.orderTotalPay = this.rentTotal + this.orderMonthlyPayTotal;
          this._deviceDataService.publishTotalPay(this.rentTotal + this.orderMonthlyPayTotal);
          if (this.isProjectStar) {
            const { response: { plan, pass }, status } = data.star_eligibility;
            if (status === true) {
              this._deviceDataService.publishTotalPay(this.rentTotal + this.orderMonthlyPayTotal + +plan + +pass);
              this.basePlanStarPrice = this.basePlanStarPrice * this.planUpfront;
              this.orderEasyphonePrice = this.orderEasyphonePrice * this.planUpfront;
            } else {
              this._deviceDataService.publishTotalPay(this.rentTotal + this.orderMonthlyPayTotal + ((this.basePlanStarPrice + this.orderEasyphonePrice) * this.planUpfront));
              this.basePlanStarPrice = this.basePlanStarPrice * this.planUpfront;
              this.orderEasyphonePrice = this.orderEasyphonePrice * this.planUpfront;
            }
          }
        }
        if (this.isOwnClicked && this.ownPrice) {
          this.ownTotal = Number(this.ownPrice) * Number(this.deviceUpfront);
          this.orderTotalPay = this.ownTotal + this.orderMonthlyPayTotal;
          this._deviceDataService.publishTotalPay(this.ownTotal + this.orderMonthlyPayTotal);
          if (this.isProjectStar) {
            const { response: { plan, pass }, status } = data.star_eligibility;
            if (status === true) {
              this._deviceDataService.publishTotalPay(this.ownTotal + this.orderMonthlyPayTotal + +plan + +pass);
              this.basePlanStarPrice = this.basePlanStarPrice * this.planUpfront;
              this.orderEasyphonePrice = this.orderEasyphonePrice * this.planUpfront;
            } else {
              this._deviceDataService.publishTotalPay(this.ownTotal + this.orderMonthlyPayTotal + ((this.basePlanStarPrice + this.orderEasyphonePrice) * this.planUpfront));
              this.basePlanStarPrice = this.basePlanStarPrice * this.planUpfront;
              this.orderEasyphonePrice = this.orderEasyphonePrice * this.planUpfront;
            }
          }
        }
      }
    });
    this.subscriber = this._deviceDataService.planUpfront$.subscribe(data => {
      this.planUpfront = data;
      if (this.planUpfront) {
        this.planUpfrontToDisplay = Number(this.planUpfront);
        if ((this.isRentClicked && this.orderMonthlyPay) || (this.isRentClicked && this.orderMonthlyPay === 0)) {
          this.orderMonthlyPayTotal = Number(this.orderMonthlyPay) * Number(this.planUpfront);
          this.orderTotalPay = this.rentTotal + this.orderMonthlyPayTotal;
          this._deviceDataService.publishTotalPay(this.rentTotal + this.orderMonthlyPayTotal);
        }
        if ((this.isOwnClicked && this.orderMonthlyPay) || (this.isOwnClicked && this.orderMonthlyPay === 0)) {
          this.orderMonthlyPayTotal = Number(this.orderMonthlyPay) * Number(this.planUpfront);
          this.orderTotalPay = this.ownTotal + this.orderMonthlyPayTotal;
          this._deviceDataService.publishTotalPay(this.ownTotal + this.orderMonthlyPayTotal);
        }
      }
    });

    this.subscriber = this._deviceDataService.lifestylePlans$.subscribe(data => {
      this.lifestylePlans = data;
    });

    this.subscriber = this._deviceDataService.sharedPurchaseTypeTab$.subscribe(data => {
      this.isCOBPFlow = (data == 'SameNumber');
    });

    this.mvivaCampaign.subscriber = this.mvivaCampaign.observable$.subscribe(
      data => {
        if (data) {
          this.mvivaCampaign.current = data;
        } else {
          this.mvivaCampaign.current = null;
        }
      }
    );
  }
  MonthlyChargesStar() {
    let result = Number(this.basePlanStarPrice);
    if (typeof window !== 'undefined' && localStorage && (localStorage.getItem("Eligible") === 'true')) {
      this.basePlanStarPrice = 0;
      this.orderMonthlyPay = 0;
      this._deviceDataService.publishTotalPay(0);
      const { TotalPay: chargesTotal } = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
      return chargesTotal;
    }
    if (this.orderPlanPass && this.orderPlanPass.associatedPassSku !== undefined)  {
      result = Number(this.orderMonthlyPay) + Number(this.basePlanStarPrice);
    }
    return result;
  }

  projectStarInit() {
    this.subscriber = this._deviceDataService.basePlanStar$.subscribe(data => {
      if (data !== null) {
        this.basePlanStarName = data.PlanName;
        this.basePlanStarPrice = data.PlanMonthlyPay;
      }
    });
    this.selectedImage = this.isProjectStar ? this.data.base_plan[0].image_url : this.data.image_url;
    this.orderTotalPay = this.basePlanStarPrice;
  }

  public setMvivaParams() {
    if (localStorage && localStorage.getItem("mvivaSummaryMessage")) {
      this.mvivaSummaryMessage = localStorage.getItem("mvivaSummaryMessage");
    }
    if (localStorage && localStorage.getItem("mvivaPlanUpfront")) {
      this.mvivaPlanUpfront = JSON.parse(localStorage.getItem("mvivaPlanUpfront"));
      if (this.mvivaPlanUpfront) {
        this._deviceDataService.publishTotalPay(0);
      }
    }
    if (localStorage && localStorage.getItem("mvivaBundleUpfront")) {
      this.mvivaBundleUpfront = JSON.parse(localStorage.getItem("mvivaBundleUpfront"));
    }
  }

  public Init() {
    if (this.isProjectStar) {
      this.projectStarInit();
    }
    this.subscriber = this._deviceDataService.sharedDevice$.subscribe(data => this.orderDevice = data);
    this.subscriber = this._deviceDataService.sharedNotificationError$.subscribe(data => this.errorMessage = data);
    if (!this.orderDevice && !this.data.TableInfo) {
      this.orderDevice = this.data.basic_details.sku;
      this.orderDeviceName = this.data.basic_details.name;
      this.OrderDeviceExist = true;
    } else if (this.data.TableInfo && !this.orderDevice) {
      this.OrderDeviceExist = false;
    } else {
      this.OrderDeviceExist = true;
    }
    if (this.data.basic_details && this.data.basic_details.addons && this.data.basic_details.addons.items) {
      this.lifestyleSummaryText = this.data.basic_details.addons.items[0].summary;
    }
    if (this.data.associated_product && this.data.associated_product.length>0) {
      this.upfrontInstallment = this.data.associated_product[0].upfront_installment;
    }
    if(this.upfrontInstallment) {
      this.isUpfrontInstallment = true;
    }
    if (this.data.addons && this.data.addons.items) {
      this.lifestyleSummaryText = this.data.addons.items[0].summary;
    }
    this.subscriber = this._deviceDataService.sharedStorage$.subscribe(
      data => this.orderSummaryStorage = data
    );
    this.subscriber = this._deviceDataService.sharedColor$.subscribe(data => this.orderSummaryColor = data);
    this.subscriber = this._deviceDataService.sharedPhoneNo$.subscribe(data => this.orderPhoneNo = data);
    this.subscriber = this._deviceDataService.sharedEligibility$.subscribe(data => this.eligibilty = data);
    this.subscriber = this._deviceDataService.sharedPlan$.subscribe(data => this.orderPlan = data);
    this.subscriber = this._deviceDataService.sharedDevicePrice$.subscribe(data => this.orderDevicePrice = data ? Number(data) : data);
    this.subscriber = this._deviceDataService.sharedMonthlyPay$.subscribe(data => {
      this.orderMonthlyPay = data;
      if (this.orderMonthlyPay) {
        this.totalPayEasyPhone = Number(this.orderMonthlyPay);
        if (this.isEasyPhone) {
          this.orderEasyphonePrice = Number(this.orderMonthlyPay) - this.basePlanStarPrice;
        }
      }
    });
    this.subscriber = this._deviceDataService.sharedOneTimePay$.subscribe(data => {
      this.orderOneTimePay = data;
      if (this.orderOneTimePay) {
        this.orderOneTimePay = Number(this.orderOneTimePay);
      }
    });
    this.subscriber = this._deviceDataService.sharedTotalpay$.subscribe(data => {
      this.orderTotalPay = Number(data);
    });
    this.subscriber = this._deviceDataService.sharedNumberType$.subscribe(data => this.orderNumberType = data);
    this.subscriber = this._deviceDataService.productSkuToPublish$.subscribe(data => this.selectedProductSku = data);
    this.subscriber = this._deviceDataService.sharedPlanDetails$.subscribe(data => {
      this.selectedPlanDetails = data;
      if (this.selectedPlanDetails && this.selectedPlanDetails.additional_information) {
        this.additionalInfo = this.selectedPlanDetails.additional_information;
      } else {
        this.additionalInfo = null;
      }   
      if (this.selectedPlanDetails && this.selectedPlanDetails.image_url) {
        this.selectedImage = this.selectedPlanDetails.image_url;
      }
      if (this.selectedPlanDetails && this.selectedPlanDetails.telco_day && this.selectedPlanDetails.telco_day.status) {
        this.isTelcoDay = this.selectedPlanDetails.telco_day.status;
        if (this.selectedPlanDetails.telco_day.message) {
          this.telcoDayMessage = this.selectedPlanDetails.telco_day.message;
        }
      } else {
        this.isTelcoDay = false;
        this.telcoDayMessage = "";
      }
    });
    this.subscriber = this._deviceDataService.sharedPlanName$.subscribe(data => this.orderPlanName = data);
    this.subscriber = this._deviceDataService.sharedPassPlanStar$.subscribe(data => {
      if (data !== undefined) {
        this.orderPlanPass = data;
      }
    });
    this.subscriber = this._deviceDataService.sharedImageList$.subscribe(data => this.selectedImageList = data);
    this.subscriber = this._deviceDataService.sharedImage$.subscribe(data => {
      this.selectedImage = data;
    });
    this.subscriber = this._deviceDataService.outOfStock$.subscribe((data) => {
      this.outOfStock = data.status;
      this.stockDetials = data;
    });
    this.subscriber = this._deviceDataService.sharedContract$.subscribe((data) => {
      if (data) {
        this.SharedContract = data;
      }
    });
    if (localStorage && localStorage.getItem("SelectedPlanDetailsInDevice")) {
      const plan = JSON.parse(localStorage.getItem("SelectedPlanDetailsInDevice"));
      if (plan.contract) {
        this.contract = plan.contract;
      }
    }
    this.SharedContract = this.SharedContract ? this.SharedContract : this.contract;
    if (localStorage && localStorage.getItem("mnp-edit-flow")) {
      this.orderNumberType = 'SwitchToCelcom';
      localStorage.removeItem("mnp-edit-flow");
    }
    if (localStorage && localStorage.getItem("isMviva")) {
      this.isMviva = JSON.parse(localStorage.getItem("isMviva"));
      if (this.isMviva) {
        this.setMvivaParams();
      }
    }

    if (this.data.TableInfo && !this.isProjectStar) {
      this.orderOneTimePay = this.data.OneTimePayment;
      if (this.orderOneTimePay) {
        this.orderOneTimePay = Number(this.orderOneTimePay);
      }
      this.selectedPlanDetails = this.data.PlanDetails;
      this.orderMonthlyPay = this.data.PlanMonthlyPay;
      this.totalPayEasyPhone = Number(this.orderMonthlyPay);
      this.orderPlanName = this.data.PlanName;
      this.orderPlan = this.data.PlanName;
      this.orderTotalPay = Number(this.data.TotalPay);
      this.orderDevice = null;
      this.selectedPlanSku = this.data.PlanSku;
      this.CreateObjectFOrPlanOnlyCart();
    }

  }
  CreateObjectFOrPlanOnlyCart() {
    this.orderDetails = {
      sku: this.selectedPlanSku,
      price: this.orderTotalPay,
    };

    if (!this.isProjectStar) {
      this.PlanOnlyObjectForCart = {
        selectedProductSku: this.selectedPlanSku,
        orderPhoneNo: this.orderPhoneNo,
        orderPlan: this.data.PlanName,
        selectedPlanDetails: this.data,
        orderPlanName: this.data.PlanName,
        orderMonthlyPay: this.data.PlanMonthlyPay,
        orderOneTimePay: this.data.OneTimePayment,
        orderTotalPay: this.data.TotalPay,
        orderNumberType: this.orderNumberType,
        total: this.data.TotalPay
      };
      this.itemSubmitted = true;
      if (this.data && this.data.telco_day && this.data.telco_day.status) {
        this.isTelcoDay = this.data.telco_day.status;
        if (this.data.telco_day.message) {
          this.telcoDayMessage = this.data.telco_day.message;
        }
      } else {
        this.telcoDayMessage = "";
        this.isTelcoDay = false;
      }
    }
  }
  updateSupplementaryPrice(saleablePlanArray: any) {
    let suppNumber = 0;
    if (saleablePlanArray.prices[this.suppCount]) {
      suppNumber = this.suppCount;
    }
    if (saleablePlanArray && this.suppLinesDetails) {
      if (this.suppLinesDetails && this.suppLinesDetails.length >= 0) {
        if (typeof window !== 'undefined') {
          if (this.orderDevicePrice !== null && this.orderOneTimePay !== null) {
            this.orderTotalPay = 0;
            this.devicePriceWithSubsidy = this.orderDevicePrice;
            this.totalSubsidyAmount = 0;
            this.suppLinesLength = this.suppLinesDetails.length;
            this.orderTotalPay = (Number(this.orderDevicePrice) + Number(this.orderOneTimePay));
            if (this.suppLinesDetails.length > 0) {
              if (!saleablePlanArray.prices[suppNumber].supplementary_count ||
                Number(saleablePlanArray.prices[suppNumber].supplementary_count) === 0) {
                this.totalSubsidyAmount =
                  (this.suppLinesDetails.length * Number(this.suppLinesDetails[this.suppLinesDetails.length - 1].subsidyAmount));
                if ((Number(this.orderDevicePrice) - Number(this.totalSubsidyAmount)) < 0) {
                  this.devicePriceWithSubsidy = "0.00";
                } else {
                  this.devicePriceWithSubsidy = (Number(this.orderDevicePrice) - Number(this.totalSubsidyAmount)).toString();
                }
                this.orderTotalPay = Number((Number(this.devicePriceWithSubsidy) + Number(this.orderOneTimePay)).toString());
              } else if (saleablePlanArray.prices[this.suppCount].supplementary_count ||
                Number(saleablePlanArray.prices[this.suppCount].supplementary_count) !== 0) {
                if (this.suppLinesDetails.length < Number(saleablePlanArray.prices[suppNumber].supplementary_count)) {
                  this.totalSubsidyAmount =
                    this.suppLinesDetails.length * Number(this.suppLinesDetails[this.suppLinesDetails.length - 1].subsidyAmount);
                  if ((Number(this.orderDevicePrice) - Number(this.totalSubsidyAmount)) < 0) {
                    this.devicePriceWithSubsidy = "0.00";
                  } else {
                    this.devicePriceWithSubsidy = (Number(this.orderDevicePrice) - Number(this.totalSubsidyAmount)).toString();
                  }
                  this.orderTotalPay = Number((Number(this.devicePriceWithSubsidy) + Number(this.orderOneTimePay)).toString());
                } else {
                  this.devicePriceWithSubsidy = (saleablePlanArray.prices[suppNumber].special_price).toString();
                  if (this.suppLinesDetails &&
                    this.suppLinesDetails.length > Number(saleablePlanArray.prices[suppNumber].supplementary_count)) {
                    if (Number(this.devicePriceWithSubsidy) > 0) {
                      this.totalSubsidyAmount =
                        (this.suppLinesDetails.length - Number(saleablePlanArray.prices[suppNumber].supplementary_count)) *
                        Number(this.suppLinesDetails[this.suppLinesDetails.length - 1].subsidyAmount);
                      this.devicePriceWithSubsidy = (Number(this.devicePriceWithSubsidy) - Number(this.totalSubsidyAmount)).toString();
                    }
                  }
                  this.orderTotalPay = Number((Number(this.devicePriceWithSubsidy) + Number(this.orderOneTimePay)).toString());
                }
              }
              for (let i = 0; i < this.suppLinesDetails.length; i++) {
                this.orderTotalPay = this.orderTotalPay + Number(this.suppLinesDetails[i].planPrice);
              }
              this.suppLinesLength = this.suppLinesDetails.length;
            }
            this._deviceDataService.publishTotalPay(this.orderTotalPay);
          }
        }
      }
      if (this.isBundleClicked === true) {
        suppNumber = 0;
        if (saleablePlanArray.prices[this.suppLinesLength]) {
          suppNumber = this.suppLinesLength;
        }
        this._deviceDataService.publishOneTimePay(saleablePlanArray.prices[suppNumber].upfront_price);
        this.orderOneTimePay = saleablePlanArray.prices[suppNumber].upfront_price;
        this.devicePriceWithSubsidy = saleablePlanArray.prices[suppNumber].device_price;
        this.orderTotalPay = Number((Number(this.devicePriceWithSubsidy) + Number(this.orderOneTimePay)).toString());
        for (let i = 0; i < this.suppLinesDetails.length; i++) {
          this.orderTotalPay = this.orderTotalPay + Number(this.suppLinesDetails[i].planPrice);
        }
        this._deviceDataService.publishTotalPay(this.orderTotalPay);
      }
    }
  }
  ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  defaultOnClick() {
    return false;
  }

  RoundingOff(value) {
    return this._commonUtilService.RoundingOff2String(value);
  }

  checkStarBasePlan(): boolean {
    return this.basePlanStarName && (this.basePlanStarPrice !== null);
  };

  MnpEligible() {
    return ((typeof window !== 'undefined' && localStorage && localStorage.getItem("Eligible")) === 'true');
  }

  checkIsEasyPhoneRent(): boolean {
    const validation = this.isEasyPhone && this.isRentClicked;
    return validation;
  }

  checkIsEasyPhoneOwn(): boolean {
    const validation = this.isEasyPhone && this.isOwnClicked;
    return validation;
  }

  checkIsNotDeviceOnly(): boolean {
    const validation = (localStorage && localStorage.getItem("isDeviceOnlyClicked")) !== "true";
    return validation;
  }

  checkIsDeviceBundle(): boolean {
    const validation = !this.isEasyPhone && !this.isRentClicked && !this.isOwnClicked && this.isBundleClicked && this.orderPlanName;
    return validation;
  }

  ImageClass() {
    return this.orderDeviceName ? 'summary-samsung' : 'benji-img';
  }

  BasePlanBundle() {
    return !this.isBundleClicked ? `summary-grid-right up_front_right is-font-bold` : null;
  }

  UpfrontGB() {
    // this.getTypeOfPurchase();
    return sessionStorage.getItem("isGBPassSelected") === "true" && !this.orderPlanName;
  }

  PlanNewNumber() {
    return (!this.orderDeviceName && this.orderPlanName && this.orderNumberType != 'KeepNumber' && this.orderNumberType != 'SwitchToCelcom' && !this.isRentClicked && !this.isOwnClicked && !this.isProjectStar)
  }
  PlanNewNumberStar() {
    return (!this.orderDeviceName && this.orderPlanName && this.orderNumberType != 'KeepNumber' && this.orderNumberType != 'SwitchToCelcom' && !this.isRentClicked && !this.isOwnClicked && this.isProjectStar)
  }
  CheckIsUserGuest() {
    if (sessionStorage && sessionStorage.getItem("GuestInfo")) {
      this.isUserGuest = true;
    }
    return this.isUserGuest;
  }
  IsDeviceOnly() {
    if (localStorage && localStorage.getItem("isDeviceOnlyClicked")) {
      this.isDeviceOnlyClicked = true;
    }
    return this.isDeviceOnlyClicked;
  }

  getTotalPay() {
    let total = 0;
    if (this.isEasyPhone
        && !this.upfrontWaived
        && !this.mvivaBundleUpfront
        && !this.mvivaPlanUpfront
        && (this.deviceUpfrontPenalty
            && (this.orderNumberType === 'KeepNumber' || this.isEasyPhone))) {
        //
        total = (this.orderTotalPay? (this.orderTotalPay + this.deviceUpfrontPenalty) : (0.00 + this.deviceUpfrontPenalty))
    } else if (this.isEasyPhone
        && !this.upfrontWaived
        && !this.mvivaBundleUpfront
        && !this.mvivaPlanUpfront
        && ((this.orderNumberType !== 'KeepNumber'
            && !this.isEasyPhone) || !this.deviceUpfrontPenalty)
            && !this.isProjectStar) {
        //
        total = (this.orderTotalPay? (this.orderTotalPay) : 0.00)
    } else if (this.isProjectStar
        && !this.isEasyPhone
        && !this.upfrontWaived
        && !(this.mvivaBundleUpfront && this.deviceUpfrontPenalty
          && (this.orderNumberType === 'KeepNumber' || this.isEasyPhone))) {
        //
        total = (this.orderTotalPay? (this.orderTotalPay) : 0.00)
    } else if (this.isEasyPhone
        && !this.upfrontWaived
        && !this.mvivaBundleUpfront
        && this.mvivaPlanUpfront) {
        //
        total = this.deviceUpfrontPenalty
    } else if (this.isEasyPhone
        && this.upfrontWaived
        && !this.mvivaBundleUpfront) {
        //
        total = (this.orderDevicePrice? (this.orderDevicePrice + this.deviceUpfrontPenalty) : (0.00 + this.deviceUpfrontPenalty))
    } else if (this.isEasyPhone
        && !this.upfrontWaived
        && this.mvivaBundleUpfront) {
        //
        total = (this.orderDevicePrice? (this.orderDevicePrice + this.deviceUpfrontPenalty) : (0.00 + this.deviceUpfrontPenalty))
    } else if (this.isBundleClicked
        && this.isEasyPhone
        && !this.upfrontWaived
        && !this.mvivaBundleUpfront) {
        //
        total = (this.orderTotalPay? (this.orderTotalPay + this.deviceUpfrontPenalty) : (0.00 + this.deviceUpfrontPenalty))
    } else if (this.isBundleClicked
        && this.isEasyPhone
        && this.upfrontWaived
        && !this.mvivaBundleUpfront) {
        //
        total = (this.bundlePrice? (this.bundlePrice + this.deviceUpfrontPenalty) : (0.00 + this.deviceUpfrontPenalty))
    } else if (this.isBundleClicked
        && this.isEasyPhone
        && !this.upfrontWaived
        && this.mvivaBundleUpfront) {
        //
        total = (this.bundlePrice? (this.bundlePrice + this.deviceUpfrontPenalty) : (0.00 + this.deviceUpfrontPenalty))
    } else if (this.isRentClicked
        && this.isEasyPhone) {
        //
        total = (this.rentTotal? (this.rentTotal + this.orderMonthlyPayTotal + this.deviceUpfrontPenalty) : (0.00 + this.deviceUpfrontPenalty))
    } else if (this.isOwnClicked
        && this.isEasyPhone) {
        //
        total = (this.ownTotal? (this.ownTotal + this.orderMonthlyPayTotal + this.deviceUpfrontPenalty) : (0.00 + this.deviceUpfrontPenalty))
    }
    return total;
  }

  // getTypeOfPurchase() {
  //   if(typeof window !== "undefined" && localStorage && localStorage.getItem("TypeOfPurchase") && localStorage.getItem("TypeOfPurchase") !== null) {
  //     this.typeOfPurchase = localStorage.getItem("TypeOfPurchase");
  //   }
  // }

  ngOnDestroy() {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }

    if (this.mvivaCampaign.subscriber) {
      this.mvivaCampaign.subscriber.unsubscribe();
    }
    this.infoMNPflow = null;
  }
}
