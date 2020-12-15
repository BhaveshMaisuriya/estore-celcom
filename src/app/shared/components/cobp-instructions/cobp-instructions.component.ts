import { Component, Input, OnInit } from '@angular/core';

export interface iCOBPInstruction {
  title: string;
  steps?: Step[];
}

export interface Step {
  image?: string;
  description: string;
  cta_button: CtaButton;
}

export interface CtaButton {
  label: string;
  action: string;
}

@Component({
  selector: 'app-cobp-instructions',
  templateUrl: './cobp-instructions.component.html',
  styleUrls: ['./cobp-instructions.component.scss']
})

export class COBPInstructionsComponent implements OnInit {

  @Input() data: iCOBPInstruction;

  constructor() { }

  ngOnInit(): void {
  }

}
