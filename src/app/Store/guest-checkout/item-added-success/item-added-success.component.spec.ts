import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ItemAddedSuccessComponent } from "./item-added-success.component";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { GuestCheckoutService } from "../services/guest-checkout.service";

describe('itemAddedSuccessComponent', () => {
    let component: ItemAddedSuccessComponent;
    let fixture: ComponentFixture<ItemAddedSuccessComponent>;

    class RouterStub {
        navigateByUrl(url: string) {
            return url;
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ItemAddedSuccessComponent],
            providers: [{ provide: Router, useClass: RouterStub }, { provide: ActivatedRoute, useClass: RouterStub },
                RouterTestingModule, GuestCheckoutService]
        }).compileComponents();
        fixture = TestBed.createComponent(ItemAddedSuccessComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('itemAddedSuccesscomponent should create', () => {
        expect(component).toBeTruthy();
    });

    it('Redirect to cart method must be defined', () => {
        expect(component.redirectToCart).toBeDefined();
    });

    it('continueShopping method must be defined', () => {
        expect(component.continueShopping).toBeTruthy();
    });
    it('mnpFlow value must be true', () => {
        if (typeof window !== 'undefined' && localStorage && localStorage.getItem('MNP-FLOW') === 'YES') {
            expect(component.mnpFlow).toBe(true);
        }
    });
});
