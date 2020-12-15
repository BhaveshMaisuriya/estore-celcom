import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { MultistepsComponent } from "./multisteps.component";

describe("MultistepsComponent", () => {
  let comp: MultistepsComponent;
  let fixture: ComponentFixture<MultistepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MultistepsComponent]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(MultistepsComponent);
        comp = fixture.componentInstance;
      });
  }));

  it("should be created", () => {
    expect(comp).toBeTruthy();
  });

  it("multistepsResponse should be defined", () => {
    comp.ngOnInit();
    expect(comp.multistepsResponse).toBeDefined();
  });

  it("multistepsResponse steps ", () => {
    spyOn(comp, "ngOnInit");
    comp.ngOnInit();
    fixture.detectChanges();
    expect(comp.ngOnInit).toHaveBeenCalled();
  });
});
