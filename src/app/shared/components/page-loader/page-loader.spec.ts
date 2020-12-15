import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { materialModules } from 'app/shared/shared-module.module';
import { PageLoaderComponent } from './page-loader.component';

describe('PageLoaderComponent', () => {
  let component: PageLoaderComponent;
  let fixture: ComponentFixture<PageLoaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageLoaderComponent],
      imports:[materialModules]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(PageLoaderComponent);
        component = fixture.componentInstance;
        component.type = 'legacy';
        fixture.detectChanges();
      });
  }));
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the loader Image', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.page-loader>img').src).toContain('/assets/img/Drop_3/celcom-loader.gif');
  });
  it('It should render class in page-loader HTML', () => {
    const pageLoad = fixture.debugElement.query(By.css('.page-loader')).nativeElement;
    expect(pageLoad.innerHTML).toBeTruthy();
  });

});
