import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EstoreCheckboxComponent } from './estore-checkbox.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';

describe('EstoreCheckboxComponent', () => {
  let component: EstoreCheckboxComponent;
  let fixture: ComponentFixture<EstoreCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCheckboxModule, 
        FormsModule
      ],
      declarations: [ EstoreCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
