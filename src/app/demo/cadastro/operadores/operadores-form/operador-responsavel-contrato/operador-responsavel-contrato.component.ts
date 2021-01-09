import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { LoginService } from 'src/app/demo/services/login.service';
import { OperadoresService } from 'src/app/demo/services/operadores.service';
import { PhotoService } from 'src/app/demo/services/photo.service';
import { AuthSigninPOST } from 'src/app/demo/pages/authentication/auth-signin/auth-signin-post';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { IOption } from 'ng-select';
import { resolve } from 'url';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';


@Component({
  selector: 'app-operador-responsavel-contrato',
  templateUrl: './operador-responsavel-contrato.component.html',
  styleUrls: ['./operador-responsavel-contrato.component.css']
})
export class OperadorResponsavelContratoComponent implements OnInit {
  form: FormGroup;
  usuariosForm: any[];
  public isSubmit: boolean;
  public isAdminRole: boolean;
  public isEdit: boolean;
  public isUserAdmin: boolean = false;
  public noResult: boolean = true;
  // public role: string;
  roleName: string;
  public tenants: TenantModel[];
  private _textValue: any;
  public oldData: any = {};

  urlFotoPerfil = '';
  hasData:boolean = false;
  operadorId;

  cpfMask = [/[0-9]/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: OperadoresService,
    private photoService: PhotoService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog

  ) {
    this.isSubmit = false;
    this.isAdminRole = false;
    this.isUserAdmin = service.isUserAdmin();
  }
  ngOnInit() {
    this.operadorId = this.route.snapshot.paramMap.get('id');
    this.createForm()
    this.getData()
  }

  getData() {
    this.service.getResponsavelContrato(this.operadorId)
    .subscribe(res => {
      var d = res.data
      this.form.get('nome').setValue(d.nome || "")
      this.form.get('cpf').setValue(d.cpf || "")
      this.form.get('email').setValue(d.email || "")
      this.form.get('celular').setValue(d.celular || "")
    })
  }

  createForm() {
    this.form = this.formBuilder.group({
     nome: ['',Validators.required],
     cpf: ['',Validators.required],
     email: ['', [Validators.required, Validators.email]],
     celular: ['',Validators.required]
    });
  }

  onSave() {
    if (this.form.valid) {
      var body = {
        idContratante: this.operadorId,
        ...this.form.value
      }
      this.service.putResponsavelContrato(body)
      .subscribe(res => {
        this.snackBar.success('Dados salvos com sucesso.', 3500, 'X');
      })
    }
    else {
      this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
    }
  }

  onFirstAccess() {
    if (this.form.valid) {
      var body = {
        idContratante: this.operadorId,
        ...this.form.value
      }
      this.service.postEnviarAcesso(body)
      .subscribe(res => {
        this.snackBar.success('Primeiro acesso enviado com sucesso.', 3500, 'X');
      })
    }
    else {
      this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
    }
  }
}
