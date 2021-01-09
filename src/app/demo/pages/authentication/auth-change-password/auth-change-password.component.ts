import { take } from 'rxjs/operators';
import { AuthChangePOST } from './../auth-change-password/auth-change-post';
import { SnackBarService } from './../../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/demo/services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-change-password',
  templateUrl: './auth-change-password.component.html',
  styleUrls: ['./auth-change-password.component.scss']
})
export class AuthChangePasswordComponent implements OnInit {

  changeForm: FormGroup;
  newPassword: any;
  confirmPassword: any;
  form: any;
  token: string;
  public isSubmit: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginService,
    private route: ActivatedRoute,
    private routerLink: Router,
    private snackBar: SnackBarService

  ) {
    this.isSubmit = false;
  }

  ngOnInit(): void {
    this.token = window
      .atob(this.route.snapshot.paramMap.get("token"));

    console.log('token', this.token);

    this.createForm();
  }

  createForm() {
    this.changeForm = this.formBuilder.group({
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    });
  }

  change(form: any) {
    this.isSubmit = true;

    const modelViewLogin = form.value;

    const body: AuthChangePOST = {
      newPassword: modelViewLogin.newPassword,
      confirmPassword: modelViewLogin.confirmPassword,
    };

    if (!body.newPassword === body.confirmPassword) {
      console.log("ERRO de senhas")
      this.snackBar.error('As senhas informadas estão diferentes', 3500, 'X');
    }

    console.log('>> form', modelViewLogin)
    console.log('>> formBody', body)

    if (form.valid) {
      const resp = this.service
        .change(body, this.token)
        .pipe(take(1))
        .subscribe(
          this._subscribeAction()
          , err => {
            console.log('>>>>> ERRO', err)
            this.snackBar.error('Erro de autenticação ao alterar a senha. Tente novamente!', 3500, 'X');
          });
    } else {
      this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
    }
  }

  private _subscribeAction(): (value: any) => void {
    return res => {
      this.routerLink.navigateByUrl('/auth/signin');

    };
  }
  private welcomeMessage(userName?: string): void {
    setTimeout(() => {
      this.snackBar.success(`Seja bem vindo(a) ao Conexão Delivery!`, 3000, 'X');
    }, 1000);
  }

}
