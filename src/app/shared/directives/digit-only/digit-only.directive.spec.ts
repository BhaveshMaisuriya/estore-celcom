import { DigitOnlyDirective } from "./digit-only.directive";
import { Component, ElementRef } from "@angular/core";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  template:
    '<input type="text" [digitOnly] maxlength="5" pattern="/^[0-9]d*$/">'
})
class TestDigitOnlyComponent {
  inputmode: string;
  constructor() {}
}

describe("DigitOnlyDirective", () => {
  let component: TestDigitOnlyComponent;
  let fixture: ComponentFixture<TestDigitOnlyComponent>;
  let inputElement: ElementRef;
  let directive: DigitOnlyDirective;
  let regex: RegExp;
  let hasDecimalPoint = false;
  let decimal = true;
  let decimalSeparator = ".";
  let navigationKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "Home",
    "End",
    "ArrowLeft",
    "ArrowRight",
    "Clear",
    "Copy",
    "Paste"
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDigitOnlyComponent, DigitOnlyDirective]
    });
    fixture = TestBed.createComponent(TestDigitOnlyComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css("input"));
    directive = new DigitOnlyDirective(inputElement);
  });

  it("should create TestDigitOnlyComponent", () => {
    expect(component).toBeTruthy();
  });

  it("should pass input with pattern", () => {
    inputElement.nativeElement.value = "123";
    fixture.detectChanges();
    expect(inputElement.nativeElement.value).toEqual("123");
  });

  it("Should call keydown event with prevent default", () => {
    const keyEvent = new KeyboardEvent("keydown", { key: "a" });
    const spy = spyOn(keyEvent, "preventDefault");
    inputElement.nativeElement.dispatchEvent(keyEvent);
    fixture.detectChanges();
    expect(keyEvent.defaultPrevented).toBe(false);
  });

  it("Should call keyup event ", () => {
    const keyEvent = new KeyboardEvent("keyup", { key: "a" });
    const spy = spyOn(keyEvent, "preventDefault");
    inputElement.nativeElement.dispatchEvent(keyEvent);
    fixture.detectChanges();
    expect(keyEvent.defaultPrevented).toBe(false);
  });

  it("Should call onpaste event ", () => {
    let dT = new DataTransfer();
    const keyEvent = new ClipboardEvent("paste", {clipboardData: dT});
    keyEvent.clipboardData.setData('text/plain', 'Hello world');
    const spy = spyOn(keyEvent, "preventDefault");
    inputElement.nativeElement.dispatchEvent(keyEvent);
    fixture.detectChanges();
    expect(keyEvent.defaultPrevented).toBe(false);
  });
});
