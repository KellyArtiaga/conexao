import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UsuariosService } from 'src/app/demo/services/usuarios.service';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { ActivatedRoute, Router } from '@angular/router';
import { TenantService } from 'src/app/demo/services/tenant.service';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { AuthSigninPOST } from 'src/app/demo/pages/authentication/auth-signin/auth-signin-post';

@Component({
  selector: 'app-entregadores-form',
  templateUrl: './entregadores-form.component.html',
  styleUrls: ['./entregadores-form.component.scss']
})
export class EntregadoresFormComponent implements OnInit {


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
  private _textValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: UsuariosService,
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

  areOtherTabsAvailable() {
    return (this.route.snapshot.paramMap.get('id'));
  }

}
