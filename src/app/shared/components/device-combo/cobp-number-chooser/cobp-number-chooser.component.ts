import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { trigger, transition, style, group, animate, query, stagger } from '@angular/animations';
import { SupplementaryData, iInternetShare } from 'app/shared/models/plan.model';
import { generateNumberRange } from 'app/shared/utilities/helper.ultility';
import { ModalService } from '../../modal/modal.service';

export const insertRemoveTrigger = trigger('myInsertRemoveTrigger', [
  transition(':enter', [
    style({
      height: '0',
      opacity: '0',
      overflow: 'visible'
    }),
    group([
      animate('200ms ease-in', style({
        height: '*',
      })),
      animate('500ms ease-in', style({
        opacity: '1',
      })),
    ]),
  ]),
  transition(':leave', [
    style({
      height: '*',
      opacity: '1',
      overflow: 'visible'
    }),
    animate('.5s ease-out', style({
      height: '0',
      opacity: '0',
    }))
  ]),
]);
@Component({
  selector: 'app-cobp-number-chooser',
  templateUrl: './cobp-number-chooser.component.html',
  styleUrls: ['./cobp-number-chooser.component.scss'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(':enter', [
          style({
            transform: 'translateY(-50px)',
          }),
          stagger(5, [
            animate('0.5s',
              style({
                transform: 'none',
              })
            )
          ])
        ], { optional: true })
      ])
    ]),
    insertRemoveTrigger,
  ],
})
export class CobpNumberChooserComponent implements OnInit {

  @Input()
  public get suppNumbers() {
    return this._suppNumbers;
  }

  public set suppNumbers(v : string[]) {
    this._suppNumbers = v?.filter(s => s?.trim().length > 0);
  }

  @Input()
  public get deviceComboNumber() {
    return this._deviceComboNumber;
  }

  public set deviceComboNumber(v : string) {
    this._deviceComboNumber = v?.trim()?.length > 0 ? v : undefined;
  }

  @Input()
  public get principalNumber() {
    return this._principalNumber;
  }

  public set principalNumber(v: string) {
    if (this.principalNumber !== v) {
      this._principalNumber = v;
      this.isPrincipalOpen = false;
      // auto open supplines
      // setTimeout(() => {
        this.isSuppOpen = true;
      // }, 0);
    }
  }
  @Input()
  public get supplementaryData() {
    return this._supplementaryData;
  }

  public set supplementaryData(v: SupplementaryData) {
    if (JSON.stringify(this._supplementaryData) !== JSON.stringify(v)) {
      this._supplementaryData = v;
      this.suppDataArray = this.generateNumberRangeforSupp();
    }
  }
  @Input() contract_name = 'Phone + Phone';

  @Input() isWhiteBackground = true;
  @Input() internet_share: iInternetShare;
  @Input() share_quota: boolean = false;
  
  @Input()
  public get isNewLine() {
    return this._isNewLine;
  }

  public set isNewLine(v: boolean) {
    this._isNewLine = !!v;
    if (this._isNewLine && !this.principalNumber) {
      this.isPrincipalOpen = true;
    }
  }

  @Output() onSelectComboNumber = new EventEmitter<string>();
  @Output() onSelectSupplementary = new EventEmitter<string[]>();
  @Output() onSelectPrincipal = new EventEmitter<string>();
  @Output() onSelectingNumber = new EventEmitter<boolean>();
  @Output() onToggleInternetshareCheckbox = new EventEmitter<boolean>();
  private _isSuppOpen = false;
  public get isSuppOpen() {
    return this._isSuppOpen;
  }

  public set isSuppOpen(v: boolean) {
    // Prevent open while principal is open
    if (!this.isPrincipalOpen && v) {
      this._isSuppOpen = !!v;
      if (this._isSuppOpen) {
        this.isPrincipalOpen = false;
      }
    }
  }
  
  _isPrincipalOpen = false;
  public get isPrincipalOpen() {
    return this._isPrincipalOpen;
  }

  public set isPrincipalOpen(v: boolean) {
    // Prevent close before choosing number
    if ((!this._isPrincipalOpen && v) || this.principalNumber) {
      if (this.isNewLine) {
        this._isPrincipalOpen = !!v;
        if (this._isPrincipalOpen) {
          this._isSuppOpen = false;
        }
      }
    }
  }

  _principalNumber: string;
  _suppNumbers: string[];
  _deviceComboNumber: string;
  _supplementaryData: SupplementaryData;
  _isNewLine = false;
  suppDataArray = [];
  isSelectingNumber = false;

  constructor(
    private _modalService: ModalService,
  ) { }

  ngOnInit(): void {
  }

  onClickComboNumber(value) {
    this.onSelectComboNumber.emit(value);
  }

  onSelectSuppNumber(value) {
    // this.deviceComboNumber = value;
    // this.onSelectSupplementary.emit(value);
    this.isSuppOpen = false;
  }

  onSelectPrincipalNumber(value) {
    if (!this.isNewLine) {
      return false;
    }
    // this.principalNumber = value;
    this.onSelectPrincipal.emit(value);
  }

  generateNumberRangeforSupp() {
    const max = +this.supplementaryData?.max_line;
    if (max === 1) {
      return [1];
    } else if (max < 1) {
      return [];
    }
    return generateNumberRange(1, max);
  }

  onAddSupp(value, idx) {
    if ([
        this.principalNumber,
        ...this.suppNumbers,
      ].find(n => n === value)) {
      this._modalService.showError({
        message: "You have already selected this number!"
      })
      return false;
    }
    this.suppNumbers[idx] = value;
    this.onSelectSupplementary.emit(this.suppNumbers);
  }

  onUserSelectingNumber(value) {
    this.onSelectingNumber.emit(value);
    this.isSelectingNumber = value;
  }

  onClickInternetshareCheckbox(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.onToggleInternetshareCheckbox.emit(!this.share_quota);
    return false;
  }

}
