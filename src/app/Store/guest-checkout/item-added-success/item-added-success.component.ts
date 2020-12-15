import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../base.component';
import { GuestCheckoutService } from '../services/guest-checkout.service';

@Component({
  selector: 'item-added-success',
  templateUrl: './item-added-success.component.html',
  styleUrls: ['./item-added-success.component.css'],
  providers: []
})

export class ItemAddedSuccessComponent extends BaseComponent {
  mnpFlow = false;
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _guestService: GuestCheckoutService
  ) {
    super();
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && localStorage && localStorage.getItem('MNP-FLOW') === 'YES') {
      this.mnpFlow = true;
    }
  }

  redirectToCart() {
    this._guestService.setItemAddedStatus(false);
    //this._router.navigateByUrl('/store/cart');
    this.Redirect("/store/cart");
  }

  public continueShopping() {
    //both for Device and plan
    //this._router.navigateByUrl("/");
    this.Redirect("/store/devices");
  }
  public Redirect(url: string) {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }
}
