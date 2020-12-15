import { TestBed, inject, ComponentFixture } from '@angular/core/testing';
import { DeviceSliderComponent } from './device-slider.component';

describe('DeviceSliderComponent', () => {
    let component: DeviceSliderComponent;
    let fixture: ComponentFixture<DeviceSliderComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [],
            declarations: [DeviceSliderComponent]
        });
        fixture = TestBed.createComponent(DeviceSliderComponent);
        component = fixture.componentInstance;
    });

    it('DeviceDetailsService should be created', () => {
        expect(component).toBeTruthy();
    });

    it('ngOnInit with multiple data', () => {
        component.data = [
            {
                color: 'red',
                sub_images: [
                    'dummy1',
                    'dummy2',
                ]
            }
        ];
        component.ngOnInit();
        expect(component.SliderList.length).toBe(2);
        expect(component.ColourList.length).toBe(2);
    });

    it('ngOnInit with existing color', () => {
        component.data = [
            {
                color: 'red',
                sub_images: [
                    'dummy1',
                    'dummy2',
                ]
            }
        ];
        component.ColourList = ['red'];
        component.ngOnInit();
        expect(component.SliderList.length).toBe(0);
        expect(component.ColourList.length).toBe(1);
    });

    it('ngOnInit with existing color different name', () => {
        component.data = [
            {
                color: 'red',
                sub_images: [
                    'dummy1',
                    'dummy2',
                ]
            }
        ];
        component.ColourList = ['blue'];
        component.ngOnInit();
        expect(component.SliderList.length).toBe(2);
        expect(component.ColourList.length).toBe(3);
    });

    it('ngOnInit with single data', () => {
        component.data = {
                color: 'red',
                sub_images: [
                    'dummy1',
                    'dummy2',
                ]
            };
        component.ngOnInit();
        expect(component.SliderList.length).toBe(2);
        expect(component.ColourList.length).toBe(0);
    });
});
