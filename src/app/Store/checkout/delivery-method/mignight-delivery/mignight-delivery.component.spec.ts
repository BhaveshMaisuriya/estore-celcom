import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChooseAddressComponent } from '../choose-address/choose-address.component';
import { MignightDeliveryComponent } from "./mignight-delivery.component";
import { SessionTimeOutPopupComponent } from 'app/Store/widget/session-timeout-popup/session-timeout-popup';
import { FooterComponent } from 'app/Footer/footer.component';
import { MinifiedPageLoaderComponent } from 'app/Store/widget/minified-page-loader/minified-page-loader.component';
import { AgentFooterComponent } from 'app/Footer/agent-footer/agent-footer.component';
import { SocialMediaComponent } from 'app/Footer/SocialMedia/socialmedia.component';
import { PageLoaderComponent } from 'app/shared/components/page-loader/page-loader.component';
import { NotificationErrorComponent } from 'app/Store/widget/notification-error/notification-error.component';
import { FooterDownloadComponent } from 'app/Footer/Download/download.component';
import { AgeEligibilityPopupComponent } from 'app/Store/widget/age-eligibility-popup/ageeligiblity.popup.component';
import { CheckoutHeroBannerComponent } from 'app/Widget/StoreWidgets/checkout-hero-banner/checkout-hero-banner.component';
import { FormsModule } from '@angular/forms';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { sharedPipes } from 'app/shared/pipes';
import { materialModules } from 'app/shared/shared-module.module';

describe('MignightDeliveryComponent', () => {
    let component: MignightDeliveryComponent;
    let fixture: ComponentFixture<MignightDeliveryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, HttpClientTestingModule, materialModules],
            declarations: [
                sharedPipes,
                MignightDeliveryComponent, ChooseAddressComponent, SessionTimeOutPopupComponent,
                MinifiedPageLoaderComponent,
                FooterComponent,
                AgentFooterComponent,
                SocialMediaComponent,
                PageLoaderComponent,
                FooterDownloadComponent,
                NotificationErrorComponent,
                AgeEligibilityPopupComponent,
                CheckoutHeroBannerComponent,
                NotificationErrorComponent],
            providers: [DeviceDataService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MignightDeliveryComponent);
        component = fixture.componentInstance;
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();
        component.checkoutData = { delivery_type: { value: '' } };
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call sessionInvalidCheck', () => {
        const spy = spyOn(component, 'sessionInvalidCheck').and.callThrough();
        component.sessionInvalidCheck({});
        expect(spy).toHaveBeenCalled();
    });

    it('should call errorDisplay', () => {
        const spy = spyOn(component, 'errorDisplay').and.callThrough();
        component.errorDisplay({});
        expect(spy).toHaveBeenCalled();
    });
});
