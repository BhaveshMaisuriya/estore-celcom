import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MinifiedPageLoaderComponent } from '../../../Store/widget/minified-page-loader/minified-page-loader.component';
import { By } from '@angular/platform-browser';
describe('MinifiedPageLoaderComponent', () => {
  let component: MinifiedPageLoaderComponent;
  let fixture: ComponentFixture<MinifiedPageLoaderComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MinifiedPageLoaderComponent],
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MinifiedPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the logo', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.minified-page-loader>img').src).toContain('/assets/img/Drop_3/celcom-loader.gif');
  }));
  it('It should render class in minified-page-loader HTML', () => {
    const minifiedpageLoad = fixture.debugElement.query(By.css('.minified-page-loader')).nativeElement;
    expect(minifiedpageLoad.innerHTML).toBeTruthy();
  });
});
