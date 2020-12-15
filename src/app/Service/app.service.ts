import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'environments/environment';

 export const HOST = 'https://estore-03.celcom.com.my';
// export const HOST = 'http://localhost:8080';
// Debugging to production
// export const HOST = 'https://cors-anywhere.herokuapp.com/https://shop.celcom.com.my';
//export const HOST = '';

@Injectable({
  'providedIn': 'root'
})
export class AppService {
public agentInfo = "AgentInfo";
public dealerInfo = "DealerInfo";
isProd = environment.production;
isPreprod = environment.preProduction;

  host = HOST;

  constructor(private http: HttpClient) {
  }

  getAgentToken(): string {
    let agentToken = "";
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem(this.agentInfo)) {
      const agentInfo = JSON.parse(sessionStorage.getItem(this.agentInfo));
      agentToken = this.getSessionId() + agentInfo.agent_token;
    }
    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    if (userInfo && userInfo['agent_token']) {
      agentToken = this.getSessionId() + userInfo['agent_token'];
    }
    return agentToken;
  }
  getDealerToken(): string {
    let dealerToken = "";
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem(this.dealerInfo)) {
      const dealerInfo = JSON.parse(sessionStorage.getItem(this.dealerInfo));
      dealerToken = this.getSessionId() + dealerInfo.agent_token;
    }
    return dealerToken;
  }
  get(endpoint: string) {
    const _headers = new HttpHeaders();
    _headers.append("Content-Type", "application/hal+json");
    const agentToken = this.getAgentToken();
    const dealerToken = this.getDealerToken();
    _headers.append("agentToken", agentToken);
    _headers.append("dealerToken", dealerToken);
    return this.http.get(this.host + endpoint, { headers: _headers });
  }
  getWithToken(endpoint: string) {
    let _httpHeader;
    const _headers = new HttpHeaders();
    const authToken = this.getAuthToken(endpoint);
    _httpHeader = _headers.append("Content-Type", "application/hal+json");
    if (authToken) {
      _httpHeader = _headers.append("authtoken", authToken);
    }

    return this.http.get(this.host + endpoint, { headers: _httpHeader });
  }

  postROI(endpoint: string, jsonData: any, token?: string) {
    const authToken = this.getAuthToken(endpoint);
    return this.http.post(this.host + endpoint, jsonData, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "X-CSRF": token || "",
        "authtoken": authToken || ""
      })
    });
  }

  postPaymentGateway(endpoint: string, jsonData: any) {
    const _headers = new HttpHeaders();
    const _httpHeader = _headers.append("Content-Type", "application/json");
    return this.http.post(this.host + endpoint, jsonData, { headers: _httpHeader });
  }

  // Fetch Estore Resource
  getEstoreData(endpoint: string) {
    const token = this.getToken(endpoint);
    const authToken = this.getAuthToken(endpoint);
    const agentToken = this.getAgentToken();
    const dealerToken = this.getDealerToken();
    return this.http.get(this.host + endpoint + token, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "authtoken": authToken + "",
        "UserToken": token + "",
        "Cache-Control": "no-cache",
        "Pragma": "no-cache",
        "agentToken": agentToken,
        "dealerToken": dealerToken
      })
    });
  }
  // Fetch Estore Resource
  postEstoreData(endpoint: string) {
    const token = this.getToken(endpoint);
    const agentToken = this.getAgentToken();
    const dealerToken = this.getDealerToken();
    return this.http.post(this.host + endpoint + token, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "UserToken": token || "",
        "agentToken": agentToken,
        "dealerToken": dealerToken
      })
    });
  }

  postMobileConnectData(endpoint: string) {
    const _headers = new HttpHeaders();
    _headers.append("Content-Type", "application/json");
    return this.http.post(this.host + endpoint, { headers: _headers });
  }

  getToken(endpoint: string): any {
    let userToken = "";
    if (endpoint.indexOf('user/') > -1) {
      if (typeof window !== 'undefined' && sessionStorage) {
        userToken = sessionStorage.getItem('UserToken');
      }
    }
    return userToken;
  }

  getAuthToken(endpoint: string): any {
    let userAuthToken = "";
    if (typeof window !== 'undefined' && sessionStorage) {
      userAuthToken = sessionStorage.getItem('authtoken') || "";
    }
    return userAuthToken;
  }

  // Fetch Estore Resource
  getEstoreUserData(endpoint: string) {
    let token: string;
    let authToken = "";
    if (typeof window !== 'undefined' && sessionStorage) {
      token = sessionStorage.getItem('UserToken');
      authToken = this.getAuthToken(endpoint);
    }
    const agentToken = this.getAgentToken();
    const dealerToken = this.getDealerToken();
    return this.http.get(this.host + endpoint, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "UserToken": token || "",
        "authtoken": authToken || "",
        "agentToken": agentToken,
        "dealerToken": dealerToken
      })
    });
  }

  // Fetch Estore Resource
  postEstoreUserData(endpoint: string, body: any) {
    let token = "";
    let authToken = "";
    if (typeof window !== 'undefined') {
      token = sessionStorage.getItem('UserToken');
      authToken = this.getAuthToken(endpoint);
    }
    const agentToken = this.getAgentToken();
    const dealerToken = this.getDealerToken();
    return this.http.post(this.host + endpoint, body, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "UserToken": token || "",
        "authtoken": authToken || "",
        "agentToken": agentToken,
        "dealerToken": dealerToken
      })
    });
  }
  // Restore cart data after logout
  postRestoreData(endpoint: string) {
    let token: string;
    if (typeof window !== 'undefined' && sessionStorage) {
      token = sessionStorage.getItem('UserToken');
    }
    return this.http.post(this.host + endpoint, {}, {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "UserToken": token || ""
      })
    });
  }
  getSessionId(): string {
    return (this.isProd || this.isPreprod) ? "SESSIONID=" : "PHPSESSID=";
  }

  // Fetch Email Verification Status
  postEmailVerificationStatus(endpoint: string, requestBody: any) {
    return this.http.post(this.host + endpoint, requestBody);
  }
}
