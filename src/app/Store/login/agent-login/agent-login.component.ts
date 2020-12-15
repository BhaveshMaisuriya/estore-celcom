import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from '../../../Service/app.service';
import { UserService } from '../../../Service/user.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { Subscription } from 'rxjs';
import * as crypto from 'asymmetric-crypto';
import { GlobalErrorHandler } from '../../../interceptors/error.interceptor';
@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css'],
  providers: [UserService]
})
export class AgentLoginComponent implements OnInit, AfterViewInit {
  enterEmail = "";
  enterPassword;
  invalidEmail = false;
  errorMessageDisplay;
  serviceError;
  errorExits = false;
  showNotificationError = false;
  notificationInfo: any = "";
  subscriber: Subscription;
  errorMessage = {
    requiredMessage: 'Please enter username',
    patternMessage: 'Please enter a valid username'
  };
  mock = false;
  constructor(private _service: AppService,
    private _deviceDataService: DeviceDataService,
    private _globalErrorHandler: GlobalErrorHandler,
    private _activatedRoute: ActivatedRoute,
    private userService: UserService,
    private _router: Router) {
  }

  ngOnInit() {
    this.subscriber = this._deviceDataService.sharedErrorNotificationBoolean$.subscribe(
      data => (this.showNotificationError = data)
    );
  }

  ngAfterViewInit() {
    if (typeof window !== "undefined" && sessionStorage) {
      if (sessionStorage.getItem("AgentInfo")) {
        this._router.navigateByUrl("/store/agentlandingpage");
      }
      if (sessionStorage.getItem("DealerInfo")) {
        this._router.navigateByUrl("/store/dealerlandingpage");
      }
    }
  }
  restrictSpecialChar = (ev) => {
    const k = ev.keyCode || ev.which;
    // const charStr = String.fromCharCode(k);
    const key = ev.key;
    const patternMSISDN = this._router.url.indexOf('/agentlogin') > -1 ? /^[a-zA-Z0-9\._-]*$/ : /^(\d|\w)+$/;
    const validPattern = patternMSISDN.test(key);
    if (k !== 16) {
      if (validPattern) {
      return true;
      } else {
      return false;
      }
    }
  }
  emailMatchCheck() {
    this.invalidEmail = false;
    if (typeof (this.enterEmail) === 'undefined' || this.enterEmail === ' ') {
      this.invalidEmail = true;
      this.errorMessageDisplay = this.errorMessage.requiredMessage;
    } else {
      const patternMSISDN = this._router.url.indexOf('/agentlogin') > -1 ? /^[(\d|\w)-.]*$/ : /^(\d|\w)+$/;
      if (!patternMSISDN.test(this.enterEmail)) {
        this.invalidEmail = true;
        this.errorMessageDisplay = this.errorMessage.patternMessage;
      }
    }
    if (this.errorMessageDisplay) {
      this._globalErrorHandler.errorObjectConvert(this.errorMessageDisplay);
    }
  }
  encrypter(value) {
    return crypto.encrypt(value, "zYjEPND9exnJ0syl5cSehM1Qx3jfg1NhGRE8adQ1VZk=" ,
    "bfQyuE1aNBXmJhgJWAvv21bye7Com1/12iIaB4wWU0O6FZg7TkSNE8CoFaEi9bXHjZLinkYSXC5turWBO8TnNw==");
  }

  onSubmit(form) {
    const agentType = this.userService.getUserTypeByUrl();
    const encrypted = this.encrypter(form.value.agentPassword);
    const url = "/rest/V1/agent-login";
    const request = {
      "agent_type": agentType,
      "user_id": form.value.agentEmail,
      "password": encrypted.data,
      "nonce": encrypted.nonce,

    };
    const createActivityReq = JSON.stringify(request);
    this._service.postEstoreUserData(url, createActivityReq).subscribe(
      (response: any) => {
        this.onSucessResp(response, agentType, form.value.agentEmail);
      },
      (error: any) => {
        this.onFailure(error.message);
      }
    );
  }
  onSucessResp(resp, agentType, userId) {
    if (resp.status === true) {
      // Storing and passing agent information in session storage after successful login.
      // Pass the login information and token to angular after successful login.
      if (typeof window !== "undefined" && localStorage && sessionStorage) {
        localStorage.clear();
        sessionStorage.clear();
        this.agentRedirect(resp, agentType, userId);
      }
    } else {
      this.onFailure(resp.message);
    }
  }
  onFailure(error) {
     // Error message display logic on agent login page.
    this.showNotificationError = true;
    this.notificationInfo = {};
    this.notificationInfo.content = error;
    this.serviceError = error;
    this.errorExits = true;
  }
  agentRedirect(resp, agentType, userId) {
    let lsAgentType;
    let redirectionUrl;
    switch (agentType) {
      case "cs_agent":
        lsAgentType = "AgentInfo";
        redirectionUrl = "/store/agentlandingpage";
      break;
      case "dealer_agent":
        lsAgentType = "DealerInfo";
        redirectionUrl = "/store/dealerlandingpage";
      break;
    }
    const agentDetails = { ...resp, userId };
    sessionStorage.setItem(lsAgentType, JSON.stringify(agentDetails));
    this.Redirect(redirectionUrl);
  }
   Redirect(url: string) {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }
}
