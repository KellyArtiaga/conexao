import { MotociclistaModel } from "./../models/motociclista-model";
import { EmpresaModel } from "../models/empresa-model";
import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BaseRestService } from "./base-rest.service";
import { Observable } from "rxjs";
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
    providedIn: "root"
})
export class UploadService extends BaseRestAdminService<EmpresaModel> {
    constructor(public http: HttpClient) {
        super(http, "upload");
    }

    uploadFile(formData): Observable<any> {
        let image: FormData = new FormData();
        image.append("image", formData);
        return this.http.post(this.getRequestUrl() + "upload-file/", image);
    }
}
