import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperadorModel } from '../models/operador-model';
import { BaseRestAuthService } from './base-rest-auth.service';
import { BaseRestAdminService } from './base-rest-admin.service';


@Injectable({
  providedIn: 'root'
})
export class EmpresasService extends BaseRestAdminService<any> {

  constructor(public http: HttpClient) {
    super(http, 'empresas');
  }

  public get(filtro?: any): Observable<any> {
      return this.http.get(this.actionUrl, this.getHttpHeaders());
  }
  public getPage(page ?: number, filtro ?: any): Observable<any> {
    return this.http.get(this.actionUrl + "page?page=" + page + (filtro ? '&search='+filtro : ""));
  }


  public getRoles(): Observable<any> {
      return this.http.get(this.actionUrl + 'roles', this.getHttpHeaders());
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


	public postContrato(bodyPost: any): Observable<any> {
    const options = this.getHttpHeaders();
    const body = JSON.stringify(bodyPost);
    return this.http.post<any>(this.actionUrl + "contrato", body, options);
  }

  public getResponsavelContrato(idEmpresa): Observable<any> {
    return this.http.get(this.actionUrl + idEmpresa + "/contrato");
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

  public getDadosContrato(idEmpresa): Observable<any> {
    return this.http.get(this.actionUrl + idEmpresa + "/dados-contrato");
  }

  public getStatus(idEmpresa): Observable<any> {
    return this.http.get(this.actionUrl + idEmpresa + "/log-status");
  }

  public postStatus(bodyPost: any): Observable<any> {
    const options = this.getHttpHeaders();
    const body = JSON.stringify(bodyPost);
    return this.http.post<any>(this.actionUrl + "status", body, options);
  }

  public postEnviarAcesso(bodyPost: any): Observable<any> {
    const options = this.getHttpHeaders();
    const body = JSON.stringify(bodyPost);
    return this.http.post<any>(this.actionUrl + "contrato/enviar-acesso", body, options);
  }

  public getSelect(): Observable<any> {
    return this.http.get(this.actionUrl + "select");
  }
}
