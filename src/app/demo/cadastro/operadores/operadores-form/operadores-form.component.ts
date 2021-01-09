import { TenantService } from './../../../services/tenant.service';
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
	selector: 'app-operadores-form',
	templateUrl: './operadores-form.component.html',
	styleUrls: ['./operadores-form.component.css']
})

export class OperadoresFormComponent implements OnInit {
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

	urlFotoPerfil = '';
	operadorId;
  varPai:boolean;
  checkCadastro: any;
  checkServicos: any;
  checkContrato: any;


	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		private service: OperadoresService,
		private photoService: PhotoService,
		private tenantService: TenantService,
		private snackBar: SnackBarService,
		private router: Router,
		private dialog: MatDialog

	) {
		this.isSubmit = false;
		this.isAdminRole = false;
		this.isUserAdmin = service.isUserAdmin();
    this.varPai = false;
	}

	ngOnInit(): void {
		this.createForm();
		let _id = this.route.snapshot.paramMap.get('id');
		this.operadorId = _id;
		if (!!_id) {
		this.service.getById(parseInt(_id)).subscribe(res => {
			console.log('res', res.data)
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



  feedbackCheck(res , tab) {
  if(tab === 'servicos'){
      this.checkServicos = res;
    }else if(tab === 'contrato'){
      this.checkContrato = res;
    }
  }

	/*public toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();
  	} */

	 isEditing() {
		return (this.form.value.id || this.route.snapshot.paramMap.get('id'));
	}

	isContractsOpen() {
		return (this.form.value.id || this.route.snapshot.paramMap.get('id'));
	}

	isServicesOpen(){
		return (this.form.value.id || this.route.snapshot.paramMap.get('id'));
	}

	createForm() {
		this.form = this.formBuilder.group({
		id: [''],
		codigo: new FormControl({value: "", disabled: true}),
		razaoSocial: ['', Validators.required],
		cnpj: ['', Validators.required],
		inscricaoMunicipal: ['', Validators.required],
		email: ['', [Validators.required, Validators.email]],
		telefoneContato: ['', Validators.required],
		cep: [''],
		uf: ['', Validators.required],
		cidade: ['', Validators.required],
		bairro: ['', Validators.required],
		logradouro: ['', Validators.required],
		numero: ['', Validators.required],
		complemento: [''],
		referencia: [''],
		active: [true, Validators.required],
		tenant: [],

		files:  new FormControl(null, FileUploadValidators.filesLimit(2))
		});
	}
}
