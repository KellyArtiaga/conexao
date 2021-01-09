import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { EmpresasService } from 'src/app/demo/services/empresas.service';
import { OperadoresService } from 'src/app/demo/services/operadores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TenantService } from 'src/app/demo/services/tenant.service';
import { PhotoService } from 'src/app/demo/services/photo.service';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidateBrService } from 'angular-validate-br';
import { AuthGuardService } from '../../../../../../guards/auth.guard';

@Component({
  selector: 'app-empresas-dados-pessoais',
  templateUrl: './empresas-dados-pessoais.component.html',
  styleUrls: ['./empresas-dados-pessoais.component.scss']
})
export class EmpresasDadosPessoaisComponent implements OnInit {

  form: FormGroup;

  usuariosForm: any[];
  public isSubmit: boolean;
  public roles: string[];
  public selectedRole: string = '';
  public selectedTenant: any;
  public isAdminRole: boolean;
  public isEdit: boolean;
  public isUserAdmin: boolean = false;
  public noResult: boolean = true;
  // public role: string;
  roleName: string;
  public tenants: TenantModel[];
  private _textValue: any;
  public oldData: any = {};

  pdfSrc = '';
  urlFotoPerfil = '';
  cnpjMask = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  inscricaoMunicipalMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]

  public operadores :any[] = []

  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
  public contratoForm = new FormGroup({
    files: this.filesControl
  });

  public tenantId = -1;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: EmpresasService,
    private photoService: PhotoService,
    private tenantService: TenantService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog,
    private validateBrService:ValidateBrService,
    private operadorsService:OperadoresService,
    public auth: AuthGuardService

  ) {
    this.isSubmit = false;
    this.isAdminRole = false;
    this.isUserAdmin = service.isUserAdmin();
  }

  ngOnInit(): void {
    this.createForm();
    this.getTenants();

    let _id = this.route.snapshot.paramMap.get('id');
    if (!!_id) {
      this.service.getById(parseInt(_id)).subscribe(res => {

        // DataSet
        Object.keys(res.data).forEach(key => {
          if (this.form.get(key)) {
            this.form.get(key).setValue(res.data[key]);
          }
        })

      });
    }
  }

  public toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  }

  getTenants() {
    if (this.auth.getRoleIndex() !== 0) return;
    this.tenantService.get()
    .subscribe(result => {
      this.operadores = result.data;
    })
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      razaoSocial: ['', Validators.required],
      cnpj: ['', [Validators.required, this.validateBrService.cnpj]],
      inscricaoMunicipal: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefoneContato: ['', Validators.required],
      cep: [''],
      uf: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      logradouro: ['', Validators.required],
      numero: ['', [Validators.required, Validators.min(0)]],
      complemento: [''],
      referencia: [''],
      active: [true, Validators.required],
      tenant: [],
      centroCusto: [''],

      responsavelNome: [''],
      responsavelCpf: ['', [this.validateBrService.cpf]],
      responsavelEmail: ['', [Validators.email]],

      exibirFotoPerfil: new FormControl(true),
      urlFotoPerfil: new FormControl(''),
      files: new FormControl(null, FileUploadValidators.filesLimit(2))
    });
  }

  async onSubmit(form: any) {
    const modelViewForm = { ...this.oldData, ...this.form.value };
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');
    const body = { ...this.oldData, ...this.form.value };

    if (form.valid) {
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
            this.router.navigateByUrl('cadastro/empresas/editar/' + res.data.id);
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
            this.snackBar.success('Empresa cadastrada com sucesso! Para gerar o email de acesso deste usuário, preencha a aba de CONTRATO', 3500, 'X');
            this.router.navigateByUrl('cadastro/empresas/editar/' + res.data.id);
          }, err => {
            console.log(err)
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
        message: 'Você deseja realmente excluir esta empresa?',
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
        this.snackBar.success(`Empresa excluída com sucesso!`, 3000, 'X');
        setTimeout(() => {
          this.router.navigateByUrl('cadastro/empresas');
        }, 1000);
      }, err => {
        this.snackBar.error('Erro. Tente novamente!', 3000, 'X');
      });
  }


  isServicesOpen() {
    return (this.form.value.id || this.route.snapshot.paramMap.get('id'));
  }

  isContractsOpen() {
    return (this.form.value.id || this.route.snapshot.paramMap.get('id'));
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

  onContratoFileChange(e) {
    var file = this.contratoForm.value.files[0];
    this.pdfSrc = window.URL.createObjectURL(file)
    console.log(this.pdfSrc)
  }

  async saveContractPdf() {
    var file = this.contratoForm.value.files[0];
    if (file.type.split("/")[1].toLowerCase() == "pdf") {
      var formData = new FormData()
      formData.append("image", file)
      var photoLink = await this.photoService.post(formData).toPromise()
      var body = {
        ...this.form.value,
        urlContrato: photoLink.data
      }
      this.service.put(body)
        .subscribe(res => {
          this.snackBar.success('Atualizado com sucesso!', 3500, 'X');
        }, err => {
          this.snackBar.error(err, 3500, 'X');
        });
    }
    else {
      return this.snackBar.error('Formato de imagem inválido!', 3500, 'X');
    }
  }

  cepFound(e) {
    this.form.get('logradouro').setValue(e.logradouro);
    this.form.get('uf').setValue(e.uf);
    this.form.get('cidade').setValue(e.localidade);
    this.form.get('bairro').setValue(e.bairro);
  }

  compare(a, b) {
    return a.id === b.id;
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
