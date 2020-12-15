import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/from';
import { NoteSectionComponent } from './note-section.component';
import { SafeHtmlPipe } from '../../../shared/pipes/safe-html.pipe';

describe('NoteSectionComponent', () => {
  let component: NoteSectionComponent;
  let fixture: ComponentFixture<NoteSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteSectionComponent, SafeHtmlPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NoteSectionComponent created', () => {
    expect(component).toBeTruthy();
  });

  it('should render "NOTE:"', () => {
    const element = fixture.debugElement.nativeElement;
    if (component.cartNoteCheck === true) {
      expect(element.querySelector('div.checkout-note-inner').textContent).toContain('NOTE:');
    }
  });

});
