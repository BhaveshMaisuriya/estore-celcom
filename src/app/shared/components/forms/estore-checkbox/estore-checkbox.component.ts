import { Component, OnInit, Input, forwardRef, AfterViewInit, Injector, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl, NgControl} from '@angular/forms';

@Component({
  selector: 'app-estore-checkbox',
  templateUrl: './estore-checkbox.component.html',
  styleUrls: ['./estore-checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => EstoreCheckboxComponent),
    }
  ],
  encapsulation: ViewEncapsulation.None,
})
export class EstoreCheckboxComponent implements AfterViewInit, ControlValueAccessor {

  onChange: any = (_) => { };
  onTouched: any = () => { };

  @Input('value') isSelected: boolean;
  @Input() disabled: boolean;
  @Input() label = '';

  get value() {
    return this.isSelected;
  }

  set value(val) {
    if (val !== this.isSelected) {
      this.isSelected = val;
      this.onChange(val);
      this.onTouched();
    }
  }
  
  constructor(
  ) {
  }

  ngAfterViewInit(): void {
  }

  onInputChange(event) {
    this.value = !this.value;
  }
  
  registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  writeValue(value: any): void {
      this.value = value;
  }


  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}