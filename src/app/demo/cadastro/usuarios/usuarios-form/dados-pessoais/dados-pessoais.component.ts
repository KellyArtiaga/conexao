import { take } from 'rxjs/operators';
import { AuthResetPOST } from './../../../../pages/authentication/auth-reset-password/auth-reset-post';
import { LoginService } from './../../../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { AuthSigninPOST } from 'src/app/demo/pages/authentication/auth-signin/auth-signin-post';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/demo/services/usuarios.service';
import { EmpresasService } from 'src/app/demo/services/empresas.service';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { TenantService } from 'src/app/demo/services/tenant.service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.scss']
})
export class DadosPessoaisComponent implements OnInit {
  form: FormGroup;
  usuariosForm: any[];
  public isSubmit: boolean;
  public roles: string[];
  public selectedRole: string = '';
  public selectedTenant: any;
  public isAdminRole: boolean;
  public isEdit: boolean;
  public isUserAdmin: boolean = false;
  // public role: string;
  roleName: string;

  public tenants: TenantModel[];
  public companies: any[];
  private _textValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: UsuariosService,
    private empresasService: EmpresasService,
    private loginService: LoginService,
    private tenantService: TenantService,
    private snackBar: SnackBarService,
    private router: Router

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
        console.log('>>>>>>>> Edicao formIsValid ', res);
        this.form.get('id').setValue(res.data.id);
        this.form.get('login').setValue(res.data.login);
        this.form.get('name').setValue(res.data.name);
        this.form.get('roles').setValue(res.data.roles[0]);
        this.form.get('active').setValue(res.data.active);
        this.form.get('companyRegistry').setValue(res.data.companyRegistry);
        this.selectedRole = res.data.roles[0];
        this.selectedTenant = res.data.tenant;
        this.form.get('tenant').setValue(res.data.tenant);
        this.selected();
      });
    }

    this.getRoles();
    this.getCompanies();
    console.log(this.isUserAdmin);
    if (this.isUserAdmin) {
      this.getTenants();
    }
  }

  compare(a, b) {
    return a.id === b.id;
  }
  compareB(a, b) {
    return a === b;
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      login: ['', Validators.required],
      roles: ['', Validators.required],
      active: [true, Validators.required],
      tenant: [''],
      companyRegistry: ['']
    });
  }

  getUsuarios(): void {
    this.usuariosForm = [];

    this.service.get()
      .subscribe(res => {
        this.usuariosForm = res.data.map(value => {
          return value;
        });
      }, err => {
        this.snackBar.error(err, 3500, 'X');
      });
  }

  getRoles() {
    this.service.getRoles()
      .subscribe(res => {
        this.roles = res.data;
      }
      );
  }

  getCompanies() {
    this.empresasService.getSelect()
    .subscribe(res => {
      this.companies = res.data;
    })
  }

  changeRolesNames(obj?: any) {
    if (obj === 'ROLE_MASTER') {
      return 'Master';
    } else if (obj === 'ROLE_OPERADOR_ADMIN') {
      return 'Administrador';
    } else if (obj === 'ROLE_OPERADOR_MANAGER') {
      return 'Gerente';
    } else if (obj === 'ROLE_EMPRESA') {
      return 'Supervisor';
    } else if (obj === 'ROLE_COOPERADO') {
      return 'Cooperado';
    }
  }

  showOperadorField(): boolean {
    return this.form.value.roles && this.form.value.roles != "" && this.form.value.roles != "ROLE_MASTER"
  }
  showEmpresaField(): boolean {
    return this.form.value.roles && this.form.value.roles != "" && this.form.value.roles === "ROLE_EMPRESA"
  }

  selected() {
    if (this.selectedRole === 'ROLE_MASTER') {
      this.isAdminRole = true;
    } else {
      this.isAdminRole = false;
    }
  }

  onSubmit(form: any) {
    console.log(21312312)
    const modelViewForm = form.value;
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body: AuthSigninPOST = {
      id: modelViewForm.id,
      login: modelViewForm.login,
      name: modelViewForm.name,
      roles: [modelViewForm.roles],
      active: modelViewForm.active,
      companyRegistry: modelViewForm.companyRegistry
    };

    if (modelViewForm.tenant) {
      body.tenant = modelViewForm.tenant;
    }

    if (modelViewForm.id) {
      this.service.put(body)
        .subscribe(res => {
          this.snackBar.success('Atualizado com sucesso!', 3500, 'X');
          setTimeout(() => {
            this.router.navigateByUrl('cadastro/usuarios');
          }, 1000);
        }, err => {
          this.snackBar.error(err, 3500, 'X');
        });
    } else {
      if (form.valid) {
        this.service.post(body)
          .subscribe(res => {
            this.snackBar.success('Usuário cadastrado com sucesso!', 3500, 'X');
            setTimeout(() => {
              this.router.navigateByUrl('cadastro/usuarios');
            }, 1000);
          }, err => {
            this.snackBar.error(err, 3500, 'X');
          });
      } else {
        this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
      }
    }
  }

  selectTenant(_event) {
    this.selectedTenant = _event.value;
  }

  getTenants() {
    this.tenantService.get()
      .subscribe(res => {
        this.tenants = res.data;
      }
      );
  }

  onDelete(_item): void {
    console.log('onDelete', _item)
    this.service.delete(_item.value.id).subscribe(
      response => {
        this.snackBar.success('Usuário excluido com sucesso!', 3500, 'X');
        setTimeout(() => {
          this.router.navigateByUrl('cadastro/usuarios');
        }, 1000);
      }, err => {
        this.snackBar.error('Erro. Tente novamente!', 3000, 'X');
      });
  }

  onRecoverCredentials(_item): void {
    this.isSubmit = true;

    const modelViewLogin = _item.value;

    const body: AuthResetPOST = {
      login: modelViewLogin.login
    };

    this.loginService
      .recover(body)
      .pipe(take(1))
      .subscribe(res => {
        this.snackBar.success('Orientaçoes para recuperação de senha enviadas ao usuário!', 3500, 'X');
      }, err => {
        this.snackBar.error('Erro ao solicitar alteração de senha. Tente novamente mais tarde!', 3500, 'X');
      });
  }

  toLowerCase(z?: any) {
    const v = z.value.toUpperCase();
    z.value = v;
  }
}
