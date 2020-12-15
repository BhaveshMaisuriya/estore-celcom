import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-agent-landing',
  templateUrl: './agent-landing.component.html',
  styleUrls: ['./agent-landing.component.scss']
})
export class AgentLandingComponent implements OnInit, AfterViewInit {
  production = environment.production;
  showPlans = false;
  agentType: 'dealer' | 'csAgent';
  errorDealer;
  errorRedirect;
  dealerMessage;
  loading = false;
  subscriber: Subscription;
  refid = '';
  isBrowser;

  isOnlyGamification: boolean = false;
  addGamification: boolean = false;

  salesLinks = [
    {
      label: 'Device Bundle',
      url: 'store/devices',
    },
    {
      label: 'Celcom MEGA&trade;',
      url: 'plans/mega',
    },
    {
      label: 'XP Lite&trade;',
      url: 'plans/xp-lite',
    },
    {
      label: 'Prepaid Plans',
      url: 'plans/prepaid/Xpax'
    },
    {
      label: 'Celcom InternetGO',
      url: 'plans/celcom-internetgo'
    }
  ];

  constructor(
    private _router: Router,
    private _deviceDataService: DeviceDataService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    ) {
      this.isBrowser = isPlatformBrowser(platformId);
     }

  formatSalesLink(link): string {
    return `${this.document.location.protocol}//${this.document.location.hostname}/${link}?refid=${this.refid}`;
  }

  ngOnInit() {
    this.loading = true;
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(data => {
      this.errorDealer = data;
      if(data === false && this.errorRedirect === true) this._router.navigate(["/store/devices"]);
    });
    if (!(sessionStorage && sessionStorage.getItem("DealerInfo")) && window.location.href.indexOf('store/dealerlandingpage') > -1) {
      this.errorDealer = true;
      this.errorRedirect = true;
      this.dealerMessage = {
        title: 'Uh Oh!',
        content: "Please login as a dealer to be able to access this page",
        button: 'Got it!',
      };
      return;
    }
    this.loading = false;
    if (this.isBrowser) {
      const dealer = JSON.parse(sessionStorage.getItem("DealerInfo"));
      this.refid = dealer?.refrence_id;
    }
  }

  ngAfterViewInit() {
    if (typeof window !== "undefined" && sessionStorage) {
      this.agentType = sessionStorage.getItem("AgentInfo")
        ? "csAgent"
        : sessionStorage.getItem("DealerInfo")
          ? "dealer"
          : undefined;
      
      const agentInfo               = JSON.parse(sessionStorage.getItem("DealerInfo"));
      const isDealer: boolean       = (this.agentType === "dealer");
      const iso2oEnabled: boolean   = !!(agentInfo?.o2o_enabled);
      const isGameEnabled: boolean  = !!(agentInfo?.gamification_enabled);

      /** Need to remove these lines ### */
      //const iso2oEnabled = true;
      //const isGameEnabled = true;
      /** Need to remove these lines ### */
      
      // add gamification to existing flow
      this.addGamification = isDealer && iso2oEnabled && isGameEnabled;

      // add gamification only
      this.isOnlyGamification = isDealer && !iso2oEnabled && isGameEnabled;
      this.showPlans = this.isOnlyGamification ? false : this.showPlans;

      this.cdr.detectChanges();
    }
  }

  redirectGameEligibilityCheck() {
    this.navigateByURL('/store/game-eligibility-check');
  }

  Redirect(url: string) {
    window.location.href = url;
  }
  navigateByURL(url: string) {
    this._router.navigate([url]);
  }

  onBundleClick() {
    this.Redirect("/store/devices");
  }

  onPrepaidClick() {
    this.Redirect("/plans/prepaid/Xpax");
  }

  onPlanClick(plan) {
    switch (plan) {
      case "postpaid":
        if (this.production) {
          if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("AgentInfo")) {
            this.Redirect("/personal/postpaid");
          } else {
            this.Redirect("https://www.celcom.com.my/personal/postpaid");
          }
        } else {
          this.Redirect("/personal/postpaid");
        }
        break;
      case "xpax":
        this.Redirect("/plans/xp-lite");
        break;
      case "mega":
        this.Redirect("/plans/mega");
        break;
      case "celcom-internetgo":
        this.Redirect("/plans/celcom-internetgo");
        break;
      default:
        break;
    }
    this.showPlans = !this.showPlans;
  }
  onHomewirelessClick() {
    this.Redirect('/broadband/home-wireless');
  }
  onMonetizationTabClick() {
    this.navigateByURL('/campaign/monetization');
  }
  onRetentionTabClick() {
    this.navigateByURL('/campaign/retention');
  }
}
