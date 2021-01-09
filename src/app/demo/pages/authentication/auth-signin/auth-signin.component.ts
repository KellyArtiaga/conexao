import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/demo/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { AuthSigninPOST } from './auth-signin-post';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { AuthGuardService } from 'src/guards/auth.guard';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {
  loginForm: FormGroup;
  email: any;
  password: any;
  confirmPassword: any;
  form: any;
  public isSubmit: boolean;

  showCurrentPassword: boolean;

  labelMostrarSenha: string;
  labelOcultarSenha: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private route: ActivatedRoute,
    private routerLink: Router,
    private snackBar: SnackBarService,
    public auth: AuthGuardService

  ) {
    this.isSubmit = false;
  }

  ngOnInit(): void {
    this.createForm();
    /* if (localStorage.getItem('token')) {
      this.routerLink.navigateByUrl('/');
    } */
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  showPassword(password): void {
    switch (password) {
      case 'current': {
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      }
    }
  }

  login(form: any) {
    this.isSubmit = true;

    const modelViewLogin = form.value;
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body: AuthSigninPOST = {
      login: modelViewLogin.login,
      password: modelViewLogin.password,
    };
    console.log('body' + body.password);


    if (form.valid) {
      const resp = this.service
        .login(body)
        .pipe(take(1))
        .subscribe(
          this._subscribeAction()
          , err => {
            this.snackBar.error('Erro de autenticação. Tente novamente!', 3500, 'X');
          });
    } else {
      this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
    }
  }

  private _subscribeAction(): (value: any) => void {
    return res => {

      this.service.setToken(JSON.stringify(res.data.token));
      this.service.setUser(JSON.stringify(res.data.userName).replace(/'/g, ''));

      this.service.getUsuario().subscribe(
        (res: any) => {
          if (res.data && res.data.name) {
            this.service.setTipoUsuario(JSON.stringify(res.data.roles[0]).replace(/[\\"]/g, ''));
          }

          this.routerLink.navigateByUrl('/dashboard/default');
          this.welcomeMessage();

        }
      );
    };
  }
  private welcomeMessage(userName?: string): void {
    setTimeout(() => {
      this.snackBar.success(`Seja bem vindo(a) ao Conexão Delivery!`, 3000, 'X');
    }, 1000);
  }
}
