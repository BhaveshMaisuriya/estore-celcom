import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { ICardOptions } from 'app/shared/models/general.model';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

@Component({
  selector: 'app-card-options',
  templateUrl: './card-options.component.html',
  styleUrls: ['./card-options.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(':enter', [
          style({
            transform: 'translateY(-50px)',
          }),
          stagger(50, [
            animate('0.5s',
              style({
                transform: 'none',
              })
            )
          ])
        ], { optional: true }
        )
      ])
    ])
  ]
})
export class CardOptionsComponent implements OnInit {

  @Input() options: ICardOptions[];
  @Input() selectedOption: string;
  @Input() isDeviceCard = false;
  @Input() isReloadCard = false;
  @Output() onSelect = new EventEmitter();

  @Input() disabled = false;
  @Input() isLoading = true;

  cardContainer: ElementRef;

  @ViewChild('cardContainer') set cardEl(el : ElementRef) {
    if (el) {
      this.onScroll({
        target: {
          scrollLeft: 0,
          offsetLeft: 0,
        }
      });
    }
    this.cardContainer = el;
  };

  currentSection;

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(value) {
    this.onSelect.emit(value);
  }

  onScroll(event: any) {
    if (!this.isDeviceCard || !this.cardContainer) return false;
    let currentSection: string;
    const spiedTags = ['DIV'];
    const children = (<HTMLElement[]>Array.from(<HTMLCollection>this.cardContainer.nativeElement.children));
    const scrollLeft = event.target.scrollLeft;
    const parentOffset = event.target.offsetLeft;
    for (let i = 0; i < children.length; i++) {
        const element = children[i];
        if (spiedTags.some(spiedTag => spiedTag === element.tagName)) {
            if ((element.offsetLeft - parentOffset) <= (scrollLeft + element.offsetWidth)) {
                currentSection = `el-${i}`;
            }
        }
    }
    if (currentSection !== this.currentSection) {
        this.currentSection = currentSection;
        // console.info(this.currentSection);
        // this.sectionChange.emit(this.currentSection);
    }
}

}
