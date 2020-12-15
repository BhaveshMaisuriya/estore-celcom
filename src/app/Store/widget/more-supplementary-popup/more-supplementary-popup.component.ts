import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-more-supplementary-popup',
  templateUrl: './more-supplementary-popup.component.html',
  styleUrls: ['./more-supplementary-popup.component.css']
})
export class MoreSupplementaryPopupComponent {

  @Output() OnContinueSupplementaryPopup = new EventEmitter();
  constructor() {}

  public ExitSupplementaryPopup() {
    this.OnContinueSupplementaryPopup.emit();
  }

}
