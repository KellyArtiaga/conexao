import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { Router } from '@angular/router';
import { empty, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService } from 'src/app/demo/services/login.service';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {
    constructor(private loginService: LoginService, private _snackBar: SnackBarService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = this.loginService.getToken();

        if (token !== null) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }else{
            request = request.clone({
                setHeaders: {
                    'Access-Control-Allow-Origin': '*'
                }
            });
        }

       return next.handle(request).pipe(
            catchError(err => {
                console.log(">>>>>>>> http-interceptor 1");
                // let message: string = err.error.message;
                if (err.status == 200) {
                    return empty();
                }

                if (!err.error || !err.error.message)
                    console.log(">>>>>>>> http-interceptor - OCORREU UM ERRO INESPERADO");
                    // message = 'Ocorreu alguma instabilidade no sistema. Tente mais tarde.';

                /*    this._snackBar.open(message, '', {
                       duration: 2000,
                       panelClass: 'snack-error'
                   }); */

                if (err.status === 401 || err.status === 403) {
                    // auto logout if 401 response returned from api
                    this.redirectToLogin();
                    this._snackBar.error('Não foi possível validar as credenciais do usuário!', 3500, 'X');
                    return empty();
                }
                console.log(">>>>>>>> http-interceptor 2", err);

                const error = err.error.message || err.statusText;
                return throwError(error);
            })
        );
    }

    redirectToLogin() {
        this.loginService.logout();
        this.router.navigateByUrl('/auth/signin');
    }

}

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true,
        },
    ],
})
export class InterceptorJwt { }
