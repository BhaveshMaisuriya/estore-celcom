import {Headers, RequestOptions} from '@angular/http';
import * as apiUrlConst from './shared/constants/apiUrl.constants';
import { environment } from 'environments/environment';

export class BaseService {
    BaseUrl: string;
    AppAuth: string;
    API_URL_CONST: any;
    constructor() {
        this.BaseUrl = environment.nodeUrl;
        this.API_URL_CONST = apiUrlConst;
    }

    public GenerateHeader(): RequestOptions {
        const _headers = new Headers();
        _headers.append("Content-Type", "application/hal+json");
        const options = new RequestOptions({ headers: _headers });
        return options;
    }
}
