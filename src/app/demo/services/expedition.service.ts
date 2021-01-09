import { Injectable } from '@angular/core';
import { BaseRestAdminService } from './base-rest-admin.service';
import { EntregaModel } from '../models/entrega-model';
import { HttpClient } from '@angular/common/http';
import { BaseResponseModel } from '../models/base-response-model';
import { Observable } from 'rxjs';
import { BaseRestBusinessService } from './base-rest-business.service';

@Injectable({
  providedIn: 'root'
})
export class ExpeditionService extends BaseRestAdminService<EntregaModel>{

  constructor(public http: HttpClient) {
    super(http, "trips");
  }

  getTrips(): Observable<any> {
    return this.http.get<BaseResponseModel<any[]>>(
      this.actionUrl + "expedition"
    );
  }

  getTripById(idTrip): Observable<any> {
    return this.http.get<BaseResponseModel<any[]>>(
      this.actionUrl + idTrip + "/expedition/detail"
    )
  }
}

@Injectable({
  providedIn: 'root'
})
export class ExpeditionBusinessService extends BaseRestBusinessService<any> {
  constructor(public http: HttpClient) {
    super(http, "trips");
  }

  calculateNewTrip(body): Observable<any> {
    return this.http.post<BaseResponseModel<any[]>>(
      this.actionUrl + "expedition?calculate-best-route=false", body
    )
  }
}
