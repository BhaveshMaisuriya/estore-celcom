import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HOST } from 'app/Service/app.service';
import { EkycDetailsComponent } from './ekyc-details.component';

describe('EkycDetailsComponent', () => {
  let component: EkycDetailsComponent;
  let fixture: ComponentFixture<EkycDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EkycDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EkycDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`host has default value`, () => {
    const host = HOST.length === 0 ? window.location.origin : HOST;
    expect(component.host).toEqual(host);
  });
});
