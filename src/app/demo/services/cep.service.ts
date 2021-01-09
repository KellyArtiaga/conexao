import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BaseRestService } from "./base-rest.service";
import { CepModel } from "../models/cep-model";
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
    providedIn: "root"
})
export class CepService extends BaseRestAdminService<CepModel> {
    constructor(public http: HttpClient) {
        super(http, "cep");
    }

    getCep(cep: string): Observable<CepModel> {
        return this.http.get<CepModel>(this.actionUrl + "" + cep);
    }
}
