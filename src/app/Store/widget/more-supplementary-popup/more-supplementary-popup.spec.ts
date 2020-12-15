import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MoreSupplementaryPopupComponent } from '../../../Store/widget/more-supplementary-popup/more-supplementary-popup.component';
import { By } from '@angular/platform-browser';
describe('MoreSupplementaryPopupComponent', () => {
  let component: MoreSupplementaryPopupComponent;
  let fixture: ComponentFixture<MoreSupplementaryPopupComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MoreSupplementaryPopupComponent],
    })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(MoreSupplementaryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the logo for supplementary-popup', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('div>img').src).toContain('/assets/img/Drop_3/icon/remove.svg');
  }));
  it('Should check the EventEmitter', () => {
    spyOn(component.OnContinueSupplementaryPopup, 'emit');
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.OnContinueSupplementaryPopup.emit).toHaveBeenCalled();
  });
  it('It should render class data', () => {
    const Chooseyourway = fixture.debugElement.query(By.css('.Choose-your-way-in')).nativeElement;
    const exceed_data_line1 = fixture.debugElement.query(By.css('p')).nativeElement;
    const cta__content = fixture.debugElement.query(By.css('.cta__content')).nativeElement;

    expect(Chooseyourway.innerHTML).toBe("Uh Oh. You have too many lines.");
    expect(exceed_data_line1.innerHTML).toBe("You've exceeded the number limit that can be tied to one ID.");
    expect(cta__content.innerHTML).toBe('OK');
  });
});
