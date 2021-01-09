import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosModel } from '../models/usuarios-model';
import { BaseRestAuthService } from './base-rest-auth.service';


@Injectable({
    providedIn: 'root'
})
export class UsuariosService extends BaseRestAuthService<UsuariosModel>{

    constructor(public http: HttpClient) {
        super(http, 'user');
    }

    public get(filtro?: any): Observable<any> {
        const options = this.getHttpHeaders();
        const body = JSON.stringify(filtro);
        return this.http.get(this.actionUrl, this.getHttpHeaders());
    }

    public getRoles(): Observable<any> {
        return this.http.get(this.actionUrl + 'roles', this.getHttpHeaders());
    }

    public getStatus(idUsuario): Observable<any> {
      return this.http.get(this.actionUrl + idUsuario + "/log-status");
    }

    public postStatus(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.post<any>(this.actionUrl + "status", body, options);
    }

    public post(bodyPost: any): Observable<any> {
        const options = this.getHttpHeaders();
        const body = JSON.stringify(bodyPost);
        return this.http.post<any>(this.actionUrl, body, options);
    }

    public put(bodyPost: any): Observable<any> {
        const options = this.getHttpHeaders();
        const body = JSON.stringify(bodyPost);
        return this.http.put<any>(this.actionUrl, body, options);
    }

}
