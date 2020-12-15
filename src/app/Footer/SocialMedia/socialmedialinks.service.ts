import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { BaseService } from "../../base.service";

@Injectable()
export class SocialMediaLinks extends BaseService {
  constructor(private _http: HttpClient) {
    super();
  }

  public Find(_apiURL: string): Observable<any[]> {
    const url = this.BaseUrl + "samplesocialmedia.json";
    return this._http.get(url).pipe(map((response: any) => {
      return response;
    }));
  }
}

