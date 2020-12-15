import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-title-box-link',
  templateUrl: './title-box-link.component.html',
  styleUrls: ['./title-box-link.component.css']
})
export class TitleBoxLinkComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
