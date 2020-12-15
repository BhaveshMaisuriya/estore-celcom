import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MidnightDeliveryInfoComponent } from "./midnight-delivery-info.component";

describe('MidnightDeliveryInfoComponent', () => {
    let component: MidnightDeliveryInfoComponent;
    let fixture: ComponentFixture<MidnightDeliveryInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MidnightDeliveryInfoComponent],

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MidnightDeliveryInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });

    it('should call ngOnInit', () => {
        const spy = spyOn(component, 'ngOnInit').and.callThrough();
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });
});