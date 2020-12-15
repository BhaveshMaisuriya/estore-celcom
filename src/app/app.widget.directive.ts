import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[app-widget]',
})
export class AppWidgetDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}