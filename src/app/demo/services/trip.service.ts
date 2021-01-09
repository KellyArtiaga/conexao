import { Injectable } from "@angular/core";
import { BaseRestService } from "./base-rest.service";
import { HttpClient } from "@angular/common/http";
import { SpotModel } from "../models/spot.model";
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
    providedIn: "root"
})
export class TripService extends BaseRestAdminService<SpotModel> {
    constructor(public http: HttpClient) {
        super(http, "trip");
    }
}
