import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmpresasService } from 'src/app/demo/services/empresas.service';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from 'src/app/demo/services/tenant.service';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { AuthSigninPOST } from 'src/app/demo/pages/authentication/auth-signin/auth-signin-post';

@Component({
  selector: 'app-empresas-form',
  templateUrl: './empresas-form.component.html',
  styleUrls: ['./empresas-form.component.css']
})
export class EmpresasFormComponent implements OnInit {

  public form: FormGroup;
  public empresaId = null;
  public usuariosForm: any[];
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
  private _textValue: any;
  checkServicos=false;
  checkContrato=false;
  checkFiliais=false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: EmpresasService,
    private tenantService: TenantService,
    private snackBar: SnackBarService,
    private router: Router

  ) {
    this.isSubmit = false;
    this.isAdminRole = false;
    this.isUserAdmin = service.isUserAdmin();
  }

  ngOnInit(): void {
  }

  feedbackCheck(res , tab) {
  if(tab === 'filiais'){
    this.checkFiliais = res;
    }else if(tab === 'servicos'){
      this.checkServicos = res;
    }else if(tab === 'contrato'){
      this.checkContrato = res;
    }
  }

  isEditing() {
    return (this.route.snapshot.paramMap.get('id'));
	}
  areOtherTabsAvailable() {
    return (this.route.snapshot.paramMap.get('id'));
  }

}
