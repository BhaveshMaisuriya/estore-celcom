import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iPrepaidPass } from 'app/Store/plan/prepaid/prepaid.model';
@Component({
  selector: 'app-internet-pass-wrapper',
  templateUrl: './internet-pass-wrapper.component.html',
  styleUrls: ['./internet-pass-wrapper.component.scss']
})
export class InternetPassWrapperComponent implements OnInit {

  _passes: iPrepaidPass[];
  @Input()
  get passes() {
    return this._passes;
  }

  set passes(value) {
    this._passes = value;
  }

  @Input() selectedSku: string;

  @Output() onSelect = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  selectPass(sku: string) {
    if (this.selectedSku !== sku) {
      this.onSelect.emit(sku);
    }
  }

}
