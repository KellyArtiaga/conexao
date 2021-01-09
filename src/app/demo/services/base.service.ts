import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export abstract class BaseService {
    protected actionUrl: string;
    protected configuration: Configuration;

    constructor(protected http: HttpClient, endpointName: string) {
        this.actionUrl =
            new Configuration().serverWithApiUrl + `${endpointName}/`;
    }

    protected getRequestUrl(): string {
        return this.actionUrl;
    }

    protected getHttpHeaders(): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
                // , 'Access-Control-Allow-Origin': '*',
            })
        };
    }

    protected getHttpHeadersREcovery(token: string): any {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
                , 'Access-Control-Allow-Origin': '*'
                , 'AuthRecovery': `${token}`
            })
        };
    }

    public isUserAdmin(): boolean{
        let result = atob(localStorage.getItem('tipoUsuario'))
        return "ROLE_MASTER" === result;
    }
}

@Injectable()
export class Configuration {
    public server = environment.server;
    public apiUrl = '';
    public serverWithApiUrl = this.server + this.apiUrl;
}
