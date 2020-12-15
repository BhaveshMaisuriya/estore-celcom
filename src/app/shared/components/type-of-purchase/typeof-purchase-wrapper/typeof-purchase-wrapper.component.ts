import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { typeOfPurchaseEnum } from 'app/Widget/side-summary/side-summary-container/type-of-purchase.store';

export interface iToPEvent {
  type: string;
  data: any;
}
@Component({
  selector: 'app-typeof-purchase-wrapper',
  templateUrl: './typeof-purchase-wrapper.component.html',
  styleUrls: ['./typeof-purchase-wrapper.component.scss']
})
export class TypeofPurchaseWrapperComponent implements OnInit {


  @Input() newline: boolean = true;
  @Input() cobp: boolean = true;
  @Input() mnp: boolean = true;
  @Input() selectedType: string = null;
  @Input() showOptions = true;
  @Input() disabled = false;
  @Input() customChildren = false;

  @Output() onSelect = new EventEmitter();
  @Output() onEvent = new EventEmitter();

  typeOfPurchaseOptions = typeOfPurchaseEnum;

  constructor() { }

  ngOnInit(): void {
  }

  selectedItem(purchaseType) {
    if (typeOfPurchaseEnum[purchaseType] === this.selectedType) {
      return false;
    }
    this.onSelect.emit(purchaseType);
  }

  onComponentEvent(type, data) {
    const eventData: iToPEvent = {
      type,
      data,
    };
    this.onEvent.emit(eventData);
  }
}
