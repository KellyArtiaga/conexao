import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosModel } from '../models/usuarios-model';
import { BaseRestAuthService } from './base-rest-auth.service';


@Injectable({
    providedIn: 'root'
})
export class TenantService extends BaseRestAuthService<UsuariosModel>{

    constructor(public http: HttpClient) {
        super(http, 'tenant');
    }

    public get(): Observable<any> {
        return this.http.get(this.actionUrl, this.getHttpHeaders());
    }

}
