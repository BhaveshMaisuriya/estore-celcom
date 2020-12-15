import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-findings',
  templateUrl: './search-findings.component.html',
  styleUrls: ['./search-findings.component.css']
})
export class SearchFindingsComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit() {
  }

}
