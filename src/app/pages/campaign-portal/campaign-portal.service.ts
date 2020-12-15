import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HOST } from 'app/Service/app.service';
import { SYS_DOWN_MSG } from 'app/shared/constants/error.constants';
import { iGeneralServerResponse } from 'app/shared/models/general.model';

export interface iCampaignValidityObject extends iGeneralServerResponse {
    omni_promotion_url?: string;
}

@Injectable()
export class CampaignService {
  nric: string;
  domain = HOST;

  constructor(
    private http: HttpClient,
  ) { }

  loadCampaign(data): Observable<iCampaignValidityObject>{
    return this.http
        .post<iCampaignValidityObject>(`${this.domain}/rest/V1/omnichanneloffervalidate`,
        {...data}, {observe: 'response' })
        .pipe(
            map(response => response?.body?.[0]),
            catchError(_err => {
              const error: iGeneralServerResponse = {
                message: SYS_DOWN_MSG,
                status: false,
                statusNumber: _err?.['statusCode']
              };
              if (_err?.['statusCode'] == 400) {
                error.message = 'Invalid campaign URL!';
              }
              return of(error);
            })
        );
  }
}
