import { Component, OnInit, ViewEncapsulation, Input, ViewChild, ElementRef, AfterViewInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { generateNumberRange } from 'app/shared/utilities/helper.ultility';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { iSelectOptions, EstoreInputComponent } from '../forms/estore-input/estore-input.component';
import { ModalService } from '../modal/modal.service';
import gsap from "gsap";
import { GeneralPurposeService } from 'app/shared/services/general.service';
import { finalize, filter } from 'rxjs/operators';
import { SYS_DOWN_MSG } from 'app/shared/constants/error.constants';
import { untilDestroyed } from 'app/shared/services/until-destroyed.service';

export interface ITNPSSurveyItem {
  id: number;
  title?: string;
  question: string;
  hint?: string;
  min_value: number;
  max_value: number;
  max_low_value: number;
  min_high_value: number;
  value: number;
  is_main_survey?: boolean;
  positive_message: string;
  negative_message: string;
  positive_reasons: string[];
  negative_reasons: string[];
}

@Component({
  selector: 'app-tnps-popup',
  templateUrl: './tnps-popup.component.html',
  styleUrls: ['./tnps-popup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TnpsPopupComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() data;

  @Input()
  public get surveys() : ITNPSSurveyItem[] {
    return this._surveys;
  }

  @Input()
  public get isLoading() : boolean {
    return this._isLoading;
  }

  @Input() autoShow = true;
  
  public set isLoading(v : boolean) {
    this._isLoading = v;
  }
  _surveys: ITNPSSurveyItem[];

  public set surveys(v2 : ITNPSSurveyItem[]) {
    let val = v2;
    if (val) {
      const mainSurvey = val.find(v => v.is_main_survey);
      if (!mainSurvey) {
        val[0] = {
          ...val[0],
          is_main_survey: true,
        }
      }
    }
    this._surveys = val;
  }

  @ViewChild('feedbackTR') fbTR: EstoreInputComponent;
  @ViewChild('animateThis')
  public set animateThis(v : ElementRef) {
    if (v) {
      this.runAnimation();
    }
  }

  modal_id = 'estore-tnps-popup';
  tnpsForm: FormGroup;
  selectedRating = null;

  currentStep = 0;

  formQuestion: string;
  reasons: iSelectOptions[];
  _isLoading = false;

  isSendingData = false;

  isError = false;
  
  errorMessage;
  subscriber;

  constructor(
    private _modalService: ModalService,
    private _service: GeneralPurposeService,
  ) {
    this.tnpsForm = new FormGroup(
      {
        reason: new FormControl("", [
          Validators.required,
        ]),
        feedback: new FormControl({
          value: "",
          disabled: true,
        }),
      }
    );
  }

  get reasonControl() {
    return this.tnpsForm.get('reason');
  }

  get feedbackControl() {
    return this.tnpsForm.get('feedback');
  }

  ngOnInit(): void {
    this.reasonControl.valueChanges.subscribe(val => {
      if (val) {
        this.feedbackControl.enable();
        setTimeout(() => {
          this.fbTR?.focus();
        }, 0);
      } else {
        this.feedbackControl.disable();
      }
    });
  }

  onRatingChanged(value: MatButtonToggleChange, survey: ITNPSSurveyItem) {
    const selectedSurvey = this.surveys.find(s => s.id === survey.id);
    selectedSurvey.value = value?.value;
  }

  isPositiveReview(survey: ITNPSSurveyItem) {
    return survey.value > survey.max_low_value;
  }

  onClickNext() {
    if (this.currentStep <= this.surveys.length) {
      this.currentStep++;
      // Form screen
      if (this.currentStep === this.surveys.length) {
        let mainSurvey = this.surveys.find(s => s.is_main_survey) || this.surveys[this.surveys.length - 1];
        const isNegativeResponse = !this.isPositiveReview(mainSurvey);
        if (isNegativeResponse) {
          this.formQuestion = mainSurvey.negative_message
          this.reasons = mainSurvey.negative_reasons.map(itm => ({
            label: itm,
            value: itm,
          }));
        } else {
          this.formQuestion = mainSurvey.positive_message
          this.reasons = mainSurvey.positive_reasons.map(itm => ({
            label: itm,
            value: itm,
          }));
        }
      } else if (this.currentStep === this.surveys.length + 1) {
        // Submit
        this.onSubmitForm();
      } else {
        // this.runAnimation();
      }
    } else {
      this.closeModal();
    }
  }

  onClickPrev() {
    this.currentStep--;
  }

  onClickClose() {
    this._modalService.showConfirm({
      title: 'You are about to leave this survey 😥',
      message: 'Your response has not been submitted, are you sure you want to leave?',
      btnCancel: 'Leave',
      btnConfirm: 'Continue'
    }).subscribe(result => {
      if (!result) {
        this.closeModal();
      }
    });
  }

  closeModal(result = true) {
    this._modalService.close(this.modal_id, result);
  }

  generateNumberRangeFromSurvey(selectedSurvey: ITNPSSurveyItem) {
    return generateNumberRange(selectedSurvey.min_value, selectedSurvey.max_value);
  }

  isButtonDisabled() {
    const selectedSurvey = this.surveys?.[this.currentStep];
    if (selectedSurvey) {
      return selectedSurvey.value === null
    } else {
      return !this.tnpsForm.valid || this.isSendingData;
    }
  }

  onSubmitForm() {
    this.currentStep--;
    this.errorMessage = undefined;
    this.tnpsForm.markAllAsTouched();
    if (!this.tnpsForm.valid) return false;
    const mappedData = this.surveys.map((s, i) => ({
      [`question${i + 1}_rating`]: s.value,
      [`question${i + 1}_scenario`]: this.isPositiveReview(s) ? 'Positive' : 'Negative',
      [`question${i + 1}_reason`]: s.is_main_survey ? this.reasonControl.value : '',
      [`question${i + 1}_feedback`]: s.is_main_survey ? this.feedbackControl.value : '',
    })).reduce((acc, val) => Object.assign(acc, val), {});
    const data = {
      data: {
        ...this.data,
        ...mappedData,
      }
    };
    this.isSendingData = true;
    this._service.postTNPSData(data)
      .pipe(finalize(() => this.isSendingData = false))
      .subscribe(
        (_dt) => {
          if (!_dt?.['status']) {
            // this._modalService.showError({ title: 'Oops!', message: _dt['message'] || 'Something went wrong, please try again!' })
            //   .subscribe();
            this.errorMessage = _dt?.['message'] || SYS_DOWN_MSG;
          } else {
            this.currentStep++;
          }
        },
        (_err) => {},
      )
  }

  ngOnDestroy(): void {
    // Do nothing here
  }

  ngAfterViewInit(): void {
    this.subscriber = this._modalService.onShowModal
      .pipe(
        filter(value => value == this.modal_id),
        untilDestroyed(this),
      )
      .subscribe(
        _data => {
          if (!this.surveys) {
            this.isLoading = true;
            this._service.getTNPSSettings()
            .pipe(
              finalize(() => this.isLoading = false)
            )
            .subscribe(
              (resp: ITNPSSurveyItem[]) => {
                if (resp?.['status'] === false) {
                  this.isError = true;
                  this.errorMessage = resp['message'];
                  return true;
                } else {
                  if (resp?.[0].id) {
                    this.surveys = resp;
                    return true;
                  }
                }
                // something went wrong then close modal
                this.closeModal(false);
              },
              err => {
                this.isError = true;
              }
            );
          }
        }
      );
  }

  runAnimation() {
    const timeline = gsap.timeline({
      repeat: 5,
      repeatDelay: 2,
      delay: .5,
    });
    timeline.from('#Icon_Pointer', .2, {
      xPercent: -200,
      yPercent: 100,
    });
    timeline.from('#Icon_Pointer', .3, {
      rotate: 45,
    });
    timeline.from('.star', .5, {
      // opacity: 0,
      scale: 0,
      transformOrigin: '50% 50%',
      stagger: 0.1,
      ease: "bounce.out",
    });
  }

}
