import { EmpresaModel } from "./../models/empresa-model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseRestService } from "./base-rest.service";
import { Observable } from "rxjs";
import { identifierModuleUrl } from "@angular/compiler";
import { BaseResponseModel } from "../models/base-response-model";
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
    providedIn: "root"
})
export class EmpresaService extends BaseRestAdminService<EmpresaModel> {
    constructor(public http: HttpClient) {
        super(http, "operador");
    }

    public aprovarCompra(id) {
        return this.http.post(this.actionUrl + "aprovar/" + id, null);
    }

    public confirmarVoo(id) {
        return this.http.post(this.actionUrl + "confirmar/" + id, null);
    }

    public finalizar(id) {
        return this.http.post(this.actionUrl + "finalizar/" + id, null);
    }

    public checarCnpj(id, cnpj): Observable<any> {
        return this.http.post(this.actionUrl + "checar-cnpj-duplicado/" + id, cnpj);
    }

    uploadLogo(id, formData): Observable<any> {
        let logo: FormData = new FormData();
        logo.append("logo", formData);
        return this.http.post(this.getRequestUrl() + "upload-logo/" + id, logo);
    }

    public locationsBySupllier(id): Observable<any> {
        let options = this.getHttpHeaders();
        return this.http.get(this.actionUrl + "users-locations/" + id, options);
    }

    public suppliers(): Observable<any> {
        let options = this.getHttpHeaders();
        return this.http.get(this.actionUrl, options);
    }
}
