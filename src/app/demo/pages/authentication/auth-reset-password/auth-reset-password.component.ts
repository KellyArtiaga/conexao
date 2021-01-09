import { AuthResetPOST } from './auth-reset-post';
import { take } from 'rxjs/operators';
import { SnackBarService } from './../../../services/snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/guards/auth.guard';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

  recoverForm: FormGroup;
  login: String;
  form: any;
  public isSubmit: boolean;

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
  }

  createForm() {
    this.recoverForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.email]],
    });
  }

  recover(form: any) {
    this.isSubmit = true;

    const modelViewLogin = form.value;

    const body: AuthResetPOST = {
      login: modelViewLogin.login
    };

    if (form.valid) {
      const resp = this.service
        .recover(body)
        .pipe(take(1))
        .subscribe(
          this._subscribeAction()
          , err => {
            this.snackBar.error('Erro ao solicitar alteração de senha. Tente novamente mais tarde!', 3500, 'X');
          });
    } else {
      this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
    }
  }

  private _subscribeAction(): (value: any) => void {
    return res => {
      this.snackBar.success(res.data, 3500, 'X');
      this.routerLink.navigateByUrl('/auth/signin');

    };
  }

}
