import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from "../../../Service/cart.service";
import { BaseComponent } from '../../../base.component';
import { Cart } from '../../../Model/cart.model';
import { CartItem } from '../../../Model/cart-item.model';
import * as ApiConstant from '../../../../constants/estoreEndPoint.constants';
import { AppService } from '../../../Service/app.service';
import { UserService } from '../../../Service/user.service';

@Component({
  selector: 'session-timeout-popup-component',
  templateUrl: './session-timeout-popup.html',
  styleUrls: ['./session-timeout-popup.css'],
  providers: [CartService]
})

export class SessionTimeOutPopupComponent extends BaseComponent implements OnInit {
  @Input() data: any;
  @Output() OnContinueMySession = new EventEmitter();
  @Input() logout: any;
  @Input() formSubmitted: any;
  public cart: any = {};
  cartResponse: any;
  logoutPopup = false;


  constructor(
    private cartService: CartService,
    private _appService: AppService,
    private _userService: UserService
    ) {
    super();
  }

  ngOnInit() {
  }

  public ContinueMySession() {
    this.OnContinueMySession.emit();
  }

  public redirectItemSelection(itemDetails, cartItem) {
    let cartItemUnservation;
    if (localStorage && localStorage.getItem("cartDetailsUnservation")) {
      cartItemUnservation = JSON.parse(localStorage.getItem("cartDetailsUnservation"));
    }
    const cartItemArray = [];
    cartItemUnservation.all_items.forEach(element => {
      const cartItem = new CartItem();
      cartItem.item_id = element.item_id;
      cartItem.itemTotal = element.itemTotal;
      cartItem.price = element.price;
      cartItem.quantity = element.quantity;
      cartItem.selectedProduct = element.selectedProduct;
      cartItem.sku = element.sku;
      cartItem.skuBundle = element.sku_bundle;
      cartItem.isPreorder = element.is_preorder;
      cartItem.easyPhoneLabel = element.easyphone_label;
      cartItem.availabilityFlag = element.preorder_availability_flag;
      cartItem.has_add_ons = element.has_add_ons;
      cartItem.is_broadband = element.is_broadband;
      cartItemArray.push(cartItem);
    });
    this.cart = new Cart();
    this.cart.items = cartItemArray;
    setTimeout(() => {
      this.cartService.editCartItem(0, this.cart.items, cartItemUnservation);
      // Remove cart details after pre-selction, from localstorage.
      if (localStorage && localStorage.getItem("cartDetailsUnservation")) {
        localStorage.removeItem("cartDetailsUnservation");
      }
    }, 1000);
    this.removeCartItem(cartItemArray[0]);
  }

  public redirectToHome() {
    this._userService.Redirect("/store/devices");
  }

  removeCartItem(product: any) {
    this.cartService.removeProductFromCart(product);
    if (localStorage && localStorage.getItem('COBP_FLOW') === 'YES') {
      localStorage.removeItem("COBP_FLOW");
    }
  }
  public callUserLogout () {
    this._userService.UserLogout();
  }
}
