import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderTrackingComponent } from './order-tracking.component';
import { AppService } from '../../Service/app.service';
import { AppMockService } from '../../Service/appmock.service';
import { FooterComponent } from '../../Footer/footer.component';
import { AgentFooterComponent } from '../../Footer/agent-footer/agent-footer.component';
import { FooterDownloadComponent } from '../../Footer/Download/download.component';
import { SocialMediaComponent } from '../../Footer/SocialMedia/socialmedia.component';
import { RedirectionService } from '../../Service/redirection.service';
import { Broadcaster } from '../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../Service/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';
import { EStoreAnalysticsService } from '../../Service/store.analytic.service';
import { AnalyticsService } from '../../Service/analytic.service';
import { RendererService } from '../../Service/renderer.service';
import { SeoService } from '../../Service/seo.service';
import { DecimalPipe } from '@angular/common';
import { ConnectionBackend, RequestOptions } from '@angular/http';
import { OrderTrackingService } from '../shared/services/order-tracking.service';
import { Observable } from 'rxjs';

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
describe('Order tracking Component', () => {
  let component: OrderTrackingComponent;
  let fixture: ComponentFixture<OrderTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderTrackingComponent , FooterComponent , AgentFooterComponent, FooterDownloadComponent , SocialMediaComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [{ provide: AppService, useClass: AppMockService } , RedirectionService, Broadcaster , EStoreAnalysticsService
    , NotificationPopupEvent , CookieService , AnalyticsService , RendererService , SeoService , DecimalPipe ,
       ConnectionBackend, OrderTrackingService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(OrderTrackingComponent);
    component = fixture.componentInstance;
    component.siebelOrderID = null;
    component.userNRIC = null;
    component.trackOrderRequest = null;
    component.orderIDFromUrl = null;
    component.IDnumber = null;
    component.orderIDExists = false;
    component.isCSAgentDealer = false;
    component.customMessage = false;
    component.customOrderMessage = false;
    component.errorAgeRange = false;
    component.customMsg = "";
    component.customOrderMsg = "";
    component.maxlength = null;
    component.keepSubmitDisabled = true;
  });

  it('Order tracking created', () => {
    expect(component).toBeTruthy();
  });
  // it('onSubmit function called', () => {
  //   let form = {};
  //   form = {
  //     invalid : true
  //   };
  //  component.onSubmit(form);
  //  form = {};
  //  form = {
  //    value: {
  //     orderIDFromUrl: "12323",
  //     IDnumber: "243324324"
  //    }
  //  };
  //  component.onSubmit(form);
  // });
  it('checkOrderExist function called', inject([OrderTrackingService], (service: OrderTrackingService ) => {
   const reqBody =  {
      siebelOrderID: "1-42233",
      userNRIC: "213123132"
    };
    component.trackOrderUrl = '#test';
  spyOn(service, "TrackOrder").and.returnValue(Observable.of({status: true}));
  component.checkOrderExist(reqBody);
  }));
  it('clearLocalStorage function called', () => {
   component.clearLocalStorage();
  });
 it('validationForIdType function called', () => {
   component.validationForIdType("");
   component.validationForIdType("123adsdf");
   component.validationForIdType("90123113");
   component.validationForIdType("901231133213");
 });

  it('validationForOrderNumber function called', () => {
   component.validationForOrderNumber("");
  // expect(retVal).toBe("Please enter a value");
  component.validationForOrderNumber(null);
  // expect(retVal).toBe("Please enter a value");
  component.validationForOrderNumber("1-23424324444");
 // expect(retVal).toBe(1);
 });
 it('onSuccesFulResponse function called', () => {
 let response = {};
 response = {
   status: true,
   token: "23243324",
   authtoken: "343243rtre"
  };
 const track_order_data = {
  siebelOrderID: "1-42233",
  userNRIC: "213123132"
};
component.trackOrderUrl = '#test';
component.onSuccesFulResponse(track_order_data, response);
sessionStorage.removeItem("UserToken");
sessionStorage.removeItem("authtoken");
 });
 it('onError function called', () => {
 const errMsg = "rwrwre";
 component.onError(errMsg);
  });
});
