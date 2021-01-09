import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entregador } from '../models/entregador-model';
import { BaseRestAuthService } from './base-rest-auth.service';
import { BaseRestAdminService } from './base-rest-admin.service';


@Injectable({
  providedIn: 'root'
})
export class BancosService extends BaseRestAdminService<any> {

  constructor(public http: HttpClient) {
    super(http, 'bancos');
  }

  public get(filtro?: any): Observable<any> {
      return this.http.get(this.actionUrl, this.getHttpHeaders());
  }

  public getTypes(): Observable<any> {
      return this.http.get(this.actionUrl + 'tipos-contas', this.getHttpHeaders());
  }

}
