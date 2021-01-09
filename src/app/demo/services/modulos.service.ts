import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OperadorModel } from '../models/operador-model';
import { BaseRestAuthService } from './base-rest-auth.service';
import { BaseRestAdminService } from './base-rest-admin.service';


@Injectable({
    providedIn: 'root'
})
export class ModulosService extends BaseRestAdminService<OperadorModel>{

    constructor(public http: HttpClient) {
        super(http, 'servicos');
    }

    public get(filtro?: any): Observable<any> {
        return this.http.get(this.actionUrl, this.getHttpHeaders());
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
        return this.http.put<any>(this.actionUrl+ "operador", body, options);
    }

    public putEmpresa(bodyPost: any): Observable<any> {
        const options = this.getHttpHeaders();
        const body = JSON.stringify(bodyPost);
        return this.http.put<any>(this.actionUrl+ "empresa", body, options);
    }

    public getOperatorsServices(operadorId): Observable<any> {
      return this.http.get(this.actionUrl + `operador/${operadorId}/modulos`, this.getHttpHeaders());
    }

    public create(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.post<any>(this.actionUrl + "operador", body, options);
    }

    public createServicoEmpresa(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.post<any>(this.actionUrl + "empresa", body, options);
    }

    public getById(id): Observable<any> {
      return this.http.get(this.actionUrl + id, this.getHttpHeaders());
    }

    public getByIdEmpresa(id): Observable<any> {
      return this.http.get(this.actionUrl + `empresa/${id}`, this.getHttpHeaders());
    }

    public getByIdServico(id): Observable<any> {
      return this.http.get(this.actionUrl + `${id}/empresa`, this.getHttpHeaders());
    }
    public getModulos(): Observable<any> {
      return this.http.get(this.actionUrl + "modulos", this.getHttpHeaders());
    }

    public getEmpresasModulos(tenantId): Observable<any> {
      return this.http.get(this.actionUrl + `tenant/${tenantId}/modulos`, this.getHttpHeaders());
    }

    public getTiposPrecificacao(): Observable<any> {
      return this.http.get(this.actionUrl + "tipos-precificacao?isOperador=false", this.getHttpHeaders());
    }

    public getPrecificacaoSalva(precificacaoId): Observable<any> {
      return this.http.get(this.actionUrl + `empresa/precificacao/${precificacaoId}`, this.getHttpHeaders());
    }

    public getLojasPrecificacao(id_matriz,  id_servico_empresa ): Observable<any> {
      return this.http.get(this.actionUrl  + `empresa/precificacao?matrizId=${id_matriz}&servicoEmpresaId=${id_servico_empresa}`, this.getHttpHeaders());
    }


    public getTipoHora(): Observable<any> {
      return this.http.get(this.actionUrl  + `tipos-cobranca-hora`, this.getHttpHeaders());
    }

    public getTipoPrimeiraEntrega(): Observable<any> {
      return this.http.get(this.actionUrl  + `tipos-cobranca-entrega`, this.getHttpHeaders());
    }

   public deleteServicoEmpresas(id): Observable<any> {
      const options = this.getHttpHeaders();
      return this.http.delete<any>(this.actionUrl + `${id}/empresa`, options);
    }

    public deletePrecificacaoEmpresas(id): Observable<any> {
      const options = this.getHttpHeaders();
      return this.http.delete<any>(this.actionUrl + "empresa/precificacao/"+id, options);
    }

    public postPrecificacaoEmpresas(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.post<any>(this.actionUrl + "empresa/precificacao", body, options);
    }

    public postPrecificacao(bodyPost: any): Observable<any> {
      const options = this.getHttpHeaders();
      const body = JSON.stringify(bodyPost);
      return this.http.post<any>(this.actionUrl + "empresa/precificacao", body, options);
    }

    public putPrecificacao(bodyPost: any): Observable<any> {
        const options = this.getHttpHeaders();
        const body = JSON.stringify(bodyPost);
        return this.http.put<any>(this.actionUrl+ "empresa/precificacao", body, options);
    }

    public getTiposContrato(): Observable<any> {
      return this.http.get(this.actionUrl + "tipos-contrato", this.getHttpHeaders());
    }

    public getServicoSalvo(idServicoEmpresa): Observable<any> {
      return this.http.get(this.actionUrl + `empresa/precificacao/${idServicoEmpresa}`,  this.getHttpHeaders());
    }

    public getEmpresasServico(): Observable<any> {
      return this.http.get(this.actionUrl + `empresa/precificacao`,  this.getHttpHeaders());
    }
}
