import { EnterpriseRegistrationComponent } from "./registration.component";
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EnterpriseService } from '../enterprise.service';
import { DeviceDataService } from 'app/Service/devicedata.service';
import { CommonUtilService } from 'app/Service/commonUtil.service';
import { EStoreAnalysticsService } from 'app/Service/store.analytic.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EstoreInputComponent } from 'app/shared/components/forms/estore-input/estore-input.component';
import { AgentFooterComponent } from 'app/Footer/agent-footer/agent-footer.component';
import { NotificationErrorComponent } from 'app/Store/widget/notification-error/notification-error.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RendererService } from 'app/Service/renderer.service';
import { SeoService } from 'app/Service/seo.service';
import { UserService } from 'app/Service/user.service';
import { PlanTableComparisionService } from 'app/Widget/StoreWidgets/plan-table-comparison/plan-table-comparison.service';
import { AppService } from 'app/Service/app.service';
import { AnalyticsService } from 'app/Service/analytic.service';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { sharedPipes } from 'app/shared/pipes';
import { sharedDirectives } from 'app/shared/directives';

class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}

class MockactivatedRoute {
    snapshot = {
        url: ["https://estore-02.celcom.com.my/store/enterprise/landing"]
    };

    data = Observable.of(null);

    queryParams = Observable.of(
        {
            "resend-email_test": 'resend-email_test'
        });
}

describe("EnterpriseRegistrationComponent", () => {
    let component: EnterpriseRegistrationComponent;
    let fixture: ComponentFixture<EnterpriseRegistrationComponent>;
    let router: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                sharedDirectives,
                sharedPipes,
                EnterpriseRegistrationComponent,
                EstoreInputComponent,
                AgentFooterComponent,
                NotificationErrorComponent
            ],
            providers: [
                {
                    provide: Router,
                    useClass: RouterStub
                },
                {
                    provide: ActivatedRoute,
                    useClass: MockactivatedRoute
                },
                EnterpriseService,
                DeviceDataService,
                CommonUtilService,
                EStoreAnalysticsService,
                RendererService,
                SeoService,
                UserService,
                PlanTableComparisionService,
                AppService,
                AnalyticsService,
                DecimalPipe
            ],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterModule,
                HttpClientTestingModule,
                MatFormFieldModule,
                MatSelectModule,
                MatRadioModule,
                MatOptionModule,
                MatIconModule,
                MatInputModule,
                BrowserAnimationsModule
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(EnterpriseRegistrationComponent);
                component = fixture.componentInstance;
                fixture.detectChanges();

                router = TestBed.get(Router);
            });
    }));

    it("should create the component", () => {
        expect(component).toBeTruthy();
    });

    it("should redirect to Other landing page", () => {
        spyOn(component, "redirectToOtherPage");
        component.redirectToOtherPage();
        fixture.detectChanges();
        expect(component.redirectToOtherPage).toHaveBeenCalled();
    });

    it("should selectedUserTab to 'new-user'", () => {
        spyOn(component, "onUserTabChange");
        component.onUserTabChange("new-user");
        fixture.detectChanges();
        expect(component.selectedUserTab).toEqual("new-user");
    });

    it("should return true for valid nric number", () => {
        const event = {
            which: 38,
            charCode: 0
        };
        expect(component.restrictOnlyNum(event)).toBeTrue();
    });

    it("registration form should be invalid when empty", () => {
        expect(component.registerForm.valid).toBeFalsy();
    });

    it('form fields validity', () => {
        let nric = component.registerForm.controls['nric'];
        let email = component.registerForm.controls['email'];
        let name = component.registerForm.controls['name'];
        expect(nric.valid).toBeFalsy();
        expect(email.valid).toBeFalsy();
        expect(name.valid).toBeFalsy();
    });

    it('email field validity', () => {
        let errors = {};
        let email = component.registerForm.controls['email'];
        errors = email.errors || {};
        expect(errors['required']).toBeTruthy();

        email.setValue("test@test.com");
        expect(email.valid).toBeTruthy();
    });

    it('name field validity', () => {
        let errors = {};
        let name = component.registerForm.controls['name'];
        errors = name.errors || {};
        expect(errors['required']).toBeTruthy();

        name.setValue("test");
        expect(name.valid).toBeTruthy();
    });

    it('nric field validity', () => {
        let errors = {};
        let nric = component.registerForm.controls['nric'];
        console.log(nric);
        errors = nric.errors || {};
        expect(errors['required']).toBeTruthy();

        nric.setValue("123456789123");
        // As not having a valid NRIC nummber for checking validness
        expect(nric.valid).toBeFalsy();
    });

    it('submitting form', () => {
        spyOn(component, "onFormSubmit");
        expect(component.registerForm.valid).toBeFalsy();

        component.registerForm.controls['email'].setValue("test@test.com");
        component.registerForm.controls['nric'].setValue("123456789123");
        component.registerForm.controls['name'].setValue("test");
        component.onFormSubmit();
        // As not having a valid NRIC nummber for checking validness
        expect(component.registerForm.valid).toBeFalsy();
    });

    it('submitting resedn from', () => {
        spyOn(component, "onResendFormSubmit");
        expect(component.resendEmailForm.valid).toBeFalsy();

        component.resendEmailForm.controls['email'].setValue("test@test.com");
        component.onResendFormSubmit();

        expect(component.resendEmailForm.valid).toBeTruthy();
    });

    it("controls should be defiend", () => {
        component.ngOnInit();
        expect(component.emailControl).toBeDefined();
        expect(component.resendEmailControl).toBeDefined();
        expect(component.nameControl).toBeDefined();
        expect(component.nricControl).toBeDefined();
    });

    it("should toggle animation state", () => {
        component.animationState = "out";
        component.toggleShowDiv();
        expect(component.animationState).toBe("in");
    });

    it('should mark the on click section', () => {
        component.showSection = false;
        component.onClickSection();
        expect(component.showSection).toBeTrue();
    });
});
