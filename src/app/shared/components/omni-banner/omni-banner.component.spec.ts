import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OmniBannerComponent } from './omni-banner.component';
import { sharedPipes } from 'app/shared/pipes';

describe('OmniBannerComponent', () => {
  let component: OmniBannerComponent;
  let fixture: ComponentFixture<OmniBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OmniBannerComponent, 
        sharedPipes, 
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmniBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
