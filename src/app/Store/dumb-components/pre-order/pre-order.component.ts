import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pre-order',
  templateUrl: './pre-order.component.html',
  styleUrls: ['./pre-order.component.css']
})
export class PreOrderComponent implements OnInit {
  @Input() preOrderCheck;
  constructor() { }

  ngOnInit() {
  }

}
