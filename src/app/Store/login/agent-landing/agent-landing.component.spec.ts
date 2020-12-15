/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AgentLandingComponent } from './agent-landing.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { NotificationErrorComponent } from '../../../Store/widget/notification-error/notification-error.component';
import { CopyLinkFormComponent } from '../../../shared/components/copy-link-form/copy-link-form.component';
import { PageLoaderComponent } from '../../../shared/components/page-loader/page-loader.component';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { sharedPipes } from 'app/shared/pipes';
import { IconModule } from 'app/shared/icon.module';
import { materialModules } from 'app/shared/shared-module.module';
import { EstoreInputComponent } from 'app/shared/components/forms/estore-input/estore-input.component';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';

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
describe('AgentLandingComponent', () => {
  let component: AgentLandingComponent;
  let fixture: ComponentFixture<AgentLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        IconModule,
        materialModules,
      ],
      declarations: [sharedPipes, DigitOnlyDirective, AgentLandingComponent, AgentFooterComponent, NotificationErrorComponent,
        CopyLinkFormComponent, PageLoaderComponent, EstoreInputComponent],
      providers: [{ provide: Router, useClass: RouterStub }, { provide: ActivatedRoute, useClass: MockactivatedRoute }, DeviceDataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Agent Landing Component created', () => {
    expect(component).toBeTruthy();
  });
  it('Agent Landing URL Redirection function', () => {
    spyOn(component, 'Redirect');
    component.Redirect("/store/devices");
    fixture.detectChanges();
    expect(component.Redirect).toHaveBeenCalledWith('/store/devices');
  });
  it('Agent Landing to Device Page', () => {
    spyOn(component, 'Redirect');
    component.onBundleClick();
    fixture.detectChanges();
    expect(component.Redirect).toHaveBeenCalledWith('/store/devices');
  });
  it('Agent Landing to Estore Plan Page for non production', () => {
    component.production = false;
    spyOn(component, 'Redirect');
    component.onPlanClick('postpaid');
    fixture.detectChanges();
    expect(component.Redirect).toHaveBeenCalledWith('/personal/postpaid');
  });
  it('Agent Landing to Estore Plan Page for non production', () => {
    component.production = true;
    spyOn(component, 'Redirect');
    component.onPlanClick('postpaid');
    fixture.detectChanges();
    if (typeof window !== "undefined" && sessionStorage && sessionStorage.getItem("AgentInfo")) {
      expect(component.Redirect).toHaveBeenCalledWith('/personal/postpaid');
    } else {
      expect(component.Redirect).toHaveBeenCalledWith('https://www.celcom.com.my/personal/postpaid');
    }
  });
  it('Agent Landing to Portal Plan Page for production', () => {
    component.production = true;
    spyOn(component, 'Redirect');
    sessionStorage.clear();
    component.onPlanClick('xpax');
    fixture.detectChanges();
    expect(component.Redirect).toHaveBeenCalledWith('/plans/xp-lite');
  });
  // it('Test Agent Landing page for dealer', () => {
  //   sessionStorage.clear();
  //   component.production = false;
  //   spyOn(component, 'Redirect');
  //   const dealer = {'agent_name': 'ABC'};
  //   sessionStorage.setItem("DealerInfo", JSON.stringify(dealer));
  //   component.ngAfterViewInit();
  //   fixture.detectChanges();
  //   expect(component.Redirect).toHaveBeenCalledWith('/store/devices');
  // });
  it('Agent Landing to Estore Plan Page for production', () => {
    sessionStorage.clear();
    component.production = true;
    spyOn(component, 'Redirect');
    sessionStorage.setItem("AgentInfo", "abc");
    component.onPlanClick('postpaid');
    fixture.detectChanges();
    expect(component.Redirect).toHaveBeenCalledWith('/personal/postpaid');
  });
  // it('Test Agent Landing Redirect Function', () => {
  //   const currentURL = window.location.href;
  //   component.Redirect(currentURL + "#test");
  //   fixture.detectChanges();
  //   expect(window.location.href).toBe(currentURL + "#test");
  // });
  it('Test Agent Landing Homewireless details page', () => {
    spyOn(component, 'Redirect');
    component.onHomewirelessClick();
    fixture.detectChanges();
    expect(component.Redirect).toHaveBeenCalledWith('/broadband/home-wireless');
  });

  it('onPrepaidClick', () => {
    const spy = spyOn(component, 'Redirect');
    component.onPrepaidClick();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('Agent Landing to Portal - Plan mega', () => {
    component.production = true;
    spyOn(component, 'Redirect');
    sessionStorage.clear();
    component.onPlanClick('mega');
    fixture.detectChanges();
    expect(component.Redirect).toHaveBeenCalledWith('/plans/mega');
  });

  it('Agent Landing to Portal - Plan celcom-internetgo', () => {
    component.production = true;
    spyOn(component, 'Redirect');
    sessionStorage.clear();
    component.onPlanClick('celcom-internetgo');
    fixture.detectChanges();
    expect(component.Redirect).toHaveBeenCalledWith('/plans/celcom-internetgo');
  });
});
