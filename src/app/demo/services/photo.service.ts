import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuariosModel } from '../models/usuarios-model';
import { BaseRestAdminService } from './base-rest-admin.service';


@Injectable({
  providedIn: 'root'
})
export class PhotoService extends BaseRestAdminService<any>{


  constructor(public http: HttpClient) {
    super(http, 'upload');
  }


  public post(body: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
          'Content-Type': 'multipart/form-data'
          , 'Access-Control-Allow-Origin': '*',
      })
  }
    return this.http.post<any>(this.actionUrl, body);
  }
}
