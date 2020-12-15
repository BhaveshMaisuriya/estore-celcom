import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NguCarousel, NguCarouselConfig } from '@ngu/carousel';

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number;
  @Input() currentPage: number;
  @Output() onPageClick: EventEmitter<number> = new EventEmitter();

  @ViewChild('pageCarousel') pageCarousel: NguCarousel<any>;

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 3, sm: 3, md: 3, lg: 3, all: 0 },
    load: 3,
    slide: 1,
    touch: true,
    velocity: 0.2,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };

  constructor() {}

  ngOnInit(): void {}


  get pageArray(): number[] {
    return Array(this.totalPages ?? 0)
      .fill(0)
      .map((_, i) => i + 1);
  }

  handlePageClick(page: number): void {
    this.pageCarousel?.moveTo(page >= 2 ? page - 2 : 0);
    this.onPageClick.emit(page);
  }

  handleNextClick(): void {
    if (!this.isNextDisabled) {
      if (this.pageCarousel) {
        this.pageCarousel.moveTo(this.pageCarousel.activePoint + 1);
      }
    }
  }

  handlePrevClick(): void {
    if (!this.isPrevDisabled) {
      if (this.pageCarousel) {
        this.pageCarousel.moveTo(this.pageCarousel.activePoint - 1);
      }
    }
  }

  get isPrevDisabled(): boolean {
    return this.pageCarousel?.activePoint === 0;
  }

  get isNextDisabled(): boolean {
    return this.pageCarousel?.activePoint === Number(this.totalPages) - 3;
  }

  get activePoint() {
    return this.pageCarousel?.activePoint ?? 'null';
  }
}
