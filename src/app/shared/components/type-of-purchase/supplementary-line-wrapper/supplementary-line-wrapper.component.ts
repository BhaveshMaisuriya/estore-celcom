import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { iSupplementary } from '../../../models/device.model';
import { typeOfPurchaseEnum } from 'app/Widget/side-summary/side-summary-container/type-of-purchase.store';
import { FamilyLinePlanService } from 'app/pages/family-line-plan/family-line-plan.service';
import { iInternetShare } from 'app/shared/models/plan.model';

@Component({
  selector: 'app-supplementary-line-wrapper',
  templateUrl: './supplementary-line-wrapper.component.html',
  styleUrls: ['./supplementary-line-wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SupplementaryLineWrapperComponent implements OnInit {

  @Input() supplementaryLines: iSupplementary[];
  @Input() topType = typeOfPurchaseEnum.newline;
  @Input() form;
  @Input() hideFamilyLineMessage = false;
  @Input() supplementaryLinePrice;
  @Input() internetShare: iInternetShare;

  @Output() onSubmit = new EventEmitter<string>();
  @Output() onChoose = new EventEmitter<{ controlName: string, controlValue: string }>();
  @Output() onRemove = new EventEmitter<string>();
  @Output() shareQuota = new EventEmitter();

  active: null | number = null;
  typeOfPurchaseOptions = typeOfPurchaseEnum;
  familyData;

  constructor( private familyLinePlanService: FamilyLinePlanService,) { }

  ngOnInit(): void {
  }

  submitSuppLine(suppLine) {
    this.onSubmit.next(suppLine);
  }

  chooseSuppLine(suppLine, number) {
    this.onChoose.next({ controlName: suppLine, controlValue: number });
  }

  removeSuppLine(suppLine) {
    this.onRemove.next(suppLine);
  }

  checkControlErrors(controlName, errorType) {
    if (errorType) {
      return (this.form.controls[controlName]?.touched && this.form.controls[controlName]?.errors?.[errorType]);
    } else {
      return (this.form.controls[controlName]?.touched &&
        (this.form.controls[controlName]?.errors?.required ||
          this.form.controls[controlName]?.errors?.pattern ||
          this.form.controls[controlName]?.errors?.custom));
    }
  }

  updateShareQuota() {
    this.shareQuota.next();
  }

}
