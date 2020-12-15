import { TestBed, async, ComponentFixture, fakeAsync, tick, inject, flushMicrotasks } from '@angular/core/testing';

import { FeedbackComponent } from './feedback.component';
import { NotificationPopupEvent } from '../../Service/broadcaster.service';
import { Broadcaster } from './../../Model/broadcaster.model';

import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { By } from '@angular/platform-browser';

const mockComponentData = {
    Url: "https://celcom.com.my/"
}

describe('Feedback Component', () => {
    let fixture: ComponentFixture<FeedbackComponent>;
    let component: FeedbackComponent;

    beforeEach(async(() => {
        TestBed
            .configureTestingModule({
                declarations: [FeedbackComponent],
                providers: [NotificationPopupEvent, CookieService, Broadcaster],
                imports: [FormsModule]
            })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(FeedbackComponent);
                component = fixture.componentInstance;
            });
    }));

    // it('should create Feedback component', () => {
    //     component.ngOnInit();
    //     expect(component).toBeTruthy();
    // });

    // it('oldwebsiteurl should be default url', () => {
    //     component.ngOnInit();
    //     expect(component.OldwebSiteUrl).toBe("https://www.celcom.com.my/personal");
    // });

    // it('oldwebsiteurl should be data url', () => {
    //     component.data = mockComponentData;
    //     component.ngOnInit();
    //     expect(component.OldwebSiteUrl).toBe("https://celcom.com.my/");
    // });

    // it('should call setActiveIndex and change activeIndex value', () => {
    //     component.setActiveIndex(1);
    //     expect(component.activeIndex).toEqual(1);
    // });

    // it('should change active index to default', () => {
    //     component.activeIndex = 3;
    //     component.removeActiveIndex();
    //     expect(component.activeIndex).toEqual(-1);
    // });

    // it('should call selectIndex and removeActiveIndex', fakeAsync(() => {
    //     fixture.detectChanges();
    //     component.selectIndex(3);
    //     expect(component.activeIndex).toEqual(3);
    //     expect(component.selectedIndex).toEqual(3);
    //     expect(component.ratingValue).toEqual(3 + 1);
    //     tick();
    //     fixture.detectChanges();
    //     component.removeActiveIndex();
    //     expect(component.selectIndex).toBeTruthy();
    //     expect(component.activeIndex).toEqual(3);
    //     flushMicrotasks();
    // }));

    // it('should get rating comment data', fakeAsync(() => {
    //     fixture.detectChanges();
    //     tick();
    //     let inputComment = fixture.debugElement.query(By.css('textarea')).nativeElement;
    //     inputComment.value = 'new generated comment';
    //     inputComment.dispatchEvent(new Event('input'));
    //     fixture.detectChanges();
    //     tick();
    //     component.getFormData();
    //     expect(component.ratingComment).toMatch('new generated comment'); 
    //     flushMicrotasks();
    // }));

    // it('should set rating comment to be NA', fakeAsync(() => {
    //     component.getFormData();
    //     expect(component.ratingComment).toBe('NA');
    //     flushMicrotasks();
    // }));

    // it('should get rating comment data', fakeAsync(inject([NotificationPopupEvent], (notificationPopupEvent: NotificationPopupEvent) => {
    //     // fixture.detectChanges();
    //     // spyOn(component, "Close");
    //     // spyOn(notificationPopupEvent, "fire").and.returnValue(true);
    //     // tick();
    //     // let inputComment = fixture.debugElement.query(By.css('.sc_rating_nothanks')).nativeElement;
    //     // inputComment.click();
    //     // fixture.detectChanges();
    //     // tick();
    //     // expect(component.Close).toHaveBeenCalled();
    //     // flushMicrotasks();
    // })));

    // it('should call close', fakeAsync(inject([NotificationPopupEvent], (notificationPopupEvent: NotificationPopupEvent) => {
    //     fixture.detectChanges();
    //     spyOn(notificationPopupEvent, "fire").and.returnValue(true);
    //     component.Close();
    //     expect(notificationPopupEvent.fire).toHaveBeenCalled();
    //     flushMicrotasks();
    // })));

    // it('should call checkFeedBackSubmitCookie', fakeAsync(inject([CookieService], (cookieService: CookieService) => {
    //     fixture.detectChanges();
    //     spyOn(cookieService, "check").and.returnValue(false);
    //     spyOn(cookieService, "set");
    //     component.checkFeedBackSubmitCookie();
    //     expect(cookieService.check).toHaveBeenCalled();
    //     expect(cookieService.set).toHaveBeenCalledWith("isFeedBackSubmitted", "true", 1);
    //     flushMicrotasks();
    // })));

    // it('should call handleFormSubmit', () => {
    //     let xmlHttpRequestSpy: {
    //         open: jasmine.Spy,
    //         setRequestHeader: jasmine.Spy,
    //         onreadystatechange: jasmine.Spy,
    //         send: jasmine.Spy
    //     };
    //     let mockResponse = {
    //         "Rating":"NA",
    //         "message":3,
    //         "formGoogleSheetName":"Responses"
    //     };
    //     xmlHttpRequestSpy = jasmine.createSpyObj('XMLHttpRequest', ['open', 'setRequestHeader', 'onreadystatechange', 'send']);
    //     xmlHttpRequestSpy.open.and.returnValue(true);
    //     xmlHttpRequestSpy.setRequestHeader.and.returnValue(true);
    //     xmlHttpRequestSpy.send.and.returnValue(true);
    //     spyOn(component, "getFormData").and.returnValue(mockResponse);
    //     fixture.detectChanges();
    //     component.handleFormSubmit();
    //     expect(component.getFormData).toHaveBeenCalled();
    //     expect(xmlHttpRequestSpy instanceof XMLHttpRequest);
    // });
});
