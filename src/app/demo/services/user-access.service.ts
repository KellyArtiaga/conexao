import { Injectable } from '@angular/core';
import { LoginService } from './login.service';

@Injectable({
    providedIn: 'root'
})
export class UserAcessAuth {
    constructor(private loginService: LoginService) { }

    adminCanAccess() {
        return this.loginService.getTipoUsuario() === "ADMIN"
    }
}