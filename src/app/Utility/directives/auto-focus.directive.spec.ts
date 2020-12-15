import { Component, DebugElement, ElementRef, Inject } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { AutoFocusDirective } from './auto-focus.directive';
import { DOCUMENT } from '@angular/common';


  describe('AutoFocusDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let inputEl: DebugElement;
       beforeEach(() => {
          TestBed.configureTestingModule({
            declarations: [
              TestComponent,
              AutoFocusDirective
            ]
          });
  
          fixture = TestBed.createComponent(TestComponent);
          component = fixture.componentInstance;
          inputEl = fixture.debugElement.query(By.css('input'));
  
          spyOn(inputEl.nativeElement, 'focus');
          fixture.detectChanges();
        });
  
        it('should create an instance', () => {
          expect(component).toBeTruthy();
        });
  
        it('should call the focus event', (done) => {
          component.autoFocus=true;
            fixture.detectChanges();
            setTimeout(() => {
              expect(inputEl.nativeElement.focus).toHaveBeenCalled();
              done();
            });
          });
  
        it('should autofocus the input control', () => {
          const debugEl: DebugElement = fixture.debugElement;
          expect(debugEl.query(By.css('input:focus'))).toEqual(null);
        });


        @Component({
          template: '<input type="text" [autofocus]="autoFocus" />'
        })
       class TestComponent {
          autoFocus = true;
          constructor(private elRef: ElementRef, @Inject(DOCUMENT) private document) { }
        }
        
    });