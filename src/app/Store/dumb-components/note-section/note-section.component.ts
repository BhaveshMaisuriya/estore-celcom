import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-section',
  templateUrl: './note-section.component.html',
  styleUrls: ['./note-section.component.css']
})
export class NoteSectionComponent implements OnInit {
  @Input() noteCheck: boolean;
  @Input() cartNoteCheck: boolean;
  @Input() notes: any;
  @Input() bBNoteCheck: any;
  @Input() noteDataCMS: any;
  showCartSummaryNote = false;
  constructor() { }

  ngOnInit() {
    const currentDate = new Date();
    const minDate = new Date('January 16 2020 00:00');
    const maxDate = new Date('February 02 2020 00:00');
    if (currentDate >= minDate && currentDate < maxDate ) {
    this.showCartSummaryNote = true;
    } else {
      this.showCartSummaryNote = false;
    }
  }
}
