import { TestBed, ComponentFixture } from '@angular/core/testing';
import { materialModules } from 'app/shared/shared-module.module';
import { PageLoaderComponent } from './page-loader.component';

describe('page-loader component', () => {
    let component: PageLoaderComponent;
    let fixture: ComponentFixture<PageLoaderComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [PageLoaderComponent],
            imports:[materialModules]
        });
        fixture = TestBed.createComponent(PageLoaderComponent);
        component = fixture.componentInstance;
        component.type = 'legacy';
        fixture.detectChanges();
    });
    it('page-loader should create', () => {
        expect(component).toBeTruthy();
    });
    it('img tag must contain the loader', () => {
        expect(fixture.debugElement.nativeElement.querySelector('div.page-loader>img').src).toContain
        ('/assets/img/Drop_3/celcom-loader.gif');
    });

});
