import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';
import { CidadeModel } from '../models/cidade-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponseModel } from '../models/base-response-model';
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
    providedIn: 'root'
})
export class CidadeService extends BaseRestAdminService<CidadeModel> {

    constructor(public http: HttpClient) {
        super(http, "cidade");
    }

    public listByEstado(estadoId: number): Observable<BaseResponseModel<CidadeModel[]>> {
        return this.http.get<BaseResponseModel<CidadeModel[]>>(this.actionUrl + "busca-por-estado/" + estadoId);
    }
}
