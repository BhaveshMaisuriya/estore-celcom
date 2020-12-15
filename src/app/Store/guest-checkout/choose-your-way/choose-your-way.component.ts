import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '../../../base.component';
import { AppService } from '../../../Service/app.service';

@Component({
  selector: 'app-choose-your-way',
  templateUrl: './choose-your-way.component.html',
  styleUrls: ['./choose-your-way.component.css'],
  providers: []
})

export class ChooseYourWayComponent extends BaseComponent implements OnInit {
  @Input() chooseYourWay: boolean;
  @Output() hideChooseWay = new EventEmitter();

  constructor(
    private _router: Router,
    // private _activatedRoute: ActivatedRoute,
    private appService: AppService,
  ) {
    super();
  }

  ngOnInit() {
  }

  guestCloseModal() {
    this.hideChooseWay.emit();
  }

  redirectLogin(type?: string) {
    this.hideChooseWay.emit();
    if (type === 'guest') {
      this._router.navigateByUrl('/store/guest/login');
    } else {
      if (typeof window !== 'undefined') {
        if (sessionStorage && sessionStorage.getItem("USER_TYPE") && sessionStorage.getItem("GuestInfo") &&
          localStorage.getItem("GUEST_CART_ID")) {
          sessionStorage.removeItem("USER_TYPE");
          sessionStorage.removeItem("GuestInfo");
          // localStorage.removeItem("GUEST_CART_ID");
        }
      }
      this._router.navigateByUrl('/store/login');
    }
  }
}
