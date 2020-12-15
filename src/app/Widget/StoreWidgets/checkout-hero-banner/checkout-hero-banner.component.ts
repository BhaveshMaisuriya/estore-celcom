import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ContentNavigation } from '../../../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../../../Service/redirection.service';
import { CheckoutHeroBannerService } from '../checkout-hero-banner/checkout-hero-banner.service';

@Component({
  selector: 'app-checkout-hero-banner',
  templateUrl: './checkout-hero-banner.component.html',
  styleUrls: ['./checkout-hero-banner.component.css'],
  providers: [CheckoutHeroBannerService, RedirectionService]
})
export class CheckoutHeroBannerComponent implements OnInit {

  @Input() data: any;
constructor(private checkoutHeroBannerService: CheckoutHeroBannerService,
private _router: Router,
private _activatedRoute: ActivatedRoute,
private _redirectionService: RedirectionService) {
}

ngOnInit() {
}

public ManageContentNavigation(data: any) {
const obj = new ContentNavigation().ManagePageRedirection(data);
this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
}

}
