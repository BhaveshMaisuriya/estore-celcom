import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  'providedIn': 'root'
})
export class AnalyticsService {
  private page_name: string;
  private page_type: string;
  private page_url: string;
  private category1: string;
  private category2: string;
  private category3: string;
  private tab_name: string;
  private search_term: string;
  private search_results: string;
  private form_name: string;
  private form_type: string;
  private form_submit: string;
  private total_components: number;
  private components_loaded: number;
  private page_channel: string;
  // used after login
  private account: string;
  private event: string;
  // phase 2 objects
  private product_name: string;
  private product_type: string;
  private product_price: string;
  private product_compare: string[];
  private cart_items: string[];
  private cart_total: string;
  private product_stock: string;
  private product_id: string;
  private checkout_type: string;
  private transact_product: string;
  private transact_method: string;
  private transact_result: string;
  private transact_order: string;
  private transact_price: string;
  private transact_voucher: string;
  private transact_errormessage: string;
  private _transact_errormessage: string[];
  private customer_type: string;
  private customer_category: string;
  private item_type: string;
  private nric: string;
  private msisdn: string;

  constructor() {
    this.page_name = "";
    this.page_type = "";
    this.page_url = "";
    this.category1 = "";
    this.category2 = "";
    this.category3 = "";
    this.tab_name = "";
    this.search_term = "";
    this.search_results = "";
    this.form_name = "";
    this.form_type = "";
    this.form_submit = "";
    this.total_components = 0;
    this.components_loaded = 0;
    this.page_channel = "";
    this.account = "";
    this.event = "";
    // phase 2
    this.product_name = "";
    this.product_type = "";
    this.product_price = "";
    this.product_compare = [];
    this.cart_items = [];
    this.cart_total = "";
    this.product_stock = "";
    this.product_id = "";
    this.checkout_type = "";
    this.transact_product = "";
    this.transact_method = "";
    this.transact_result = "";
    this.transact_order = "";
    this.transact_price = "";
    this.transact_voucher = "";
    this.transact_errormessage = null;
    this._transact_errormessage = [];
    this.customer_type = "";
    this.customer_category = "";
    this.item_type = "";
    this.nric = "";
    this.msisdn = "";
  }

  // Below code is for parent child communication Via a service layer
  // Observable string sources
  private isAllComponentLoaded = new Subject<boolean>();

  // Observable string streams
  componentLoadConfirmed$ = this.isAllComponentLoaded.asObservable();

  // Service message commands
  componentsLoaded() {
    this.components_loaded++;
    // to check if no of components loaded is equal to total number of component in the page
    if (this.components_loaded === this.total_components) {
      this.components_loaded = 0;
      this.total_components = 0;
      this.isAllComponentLoaded.next(true);
    }
  }

  /**
   * For page name details
   * eg: "First Gold | Postpaid Plans | Celcom"
   */
  get pageName(): string {
    return this.page_name;
  }

  set pageName(value: string) {
    this.page_name = value;
  }

  /**
   * For Page type Details
   * eg: "404" for 404 pages
   */
  get pageType(): string {
    return this.page_type;
  }

  set pageType(value: string) {
    this.page_type = value;
  }

  /**
   * For PageUrl Details
   * eg: "www.celcom.com.my/business/"
   */
  get pageUrl(): string {
    return this.page_url;
  }

  set pageUrl(value: string) {
    this.page_url = value;
  }

  /**
   * For First level
   * eg: "Business"
   */
  get categoryOne(): string {
    return this.category1;
  }

  set categoryOne(value: string) {
    this.category1 = value;
  }

  /**
   * For second level
   * eg: "Corporate Solutions"
   */
  get categoryTwo(): string {
    return this.category2;
  }

  set categoryTwo(value: string) {
    this.category2 = value;
  }

  /**
   * For third level
   *
   */
  get categoryThree(): string {
    return this.category3;
  }

  set categoryThree(value: string) {
    this.category3 = value;
  }

  /**
   * If tab is available we need to give selected tab name
   * eg: "Plans", "Roaming & IDD"
   */
  get tabName(): string {
    return this.tab_name;
  }

  set tabName(value: string) {
    this.tab_name = value;
  }

  /**
   * For getting user searched term
   * eg: "gold"
   */
  get searchTerm(): string {
    return this.search_term;
  }

  set searchTerm(value: string) {
    this.search_term = value;
  }

  /**
   * For getting the total search result
   * eg: 10
   */
  get searchResults(): string {
    return this.search_results;
  }

  set searchResults(value: string) {
    this.search_results = value;
  }

  /**
   * Form name used by the user
   *
   */
  get formName(): string {
    return this.form_name;
  }

  set formName(value: string) {
    this.form_name = value;
  }

  /**
   * For accessing form type
   */
  get formType(): string {
    return this.form_type;
  }

  set formType(value: string) {
    this.form_type = value;
  }

  /**
   * To check if form submit is success or failure
   * if success 1 else 0
   */
  get formSubmit(): string {
    return this.form_submit;
  }

  set formSubmit(value: string) {
    this.form_submit = value;
  }

  /**
   * Method to set the page channel
   * "portal" or "stores"
   */
  get pageChannel(): string {
    return this.page_channel;
  }

  set pageChannel(value: string) {
    this.page_channel = value;
  }

  /**
   * For internal purpose to check number of component for a page
   */
  get totalComponents(): number {
    return this.total_components;
  }

  set totalComponents(value: number) {
    this.total_components = value;
  }
  get AccountId(): string {
    return this.account;
  }

  set AccountId(value: string) {
    this.account = value;
  }
  get EventInfo(): string {
    return this.event;
  }

  set EventInfo(value: string) {
    this.event = value;
  }
  // analytics phase 2
  get productName(): string {
    return this.product_name;
  }

  set productName(value: string) {
    this.product_name = value;
  }
  get productType(): string {
    return this.product_type;
  }

  set productType(value: string) {
    this.product_type = value;
  }
  get productPrice(): string {
    return this.product_price;
  }

  set productPrice(value: string) {
    this.product_price = value;
  }
  get productCompare(): string[] {
    return this.product_compare;
  }

  set productCompare(value: string[]) {
    this.product_compare = value;
  }

  get cartItems(): string[] {
    return this.cart_items;
  }

  set cartItems(value: string[]) {
    this.cart_items = value;
  }
  get cartTotal(): string {
    return this.cart_total;
  }

  set cartTotal(value: string) {
    this.cart_total = value;
  }
  get productStock(): string {
    return this.product_stock;
  }

  set productStock(value: string) {
    this.product_stock = value;
  }
  get productId(): string {
    return this.product_id;
  }

  set productId(value: string) {
    this.product_id = value;
  }
  get checkoutType(): string {
    return this.checkout_type;
  }

  set checkoutType(value: string) {
    this.checkout_type = value;
  }
  get transactProduct(): string {
    return this.transact_product;
  }

  set transactProduct(value: string) {
    this.transact_product = value;
  }
  get transactMethod(): string {
    return this.transact_method;
  }

  set transactMethod(value: string) {
    this.transact_method = value;
  }
  get transactOrder(): string {
    return this.transact_order;
  }

  set transactOrder(value: string) {
    this.transact_order = value;
  }
  get transactResult(): string {
    return this.transact_result;
  }

  set transactResult(value: string) {
    this.transact_result = value;
  }
  get transactPrice(): string {
    return this.transact_price;
  }
  set transactPrice(value: string) {
    this.transact_price = value;
  }
  get transactVoucher(): string {
    return this.transact_voucher;
  }
  set transactVoucher(value: string) {
     this.transact_voucher = value;
  }
  get transactErrormessage(): string {
    return JSON.stringify(this._transact_errormessage);
  }
  set transactErrormessage(value: string) {
    if(value !== null) {
      this._transact_errormessage.push(value);
    }
  }
  get customerType(): string {
    return this.customer_type;
  }
  set customerType(value: string) {
    this.customer_type = value;
  }
  get customerCategory(): string {
    return this.customer_category;
  }
  set customerCategory(value: string) {
    this.customer_category = value;
  }
  get itemType(): string {
    return this.item_type;
  }
  set itemType(value: string) {
    this.item_type = value;
  }
  get nricType(): string {
    return this.nric;
  }
  set nricType(value: string) {
    this.nric = value;
  }
  get msisdnValue(): string {
    return this.msisdn;
  }
  set msisdnValue(value: string) {
    this.msisdn = value;
  }

  /**
   * Method to get all analytics data
   */
  getAllAnalyticsData() {
    const digitalData = {
      page_name: this.pageName,
      page_type: this.pageType,
      page_url: this.pageUrl,
      category1: this.categoryOne,
      category2: this.categoryTwo,
      category3: this.categoryThree,
      tab_name: this.tabName,
      search_term: this.searchTerm,
      search_results: this.searchResults,
      form_name: this.formName,
      form_type: this.formType,
      form_submit: this.formSubmit,
      page_channel: this.page_channel,
      account: this.AccountId,
      event: this.EventInfo,
      product_name: this.productName,
      product_type: this.productType,
      product_price: this.productPrice,
      product_compare: this.productCompare,
      cart_items: this.cartItems,
      cart_total: this.cartTotal,
      product_stock: this.productStock,
      product_id: this.productId,
      checkout_type: this.checkoutType,
      transact_product: this.transactProduct,
      transact_method: this.transactMethod,
      transact_order: this.transactOrder,
      transact_result: this.transactResult,
      transact_price: this.transactPrice,
      transact_voucher: this.transactVoucher,
      transact_errormessage: this.transactErrormessage,
      customer_type: this.customerType,
      customer_category: this.customerCategory,
      item_type: this.itemType,
      nric: this.nricType,
      msisdn: this.msisdnValue
    };
    return digitalData;
  }

  /**
   * Method to reset all the data
   */
  resetAllAnalyticData() {
    this.pageName = "";
    this.pageType = "";
    this.pageUrl = "";
    this.tabName = "";
    this.searchTerm = "";
    this.searchResults = "";
    this.formName = "";
    this.formType = "";
    this.formSubmit = "";
    this.page_channel = "";
    this.account = "";
    this.event = "";
    // phase 2 analytics
    this.productName = "";
    this.productType = "";
    this.productPrice = "";
    this.productCompare = [];
    this.cartItems = [];
    this.cartTotal = "0.00";
    this.productStock = "";
    this.productId = "";
    this.checkoutType = "";
    this.transactProduct = "";
    this.transactMethod = "";
    this.transactOrder = "";
    this.transactResult = "";
    this.transactPrice = "";
    this.transactVoucher = "";
    this.transactErrormessage = null;
  }

  getAvailableAnalyticsData() {
    const digitalData: any = {};
    if (this.pageName !== "") {digitalData.page_name = this.pageName; }
    if (this.pageType !== "") {digitalData.page_type = this.pageType; }
    if (this.pageUrl !== "") {digitalData.page_url = this.pageUrl; }
    if (this.tabName !== "") {digitalData.tab_name = this.tabName; }
    if (this.searchTerm !== "") {digitalData.search_term = this.searchTerm; }
    if (this.searchResults !== "") {digitalData.search_results = this.searchResults; }
    if (this.formName !== "") {digitalData.form_name = this.formName; }
    if (this.formType !== "") {digitalData.form_type = this.formType; }
    if (this.formSubmit !== "") {digitalData.form_submit = this.formSubmit; }
    if (this.pageChannel !== "") {digitalData.page_channel = this.page_channel; }
    if (this.categoryOne !== "") {digitalData.category1 = this.category1; }
    if (this.categoryTwo !== "") {digitalData.category2 = this.category2; }
    if (this.categoryThree !== "") {digitalData.category3 = this.category3; }
    if (this.account !== "") {digitalData.account = this.AccountId; }
    if (this.event !== "") {digitalData.event = this.EventInfo; }
    // phase 2 analytics
    if (this.productName !== "") {digitalData.product_name = this.productName; }
    if (this.productType !== "") {digitalData.product_type = this.productType; }
    if (this.productPrice !== "") {digitalData.product_price = this.productPrice; }
    if (this.productCompare.length > 0) {digitalData.product_compare = this.productCompare; }
    if (this.cartItems.length > 0) {digitalData.cart_items = this.cartItems; }
    if (this.cartTotal !== "0.00") {digitalData.cart_total = this.cartTotal; }
    if (this.productStock !== "") {digitalData.product_stock = this.productStock; }
    if (this.productId !== "") {digitalData.product_id = this.productId; }
    if (this.checkoutType !== "") {digitalData.checkout_type = this.checkoutType; }
    if (this.transactResult !== "") {digitalData.transact_result = this.transactResult; }
    if (this.transactProduct !== "") {digitalData.transact_product = this.transactProduct; }
    if (this.transactMethod !== "") {digitalData.transact_method = this.transactMethod; }
    if (this.transactOrder !== "") {digitalData.transact_order = this.transactOrder; }
    if (this.transactPrice !== "")  {digitalData.transact_price = this.transactPrice; }
    if (this.transactVoucher !== "")  {digitalData.transact_voucher = this.transactVoucher; }
    if (this.transactErrormessage !== "")  {digitalData.transact_errormessage = this.transactErrormessage; }
    if (this.nricType !== "") {digitalData.nric = this.nric; }
    if (this.msisdnValue !== "") {digitalData.msisdn = this.msisdn; }

    return digitalData;
  }
}
