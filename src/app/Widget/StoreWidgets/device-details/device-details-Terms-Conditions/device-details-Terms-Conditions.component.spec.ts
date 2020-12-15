import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DeviceTermsConditionsComponent } from './device-details-Terms-Conditions.component';
import { DebugElement } from '@angular/core';
import { RedirectionService } from '../../../../Service/redirection.service';
import { Router, ActivatedRoute } from "@angular/router";
import { Broadcaster } from '../../../../Model/broadcaster.model';
import { NotificationPopupEvent } from '../../../../Service/broadcaster.service';
import { CookieService } from 'ngx-cookie-service';

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

describe('DeviceDetailTermsCondition', () => {
    var fixture: ComponentFixture<DeviceTermsConditionsComponent>;
    let component: DeviceTermsConditionsComponent;
    let de: DebugElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeviceTermsConditionsComponent],
            providers: [
                { provide: ActivatedRoute, useClass: MockactivatedRoute },
                { provide: Router, useClass: RouterStub },
                RedirectionService,
                Broadcaster,
                NotificationPopupEvent,
                CookieService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviceTermsConditionsComponent);
        component = fixture.componentInstance;
        de = fixture.debugElement;
    });

    it('should be create DeviceDetailTermsCondition', () => {
        component.ngOnInit();
        expect(component).toBeTruthy();

    });
    it('should emit CloseTermsAndConditionsPopup in closeTermsBox', () => {
        spyOn(component.CloseTermsAndConditionsPopup,'emit');
        component.closeTermsBox();
        let clickable = fixture.debugElement.nativeElement.querySelector('.feature-box-close');
        clickable.click();
        expect(component.CloseTermsAndConditionsPopup.emit).toHaveBeenCalled();
    });
    it('should ManageContentNavigation', () => {
        const redirectionService: RedirectionService = fixture.debugElement.injector.get(RedirectionService);
        spyOn(redirectionService, 'HandleNavigation');
        component.ManageContentNavigation('data');
        expect(redirectionService.HandleNavigation).toHaveBeenCalled();
    });
    it('should be return error defaultOnClick', () => {
        const value: boolean = component.defaultOnClick();
        expect(value).toBe(false);
    });
});
