import { Component, OnInit } from '@angular/core';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { Validators, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { EntregadoresService } from 'src/app/demo/services/entregadores.service';
import { OperadoresService } from 'src/app/demo/services/operadores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TenantService } from 'src/app/demo/services/tenant.service';
import { PhotoService } from 'src/app/demo/services/photo.service';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidateBrService } from 'angular-validate-br';
import { AuthGuardService } from '../../../../../../guards/auth.guard';
import * as moment from 'moment';
import { includes } from 'lodash';
import { SkillsService } from 'src/app/demo/services/skills.service';
import { EmpresasService } from 'src/app/demo/services/empresas.service';
import { VeiculosService } from 'src/app/demo/services/veiculos.service';


@Component({
  selector: 'app-entregadores-dados-pessoais',
  templateUrl: './entregadores-dados-pessoais.component.html',
  styleUrls: ['./entregadores-dados-pessoais.component.scss']
})
export class EntregadoresDadosPessoaisComponent implements OnInit {
  fieldsPlaces = {
    'Dados Pessoais': ["tipoVinculo","files", "urlFotoPerfil", "exibirFotoPerfil", "files2", "matricula", "nome", "cpf", "rg", "emissorRg", "estadoCivil", "grauRisco", "dataNascimento", "email", "nit", "celular", "telefone1", "telefone2", "active", "cep", "uf", "cidade", "bairro", "logradouro", "numeroEndereco", "complemento", "referencia"], 
    'Forma de Condução': [], 
    'Dados Financeiros': [], 
    'Skills': ["habilidades"]
  };

  public vehicleTypes: any[] = []

  form = new FormGroup({
    id: new FormControl(''),
    active: new FormControl(''),

    matricula:  new FormControl("", [Validators.required, Validators.maxLength(6), this.validateBrService.integer]),
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', [Validators.required, this.validateBrService.cpf]),
    rg: new FormControl('', [Validators.required]),
    emisorRg: new FormControl('', [Validators.required]),
    nit: new FormControl('', [Validators.required]),
    estadoCivil: new FormControl(),
    grauRisco: new FormControl('0', [Validators.min(0), Validators.max(10)]),

    celular: new FormControl('', [Validators.required, Validators.minLength(10)]),
    telefone1: new FormControl('', [Validators.minLength(10)]),
    telefone2: new FormControl('', [Validators.minLength(10)]),

    dataNascimento: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    
    numeroCNH: new FormControl('', [Validators.minLength(11), Validators.maxLength(11)]),
    categoriaCNH: new FormControl(''),
    expiracaoCNH: new FormControl(''),
    urlFotoCNH: new FormControl(''), // NOVO
    files2: new FormControl(null, FileUploadValidators.filesLimit(1)), // NOVO


    cep: new FormControl('', [Validators.required,Validators.minLength(8)]),
    uf: new FormControl('', Validators.required),
    cidade: new FormControl('', Validators.required),
    bairro: new FormControl('', Validators.required),
    logradouro: new FormControl('', Validators.required),
    numeroEndereco: new FormControl('', [Validators.required, Validators.min(0)]),
    complemento: new FormControl(''),
    referencia: new FormControl(''),

    exibirFotoPerfil: new FormControl(true),
    urlFotoPerfil: new FormControl(''),
    files: new FormControl(null, FileUploadValidators.filesLimit(1)),

    online: new FormControl(false), // NOVO

    vinculo: new FormControl({
      ctps: "",
      tipoVinculo: "",
      dataAdmissao: "",
      dataCursoCooperativismo: "",
      dataVigenciaInicio: "",
      dataVigenciaFim: ""
    }),
    ctps: new FormControl(''), 
    tipoVinculo: new FormControl('', [Validators.required]),
    dataAdmissao: new FormControl(''),
    dataCursoCooperativismo: new FormControl(''),
    dataVigenciaInicio: new FormControl(''),
    dataVigenciaFim: new FormControl(''),

    habilidades: new FormControl([]),
    conducoes: new FormControl([]),
    empresas: new FormControl([]),
    tenant: new FormControl({})
  });


  public subPagesList: string[] = [];
  public subPage: any = 0; 



  usuariosForm: any[];
  public isSubmit: boolean;
  public roles: string[];
  public selectedRole: string = '';
  public selectedTenant: any;
  public isAdminRole: boolean;
  public isEdit: boolean;
  public isUserAdmin: boolean = false;
  public noResult: boolean = true;
  public estadosCivis = [];
  public categoriasCnh = [];
  public isFormLoaded: boolean = false;
  public possibleSkills: any[] = [];
  public possibleConduction: any[] = [
    {id: 1, active: true, nome: "Carro", descricao: "Descrição"},
    {id: 2, active: true, nome: "Moto", descricao: "Descrição"},
    {id: 3, active: true, nome: "A pé", descricao: "Descrição"},
    {id: 4, active: true, nome: "Bicicleta", descricao: "Descrição"},
    {id: 5, active: true, nome: "Bicicleta Motorizada", descricao: "Descrição"},
  ];
  public possibleCompanies: any[] = [];

  // public role: string;
  roleName: string;
  public tenants: TenantModel[];
  private _textValue: any;
  public oldData: any = {};

  pdfSrc = '';
  urlFotoPerfil = '';
  dateMask = [/[0-9]/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  cnpjMask = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  inscricaoMunicipalMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]
  cpfMask = [/[0-9]/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  rgMask = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]
  nitMask = [/[0-9]/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/, /\d/, ".", /\d/, /\d/, "-", /\d/]

  public operadores :any[] = []

  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
  public contratoForm = new FormGroup({
    files: this.filesControl
  });

  public tenantId = -1;
  public vinculos: any[] = []

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: EntregadoresService,
    private photoService: PhotoService,
    private tenantService: TenantService,
    private empresasService: EmpresasService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog,
    private validateBrService:ValidateBrService,
    private operadorsService:OperadoresService,
    public auth: AuthGuardService,
    private skillsService: SkillsService,
    public veiculosService: VeiculosService

  ) {
    this.isSubmit = false;
    this.isAdminRole = false;
    this.isUserAdmin = service.isUserAdmin();
  }

  ngOnInit(): void {
    this.getEstadosCivis();
    this.getCategoriasCnh();
    this.getSkills();
    this.getCompanies();
    this.getVinculos();
    this.getTenants();
    this.getVeiculos();
    
    let _id = this.route.snapshot.paramMap.get('id');


    
    if (!!_id) {

      this.subPagesList = ['Dados Pessoais', 'Forma de Condução', 'Dados Financeiros', 'Skills'];

      this.service.getById(parseInt(_id)).subscribe(res => {
        console.log('res', res.data)
        this.oldData = res.data

        // DataSet
        Object.keys(res.data).forEach(key => {
          if (this.form.get(key)) {
            this.form.get(key).setValue(res.data[key]);
          }
        })

        this.form.get('dataNascimento').setValue(this.toDate(res.data.dataNascimento));
        this.form.get('expiracaoCNH').setValue(this.toDate(res.data.expiracaoCNH));
        this.form.get('ctps').setValue(res.data.vinculo.ctps);
        this.form.get('tipoVinculo').setValue(res.data.vinculo.vinculo);
        this.form.get('dataAdmissao').setValue(res.data.vinculo.dataAdmissao);
        this.form.get('dataCursoCooperativismo').setValue(res.data.vinculo.dataCursoCooperativismo);
        this.form.get('dataVigenciaInicio').setValue(res.data.vinculo.dataVigenciaInicio);
        this.form.get('dataVigenciaFim').setValue(res.data.vinculo.dataVigenciaFim);
        
        
        this.isFormLoaded = true;

        this.pdfSrc = res.data.urlContrato
        this.urlFotoPerfil = res.data.urlFotoPerfil
      });
    }
    else {
      this.subPagesList = ['Dados Pessoais', 'Associação', 'Skills']
      this.isFormLoaded = true;
    }
  }

  public toggleStatus() {
    this.filesControl.disabled ? this.filesControl.enable() : this.filesControl.disable();

  }

  public getTenants() {
    this.tenantService.get()
    .subscribe(res => {

      this.tenants = res.data;
    })
  }

  public getVeiculos() {
    let _id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.veiculosService.getByEntregadorId(_id);
  }

  public getVinculos() {
    this.service.getVinculos()
    .subscribe(res => {
      this.vinculos = res.data;
    }, err => {
      this.snackBar.error(err, 3500, 'X');

    })
  }

  public getErrors(): string[] {
    
    var errors: string[] = []
    
    Object.keys(this.fieldsPlaces).forEach(place => {
      this.fieldsPlaces[place].forEach(field => {
        if (this.form.get(field) && this.form.get(field).errors != null && errors.indexOf(place) === -1) {
          errors.push(place)
        } 
      })
    })
    
    return errors
  }

  public getSkills() {
    this.skillsService.get()
    .subscribe(res => {
      this.possibleSkills = res.data.filter(d => d.active);
    }, err => {
      this.snackBar.error(err, 3500, 'X');

    })
  }

  public getCompanies() {
    //possibleCompanies
    this.empresasService.get()
    .subscribe(res => {
      var companies = res.data;
      companies.map(c => c.nome = c.razaoSocial);
      this.possibleCompanies = companies;
      console.log(this.possibleCompanies)
    }, err => {
      this.snackBar.error(err, 3500, 'X');

    })
  }

  toDate(str: string) {
    if (str.split("T").length > 1) {
      var dt = new Date(str);
      return dt
    }
    else {
      var dt = new Date(str+"T00:00:00");
      return dt
    }
    
  }

  getCategoriasCnh() {
    this.service.getCategoriasCnh()
    .subscribe(res => {
      this.categoriasCnh = res.data;
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }

  getEstadosCivis() {
    this.service.getEstadosCivis()
    .subscribe(res => {
      this.estadosCivis = res.data;
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }

  toNormal(value: string):string {
    var parsed = value.toLowerCase().replace("_", " ");
    parsed = parsed.split("").map((letter, index) => {
      if (index == 0 || parsed[index -1 ] == " ") {
        return letter.toUpperCase();
      }
      else {
        return letter;
      }
    }).join("")
    return parsed
  }


  changeFieldValue(fieldName, value) {
    this.form.get(fieldName).setValue(value);
  }

 

  async onSubmit(form: any) {
    this.needCnh();

    const modelViewForm = { ...this.oldData, ...this.form.value };
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body = { ...this.oldData, ...this.form.value };
    body.celular = body.celular.replace(/[^0-9]/g, '');
    body.telefone1 = body.telefone1.replace(/[^0-9]/g, '');
    body.telefone2 = body.telefone2.replace(/[^0-9]/g, '');
    body.vinculo = {
      ctps: body.ctps,
      vinculo: body.tipoVinculo,
      dataAdmissao: body.dataAdmissao,
      dataCursoCooperativismo: body.dataCursoCooperativismo,
      dataVigenciaInicio: body.dataVigenciaInicio,
      dataVigenciaFim: body.dataVigenciaFim
    }
    

    // UPLOAD IMAGES
    if (form.valid) {
      if (this.form.value.files && this.form.value.files.length > 0) {
        var file = this.form.value.files[0];
        if (file.type.split("/")[1].toLowerCase() != "png" && file.type.split("/")[1].toLowerCase() != "jpeg" && file.type.split("/")[1].toLowerCase() != "jpg") {
          return this.snackBar.error('Formato de imagem de perfil inválido!', 3500, 'X');
        }

        var formData = new FormData()
        formData.append("file", file)
        formData.append("tipo", "LOGOMARCA")

        var imgInfo = await this.photoService.post(formData).toPromise()
        body.urlFotoPerfil = imgInfo.data;
      }
      if (this.form.value.files2 && this.form.value.files2.length > 0) {
        var file = this.form.value.files2[0];
        if (file.type.split("/")[1].toLowerCase() != "png" && file.type.split("/")[1].toLowerCase() != "jpeg" && file.type.split("/")[1].toLowerCase() != "jpg") {
          return this.snackBar.error('Formato de imagem de CNH inválido!', 3500, 'X');
        }

        var formData = new FormData()
        formData.append("file", file)
        formData.append("tipo", "LOGOMARCA")

        var imgInfo = await this.photoService.post(formData).toPromise()
        body.urlFotoCNH = imgInfo.data;
      }
    }
    // /UPLOAD IMAGES

    if (modelViewForm.id) {
      if (form.valid) {
        this.service.put(body)
          .subscribe(res => {
            this.snackBar.success('Atualizado com sucesso!', 3500, 'X');
            this.router.navigateByUrl('cadastro/entregadores/editar/' + res.data.id);
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
            this.snackBar.success('Entregador cadastrado com sucesso!', 3500, 'X');
            this.router.navigateByUrl('cadastro/entregadores/editar/' + res.data.id);
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
        message: 'Você deseja realmente excluir este entregador?',
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
        this.snackBar.success(`Entregador excluído com sucesso!`, 3000, 'X');
        setTimeout(() => {
          this.router.navigateByUrl('cadastro/entregadores');
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
			document.getElementById('img-src')['src'] = reader.result
			return reader.result;
		}

		var url = reader.readAsDataURL(file);
		console.log(url);
  }

  onCnhFileChange(e) {
    var file = this.form.value.files2[0];
		var reader = new FileReader();
		
		reader.onloadend = function () {
			document.getElementById('img-src-cnh')['src'] = reader.result
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

  changeSkillList(e) {
    this.form.get('habilidades').setValue(e);
  }
  changeConductionList(e) {
    this.form.get('conducoes').setValue(e);
  }
  changeEmpresasList(e) {
    this.form.get('empresas').setValue(e);
  }

  applyDataMascara(value, field) {
		const date = value.replace(/[^0-9]/g,'').split('');
		if (date.length != 8) this.form.get(field).setValue(null);

		var tabsPos = [1, 3];
		var newDateStr = ""; 
		// Format string
		date.forEach((char, index) => { // O(n)
			newDateStr += char;
			if (tabsPos[0] === index) {
				newDateStr += "/";
				tabsPos.splice(0,1);
			}
		})
		var splitted = newDateStr.split("/");
		var dateParams = {
			d: splitted[0],
			m: splitted[1],
			y: splitted[2]
		}
		var str = `${dateParams.y}-${dateParams.m}-${dateParams.d}T00:00:00`;
		var dt = new Date(str);
		this.form.get(field).setValue(dt);
  }
  


  changeSubPage(page) {
    this.subPage = page;
  }

  onChangeVehicles(e) {
    console.log(e)
    this.vehicleTypes = e
  }
  needCnh(): boolean {
    /*
     numeroCNH: new FormControl('', [Validators.minLength(11), Validators.maxLength(11)]),
    categoriaCNH: new FormControl(''),
    expiracaoCNH: new FormControl(''),
    urlFotoCNH: new FormControl(''), // NOVO
     */
    var need = false;
    this.vehicleTypes.forEach(v => {
      if (v.nome != "BICICLETA") {
        need = true;
      }
    })
    if (need) {
      console.log('ADDING VALIDATORS')
      this.form.get('numeroCNH').setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)])
      this.form.get('categoriaCNH').setValidators([Validators.required])
      this.form.get('expiracaoCNH').setValidators([Validators.required])
    } else {
      this.form.get('numeroCNH').clearValidators()
      this.form.get('categoriaCNH').clearValidators()
      this.form.get('expiracaoCNH').clearValidators()
      this.form.get('numeroCNH').updateValueAndValidity()
      this.form.get('categoriaCNH').updateValueAndValidity()
      this.form.get('expiracaoCNH').updateValueAndValidity()
    }

    return need;
  }
}
