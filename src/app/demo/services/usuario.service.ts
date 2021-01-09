import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';
import { UsuarioModel } from '../models/usuario-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseRestAdminService<UsuarioModel>{

  constructor(public http: HttpClient) {
    super(http, 'usuario');
  }

  public listTipos(): Observable<String[]> {
    return this.http.get<String[]>(this.actionUrl + 'list-tipos');
  }

  recoverEmail(email): Observable<any> {
    return this.http.post(
      this.getRequestUrl() + 'recover/', email
    );
  }
}
