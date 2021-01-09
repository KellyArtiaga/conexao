import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseRestService } from './base-rest.service';

export abstract class BaseRestAuthService<T> extends BaseRestService<T> {

    constructor(protected http: HttpClient, endpointName: string) {
        super(http, 'auth/' + endpointName);
    }

}
