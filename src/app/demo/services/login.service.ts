import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class LoginService extends BaseService {
    navigation: string;
    userType: BehaviorSubject<any> = new BehaviorSubject('');

    constructor(
        public http: HttpClient,
    ) {
        super(http, 'auth/auth');
    }
    user: any;

    public login(login: any) {
        // return this.http.post(this.actionUrl + 'login', login);
        return this.http.post(this.actionUrl, login, super.getHttpHeaders());
    }

    public recover(recover: any) {
        return this.http.post(this.actionUrl + 'recover/', recover, super.getHttpHeaders());
    }

    public change(recover: any, token: string): Observable<any> {
        console.log(this.actionUrl + 'change/');
        console.log('token-url', token);
        console.log(btoa(token));
        return this.http.post(this.actionUrl + 'change', recover, this.getHttpHeadersREcovery(btoa(token)));
    }

    public changePassword(recover: any): Observable<any> {
        console.log(this.actionUrl + 'change/');
        return this.http.post(this.actionUrl + 'change', recover, super.getHttpHeaders());
    }

    public getUsuario() {
        return this.http.get(this.actionUrl + 'me');
    }

    public logout() {
        localStorage.clear();
    }

    public setToken(token) {
        localStorage.setItem('token', token);
    }

    public getToken() {
        return JSON.parse(localStorage.getItem('token'));
    }

    public setUser(userName) {
        localStorage.setItem('usuario', userName);
        // localStorage.setItem('tipoUsuario', user.tipoUsuario);
        // this.userType.next(user.tipoUsuario);
    }

    public getUserName() {
        return localStorage.getItem('usuario');
    }

    public setTipoUsuario(role) {
        localStorage.setItem('tipoUsuario', btoa(role));
    }

    public getAdmin() {
        let role = this.getTipoUsuario();
        console.log('getAdmin() role == ROLE_MASTER', role === 'ROLE_ADMIN');
        return role == 'ROLE_MASTER';
    }

    public getTipoUsuario(): string {
        return atob(localStorage.getItem('tipoUsuario'));
    }
}
