import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StaticHeroBannerComponent } from './static-hero-banner.component';
import { SharedModule } from 'app/shared/shared-module.module';
import { TBannerCategory } from 'app/pages/new-landing-page/store/shop-banner.model';
import { of } from 'rxjs';

describe('StaticHeroBannerComponent', () => { 
  let component: StaticHeroBannerComponent;
  let fixture: ComponentFixture<StaticHeroBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule ]
    })
    .overrideModule(SharedModule, {
      add: {
        declarations: [
          StaticHeroBannerComponent
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticHeroBannerComponent);
    component = fixture.componentInstance;

    let category = 'shop_plans' as TBannerCategory;
    const testObj = { 
      headline: 'test',
      headline_text_size: 'test',
      headline_text_color: 'test',
      description: 'test',
      description_text_size: 'test',
      description_background_color: 'test',
      description_text_color: 'test',
      image_url: 'test',
      image_url_webp: '/test_url.png',
      banner_background_color: 'test',
      button_text: 'test',
      button_url: 'test',
      button_bgcolor: 'test',
      button_text_color: 'test',
      promo_code_text: 'test',
      promo_code_text_size: 'test',
      promo_code_text_color: 'test',
      promo_code_background_color: 'test',
      position: 'test',
      banner_category: category,
      banner_html: 'test',
      image_mobile_url: 'test',
      image_mobile_url_webp: 'test'
     };
    component.banner$ = of(testObj);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
