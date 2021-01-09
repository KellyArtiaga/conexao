import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppService } from './service';
import { EmailPost } from 'src/app/theme/shared/models/email.model';
import { UserContextService } from './user-context.service';
import { BaseRestAuthService } from './base-rest-auth.service';
import { Configuration } from './base.service';

@Injectable({
    providedIn: 'root'
})
export class EmailService extends AppService {
    protected actionUrl: string;


    constructor(public _http: HttpClient, private _userContextService: UserContextService, endpointName: string) {
        super('emails', _http, _userContextService);
        this.actionUrl =
            new Configuration().serverWithApiUrl + `${endpointName}/`;
    }

    postEmail(email: EmailPost): Observable<any> {
        const body = JSON.stringify(email);
        const url = this.actionUrl;
        return this._http.post<any>(`${url}`, body);
    }
}
