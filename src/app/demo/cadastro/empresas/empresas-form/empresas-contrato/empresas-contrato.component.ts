import { Component, OnInit, LOCALE_ID, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileUploadControl, FileUploadValidators } from '@iplab/ngx-file-upload';
import { EmpresasService } from 'src/app/demo/services/empresas.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { PhotoService } from 'src/app/demo/services/photo.service';
import { DatePipe } from '@angular/common';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-struct';
import { NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { ValidateBrService } from 'angular-validate-br';
import { includes } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { ModalImageComponent } from 'src/app/theme/shared/components/modal-image/modal-image.component';

@Component({
  selector: 'app-empresas-contrato',
  templateUrl: './empresas-contrato.component.html',
  styleUrls: ['./empresas-contrato.component.scss'],
  providers: [DatePipe,{provide: LOCALE_ID, useValue: 'pt-BR' }]
})
export class EmpresasContratoComponent implements OnInit {
  @Output() check = new EventEmitter();
  form: FormGroup;

  private anoAtual = moment()
        .year()
        .valueOf();
    private mesAtual = moment()
        .month()
        .valueOf();
    private diaAtual = moment()
        .date().valueOf();

    minDate = new Date(this.anoAtual, this.mesAtual, this.diaAtual);
    maxDate = new Date(this.anoAtual + 10, this.mesAtual, this.diaAtual);
    minBoundDate = new Date(this.anoAtual - 10, this.mesAtual, this.diaAtual);

	contratoUsuariosForm: any[];
	pdfSrc = '';
	pdfSrcInitial = '../../../../../../assets/images/habitus-modelo3-contrato-marcenaria.pdf';

	dadosContrato: any = {};
	private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
	public oldData: any = {};
	public contratoForm = new FormGroup({
		files: this.filesControl
	});
  public fileUploadControl = new FileUploadControl().setListVisibility(false);

	disabled:boolean;
	modelPopup: NgbDateStruct;
	public date: {year: number, month: number};
	isValid = false;

  cpfMask = [/[0-9]/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]

	days = []
	empresaId
	isSubmit=false;
  isEdit = false;
	currentDate = new Date();
  now = new Date();
  hasInitialValue : boolean;
  public dayDifference: number;
  public dataInicio;
  public dataFim = new Date();
  today = new Date();
  minFinalDate = new Date();
  maxFinalDate = new Date();
  contratoIsValid: boolean;
  PdfSrcChanged:boolean;

	constructor(
		private service: EmpresasService,
		private route: ActivatedRoute,
    private formBuilder: FormBuilder,
		private snackBar: SnackBarService,
    private router: Router,
		private photoService: PhotoService,
		private datePipe: DatePipe,
		public parserFormatter: NgbDateParserFormatter,
		public calendar: NgbCalendar,
    private validateBrService: ValidateBrService,
    private dialog: MatDialog
	) {
}

	ngOnInit(): void {
    this.hasInitialValue = true;
    this.disabled=false;
    this.PdfSrcChanged=false;

    this.selectToday();
    this.createForm();
		let _id = this.route.snapshot.paramMap.get('id');
		this.empresaId = _id;

		// this.getDadosContrato()
		if (!!_id) {
			this.service.getResponsavelContrato(parseInt(_id)).subscribe(res => {
				this.oldData = res.data
        if(res.data.dataInicioVigenciaContrato != null){
          this.isEdit = true;
          // CheckTab
            this.check.emit(true)
          }else{
          this.check.emit(false)
        }
        this.dataInicio = this.toDateString(res.data.dataInicioVigenciaContrato)
        this.dataFim = this.toDateString(res.data.dataFimVigenciaContrato)

				this.form.get('dataInicioVigenciaContrato').setValue(this.dataInicio);
				this.form.get('dataFimVigenciaContrato').setValue(this.dataFim);
				this.form.get('diaInicioFaturamento').setValue(res.data.diaInicioFaturamento);
				this.form.get('diaEnvioFaturamento').setValue(res.data.diaEnvioFaturamento);

				this.form.get('nome').setValue(res.data.nome);
				this.form.get('email').setValue(res.data.email);
				this.form.get('cpf').setValue(res.data.cpf);
				this.form.get('celular').setValue(res.data.celular);
        if(res.data.urlContrato != '' || res.data.urlContrato != null){
            this.pdfSrc = res.data.urlContrato
          }
      });
    }
  	this.getAvalibleDays();
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

  getFirstDate(event){
    const value = event.target.value;
    this.minBoundDate = value
    if(value === null || value === '' ){
      this.hasInitialValue = true;
      this.form.get('dataFimVigenciaContrato').setValue('');
      this.form.get('dataFimVigenciaContrato').disabled;
    }else{
      this.hasInitialValue = false;
      this.minDate = value;
      this.form.get('dataFimVigenciaContrato').setValue('');
      this.form.get('dataFimVigenciaContrato').enabled
    }
  }

  getSecondDate(event){
      if(this.form.get('dataInicioVigenciaContrato').value.getTime() < event){
          this.form.get('dataFimVigenciaContrato').setValue('');
          this.snackBar.error('Data Final não pode ser menor que data inicial!', 3500, 'X');
      }
  }

	getAvalibleDays() {
		for(var value = 1; value <= 30; value++) {
			this.days.push(value);
		}
	}

	selectToday() {
		this.modelPopup = {year: this.now.getFullYear(), month: this.now.getMonth() + 1, day: this.now.getDate()};
	}

	toDateString(datetime?: any): any {
		if (datetime) {
      var x = new Date(parseInt(datetime.substring(0,4)), parseInt(datetime.substring(5,7))-1, parseInt(datetime.substring(8)));;
      return x;
		} else {
		return ""
		}
	}

	isDate(date: Date): boolean {
		if (Object.prototype.toString.call(date) === "[object Date]") {
		if (isNaN(date.getTime())) {
			return false
		} else {
			return true
		}
		} else {
		return false
		}
	}

	createForm() {
    this.form = this.formBuilder.group({
	    dataInicioVigenciaContrato:  ['', Validators.required],
	    dataFimVigenciaContrato:  ['', Validators.required],
	    diaInicioFaturamento:  ['', Validators.required],
		  diaEnvioFaturamento:  ['', Validators.required],
      idContratante: this.empresaId,

      nome:  ['', [Validators.required,
            Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cpf:  ['', [Validators.required,
      this.validateBrService.cpf]],
      celular:  ['', [Validators.required,
            Validators.minLength(10)]],

      files:  new FormControl(null, FileUploadValidators.filesLimit(2))
    	});
  }

  isEditing() {
		return (this.form.value.id || this.route.snapshot.paramMap.get('id'));
	}

	isContractsOpen() {
		return (this.form.value.id || this.route.snapshot.paramMap.get('id'));
	}

	// getDadosContrato() {
	// 	if (this.empresaId) {
	// 	this.service.getDadosContrato(this.empresaId)
	// 	.subscribe(res => {
	// 		this.dadosContrato = res.data
	// 	})
	// 	}
	// }

  onContratoChange(e){
    this.PdfSrcChanged=true;

    var length = this.form.value.files.length;
    var file = this.form.value.files[length - 1];
    if (length > 1){
        this.form.value.files = '',
        this.form.value.files.push(file)
    }

    if (file.type.split("/")[1].toLowerCase() != "pdf") {
    return this.snackBar.error('Formato de contrato inválido!', 3500, 'X');
    }else{

    var file = this.form.value.files[0];
    var reader = new FileReader();
    this.pdfSrc = "."

    this.form.value.files.forEach(element => {
      console.log(element)
    });

    reader.onloadend = function () {
      document.getElementById('pdf-src')['src'] = reader.result;
      console.log('reader.result');
      console.log(reader.result);
      return reader.result;
    }
      var url = reader.readAsDataURL(file);
  	}
  }

  clearContract(event){
    this.pdfSrc = ""
    this.PdfSrcChanged=true;
    this.form.value.files= '';
    this.filesControl.setValue([]);
  }

  modalContract(event){
   const dialogRef = this.dialog.open(ModalImageComponent, {
      data: {
        img: this.pdfSrc
      }
    });
  }

  async save(form?:any) {
		const body = {
			dataInicioVigenciaContrato:  this.form.get('dataInicioVigenciaContrato').value,
			dataFimVigenciaContrato:  this.form.get('dataFimVigenciaContrato').value,
			diaInicioFaturamento:  parseInt(this.form.get('diaInicioFaturamento').value),
			diaEnvioFaturamento:  parseInt(this.form.get('diaEnvioFaturamento').value),
			idContratante:  parseInt(this.empresaId),
			urlContrato: "",
			nome:  this.form.get('nome').value,
			email: this.form.get('email').value.toLowerCase(),
			cpf:  this.form.get('cpf').value.split('.').join('').split('-').join(''),
			celular:  this.form.get('celular').value.split('(').join('').split('-').join('').split(')').join('').split(' ').join(''),
		}

		const modelViewForm = {...this.oldData, ...form.value};
		const sourceSystem = sessionStorage.getItem('sourceSystem');
		const systemCode = sessionStorage.getItem('systemCode');


		if (form.valid) {
      if (this.form.value.files && this.form.value.files.length > 0) {
        var file = this.form.value.files[0];
        if (file.type.split("/")[1].toLowerCase() != "png" && file.type.split("/")[1].toLowerCase() != "jpeg" && file.type.split("/")[1].toLowerCase() != "jpg" && file.type.split("/")[1].toLowerCase() != "pdf") {
          return this.snackBar.error('Formato de contrato inválido!', 3500, 'X');
        }

        var formData = new FormData()
        formData.append("file", file)
        formData.append("tipo", "CONTRATO")

        var imgInfo = await this.photoService.post(formData).toPromise()
				body.urlContrato = imgInfo.data;
      }
			this.service.postContrato(body)
			.subscribe(res => {
				this.snackBar.success('Dados de contrato cadastrados com sucesso!', 3500, 'X');
				this.router.navigateByUrl('cadastro/empresas/editar/'+res.data.idContratante);
			}, err => {
				this.snackBar.error(err, 3500, 'X');
			});
    	}else{
			this.snackBar.error('Campos incorretos. Tente novamente!', 3500, 'X');
		}
  }

  async saveContractPdf() {
		var file = this.contratoForm.value.files[0];
		if (file.type.split('/')[1].toLowerCase() == 'pdf') {
		var formData = new FormData()
		formData.append('image', file)
		var photoLink = await this.photoService.post(formData).toPromise()
		var body = {
			...this.form.value,
			urlContrato: photoLink.data
		}
		this.service.put(body)
			.subscribe(res => {
			this.snackBar.success('Atualizado com sucesso!', 3500, 'X');
			this.router.navigateByUrl('cadastro/empresas/editar/'+res.data.idContratante);
			}, err => {
			this.snackBar.error(err, 3500, 'X');
			});
		}
		else {
		return this.snackBar.error('Formato de imagem inválido!', 3500, 'X');
		}
	}

	firstAcess(form?:any){
		// const emailfirstAccess = this.form.get('email').value
		// alert(emailfirstAccess);

		const body = {
			dataInicioVigenciaContrato:  this.form.get('dataInicioVigenciaContrato').value,
			dataFimVigenciaContrato:  this.form.get('dataFimVigenciaContrato').value,
			diaInicioFaturamento:  parseInt(this.form.get('diaInicioFaturamento').value),
			diaEnvioFaturamento:  parseInt(this.form.get('diaEnvioFaturamento').value),
			idContratante:  parseInt(this.empresaId),
			nome:  this.form.get('nome').value,
			email: this.form.get('email').value.toLowerCase(),
			cpf:  this.form.get('cpf').value.split('.').join('').split('-').join(''),
			celular:  this.form.get('celular').value.split('(').join('').split('-').join('').split(')').join('').split(' ').join(''),
		}

	  if (!form.valid) {
			this.isSubmit = true;
			return;
    }
		const modelViewForm = {...this.oldData, ...form.value};
		const sourceSystem = sessionStorage.getItem('sourceSystem');
		const systemCode = sessionStorage.getItem('systemCode');

		this.service.postEnviarAcesso(body)
		.subscribe(res => {
			this.snackBar.success('Acesso criado com sucesso!', 3500, 'X');
			// this.router.navigateByUrl('cadastro/empresas/editar/'+res.data.id);
		}, err => {
			if(err){
				this.snackBar.error(err, 3500, 'X');
			}else{
				this.snackBar.error(err, 3500, 'X');
			}
		});
	}
}
