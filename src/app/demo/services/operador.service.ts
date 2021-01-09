import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRestAdminService } from './base-rest-admin.service';
import { OperadorModel } from '../models/operador-model';

@Injectable({
    providedIn: 'root'
})
export class OperadorService extends BaseRestAdminService<OperadorModel>{

    constructor(public http: HttpClient) {
        super(http, "operador");
    }

    public listTipos(): Observable<String[]> {
        return this.http.get<String[]>(this.actionUrl + "list-tipos");
    }

    recoverEmail(email): Observable<any> {
        return this.http.post(
            this.getRequestUrl() + "recover/", email
        );
    }
}
