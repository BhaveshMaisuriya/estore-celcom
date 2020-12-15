/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { AppService } from '../../../Service/app.service';
import { AgentLoginComponent } from './agent-login.component';
import { NotificationErrorComponent } from "../../../../app/Store/widget/notification-error/notification-error.component";
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { ActivatedRoute, Router } from "@angular/router";
import { DeviceDataService } from '../../../Service/devicedata.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { UserService } from '../../../Service/user.service';
import { AnalyticsService } from 'app/Service/analytic.service';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class RouterStub {
  navigateByUrl(url: string) {
      return url;
  }
}
class MockactivatedRoute {
  snapshot(url: string) {
      return url;
  }
}

describe('AgentLoginComponent', () => {
  let component: AgentLoginComponent;
  let fixture: ComponentFixture<AgentLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     imports: [FormsModule, HttpClientTestingModule],
      declarations: [AgentLoginComponent, AgentFooterComponent, NotificationErrorComponent, SafeHtmlPipe],
      providers: [AppService, DeviceDataService, UserService, CommonUtilService,
           { provide: Router, useClass: RouterStub }, {provide: ActivatedRoute, useClass: MockactivatedRoute},
           AnalyticsService,
          ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentLoginComponent);
    component = fixture.componentInstance;
  });

  it('Agent Login Component created', () => {
    expect(component).toBeTruthy();
  });
  it('Agent enters valid email id ', () => {
    component.enterEmail = "test-a_b.c";
    const router = TestBed.get(Router);
    router.url = '#test/store/agentlogin';
    component.emailMatchCheck();
    expect(component.invalidEmail).toBeFalsy();
  });
  it('Agent enters space ', () => {
    component.enterEmail = " ";
    const router = TestBed.get(Router);
    router.url = '#test/store/agentlogin';
    component.emailMatchCheck();
    expect(component.invalidEmail).toBeTruthy();
  });
  it('Agent enters invalid email id ', () => {
    const invalidId = "test@c@elcom.m";
    const router = TestBed.get(Router);
    router.url = '#test/store/dealerlogin';
     component.enterEmail = invalidId;
     component.emailMatchCheck();
    expect(component.invalidEmail).toBeTruthy();
   });

   it('should redirect to agent landing page on login success ', () => {
    const mockResp = {
      "agent_type" : "cs_agent",
      "agent_token": "d5539c11d93d7ec1c40c9fe8405b1ffc",
      "agent_name": "venu bandaru",
      "status": true,
      "message": "Login Successful"
    };
    spyOn(component, "Redirect");
    component.onSucessResp(mockResp, mockResp["agent_type"], null);
    expect(component.Redirect).toHaveBeenCalledWith('/store/agentlandingpage');
  });
  it('should call onFailure function on login failure ', () => {
    const mockResp = {
      "agent_type" : "cs_agent",
      "agent_token": "d5539c11d93d7ec1c40c9fe8405b1ffc",
      "agent_name": "venu bandaru",
      "status": false,
      "message": "Login Failed"
    };
    spyOn(component, "onFailure");
    component.onSucessResp(mockResp, mockResp["agent_type"], null);
    expect(component.onFailure).toHaveBeenCalledWith(mockResp.message);
  });
  it('should show error notification on calling onFailure ', () => {
    const mockResp = {
      "agent_token": "d5539c11d93d7ec1c40c9fe8405b1ffc",
      "agent_name": "venu bandaru",
      "status": false,
      "message": "Login Failed"
    };
    component.onFailure(mockResp.message);
    expect(component.errorExits).toBeTruthy();
  });
  it('Should redirect to specified url', () => {
    spyOn(component, 'Redirect');
    component.Redirect("store/agentlandingpage");
    expect(component.Redirect).toHaveBeenCalledWith('store/agentlandingpage');
  });
  it('Should be login with agentinfo', () => {
    const mockResp = {
      "agent_type" : "cs_agent",
      "agent_token": "d5539c11d93d7ec1c40c9fe8405b1ffc",
      "agent_name": "venu bandaru",
      "status": true,
      "message": "Login Failed"
    };
    spyOn(component, 'Redirect');
    component.agentRedirect(mockResp, mockResp["agent_type"], null);
    expect(component.Redirect).toHaveBeenCalledWith('/store/agentlandingpage');
  });
  it('Agent enters invalid special character in email id ', () => {
    const event = {
      keyCode: 50,
      which: 50,
      charCode: 50,
      key: '@'
  };
    const router = TestBed.get(Router);
    router.url = '#test/store/agentlogin';
    expect(component.restrictSpecialChar(event)).toBeFalsy();
  });
  it('Agent enters valid character in email id ', () => {
    const event = {
      keyCode: 65,
      which: 65,
      charCode: 65,
      key: 'a'
  };
    const router = TestBed.get(Router);
    router.url = '#test/store/agentlogin';
    expect(component.restrictSpecialChar(event)).toBeTruthy();
  });
  it('Agent enters valid special character in email id ', () => {
    const event = {
      keyCode: 189,
      which: 189,
      charCode: 189,
      key: '_'
  };
    const router = TestBed.get(Router);
    router.url = '#test/store/agentlogin';
    expect(component.restrictSpecialChar(event)).toBeTruthy();
  });
});
