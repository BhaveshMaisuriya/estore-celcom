import { Injectable } from '@angular/core';
import { TypeofPurchaseStore, typeOfPurchaseEnum } from '../Widget/side-summary/side-summary-container/type-of-purchase.store';
import { PlansStore, PlansQuery, PlansState } from '../Widget/side-summary/side-summary-container/plans.store';
import { action, snapshotManager } from '@datorama/akita';
import { isNullOrUndefined } from '../shared//utilities/helper.ultility';

@Injectable({
    providedIn: 'root'
})
export class TypeofPurchaseService {

    constructor(
        private topStore: TypeofPurchaseStore,
        private plansStore: PlansStore,
    ) {
    }

    get plansState() {
        return this.plansStore.getValue();
    }

    get topState() {
        return this.topStore.getValue();
    }

    resetToPData() {
        this.topStore.update({
            new_line_completed: false,
            supplementary_lines: [],
            share_quota: false,
            mnp_response: null,
            disclaimer_agreed: false,
            device_combo_number: null,
        });
    }

    @action('Update Type of Purchase')
    selectTypeofPurchase(type) {
        this.topStore.update({
            type: typeOfPurchaseEnum[type] || null,
            mobile_number: null,
            new_line_completed: false,
            supplementary_lines: [],
            share_quota: false,
            mnp_response: null,
            disclaimer_agreed: false,
        });
        this.resetToPData();
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Update Mobile Number')
    selectMobileNumber(mobile_number) {
        this.topStore.update({
            mobile_number: mobile_number,
        });
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });

        if (mobile_number === null) {
            this.resetToPData();
        }
    }

    @action('Update Mobile Number for Combo')
    selectDeviceComboNumber(device_combo_number) {
        this.topStore.update({
            device_combo_number,
        });
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Update Supplementary Lines')
    selectSupplementaryLines(supplementary_lines) {
        if (!(supplementary_lines instanceof Array)) {
            supplementary_lines = [];
        }
        try {
            const current_number = this.topState.device_combo_number;
            const numberExist = supplementary_lines.find(s => s?.number === current_number);
            if (current_number && !numberExist) {
                this.topStore.update({
                    device_combo_number: null,
                });
            }
        } catch (_error) {
            
        }
        try {
            const existing_number = this.topState.supplementary_lines;
            const isDeviceCombo = !!this.plansState.device_combo;
            if (isDeviceCombo) {
                if (existing_number?.length === 0
                    && supplementary_lines.length > 0
                    && !this.topState.device_combo_number) {
                    this.topStore.update({
                        device_combo_number: supplementary_lines[0]?.number,
                    });
                }
            }
        } catch (_error) {
            
        }
        this.topStore.update({
            supplementary_lines,
        });
        this.plansStore.update({
            supplementary_lines_count: supplementary_lines.length
        });
    }

    @action('Update COBP Response')
    updateCOBPResponse(response) {
        this.topStore.update({
            cobp_response: response,
            disclaimer_agreed: response ? +response[0].penaltyCheck?.device_upfront_penalty === 0 : true
        });
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Update MNP Response')
    updateMNPResponse(response) {
        this.topStore.update({
            mnp_response: response
        });
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Update COBP Response')
    updateAutobilling(response) {
        try {
            this.topStore.update({
                autobilling: response[0]['bill_type'],
            });
            this.plansStore.update({
                triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
            });
        } catch (_error) {

        }
    }

    @action('Share quota')
    updateShareQuota(share_quota) {
        this.topStore.update({
            share_quota
        });
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Broadband Eligibility')
    updateBroadbandEligibility(is_broadband_eligible) {
        this.topStore.update({
            is_broadband_eligible
        });
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Update Disclaimer')
    updateDisclaimer(disclaimer_agreed) {
        this.topStore.update({
            disclaimer_agreed
        });
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Trigger reupdate')
    updateNewLineCompleted(new_line_completed) {
        this.topStore.update({
            new_line_completed
        });
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Set Loading')
    setLoading(loading = false) {
        this.topStore.setLoading(loading);
    }

    @action('Trigger reupdate')
    triggerReupdate() {
        this.plansStore.update({
            triggerUpdate: (+this.plansState.triggerUpdate || 0) + 1,
        });
    }

    @action('Update eKYC Status')
    updateeKycStatus(eKycStatus: boolean) {
      this.topStore.update({ eKycStatus })
    }
}
