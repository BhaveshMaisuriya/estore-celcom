import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line:max-line-length
import { LosingSupplementaryLinePopupComponent } from '../../../Store/widget/losing-supplementary-line-popup/losing-supplementary-line-popup.component';
import { By } from '@angular/platform-browser';
describe('LosingSupplementaryLinePopupComponent', () => {
    let component: LosingSupplementaryLinePopupComponent;
    let fixture: ComponentFixture<LosingSupplementaryLinePopupComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LosingSupplementaryLinePopupComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(LosingSupplementaryLinePopupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('Should define LosingsupplementaryLinePopupcomponent', () => {
        expect(component).toBeTruthy();
    });
    it('should create methods for the component', () => {
        expect(component.exitSupplementaryPopup).toBeDefined();
        expect(component.loseSupplementaryLinePopup).toBeDefined();
        expect(component.continueSwitching).toBeDefined();
        expect(component.cancelSwitching).toBeDefined();
    });
    it('should check the method for button click if popupType is undefined', () => {
        if (component.popupType === undefined) {
            spyOn(component, 'loseSupplementaryLinePopup');
            const element = fixture.debugElement.nativeElement.querySelector('.yes-default-button');
            element.click();
            expect(component.loseSupplementaryLinePopup).toHaveBeenCalled();

            spyOn(component, 'exitSupplementaryPopup');
            const element1 = fixture.debugElement.nativeElement.querySelector('.no-default-button');
            element1.click();
            expect(component.exitSupplementaryPopup).toHaveBeenCalled();
        }
    });

    it('should check the method for button click if popupType is having purchasetype or plantype', () => {
        if (component.popupType && (component.popupType.type === 'switchingpurchasetype' || 'switchingplantype')) {
            spyOn(component, 'cancelSwitching');
            const element = fixture.debugElement.nativeElement.querySelector('.yes-default-button');
            element.click();
            expect(component.cancelSwitching).toHaveBeenCalled();

            spyOn(component, 'continueSwitching');
            const element1 = fixture.debugElement.nativeElement.querySelector('.no-default-button');
            element1.click();
            expect(component.continueSwitching).toHaveBeenCalled();
        }
    });
    it('should check the EventEmitters for button click if popupType is undefined', () => {
        if (component.popupType === undefined) {
            spyOn(component.OnContinueSupplementaryPopup, 'emit');
            const clickevent = fixture.debugElement.query(By.css('.guest-connect-login-now .no-default-button'));
            clickevent.nativeElement.click();
            expect(component.OnContinueSupplementaryPopup.emit).toHaveBeenCalled();

            spyOn(component.OnLeaveSupplementaryPopup, 'emit');
            const clickevent1 = fixture.debugElement.query(By.css('.guest-connect-login-now1 .yes-default-button'));
            clickevent1.nativeElement.click();
            expect(component.OnLeaveSupplementaryPopup.emit).toHaveBeenCalled();
        }
    });
    it('should check the EventEmitters for button click if popupType is having purchasetype or plantype', () => {
        if (component.popupType && (component.popupType.type === 'switchingpurchasetype' || 'switchingplantype')) {
            spyOn(component.OnContinueSupplementaryPopup, 'emit');
            const clickevent = fixture.debugElement.query(By.css('.guest-connect-login-now .no-default-button'));
            clickevent.nativeElement.click();
            expect(component.OnContinueSupplementaryPopup.emit).toHaveBeenCalled();

            spyOn(component.OnLeaveSupplementaryPopup, 'emit');
            const clickevent1 = fixture.debugElement.query(By.css('.guest-connect-login-now1 .yes-default-button'));
            clickevent1.nativeElement.click();
            expect(component.OnLeaveSupplementaryPopup.emit).toHaveBeenCalled();
        }
    });
    it('should render the logo for supplementary-popup', () => {
        const compiled = fixture.debugElement.nativeElement;
        if (component.popupType === undefined) {
            expect(compiled.querySelector('div>img').src).toContain('/assets/img/Drop_3/icon/remove.svg');
        }
        if (component.popupType && (component.popupType.type === 'switchingpurchasetype' || 'switchingplantype')) {
            expect(compiled.querySelector('div>img').src).toContain('/assets/img/Drop_3/icon/remove.svg');
        }
    });
    it('should check the EventEmitters for cancel switching', () => {
            spyOn(component.OnLeaveSupplementaryPopup, 'emit');
            component.cancelSwitching();
            fixture.detectChanges();
            expect(component.OnLeaveSupplementaryPopup.emit).toHaveBeenCalled();
    });
    it('should check the EventEmitters for continue switching', () => {
        spyOn(component.OnContinueSupplementaryPopup, 'emit');
        component.continueSwitching();
        fixture.detectChanges();
        expect(component.OnContinueSupplementaryPopup.emit).toHaveBeenCalled();
});
    afterEach(() => {
        TestBed.resetTestingModule();
    });
});
