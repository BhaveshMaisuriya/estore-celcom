import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-card3',
  templateUrl: './image-card3.component.html',
  styleUrls: ['./image-card3.component.css']
})
export class ImageCard3Component implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
