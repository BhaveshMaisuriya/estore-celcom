import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';

@Component({
  selector: 'app-esim',
  templateUrl: './esim.component.html',
  styleUrls: ['./esim.component.css']
})
export class EsimComponent implements OnInit, AfterViewInit {
  isCSAgentDealer = false;
  loading = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2
  ) { }

  ngOnInit() {
    this.loading = false;
    if (typeof window !== "undefined" && sessionStorage && (sessionStorage.getItem("AgentInfo") || sessionStorage.getItem("DealerInfo"))) {
      this.isCSAgentDealer = true;
    }
  }
  ngAfterViewInit() {
    const currentUrl: string = this._router.routerState.snapshot.url;
    this._activatedRoute.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
  }
}
