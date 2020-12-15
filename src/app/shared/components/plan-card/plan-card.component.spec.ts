import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PlanCardComponent } from "./plan-card.component";
import { MatIconModule } from "@angular/material/icon";
import { sharedPipes } from 'app/shared/pipes';


describe("PlanCardComponent", () => {
  let component: PlanCardComponent;
  let fixture: ComponentFixture<PlanCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        PlanCardComponent,
        sharedPipes,
      ],
      imports: [MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should check toggle expand method", () => {
    let event = jasmine.createSpyObj("event", [
      "preventDefault",
      "stopPropagation"
    ]);
    component.toggleExpand(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });
});
