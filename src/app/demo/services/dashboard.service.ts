import { Injectable } from "@angular/core";
import { BaseRestService } from "./base-rest.service";
import { HttpClient } from "@angular/common/http";
import { SpotModel } from "../models/spot.model";
import { DashboardChartModel } from '../models/dashboard-model';
import { BaseRestAdminService } from './base-rest-admin.service';
import { BaseResponseModel } from '../models/base-response-model';
import { EmpresaEntryModel } from '../models/empresa-entry-model';
import { DashSearchModel } from '../models/dash-search-model';

@Injectable({
    providedIn: "root"
})
export class DashboardService extends BaseRestAdminService<DashboardChartModel> {
    
    constructor(public http: HttpClient) {
        super(http, "dashboard");
    }
    
    generateDashboardItem(dashItem : DashSearchModel) : any {
        return this.http.post(this.actionUrl + "generate-dashboard", dashItem);
    }

    getEmpresasPorOperador(){
        return this.http.get<BaseResponseModel<EmpresaEntryModel[]>>(
            this.actionUrl + "empresas-por-operador"
        );
    }

    getDiaAtual() {
        const date = new Date();
        const ano = date.getFullYear();
        const mes = date.getMonth()+1;
        const dia = date.getDate();
        
        let mesValor = '';
        let diaValor = '';

        mesValor = ((mes < 10) ? '0' : '').concat(mes.toString())
        diaValor = ((dia < 10) ? '0' : '').concat(dia.toString())

        return diaValor.toString().concat('-').concat(mesValor).concat('-').concat(ano.toString());
    }
}
