import { MotociclistaLocationModel } from "./../models/motociclista-location-model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MotociclistaModel } from "../models/motociclista-model";
import { Observable } from "rxjs";
import { BaseRestAdminService } from './base-rest-admin.service';
import { BaseResponseModel } from "../models/base-response-model";

@Injectable({
    providedIn: "root"
})
export class MotociclistaService extends BaseRestAdminService<MotociclistaModel> {
    constructor(public http: HttpClient) {
        super(http, "motociclista");
    }


    public listAllAvailable(): Observable<any> {
        return this.http.get<any>(this.actionUrl + "disponiveis");
    }

    public finalizar(id) {
        return this.http.post(this.actionUrl + "finalizar/" + id, null);
    }

    public aprovar(id): Observable<BaseResponseModel<MotociclistaModel>> {
        return this.http.put<BaseResponseModel<MotociclistaModel>>(
            this.actionUrl + "aprova-motociclista/" + id,
            null
        );
    }

    public reprovar(id): Observable<BaseResponseModel<MotociclistaModel>> {
        return this.http.put<BaseResponseModel<MotociclistaModel>>(
            this.actionUrl + "reprova-motociclista/" + id,
            null
        );
    }

    public checarCpf(cpf): Observable<any> {
        return this.http.get(this.actionUrl + "validar-cpf-operador/" + cpf);
    }

    public localizarMotociclista(id): Observable<BaseResponseModel<MotociclistaLocationModel>> {
        return this.http.get<any>(this.actionUrl + "location/" + id);
    }

    public listTipoCategoria(): Observable<any> {
        return this.http.get<any>(this.actionUrl + "list-categorias-cnh/");
    }

    public listEstadoCivil(): Observable<any> {
        return this.http.get<any>(this.actionUrl + "list-estado-civil/");
    }

    uploadFile(formData): Observable<any> {
        let image: FormData = new FormData();
        image.append("image", formData);
        return this.http.post(this.getRequestUrl() + "upload-file/", image);
    }

    uploadFotoMotociclista(id, formData): Observable<any> {
        let image: FormData = new FormData();
        image.append("image", formData);
        return this.http.post(
            this.getRequestUrl() + "wizard/upload-self/" + id,
            image
        );
    }

    uploadFotoCnh(id, formData): Observable<any> {
        let image: FormData = new FormData();
        image.append("image", formData);
        return this.http.post(
            this.getRequestUrl() + "wizard/upload-cnh-image/" + id,
            image
        );
    }

    uploadFotoLicenca(id, formData): Observable<any> {
        let image: FormData = new FormData();
        image.append("image", formData);
        return this.http.post(
            this.getRequestUrl() + "wizard/upload-license/" + id,
            image
        );
    }

    uploadFotoInss(id, formData): Observable<any> {
        let image: FormData = new FormData();
        image.append("image", formData);
        return this.http.post(
            this.getRequestUrl() + "wizard/upload-inss/" + id,
            image
        );
    }

    uploadFotoDocumentoVeiculo(id, formData): Observable<any> {
        let image: FormData = new FormData();
        image.append("image", formData);
        return this.http.post(
            this.getRequestUrl() + "wizard/upload-vehicle-document/" + id,
            image
        );
    }
}
