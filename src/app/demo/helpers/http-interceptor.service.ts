import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable, throwError, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { IfStmt } from '@angular/compiler';
import { LoginService } from 'src/app/demo/services/login.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {
    constructor(
        private loginService: LoginService,
        private router: Router,
        // private _snackBar: MatSnackBar
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError(err => {
                let message = err.error.message;
                if (err.status == 200) {
                    return empty();
                }

                if (!message)
                    message =
                        'Ocorreu alguma instabilidade no sistema. Tente mais tarde.';

                /*    this._snackBar.open(message, '', {
                       duration: 2000,
                       panelClass: 'snack-error'
                   }); */

                if (err.status === 401 || err.status === 403) {
                    // auto logout if 401 response returned from api
                    this.redirectToLogin();
                    /*    this._snackBar.open('Não foi possível encontrar o usuário com as credenciais informadas.', '', {
                           duration: 3000,
                           panelClass: 'snack-error'
                       }); */
                    return empty();
                }
                console.log(err);

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }

    redirectToLogin() {
        this.loginService.logout();
        this.router.navigateByUrl('/auth/login');
    }
}
