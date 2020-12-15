import { Directive, Input, ElementRef, TemplateRef, ComponentRef, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-webp-wrapper',
  template: `
  <picture>
    <source *ngIf="src" type="image/webp" [srcset]="src">
    <ng-container *ngTemplateOutlet="template"></ng-container>
  </picture>
  `,
  styles: [``]
})
export class WebpWrapperComponent {
  @Input() template: TemplateRef<any>;
  @Input() src = '';

  constructor() { 
    // this.src = this.template.elementRef.nativeElement.src;
  }
}


@Directive({
  selector: '[appWebp]'
})
export class WebpDirective implements OnInit{

  @Input() appWebp;

  private wrapper: ComponentRef<WebpWrapperComponent>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { 
  }

  ngOnInit() {
    const contanerFactory = this.componentFactoryResolver.resolveComponentFactory(WebpWrapperComponent);
    this.wrapper = this.viewContainerRef.createComponent(contanerFactory);
    this.wrapper.instance.template = this.templateRef;
    this.wrapper.instance.src = this.appWebp;
  }

}
