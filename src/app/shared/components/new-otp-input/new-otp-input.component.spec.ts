import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOtpInputComponent } from './new-otp-input.component';

describe('NewOtpInputComponent', () => {
  let component: NewOtpInputComponent;
  let fixture: ComponentFixture<NewOtpInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [ NewOtpInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOtpInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call keyUpEvent 1', () => {
    const spy = spyOn(component, 'keyUpEvent').and.callThrough();
    const event = {
      which: 88,
      keyCode: 0
    };

    component.keyUpEvent(event, 1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call keyUpEvent 2', () => {
    const spy = spyOn(component, 'keyUpEvent').and.callThrough();
    const event = {
      which: 8,
      keyCode: 8
    };

    component.keyUpEvent(event, 1);
    expect(spy).toHaveBeenCalled();
  });

  it('should call getValue', () => {
    const spy = spyOn(component, 'getValue').and.callThrough();
    component.getValue();
    expect(spy).toHaveBeenCalled();
  });

  it('should call clearValue', () => {
    const spy = spyOn(component, 'clearValue').and.callThrough();
    component.clearValue();
    expect(spy).toHaveBeenCalled();
  });
});
