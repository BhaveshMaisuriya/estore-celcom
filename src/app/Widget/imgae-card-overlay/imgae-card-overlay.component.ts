import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imgae-card-overlay',
  templateUrl: './imgae-card-overlay.component.html',
  styleUrls: ['./imgae-card-overlay.component.css']
})
export class ImgaeCardOverlayComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
