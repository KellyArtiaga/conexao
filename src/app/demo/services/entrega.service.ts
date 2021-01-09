import { SpotModel } from "../models/spot.model";
import { Injectable } from "@angular/core";
import { BaseRestService } from "./base-rest.service";
import { EntregaModel } from "../models/entrega-model";
import { TripStatusModel } from "../models/trip-status-model";
import { Observable, empty } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import * as moment from "moment";
import { BaseResponseModel } from "../models/base-response-model";
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
    providedIn: "root"
})
export class EntregaService extends BaseRestAdminService<EntregaModel> {
    constructor(public http: HttpClient) {
        super(http, "entrega");
    }

    getTripStatus() {
        return this.http.get<BaseResponseModel<TripStatusModel[]>>(
            this.actionUrl + "list-trip_status"
        );
    }

    getSpotDetails(id) {
        return this.http.get<BaseResponseModel<SpotModel[]>>(this.actionUrl + "detalhes/" + id);
    }

    public listPaginate(page?, search?, filters?): Observable<any> {
        let options = this.getHttpHeaders();
        options.params = new HttpParams();
        if (page) {
            options.params = options.params.set("page", page.pageIndex);
            options.params = options.params.set("size", page.pageSize);
        } else {
            options.params = options.params.set("page", 0);
            options.params = options.params.set("size", 5);
        }

        if (filters) {
            for (let key in filters) {
                if (filters[key] != null) {
                    let value = filters[key];
                    if (value != null) {
                        if (key == "dataInicio" || key == "dataFim") {
                            let date: Date;
                            if (value._isValid) {
                                date = new Date(new Date(value).getTime() + (1000 * 60 * 60 * 3));
                                value = this.convertDataToMs(date);
                                value = date.getTime();
                            }
                        }
                        options.params = options.params.set(key, value);
                    }
                }
            }
            if (search) {
                options.params = options.params.set("search", search);
            }
            return this.http.get(this.actionUrl + "page", options);
        }
    }

    private convertDataToMs(data: Date) {
        return moment(data.valueOf());
    }

    public gerarRelatorio(filters?): Observable<any> {
        let options = this.getHttpHeaders();
        options.params = new HttpParams();

        if (filters) {
            for (let key in filters) {
                if (filters[key] != null) {
                    let value = filters[key];
                    if (value) {
                        if (key == "dataInicio" || key == "dataFim") {
                            let date: Date;

                            if (value._isValid) {
                                date = new Date(new Date(value).getTime() + (1000 * 60 * 60 * 3))

                                value = this.convertDataToMs(date);
                                value = date.getTime();
                            }
                        }
                        options.params = options.params.set(key, value);
                    }
                }
            }
            return this.http.get<any>(
                this.actionUrl.replace("/entrega", "") + "relatorios/entregas",
                options
            );
        }
    }
}
