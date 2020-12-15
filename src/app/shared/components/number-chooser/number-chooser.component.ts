import { Component, OnInit, Renderer2, AfterContentInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from 'app/Service/product.service';
import * as errorconst from "app/../constants/error.constants";
import { finalize } from 'rxjs/operators';
import { DeviceDetailsNumberService } from 'app/Widget/StoreWidgets/device-details/device-details-choose-number/device-details-choose-number.service';
import { GeneralPurposeService } from 'app/shared/services/general.service';

@Component({
  selector: 'app-number-chooser',
  templateUrl: './number-chooser.component.html',
  styleUrls: ['./number-chooser.component.scss']
})
export class NumberChooserComponent implements OnInit, AfterContentInit {

  @Output() onSelectNumber = new EventEmitter();
  @Input() type: "postpaid" | "prepaid" = "prepaid";
  @Input() label = "Choose a new number";
  @Input() autoSelectNumber = true;
  @Input() additionalRequestPayload = {};

  availableNumbers: any[] = [];
  availableNumberToDisplay: any[] = [];
  pager: any = {};
  errorMessage = {
    message: "Uh Oh. Please enter [2-4] digits to search for your favourite number.",
    noNumbersDisplay: "Uh Oh. No numbers available for this pattern. Please try a different pattern.",
    apiError: "Uh Oh. Numbers are unavailable now. Please try again later."
  };
  error = null;
  loading = false;
  searchNumber;
  totalPageItems: any[];
  selectedNumber;

  constructor(
    private _generalService: GeneralPurposeService,
  ) { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    this.getRefreshNumbers();
  }

  public numberValidation(ev) {
    // Added keyCodes for backspace, enter. FF doesn't support ev.keyCode, so using ev.which
    const numberValues = [48, 49, 50, 51, 52, 53, 54, 55, 13, 56, 57, 8, 16, 17];
    const code = ev.keyCode || ev.which;
    const result = numberValues.indexOf(code);

    if (result < 0) {
      ev.preventDefault();
    }
  }

  public numberKeyHandler(ev) {
    this.error = null;
    const code = ev.keyCode || ev.which;
    if (code === 13) {
      this.searchNumbersForPattern();
    }
  }

  getRefreshNumbers() {
    this.searchNumber = null;
    this.searchNumbersForPattern();
  }

  public searchNumbersForPattern() {
    this.loading = true;
    this.error = null;
    const retrieveNumberURL = this.type === 'postpaid'
      ? "/rest/V1/retrieve-number"
      : "/rest/V1/prepaid-numbers";

    const searchStringLength = this.searchNumber ? this.searchNumber.toString().length : 0;
    // request for retrieve numbers
    const dataForRetrieveNumberAPI = {
      data: {
        numberService: this.type === 'postpaid' ? "POSTPAID" : "PREPAID",
        sourceSystem: "",
        numRecords: "30",
        planType: "VOICE",
        numberCategory: "NORMAL",
        numberPattern: searchStringLength > 0 ? this.searchNumber : undefined,
        criteria: searchStringLength > 0 ? "CONTAINS" : undefined,
        ...this.additionalRequestPayload,
      }
    };
    this._generalService
      .getNewNumbers(retrieveNumberURL, dataForRetrieveNumberAPI)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        response => {
          try {
            this.availableNumbers = response[0].mobile_numbers ?? [];
            this.setPage(1);

            // ? If no number is found
            if (response[0].mobile_numbers === undefined && response[0].message) {
              this.error = response[0].message;
            }

          } catch (error) {
            this.error = this.errorMessage.apiError;
          }
        },
        err => {
          this.error = errorconst.SYS_DOWN_MSG;
        }
      );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this._generalService.getNumberPager(this.availableNumbers.length, page);
    // get current page of items
    this.availableNumberToDisplay = this.availableNumbers.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  SelectNumber(number) {
    if (this.autoSelectNumber) {
      this.selectedNumber = number;
    }
    this.onSelectNumber.emit(number);
    if (number?.length == 0) {
      this.getRefreshNumbers();
    }
  }

}
