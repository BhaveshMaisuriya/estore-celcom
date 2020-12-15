/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AgentSearchComponent } from './agent-search.component';
import { AgentFooterComponent } from '../../../Footer/agent-footer/agent-footer.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('AgentSearchComponent', () => {
  let component: AgentSearchComponent;
  let fixture: ComponentFixture<AgentSearchComponent>;
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ AgentSearchComponent, AgentFooterComponent ],
      providers: [ {provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide: Router,  useClass: class { navigate = jasmine.createSpy("navigate"); }} ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Agent Search Component Created', () => {
    expect(component).toBeTruthy();
  });

  it('Agent Search Validate NRIC for space', () => {
    component.validationForIdType("");
    fixture.detectChanges();
    expect(component.validationForIdType("")).toEqual("Please enter a value");
  });
  it('Agent Search Validate NRIC for alphabets', () => {
    component.validationForIdType("NRIC");
    fixture.detectChanges();
    expect(component.validationForIdType("NRIC")).toEqual("Please enter a valid NRIC ID of 12 digit");
  });
  it('Agent Search Validate NRIC for less digits', () => {
    component.validationForIdType("88040312346");
    fixture.detectChanges();
    expect(component.validationForIdType("88040312346")).toEqual("Please enter a valid NRIC ID of 12 digit");
  });
  it('Agent Search Validate NRIC for valid number', () => {
    component.validationForIdType("880403123465");
    fixture.detectChanges();
    expect(component.validationForIdType("880403123465")).toEqual(0);
  });
});
