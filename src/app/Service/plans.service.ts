import { Injectable, Injector } from '@angular/core';
import { PlansStore } from '../Widget/side-summary/side-summary-container/plans.store';
import { action } from '@datorama/akita';
import { TypeofPurchaseStore } from '../Widget/side-summary/side-summary-container/type-of-purchase.store';
import { deviceBundleTypeEnum, iDeviceResponse } from '../shared/models/device.model';
import { iPlanMega } from 'app/shared/models/plan.model';
import { TypeofPurchaseService } from './type-of-purchase.service';

@Injectable({
    providedIn: 'root'
})
export class PlansService {
    lastButtonState = null;

    constructor(
        private plansStore: PlansStore,
        private injector: Injector,
    ) {}

    get plansState() {
        return this.plansStore.getValue();
    }

    setLoading(loading) {
        const topStore = this.injector.get(TypeofPurchaseStore);
        this.plansStore.setLoading(loading);
        topStore.setLoading(loading);
    }

    selectBasePlan(base_plan) {
        const topStore = this.injector.get(TypeofPurchaseStore);
        try{
            topStore.update({
                autobilling: base_plan.bill_type
            });
        }catch(_err){

        }
        this.plansStore.update({
            base_plan
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try{
            topService.selectTypeofPurchase(null);
        }catch(_err){

        }
    }

    selectPass(pass) {
        this.plansStore.update({
            pass
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try{
            topService.selectTypeofPurchase(null);
        }catch(_err){

        }
    }

    selectPlan(plan) {
        this.plansStore.update({
            plan
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try{
            topService.selectTypeofPurchase(null);
        }catch(_err){

        }
    }

    selectLifeStyleVoucher(lifestyle_voucher) {
        this.plansStore.update({
            lifestyle_voucher
        });

    }

    @action('Select Device')
    selectDevice(device) {
        this.plansStore.update({
            device
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try{
            topService.selectTypeofPurchase(null);
        }catch(_err){

        }
    }

    @action('Select DeviceCombo')
    selectDeviceCombo(device_combo) {
        this.plansStore.update({
            device_combo
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try {
            topService.selectTypeofPurchase(null);
        } catch (_err) {

        }
    }

    @action('Select Device Bundle')
    selectDeviceBundle(device_bundle) {
        this.plansStore.update({
            device_bundle
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try{
            topService.selectTypeofPurchase(null);
        }catch(_err){

        }
    }

    @action('Select Device Bundle Combo')
    selectDeviceBundleCombo(device_bundle_combo) {
        this.plansStore.update({
            device_bundle_combo
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try{
            topService.selectTypeofPurchase(null);
        }catch(_err){

        }
    }

    selectDeviceBundleType(type) {
        this.plansStore.update({
            device_bundle_type: deviceBundleTypeEnum[type] || null,
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try{
            topService.selectTypeofPurchase(null);
        }catch(_err){

        }
    }

    selectDeviceBundleSubtype(device_bundle_subtype) {
        this.plansStore.update({
            device_bundle_subtype
        });
        const topService = this.injector.get(TypeofPurchaseService);
        try{
            topService.selectTypeofPurchase(null);
        }catch(_err){

        }
    }

    @action('Update addToCartButton')
    updateAddtocartButton(checkout_button_enabled) {
        // if (this.lastButtonState === checkout_button_enabled) return;
        // this.lastButtonState = checkout_button_enabled;
        // this.plansStore.update({
        //     checkout_button_enabled
        // })
    }

    @action('Update stock')
    updateDeviceStock(sku, response) {
        this.plansStore.update({
            device_stock: {sku, response}
        })
    }

    @action('Update device combo stock')
    updateDeviceComboStock(sku, response) {
        this.plansStore.update({
            device_combo_stock: {sku, response}
        })
    }

    @action('Add to cart error')
    updateAddtocartError(error) {
        this.plansStore.update({
            addtocart_error: error,
        });
    }

    @action('MVIVA')
    updateMVIVA(mviva_campaign) {
        this.plansStore.update({
            mviva_campaign
        });
    }
    
    @action('Campaign Omni')
    updateOmniCampaign(omni_campaign) {
        this.plansStore.update({
            omni_campaign
        });
    }

    @action('eSIM')
    updateESIMEligibile(esim_eligibility) {
        this.plansStore.update({
            esim_eligibility
        });
    }

    @action('isBroadband')
    updateIsBroadband(isBroadband) {
        this.plansStore.update({
            isBroadband
        });
    }

    @action('isStar')
    updateIsStar(isStar) {
        this.plansStore.update({
            isStar
        });
    }

    @action('isMoon')
    updateIsMoon(isMoon) {
        this.plansStore.update({
            isMoon
        });
    }

    @action('Select contract')
    selectContract(easyphone_selected_contract_period) {
        this.plansStore.update({
            easyphone_selected_contract_period
        });
    }

    @action('Select contract')
    selectDeviceBundleContract(device_bundle_selected_contract_period) {
        this.plansStore.update({
          device_bundle_selected_contract_period
        });
    }

    @action('isPrepaid')
    updateIsPrepaid(isPrepaid) {
        this.plansStore.update({
            isPrepaid
        });
    }

    @action('isFamilyPlan')
    updateIsFamilyPlan(isFamilyPlan) {
        this.plansStore.update({
            isFamilyPlan
        });
    }

    @action('isFirstBluePlan')
    updateIsFirstBluePlan(isFirstBluePlan) {
        this.plansStore.update({
          isFirstBluePlan
        });
    }

    @action('API Response')
    updateAPIResponse(api_response: any) {
        this.plansStore.update({
            api_response
        });
    }

    @action('Update No Upfront Payment')
    updateNoUpfrontPayment(upfront_payment_waived) {
        this.plansStore.update({
            upfront_payment_waived
        });
    }

    @action('Select InternetPass Item') 
    selectInternetPassItem(internet_pass_item) {
        this.plansStore.update({
            internet_pass_item
        });
    }

    @action('Select InternetPass Type') 
    selectInternetPasstype(internet_pass_type) {
        this.plansStore.update({
            internet_pass_type
        });
    }

    @action('Select Prepaid Credit Reload') 
    selectPrepaidCreditReload(prepaid_credit_reload) {
        this.plansStore.update({
            prepaid_credit_reload
        });
    }

}
