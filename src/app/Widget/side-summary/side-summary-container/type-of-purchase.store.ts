import { EntityStore, StoreConfig, QueryEntity, Store, Query } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { iSupplementary } from '../../../shared/models/device.model';
import { COBPResponse } from '../../../shared/models/cobp.model';
import { iGeneralServerResponse } from 'app/models/general.model';
import { isNullOrUndefined, getCOBPErrorFromResponse } from '../../../shared/utilities/helper.ultility';

export interface TypeofPurchaseState {
  type: typeOfPurchaseEnum;
  mobile_number?: string;
  supplementary_lines: iSupplementary[];
  cobp_response?: COBPResponse[];
  autobilling: number;
  /**
   * Share quota with supp lines
   */
  share_quota?: boolean;
  mnp_response?: iGeneralServerResponse[];
  is_broadband_eligible?: boolean;
  supplementary_numbers?: string[];
  new_line_completed?: boolean;
  disclaimer_agreed?: boolean;
  eKycStatus?: boolean;
  device_combo_number?: string;
}

export enum typeOfPurchaseEnum {
  newline = 'Get a New Number',
  cobp = 'Change Pass/ Plan',
  mnp = 'Switch to Celcom',
}

export function createInitialState(): TypeofPurchaseState {
  return {
    type: null,
    supplementary_lines: [],
    autobilling: 0,
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'type_of_purchase' })
export class TypeofPurchaseStore extends Store<TypeofPurchaseState> {
  constructor() {
    super(createInitialState());
  }
}

@Injectable({
  providedIn: 'root'
})
export class TypeofPurchaseQuery extends Query<TypeofPurchaseState> {

  isCOBPEligible$ = this.select(state => {
    const cobp = state.cobp_response?.[0];
    const cobp_resp = getCOBPErrorFromResponse(cobp);
    if(cobp_resp === null) return true;
    return false;
  });

  cobpResponse$ = this.select(state => state.cobp_response);


  constructor(
    protected store: TypeofPurchaseStore,
  ) {
    super(store);
  }

  akitaPreUpdate(prevState: TypeofPurchaseState, nextState: TypeofPurchaseState) {
    if (isNullOrUndefined(nextState.mobile_number)) {
      nextState = {
        ...nextState,
        cobp_response: null,
      }
    }
    return nextState;
  }
}
