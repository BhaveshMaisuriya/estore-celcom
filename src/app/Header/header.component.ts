import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HeaderService } from './header.service';
import { Observable ,  Subscription } from 'rxjs';
import { ContentNavigation } from '../Model/contentnavigation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RedirectionService } from '../Service/redirection.service';
import { OldSubNavigationComponent as SubNavigationComponent } from './SubNavigation/subnavigation.component';
import { GuestCheckoutService } from '../Store/guest-checkout/services/guest-checkout.service';
import { AppService } from '../Service/app.service';
import { DeviceDataService } from '../Service/devicedata.service';
import { UserService } from '../Service/user.service';
import { environment } from 'environments/environment';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HeaderService, RedirectionService, AppService]
})

export class HeaderComponent implements OnInit, OnDestroy {
  @Input() isNotificationOpen = false;
  subscription;
  portalFrontEndURL: string = environment.portalFrontEndURL;
  eStoreFrontEndUrl: string = environment.eStoreFrontEndUrl;
  production: string = environment.production;
  GlobalNavigationInfo: any;
  SubNavigationData: any;
  IsInitiateSubNavigation = false;
  IsActiveClassVisible = true;
  SubNavigationComponentObj: SubNavigationComponent;
  public CurrentParentMenu: string;
  public SearchText = "";
  public subscriber: Subscription;
  public toggleMenu = false;
  public toggleSearch = false;
  public UserLoginName = null;
  public logoutData: any;
  public selected = '';
  public InternalLinkArray: string[] = ['personal'];
  public loginUrl = 'https://www.login.celcom.com.my/store/';
  public storeUrl = 'https://www.store.celcom.com.my/store/';
  public searchUrl = 'search';
  public homePageUrl = '/home';
  public loginPageUrl = '/store/login';
  dataAnalyticsRegion: any;
  constructor(private _service: HeaderService,
    private _router: Router,
    private _deviceDataService: DeviceDataService,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService,
    private _guestService: GuestCheckoutService,
    private _AppService: AppService,
    private _userService: UserService
  ) {
    this.SubNavigationComponentObj = new SubNavigationComponent(this._router, this._activatedRoute, this._redirectionService);
    this.subscriber = this._service.updateUserName$.subscribe(data => {
      this.UserLoginName = data;
    });
    this.subscription = this._guestService.guestUsernameChanged.subscribe(
      () => {
        this.UserLoginName = this._guestService.getGuestUserName();
      }
    );
    this.subscription = this._deviceDataService.sharedLoggedInUserName$.subscribe(data => {
      if (data) {
      this.updateUserName();
      }
    });
  }

  get userType(){
    return sessionStorage ? sessionStorage.getItem("USER_TYPE") : null;
  }

  ngOnInit() {
    this.dataAnalyticsRegion = "Header";
    this.subscriber = this._deviceDataService.guestName$.subscribe(data => {
      this.UserLoginName = data;
    });
    this.Init();
  }

  private Init() {
    this._service.FindGlobalNavigation().subscribe((data) => {
      /* Updating the all the links to external links except E-Store related links
      * This will make sure the absolute paths are considered for the other links.
      */
      // Enable absolute store link for prod
      // this.flag = true;
      // if (this.production) {
      //   this.updateExternalFlagAndURLs(data);
      // }
      // this.GlobalNavigationInfo = data;
      // const currentUrl = this._router.routerState.snapshot.url.slice(1).toLowerCase();
      // const isPersonal = this.IsUrlContainsPersonalLink(currentUrl);
      // const isBusiness = this.IsUrlContainsBusinessLink(currentUrl);
      // if (isPersonal) {
      //   this.ActivateSubNavigationOnLoad(this.GlobalNavigationInfo[0], 0);
      // }
      // if (isBusiness) {
      //   this.ActivateSubNavigationOnLoad(this.GlobalNavigationInfo[1], 1);
      // }
      // if (!isPersonal && !isBusiness) {
      //   this.ActivateSubNavigationOnLoad(this.GlobalNavigationInfo[0], 0);
      // }
      this.GlobalNavigationResponseBinding(data);

    });
    // subscribe when login
    if ((!this.UserLoginName || this.UserLoginName !== '') && sessionStorage) {
      if ((this._userService.isMCUser() || ['ENTERPRISE', 'GUEST'].includes(this.userType)) && sessionStorage.getItem("UserInfo")) {
        this.UserLoginName = (JSON.parse(sessionStorage.getItem("UserInfo")))?.outputCPResp?.name || 'GUEST';
      } else if (this._userService.isGuest() && sessionStorage.getItem("USER_TYPE")) {
        this.UserLoginName = sessionStorage.getItem("USER_TYPE");
      }
    }
  }

  public GlobalNavigationResponseBinding(data) {
      if (this.production) {
        this.updateExternalFlagAndURLs(data);
      }
      this.GlobalNavigationInfo = data;
      const currentUrl = this._router.routerState.snapshot.url.slice(1).toLowerCase();
      const isPersonal = this.IsUrlContainsPersonalLink(currentUrl);
      const isBusiness = this.IsUrlContainsBusinessLink(currentUrl);
      if (isPersonal) {
        this.ActivateSubNavigationOnLoad(this.GlobalNavigationInfo[0], 0);
      }
      if (isBusiness) {
        this.ActivateSubNavigationOnLoad(this.GlobalNavigationInfo[1], 1);
      }
      if (!isPersonal && !isBusiness) {
        this.ActivateSubNavigationOnLoad(this.GlobalNavigationInfo[0], 0);
      }
  }
  public IsUrlContainsPersonalLink(url: string): boolean {
    const result: boolean = url.indexOf('personal') > -1;
    return result;
  }
  public IsUrlContainsBusinessLink(url: string): boolean {
    const result: boolean = url.indexOf('business') > -1;
    return result;
  }
  public FindSubNavigationData(selectedMenu: string, selectedIndex?: number) {
    return this.GlobalNavigationInfo.filter((item, index) => {
      return (item.title.trim() === selectedMenu);
    });
  }
  // used for re-initialize the component...
  OnMenuSelect(item, index?) {
    if (item.external) {
      this.ManageContentNavigation(item.uri);
    } else {
      this.SubNavigationData = this.FindSubNavigationData(item.title.trim(), index);
      this.selected = item.title;
      this.ManageContentNavigation(item.alias);
      setTimeout(() => {
        this.IsInitiateSubNavigation = false;
      }, 0);
      setTimeout(() => {
        this.IsInitiateSubNavigation = true;
      }, 0);
    }
  }
  public ActivateSubNavigationOnLoad(item, index?) {
    if (item.external) {
      this.ManageContentNavigation(item.uri);
    } else {
      this.SubNavigationData = this.FindSubNavigationData(item.title.trim(), index);
      this.selected = item.title;
      setTimeout(() => {
        this.IsInitiateSubNavigation = false;
      }, 0);
      setTimeout(() => {
        this.IsInitiateSubNavigation = true;
      }, 0);
    }
  }
  public MobileMenuSelect(data: any) {
    this.ToggleHamburgerMenu();
    this.OnMenuSelect(data);
  }
  public ManageContentNavigation(data: any) {
    this.SubNavigationComponentObj.ManageToggle();
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }
  public ReloadHomePage() {
    if (typeof window !== 'undefined') {
      if (this.production) {
        window.location.href = this.portalFrontEndURL;
      } else {
        window.location.href = this.eStoreFrontEndUrl;
      }
      // this._router.navigate(["/"]);
    }
  }
  RedirectToHeader(headerUrl) {
    window.location.href = headerUrl;
  }
  loadCart() {
    this.RedirectToHeader("/store/cart");
    // this._router.navigate(["/store/cart"]);
  }

  public RedirectToStore() {
    // const storeUrl = "https://www.store.celcom.com.my/store/";
    const obj = new ContentNavigation().ManagePageRedirection(this.storeUrl);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }
  public RedirectToLogin() {
    // const loginUrl = "https://www.login.celcom.com.my/store/";
    const obj = new ContentNavigation().ManagePageRedirection(this.loginUrl);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }
  public defaultOnClick() {
    return false;
  }
  public OnSearchClick() {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('searchKey', this.SearchText);
      window.location.href = this.searchUrl;//"search";
    }
  }
  public updateUserName() {
    if (typeof window !== 'undefined' && sessionStorage) {
      if (sessionStorage.getItem("UserInfo")) {
        this.UserLoginName = (JSON.parse(sessionStorage.getItem("UserInfo"))).outputCPResp.name;
      }
      if (this.userType == 'GUEST') {
        this.UserLoginName = this.userType;
      }
    }
  }
  public ToggleHamburgerMenu() {
    this.toggleMenu = !this.toggleMenu;
  }
  public serachtextClick() {
    this.toggleSearch = !this.toggleSearch;
  }
  public quicksearchClose() {
    this.toggleSearch = !this.toggleSearch;
  }
  // On logout clear user token.
  public LogoutUser() {
    this.close__terms__login();
    let headerUrl = window.location.href;
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("UserToken") !== undefined) {
      let apiUrl = "/rest/V1/customerLogout";
      if (localStorage && localStorage.getItem('sessionHash')) {
        apiUrl = apiUrl + '?sessionHash=' + localStorage.getItem('sessionHash');
      }
      const isEnterpriseUser = this._userService.isUserEnterprise();
      this._AppService.getEstoreUserData(apiUrl)
        .pipe(
          finalize(() => {
            this._service.ClearAllStorages();
            this.UserLoginName = null;
            if (isEnterpriseUser) {
              // this._router.navigateByUrl('/', {replaceUrl: true});
              window.location.href = '/';
            } else {
              window.location.href = headerUrl;
            }
          })
        )
        .subscribe(
        (response: any) => {
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
            localStorage.removeItem("numberReservationId");
          }
        });
    } else {
      this._service.ClearAllStorages();
      this.UserLoginName = null;
      window.location.href = headerUrl;
      // this.ReloadHomePage();
    }
  }
  public logoutConfirmation() {
    if (typeof document !== 'undefined') {
      document.getElementById("guest-choose-way").style.display = "block";
    }
  }
  public close__terms__login() {
    if (typeof document !== 'undefined') {
      document.getElementById("guest-choose-way").style.display = "none";
      return false;
    }
  }
  login () {
    if (typeof window !== 'undefined' && localStorage) {
      if (this._userService.isCSAgent() || this._userService.isDealer() || this._userService.isCustomer() ||
      this._userService.isGuest() || this._userService.isMCUser()) {
       window.location.href = this.homePageUrl;//"/store/devices";
     } else {
      localStorage.setItem('pageBeforeLogin', window.location.href);
      window.location.href = this.loginPageUrl;//'/store/login';
     }
    }
  }

  updateExternalFlagAndURLs(data: any): any {
    if (data && data[0] && data[0].below) {
      data[0].below.forEach(item => {
        const dataTitle = item.title;
        if (this.InternalLinkArray.indexOf(dataTitle.toLowerCase()) === -1) {
          // item.external = true;
          item.alias = this.portalFrontEndURL + "/" + item.alias;
          if (item.below && item.below.length > 0) {
            this.updateExternalFlagAndURLs(item.below);
          }
        } else {
          // item.external = false;
          item.alias = this.eStoreFrontEndUrl + "/" + item.alias;
        }
      });

    } else {
      return;
    }
  }

  ngOnDestroy() {
    if (this.subscriber) {
    this.subscriber.unsubscribe();
    }
  }

}
