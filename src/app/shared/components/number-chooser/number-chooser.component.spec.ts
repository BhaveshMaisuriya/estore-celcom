import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NumberChooserComponent} from './number-chooser.component';
import {DeviceDataService} from 'app/Service/devicedata.service';
import {ProductService} from 'app/Service/product.service';
import {PageLoaderComponent} from '../page-loader/page-loader.component';
import {SearchHighlight} from 'app/shared/pipes/search-highlight.pipe';
import {FormsModule} from '@angular/forms';
import {PaginationComponent} from '../pagination/pagination.component';
import { NguCarouselModule} from '@ngu/carousel';
import {PlanPurchaseService} from 'app/Store/plan/plan-purchase/plan-purchase.service';
import {DeviceDetailsNumberService} from 'app/Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import {EstoreInputComponent} from '../forms/estore-input/estore-input.component';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { materialModules } from 'app/shared/shared-module.module';
import { IconModule } from 'app/shared/icon.module';


describe('NumberChooserComponent', () => {
    let component: NumberChooserComponent;
    let fixture: ComponentFixture<NumberChooserComponent>;

    beforeEach(async (() => {
        TestBed.configureTestingModule({
            declarations: [
                NumberChooserComponent,
                PageLoaderComponent,
                SearchHighlight,
                PaginationComponent,
                EstoreInputComponent,
                DigitOnlyDirective
            ],
            providers: [
                ProductService, DeviceDataService, PlanPurchaseService, DeviceDetailsNumberService
            ],
            imports: [
                FormsModule,
                NguCarouselModule,
                HttpClientTestingModule,
                IconModule,
                materialModules,
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberChooserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
