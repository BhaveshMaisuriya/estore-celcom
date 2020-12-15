import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ChooseYourWayComponent } from '../../../Store/guest-checkout/choose-your-way/choose-your-way.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppService } from '../../../Service/app.service';
import { AppMockService } from '../../../Service/appmock.service';
import { By } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
class RouterStub {
    navigateByUrl(url: string) {
        return url;
    }
}
describe('ChooseYourWayComponent', () => {
    let component: ChooseYourWayComponent;
    let fixture: ComponentFixture<ChooseYourWayComponent>;
    const store = {};
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ChooseYourWayComponent],
            imports: [RouterTestingModule],
            providers: [{ provide: AppService, useClass: AppMockService }, { provide: Router, useClass: RouterStub }],
        })
            .compileComponents();

        fixture = TestBed.createComponent(ChooseYourWayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('Should create functions for choose-your-way component', () => {
        expect(component.guestCloseModal).toBeTruthy();
        expect(component.redirectLogin).toBeTruthy();
    });
    it('Should check the EventEmitter', () => {
        spyOn(component.hideChooseWay, 'emit');
        const button = fixture.nativeElement.querySelector('button');
        button.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(component.hideChooseWay.emit).toHaveBeenCalled();
    });
    it('Should log in and navigate to /store/guest/login', inject([Router], (router: Router) => {
        const de = fixture.debugElement.query(By.css('.yes-default-button'));
        const el = de.nativeElement;
        const spy = spyOn(router, 'navigateByUrl');
        el.click();
        const navArgs = spy.calls.first().args[0];
        expect(navArgs).toBe('/store/guest/login');
    }));
    it('Should login and navigate to /store/login', inject([Router], (router: Router) => {
        const de = fixture.debugElement.query(By.css('.no-default-button'));
        const el = de.nativeElement;
        const spy = spyOn(router, 'navigateByUrl');
        el.click('guest');
        const navArgs = spy.calls.first().args[0];
        expect(navArgs).toBe('/store/login');
    }));
    it('should render the success logo', async(() => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('a>img').src).toContain('/assets/img/Drop_3/icon/remove.svg');
    }));
});
