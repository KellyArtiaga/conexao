import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/demo/services/login.service';

@Injectable({
    providedIn: 'root'
})
export class UserAcessAuth {
    constructor(private loginService: LoginService) { }

    adminCanAccess() {
        return this.loginService.getTipoUsuario() === "ADMIN"
    }
}