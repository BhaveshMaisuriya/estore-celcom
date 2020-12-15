import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CheckoutService } from "../services/checkout.service";
import { CartService } from "../../../Service/cart.service";
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
// import { Cart } from '../../../Model/cart.model';
// import { CartItem } from '../../../Model/cart-item.model';

@Component({
  selector: "app-checkout-home",
  templateUrl: "./checkout-home.component.html",
  styleUrls: ["./checkout-home.component.css"],
  providers: [CartService, CheckoutService]
})
export class CheckoutHomeComponent implements OnInit {
  cart: any;
  userType: string;
  USER_TYPE = 'USER_TYPE';
  router: Router;
  cartService: CartService;
  guestUser: any;
  checkoutService: CheckoutService;
  public isCSAgentDealer = false;
  itemsTotal: any;
  isMnp = false;

  constructor(
    cartService: CartService,
    router: Router,
    checkoutService: CheckoutService
  ) {
    this.router = router;
    this.cartService = cartService;
    this.checkoutService = checkoutService;
  }

  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    if (typeof window !== "undefined" && sessionStorage) {
      this.userType = sessionStorage.getItem(this.USER_TYPE);
      this.guestUser = sessionStorage.getItem("OLD_GUEST_USER");
    }
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }

    this.persistingCartDetails();

    // this.checkoutService.fetchCheckoutData();
    if (this.cart) {
      if (localStorage && localStorage.getItem('MNP-FLOW') !== 'YES') {
        if (!this.cart && !this.cart.grossTotal) {
          this.router.navigateByUrl("/store/cart");
        }
      }
    }
  }

  persistingCartDetails() {
    let url = ApiConstant.CARTMINE_API;
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem('CAorderId') &&
        sessionStorage.getItem('CAorderId') !== null && sessionStorage.getItem('secretKey') !== null
         && sessionStorage.getItem('secretKey')) {
          const orderSecret = sessionStorage.getItem('secretKey');
          const orderId = sessionStorage.getItem('CAorderId');
          url = "/rest/V1/cartmine?order_id=" + orderId + "&order_secret=" + orderSecret;
      }
    this.cartService.Find(url.trim()).subscribe(
      (response: any) => {
        this.itemsTotal = 0.00;
        this.cart = response[0];
        this.cart.all_items.forEach(element => {
          this.itemsTotal += parseFloat(element.itemTotal);
        });
        // Do this only for Mobile connect user
        if (!["GUEST", "ENTERPRISE"].includes(this.userType)) {
          if (localStorage && sessionStorage && localStorage.getItem("MyMsIsdn") && sessionStorage.getItem("UserInfo")) {
            if (typeof window !== "undefined" && localStorage) {
              const isMnpFlow = localStorage.getItem("MNP-FLOW") ? localStorage.getItem("MNP-FLOW") : "";
              let isPreOrderFlow = false;
              if (this.cart && this.cart.all_items[0] && this.cart.all_items[0].is_preorder && this.cart.all_items[0].is_preorder === 1) {
                isPreOrderFlow = true;
              }
              // localStorage.getItem("isPreOrder") ? localStorage.getItem("isPreOrder") : false;
              if (isMnpFlow !== "" && !isPreOrderFlow) {
                this.isMnp = true;
              }
            }
          }
        }

        this.cart.grossTotal = this.itemsTotal + parseFloat(this.cart.GST);
        if (this.cart && parseInt(this.cart.grossTotal, 10) === 0) {
          this.isMnp = true;
        }

      });
  }

  isActive(tab): string {
    if (this.router.url === tab) {
      return 'is-step-active';
    } else {
      if (this.router.url === "/store/checkout/summary") {
        return 'is-step-done';
      } else {
        return '';
      }
    }
  }

  getMnpClass(): any {
    if (this.isMnp) {
      return 'is-mnp';
    } else {
      return '';
    }
  }

}

