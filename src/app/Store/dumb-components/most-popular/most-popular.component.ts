import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-most-popular',
  templateUrl: './most-popular.component.html',
  styleUrls: ['./most-popular.component.css']
})
export class MostPopularComponent implements OnInit {
  @Input() showComponent;
  constructor() { }
  ngOnInit() {
  }

}
