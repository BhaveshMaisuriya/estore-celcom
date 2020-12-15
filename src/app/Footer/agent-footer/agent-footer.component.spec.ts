/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgentFooterComponent } from './agent-footer.component';

describe('AgentFooterComponent', () => {
  let component: AgentFooterComponent;
  let fixture: ComponentFixture<AgentFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentFooterComponent);
    component = fixture.componentInstance;
  });

  it('Agent footer component created', () => {
    expect(component).toBeTruthy();
  });
  // it('Agent footer component on other pages', () => {
  //   const otherURL = window.location.href;
  //   window.location.href = "#test";
  //   component.ngOnInit();
  //   expect(window.location.href).toBe(otherURL + "#test");
  //   expect(component.deviceListPage).toBeFalsy();
  // });
  // it('Agent footer component on device list page, plan and device detail page', () => {
  //   const currentURL = window.location.href;
  //   window.location.href = "#test/store/devices";
  //   component.ngOnInit();
  //   expect(window.location.href).toBe(currentURL + "/store/devices");
  //   expect(component.deviceListPage).toBeTruthy();
  // });
});

