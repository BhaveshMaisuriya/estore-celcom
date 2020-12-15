import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestOptions, Headers } from '@angular/http';
import { BaseService } from '../../../base.service';
import { AppService } from '../../../Service/app.service';
import { environment } from 'environments/environment';

@Injectable()
export class DeviceSupplimentaryLinesService extends BaseService {
    prodServer: boolean = environment.production;
    constructor(private _service: AppService) {
        super();
    }
}
