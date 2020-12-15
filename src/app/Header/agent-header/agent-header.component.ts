import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../header.service';
import { AppService } from '../../Service/app.service';
import { UserService } from '../../Service/user.service';
import { DeviceDataService } from '../../Service/devicedata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-agent-header',
  templateUrl: './agent-header.component.html',
  styleUrls: ['./agent-header.component.css'],
  providers: [HeaderService, AppService, UserService]
})
export class AgentHeaderComponent implements OnInit {
  @Input() isNotificationOpen = false;
  public CurrentParentMenu: string;
  public toggleMenu = false;
  public landingPage = false;
  public catalogPage = false;
  public noAgentSpecificPage = true;
  public noAgentLoginPage = true;
  public noDealerLoginPage = true;
  public agentName = null;
  public dealerName = null;
  public userName = null;
  public agentLoggedIn = false;
  public agentType;
  public dealerLoggedIn = false;
  public logoutData: any;
  dataAnalyticsRegion: any;
  public subscription: Subscription;
  public dealerLandingPage = false;

  constructor(private _service: HeaderService,
    private _deviceDataService: DeviceDataService,
    private _AppService: AppService,
    private _UserService: UserService
  ) {
    this.subscription = this._deviceDataService.sharedLoggedInUserName$.subscribe(data => {
      if (data) {
        this.loadUser();
      }
    });
  }
  ngOnInit() {
    this.dataAnalyticsRegion = "Header";
    this.loadUser();
    if (typeof window !== 'undefined' ) {
      const pageUrl = window.location.href;
      if (pageUrl.indexOf("store/devices") > -1) {
        this.catalogPage = true;
      }
      if (pageUrl.indexOf("store/agentlogin") > -1 || pageUrl.indexOf("store/agentlandingpage") > -1 ||
      pageUrl.indexOf("store/agentSearchOrder") > -1 || pageUrl.indexOf("store/dealerlogin") > -1 ) {
        this.noAgentSpecificPage = false;
      }
      if (pageUrl.indexOf("store/agentlogin") > -1) {
        this.noAgentLoginPage = false;
      }
      if (pageUrl.indexOf("store/dealerlogin") > -1) {
        this.noDealerLoginPage = false;
      }
      if (pageUrl.indexOf("store/agentlandingpage") > -1) {
        this.landingPage = true;
      }
      if (pageUrl.indexOf("store/dealerlandingpage") > -1) {
        this.dealerLandingPage = true;
      }
    }
  }
  loadUser() {
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      this.agentLoggedIn = true;
      const agentInfo = JSON.parse(sessionStorage.getItem("AgentInfo"));
      this.agentName = agentInfo.agent_name;
    }
    if (sessionStorage && sessionStorage.getItem("DealerInfo")) {
      const dealerInfo = JSON.parse(sessionStorage.getItem("DealerInfo"));
      this.dealerLoggedIn = true;
      this.dealerName = dealerInfo.agent_name;
    }
    if (sessionStorage && sessionStorage.getItem("GuestInfo")) {
      this.userName = "GUEST";
    }  else if (sessionStorage && sessionStorage.getItem("UserInfo")) {
      const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
      this.userName = userInfo.outputCPResp.name;
    }
  }
  RedirectHeader(headerUrl) {
    window.location.href = headerUrl;
  }
  loadCart() {
    this.RedirectHeader("/store/cart");
  }

  public ToggleHamburgerMenu() {
    this.toggleMenu = !this.toggleMenu;
  }

  public LogoutAgent() {
    this.close__terms__login();
    this.logoutAgentMagento();
  }
  public LogoutUser() {
    this.close__terms__login();
    let agent = false;
    let dealer = false;
    if (sessionStorage && sessionStorage.getItem("AgentInfo")) {
      agent = true;
    } else if (sessionStorage && sessionStorage.getItem("DealerInfo")) {
      dealer = true;
    }
    if (typeof window !== 'undefined' && sessionStorage && sessionStorage.getItem("UserToken") !== undefined) {
      let apiUrl = "/rest/V1/customerLogout";
      if (localStorage && localStorage.getItem('sessionHash')) {
        apiUrl = apiUrl + '?sessionHash=' + localStorage.getItem('sessionHash');
      }
      this._AppService.getEstoreUserData(apiUrl).subscribe(
        (response: any) => {
          this._UserService.clearStorageForUser();
          if (typeof window !== 'undefined' && localStorage && localStorage.getItem("numberReservationId")) {
            localStorage.removeItem("numberReservationId");
          }
          this.userName = null;
          if (agent) {
          this.RedirectHeader("/store/agentlandingpage");
          } else if (dealer) {
            this.RedirectHeader("/store/dealerlandingpage");
          }
        }, (error: any) => {
          if (typeof window !== 'undefined') {
            this._UserService.clearStorageForUser();
            this.userName = null;
            if (agent) {
            this.RedirectHeader("/store/agentlandingpage");
            } else if (dealer) {
              this.RedirectHeader("/store/dealerlandingpage");
            }
        }
      });
    } else {
      this._UserService.clearStorageForUser();
      this.userName = null;
      if (agent) {
      this.RedirectHeader("/store/agentlandingpage");
      } else if (dealer) {
        this.RedirectHeader("/store/dealerlandingpage");
      }
    }
  }
  logoutAgentMagento() {
    const url = "/rest/V1/agent-logout";
    this._AppService.getEstoreUserData(url).subscribe(
      (response: any) => {
        this.onAgentLogout();
      },
      (error: any) => {
        this.onAgentLogout();
      }
    );
  }
  onAgentLogout() {
    const isAgent = this._UserService.isCSAgent();
    const isDealer = this._UserService.isDealer();
    this._service.ClearAllStorages();
    this.agentName = null;
    this.dealerName = null;
    this.agentLoggedIn = null;
    this.dealerLoggedIn = null;
    this.userName = null;
    if (isAgent) {
      this.RedirectHeader("/store/agentlogin");
    } else if (isDealer) {
      this.RedirectHeader("/store/dealerlogin");
    }
  }
  public logoutConfirmation() {
    document.getElementById("guest-choose-way").style.display = "block";
  }
  public close__terms__login() {
    document.getElementById("guest-choose-way").style.display = "none";
    return false;
  }
  login() {
    if (typeof window !== 'undefined' && localStorage && sessionStorage) {
      if (this._UserService.isCSAgent()) {
        this.RedirectHeader("/store/agentlandingpage");
      } else if (this._UserService.isDealer()) {
        this.RedirectHeader("/store/dealerlandingpage");
      } else {
        this.RedirectHeader('/store/agentlogin');
      }
    }
  }
}
