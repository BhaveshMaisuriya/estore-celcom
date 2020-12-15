import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { BaseService } from '../base.service';
import { AppService } from '../Service/app.service';
import { Cart } from '../Model/cart.model';
import { CartItem } from '../Model/cart-item.model';
import { CookieService } from 'ngx-cookie-service';
import { BroadbandService } from '../Service/broadband.service';
import { detectQueryString, msisdnHelper } from '../shared/utilities/helper.ultility';
import { environment } from 'environments/environment';

const CART_KEY = "cart";

@Injectable()
export class CartService extends BaseService {

  prodServer: boolean = environment.production;
  cartDetails: any;
  componentProceedTime: any;
  DoB = null;
  year = null;
  month = null;
  day = null;
  guestInfo = "GuestInfo";

  constructor(private _service: AppService,
    private cookieService: CookieService,
    private _bbService: BroadbandService,
    ) {
    super();
  }

  public Find(apiURL: string): Observable<any[]> {
    let msisdn = '';
    let url = apiURL;
    const queryStringPattern:boolean = detectQueryString(url);
    if(localStorage && localStorage.getItem("MyMsIsdn")) {
      msisdn = localStorage.getItem("MyMsIsdn");
      msisdn = msisdnHelper(msisdn);
      url = queryStringPattern ? `${url}&msisdn=${msisdn}` : `${url}?msisdn=${msisdn}`;
    }
    return this._service
      .getEstoreUserData(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public FindService(url): Observable<any[]> {
    return this._service
      .get(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public PostData(apiURL: string): Observable<any[]> {
    const url = apiURL;
    return this._service
      .postEstoreData(url)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  public addProductToCart(product: any, quantity: number, details?: any): void {
    const selectedProductDetails = details;
    const cart = this.retrieveCart();

    const item = new CartItem();
    item.sku = product.sku;
    item.quantity = quantity;
    item.price = product.price;
    item.itemTotal = item.quantity * item.price;
    item.selectedProduct = selectedProductDetails;
    cart.items.push(item);

    cart.setTotalPrices(cart);
    this.save(cart);

    if (localStorage && localStorage.getItem("EDIT_PRODUCT")) {
      localStorage.removeItem("EDIT_PRODUCT");
    }
  }

  public retrieveCart(): Cart {
    const cart = new Cart();
    if (typeof window !== 'undefined' && localStorage) {
      const storedCart = localStorage.getItem(CART_KEY);
      if (storedCart) {
        cart.setCart(JSON.parse(storedCart));
      }
    }
    return cart;
  }


  editCartItem(i, cartProducts, cartResponse) {
    if (localStorage && localStorage.getItem("MNP-FLOW") === "YES") {
      localStorage.setItem('MNP-EDIT', 'YES');
    }
    if (localStorage && localStorage.getItem("COBP_FLOW") === "YES") {
      localStorage.setItem('COBP_EDIT', 'YES');
    }
    cartProducts.forEach(item => {
      if (cartProducts.indexOf(item) === i) {
        if (typeof window !== "undefined" && localStorage) {
          localStorage.setItem("CartEditProduct", JSON.stringify(item));
          if (localStorage && localStorage.getItem("MNP-FLOW") === "YES" && localStorage.getItem("MNP-CUSTOMER")) {
            const MNPdata = JSON.parse(localStorage.getItem("MNP-CUSTOMER"));
            MNPdata.portNumber = item.selectedProduct.orderPhoneNo;
            localStorage.setItem("MNP-CUSTOMER", JSON.stringify(MNPdata));
          }
          if (item.skuBundle) {
            if (item.selectedProduct.orderPlan && !item.selectedProduct.orderDevice) {
              this.Redirect(item.selectedProduct.selectedPlanDetails.BuynowLink);
            } else {
              if (item.is_broadband) {
                this._bbService.preserveHomeWirelessEditData(cartResponse.all_items[0]);
              } else {
                this.Redirect("/device-detail/" + item.skuBundle);
              }
            }
          } else if (!item.skuBundle) {
            if (item.selectedProduct.orderPlan && !item.selectedProduct.orderDevice) {
              this.Redirect(item.selectedProduct.selectedPlanDetails.BuynowLink);
            } else {
              this.Redirect("/device-detail/" + item.sku);
            }
          }
        }
      }
    });
  }

  public customStringify = function (v) {
    const planObject = new Set();
    return JSON.stringify(v, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (planObject.has(value)) {
          // Circular reference found, discard key
          return;
        }
        // Store value in our set
        planObject.add(value);
      }
      return value;
    });
  };

  public save(cart: Cart): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(CART_KEY, this.customStringify(cart));
    }
  }

  public removeProductFromCart(product: any) {
    if (product.selectedProduct) {
      // Update Magento cart
      this.removeItemCart(product.item_id, product.selectedProduct.orderPlan, product.selectedProduct.selectedProductSku,
        product.isPreorder);

      // Update localstorage cart
      const cart = this.retrieveCart();
      const item = cart.items.find((p) => p.selectedProduct.selectedProductSku === product.selectedProduct.selectedProductSku);
      if (item !== undefined) {
        item.quantity = 0;
        cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
      }
      if (cart && cart.items && cart.items.length <= 0) {
        if (localStorage && localStorage.getItem("GUEST_CART_ID")) {
          localStorage.removeItem("GUEST_CART_ID");
        }
      }
      cart.setTotalPrices(cart);
      this.save(cart);
    }
  }

  public generateRequestForRemove(itemId: any, storag: any, isPreorder: any, url: string) {
    let is_preorder = false;
    if (isPreorder) {
      is_preorder = true;
    }
    const requestBody = {
      "data": {
        "user": "user",
        "item_id": itemId,
        "cart_item_sku": storag,
        "is_preorder": is_preorder
      }
    };
    this._service.postEstoreUserData(url, requestBody).subscribe(
      (response: any) => {
        return response;
      });
  }

  public removeItemCart(itemId: any, plan: any, storag: any, isPreorder: any) {
    const url = "/rest/V1/deletecart/";
    let is_pre_order = false;
    if (isPreorder) {
      is_pre_order = true;
    }
    const requestBody = {
      "data": {
        "user": "user",
        "item_id": itemId,
        "cart_item_sku": storag,
        "is_preorder": is_pre_order
      }
    };
    this._service.postEstoreUserData(url, requestBody).subscribe(
      (response: any) => {
        // Plan only -  Remove local storage data once item deleted from cart.
        if (localStorage && localStorage.getItem("SelectedPlanDetails")) {
          localStorage.removeItem("SelectedPlanDetails");
        }
        // Bundle - Remove local storage data once item deleted from cart.
        if (localStorage && localStorage.getItem("selectedProductDetails")) {
          localStorage.removeItem("selectedProductDetails");
        }
        return response;
      });
  }


  public DateCalc() {
    this.DoB = this.DoB.substring(0, this.DoB.indexOf('_'));
    this.year = this.DoB.slice(0, 4);
    this.month = this.DoB.slice(4, 6);
    this.day = this.DoB.slice(6);
  }

  public DateParams() {
    const userInfo = JSON.parse(sessionStorage.getItem('UserInfo'));
    if (userInfo && userInfo['outputCPResp'] && userInfo['outputCPResp']['dateOfBirth']) {
      this.DoB = userInfo.outputCPResp.dateOfBirth;
      this.DateCalc();
    } else {
      if (sessionStorage.getItem(this.guestInfo) && sessionStorage.getItem("OLD_GUEST_USER") === "YES") {
        this.DoB = JSON.parse(sessionStorage.getItem(this.guestInfo)).outputCPResp.dateOfBirth;
        this.DateCalc();
      } else {
        // for new guest user whose personal data not available in siebel
        if (sessionStorage.getItem(this.guestInfo) && JSON.parse(sessionStorage.getItem(this.guestInfo)).blacklistChkRequest) {
        this.DoB = JSON.parse(sessionStorage.getItem(this.guestInfo)).blacklistChkRequest.customerIDNo;
        }
        if (this.DoB) {
        this.DoB = this.DoB.slice(0, 6);
        this.year = this.DoB.slice(0, 2);
        this.month = this.DoB.slice(2, 4);
        this.day = this.DoB.slice(4);
        const today = new Date();
        const yearTodayString = today.getFullYear().toString().slice(2);
        if (this.year <= yearTodayString) {
          this.year = "20" + this.year;
        }
      }
      }
    }
  }

  // Check Eligibility for postpai XPAX
  // public checkEligibilityForPostpaidXpax(lowerAgeLimit:string, upperAgeLimit:string){
  public checkEligibilityForPostpaidXpax(lowerAgeLimit, upperAgeLimit) {
    this.DoB = null;
    this.day = null;
    this.month = null;
    this.year = null;
    let flag = false;
    let age = null;
    let popupType = "";
    if (typeof window !== 'undefined') {

      // plan only
      // remove this once tested...
      // data.selectedPlanDetails.upper_age_limit != null ? parseInt(data.selectedPlanDetails.upper_age_limit) : 0;
      // data.selectedPlanDetails.lower_age_limit != null ? parseInt(data.selectedPlanDetails.lower_age_limit) : 0;

      if (upperAgeLimit > 0 && lowerAgeLimit > 0) {
        if (typeof window !== "undefined" && sessionStorage) {
          this.DateParams();

          if (this.DoB !== null && this.DoB !== undefined) {
            age = this.calculateAge(this.year, this.month, this.day);
            // TBD
            if (age >= lowerAgeLimit && age <= upperAgeLimit) {
              flag = true;
            } else {
              flag = false;
            }
            //
            if (age < lowerAgeLimit) {
              popupType = "LOWER_AGE";
            } else if (age > upperAgeLimit) {
              popupType = "UPPER_AGE";
            } else {
              flag = true;
            }
          }
        }
      } else {
        // invalid data case..
        // if upper_age_limit/lower_age_limit value is 0...
        flag = true;
        popupType = "";
      }
    }

    return {
      isEligibleByAge: flag,
      displayType: popupType,
      type: 'xpax'
    };
  }

  public checkEligibilityForFirstPlans(lowerAgeLimit) {
    this.DoB = null;
    this.year = null;
    this.month = null;
    this.day = null;
    let age = null;
    let flag = true;
    let popupType = "";
    if (typeof window !== 'undefined' && sessionStorage) {
      if (lowerAgeLimit > 0) {
        this.DateParams();
        if (this.DoB !== undefined && this.DoB !== null) {
          age = this.calculateAge(this.year, this.month, this.day);
          // TBD
          if (age >= lowerAgeLimit) {
            flag = true;
          } else {
            flag = false;
          }
          //
          if (age < lowerAgeLimit) {
            popupType = "LOWER_AGE";
          } else {
            flag = true;
          }
        }
      }
    } else {
      // invalid data case..
      // if lower_age_limit value is 0...
      flag = true;
      popupType = "";
    }
    return {
      isEligibleByAge: flag,
      displayType: popupType,
      type: 'first'
    };
  }

  public calculateAge(year, month, day) {
    const today = new Date();
    const DoB = new Date(year, month, day);
    const yearToday = today.getFullYear();
    let yearDoB = DoB.getFullYear();
    const yearTodayString = yearToday.toString().slice(2);
    if (year <= yearTodayString) {
      const yearDoBToAssign = year;
      yearDoB = parseInt(yearDoBToAssign, 10);
    }
    let age = yearToday - yearDoB;
    const m = today.getMonth() - (DoB.getMonth() - 1);
    if (m < 0 || (m === 0 && today.getDate() < DoB.getDate())) {
      age--;
    }
    return age;
  }

  public checkNumberOfLinesUserHasGuest(customerResponse: any) {
    // const prepaidConnections = customerResponse.user_prepaid_line;
    const postpaidConnections = customerResponse.user_postpaid_lines;
    // const noOfPrepaidConnections = customerResponse.allowed_prepaid_lines;
    const noOfPostpaidConnections = customerResponse.allowed_postpaid_lines;

    if (postpaidConnections >= noOfPostpaidConnections) {
      // changed to 15 postpaid connections for test.
      return true;
    } else {
      return false;
    }
  }

  public checkNumberOfLinesUserHas(customerResponse: any) {
    let prepaidConnections = 0;
    let postpaidConnections = 0;
    const isPostPaidExceeded = false;
    const isPrePaidExceeded = false;
    // const noOfPrepaidConnections = 5;
    let noOfPostpaidConnections = 15;
    if (this.prodServer) {
      noOfPostpaidConnections = 15;
    }
    if (customerResponse !== undefined && customerResponse.services && customerResponse.services.length > 0) {
      customerResponse.services.forEach((item: any) => {
        if (item.pre_Pos_Indicator !== undefined) {
          if (item.pre_Pos_Indicator === "Prepaid") {
            prepaidConnections = prepaidConnections + 1;
          }
          if (item.pre_Pos_Indicator === "Postpaid") {
            postpaidConnections = postpaidConnections + 1;
          }
        }
      });
    }
    // uncomment below code for production and remove the code below it
    // if(postpaidConnections != 0 && prepaidConnections != 0){  //--> check if we need 0 condition
    if (postpaidConnections >= noOfPostpaidConnections) {
      // changed to 15 postpaid connections for test.
      return true;
    } else {
      return false;
    }
    //  }else{
    //    return false;
    // }

    //     if (postpaidConnections >= 2) {
    //     isPostPaidExceeded=true;
    //     } else {
    //       isPostPaidExceeded=false;
    //     }
    //     return isPostPaidExceeded;

  }

  public ManageEligibilityRedirection(): void {
    if (localStorage && localStorage.getItem("ls_subnav") != null) {
      const isSubnav = localStorage.getItem("ls_subnav");
      const isSubnavPostpaid = isSubnav.match("Postpaid");
      const isSubnavDevices = isSubnav.match("Devices");
      localStorage.setItem("redirection-flow", "true");
      if (isSubnavPostpaid != null) {
        if (localStorage && localStorage.getItem("SelectedPlanDetails")) {
          const planDetails: any = JSON.parse(localStorage.getItem("SelectedPlanDetails"));
          const url = planDetails.BuynowLink;
          window.location.href = url;
        }
      } else if (isSubnavDevices != null) {
        if (localStorage && localStorage.getItem("selectedProductDetails")) {
          const productDetails: any = JSON.parse(localStorage.getItem("selectedProductDetails"));
          const url = "/device-detail/" + productDetails.orderDevice;
          window.location.href = url;
        }
      }
    }
  }

  guestCheckoutApi(requestBody) {
    const url = '/rest/V1/guestcheckout';
    return this._service.
      postEstoreUserData(url, requestBody)
      .pipe(map((response: any) => {
        return response;
      }));
  }

  splitName(name: string) {
    let splitname: any = name.trim();
    splitname = splitname.split(" ");
    const firstname: string = splitname[0].trim();
    const fullname = {
      ContactFirstName: firstname,
      ContactLastName: splitname[1]
    };
    if (splitname.length < 3) {
      return fullname;
    } else {
      let lastname = "";
      for (let i = 1; i < splitname.length; i++) {
        if (splitname[i].trim().length > 0) {
          lastname += splitname[i].trim() + ' ';
        }
      }
      fullname.ContactLastName = lastname.trim();
      return fullname;
    }
  }

  Redirect(carturl: string) {
    if (typeof window !== "undefined") {
      window.location.href = carturl;
    }
  }

  createNow() {
    // format '20180111_124303'
    const d = new Date();
    const yr = d.getFullYear().toString();
    const mn = ("0" + (d.getMonth() + 1).toString()).slice(-2);
    const dt = ("0" + d.getDate().toString()).slice(-2);
    const hr = d.getHours().toString();
    const mi = d.getMinutes().toString();
    const sc = d.getSeconds().toString();
    return yr + mn + dt + "_" + hr + mi + sc;
  }

  deviceReservervationTimeout(componentLoadTime, cartItemAddedTime): boolean {
    let userMinsSpent;
    let totalMinsItemInCart;
    this.componentProceedTime = Date.now();
    userMinsSpent = (this.componentProceedTime - componentLoadTime) / (1000 * 60);
    totalMinsItemInCart = userMinsSpent + (cartItemAddedTime);
    if (this.prodServer) {
      if (totalMinsItemInCart > 30) {
        return true;
      } else {
        return false;
      }
    } else {
      if (totalMinsItemInCart > 25) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
  * Updating Cookie based on the cartmine response.
    Updating deviceName, PlanName
  * @param aiObject
  */
  public updateCookieForAffiliateMarketing(aiObject, cookie_expire_in_days) {
    let isADA = false;
    if (sessionStorage && sessionStorage.getItem('is_affiliate_ada')) {
      isADA = true;
    }
    // Modify info of IA if request not came from ADA.
    if (this.cookieService.check('orderItem') && !isADA) {
      const orderItem = JSON.parse(this.cookieService.get('orderItem'));
      orderItem.deviceName = aiObject.deviceName;
      orderItem.planName = aiObject.planName;
      orderItem.amount = aiObject.amount;
      orderItem.isSubmitted = false;
      let iaExpireDays = cookie_expire_in_days;
      const iaStartDateString = this.cookieService.get('iaStartDate');
      const iaStratDate = new Date(iaStartDateString);
      const completedDays = iaStratDate.getDate() - new Date().getDate();
      iaExpireDays = iaExpireDays + completedDays;
      this.cookieService.set('orderItem', JSON.stringify(orderItem), iaExpireDays, '/');
    }
  }
}
