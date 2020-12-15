import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionsComponent } from './card-options.component';
import { MatIconModule } from '@angular/material/icon';
import { sharedPipes } from 'app/shared/pipes';

describe('CardOptionsComponent', () => {
  let component: CardOptionsComponent;
  let fixture: ComponentFixture<CardOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOptionsComponent, sharedPipes ],
      imports: [MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
