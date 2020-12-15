import { Component, OnInit, Input } from '@angular/core';
import { NguCarousel } from '@ngu/carousel';

@Component({
  selector: 'important-notice',
  templateUrl: './important-notice.component.html',
  styleUrls: ['./important-notice.component.css']
})
export class ImportantNoticeComponent implements OnInit {

  @Input() data: any;

  constructor() {
  }


  ngOnInit() { }


}