import { Injectable } from '@angular/core';
import { DeviceDataService } from './devicedata.service';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from 'rxjs';

@Injectable()
export class BroadbandService {
  private subscriber: Subscription;
  public isCSAgentDealer;
  isCustomer = false;
  constructor(
    private _deviceDataService: DeviceDataService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    } else {
      this.isCSAgentDealer = false;
    }
    this.setAgentLoggedIn();
    this.subscriber = this._deviceDataService.sharedLoggedInUserName$.subscribe(
      data => {
        if (data) {
          this.setAgentLoggedIn();
        }
      });
  }
  setAgentLoggedIn() {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("UserToken"))) {
      this.isCustomer = true;
    }
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    } else {
      this.isCSAgentDealer = false;
    }
  }
  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  getPos(ele) {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const step4 = document.getElementById("step4");
    if (step1 != null && step2 != null && typeof window !== 'undefined' && step4 != null) {
      if (ele === 2 && screen.width > 767) {
        const step2ExtraOffset = window.location.href.indexOf('broadband') !== -1 ? 40 : 0;
        return step1.offsetHeight + step2ExtraOffset;
      } else if (ele === 3 && screen.width > 767) {
        const step3ExtraOffset = step2.offsetHeight + 480;
        return step1.offsetHeight + step3ExtraOffset;
      } else if (ele === 4 && step3 != null && step4.offsetTop < 1600 && screen.width > 767) {
        return step4.offsetTop - 150;
      } else if (ele === 4 && step3 != null && screen.width > 767) {
        const step4ExtraOffset = step3.offsetHeight + 202;
        return step1.offsetHeight + step4ExtraOffset;
      } else if (ele === 2 && screen.width <= 767) {
        const step2ExtraOffset = 0;
        return step1.offsetHeight + step2ExtraOffset;
      } else if (ele === 3 && screen.width <= 767) {
        const step3ExtraOffset = window.location.href.indexOf('broadband') !== -1 ?
          step2.offsetHeight : step2.offsetHeight + 130;
        return step1.offsetHeight + step3ExtraOffset;
      } else if (ele === 4 && step3 != null && screen.width <= 767) {
        return step4.offsetTop - 120;
      } else if (ele === 4 && step3 == null) {
        return step1.offsetHeight + step2.offsetHeight;
      }
    } else if (step1 != null) {
      if (ele === 2) {
        return step1.offsetHeight - 400;
      } else if (ele === 3) {
        return step1.offsetHeight - 300;
      } else if (ele === 4) {
        return step1.offsetHeight - 200;
      }
    } else if (step2 != null) {
      if (ele === 3) {
        return step2.offsetHeight + 210;
      } else if (ele === 4 && step3 != null) {
        return step2.offsetHeight + step3.offsetHeight;
      }
    }
  }

  public onScroll() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      window.onscroll = () => {
        const eleId = document.getElementById('sticky-cart');
        const eleId1 = document.getElementById('step1');
        const eleId2 = document.getElementById('step2');
        const eleId4 = document.getElementById('step4');
        const eleIdToaster = document.getElementById('b-notification');
        if (eleId != null && eleId1 != null && eleId2 != null && eleId4 != null) {
          const stickyTop = eleId4.offsetTop;
          if (window.pageYOffset >= (stickyTop - 400)) {
            if (this.isCSAgentDealer  && this.isCustomer) {
              eleId.classList.add('sticky', 'csagent', 'customer');
            } else if (this.isCSAgentDealer ) {
              eleId.classList.add('sticky', 'csagent');
            } else {
              eleId.classList.add('sticky');
            }
            if (eleIdToaster != null) {
              eleIdToaster.classList.remove('has-margin');
            }
          } else {
            if (this.isCSAgentDealer && this.isCustomer) {
              eleId.classList.remove('sticky', 'csagent', 'customer');
            } else if (this.isCSAgentDealer) {
              eleId.classList.remove('sticky', 'csagent');
            } else {
              eleId.classList.remove('sticky');
            }
            if (eleIdToaster != null) {
              eleIdToaster.classList.add('has-margin');
            }
          }
        }
      };
    }
  }

  public publicDataforPlan(selectedPlanDetails, planSku, planName, planMothlyPay) {
    this._deviceDataService.publishBbSelectedPlanDetails(selectedPlanDetails);
    this._deviceDataService.publishBbPlanSku(planSku);
    this._deviceDataService.publishBroadbandPlan(planName);
    this._deviceDataService.publishMonthlyPay(planMothlyPay);

    if (selectedPlanDetails && selectedPlanDetails != null && selectedPlanDetails.terms_and_condition &&
      selectedPlanDetails.terms_and_condition.contract_terms && selectedPlanDetails.terms_and_condition.contract_terms.desc) {
      const contractTerms = selectedPlanDetails.terms_and_condition.contract_terms.desc;
      this._deviceDataService.publishBroadbandContract(contractTerms);
    }
  }

  public preserveHomeWirelessEditData(cartItem) {
    const homeWirelessData = {
      selectionType: "edit",
      color: cartItem.selectedProduct.orderSummaryColor,
      plan: cartItem.selectedProduct.selectedPlanDetails,
      newReg: cartItem.selectedProduct.orderPhoneNo,
      deviceSku: cartItem.sku_bundle,
      numberReservationId: cartItem.reservation_id
    };
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("homeWirelessData", JSON.stringify(homeWirelessData));
    }
    if (typeof window !== "undefined" && localStorage) {
      localStorage.setItem("homeWirelessEditData", JSON.stringify(homeWirelessData));
    }
    this._router.navigateByUrl("/broadband/" + cartItem.sku_bundle);
  }
}
