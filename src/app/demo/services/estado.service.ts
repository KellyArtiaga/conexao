import { Injectable } from "@angular/core";
import { BaseRestService } from "./base-rest.service";
import { HttpClient } from "@angular/common/http";
import { EstadoModel } from "../models/estado-model";
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
    providedIn: "root"
})
export class EstadoService extends BaseRestAdminService<EstadoModel> {
    constructor(public http: HttpClient) {
        super(http, "estado");
    }
}
