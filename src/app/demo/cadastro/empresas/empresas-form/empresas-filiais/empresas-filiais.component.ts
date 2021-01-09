import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { EmpresasService } from 'src/app/demo/services/empresas.service';
import {  ActivatedRoute } from '@angular/router';
import { TenantService } from 'src/app/demo/services/tenant.service';
import { PhotoService } from 'src/app/demo/services/photo.service';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ValidateBrService } from 'angular-validate-br';
import { AuthGuardService } from '../../../../../../guards/auth.guard';
@Component({
  selector: 'app-empresas-filiais',
  templateUrl: './empresas-filiais.component.html',
  styleUrls: ['./empresas-filiais.component.scss']
})
export class EmpresasFiliaisComponent implements OnInit {
  @Output() check = new EventEmitter();

  @ViewChild("modal") modal;
  dataSource;
  empresaData;
  form;
  noResult: boolean = false;
  displayedColumns: string[] = [
    'razaoSocial',
    'cnpj',
    'telefoneContato',
    'active',
    'buttons'
  ];

  showForm: boolean = false;
  editingFilialId: number = null;

  cnpjMask = [/[0-9]/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/]
  inscricaoMunicipalMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/]
  cepMask = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: EmpresasService,
    private photoService: PhotoService,
    private tenantService: TenantService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    private validateBrService: ValidateBrService,
    public auth: AuthGuardService
  ) { }

  ngOnInit() {
    this.getData();
    this.createForm();
  }

  getData() {
    let _id = this.route.snapshot.paramMap.get('id');
    if (_id) {
      this.service.getById(parseInt(_id)).subscribe(res => {
      // CheckTab
      if(res.data.filiais){
          this.check.emit(true);
          this.noResult=false
        }else{
          this.check.emit(false);
          this.noResult=true
        }
        this.dataSource = new MatTableDataSource(res.data.filiais)
        this.empresaData = res.data;
      })
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [''],
      razaoSocial: ['', Validators.required],
      cnpj: ['', [Validators.required, this.validateBrService.cnpj]],
      inscricaoMunicipal: ['', Validators.required],
      identificador: ['', Validators.min(0)],
      telefoneContato: ['', Validators.required],
      centroCusto: [''],
      cep: [''],
      logradouro: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      referencia: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      uf: ['', Validators.required],

      active: [true],
      tenant: []
    });
  }

  delete(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir esta filial?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.delete(row.id)
        .subscribe(res => {
          this.snackBar.success('Filial excluida com sucesso!', 3500, 'X');
          this.empresaData.filiais = this.empresaData.filiais.filter(f => f.id != row.id);
          this.dataSource = new MatTableDataSource(this.empresaData.filiais);
          if(this.empresaData.filiais = []){
            this.noResult = true;
          }
        }, err => {
          this.snackBar.error(err, 3500, 'X');
        })
      }
      console.log(this.dataSource)
      if(this.dataSource.lenght >=0 || this.dataSource.lenght === 'null'){
      this.noResult = true;
      }
    });
  }

  clearForm() {
    Object.keys(this.form.controls).map(key => this.form.get(key).setValue(key['value']));
  }

  async onSubmit(form: any) {
    const modelViewForm = { ...this.form.value };
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body = {...this.form.value, matriz: {id:this.route.snapshot.paramMap.get('id')} };
      if (form.valid) {
        if (body.id && body.id != "") {
          this.service.put(body)
          .subscribe(res => {
            this.snackBar.success('Filial atualizada com sucesso!', 3500, 'X');
            if (!this.empresaData.filiais) {
              this.empresaData.filiais = []
            }
            var filialIndex = this.empresaData.filiais.findIndex(f => f.id == body.id)
            this.empresaData.filiais[filialIndex] = res.data;
            this.dataSource = new MatTableDataSource(this.empresaData.filiais);
            this.closeForm();

          }, err => {
            this.snackBar.error(err, 3500, 'X');
          });
        }
        else {
          this.service.post(body)
          .subscribe(res => {
            this.snackBar.success('Filial cadastrada com sucesso!', 3500, 'X');
            if (!this.empresaData.filiais) {
              this.empresaData.filiais = []
            }
            this.noResult=false;
            this.empresaData.filiais.push(res.data);
            this.dataSource = new MatTableDataSource(this.empresaData.filiais);
            this.closeForm();

          }, err => {
            this.snackBar.error(err, 3500, 'X');
          });
        }
      } else {
        this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
      }
  }

  openForm(filialId: number) {
    this.editingFilialId = filialId;
    this.showForm = true;


    if (filialId) {
      var filial = this.empresaData.filiais.find(f => f.id == filialId);
      this.form.get("id").setValue(filialId);
      this.form.get("razaoSocial").setValue(filial.razaoSocial);
      this.form.get("cnpj").setValue(filial.cnpj);
      this.form.get("inscricaoMunicipal").setValue(filial.inscricaoMunicipal);
      this.form.get("identificador").setValue(filial.identificador);
      this.form.get("telefoneContato").setValue(filial.telefoneContato);
      this.form.get("centroCusto").setValue(filial.centroCusto);
      this.form.get("cep").setValue(filial.cep);
      this.form.get("logradouro").setValue(filial.logradouro);
      this.form.get("numero").setValue(filial.numero);
      this.form.get("complemento").setValue(filial.complemento);
      this.form.get("referencia").setValue(filial.referencia);
      this.form.get("bairro").setValue(filial.bairro);
      this.form.get("cidade").setValue(filial.cidade);
      this.form.get("uf").setValue(filial.uf);
    }
  }

  closeForm() {
    this.editingFilialId = null;
    this.showForm = false;
    this.clearForm();
  }

  cepFound(e) {
    this.form.get('uf').setValue(e.uf);
    this.form.get('cidade').setValue(e.localidade);
    this.form.get('bairro').setValue(e.bairro);
    this.form.get('logradouro').setValue(e.logradouro);
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
