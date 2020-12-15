import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'age-eligibility-popup-component',
  templateUrl: './ageeligiblity.popup.component.html',
  styleUrls: ['./ageeligiblity.popup.component.css']
})
export class AgeEligibilityPopupComponent implements OnInit {

  @Output() OnContinue = new EventEmitter();
  @Input() EligibilityPopupType: any;
  @Input() DisplayPromotionalLifeStyle: any;
  @Input() promotionalPlan: any;
  @Input() promotionType: any;
  constructor() {
  }

  ngOnInit() {
  }

  public emitContinue() {
    const data = {
      type: this.EligibilityPopupType.displayType
    };
    this.OnContinue.emit(data);
  }

  public Redirect(planUrl: string) {
    window.location.href = planUrl;
  }

  public OnLifeStyle() {
    if (typeof window !== 'undefined' && this.promotionalPlan !== undefined) {
      this.Redirect("/plans/" + this.promotionalPlan);
    } else {
      this.OnContinue.emit();
    }
  }
}
