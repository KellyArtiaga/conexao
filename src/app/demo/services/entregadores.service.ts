import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entregador } from '../models/entregador-model';
import { BaseRestAuthService } from './base-rest-auth.service';
import { BaseRestAdminService } from './base-rest-admin.service';


@Injectable({
  providedIn: 'root'
})
export class EntregadoresService extends BaseRestAdminService<any> {

  constructor(public http: HttpClient) {
    super(http, 'cooperados');
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

  public getStatus(idEntregador): Observable<any> {
    return this.http.get(this.actionUrl + idEntregador + "/log-status");
  }

  public postStatus(bodyPost: any): Observable<any> {
    const options = this.getHttpHeaders();
    const body = JSON.stringify(bodyPost);
    return this.http.post<any>(this.actionUrl + "status", body, options);
  }
  public postSituacao(bodyPost: any): Observable<any> {
    const options = this.getHttpHeaders();
    const body = JSON.stringify(bodyPost);
    return this.http.post<any>(this.actionUrl + "situacao", body, options);
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

  public getEstadosCivis(): Observable<any> {
    return this.http.get(this.actionUrl + "estado-civil ");
  }

  public postEnviarAcesso(bodyPost: any): Observable<any> {
    const options = this.getHttpHeaders();
    const body = JSON.stringify(bodyPost);
    return this.http.post<any>(this.actionUrl + "contrato/enviar-acesso", body, options);
  }

  public getCategoriasCnh(): Observable<any> {
    return this.http.get(this.actionUrl + "categorias-cnh");
  }
  public getVinculos(): Observable<any> {
    return this.http.get(this.actionUrl + "vinculos");
  }

  public getDadosBancarios(id): Observable<any> {
    return this.http.get(this.actionUrl + "contas-bancarias?cooperadoId="+id);
  }

  public postDadosBancarios(bodyPost: any): Observable<any> {
    const options = this.getHttpHeaders();
    const body = JSON.stringify(bodyPost);
    return this.http.post<any>(this.actionUrl + "contas-bancarias", body, options);
  }

  public putDadosBancarios(bodyPost: any, id): Observable<any> {
    const options = this.getHttpHeaders();
    const body = JSON.stringify(bodyPost);
    return this.http.put<any>(this.actionUrl + "contas-bancarias/"+id, body, options);
  }
  public deleteDadosBancarios(id): Observable<any> {
    const options = this.getHttpHeaders();
    return this.http.delete<any>(this.actionUrl + "contas-bancarias/"+id, options);
  }

  public getSituacoes(): Observable<any> {
    return this.http.get(this.actionUrl + "situacoes");
  }
}
