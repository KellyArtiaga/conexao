import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VeiculoModel } from '../models/veiculo-model';
import { BaseRestAdminService } from './base-rest-admin.service';


@Injectable({
    providedIn: 'root'
})
export class VeiculosService extends BaseRestAdminService<VeiculoModel>{

  constructor(public http: HttpClient) {
    super(http, 'veiculos');
  }

  public get(filtro?: any): Observable<any> {
    return this.http.get(this.actionUrl, this.getHttpHeaders());
  }

  public getByEntregadorId(entregadorId: number): Observable<any> {
    return this.http.get(this.actionUrl + "?cooperadoId="+entregadorId, this.getHttpHeaders());
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

  public getTypes(entregadorId: number): Observable<any> {
    return this.http.get(this.actionUrl + "tipos/" + "?cooperadoId="+(entregadorId || 1), this.getHttpHeaders());
  }

  public getCompartimentos(): Observable<any> {
    return this.http.get(this.actionUrl + "compartimentos", this.getHttpHeaders());
  }
  
  public getCapacidades(): Observable<any> {
    return this.http.get(this.actionUrl + "capacidades", this.getHttpHeaders());
  }
}
