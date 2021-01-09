import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class AuthService {
    private _registerUrl = 'https://apidev.conexaodelivery.com.br/auth/auth';
    private _loginUrl = 'https://apidev.conexaodelivery.com.br/auth/auth';

    constructor(
        private http: HttpClient
    ) { }

    registerUser(user) {
        return this.http.post<any>(this._registerUrl, user);
    }

    loginUser(user) {
        this.http.post<any>(this._loginUrl, user);
    }

}
