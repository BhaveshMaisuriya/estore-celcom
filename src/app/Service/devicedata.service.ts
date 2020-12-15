import { Injectable, Inject, forwardRef } from '@angular/core';
import { BehaviorSubject ,  Subject } from 'rxjs';
import { AUTO_BILLING } from '../shared/constants/application.constants';
import { TypeofPurchaseService } from './type-of-purchase.service';
import { PlansService } from './plans.service';
import { SupplementaryData, iOmniCampaign } from 'app/shared/models/plan.model';
import { IPromotionBadge } from 'app/pages/new-landing-page/store/shop-device.model';
import { iMvivaCampaign } from 'app/shared/models/device.model';

export interface iBasePlan{
  PlanMonthlyPay?: string;
  PlanName?: string;
  additional_information?: string;
  backgroundColor?: string;
  banner_image?: string;
  bill_type?: string;
  buyNowLink?: string;
  buyNowText?: string;
  contract?: string;
  data_limit?: string;
  speed_limit?: string;
  endDate?: string;
  footNote?: string;
  indicatorClass?: string;
  is_premium_plan?: string;
  is_xpax?: string;
  keyFiguresText?: string;
  keyText?: string;
  key_text?: string;
  knowMoreLink?: string;
  knowMoreText?: string;
  lower_age_limit?: string;
  mobileDescription?: string;
  mobile_image?: string;
  monthlyPlan?: string;
  name?: string;
  newCustomer?: string;
  ngn_part_number?: string;
  orderPlanBundle?: string;
  orderServiceBundle?: string;
  plan_subtitle?: string;
  plan_title?: string;
  productText?: string;
  productType?: string;
  segment?: string;
  sku?: string;
  bundle_sku?: string;
  startDate?: string;
  termsAndCondition?: Array<any>;
  upfrontInstallment?: string;
  upper_age_limit?: string;
  offer?: string;
  monthly_plan?: string;
  is_campaign_mviva?: boolean;
  campaign_mviva?: iMvivaCampaign;
  campaign_mviva_invalid?: string;
  supplementary_data?: SupplementaryData[];
  order_plan_bundle?: string;
  is_campaign_omni?: boolean;
  campaign_omni?: iOmniCampaign;
  promotion_badge?: IPromotionBadge;
  promotion_text?: string;
  promotion_terms?: string;
}

@Injectable()
export class DeviceDataService {
  private cancelEditForm = new Subject<any>();
  public cancelEditForm$ = this.cancelEditForm.asObservable();

  private voucherCode = new Subject<any>();
  public voucherCode$ = this.voucherCode.asObservable();

  private voucherCodeOld = new Subject<any>();
  public voucherCodeOld$ = this.voucherCodeOld.asObservable();

  private outOfStock = new Subject<any>();
  public outOfStock$ = this.outOfStock.asObservable();

  private emailRetreivalValidation = new Subject<any>();
  public emailRetreivalValidation$ = this.emailRetreivalValidation.asObservable();

  private editAddValidation = new Subject<any>();
  public editAddValidation$ = this.editAddValidation.asObservable();

  private guestName = new Subject<any>();
  public guestName$ = this.guestName.asObservable();

  private maxLimitReached = new Subject<boolean>();
  public maxLimitReached$ = this.maxLimitReached.asObservable();

  private buyNoPlan = new Subject<boolean>();
  public buyNoPlan$ = this.buyNoPlan.asObservable();

  private passSelected = new Subject<boolean>();
  public passSelected$ = this.passSelected.asObservable();

  private upsellProceed = new Subject<boolean>();
  public upsellProceed$ = this.upsellProceed.asObservable();

  private mnpEdited = new Subject<boolean>();
  public mnpEdited$ = this.mnpEdited.asObservable();

  private planChanged = new Subject<boolean>();
  public planChanged$ = this.planChanged.asObservable();

  private isPreOrder = new Subject<boolean>();
  public isPreOrder$ = this.isPreOrder.asObservable();

  private isMviva = new Subject<boolean>();
  public isMviva$ = this.isMviva.asObservable();

  private isEasyPhone = new Subject<boolean>();
  public isEasyPhone$ = this.isEasyPhone.asObservable();

  private isRentClicked = new Subject<boolean>();
  public isRentClicked$ = this.isRentClicked.asObservable();

  private isOwnClicked = new Subject<boolean>();
  public isOwnClicked$ = this.isOwnClicked.asObservable();

  private isBundleClicked = new Subject<boolean>();
  public isBundleClicked$ = this.isBundleClicked.asObservable();

  private onEasyTabsClicked = new Subject<any>();
  public onEasyTabsClicked$ = this.onEasyTabsClicked.asObservable();

  private deviceUpfront = new Subject<any>();
  public deviceUpfront$ = this.deviceUpfront.asObservable();

  private planUpfront = new Subject<any>();
  public planUpfront$ = this.planUpfront.asObservable();

  private preOrderEnded = new Subject<boolean>();
  public preOrderEnded$ = this.preOrderEnded.asObservable();

  private preOrderData = new Subject<boolean>();
  public preOrderData$ = this.preOrderData.asObservable();

  private easyPhoneRentData = new Subject<any>();
  public easyPhoneRentData$ = this.easyPhoneRentData.asObservable();

  private easyPhoneOwnData = new Subject<any>();
  public easyPhoneOwnData$ = this.easyPhoneOwnData.asObservable();

  private easyPhoneBundleData = new Subject<any>();
  public easyPhoneBundleData$ = this.easyPhoneBundleData.asObservable();

  private easyPhoneUpfrontData = new Subject<any>();
  public easyPhoneUpfrontData$ = this.easyPhoneUpfrontData.asObservable();

  private rentPrice = new Subject<any>();
  public rentPrice$ = this.rentPrice.asObservable();

  private ownPrice = new Subject<any>();
  public ownPrice$ = this.ownPrice.asObservable();

  private rentMonthlyPay = new Subject<any>();
  public rentMonthlyPay$ = this.rentMonthlyPay.asObservable();

  private ownMonthlyPay = new Subject<any>();
  public ownMonthlyPay$ = this.ownMonthlyPay.asObservable();

  private bundlePrice = new Subject<any>();
  public bundlePrice$ = this.bundlePrice.asObservable();

  private bundleUpfrontPrice = new Subject<any>();
  public bundleUpfrontPrice$ = this.bundleUpfrontPrice.asObservable();

  private bundleUpfrontInstallment = new Subject<any>();
  public bundleUpfrontInstallment$ = this.bundleUpfrontInstallment.asObservable();

  private bundleUpfrontInstallmentForMoon = new Subject<any>();
  public bundleUpfrontInstallmentForMoon$ = this.bundleUpfrontInstallmentForMoon.asObservable();

  private telcoDayRebate = new Subject<any>();
  public telcoDayRebate$ = this.telcoDayRebate.asObservable();

  private eligibleRebate = new Subject<boolean>();
  public eligibleRebate$ = this.eligibleRebate.asObservable();

  private isDisplayPlanEligibilityPopup = new Subject<boolean>();
  public isDisplayPlanEligibilityPopup$ = this.isDisplayPlanEligibilityPopup.asObservable();

  private messageSource = new BehaviorSubject<boolean>(false);
  public currentMessage = this.messageSource.asObservable();

  private sharedDevice = new Subject<string>();
  public sharedDevice$ = this.sharedDevice.asObservable();

  private sharedColor = new BehaviorSubject<string>('');
  public sharedColor$ = this.sharedColor.asObservable();

  private sharedStorage = new Subject<string>();
  public sharedStorage$ = this.sharedStorage.asObservable();

  private sharedAutoBilling = new BehaviorSubject<any>(AUTO_BILLING.NO);
  public sharedAutoBilling$ = this.sharedAutoBilling.asObservable();

  private sharedBroadbandAutoBilling = new Subject<any>();
  public sharedBroadbandAutoBilling$ = this.sharedBroadbandAutoBilling.asObservable();

  private runAutoBillingCheck = new Subject<any>();
  public runAutoBillingCheck$ = this.runAutoBillingCheck.asObservable();

  public colorStorageChange = new Subject<boolean>();
  public colorStorageChange$ = this.colorStorageChange.asObservable();

  public cobpLoading = new Subject<boolean>();
  public cobpLoading$ = this.cobpLoading.asObservable();

  public upfrontWaived = new Subject<boolean>();
  public upfrontWaived$ = this.upfrontWaived.asObservable();

  public upfrontWaivedSuccess = new Subject<boolean>();
  public upfrontWaivedSuccess$ = this.upfrontWaivedSuccess.asObservable();

  public upfrontWaivedFailure = new Subject<boolean>();
  public upfrontWaivedFailure$ = this.upfrontWaivedFailure.asObservable();

  private sharedPlan = new Subject<string>();
  public sharedPlan$ = this.sharedPlan.asObservable();

  private sharedBbPlanSku = new BehaviorSubject<string>('');
  public sharedBbPlanSku$ = this.sharedBbPlanSku.asObservable();

  private sharedPlanName = new BehaviorSubject<string>('');
  public sharedPlanName$ = this.sharedPlanName.asObservable();

  private sharedPassPlanStar = new BehaviorSubject<any>('');
  public sharedPassPlanStar$ = this.sharedPassPlanStar.asObservable();

  private sharedPlanNameBroadband = new BehaviorSubject<string>('');
  public sharedPlanNameBroadband$ = this.sharedPlanNameBroadband.asObservable();

  private sharedBlacklist = new BehaviorSubject<boolean>(false);
  public sharedBlacklist$ = this.sharedBlacklist.asObservable();

  private sharedPlanDetails = new Subject<string>();
  public sharedPlanDetails$ = this.sharedPlanDetails.asObservable();

  private sharedBbPlanDetails = new BehaviorSubject<any>('');
  public sharedBbPlanDetails$ = this.sharedBbPlanDetails.asObservable();

  private sharedDevicePrice = new Subject<number>();
  public sharedDevicePrice$ = this.sharedDevicePrice.asObservable();

  private sharedRrpPrice = new Subject<number>();
  public sharedRrpPrice$ = this.sharedRrpPrice.asObservable();

  private sharedMonthlyPay = new BehaviorSubject<number>(0);
  public sharedMonthlyPay$ = this.sharedMonthlyPay.asObservable();

  private sharedOneTimePay = new Subject<number>();
  public sharedOneTimePay$ = this.sharedOneTimePay.asObservable();

  private sharedTotalPay = new BehaviorSubject<number>(0);
  public sharedTotalpay$ = this.sharedTotalPay.asObservable();

  private sharedPhoneNo = new BehaviorSubject<string>('');
  public sharedPhoneNo$ = this.sharedPhoneNo.asObservable();

  private sharedTypeOfSIM = new BehaviorSubject<string>('');
  public sharedTypeOfSIM$ = this.sharedTypeOfSIM.asObservable();

  private sharedEmailId = new BehaviorSubject<string>('');
  public sharedEmailId$ = this.sharedEmailId.asObservable();

  private sharedSelection = new Subject<boolean>();
  public sharedSelection$ = this.sharedSelection.asObservable();

  private sharedEligibility = new Subject<any>();
  public sharedEligibility$ = this.sharedEligibility.asObservable();

  private sharedNumberType = new BehaviorSubject<string>('');
  public sharedNumberType$ = this.sharedNumberType.asObservable();

  private sharedRRPrice = new Subject<string>();
  public sharedRRPrice$ = this.sharedRRPrice.asObservable();

  private sharedImageList = new Subject<object>();
  public sharedImageList$ = this.sharedImageList.asObservable();

  private productSkuToPublish = new Subject<string>();
  public productSkuToPublish$ = this.productSkuToPublish.asObservable();

  private disclaimerViewed = new Subject<boolean>();
  public disclaimerViewed$ = this.disclaimerViewed.asObservable();

  private lifestylePlans = new Subject<boolean>();
  public lifestylePlans$ = this.lifestylePlans.asObservable();

  private deactivateLifestyleAddons = new Subject<boolean>();
  public deactivateLifestyleAddons$ = this.deactivateLifestyleAddons.asObservable();

  private sharedEditColor = new Subject<any>();
  public sharedEditColor$ = this.sharedEditColor.asObservable();

  private eligiblePlanList = new Subject<string[]>();
  public eligiblePlanList$ = this.eligiblePlanList.asObservable();

  private eligibleRentPlanArray = new Subject<string[]>();
  public eligibleRentPlanArray$ = this.eligibleRentPlanArray.asObservable();

  private eligibleOwnPlanList = new Subject<string[]>();
  public eligibleOwnPlanList$ = this.eligibleOwnPlanList.asObservable();

  private sharedNotification = new Subject<any>();
  public sharedNotification$ = this.sharedNotification.asObservable();

  private sharedNotificationError = new Subject<any>();
  public sharedNotificationError$ = this.sharedNotification.asObservable();

  private basePlanMoon = new Subject<any>();
  public basePlanMoon$ = this.basePlanMoon.asObservable();

  private sharedOrderNumber = new Subject<string>();
  public sharedOrderNumber$ = this.sharedOrderNumber.asObservable();

  private sharedErrorNotificationBoolean = new BehaviorSubject<any>('');
  public sharedErrorNotificationBoolean$ = this.sharedErrorNotificationBoolean.asObservable();

  private sharedBarNotificationBoolean = new Subject<any>();
  public sharedBarNotificationBoolean$ = this.sharedBarNotificationBoolean.asObservable();

  private sharedContract = new Subject<any>();
  public sharedContract$ = this.sharedContract.asObservable();

  private sharedContractExtended = new BehaviorSubject<string>('');
  public sharedContractExtended$ = this.sharedContractExtended.asObservable();

  private sharedBroadbandContract = new BehaviorSubject<string>('');
  public sharedBroadbandContract$ = this.sharedBroadbandContract.asObservable();

  private sharedPageLoader = new Subject<boolean>();
  public sharedPageLoader$ = this.sharedPageLoader.asObservable();

  private editBilling = new Subject<boolean>();
  public editBilling$ = this.editBilling.asObservable();

  private sharedImage = new Subject<string>();
  public sharedImage$ = this.sharedImage.asObservable();

  private sharedDeliveryType = new Subject<string>();
  public sharedDeliveryType$ = this.sharedDeliveryType.asObservable();

  private updateStep = new Subject<number>();
  public updateStep$ = this.updateStep.asObservable();

  private updateStickyStep = new Subject<number>();
  public updateStickyStep$ = this.updateStickyStep.asObservable();

  private sharedDisclaimerAgree = new Subject<any>();
  public sharedDisclaimerAgree$ = this.sharedDisclaimerAgree.asObservable();

  private sharedSupplimentaryLines = new Subject<any>();
  public sharedSupplimentaryLines$ = this.sharedSupplimentaryLines.asObservable();

  private sharedBillingAddress = new Subject<any>();
  public sharedBillingAddress$ = this.sharedBillingAddress.asObservable();

  private selectedPrincipalLine = new Subject<boolean>();
  public selectedPrincipalLine$ = this.selectedPrincipalLine.asObservable();

  private enableAddToCart = new Subject<boolean>();
  public enableAddToCart$ = this.enableAddToCart.asObservable();

  private enableProceed = new Subject<boolean>();
  public enableProceed$ = this.enableProceed.asObservable();

  private sharedextraSuppLinesAddedByUser = new Subject<number>();
  public sharedextraSuppLinesAddedByUser$ = this.sharedextraSuppLinesAddedByUser.asObservable();

  private sharedPurchaseTypeTab = new Subject<string>();
  public sharedPurchaseTypeTab$ = this.sharedPurchaseTypeTab.asObservable();

  private sharedDevicePagePurachaseTypeTab = new Subject<string>();
  public sharedDevicePagePurachaseTypeTab$ = this.sharedDevicePagePurachaseTypeTab.asObservable();

  private sharedTabSelected = new Subject<boolean>();
  public sharedTabSelected$ = this.sharedTabSelected.asObservable();

  private sharedDeviceEasyPhoneEligible = new Subject<boolean>();
  public sharedDeviceEasyPhoneEligible$ = this.sharedDeviceEasyPhoneEligible.asObservable();

  private sharedEditCartEasyPhone = new Subject<boolean>();
  public sharedEditCartEasyPhone$ = this.sharedEditCartEasyPhone.asObservable();

  private sharedNumberReservationId = new Subject<string>();
  public sharedNumberReservationId$ = this.sharedNumberReservationId.asObservable();

  private sharedHwValidatedId = new Subject<string>();
  public sharedHwValidatedId$ = this.sharedHwValidatedId.asObservable();

  private sharedLineChosen = new Subject<boolean>();
  public sharedLineChosen$ = this.sharedLineChosen.asObservable();

  private disableAddToCart = new Subject<boolean>();
  public disableAddToCart$ = this.disableAddToCart.asObservable();

  private esimEligible = new Subject<boolean>();
  public esimEligible$ = this.esimEligible.asObservable();

  private sharedSuppLinesPrice = new Subject<any>();
  public  sharedSuppLinesPrice$ = this.sharedSuppLinesPrice.asObservable();

  private sharedDisableNewLineCobpSTen = new Subject<any>();
  public  sharedDisableNewLineCobpSTen$ = this.sharedDisableNewLineCobpSTen.asObservable();

  private sharedDisableSuppLineForSamsungGN = new Subject<any>();
  public  sharedDisableSuppLineForSamsungGN$ = this.sharedDisableSuppLineForSamsungGN.asObservable();

  private sharedIsKardashianPlan = new Subject<boolean>();
  public  sharedIsKardashianPlan$ = this.sharedIsKardashianPlan.asObservable();

  private sharedGoldenNumber = new Subject<boolean>();
  public sharedGoldenNumber$ = this.sharedGoldenNumber.asObservable();

  private sharedSaleablePlanArray = new Subject<any>();
  public sharedSaleablePlanArray$ = this.sharedSaleablePlanArray.asObservable();

  private sharedMoonSelectedProductDetails = new Subject<any>();
  public sharedMoonSelectedProductDetails$ = this.sharedMoonSelectedProductDetails.asObservable();

  private sharedMoonColorMemoryInfo = new Subject<any>();
  public sharedMoonColorMemoryInfo$ = this.sharedMoonColorMemoryInfo.asObservable();

  private selectedAddonPassDetails = new Subject<any>();
  public selectedAddonPassDetails$ = this.selectedAddonPassDetails.asObservable();

  private sharedStockInfoToCart = new Subject<any>();
  public sharedStockInfoToCart$ = this.sharedStockInfoToCart.asObservable();

  private sharedBillingType = new Subject<number>();
  public sharedBillingType$ = this.sharedBillingType.asObservable();

  private sharedDeviceUpfrontPenalty = new Subject<any>();
  public sharedDeviceUpfrontPenalty$ = this.sharedDeviceUpfrontPenalty.asObservable();

  private sharedLoggedInUserName = new Subject<any>();
  public sharedLoggedInUserName$ = this.sharedLoggedInUserName.asObservable();

  private sharedMCTnCPopUpStyle = new Subject<any>();
  public sharedMCTnCPopUpStyle$ = this.sharedMCTnCPopUpStyle.asObservable();

  private sharedIsExcessLinesAdded = new Subject<any>();
  public sharedIsExcessLinesAdded$ = this.sharedIsExcessLinesAdded.asObservable();

  private sharedIsenableReset = new Subject<any>();
  public sharedIsenableReset$ = this.sharedIsenableReset.asObservable();

  private basePlanStar = new BehaviorSubject<iBasePlan>(null);
  public basePlanStar$ = this.basePlanStar.asObservable();

  private sharedInternetSharingOption = new Subject<any>();
  public sharedInternetSharingOption$ = this.sharedInternetSharingOption.asObservable();

  private sharedIsGBPassSelected = new BehaviorSubject<boolean>(false);
  public sharedIsGBPassSelected$ = this.sharedIsGBPassSelected.asObservable();

  private sharedIsPageNotFound = new BehaviorSubject<boolean>(false);
  public sharedIsPageNotFound$ = this.sharedIsPageNotFound.asObservable();

  private addtoCartTriggered = new Subject();
  public addtoCartTriggered$ = this.addtoCartTriggered.asObservable();

  constructor(
    @Inject(forwardRef(() => TypeofPurchaseService)) private topService: TypeofPurchaseService,
    @Inject(forwardRef(() => PlansService)) private plansService: PlansService,
  ) {}

  publishUpdateStep(step) {
    this.updateStep.next(step);
  }

  publishUpdateStickyStep(step) {
    this.updateStickyStep.next(step);
  }
  publishLifestylePlans(lifestylePlans: boolean) {
    this.lifestylePlans.next(lifestylePlans);
  }

  publishDeactivateLifestyleAddons(deactivateLifestyleAddons: boolean) {
    this.deactivateLifestyleAddons.next(deactivateLifestyleAddons);
  }

  publishVoucherCode(voucher: any) {
    this.voucherCode.next(voucher);
  }
  publishVoucherOldCode(voucher: any) {
    this.voucherCodeOld.next(voucher);
  }

  publishOutOfStock(stock: string, stockResponse?: any) {
    const stockData = stockResponse ? stockResponse : null;
    this.outOfStock.next({ status: stock, data: stockData });
  }

  publishGuestName(guestName: any) {
    this.guestName.next(guestName);
  }

  setDisclaimerViewed(viewed: boolean) {
    this.disclaimerViewed.next(viewed);
  }

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  publishDevice(deviceToPublish: any) {
    this.sharedDevice.next(deviceToPublish);
  }

  publishColor(colorToPublish: string) {
    this.sharedColor.next(colorToPublish);
  }

  publishStorage(storageToPublish: string) {
    this.sharedStorage.next(storageToPublish);
  }

  publishColorStorageChange(change: boolean) {
    this.colorStorageChange.next(change);
  }

  publishCobpLoading(cobpLoading: boolean) {
    this.cobpLoading.next(cobpLoading);
  }

  publishUpfrontWaived(upfrontWaived: boolean) {
    this.upfrontWaived.next(upfrontWaived);
  }

  publishUpfrontWaivedSuccess (upfrontWaivedSuccess: boolean) {
    this.upfrontWaivedSuccess.next(upfrontWaivedSuccess);
  }

  publishUpfrontWaivedFailure (upfrontWaivedFailure: boolean) {
    this.upfrontWaivedFailure.next(upfrontWaivedFailure);
  }

  publishSelectProductSku(productSkuToPublish: string) {
    this.productSkuToPublish.next(productSkuToPublish);
  }

  publishPlan(planToPublish: string) {
    this.sharedPlan.next(planToPublish);
  }

  publishBbPlanSku(bbPlanSkuToPublish: string) {
    this.sharedBbPlanSku.next(bbPlanSkuToPublish);
  }

  publishPlanName(planNameToPublish: string) {
    this.sharedPlanName.next(planNameToPublish);
  }
  publishPassPlanStar(passPlanStarToPublish: any) {
    this.sharedPassPlanStar.next(passPlanStarToPublish);
  }
  publishBroadbandPlan(publishPlanName: string) {
    this.sharedPlanNameBroadband.next(publishPlanName);
  }

  publishSelectedPlanDetails(seletedPlanToPublish: any) {
    this.sharedPlanDetails.next(seletedPlanToPublish);
  }

  publishBbSelectedPlanDetails(bbSeletedPlanToPublish: any) {
    this.sharedBbPlanDetails.next(bbSeletedPlanToPublish);
  }

  publishDevicePrice(devicePriceToPublish: number) {
    devicePriceToPublish = devicePriceToPublish ? devicePriceToPublish : 0;
    this.sharedDevicePrice.next(devicePriceToPublish);
  }

  publishRrPPrice(rrpPriceToPublish: number) {
    rrpPriceToPublish = rrpPriceToPublish ? rrpPriceToPublish : 0;
    this.sharedRrpPrice.next(rrpPriceToPublish);
  }

  publishMonthlyPay(monthlyPayToPublish: number) {
    monthlyPayToPublish = monthlyPayToPublish ? monthlyPayToPublish : 0;
    this.sharedMonthlyPay.next(monthlyPayToPublish);
  }

  publishRRPRice(RRPriceToPublish: string) {
    this.sharedRRPrice.next(RRPriceToPublish);
  }

  publishOneTimePay(oneTimePayToPublish: number) {
    oneTimePayToPublish = oneTimePayToPublish ? oneTimePayToPublish : 0;
    this.sharedOneTimePay.next(oneTimePayToPublish);
  }

  publishTotalPay(totalPayToPublish: number) {
    this.sharedTotalPay.next(totalPayToPublish);
  }

  publishPhoneNo(PhoneNoToPublish: any) {
    this.sharedPhoneNo.next(PhoneNoToPublish);
    this.topService.selectMobileNumber(PhoneNoToPublish);
  }
  publishemailRetreivalValidation(emailRetreivalValidationPublish: string) {
    this.emailRetreivalValidation.next(emailRetreivalValidationPublish);
  }
  publishEditAddValidation() {
    this.editAddValidation.next('');
  }
  publishTypeOfSIM(typeOfSIMToPublish: string) {
    this.sharedTypeOfSIM.next(typeOfSIMToPublish);
  }

  publishEmailId(emailIdToPublish: string) {
    this.sharedEmailId.next(emailIdToPublish);
  }

  publishIsGoldenNo(goldenNo: boolean) {
    this.sharedGoldenNumber.next(goldenNo);
  }
  publishSelected(SelectedToPublish: boolean) {
    this.sharedSelection.next(SelectedToPublish);
  }

  publishBillingAddress(BillingToPublish: any) {
    this.sharedBillingAddress.next(BillingToPublish);
  }

  publishMaxLimit(MaxLimitToPublish: boolean) {
    this.maxLimitReached.next(MaxLimitToPublish);
  }

  publishBuyNoPlan(BuyNoPlan: boolean) {
    this.buyNoPlan.next(BuyNoPlan);
  }

  publishPassSelected(PassSelected: boolean) {
    this.passSelected.next(PassSelected);
  }

  publishUpsellProceed(UpsellProceed: boolean) {
    this.upsellProceed.next(UpsellProceed);
  }

  publishMnpEdited(MnpEdited: boolean) {
    this.mnpEdited.next(MnpEdited);
  }

  publishPlanChanged(PlanChanged: boolean) {
    this.planChanged.next(PlanChanged);
  }

  publishPreOrder(PreOrder: boolean) {
    this.isPreOrder.next(PreOrder);
  }

  publishMviva(isMviva: boolean) {
    this.isMviva.next(isMviva);
  }

  publishEasyPhone(EasyPhone: boolean) {
    this.isEasyPhone.next(EasyPhone);
  }

  publishRentClicked(RentClicked: boolean) {
    this.isRentClicked.next(RentClicked);
    if (RentClicked) {
      this.plansService.selectDeviceBundleSubtype('rent');
    }
  }

  publishOwnClicked(OwnClicked: boolean) {
    this.isOwnClicked.next(OwnClicked);
    if (OwnClicked) {
      this.plansService.selectDeviceBundleSubtype('own');
    }
  }

  publishBundleClicked(BundleClicked: boolean) {
    this.isBundleClicked.next(BundleClicked);
  }

  publishEasyPhoneTabsClicked (TabsClicked: any) {
    this.onEasyTabsClicked.next(TabsClicked);
  }

  publishDeviceUpfront(DeviceUpfront: any) {
    this.deviceUpfront.next(DeviceUpfront);
  }

  publishPlanUpfront(PlanUpfront: any) {
    this.planUpfront.next(PlanUpfront);
  }

  publishPreOrderEnded(PreOrderEnded: boolean) {
    this.preOrderEnded.next(PreOrderEnded);
  }

  publishPreOrderData(DevicePreOrderData: any) {
    this.preOrderData.next(DevicePreOrderData);
  }

  publishEasyPhoneRentData(EasyPhoneRentData: any) {
    this.easyPhoneRentData.next(EasyPhoneRentData);
  }

  publishEasyPhoneOwnData(EasyPhoneOwnData: any) {
    this.easyPhoneOwnData.next(EasyPhoneOwnData);
  }

  publishEasyPhoneBundleData(EasyPhoneBundleData: any) {
    this.easyPhoneBundleData.next(EasyPhoneBundleData);
  }

  publishEasyPhoneUpfrontData(EasyPhoneUpfrontData: any) {
    this.easyPhoneUpfrontData.next(EasyPhoneUpfrontData);
  }

  publishRentPrice(RentPrice: any) {
    this.rentPrice.next(RentPrice);
  }

  publishOwnPrice(OwnPrice: any) {
    this.ownPrice.next(OwnPrice);
  }

  publishRentMonthlyPay(RentMonthlyPay: any) {
    this.rentMonthlyPay.next(RentMonthlyPay);
  }

  publishOwnMonthlyPay(OwnMonthlyPay: any) {
    this.ownMonthlyPay.next(OwnMonthlyPay);
  }

  publishBundlePrice(BundlePrice: any) {
    this.bundlePrice.next(BundlePrice);
  }

  publishBundleUpfrontPrice(BundleUpfrontPrice: any) {
    this.bundleUpfrontPrice.next(BundleUpfrontPrice);
  }

  publishUpfrontInstallment(BundleUpfrontInstallment: any) {
    this.bundleUpfrontInstallment.next(BundleUpfrontInstallment);
  }

  publishUpfrontInstallmentForMoon(BundleUpfrontInstallmentForMoon: any) {
    this.bundleUpfrontInstallmentForMoon.next(BundleUpfrontInstallmentForMoon);
  }

  publishTelcoDayRebate(TelcoDayRebate: any) {
    this.telcoDayRebate.next(TelcoDayRebate);
  }

  publishEligibleRebate(EligibleRebate: boolean) {
    this.eligibleRebate.next(EligibleRebate);
  }

  publishEligibility(EligibilityToPublish: any) {
    this.sharedEligibility.next(EligibilityToPublish);
  }

  publishEligibilityPopup(PopupToPublish: boolean) {
    this.isDisplayPlanEligibilityPopup.next(PopupToPublish);
  }

  publishNumberType(NumberTypeToPublish: string) {
    this.sharedNumberType.next(NumberTypeToPublish);
  }

  publishImageList(ImageListToPublish: object) {
    this.sharedImageList.next(ImageListToPublish);
  }

  publishBasePlanMoon(BasePlanMoon: any) {
    this.basePlanMoon.next(BasePlanMoon);
  }

  publishSelectedAddonPassDetails(selectedAddonPassDetails: any) {
    this.selectedAddonPassDetails.next(selectedAddonPassDetails);
  }

  publishEditColor(isSelectColor: any) {
    this.sharedEditColor.next(isSelectColor);
  }

  publishEligiblePlanArray(eligiblePlanArray: any) {
    this.eligiblePlanList.next(eligiblePlanArray);
  }

  publishEligibleRentPlanArray(eligibleRentPlanArray: any) {
    this.eligibleRentPlanArray.next(eligibleRentPlanArray);
  }

  publishEligibleOwnPlanArray(eligibleOwnPlanList: any) {
    this.eligibleOwnPlanList.next(eligibleOwnPlanList);
  }

  publishNotification(NotificationToPublish: any) {
    this.sharedNotification.next(NotificationToPublish);
  }

  publishNotificationError(NotificationErrorToPublish: any) {
    this.sharedNotificationError.next(NotificationErrorToPublish);
  }

  publishOrderNO(OrderNoToPublish: string) {
    this.sharedOrderNumber.next(OrderNoToPublish);
  }
  /* Added for enabling and disabling of the success errors and info popup's at the bottom */
  publishErrorNotificationBoolean(NotificationErrorBooleanToPublish: boolean) {
    this.sharedErrorNotificationBoolean.next(NotificationErrorBooleanToPublish);
  }

  publishBarNotificationBoolean(NotificationBarBooleanToPublish: boolean) {
    this.sharedBarNotificationBoolean.next(NotificationBarBooleanToPublish);
  }

  publishSharedContract(contractTerm: any) {
    this.sharedContract.next(contractTerm);
  }

  publishIsBlacklist(blacklisted: boolean) {
    this.sharedBlacklist.next(blacklisted);
  }

  publishContractExtended(contractTerm: any) {
    this.sharedContractExtended.next(contractTerm);
  }

  publishBroadbandContract(publishContractTerm: string) {
    this.sharedBroadbandContract.next(publishContractTerm);
  }

  publishPageLoaderBoolean(PageLoaderBooleanToPublish: boolean) {
    this.sharedPageLoader.next(PageLoaderBooleanToPublish);
  }

  publishEditBilling(EditBilling: boolean) {
    this.editBilling.next(EditBilling);
  }

  publishImage(ImageToPublish: string) {
    this.sharedImage.next(ImageToPublish);
  }

  publishDeliveryType(deliveryTypeToPublish: string) {
    this.sharedDeliveryType.next(deliveryTypeToPublish);
  }

  publishDisclaimerAgree(DisclaimerToPublish: boolean) {
    this.sharedDisclaimerAgree.next(DisclaimerToPublish);
  }
  publishSupplimentaryLines(SuppLinesToPublish: any) {
    this.sharedSupplimentaryLines.next(SuppLinesToPublish);
    this.topService.selectSupplementaryLines(SuppLinesToPublish);
  }

  publishPrincipalLine(PrincipalLine: boolean) {
    this.selectedPrincipalLine.next(PrincipalLine);
  }
  publishAddToCartEnabling(EnableAddToCart: boolean) {
    this.enableAddToCart.next(EnableAddToCart);
  }
  publishEnablingProceed(EnableProceed: boolean) {
    this.enableProceed.next(EnableProceed);
  }
  publishExtraSuppLinesAddedByUser(ExtraSuppLinesAddedByUser: number) {
    this.sharedextraSuppLinesAddedByUser.next(ExtraSuppLinesAddedByUser);
  }
  publishPurchaseTypeTab(PurchaseTypeTab: string) {
    this.sharedPurchaseTypeTab.next(PurchaseTypeTab);
  }
  publishDevicePagePurchaseTypeTab(DevicePagePurchaseTypeTab: string) {
    this.sharedDevicePagePurachaseTypeTab.next(DevicePagePurchaseTypeTab);
  }
  publishTabSelected(TabSelected: boolean) {
    this.sharedTabSelected.next(TabSelected);
  }
  publishDeviceEasyPhoneEligible(DeviceEasyPhoneEligible: boolean) {
    this.sharedDeviceEasyPhoneEligible.next(DeviceEasyPhoneEligible);
  }
  publishEditCartEasyPhone(EditCartEasyPhone: boolean) {
    this.sharedEditCartEasyPhone.next(EditCartEasyPhone);
  }
  publishNumberReservationId(NumberReservationId: string) {
    this.sharedNumberReservationId.next(NumberReservationId);
  }
  publishHwValidatedId(HwValidatedId: string) {
    this.sharedHwValidatedId.next(HwValidatedId);
  }
  publishLineChosen(LineChosen: boolean) {
    this.sharedLineChosen.next(LineChosen);
  }
  publishAddToCartDisabling(disableAddToCart: boolean) {
    this.disableAddToCart.next(disableAddToCart);
  }
  publishEsimEligible(esimEligible: boolean) {
    this.esimEligible.next(esimEligible);
  }
  publishSupplinesLinesPrice(SuppLinesPrice: any) {
    this.sharedSuppLinesPrice.next(SuppLinesPrice);
  }
  publishDisableNewLineCobpSTen(enableDisbale: any) {
    this.sharedDisableNewLineCobpSTen.next(enableDisbale);
  }
  publishDisableSuppLineForSamsungGN(enableDisbale: any) {
    this.sharedDisableSuppLineForSamsungGN.next(enableDisbale);
  }
  publishIsKardashianPlan(isKardashianPlan: any) {
    this.sharedIsKardashianPlan.next(isKardashianPlan);
  }
  publishSaleablePlanArray(saleablePlanArray: any) {
    this.sharedSaleablePlanArray.next(saleablePlanArray);
  }
  publishMoonSelectedProductDetails(selectedProductDetails: any) {
    this.sharedMoonSelectedProductDetails.next(selectedProductDetails);
  }
  publishMoonColorMemoryInfo(colorMemoryInfo: any) {
    this.sharedMoonColorMemoryInfo.next(colorMemoryInfo);
  }
  publishStockInfoToCart(stockInfo: boolean) {
    this.sharedStockInfoToCart.next(stockInfo);
  }
  publishBillingType(billType: number) {
    this.sharedBillingType.next(billType);
  }
  publishMandatoryAutoBilling(AutoBilling) {
    this.sharedAutoBilling.next(AutoBilling);
  }
  publishRunAutoBillingCheck() {
    this.runAutoBillingCheck.next();
  }
  publishShareBroadbandAutoBilling(AutoBilling) {
    this.sharedBroadbandAutoBilling.next(AutoBilling);
  }
  publishdeviceUpfrontPenalty(deviceUpfrontPenalty: any) {
    this.sharedDeviceUpfrontPenalty.next(deviceUpfrontPenalty);
  }
  publishCancelForm(isCancel: any) {
    this.cancelEditForm.next(isCancel);
  }
  publishLoggerInUserName(loggedInUserName: string) {
   this.sharedLoggedInUserName.next(loggedInUserName);
   this.topService.triggerReupdate();
  }
  publishMCTnCPopUpStyle(MCTnCPopUpStyle: string) {
    this.sharedMCTnCPopUpStyle.next(MCTnCPopUpStyle);
  }
  publishExcessLinesAdded(isExcessLinesAdded: boolean) {
    this.sharedIsExcessLinesAdded.next(isExcessLinesAdded);
  }
  publishEnableReset(enableReset: boolean) {
    this.sharedIsenableReset.next(enableReset);
  }
  publishBasePlanStar(plan: iBasePlan) {
    this.basePlanStar.next(plan);
  }
  publishInternetSharingOption(isInternetSharing: boolean) {
    this.sharedInternetSharingOption.next(isInternetSharing);
  }
  publishGBPassSelection(isGBPassSelected: boolean) {
    this.sharedIsGBPassSelected.next(isGBPassSelected);
  }
  publishPageNotFound(isPageNotFound: boolean) {
    this.sharedIsPageNotFound.next(isPageNotFound);
  }

  triggerAddToCart() {
    this.addtoCartTriggered.next();
  }
}
