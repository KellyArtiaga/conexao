import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { LoginService } from 'src/app/demo/services/login.service';
import { SkillsService } from 'src/app/demo/services/skills.service';
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
import { AuthGuardService } from '../../../../../guards/auth.guard';

@Component({
  selector: 'app-skills-form',
  templateUrl: './skills-form.component.html',
  styleUrls: ['./skills-form.component.scss']
})
export class SkillsFormComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(''),
    active: new FormControl(true),
    nome: new FormControl('', Validators.required),
    descricao: new FormControl('', Validators.required)
  });
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
    private service: SkillsService,
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
    let _id = this.route.snapshot.paramMap.get('id');

    if (!!_id) {
      this.service.getById(parseInt(_id)).subscribe(res => {
        this.oldData = res.data

        // DataSet
        Object.keys(res.data).forEach(key => {
          if (this.form.get(key)) {
            this.form.get(key).setValue(res.data[key]);
          }
        })

      });

    }
  }



  async onSubmit(form: any) {
    const modelViewForm = {...this.oldData, ...this.form.value};
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body = {...this.oldData, ...this.form.value};

    body.id = this.oldData.id;
    body.codigo = this.oldData.codigo;


    if (modelViewForm.id) {
      if (form.valid) {
        this.service.put(body)
        .subscribe(res => {
          this.snackBar.success('Atualizado com sucesso!', 3500, 'X');
          this.router.navigateByUrl('cadastro/skills/editar/'+res.data.id);
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
            this.snackBar.success('Skill cadastrada com sucesso!', 3500, 'X');
            this.router.navigateByUrl('cadastro/skills/editar/'+res.data.id);
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
        message: 'Você deseja realmente excluir esta skill?',
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

}
