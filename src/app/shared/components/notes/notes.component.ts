import { Component, OnInit, Input, ViewEncapsulation  } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotesComponent implements OnInit {

  constructor() { }

  @Input() notesContent: string;

  ngOnInit(): void {

  }

}
