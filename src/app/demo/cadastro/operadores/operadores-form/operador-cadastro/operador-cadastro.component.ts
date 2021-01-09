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
import { ValidateBrService } from 'angular-validate-br';
import { AuthGuardService } from '../../../../../../guards/auth.guard';

@Component({
  selector: 'app-operador-cadastro',
  templateUrl: './operador-cadastro.component.html',
  styleUrls: ['./operador-cadastro.component.css']
})
export class OperadorCadastroComponent implements OnInit {
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
  dateMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  cnpjMask = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  inscricaoMunicipalMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: OperadoresService,
    private photoService: PhotoService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog,
    private validateBrService: ValidateBrService,
    public auth: AuthGuardService

  ) {
    this.isSubmit = false;
    this.isAdminRole = false;
    this.isUserAdmin = service.isUserAdmin();
  }

  ngOnInit(): void {
    this.createForm();

    let _id = this.route.snapshot.paramMap.get('id');

    if (!!_id) {
      this.service.getById(parseInt(_id)).subscribe(res => {
        this.oldData = res.data
        this.form.get('id').setValue(res.data.id);
        this.form.get('codigo').setValue(res.data.codigo);
        this.form.get('razaoSocial').setValue(res.data.razaoSocial);
        this.form.get('cnpj').setValue(res.data.cnpj);
        this.form.get('inscricaoMunicipal').setValue(res.data.inscricaoMunicipal);
        this.form.get('email').setValue(res.data.email);
        this.form.get('telefoneContato').setValue(res.data.telefoneContato);
        this.form.get('cep').setValue(res.data.cep);
        this.form.get('uf').setValue(res.data.uf);
        this.form.get('cidade').setValue(res.data.cidade);
        this.form.get('bairro').setValue(res.data.bairro);
        this.form.get('logradouro').setValue(res.data.logradouro);
        this.form.get('numero').setValue(res.data.numero);
        this.form.get('complemento').setValue(res.data.complemento);
        this.form.get('referencia').setValue(res.data.referencia);
        this.form.get('active').setValue(res.data.active);
        this.form.get('tenant').setValue(res.data.tenant);
        this.urlFotoPerfil = res.data.urlFotoPerfil
      });

    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      codigo: new FormControl({value: "", disabled: true}),
      razaoSocial: ['', Validators.required],
      cnpj: ['', [Validators.required,
      this.validateBrService.cnpj]],
      inscricaoMunicipal: ['', [Validators.required,
            Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      telefoneContato: ['', [
            Validators.required,
            Validators.minLength(10)
      ]],
      cep: ['', [
            Validators.required,
            Validators.minLength(8)
      ]],
      uf: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', [Validators.required, Validators.min(0)]],
      complemento: [''],
      referencia: [''],
      active: [true, Validators.required],
      tenant: [],

      files:  new FormControl(null, FileUploadValidators.filesLimit(2))
    });
  }

  private toOnlyNumbers(value: string): string {
    return value.replace(/[^0-9]/g, '');
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  async onSubmit(form: any) {
    const modelViewForm = {...this.oldData, ...this.form.value};
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body = {...this.oldData, ...this.form.value};

    body.id = this.oldData.id;
    body.codigo = this.oldData.codigo;


    if (form.valid) {
      body.telefoneContato = this.toOnlyNumbers(body.telefoneContato);
      body.cep = this.toOnlyNumbers(body.cep);
      body.cnpj = this.toOnlyNumbers(body.cnpj);
      body.inscricaoMunicipal = this.toOnlyNumbers(body.inscricaoMunicipal);

      if (this.form.value.files && this.form.value.files.length > 0) {
        var file = this.form.value.files[0];
        if (file.type.split("/")[1].toLowerCase() != "png" && file.type.split("/")[1].toLowerCase() != "jpeg" && file.type.split("/")[1].toLowerCase() != "jpg") {
          return this.snackBar.error('Formato de imagem inválido!', 3500, 'X');
        }

        var formData = new FormData()
        formData.append("file", file)
        formData.append("tipo", "LOGOMARCA")

        var imgInfo = await this.photoService.post(formData).toPromise()
        body.urlFotoPerfil = imgInfo.data;
      }
    }

    if (modelViewForm.id) {
      if (form.valid) {
        this.service.put(body)
        .subscribe(res => {
          this.snackBar.success('Atualizado com sucesso!', 3500, 'X');
          this.router.navigateByUrl('cadastro/operadores/editar/'+res.data.id);
        }, err => {
          this.snackBar.error(err, 3500, 'X');
        });
      }
      else {
        this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
      }
    } else {
      if (form.valid) {
        this.service.post(body)
          .subscribe(res => {
            this.snackBar.success('Operador cadastrado com sucesso! Para gerar o email de acesso deste usuário, preencha a aba de CONTRATO', 3500, 'X');
            this.router.navigateByUrl('cadastro/operadores/editar/'+res.data.id);
          }, err => {
            this.snackBar.error(err, 3500, 'X');
          });
      } else {
        this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
      }
    }
  }


  toLowerCase(z?: any) {
    const v = z.value.toUpperCase();
    z.value = v;
  }

  public confirm(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir este operador?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete();
      }
    });
  }

  delete(): void {
    let _id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.service.delete(_id).subscribe(
      response => {
        this.snackBar.success(`Operador excluído com sucesso!`, 3000, 'X');
        setTimeout(() => {
          this.router.navigateByUrl('cadastro/operadores');
        }, 1000);
      }, err => {
        this.snackBar.error('Erro. Tente novamente!', 3000, 'X');
      });
  }

  onProfileFileChange(e) {
    var file = this.form.value.files[0];
		var reader = new FileReader();
		reader.onloadend = function () {
			document.getElementById('profile-photo')['src'] = reader.result
			return reader.result;
		}

		var url = reader.readAsDataURL(file);
		console.log(url);
  }

  onCepFound(e) {
    this.form.get('uf').setValue(e.uf);
    this.form.get('cidade').setValue(e.localidade);
    this.form.get('bairro').setValue(e.bairro);
    this.form.get('logradouro').setValue(e.logradouro);
  }

}


