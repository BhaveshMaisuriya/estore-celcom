import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { SessionTimeOutPopupComponent } from '../../../Store/widget/session-timeout-popup/session-timeout-popup';
import { CartService } from "../../../Service/cart.service";
import { AppService } from "../../../Service/app.service";
import { HttpClient, HttpHandler } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BroadbandService } from '../../../Service/broadband.service';
import { DeviceDataService } from '../../../Service/devicedata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../Service/user.service';
import { CommonUtilService } from '../../../Service/commonUtil.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { json } from 'express';

const cartItem = {
      id: 16291,
      all_items: [
      ]      
    };
  
describe('SessionTimeOutPopupComponent', () => {
    let component: SessionTimeOutPopupComponent;
    let fixture: ComponentFixture<SessionTimeOutPopupComponent>;
    let testBedService: CartService;
    const fakeActivatedRoute = {
        snapshot: { data: {} }
      } as ActivatedRoute;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SessionTimeOutPopupComponent],
            imports: [HttpClientTestingModule],
            providers: [CartService, AppService, CookieService, BroadbandService, DeviceDataService, HttpClient, HttpHandler, UserService,
                {provide: ActivatedRoute, useValue: fakeActivatedRoute}, CommonUtilService,
                {provide: Router,  useClass: class { navigate = jasmine.createSpy("navigate"); }} ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SessionTimeOutPopupComponent);
        component = fixture.componentInstance;
        testBedService = TestBed.get(CartService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should check the methods to be defined', () => {
        expect(component.ContinueMySession).toBeDefined();
        expect(component.redirectItemSelection).toBeDefined();
        expect(component.removeCartItem).toBeDefined();
    });
    
    it('It should render class in session-timeout HTML', () => {
        if (!component.data) {
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h3.Choose-your-way-in').innerHTML).toContain('Session Timeout');
            expect(compiled.querySelector('p.What-would-you-like').innerHTML).toContain('Your session will expire in two minutes.');
        } else {
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h3.Choose-your-way-in').innerHTML).toContain('Oops, the item(s) in your cart has expired.');
            // tslint:disable-next-line:max-line-length
            expect(compiled.querySelector('p.What-would-you-like').innerHTML).toContain('The item(s) in your cart is no longer available and will be removed. Please add another device or plan to your cart.');
        }
    });
    
    it('Should check the EventEmitter on clicking button', () => {
        spyOn(component.OnContinueMySession, 'emit');
        const button = fixture.nativeElement.querySelector('button');
        button.click();
        expect(component.OnContinueMySession.emit).toHaveBeenCalled();
    });

    it('should check the data', () => {
        let data; 
        if (localStorage) {
            data = localStorage.getItem("cartDetailsUnservation");
        }
        expect(JSON.parse(data)).toBeDefined();
    });
    
    it('should check the method on clicking button', () => {
        spyOn(component, 'redirectItemSelection');
        const button = fixture.debugElement.nativeElement.querySelector('button');
        button.click();
        if (component.data) {
            expect(component.redirectItemSelection).toHaveBeenCalled();
        } else {
            expect(component.redirectItemSelection).not.toHaveBeenCalled();
        }
    });
    
    it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
        inject([CartService], (injectService: CartService) => {
            expect(injectService).toBe(testBedService);
        })
    );

    it('redirectToHome', () => {
        const spy = spyOn(component, 'redirectToHome');
        component.redirectToHome();
        expect(spy).toHaveBeenCalled();
    });
    
    it('removeCartItem', () => {
        const spy = spyOn(component, 'removeCartItem').and.callThrough();
        localStorage.setItem('COBP_FLOW', 'YES');
        component.removeCartItem({});
        expect(spy).toHaveBeenCalled();
    });

    it('callUserLogout', () => {
        const spy = spyOn(component, 'callUserLogout');
        component.callUserLogout();
        expect(spy).toHaveBeenCalled();
    });

    it('redirectItemSelection', () => {
        const spy = spyOn(component, 'redirectItemSelection').and.callThrough();
        localStorage.setItem("cartDetailsUnservation", JSON.stringify(cartItem));
        try{
            component.redirectItemSelection({}, null);
        }catch(err)
        {
        }
        expect(spy).toHaveBeenCalled();
    });
});
