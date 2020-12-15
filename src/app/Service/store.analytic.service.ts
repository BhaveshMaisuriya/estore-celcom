import { Injectable, Renderer2, Inject } from '@angular/core';
import { BaseService } from '../base.service';
import { AppService } from '../Service/app.service';
import { SeoService } from '../Service/seo.service';
// For Adobe Analytics
import { AnalyticsService } from '../Service/analytic.service';
import { RendererService } from '../Service/renderer.service';
import { DOCUMENT } from '@angular/common';
import * as urlUtility from '../Utility/url.utility';
import { DecimalPipe } from '@angular/common';
@Injectable()
export class EStoreAnalysticsService extends BaseService {
  private DefaultPageTitle = "Celcom";
  private PageChannel = "shop";
  private EventType = "login";
  private GUEST_USER = "GUEST_USER";
  private CELCOM_USER = "CELCOM_USER";
  private SelectedPlan = "SelectedPlan";
  private DeviceSku = "DeviceSku";
  private USER_TYPE = "USER_TYPE";
  private UserToken = "UserToken";
  private UserInfo = "UserInfo";
  private GuestInfo = "GuestInfo";
  private checkoutType_Guest = "Guest";
  private checkoutType_Regular = "Regular";
  private Out_of_stock = "Out-of-stock";
  private In_Stock = "In stock";
  private selectedColor = "selectedColor";
  private selectedStorage = "selectedStorage";
  private selectedDevice: string;
  private BuyNoPlan: string;
  constructor(
    @Inject(DOCUMENT) private document,
    private _service: AppService,
    private _analyticsService: AnalyticsService,
    private _rendererService: RendererService,
    private _seoService: SeoService,
    private _decimalpipe: DecimalPipe
  ) {
    super();
  }

  public ManageAnalytics(renderer: Renderer2, currentUrl: string, pageInfo: any) {
    if (currentUrl !== this._analyticsService.pageUrl) {
      if (typeof window !== 'undefined') {
        this._analyticsService.resetAllAnalyticData();
      }


    }
    this._analyticsService.categoryOne = "Personal";
    this.SetDigitalData(currentUrl, pageInfo);
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
      this.callPageLoadScript(renderer);
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }
  SetDigitalData(currentUrl: string, pageInfo: any) {
    if (pageInfo) {
    this.UpdatePageNameForAdobeDataLayer(pageInfo.pageTitle);
    }
    this.UpdatePageChannelForAdobeDataLayer();
    if (currentUrl) {
    this.UpdatePageUrlForAdobeDataLayer(currentUrl);
    }
    if (pageInfo) {
      if (pageInfo.pageCategory2 !== "" && pageInfo.pageCategory2) {
        this.UpdateCategoryForAdobeDataLayer(pageInfo);
      }
      // meta and page title...
      if (pageInfo.pageTitle !== null) {
        // ? pageTitle will be null for the pages set from CMS
        this.SetPageTitleUsingMetaTag(pageInfo.pageTitle);
      }
    }
  }
  // public SetLoginInfoForAdobeDataLayer() {
  //     this.UpdateLoginInfoForAdobeDataLayer();
  //     if (typeof window !== 'undefined') {
  //         (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
  //     }
  // }
  public SetPageTypeForAdobeDataLayer(pageType: any, renderer: Renderer2) {
    this.UpdatePageTypeForAdobeDataLayer(pageType);
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
      // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
        this.callPageLoadScript(renderer);
  }
  public SetCategoryTwoForAdobeDataLayer(renderer: Renderer2) {
    // ! Refactoring needed, doesn't do anything useful
    this.UpdateCategoryForAdobeDataLayer();
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
    //  this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }

  public SetProductDetails(productdetails: any, renderer: Renderer2) {
    if (productdetails !== undefined) {
      this.UpdateProductNameInfoForAdobeDataLayer(productdetails);

      if (productdetails.product_type === "Service") {
        if (productdetails.sku != null || productdetails.PlanMonthlyPay != null) {
          this.UpdateProductIdInfoForAdobeDataLayer(productdetails.sku);
          this.UpdateProductPriceForPlanInfoForAdobeDataLayer(productdetails.PlanMonthlyPay);
        }
        if (productdetails.is_xpax === "false" || productdetails.is_xpax === false) {
          this.UpdateProductTypeInfoForAdobeDataLayer("Postpaid plan");
        } else {
          this.UpdateProductTypeInfoForAdobeDataLayer("XPAX Postpaid Plan");
        }
      } else {
        if (productdetails.rrp_rm_strick_price != null) {
          this.UpdateProductPriceForDeviceInfoForAdobeDataLayer(productdetails.rrp_rm_strick_price);
        }
        this.UpdateProductTypeInfoForAdobeDataLayer("Device");
      }
      if (typeof window !== 'undefined') {
        (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
      }
      // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);

    }

  }
  public SetProductTotalForDevice(totalPrice: string, renderer: Renderer2) {
    if (totalPrice !== undefined || totalPrice != null) {
      this.UpdateProductPriceForDeviceInfoForAdobeDataLayer(totalPrice);
    }
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }
  public SetProductType(ProductType: any) {
    if (ProductType !== undefined) {
      this.UpdateProductTypeInfoForAdobeDataLayer(ProductType);
    }
  }

  public SetProductId(productId: any, renderer: Renderer2) {
    if (productId !== undefined) {
      this.UpdateProductIdInfoForAdobeDataLayer(productId);
    }
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }
  public SetProductIdForBundleProduct(planId: any, renderer: Renderer2) {
    if (planId !== undefined) {
      this.UpdateProductIdInfoForBundleProductAdobeDataLayer(planId);
    }
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }

  public SetCartDetails(cartdetails: any, renderer: Renderer2) {
    if (cartdetails !== undefined) {
      this.UpdateCartItemsInfoForAdobeDataLayer(cartdetails);
      if (cartdetails.itemsTotal != null) {
        this.UpdateCartTotalInfoForAdobeDataLayer((cartdetails.itemsTotal).toString());
      }
    }
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }
  public SetStockForSelectedDevice(devicestockstatus: any, renderer: Renderer2) {
    if (devicestockstatus !== undefined) {
      this.UpdateProductStockInfoForAdobeDataLayer(devicestockstatus);
    }
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }

  public SetCompareProductArray(compareproductsdetails: any, renderer: Renderer2) {
    if (compareproductsdetails !== undefined) {
      this.UpdateProductCompareInfoForAdobeDataLayer(compareproductsdetails);
    }
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }
  public SetCheckoutTypeOfUser(renderer: Renderer2) {
    this.UpdateCheckoutTypeInfoForAdobeDataLayer();
    if (typeof window !== 'undefined') {
      (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
    }
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }
  public SetTransactionDetailsOfUser(currentUrl: string, analyticsItem: any, transactionDetails: any, renderer: Renderer2) {
    if (transactionDetails.transactResult !== "" && transactionDetails !== undefined) {
      this.SetDigitalData(currentUrl, analyticsItem);
      this.UpdateTransactionDetailsForAdobeAnalytics(transactionDetails);
      if (typeof window !== 'undefined') {
        (<any>window).digitalData = this._analyticsService.getAvailableAnalyticsData();
        this.callPageLoadScript(renderer);
      }
    }
    // this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
  }

  private UpdateCategoryForAdobeDataLayer(pageInfo = null) {
    if (pageInfo !== null) {
      this._analyticsService.categoryTwo = pageInfo.pageCategory2;
      return;
    }

    if (typeof window !== 'undefined') {
      // ! Old legacy way, it ignores pageInfo set from `app.router`
      if (localStorage && localStorage.getItem("ls_subnav") != null) {
        const subnavData = JSON.parse(localStorage.getItem("ls_subnav"));
        this._analyticsService.categoryTwo = subnavData.activeMenu;
      }
    }
  }
  private UpdatePageNameForAdobeDataLayer(pageInfo: any) {
    if (pageInfo) {
      this._analyticsService.pageName = pageInfo;
    } else {
      this._analyticsService.pageName = this.DefaultPageTitle;
    }
  }
  private UpdatePageChannelForAdobeDataLayer() {
    this._analyticsService.pageChannel = this.PageChannel;
  }
  private UpdatePageUrlForAdobeDataLayer(currentUrl: string) {
    this._analyticsService.pageUrl = "/" + urlUtility.getCurrentBrowserUrlWithoutQueryString(currentUrl);
  }
  // private UpdateLoginInfoForAdobeDataLayer() {
  //     if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  //         if (sessionStorage.getItem(this.UserToken) != undefined) {
  //             this._analyticsService.AccountId = this.FindAccountId(this.CELCOM_USER);
  //             this._analyticsService.EventInfo = this.EventType;
  //         }
  //         if (sessionStorage.getItem(this.USER_TYPE) != undefined) {
  //             this._analyticsService.AccountId = this.FindAccountId(this.GUEST_USER);
  //             this._analyticsService.EventInfo = this.EventType;
  //         }
  //     }
  // }

  private FindAccountId(type) {
    let accountId = "";
    switch (type) {
      case this.CELCOM_USER:
        accountId = this.FindAccountId_Celcom();
        break;
      case this.GUEST_USER:
        accountId = this.FindAccountId_Guest();
        break;
    }
    return accountId;
  }
  private FindAccountId_Guest() {
    let guestAccountId = "";
    if (sessionStorage && sessionStorage.getItem(this.GuestInfo) !== undefined) {
      const result = JSON.parse(sessionStorage.getItem(this.GuestInfo));
      guestAccountId = result.blacklistChkRequest.customerIDNo;
    }
    return guestAccountId;
  }
  private FindAccountId_Celcom() {
    let accountId = "";
    if (sessionStorage && sessionStorage.getItem(this.UserInfo) !== undefined) {
      const result = JSON.parse(sessionStorage.getItem(this.UserInfo));
      accountId = result.outputCPResp.customerID;
    }
    return accountId;
  }

  private SetPageTitleUsingMetaTag(pageTitle: string) {
    this._seoService.setTitle(pageTitle);
  }
  private UpdateProductNameInfoForAdobeDataLayer(productdetails: any) {
    if (productdetails.product_type !== "Service") {
      this._analyticsService.productName = productdetails.order_brand + " " + productdetails.name;
    } else {
      this._analyticsService.productName = productdetails.name;
    }
    this._analyticsService.EventInfo = "product_view";

  }
  private UpdateProductTypeInfoForAdobeDataLayer(productType: any) {
    this._analyticsService.productType = productType;
  }
  private UpdateProductPriceForPlanInfoForAdobeDataLayer(planPrice: any) {
    const formattedPlanPrice = this._decimalpipe.transform(planPrice, "1.2-2").replace(',', '');
    this._analyticsService.productPrice = formattedPlanPrice;
  }
  private UpdateProductPriceForDeviceInfoForAdobeDataLayer(totalPrice: string) {
    const formattedTotalprice = this._decimalpipe.transform(totalPrice, "1.2-2").replace(',', '');
    this._analyticsService.productPrice = formattedTotalprice;
  }

  private UpdateProductCompareInfoForAdobeDataLayer(compareproductdetails: any) {
    this._analyticsService.productCompare = [];
    if (compareproductdetails) {
      for (let i = 0; i < compareproductdetails.noOfProds.length; i++) {
        this._analyticsService.productCompare[i] = compareproductdetails.noOfProds[i].sku;
      }
    }
  }
  private UpdateCartItemsInfoForAdobeDataLayer(cartdetails: any) {
    this._analyticsService.cartItems = [];
    for (let i = 0; i < cartdetails.items.length; i++) {
      this._analyticsService.cartItems[i] = cartdetails.items[i].sku;
    }
  }
  private UpdateCartTotalInfoForAdobeDataLayer(cartTotal: string) {
    const formattedCartTotal = this._decimalpipe.transform(cartTotal, "1.2-2").replace(',', '');
    this._analyticsService.cartTotal = formattedCartTotal;
  }
  private UpdateProductStockInfoForAdobeDataLayer(response: any) {
    if (response === "Out of Stock") {
      this._analyticsService.productStock = this.Out_of_stock;
    }

    if (response === "In Stock") {
      this._analyticsService.productStock = this.In_Stock;
    }
  }

  private UpdateProductIdInfoForAdobeDataLayer(productId: any) {
    this._analyticsService.productId = productId;
    this.selectedDevice = this._analyticsService.productId;
  }
  private UpdateProductIdInfoForBundleProductAdobeDataLayer(planId: any) {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (localStorage && localStorage.getItem(this.BuyNoPlan) === undefined) {
        const productID = this._analyticsService.productId;
        if (productID.indexOf('_') !== -1) {
          this._analyticsService.productId = productID.substring(0, productID.indexOf('_') + 1) + planId;
        } else {
          this._analyticsService.productId = productID + "_" + planId;
        }
      } else if (localStorage && localStorage.getItem(this.BuyNoPlan) === "true") {
        // this._analyticsService.productId.split("_");
        this._analyticsService.productId = this.selectedDevice;
      }

    }
  }
  private UpdateCheckoutTypeInfoForAdobeDataLayer() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      if (sessionStorage && sessionStorage.getItem(this.USER_TYPE) !== undefined) {
        this._analyticsService.checkoutType = this.checkoutType_Guest;
      } else if (sessionStorage && sessionStorage.getItem(this.UserToken) !== undefined) {
        this._analyticsService.checkoutType = this.checkoutType_Regular;
      }
    }
  }
  private UpdatePageTypeForAdobeDataLayer(pageType: any) {
    this._analyticsService.pageType = pageType;
  }
  private UpdateTransactionDetailsForAdobeAnalytics(transactionDetails: any) {
    if (transactionDetails.transactResult === "success") {
      if (transactionDetails.transactProductId !== "" && transactionDetails.transactProductQty !== "" &&
       transactionDetails.transacPrice !== "") {
        this._analyticsService.transactProduct =
         transactionDetails.transactProductId + ";" + transactionDetails.transactProductQty + ";" + transactionDetails.transactProductPrice;
      }
      this._analyticsService.transactOrder = transactionDetails.transactOrderId;
      this._analyticsService.transactMethod = transactionDetails.transactMethod;
      this._analyticsService.transactVoucher = transactionDetails.transactVoucher;
      if (transactionDetails.transactPrice && transactionDetails.transactPrice !== "") {
      this._analyticsService.transactPrice = this._decimalpipe.transform(transactionDetails.transactPrice, "1.2-2");
      } else {
        this._analyticsService.transactPrice = transactionDetails.transactPrice;
      }
    }
    this._analyticsService.transactResult = transactionDetails.transactResult;
  }

  onClickAddToCart(renderer: Renderer2) {
    if (typeof window !== 'undefined') {
      this._rendererService.updateTraceScriptInAddToCart(this.document, renderer, this.document.body);
    }
  }
  callPageLoadScript(renderer: Renderer2) {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        this._rendererService.updateTraceScriptInPageLoad(this.document, renderer, this.document.body);
      }, 3000);
    }
  }

}
