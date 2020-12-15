import { Component, OnInit, AfterViewInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanTableComparisionService } from '../../../Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { EnterpriseService } from '../enterprise.service';
import { EStoreAnalysticsService } from '../../../Service/store.analytic.service';
import { finalize } from 'rxjs/operators';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-enterprise-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  providers: [PlanTableComparisionService],
  encapsulation: ViewEncapsulation.None
})
export class EnterpriseLandingComponent implements OnInit {
  plansError = false;
  showPopup = false;
  showMultiplePlans = false;
  isMultiplePlans = false;
  organization = '';
  plans = [];
  popupData = {
    title: 'Error!',
    content: 'Something went wrong!',
    button: 'OK',
  };
  isLoading = true;
  defaultPlan = '';
  showDeviceMenu = false;
  showPlanMenu = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanTableComparisionService,
    private _service: EnterpriseService,
    private _deviceDataService: DeviceDataService,
    private _estoreAnalyticsService: EStoreAnalysticsService,
    private _renderer: Renderer2,
  ) { }

  ngOnInit() {
    const currentUrl: string = this._route.snapshot.url.join('');
    this._route.data.subscribe((item: any) => {
      this._estoreAnalyticsService.ManageAnalytics(this._renderer, currentUrl, item);
    });
    try {
      const user = JSON.parse(sessionStorage.getItem('UserInfo'));
      this.organization = user['outputCPResp']['organization'];
    } catch (_error) {

    }
    forkJoin([
      this._planService.Find("/rest/V1/planproductlist/4/0?agenttype=enterprise"),
      this._planService.Find("/rest/V1/shopdevices?agenttype=enterprise")
    ])
      .pipe(finalize(() => this.isLoading = false))
      .subscribe(([plans, devices]) => {
        try {
          this.plans = plans;
          this.defaultPlan = this.getDefaultPlanURL(plans[0]);
          this.isMultiplePlans = plans.length > 1;
          sessionStorage.setItem('enterprise_plan', this.defaultPlan + '');
          this.plansError = false;
          this.showPlanMenu = true;
        } catch (_error) {
          this.plansError = true;
          this.showPlanMenu = false;
        }
        try {
          if (devices.length === 0) {
            this.showDeviceMenu = false;
          } else {
            this.showDeviceMenu = true;
          }
        } catch (_error) {
        }
        if (!this.showPlanMenu && !this.showDeviceMenu) {
          this.popupData = {
            title: 'Error!',
            content: `Server error or no devices and plans available for your organization`,
            button: 'OK',
          };
          this.showPopup = true;
        }
      });
    this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(status => {
      if (status === false) {
        this.showPopup = false;
      }
    });
    const userType = sessionStorage.getItem("USER_TYPE");
    if (sessionStorage && userType !== 'ENTERPRISE') {
      this._router.navigate(["/store/devices"]);
    }
  }

  onPlanClick() {
    if (this.isLoading) return false;
    if (this.isMultiplePlans) {
      this.showMultiplePlans = !this.showMultiplePlans;
      return false;
    }
    if (this.plansError === true) {
      this.popupData = {
        title: 'Error!',
        content: 'Server error or no plans available for your organization',
        button: 'OK',
      };
      this.showPopup = true;
      return false;
    } else {
      this._router.navigateByUrl(this.defaultPlan);
    }
  }

  redirectToLoginPage() {
    this._router.navigate(['/store/enterprise/login']);
  }

  CloseMultiplePlans = () => this.showMultiplePlans = false;

  onListClick = (plan) => this._router.navigateByUrl(this.getDefaultPlanURL(plan));

  getDefaultPlanURL = (plan) => plan['taburl'];
}
