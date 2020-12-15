import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailsWrapperComponent } from './edit-details-wrapper.component';

describe('EditDetailsWrapperComponent', () => {
  let component: EditDetailsWrapperComponent;
  let fixture: ComponentFixture<EditDetailsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDetailsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
