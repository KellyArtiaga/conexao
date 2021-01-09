import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from '../../services/snack-bar.service';
import { LoginService } from '../../services/login.service';
import { AuthSigninPOST } from '../../pages/authentication/auth-signin/auth-signin-post';
import { AuthChangePOST } from '../../pages/authentication/auth-change-password/auth-change-post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {
  form: FormGroup;

  contemPeloMenosUmaLetra = false;
  contemTamanhoMinimo = false;

  labelMostrarSenha: string;
  labelOcultarSenha: string;

  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  token: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackBarService,
    private service: LoginService,
    private routerLink: Router,

  ) { }

  ngOnInit(): void {
    this.createForm();

    this.token = this.service.getToken();

    this.labelMostrarSenha = 'Mostrar senha';
    this.labelMostrarSenha = 'Ocultar senha';
  }

  createForm() {
    this.form = this.formBuilder.group({
      senhaAtual: ['', Validators.compose([])],
      novaSenha: ['', Validators.compose([Validators.required])],
      confirmarNovaSenha: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit(form: any) {
    const modelViewLogin = form.value;

    const body: AuthChangePOST = {
      currentPassword: modelViewLogin.senhaAtual,
      newPassword: modelViewLogin.novaSenha,
      token: this.token
    };
    if (!body.newPassword === body.confirmPassword) {
      console.log('erro senhas diferentes');
      this.snackBar.error('As senhas informadas estão diferentes', 3500, 'X');
    }
    if (!this.form.valid) {
      this.snackBar.open('Campo obrigatório não preenchido', 3500, 'X');
      return;
    }
    if (this.form.get('novaSenha').value !== this.form.get('confirmarNovaSenha').value) {
      this.snackBar.open('Senha de confirmação não confere com nova senha', 7000, 'X');
      return;
    }
    if (!this.senhaAtendeCriteriosEstabelecidos()) {
      this.snackBar.open('Nova senha não atende requisitos', 7000, 'X');
      return;
    }

    if (form.valid) {
      const resp = this.service
        .changePassword(body)
        .subscribe(
          this._subscribeAction()
          , err => {
            console.log('>>>>> ERRO', err);
            let message = err.error?.message || err.message || 'Erro de autenticação ao alterar a senha. Tente novamente!';
            this.snackBar.error(message, 3500, 'X');
          });
    } else {
      this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
    }
  }

  private _subscribeAction(): (value: any) => void {
    return res => {
      this.snackBar.success('Senha alterada com sucesso!', 3500, 'X');
      this.routerLink.navigateByUrl('/dashboard/default');
    };
  }

  password(password): void {
    switch (password) {
      case 'current': {
        this.showCurrentPassword = !this.showCurrentPassword;
        break;
      }
      case 'new': {
        this.showNewPassword = !this.showNewPassword;
        break;
      }
      case 'confirm': {
        this.showConfirmPassword = !this.showConfirmPassword;
        break;
      }
    }
  }

  senhaAtendeCriteriosEstabelecidos(): boolean {
    this.contemPeloMenosUmaLetra = this.form.get('novaSenha').value.match(/[a-z]/i);
    this.contemTamanhoMinimo = this.form.get('novaSenha').value.length >= 6;

    return this.contemPeloMenosUmaLetra && this.contemTamanhoMinimo;
  }

  esqueci() {

  }

}
