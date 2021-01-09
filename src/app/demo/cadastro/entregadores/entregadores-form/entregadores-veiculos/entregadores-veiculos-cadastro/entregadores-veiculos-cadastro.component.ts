import { Component, OnInit, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { EntregadoresService } from 'src/app/demo/services/entregadores.service';
import { VeiculosService } from 'src/app/demo/services/veiculos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TenantService } from 'src/app/demo/services/tenant.service';
import { PhotoService } from 'src/app/demo/services/photo.service';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidateBrService } from 'angular-validate-br';
import { AuthGuardService } from '../../../../../../../guards/auth.guard';
import ChassiValidator from '../../../../../validators/ChassiValidator';

@Component({
  selector: 'app-entregadores-veiculos-cadastro',
  templateUrl: './entregadores-veiculos-cadastro.component.html',
  styleUrls: ['./entregadores-veiculos-cadastro.component.scss']
})
export class EntregadoresVeiculosCadastroComponent implements OnInit {

  @Input() data = {}
  @Output() onDataChange = new EventEmitter()
  form: FormGroup = null;

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
  public compartimentos = [
    "INTERNO",
  ]
  public tiposCapacidade = [
    "LITRO",
  ]

  pdfSrc = '';
  urlFotoPerfil = '';
  dateMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  cnpjMask = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  inscricaoMunicipalMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]


  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
  public contratoForm = new FormGroup({
    files: this.filesControl
  });

  public entregadorId = null;
  public veiculoId = null;

  public tipos = []

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: VeiculosService,
    private entregadoresService: EntregadoresService,
    private photoService: PhotoService,
    private tenantService: TenantService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog,
    private validateBrService:ValidateBrService,
    public auth: AuthGuardService

  ) {
    this.isSubmit = false;
    this.isAdminRole = false;
    this.isUserAdmin = service.isUserAdmin();
  }


  ngOnInit(): void {
    let _id = this.route.snapshot.paramMap.get('veiculoId');
    let _id2 = this.route.snapshot.paramMap.get('id');
    this.entregadorId = _id2;
    this.veiculoId = _id;
    this.getTypes();
    this.getCapacidades();
    this.getCompartimentos();

    if (!!_id) {
      this.service.getById(parseInt(_id)).subscribe(res => {

        // DataSet
        Object.keys(res.data).forEach(key => {
          if (this.form.get(key)) {
            this.form.get(key).setValue(res.data[key] || "");
          }
        })

      });
    }
  }

  ngOnChanges(): void {
    this.buildForm(this.data['data']);

    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa")
    this.form.reset()
    if (!this.data['data']) {return;}
    Object.keys(this.data['data']).forEach(key => {
      if(this.form.get(key)) {
        this.form.get(key).setValue(this.data['data'][key])

      }
    })
  }

  buildForm(data) {
    var form = new FormGroup({
      id: new FormControl(''),
      marca: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      cor: new FormControl('', Validators.required),
      ano: new FormControl('', [Validators.required, Validators.min(this.getDateRange()[0]), Validators.max(this.getDateRange()[1])]),
      placa: new FormControl('', [Validators.required, Validators.minLength(7)]),
      tipo: new FormControl('', Validators.required),
      renavam: new FormControl('', [Validators.minLength(11), Validators.maxLength(11), this.validateBrService.integer]),
      chassi: new FormControl('', [Validators.minLength(17), Validators.maxLength(17), this.validateBrService.alphaNumeric, ChassiValidator]),
      active: new FormControl(true),
      compartimento: new FormControl('', Validators.required),
      tipoCapacidade: new FormControl('', Validators.required),
      capacidade: new FormControl('', [Validators.required]),
    });

    if (data && data.tipo) {
      var tipo = data.tipo;
      switch (tipo) {
        case "BICICLETA":
          form.removeControl('placa');
          form.removeControl('chassi');
          form.removeControl('renavam');
          break;
      
        default:
          break;
      }
    }

    this.form = form;
  }


  getCapacidades() {
    this.service.getCapacidades()
    .subscribe(res => {
      this.tiposCapacidade = res.data
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }

  getCompartimentos() {
    this.service.getCompartimentos()
    .subscribe(res => {
      this.compartimentos = res.data;
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }

  getTypes() {
    this.service.getTypes(this.entregadorId)
    .subscribe(res => {
      this.tipos = res.data
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }



  public confirm(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir este veículo?',
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
        this.snackBar.success(`Veículo excluído com sucesso!`, 3000, 'X');
        setTimeout(() => {
          this.router.navigateByUrl('cadastro/entregadores');
        }, 1000);
      }, err => {
        this.snackBar.error('Erro. Tente novamente!', 3000, 'X');
      });
  }



  async onSubmit(form: any) {
    console.log(this.form.value)
    const modelViewForm = { ...this.oldData, ...this.form.value };
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body = { ...this.oldData, ...this.form.value };
    body.cooperado = {id:this.entregadorId}

    if (modelViewForm.id) {
      if (form.valid) {
        this.service.put(body)
          .subscribe(res => {
            this.data['data'] = this.form.value;
            this.onDataChange.emit(this.data);
            this.snackBar.success('Atualizado com sucesso!', 3500, 'X');
            //this.router.navigateByUrl('cadastro/entregadores/editar/' + this.entregadorId + "/veiculos/editar/" + res.data.id);
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
            this.data['data'] = res.data;
            this.onDataChange.emit(this.data);
            this.form.get('id').setValue(res.data.id)
            this.snackBar.success('Veículo cadastrado com sucesso!', 3500, 'X');
            //this.router.navigateByUrl('cadastro/entregadores/editar/' + this.entregadorId + "/veiculos/editar/" + res.data.id);
          }, err => {
            console.log(err)
            this.snackBar.error(err, 3500, 'X');
          });
      } else {
        this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
      }
    }
  }

  public getDateRange() {
    let dt = new Date();
    return [dt.getFullYear()-100, dt.getFullYear()];
  }

  public hasField(fieldName: string): boolean {
    var isOk = false
    if (this.form.controls[fieldName]) {
      isOk = true
    }
    return isOk
    
  }

  compare(a, b) {
    return a.id === b.id;
  }
  compareLabel(a, b) {
    return a === b
  }
}
