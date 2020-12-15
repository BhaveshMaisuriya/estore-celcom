import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import * as _ from "lodash";

import { CatalogueService } from "./catalogue.service";
import { CartService } from '../../../Service/cart.service';
import { CompareProductService } from '../../../Service/compareproduct.service';
import { BaseComponent } from '../../../base.component';
import { ContentNavigation } from '../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { environment } from 'environments/environment';
import { GetParametersService } from '../../../Service/getParamaters.service';
import { UserService } from '../../../Service/user.service';


@Component({
  selector: 'app-store-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css'],
  providers: [CatalogueService, RedirectionService, CartService, CompareProductService]
})

export class CatalogueComponent extends BaseComponent implements OnInit {
  @Output() updateCompareItems: EventEmitter<any> = new EventEmitter();
  public showClearFilter = false;
  public responseList: any;
  public filteredResponseList: any;
  public IsDisplayLoadMore = false;
  public loading: boolean;
  catalogueList = null;
  filterCategories = [];
  filteSelectedOptionsArray = [];
  maxLengthMobile = 3;
  plans = [];
  plansName = [];
  SelectedTab = "";
  listOfBundle = [];
  private removedProduct: any;
  public journeyNotifyPopup = false;
  // Compare product variables.
  public productsToCompare = null;
  public classActive = false;
  public compareAccordianAppear = false;
  public addMoreDeviceAccordian: any;
  private ROUTE_COMPARE_PRODUCT = "/store/plan/comparison";

  // Filter selection API URL.
  filterSelectionApiURL = "/rest/V1/devicelist/6";
  // Variable to track lifestyle param values.
  urlParamPromotiondetails: any = null;
  urlParamLifestyleValue: any = null;
  urlParamPlan: any = null;
  urlParamUtmSource: any = null;
  urlParamDeviceType: any = null;
  isLifestyleUrl = false;
  promotionUrl: any = "";
  isDisplayPromotionalLifeStyle = false;
  @Output() updateFilterResults: EventEmitter<any> = new EventEmitter();
  eStoreUrl: string = environment.eStoreUrl;
  
  constructor(private catalogueService: CatalogueService,
    private cartService: CartService,
    private compProductService: CompareProductService,
    private getParamsService: GetParametersService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _userService: UserService
    ) {
    super();
  }

  ngOnInit() {
    this.addMoreDeviceAccordian = this.compProductService.ProdCount();
    this.BindFilter();
    // Function call to reach the url paramaters of affiliate promotions.
    this.captureQueryParams();
    this.Init(this.filterSelectionApiURL);
    this.InitCompareProduct();
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem("SuppLinesAdded");
      if (localStorage.getItem('isMviva')) {
        localStorage.removeItem('isMviva');
      }
      if (localStorage.getItem("mvivaSummaryMessage")) {
        localStorage.removeItem("mvivaSummaryMessage");
      }
      if (localStorage.getItem("mvivaPlanUpfront")) {
        localStorage.removeItem("mvivaPlanUpfront");
      }
      if (localStorage.getItem("mvivaBundleUpfront")) {
        localStorage.removeItem("mvivaBundleUpfront");
      }
      if (localStorage.getItem("COBP_login_Check")) {
        localStorage.removeItem("COBP_login_Check");
      }
      if (localStorage.getItem("COBP_FLOW_CHECK")) {
        localStorage.removeItem("COBP_FLOW_CHECK");
      }
    }
  }

  Init(filterSelectionApiURL) {
    this.loading = true;
    filterSelectionApiURL = this._userService.updateApiUrl(filterSelectionApiURL);
    // let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
    this.catalogueService.Find(filterSelectionApiURL.trim()).subscribe((response: any) => {
      this.listOfBundle = response;
      this.plans = Array.from(new Set(response.map(data => {
        return {
          filter: data.base_plan,
          name: data.base_plan_title || ''
        };
      })));
      this.plansName = _.uniqBy(this.plans, 'filter');
      this.loading = false;
      this.responseList = response;
      this.lifestyleEligibilityCheck(this.responseList);
      this.isMobileLoadMore(response);
      this.updateProductsAddedToCompare();
      this.FilterByPlans(this.plansName[0].filter);
    },
      err => {
        if (err.status === 401) {
          this._router.navigate(['/home']);
        }
        this.loading = false;
      });

  }

  updateProductsAddedToCompare() {
    const prodListInCompare = this.compProductService.retrieveProduct();
    if (prodListInCompare) {
      this.catalogueList.forEach(item => {
        const prodInCompare = prodListInCompare.noOfProds.find((p) => p.sku === item.sku);
        if (prodInCompare) {
          item.isAddedToCompare = true;
        } else {
          item.isAddedToCompare = false;
        }
      });
    }
  }

  loadMore() {
    if(this.filteredResponseList && this.filteredResponseList !== undefined) {
      this.catalogueList = this.filteredResponseList;
    } else {
      this.catalogueList = this.responseList;
    }
    this.IsDisplayLoadMore = false;
  }

  addDeviceToCart(product: any) {
    this._router.navigateByUrl("/device-detail/" + product);
  }

  public ManageContentNavigation(data: any) {
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  private BindFilter() {
    let apiURL = '/rest/V1/filterOptions/5';
    apiURL = this._userService.updateApiUrl(apiURL);
    this.urlParamDeviceType = this.getParamsService.getParameterByName('type');
    this.catalogueService.Find(apiURL.trim()).subscribe((response: any) => {
      response.forEach((item: any) => {
        this.filterCategories.push({
          name: item.FilterLabel,
          options: item.FilterOption
        });
      });
      if(this.urlParamDeviceType === null) {
        this.unCheckIfClearFilter();
      }
      if (this.urlParamDeviceType) {
        this.selectFilterByOperatingSystem(this.urlParamDeviceType);
      }      
    });
  }

  // Collect all the checked options data.
  optionSelected(item: any) {
    // For Internet Explorer Only
    if (typeof navigator !== 'undefined') {
      if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        item = item.IsChecked;
      }
    }
    item.IsChecked = !item.IsChecked;
    const noOptionsSelected = this.GetSelectedFilter();
    this.showClearFilter = (noOptionsSelected.length > 0);
  }

  GetSelectedFilter() {
    this.filteSelectedOptionsArray = [];
    this.filterCategories.forEach(item => {
      item.options.forEach(itemInner => {
        if (itemInner.IsChecked === true) {
          this.filteSelectedOptionsArray.push({
            category: itemInner.searchparameter,
            value: itemInner.value
          });
        }
      });
    });

    return this.filteSelectedOptionsArray;
  }

  // Submit filter data.
  // Prepare API URl and send it to store-catalogue component.
  submitOptions() {
    this.filteSelectedOptionsArray.sort(function (a, b) {
      return (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0);
    });
    this.BindDevices();
  }

  // Sort by results.
  public sortResults(type: string) {
    let filterApi: any;
    if(type && type === "priceAsc") {
      this.catalogueList = this.catalogueList.sort((a,b) => a.price - b.price);
    } else if(type && type === "priceDesc") {
      this.catalogueList = this.catalogueList.sort((a,b) => b.price - a.price);
    } else if(type && type === "positionDesc") {
      this.catalogueList = this.catalogueList.sort((a,b) => b.position - a.position);
    } 
  }

  private BindDevices(type: any = "latest") {
    const filterOptions = this.GetSelectedFilter();
    const deviceListResponse = this.responseList;
    let filterOptionsGrouped = [];
    filterOptions.forEach((b) => {
      const itemIndex = filterOptionsGrouped.findIndex(it => it.category == b['category']);
      if (itemIndex > -1){
        filterOptionsGrouped[itemIndex]['value'].push(b['value']);
      } else {
        filterOptionsGrouped.push({
          'category': b['category'],
          'value': [ b['value'] ],
        })
      }
    });
    let filteredData = [...deviceListResponse];
    filterOptionsGrouped.forEach(item => {
      if (item.category && item.category !== "price_range") {
        filteredData = filteredData.filter(itemInner => item.value.includes(itemInner[item.category]));
      } else {
        let filterByPrice = [];
        item.value.forEach(price => {
          // let [min, max] = price.split('-').pipe(map((val, key) => {
          //   return (val + '').length > 0 ? +val : (key == 0 ? 0 : Infinity);
          // }));
          let [min, max] = price.split('-').map(data => data ? +data : Infinity);
          const phones = filteredData.filter(itemInner => {
            // console.log({min, max, itemInner});
            const ids = filterByPrice.map(d => d.id);
            return !ids.includes(itemInner.id) && +itemInner['price'] >= min && +itemInner['price'] <= max;
          });
          phones.forEach(phone => filterByPrice.push(phone));
        });
        filteredData = [...filterByPrice];
      }
    });
    this.filteredResponseList = filteredData;
    this.catalogueList = filteredData;
    this.isMobileLoadMore(this.filteredResponseList);
  }

  // Un select all the check boxes.
  unCheckIfClearFilter() {
    this.filterCategories.forEach(item => {
      item.options.forEach(itemInner => {
        itemInner.IsChecked = false;
      });
    });
  }

  //  Un select checbox and clear option string.
  clearFilterOptions(isPlan:boolean = false) {
    this.unCheckIfClearFilter();
    this.filteSelectedOptionsArray = [];
    if (!isPlan) this.Init(this.filterSelectionApiURL);
    this.showClearFilter = false;
  }

  // Tab toggle.
  mob_filterBy() {
    document.getElementById("filter_dropdown").classList.toggle("is-filter-show");
    document.getElementById("mob_filterBy").classList.toggle("is-filter-active");
  }
  desk_filterBy() {
    if (document.getElementById("sortBy_dropdown").classList.contains("is-filter-show")) {
      document.getElementById("sortBy_dropdown").classList.toggle("is-filter-show");
      document.getElementById("sortBy").classList.toggle("is-filter-active");
    }
    document.getElementById("filter_drop").classList.toggle("is-filter-show");
    document.getElementById("desk_filterBy").classList.toggle("is-filter-active");
  }
  sortBy() {
    document.getElementById("sortBy_dropdown").classList.toggle("is-filter-show");
    document.getElementById("sortBy").classList.toggle("is-filter-active");
    if (document.getElementById("filter_drop").classList.contains("is-filter-show")) {
      document.getElementById("filter_drop").classList.toggle("is-filter-show");
      document.getElementById("desk_filterBy").classList.toggle("is-filter-active");
    }
  }

  // compare product...

  InitCompareProduct() {
    this.HandlecompareAccordian();
    this.productsToCompare = this.compProductService.retrieveProduct();
  }
  removeCompareProduct(product: any) {
    this.compProductService.removeProductFromCompare(product);
    this.productsToCompare = this.compProductService.retrieveProduct();
    if (this.productsToCompare) {
      if (this.productsToCompare.noOfProds.length < 1) {
        this.classActive = false;
        this.HandlecompareAccordian();
      }
    }
    this.EnabelPlusOnRemoveFromCompare(product);
  }

  removeAllCompareProducts() {
    this.compProductService.removeAllProductFromCompare();
    this.productsToCompare = this.compProductService.retrieveProduct();
    this.classActive = false;
    this.HandlecompareAccordian();
    this.EnabelPlusOnRemoveFromCompareForAll();
  }
  compareCheck() {
    const productsToCompare = this.compProductService.retrieveProduct();
    if (productsToCompare && productsToCompare.noOfProds && productsToCompare.noOfProds.length === 1) {
      alert("Atleast add 2 devices for comparison");
    } else {
      this._router.navigateByUrl(this.ROUTE_COMPARE_PRODUCT);
    }
  }
  HandlecompareAccordian() {
    const productsToCompare = this.compProductService.retrieveProduct();
    if (productsToCompare && productsToCompare.noOfProds && productsToCompare.noOfProds.length > 0) {
      this.compareAccordianAppear = true;
    } else {
      this.compareAccordianAppear = false;
    }
  }
  accordianOpen(ev) {
    ev.preventDefault();
    this.classActive = !this.classActive;
  }

  addMoreDevice() {
    this.classActive = false;
  }

  addCompareItems(item: any) {
    this.compProductService.addProductToCompare(item);
    this.productsToCompare = this.compProductService.retrieveProduct();
    this.HandlecompareAccordian();
  }
  private EnabelPlusOnRemoveFromCompare(removedItem: any) {
    this.catalogueList.forEach((item: any) => {
      if (item.sku === removedItem.sku) {
        item.isAddedToCompare = false;
      }
    });
  }
  private EnabelPlusOnRemoveFromCompareForAll() {
    this.catalogueList.forEach((item: any) => {
      item.isAddedToCompare = false;
    });
  }
  onContinueDisplay(event) {
    this.isDisplayPromotionalLifeStyle = false;
  }
  lifestyleEligibilityCheck(deviceList) {
    let showNotEligiblePopup = false;
    // loop to check atleast one device has lifestyle enabled.
    for (let i = 0; i < deviceList.length; i++) {
      if (deviceList[i].is_lifestyle !== undefined && deviceList[i].is_lifestyle === 1) {
        showNotEligiblePopup = false;
        break;
      } else {
        showNotEligiblePopup = true;
      }
    }
    // Show popup when no lifestyle device and user comes with promotion details.
    this.isDisplayPromotionalLifeStyle = showNotEligiblePopup && this.isLifestyleUrl;
  }
  isMobileLoadMore(res) {
    // Only for mobile, Load more should be shown if the number of devices exceeds threshold limit.
    if (!this.isMobile() || res.length === 0 || res.length <= this.maxLengthMobile) {
      this.IsDisplayLoadMore = false;
      this.catalogueList = res;
    } else {
      this.IsDisplayLoadMore = true;
      this.catalogueList = res.slice(0, 3);
    }
  }
  captureQueryParams() {
    this.urlParamDeviceType = this.getParamsService.getParameterByName('type');
    if (this.urlParamDeviceType) {
       this.changeFilterUrlByOperatingSystem(this.urlParamDeviceType);
    }
    this.urlParamPromotiondetails = this.getParamsService.getParameterByName('promotiondetails');
    this.urlParamLifestyleValue = this.getParamsService.getParameterByName('LS');
    this.urlParamPlan = this.getParamsService.getParameterByName('plan');
    this.urlParamUtmSource = this.getParamsService.getParameterByName('utm_source');
    // Check if all lifestyle params set.
    if (this.urlParamPromotiondetails !== null &&
      this.urlParamLifestyleValue !== null &&
      this.urlParamPlan !== null &&
      this.urlParamUtmSource !== null
    ) {
      this.isLifestyleUrl = true;
      this.promotionUrl = "promotiondetails=" + this.urlParamPromotiondetails + "&LS=" + this.urlParamLifestyleValue;
      this.promotionUrl += "&plan=" + this.urlParamPlan + "&utm_source=" + this.urlParamUtmSource;
      this.filterSelectionApiURL += "?" + this.promotionUrl;
    }
  }
  selectFilterByOperatingSystem(operatingSystem) {
    _.pickBy(this.filterCategories, function(filterVal, filterkey) {
      if (filterVal.name === "Operating System") {
        _.pickBy(filterVal.options, function(optionsValue, optionsKey) {
            if (optionsValue.label.toLowerCase() === operatingSystem) {
               optionsValue.IsChecked = true;
            }
        });
      }
    });
  }
  changeFilterUrlByOperatingSystem(operatingSystem) { 
    this.filteSelectedOptionsArray = [];
    this.filterSelectionApiURL = this._userService.updateApiUrl(this.filterSelectionApiURL);
    // let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(navigator.userAgent);
    this.catalogueService.Find(this.filterSelectionApiURL.trim()).subscribe((response: any) => {
      this.loading = false;
      this.responseList = response;
      if(this.urlParamDeviceType !== null) {
        this.BindDevices();
      }
    },
      err => {
        this.loading = false;
      });
    if (operatingSystem === "ios" ) {
      this.submitOptions();
      // this.filteSelectedOptionsArray.push({
      //   category: "operating_system",
      //   value: "12"
      // });
      // this.responseList = this.responseList.filter(itemInner => this.filteSelectedOptionsArray[0].value.includes(itemInner["12"]));;
      // this.filterSelectionApiURL = "/rest/V1/filter/operating_system=12";
    } else if ( operatingSystem === "android") {
      this.submitOptions();
      // this.filteSelectedOptionsArray.push({
      //   category: "operating_system",
      //   value: "13"
      // });
      // this.responseList = this.responseList.filter(itemInner => this.filteSelectedOptionsArray[0].value === "13");
      // this.filterSelectionApiURL = "/rest/V1/filter/operating_system=13";
    }
  }
  
  queryParamGeneratorFromObject = (object) => {
    let str = [];
    for (var value in object) {
      if (object.hasOwnProperty(value) && value !== null && object[value] !== null) {
        str.push(encodeURIComponent(value) + "=" + encodeURIComponent(object[value]));
      }
    }
    return str.join("&");
  }

  RedirectUrlQueryParamsForDeviceDetail(device){
    let passParam = sessionStorage.getItem("starPassSelected");
    let typeParam = sessionStorage.getItem("starTypeSelected");

    const deviceOption = this.getParamsService.getParameterByName('deviceOption');
    let pass = this.getParamsService.getParameterByName('pass');
    let type = this.getParamsService.getParameterByName('type');
    const top = this.getParamsService.getParameterByName('top');

    sessionStorage.removeItem("starPassSelected");
    sessionStorage.removeItem("starTypeSelected");
    
    if(passParam !== null) {
     pass = passParam;
    }

    if(typeParam !== null) {
      type = typeParam;
    }

    let obj = {
      promotiondetails:this.urlParamPromotiondetails ? this.urlParamPromotiondetails : null,
      LS:this.urlParamLifestyleValue ? this.urlParamLifestyleValue : null,
      plan:this.urlParamPlan ? this.urlParamPlan : null,
      utm_source:this.urlParamUtmSource ? this.urlParamUtmSource : null,
      pass: pass ? pass : null,
      type: type ? type : null,
      deviceOption : deviceOption ? deviceOption : null,
      top: top ? top : null,
     };

     const queryString = this.queryParamGeneratorFromObject(obj);
     window.location.href = `device-detail/${device.sku}${queryString ? `?${queryString}` : ''}`;

    // window.location.href = `device-detail/${device.sku}?promotiondetails=${this.urlParamPromotiondetails}&LS=${this.urlParamLifestyleValue}
    // &plan=${this.urlParamPlan}&utm_source=${this.urlParamUtmSource}&pass=${passParam !== null ? passParam : pass}&type=${typeParam !== null ? typeParam : type}
    // &deviceOption=${deviceOption}&top=${top}`;

   /*this._router.navigate(['device-detail/'+device.sku],
   {
     queryParams:{
       promotiondetails:this.urlParamPromotiondetails,
       LS:this.urlParamLifestyleValue,
       plan:this.urlParamPlan,
       utm_source:this.urlParamUtmSource,
       pass:passParam !== null ? passParam : pass,//sessionStorage.getItem("passSelected"),
       type:typeParam !== null ? typeParam : type,//sessionStorage.getItem("typeSelected")
       deviceOption,
       top
      }
    });*/
  }
  
  FilterByPlans(plan) {
    this.SelectedTab = plan;
    this.clearFilterOptions(true);
    this.responseList = this.listOfBundle.filter(data => data.base_plan === plan || data.default_plan === "Celcom InternetGO");
    this.catalogueList = this.responseList;
  }

  isEnterprise = () => this._userService.isUserEnterprise();
}
