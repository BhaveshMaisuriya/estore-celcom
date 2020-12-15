import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { COBPInstructionsComponent } from './cobp-instructions.component';

describe('COBPInstructionsComponent', () => {
  let component: COBPInstructionsComponent;
  let fixture: ComponentFixture<COBPInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ COBPInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(COBPInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
