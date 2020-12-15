import { DOCUMENT } from '@angular/common';
import { Directive, ElementRef, Inject, Input, OnInit } from '@angular/core';

@Directive({ selector: '[autofocus]' })
export class AutoFocusDirective implements OnInit {
  private host: HTMLElement;
  private focused: Element;
  private autoFocus = true;

  @Input()
  set autofocus(value: boolean) {
    this.autoFocus = value;
  }

  constructor(private elRef: ElementRef, @Inject(DOCUMENT) private document) {
    this.host = elRef.nativeElement;
    this.focused = document.activeElement;
  }

  ngOnInit(): void {
    if (this.autoFocus && this.host && this.host !== this.focused) {
      setTimeout(() => this.host.focus());
    }
  }
}
