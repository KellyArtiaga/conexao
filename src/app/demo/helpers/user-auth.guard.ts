import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { LoginService } from 'src/app/demo/services/login.service';

export class UserAuthGuard implements CanActivate {
    constructor(
        private loginService: LoginService,
        private role: string,
        private router: Router
    ) { }

    canActivate() {
        return this.oAuthUser(this.role);
    }

    oAuthUser(role) {
        if (this.loginService.getTipoUsuario() === role) {
            return true;
        } else {
            this.router.navigateByUrl("/aeronave");
            return false;
        }
    }
}

@Injectable({ providedIn: "root" })
export class AdminUserGuard extends UserAuthGuard {
    constructor(loginService: LoginService, router: Router) {
        super(loginService, "ADMIN", router);
    }
}

@Injectable({ providedIn: "root" })
export class OperadorUserGuard extends UserAuthGuard {
    constructor(loginService: LoginService, router: Router) {
        super(loginService, "OPERADOR", router);
    }
}
