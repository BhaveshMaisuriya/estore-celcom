import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationComponent } from './gamification.component';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalComponent } from '../../modal/modal.component';

describe('GamificationComponent', () => {
  let component: GamificationComponent;
  let fixture: ComponentFixture<GamificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamificationComponent, ModalComponent ],
      imports: [RouterModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
