import { Observable, from } from "rxjs";
import { ClienteEnumModel } from "./../models/enum/cliente-enum-model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BaseRestService } from "./base-rest.service";
import { ClienteModel } from "../models/cliente-model";
import { BaseRestAdminService } from './base-rest-admin.service';
import { BaseResponseModel } from "../models/base-response-model";

@Injectable({
    providedIn: "root"
})
export class ClienteService extends BaseRestAdminService<ClienteModel> {
    constructor(public http: HttpClient) {
        super(http, "cliente");
    }

    // getCliente(): Observable<any> {
    //     return this.http.get<ClienteEnumModel[]>(
    //         this.actionUrl + "list-clientes-ordenado"
    //     );
    // }

    public checarCnpj(id, cnpj): Observable<any> {
        return this.http.post(this.actionUrl + "checar-cnpj-duplicado/" + id, cnpj);
    }
}
