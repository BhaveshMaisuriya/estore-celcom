import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'rxjs/add/observable/from';
import { MostPopularComponent } from './most-popular.component';

describe('Most-popular', () => {
  let component: MostPopularComponent;
  let fixture: ComponentFixture<MostPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostPopularComponent ],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('MostPopularComponent created', () => {
    expect(component).toBeTruthy();
  });

  it('should contain image for previlages' , () => {
    if (component.showComponent > 0) {
      expect(fixture.debugElement.nativeElement.querySelector('p.MOST-POPULAR>img').src).toContain('../assets/img/Drop_3/privileges.svg');
    }
  });

});
