import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkillsModel } from '../models/skills-model';
import { BaseRestAdminService } from './base-rest-admin.service';


@Injectable({
    providedIn: 'root'
})
export class SkillsService extends BaseRestAdminService<SkillsModel>{

  constructor(public http: HttpClient) {
    super(http, 'habilidades');
  }

  public get(filtro?: any): Observable<any> {
    return this.http.get(this.actionUrl, this.getHttpHeaders());
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
