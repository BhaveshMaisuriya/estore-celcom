import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MinifiedPageLoaderComponent } from './minified-page-loader.component';

describe('minified page loader', () => {
  let component: MinifiedPageLoaderComponent;
  let fixture: ComponentFixture<MinifiedPageLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinifiedPageLoaderComponent ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinifiedPageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('minified loader created', () => {
    expect(component).toBeTruthy();
  });

  it('should render loader', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div.minified-page-loader>img').src).toContain('/assets/img/Drop_3/celcom-loader.gif');
  });

});
