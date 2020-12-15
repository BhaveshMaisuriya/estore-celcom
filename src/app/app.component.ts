import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RoutesService } from "./Service/routes.service";
import { HomeService } from './Service/home.service';
import { AfterViewInit, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppService } from "./Service/app.service";
import { SessionTimeOutService } from "./Service/sessiontimeout.service";
import { NotificationPopupEvent } from "./Service/broadcaster.service";
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { RemarketAnalyticsService } from './Service/remarket-analytics.service';
import { GetParametersService } from './Service/getParamaters.service';
import { UserService } from './Service/user.service';
import { DeviceDataService } from './Service/devicedata.service';
import { Subscription, combineLatest } from "rxjs";
import { ProfileDetail } from 'celcom-common-angular-lib-estore';
import { ModalService } from './shared/components/modal/modal.service';
import { HeaderService } from './Header/header.service';
import { GuestCheckoutService } from './Store/guest-checkout/services/guest-checkout.service';
import { isNullOrUndefined } from 'app/shared/utilities/helper.ultility';
import { truncateString } from './shared/utilities/helper.ultility';
import { filter, finalize, map, mergeMap } from 'rxjs/operators';
import { ServiceWorkerUpdate } from './Service/sw-update.service';
import { untilDestroyed } from './shared/services/until-destroyed.service';
import { SeoService } from './Service/seo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SessionTimeOutService, NotificationPopupEvent, HomeService, RemarketAnalyticsService]
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  componetData: any;
  RoutesData: any;
  adaRemainingDays: any;
  adaSource = "ADA";
  adaFbSource = "ADAFB";
  adaGgSource = "ADAGG";
  isNotificationOpen: any;
  public IsDisplayIdlePopup = false;
  isStateBrowser =  false;
  agentDealerUrl = false;
  logout: any = {};
  subscriber: Subscription;
  showConnectivityBlock = false;
  internetConnectivityStatusMessage = "Back to online";
  internetConnectivityStatusClass = "online";
  host = '';
  loginFlag: boolean = false;
  isEkycPage = false;
  popupStyle = {
    'visibility': 'hidden'
  };

  nonLoggedinMenus: ProfileDetail = {
    title: 'My Accounts',
    onLinkClick: this.onMenuClick.bind(this),
    items: [
      {
        key: 'login-shop',
        iconUrl: '/assets/img/header/Shopping Bag V1.svg',
        title: 'Online Shop',
      },
      {
        key: 'ocs',
        iconUrl: '/assets/img/header/Plan.svg',
        title: 'Online Customer Service',
      },
    ]
  };

  /**
   * MC = Mobile Connect
   */
  MCMenus: ProfileDetail = {
    title: 'My Accounts',
    onLinkClick: this.onMenuClick.bind(this),
    items: [
      {
        isDivider: true,
        title: 'Online Shop',
      },
      {
        key: '/store/viewmyprofile',
        iconUrl: '/assets/img/header/Profile Settings.svg',
        title: 'My Profile',
        onLinkClick: this.onMenuClick.bind(this),
      },
      {
        key: '/store/profile/vouchers',
        iconUrl: '/assets/img/header/Rewards.svg',
        title: 'My Vouchers',
        onLinkClick: this.onMenuClick.bind(this),
      },
      {
        key: '/store/account/order-history',
        iconUrl: '/assets/img/header/Orders.svg',
        title: 'Order History',
        onLinkClick: this.onMenuClick.bind(this),
      },
      {
        key: 'logout',
        iconUrl: '/assets/img/header/Logout.svg',
        title: 'Logout',
        onLinkClick: this.LogoutUser.bind(this),
      },
      {
        isDivider: true,
        title: 'Online Customer Service',
      },
      {
        key: 'ocs',
        iconUrl: '/assets/img/header/Plan.svg',
        title: 'Manage My Celcom',
        onLinkClick: this.gotoOCS.bind(this),
      },
    ]
  };

  EnterpriseMenus = {
    ...this.MCMenus,
    items: this.MCMenus.items.filter(a => [
      '/store/viewmyprofile',
      '/store/account/order-history',
      'logout',
    ].includes(a.key))
  };

  DealerMenus = {
    ...this.MCMenus,
    items: this.MCMenus.items.filter(a => [
      '/store/viewmyprofile',
      '/store/account/order-history',
      'logout',
    ].includes(a.key))
  };

  AgentMenus = {
    ...this.MCMenus,
    items: this.MCMenus.items.filter(a => [
      '/store/viewmyprofile',
      '/store/account/order-history',
      'logout',
    ].includes(a.key))
  };

  GuestMenus = {
    ...this.MCMenus,
    items: this.MCMenus.items.filter(a => [
      'logout',
    ].includes(a.key))
  };

  profileData: ProfileDetail = {
    ...this.nonLoggedinMenus,
  };

  subscription;
  isBrowser: boolean;


  get sideBarMini() {
    return this._userService.isCSAgent() || this._userService.isDealer();
  }


  constructor( @Inject(DOCUMENT) private document: any,
    @Inject(PLATFORM_ID)  public platformId: any,
    private _appService: AppService,
    private _sessionTimeOutService: SessionTimeOutService,
    private _brodcastService: NotificationPopupEvent,
    private _homeService: HomeService,
    private cookieService: CookieService,
    private getParamsService: GetParametersService,
    private _routerService: RoutesService,
    private _router: Router,
    private _remarketAnalyticsService: RemarketAnalyticsService,
    private _userService: UserService,
    private _deviceDataService: DeviceDataService,
    private _modalService: ModalService,
    private _headerService: HeaderService,
    private _guestService: GuestCheckoutService,
    private route:ActivatedRoute,
    private sw: ServiceWorkerUpdate,
    private seoService: SeoService,
    ) {
    this.checkNetworkConnectivity();
    this.subscriber = this._deviceDataService.sharedMCTnCPopUpStyle$.subscribe(data => {
      this.setMCTncPopUpStyle(data);
    });
    if (typeof window !== 'undefined' ) {
      const pageUrl = window.location.href;
      const pagePath = window.location.pathname;

      if (pageUrl.indexOf("store/agentlogin") > -1 || pageUrl.indexOf("store/agentlandingpage") > -1 ||
      pageUrl.indexOf("store/agentSearchOrder") > -1 || pageUrl.indexOf("store/dealerlogin") > -1 ||
        (sessionStorage && sessionStorage.getItem("AgentInfo")) || (sessionStorage && sessionStorage.getItem("DealerInfo"))) {
        this.agentDealerUrl = true;
      }
    }
    this.RegisterBrodcast();
    if (typeof window !== 'undefined') {
      this.FindAdobeFromDB();
    }
    this.host = _appService.host;
    this.isBrowser = isPlatformBrowser(platformId);

    /**
     * Capture dealer reference ID
     */
    if (this.isBrowser) {
      route.queryParams.subscribe(p => {
        if (p?.refid) {
          sessionStorage.setItem('refid', p?.refid)
        }
      });
    }
  }

  setMenuActiveKey(key) {
    this.profileData = {
      ...this.profileData,
      activeKey: key,
    }
  }

  onMenuClick(data) {
    switch (data) {
      case 'login-shop':
        this.setMenuActiveKey(data);
        this._modalService.open('mc-login');
        break;

      case 'logout':
        this.setMenuActiveKey(data);
        this.LogoutUser();
        break;

      case 'ocs':
        this.gotoOCS();
        break;

      default:
        this.setMenuActiveKey(data);
        window.location.href = data;
        break;
    }
  }

  gotoOCS() {
    if (this.isBrowser) {
      window.location.href = 'https://ocs.celcom.com.my/servicecenter/faces/oracle/webcenter/portalapp/pages/selfservice/slogin.jspx';
    }
  }

  onLoginSuccess() {
    this._modalService.close('mc-login');
    
    // ? aftersuccessfulllogin refreshing the page
    this.refreshAfterLogin();
  }

  refreshAfterLogin() {
    const currentURL = this._router.url.split('?')[0];

    if (this.route.snapshot.queryParams?.login) {
      // ? Clone the object, so that delete operator
      // ? doesn't mutate the original query object
      const queryParams = { ...this.route.snapshot.queryParams };

      // ? removing login queryparam before refreshing the page
      delete queryParams['login'];

      const queryString = Object.entries(queryParams)
        ?.map(([ key, value ]) => `${ key }=${ value }`)
        ?.join('&');

      window.location.href = `${ currentURL }?${ queryString }`;
    }
  }

  updateUsername(_name) {
    let name = `Hi, ${_name}`;
    if (isNullOrUndefined(_name)) {
      name = 'My Accounts';
    }
    if (this._userService.isMCUser()) {
      this.profileData = {
        ...this.MCMenus,
      }
    } else if (this._userService.isCSAgent()) {
      this.profileData = {
        ...this.AgentMenus,
        items: [
          {
            key: 'store/agentlandingpage',
            iconUrl: '/assets/img/header/Shopping Bag V1.svg',
            title: 'Home',
            onLinkClick: this.LogoutUser.bind(this),
          },
          ...this.AgentMenus.items
        ],
      }
    } else if (this._userService.isDealer()) {
      this.profileData = {
        ...this.DealerMenus,
        items: [
          {
            key: 'store/dealerlandingpage',
            iconUrl: '/assets/img/header/Shopping Bag V1.svg',
            title: 'Home',
            onLinkClick: this.LogoutUser.bind(this),
          },
          ...this.DealerMenus.items
        ],
      }
    } else if (this._userService.isUserEnterprise()) {
      this.profileData = {
        ...this.EnterpriseMenus,
      }
    } else if (this._userService.isGuest()) {
      this.profileData = {
        ...this.GuestMenus,
      }
    }
    this.profileData = {
      ...this.profileData,
      title: truncateString(name),
    }
  }

  get userType(){
    return sessionStorage ? sessionStorage.getItem("USER_TYPE") : null;
  }

  getUsernameFromSession() {
    if (this.isBrowser) {
      let name;
      if (sessionStorage.getItem("UserInfo")) {
        name = (JSON.parse(sessionStorage.getItem("UserInfo"))).outputCPResp.name;
      }
      if (this.userType == 'GUEST') {
        name = this.userType;
      }
      if (this._userService.isDealer()) {
        const dealerInfor = JSON.parse(sessionStorage.getItem('DealerInfo'));
        if (dealerInfor) {
          name = dealerInfor.agent_name;
        }
      }
      this.updateUsername(name);
    }
  }

  ngOnInit() {
    this.isStateBrowser = this.isCurrentPlatformStateBrowser();
    this.adaIntoHeader();
    this._remarketAnalyticsService.LoadUniversalScripts();
    this.subscription = this._headerService.updateUserName$.subscribe(data => {
      this.updateUsername(data);
    });
    this._router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        const url = val.url.split('?')[0];
        this.isEkycPage = url === '/e-kyc';
      }
    });
    this.subscription = this._guestService.guestUsernameChanged.subscribe(
      () => {
        const name = this._guestService.getGuestUserName();
        this.updateUsername(name);
      }
    );
    this.subscription = this._deviceDataService.sharedLoggedInUserName$.subscribe(data => {
      this.getUsernameFromSession()
    });
    combineLatest([
      this.route.params,
      this.route.queryParams,
    ]).pipe(
      untilDestroyed(this),
    )
    .subscribe(([ params, queryParams ]) => {
      this.loginFlag = queryParams?.login;
      if (this.loginFlag) {
        if (!this._userService.isCustomer()) {
          this._modalService.open('mc-login');
        } else {
          this.refreshAfterLogin();
        }
      }
    });
    this.getUsernameFromSession();
    this.getSeoMetaTagsInfo();
  }
  getSeoMetaTagsInfo() {
    this._router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e=> this.route),
      map((route) => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data),
    ).subscribe(data => {
      console.error(data);
      let seoData = data['seo'];
      this.seoService.updateTitle(seoData['title']);
      this.seoService.updateMetaTags(seoData['metaTags']);
    });
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(ev: Event) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    ev.preventDefault();
  }

  onNotificationChange(isNotificationOpen) {
    this.isNotificationOpen = isNotificationOpen;
  }

  isCurrentPlatformStateBrowser() {
    return  isPlatformBrowser(this.platformId) ;
  }

  ngAfterViewInit(): void {
    this.ManageIdleCheck();
    this.forceFulLogoutForDealer();
    if (this.isBrowser) {
      setTimeout(() => {
        // check the service worker for updates
      this.sw.checkForUpdates();
      }, 500);
    }
  }

  private InjectHeaderFooterScript(data: any) {
    this._homeService.ManageConfigurableScripts(data);
  }

  private FindAdobeFromDB() {
    this._routerService.FindAdobeFromDB().subscribe((data: any) => {
      if (data.GlobalSettings != null && data.GlobalSettings.length > 0) {
        this.InjectHeaderFooterScript(data.GlobalSettings);
      }
    });
  }
  adaIntoHeader() {
    const utm_source = this.getParamsService.getParameterByName('utm_source');
    this.adaRemainingDays = {};
    this.adaRemainingDays.name = utm_source;
    if (utm_source === null && this.cookieService.check('adaRemainingDays')) {
      this.adaRemainingDays = JSON.parse(this.cookieService.get('adaRemainingDays'));
    }
     // ADA Google Tag Manager/Accelerator.
    if (this.adaRemainingDays.name === this.adaSource) {
      const adaObj = [];
      const headerScript = 'header_script_block';
      const adaValue = `(function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
          'gtm.start':
            new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-5P3NJV7');`;
      const bodyScript = 'body_noscript_block';
      const bodyValue = `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5P3NJV7" height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
      adaObj.push({
        type: headerScript,
        value: adaValue
      });
      adaObj.push({
        type: bodyScript,
        value: bodyValue
      });
      this.InjectHeaderFooterScript(adaObj);
    }
    // ADA facebook pixel.
    if (this.adaRemainingDays.name === this.adaFbSource) {
      const adaObj = [];
      const headerFb = 'header_script_block';
      const valueFb = `!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window,document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
       fbq('init', '222287968473810');
       fbq('track', 'PageView');`;
       const noScriptFb = 'header_noscript_block';
       const noScriptValue = `<img height="1" width="1" src="https://www.facebook.com/tr?id=222287968473810&ev=PageView&noscript=1"/>`;
      adaObj.push({
        type: headerFb,
        value: valueFb
      });
      adaObj.push({
        type: noScriptFb,
        value: noScriptValue
      });
      this.InjectHeaderFooterScript(adaObj);
    }
    // ADA google pixel.
    if (this.adaRemainingDays.name === this.adaGgSource) {
      const adaObj = [];
      const headerGg = 'header_script';
      const valueGg = `<script type="text/javascript" async src="https://www.googletagmanager.com/gtag/js?id=AW-779416403"></script>`;
      const headerScriptGg = 'header_script_block';
      const headerScriptGgValue = ` window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'AW-779416403');`;
      adaObj.push({
        type: headerGg,
        value: valueGg
      });
      adaObj.push({
        type: headerScriptGg,
        value: headerScriptGgValue
      });
      this.InjectHeaderFooterScript(adaObj);
    }
  }

  private ManageIdleCheck() {
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && sessionStorage) {
      if (this._userService.isDealer() && this._userService.isMCUser()) {
        this._sessionTimeOutService.RegisterEventListnerForIdleCheck("dealer");
      } else if (this._userService.isDealer() || this._userService.isCSAgent() ||
        this._userService.isMCUser() || this._userService.isGuest()) {
      // call after login..
        this._sessionTimeOutService.RegisterEventListnerForIdleCheck("user");
     }
    }
  }
  private RegisterBrodcast() {
    const self = this;
    this._brodcastService.on().subscribe((data: any) => {
      if (data.Action === "DISPLAY_POPUP") {
          setTimeout(function () {
            self.IsDisplayIdlePopup = true;
            self.logout = false;
          }, 0);
      }
    });
  }

  public OnContinueMySession() {
    const self = this;
    setTimeout(function () {
      self.IsDisplayIdlePopup = false;
    }, 0);
  }

  public forceFulLogoutForDealer() {
    const currentTime = Date.now();
    if (typeof window !== 'undefined' && localStorage && sessionStorage && localStorage.getItem("orderTime") &&
      sessionStorage.getItem("UserInfo") && sessionStorage.getItem("DealerInfo") && sessionStorage.getItem("UserToken")) {
      const orderTime = JSON.parse(localStorage.getItem("orderTime"));
      const diff = ((currentTime - orderTime) / 1000);
      if (diff > 115) {
        this.IsDisplayIdlePopup = true;
        this.logout = true;
      }
    }
  }
  onTCAgree() {
    this._deviceDataService.publishMCTnCPopUpStyle('callOnTCAgree');
  }
  setMCTncPopUpStyle(style) {
    this.popupStyle = {
      'visibility': style
    };
  }
  showStatus(online) {
    if (online) {
      this.internetConnectivityStatusMessage = "Back to online";
      this.internetConnectivityStatusClass = "online";
    } else {
      this.internetConnectivityStatusMessage = "Uh-oh, there is no internet connection. Please connect to the internet and try again";
      this.internetConnectivityStatusClass = "offline";
    }
  }
  checkNetworkConnectivity() {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        // 1st, we set the correct status when the page loads
        navigator.onLine ? this.showStatus(true) : this.showStatus(false);
        // now we listen for network status changes
        window.addEventListener('online', () => {
          this.showConnectivityBlock = true;
          this.showStatus(true);
        });
        window.addEventListener('offline', () => {
          this.showConnectivityBlock = true;
          this.showStatus(false);
        });
      });
    }
  }

  CloseConnectivityBlock() {
    this.showConnectivityBlock = false;
  }

  public LogoutUser() {
    let headerUrl = '/home';
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("UserToken") !== undefined) {
      let apiUrl = "/rest/V1/customerLogout";
      if (localStorage && localStorage.getItem('sessionHash')) {
        apiUrl = apiUrl + '?sessionHash=' + localStorage.getItem('sessionHash');
      }
      const isEnterpriseUser = this._userService.isUserEnterprise();
      this._appService.getEstoreUserData(apiUrl)
        .pipe(
          finalize(() => {
            this._headerService.ClearAllStorages();
            this.updateUsername(null);
            if (isEnterpriseUser)
              window.location.href = '';
            else
              window.location.href = headerUrl;
          })
        )
        .subscribe(
        (response: any) => {
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
            localStorage.removeItem("numberReservationId");
          }
        });
    } else {
      this._headerService.ClearAllStorages();
      this.updateUsername(null);
      window.location.href = headerUrl;
      // this.ReloadHomePage();
    }
  }

  ngOnDestroy(): void {
    // throw new Error('Method not implemented.'); // this stops from redirecting
  }

}
