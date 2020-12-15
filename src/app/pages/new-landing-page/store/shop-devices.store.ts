import { Injectable } from '@angular/core';
import {
  DevicesState,
  IDevice,
  TGetFilteredDevices,
  TSetDefaultTab,
  TSetResponseData,
  TUpdateTab,
  TGetFilteredPlans,
  IShopDevicesTab,
  TGetFilteredBrands
} from './shop-device.model';
import { EntityStore, StoreConfig } from '@datorama/akita';
import { queryEntries as landingPageQE } from 'app/shared/constants/new-landing-page.constants';

export const shopDevicesItemsPerPage = 6;

const initialStore: Partial<DevicesState> = {
  featureTabs: [],
  brands: [],
  plans: [],
  filteredDevices: [],
  currentPage: 1,
  filteredPlans: []
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'shopDevices' })
export class ShopDevicesStore extends EntityStore<DevicesState, IDevice> {
  constructor() {
    super(initialStore);
  }


  setResponseData: TSetResponseData = (response, route) => {
    const tabSortFn = (a, b) => Number(a.priority) - Number(b.priority);
    const brands = [ ...response.tabs ].sort(tabSortFn);
    const plans = [ ...response.plans ].sort(tabSortFn);
    const featureTabs = response.featureTabs ? [...response.featureTabs].sort(tabSortFn) : [];
    const { selectedFeatureTab, selectedBrand, selectedPlan } = this.setDefaultTabs(featureTabs, brands, plans, route);
    const filteredDevices = this.getFilteredDevices(
      selectedBrand, selectedPlan, response.items
    );

    const filteredPlans = this.getFilteredPlans(
      selectedBrand, plans
    );
    const filteredBrands = this.getFilteredBrands(selectedFeatureTab, brands);

    this.update({
      featureTabs,
      selectedFeatureTab,
      brands,
      plans,
      filteredDevices,
      selectedBrand,
      selectedPlan,
      filteredPlans,
      filteredBrands
    });

    this.set(response.items);
  }

  updateTab: TUpdateTab = (params) => {
    this.update(prevState => {
      const selectedFeatureTab =
      prevState.selectedFeatureTab !== params[landingPageQE.FEATURE_TAB] &&
      !!params[landingPageQE.FEATURE_TAB]
        ? params[landingPageQE.FEATURE_TAB]
        : prevState.selectedFeatureTab;

    let filteredBrands = this.getFilteredBrands(
      selectedFeatureTab,
      prevState.brands
    );
    let selectedBrand =
        prevState.selectedBrand !== params[landingPageQE.BRAND] &&
          !!params[landingPageQE.BRAND]
          ? params[landingPageQE.BRAND] : prevState.selectedBrand;

      if(selectedFeatureTab !== prevState.selectedFeatureTab){
            selectedBrand = filteredBrands?.[0]?.key;
      }

      let selectedPlan;
       
      let filteredPlans = this.getFilteredPlans(
        selectedBrand, prevState.plans
      );
      if (params[landingPageQE.BRAND] === prevState.selectedBrand) {
        selectedPlan = prevState.selectedBrand !== params[landingPageQE.PLAN_TAB] &&
          !!params[landingPageQE.PLAN_TAB]
          ? params[landingPageQE.PLAN_TAB] : prevState.selectedPlan;
      } else {
        if (selectedBrand !== prevState.selectedBrand) {
          selectedPlan = filteredPlans?.[0]?.key;
        } else {
          selectedPlan = filteredPlans.findIndex(x => x.key === params[landingPageQE.PLAN_TAB]) > -1 ? params[landingPageQE.PLAN_TAB] : filteredPlans[0].key;
        }
      }

      // ? Return void, if there's no changes in the query params
      if (
        prevState.selectedFeatureTab === selectedFeatureTab &&
        prevState.selectedBrand === selectedBrand &&
        prevState.selectedPlan === selectedPlan
      ) {
        return;
      }
      

      const filteredDevices = this.getFilteredDevices(
        selectedBrand, selectedPlan, Object.values(prevState.entities)
      );


      return {
        selectedFeatureTab,
        selectedBrand,
        selectedPlan,
        filteredDevices,
        currentPage: 1, // ? Resetting Pagination
        filteredPlans,
        filteredBrands
      };
    });
  }

  setDefaultTabs: TSetDefaultTab = (featureTabs, brands, plans, route) => {
    let {
      [landingPageQE.FEATURE_TAB]: selectedFeatureTab,
      [landingPageQE.BRAND]: selectedBrand,
      [landingPageQE.PLAN_TAB]: selectedPlan
    } = route.snapshot.queryParams;

    
    // ? Checking whether query params exist and valid or not
    selectedFeatureTab = selectedFeatureTab ?? featureTabs[0]?.key;
    const filteredBrands = this.getFilteredBrands(selectedFeatureTab, brands);
    selectedBrand =  filteredBrands.find(x => x.key === selectedBrand) ? selectedBrand : filteredBrands[0]?.key; 
    const filteredPlans = this.getFilteredPlans(selectedBrand, plans);
    selectedPlan = filteredPlans?.findIndex(x => x.key === selectedPlan) > -1 ? selectedPlan : filteredPlans[0]?.key;

    return {
      selectedFeatureTab,
      selectedBrand,
      selectedPlan
    };
  }

  getFilteredDevices: TGetFilteredDevices =
    (selectedBrand, selectedPlan, allDevices) =>
      selectedBrand
        ? allDevices
          .filter(device =>
            device.categories.map((x) => x.key).includes(selectedBrand) &&
            device.plan_tab.includes(selectedPlan)
          ).sort((a, b) => {
            const aPriority = a.categories.find((x) => x.key === selectedBrand)
              .priority;
            const bPriority = b.categories.find((x) => x.key === selectedBrand)
              .priority;

            return Number(aPriority) - Number(bPriority);
          })
        : []

  getFilteredPlans: TGetFilteredPlans =
    (selectedBrand, allPlans) => {
      let filteredPlans: IShopDevicesTab[];
      if (selectedBrand) {
        filteredPlans = allPlans.filter((plan) => {
            if (plan?.tabKey.indexOf(selectedBrand) > -1) {
              return plan;
            }
        });
      }
      return filteredPlans;
    }

  getFilteredBrands: TGetFilteredBrands = (selectedFeatureTab, allTabs) => {
      return allTabs.filter(tab => tab.featurekey === selectedFeatureTab);
    };
}
