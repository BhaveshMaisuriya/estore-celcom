import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { insertRemoveTrigger } from '../../device-combo/cobp-number-chooser/cobp-number-chooser.component';
import { MatTooltip } from '@angular/material/tooltip';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-supp-number-chooser',
  templateUrl: './supp-number-chooser.component.html',
  styleUrls: ['./supp-number-chooser.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    insertRemoveTrigger,
  ],
})
export class SuppNumberChooserComponent implements OnInit {

  @Input()
  public get selected(): string {
    return this._selected;
  }

  public set selected(v : string) {
    this._selected = v;
    if (v) {
      this.isChecked = false;
    } else {
      if (this.preventDelete) {
        this.isChecked = true;
      }
    }
    this.isComboNumberChecked = this._deviceComboNumber === this.selected;
  }

  @Input() label = 'Line 1';
  @Input()
  public get deviceComboNumber(): string {
    return this._deviceComboNumber;
  }

  public set deviceComboNumber(v : string) {
    if (v !== this._deviceComboNumber) {
      this._deviceComboNumber = v;
    }
    this.isComboNumberChecked = this._deviceComboNumber === this.selected;
  }

  @Input() allowChangeNumber = true;
  @Input() 
  public get disabled(): boolean {
    return !this.selected ? this._disabled : false;
  }

  public set disabled(v : boolean) {
    if (v !== this._disabled) {
      this._disabled = v;
    }
    this.isComboNumberChecked = this._deviceComboNumber === this.selected;
  }

  @Input()
  public get preventDelete(): boolean {
    return this._preventDelete;
  }

  public set preventDelete(v : boolean) {
    if (v !== this._preventDelete) {
      this._preventDelete = v;
      this.tooltipDisabled = !this._preventDelete;
      if (this.isBrowser) {
        setTimeout(() => {
          if (this.preventDelete) {
            this.isChecked = true;
          }
        }, 0);
      }
    }
  }

  @Input() autoOpen = false;

  @Output() onSelectNumber = new EventEmitter<string>();
  @Output() onSelectComboNumber = new EventEmitter<string>();
  @Output() onSelectingNumber = new EventEmitter<boolean>();

  _selected;
  _deviceComboNumber;
  _isChecked;
  public get isChecked(): boolean {
    return this._isChecked;
  }

  public set isChecked(val : boolean) {
    let v = val;
    if (this.selected) {
      v = false;
    }
    if (v !== this._isChecked) {
      this._isChecked = !!v;
      this.onSelectingNumber.emit(!!v);
    }
  }
  isComboNumberChecked;
  _disabled = false;
  _preventDelete = false;
  tooltipDisabled = true;

  @ViewChild('tooltip') tooltip: MatTooltip;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
    ) {
      this.isBrowser = isPlatformBrowser(platformId);
    }

  ngOnInit(): void {
    if (this.autoOpen) {
      this.isChecked = true;
    }
  }

  onCardClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.disabled) {
      return false;
    }
    if (!this.selected) {
      this.isChecked = true;
    }
  }

  toggleCheckbox(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (!this.preventDelete) {
      this.isChecked = !this.isChecked;
    }
  }

  toggleDeviceComboCheckbox(e) {
    e.preventDefault();
    this.onSelectComboNumber.emit(this.selected);
  }

  onNumberClick(value) {
    this.onSelectNumber.emit(value);
  }

  onRemoveNumber(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.onNumberClick(null);
  }

}
