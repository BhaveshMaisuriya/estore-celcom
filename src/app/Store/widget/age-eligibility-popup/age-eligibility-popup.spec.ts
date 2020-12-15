// importing the functions required for Unittesting
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// importing the dependencies required for component
import { AgeEligibilityPopupComponent } from '../../../Store/widget/age-eligibility-popup/ageeligiblity.popup.component';
// Creating the global Jasmine Function (describe) to define group of specs
describe('AgeEligibilityPopupComponent', () => {
    let component: AgeEligibilityPopupComponent;
    let fixture: ComponentFixture<AgeEligibilityPopupComponent>;
    //  beforeEach(async) runs after completion of all asynchronous tasks
    beforeEach(async(() => {
        // Configures and initializes environment for unit testing and provides methods for creating components and services in unit tests.
        // configureTestingModule function Overrides the default imports,declarations and providers
        TestBed.configureTestingModule({
            declarations: [AgeEligibilityPopupComponent]
        })
            .compileComponents();
    }));
    // beforeEach() is used to run before each test in a describe
    beforeEach(() => {
        // create component and test fixture
        fixture = TestBed.createComponent(AgeEligibilityPopupComponent);
        // get test component from the fixture
        component = fixture.componentInstance;
        // Triggered the change detection
        fixture.detectChanges();
    });
    it('sholud define component to be truthy', () => {
        expect(component).toBeTruthy();
    });
    it('should check the methods in AgeEligibilityPopupComponent', () => {
        expect(component.OnLifeStyle).toBeDefined();
    });
    it('should check the inputs in the component', () => {
        expect(typeof component.EligibilityPopupType).toBeDefined();
        expect(typeof component.DisplayPromotionalLifeStyle).toBeDefined();
        expect(typeof component.promotionalPlan).toBeDefined();
        expect(typeof component.promotionType).toBeDefined();
    });
    it('should check the EventEmitter for OnEligible method', () => {
        if (component.EligibilityPopupType && component.EligibilityPopupType.displayType === 'UPPER_AGE' && 'LIMIT_EXCEEDED' &&
            'LIMIT_EXCEEDED_WITH_OPEN_COUNT' && 'INVALID_MVIVA_URL' && 'mnpPlanOnly' && 'LOWER_AGE' && 'LOWER_AGE_LOGIN') {
            spyOn(component.OnContinue, 'emit');
            const buttonClick = fixture.nativeElement.querySelector('login-default-button');
            buttonClick.click();
            expect(component.OnContinue.emit).toHaveBeenCalledWith(component.EligibilityPopupType.displayType);
        }
    });
    it('should call OnLifeStyle method if user clicks on OnLifeStyle link', () => {
        if (typeof window !== 'undefined' && component.promotionalPlan !== undefined) {
            spyOn(component, 'OnLifeStyle');
            const element = fixture.debugElement.nativeElement.querySelector('.OnLifeStyle');
            element.click();
            expect(component.OnLifeStyle).toHaveBeenCalled();
        }
    });
    it('should call emitContinue method if user clicks on emitContinue', () => {
        if (component.EligibilityPopupType && component.EligibilityPopupType.displayType === 'UPPER_AGE' && 'LIMIT_EXCEEDED' &&
            'LIMIT_EXCEEDED_WITH_OPEN_COUNT' && 'INVALID_MVIVA_URL' && 'mnpPlanOnly' && 'LOWER_AGE' && 'LOWER_AGE_LOGIN') {
            spyOn(component, 'emitContinue');
            const element = fixture.debugElement.nativeElement.querySelector('.emitContinue');
            element.click();
            expect(component.OnLifeStyle).toHaveBeenCalled();
        }
    });
    it('should call OnLifeStyle method if user call the EventEmitter', () => {
        if (component.DisplayPromotionalLifeStyle) {
            const buttonClick = fixture.debugElement.nativeElement.querySelector('login-default-button');
            buttonClick.click();
            fixture.detectChanges();
            expect(component.OnContinue.emit).toHaveBeenCalled();
        }
    });
    it('test emitContinue method', () => {
        spyOn(component.OnContinue, 'emit');
        component.EligibilityPopupType = {
            displayType: 'UPPER_AGE'
        };
        const data = {
            type: component.EligibilityPopupType.displayType
          };
        component.emitContinue();
        fixture.detectChanges();
        expect(component.OnContinue.emit).toHaveBeenCalledWith(data);
    });
    it('test OnLifeStyle method with undefined plan', () => {
        spyOn(component.OnContinue, 'emit');
        component.promotionalPlan = undefined;
        component.OnLifeStyle();
        fixture.detectChanges();
        expect(component.OnContinue.emit).toHaveBeenCalled();
    });
    it('test OnLifeStyle method with first  platinum plan', () => {
        component.promotionalPlan = "first-platinum";
        spyOn(component, 'Redirect');
        component.OnLifeStyle();
        fixture.detectChanges();
        expect(component.Redirect).toHaveBeenCalledWith("/plans/" + component.promotionalPlan);
    });
    // it('Test Redirect Function', () => {
    //     const currentURL = window.location.href;
    //     component.Redirect(currentURL + "#test");
    //     fixture.detectChanges();
    //     expect(window.location.href).toBe(currentURL + "#test");
    // });
});


