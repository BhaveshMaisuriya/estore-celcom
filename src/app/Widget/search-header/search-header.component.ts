import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.css']
})
export class SearchHeaderComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
