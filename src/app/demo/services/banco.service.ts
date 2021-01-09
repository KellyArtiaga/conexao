import { Injectable } from '@angular/core';
import { BaseRestService } from './base-rest.service';
import { CidadeModel } from '../models/cidade-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BancoModel } from '../models/banco-model';
import { BaseRestAdminService } from './base-rest-admin.service';

@Injectable({
    providedIn: 'root'
})
export class BancoService extends BaseRestAdminService<BancoModel> {

    constructor(public http: HttpClient) {
        super(http, "banco");
    }
}
