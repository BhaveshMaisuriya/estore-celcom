import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { iSelectOptions } from '../forms/estore-input/estore-input.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-estore-button-menu',
  templateUrl: './estore-button-menu.component.html',
  styleUrls: ['./estore-button-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('upDown', [
      state('up', style({
        transform: 'rotate(180deg)',
      })),
      state('down', style({
        transform: 'none',
      })),
      transition('up => down', [
        animate('200ms')
      ]),
      transition('down => up', [
        animate('200ms')
      ]),
    ]),
  ],
})
export class EstoreButtonMenuComponent implements OnInit {

  @Input()
  public get items() {
    return this._items;
  }

  public set items(v: iSelectOptions[]) {
    if (this._items?.map(i => i.value).join('') !== v?.map(i => i.value).join('')) {
      this._items = v;
      this.cdr.detectChanges();
    }
  }

  @Input() 
  public get selected(): string {
    return this._selected;
  }

  public set selected(v: string) {
    if (this._selected !== v) {
      this._selected = v;
      this.cdr.detectChanges();
    }
  }
  @Input() iconName = 'expand_more';
  @Input() iconStyle;
  @Input() iconType: 'normal' | 'svg' = 'normal';
  @Input() rotateOnOpen = true;

  @Output() onSelect = new EventEmitter<string>();

  isOpen = false;
  _items: iSelectOptions[];
  _selected: string;

  @ViewChild('menuTrigger') MatBtnMenu: MatMenuTrigger;

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  onItemClicked(value) {
    this.onSelect.emit(value);
  }

  onButtonClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    return false;
  }

  openMenu() {
    if (this.MatBtnMenu) {
      this.MatBtnMenu.openMenu();
    }
  }

}
