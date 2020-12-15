import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ViewOrderPaymentComponent } from '../view-order-payment/view-order-payment.component';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
@Component({
  selector: 'app-vieworder',
  templateUrl: './view-order-home.component.html',
  styleUrls: ['./view-order-home.component.css']
})
export class ViewOrderHomeComponent implements OnInit, AfterViewInit {
  public isCSAgentDealer = false;
  constructor(@Inject(DOCUMENT) private document,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2) { }

  ngOnInit() {
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
  }
  ngAfterViewInit() {
  }

}
