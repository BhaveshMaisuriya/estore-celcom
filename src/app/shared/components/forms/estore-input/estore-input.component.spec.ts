import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoreInputComponent } from './estore-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DigitOnlyDirective } from 'app/shared/directives/digit-only/digit-only.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

describe('EstoreInputComponent', () => {
  let component: EstoreInputComponent;
  let fixture: ComponentFixture<EstoreInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule, 
        ReactiveFormsModule, 
        MatIconModule,
        MatExpansionModule, 
        MatFormFieldModule,
        MatInputModule, 
        MatSelectModule, 
        MatButtonModule, 
        MatCheckboxModule, 
        BrowserAnimationsModule,
        MatRadioModule
      ],
      declarations: [ 
        EstoreInputComponent, 
        DigitOnlyDirective 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstoreInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
