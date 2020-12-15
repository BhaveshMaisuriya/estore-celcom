import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, SimpleChanges } from '@angular/core';
import { Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NguCarouselConfig, NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'app-device-carousel',
  templateUrl: './device-carousel.component.html',
  styleUrls: ['./device-carousel.component.scss']
})
export class DeviceCarouselComponent implements OnInit {
  @Input() deviceImages: string[];

  thumbsToShow: number = 3;
  thumbnailsArray: number[];
  totalThumbnails: number;

  withAnim = true;
  resetAnim = true;

  @ViewChild('deviceCarousel') deviceCarousel: NguCarousel<any>;

  deviceCarouselConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    load: 3,
    interval: { timing: 8000, initialDelay: 1000 },
    loop: true,
    touch: true,
    velocity: 0.5,
    point: {
      visible: true,
      hideOnSingleSlide: true
    }
  };

  constructor(@Inject(DOCUMENT) private document,
    private _renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.setTotalNoOfImages();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.deviceImages.firstChange) {
      if (changes.deviceImages.previousValue.join() !== changes.deviceImages.currentValue.join()) {
        this.setTotalNoOfImages();
        this.moveTo(0);         // Move to first slide on color selection
      }
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  setTotalNoOfImages() {
    this.thumbnailsArray = this.slidesArray;
    this.totalThumbnails = this.deviceImages.length;
  }

  reset() {
    this.deviceCarousel.reset(!this.resetAnim);
  }

  moveTo(slide) {
    this.deviceCarousel.moveTo(slide, !this.withAnim);
  }

  deviceGoTo(thumbnail) {
    this.deviceCarousel.moveTo(thumbnail, !this.withAnim);
  }

  get slidesArray(): number[] {
    this.thumbsToShow = this.deviceImages.length > 2 ? 3 : this.deviceImages.length;
    return Array(this.thumbsToShow ?? 0)
      .fill(0)
      .map((_, i) => i );
  }

  handleNextClick(): void {
    if (!this.isNextDisabled) {
      let arrLen = this.thumbnailsArray.length;
      let nextVal = this.thumbnailsArray[arrLen - 1] + 1;
      if(nextVal < this.totalThumbnails) {
        this.thumbnailsArray[arrLen] = nextVal;
      }
      this.thumbnailsArray.shift();
    }
  }

  handlePrevClick(): void {
    if (!this.isPrevDisabled) {
      let nextVal = this.thumbnailsArray[0];
      this.thumbnailsArray.unshift(nextVal - 1);
      this.thumbnailsArray.pop();
    }
  }

  get isPrevDisabled(): boolean {
    return this.thumbnailsArray[0] === 0;
  }

  get isNextDisabled(): boolean {
    if(this.totalThumbnails < this.thumbsToShow) {
      return true;
    }
    return this.totalThumbnails === this.thumbnailsArray[this.thumbnailsArray.length-1] + 1;
  }

}
