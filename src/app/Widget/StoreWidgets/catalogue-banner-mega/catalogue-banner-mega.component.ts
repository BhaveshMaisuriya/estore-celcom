
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgxSiemaService, NgxSiemaOptions } from 'ngx-siema';
import { AppService } from '../../../Service/app.service';

@Component({
  selector: 'app-store-catalogue-banner-mega',
  templateUrl: "./catalogue-banner-mega.component.html",
  styleUrls: ["./catalogue-banner-mega.component.css"],
  encapsulation: ViewEncapsulation.None,

})
export class CatalogueBannerMegaComponent implements OnInit {
  carousals = [];
  intervalID = null;
  interval = 1000;
  @Input() data: any;
  options: NgxSiemaOptions = {
    selector: '.siema',
    duration: this.interval,
    easing: 'ease-in-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    threshold: 20,
    loop: true,
    onInit: () => {
      // runs immediately after first initialization
    },
    onChange: (a) => {
      this.ngxSiemaService.currentSlide()
      .subscribe((data: any) => {
        this.setPageination(data.currentSlide);
      });

    },
  }
  constructor(private ngxSiemaService: NgxSiemaService, public service: AppService) {
    
  }
  ngOnInit() {

    this.carousals = this.data.carousals;
    this.intervalManager(true);
  }
  
  autoRotate() {
    this.ngxSiemaService.next(1);
  }

  intervalManager(flag) {
    if (flag) {
      this.intervalID =  setInterval(() => { this.autoRotate(); }, this.interval + this.data.duration);
    } else {
      clearInterval(this.intervalID);
    }
  }

  setPageination(pageNo) {
    this.carousals = this.carousals.map(i => { i.active = false; return i; });
    this.carousals[pageNo].active = true;
  }

  goTo(page) {
    this.ngxSiemaService.goTo(page.page)
      .subscribe((data: any) => {
        this.setPageination(page.page);
        this.intervalManager(false);
        this.intervalManager(true);
      });
  }
}