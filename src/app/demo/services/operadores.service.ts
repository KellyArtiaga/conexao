import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperadorModel } from '../models/operador-model';
import { BaseRestAuthService } from './base-rest-auth.service';
import { BaseRestAdminService } from './base-rest-admin.service';


@Injectable({
    providedIn: 'root'
})
export class OperadoresService extends BaseRestAdminService<OperadorModel>{

    constructor(public http: HttpClient) {
        super(http, 'operadores');
    }

    public get(filtro?: any): Observable<any> {
        return this.http.get(this.actionUrl);
    }
    public getPage(page ?: number, filtro ?: any): Observable<any> {
      return this.http.get(this.actionUrl + "page?page=" + page + (filtro ? '&search='+filtro : ""));
    }

    public getRoles(): Observable<any> {
        return this.http.get(this.actionUrl + 'roles');
    }

    public post(bodyPost: any): Observable<any> {
        const options = this.getHttpHeaders();
        const body = JSON.stringify(bodyPost);
        return this.http.post<any>(this.actionUrl, body, options);
    }

	  public postContrato(bodyPost: any): Observable<any> {
        const options = this.getHttpHeaders();
        const body = JSON.stringify(bodyPost);
        return this.http.post<any>(this.actionUrl + "contrato", body, options);
    }

    public put(bodyPost: any): Observable<any> {
        const options = this.getHttpHeaders();
        const body = JSON.stringify(bodyPost);
        return this.http.put<any>(this.actionUrl, body, options);
    }

    public getStatus(idOperador): Observable<any> {
      return this.http.get(this.actionUrl + idOperador + "/log-status");
    }

    public getResponsavelContrato(idOperador): Observable<any> {
      return this.http.get(this.actionUrl + idOperador + "/contrato");
    }

    public postResponsavelContrato(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.post<any>(this.actionUrl + "contrato", body, options);
    }

    public putResponsavelContrato(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.put<any>(this.actionUrl + "contrato", body, options);
    }

    public postStatus(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.post<any>(this.actionUrl + "status", body, options);
    }

    public getDadosContrato(idOperador): Observable<any> {
      return this.http.get(this.actionUrl + idOperador + "/dados-contrato");
    }

    public postEnviarAcesso(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.post<any>(this.actionUrl + "contrato/enviar-acesso", body, options);
    }
}
