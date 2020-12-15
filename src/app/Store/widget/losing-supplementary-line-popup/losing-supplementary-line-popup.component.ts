import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-losing-supplementary-line-popup',
  templateUrl: './losing-supplementary-line-popup.component.html',
  styleUrls: ['./losing-supplementary-line-popup.component.css']
})
export class LosingSupplementaryLinePopupComponent implements OnInit {
  @Output() OnContinueSupplementaryPopup = new EventEmitter();
  @Output() OnLeaveSupplementaryPopup = new EventEmitter();
  @Input() popupType: any;
  public type: any;
  constructor() {}

  ngOnInit() {
  }
  public exitSupplementaryPopup() {
    this.OnContinueSupplementaryPopup.emit();
  }
  public loseSupplementaryLinePopup() {
    this.OnLeaveSupplementaryPopup.emit();
  }

  public cancelSwitching() {
    this.OnLeaveSupplementaryPopup.emit();
  }
  public continueSwitching() {
    this.OnContinueSupplementaryPopup.emit();
  }
}
