import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
import { OperadoresService } from 'src/app/demo/services/operadores.service';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { AuthGuardService } from 'src/guards/auth.guard';
import * as moment from "moment";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-operador-status',
  templateUrl: './operador-status.component.html',
  styleUrls: ['./operador-status.component.scss']
})
export class OperadorStatusComponent implements OnInit {
  form: FormGroup;
  public oldData: any = {};
  status= '';
  data = '';
  dataSource;
  operadorId = null;

  today;
  time;
  noResult: boolean;
  historico: any;
  date: Date;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: OperadoresService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog,
    private validateBrService: ValidateBrService,
    public auth: AuthGuardService,
) {this.today = moment(); }

  ngOnInit(): void {
    this.operadorId = this.route.snapshot.paramMap.get('operadorId');
    this.createForm();
    this.getData();
    let _id = this.form.value.dominioId;
    this.status = this.getStatus();
  }

   createForm() {
    this.form = this.formBuilder.group({
      dominioId: [parseInt(this.route.snapshot.paramMap.get('id'))],
      descricao: ['', Validators.required],
      ativo: ['', Validators.required],
    });

    if(this.form.value.ativo === true){
    this.status = 'Ativo'
    }else{
      this.status = 'Bloqueado'
    }
  }

  getStatus(){
  const dominioId = this.form.value.dominioId;
    if (!!dominioId) {
      this.service.getById(parseInt(dominioId)).subscribe(res => {
        this.form.get('ativo').setValue(res.data.active);
        if(res.data.active === true){
            this.status = 'Ativo'
            }else{
              this.status = 'Bloqueado'
        }
      });
    }
    return this.status
  }

  getData(){
    this.service.getStatus(this.form.value.dominioId)
    .subscribe(res => {
      if (res.data.length !== 0) {
        this.noResult = false;
        this.dataSource = new MatTableDataSource(res.data);
        this.historico = res.data;
      } else {
        this.noResult = true;
      }
    }, err => {
      this.noResult = true;
    })

  }
  getDate(obj?){
    return obj.value.data
  }

  toDateString(datetime?: any): any {
		if (datetime) {
      var x = new Date(parseInt(datetime.substring(0,4)), parseInt(datetime.substring(5,7))-1, parseInt(datetime.substring(8)));

      var dd = (x.getDate() < 10 ? '0' : '') + x.getDate();
      var MM = ((x.getMonth() + 1) < 10 ? '0' : '') + (x.getMonth() + 1);
      var yyyy = x.getFullYear();

      return (dd + "/" + MM + "/" + yyyy);
		} else {
		  return ""
		}
	}

  async confirm(form) {
    const modelViewForm = {...this.oldData, ...this.form.value};
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body = {...this.oldData, ...this.form.value};
    body.dominioId = this.form.value.dominioId;

    if (form.valid) {
      body.descricao = this.form.value.descricao;
      body.ativo = this.form.value.ativo;

      this.service.post(body)
          .subscribe(res => {
            this.snackBar.success('Alteração cadastrada com sucesso!', 3500, 'X');
            this.router.navigateByUrl('cadastro/operadores/editar/' + this.operadorId);
          }, err => {
            this.snackBar.error(err, 3500, 'X');
          });
      } else {
        this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
      }
  }

  cancel(form?){
    this.form.reset();
    this.router.navigateByUrl('cadastro/operadores');
  }

  delete(): void {
    this.form.reset();
      this.snackBar.success(`Operador excluído com sucesso!`, 3000, 'X');
      setTimeout(() => {
        this.router.navigateByUrl('cadastro/operadores');
      }, 1000);
  }

  onSubmit(e?, form?){
    const modelViewForm = {...this.oldData, ...this.form.value};
    const sourceSystem = sessionStorage.getItem('sourceSystem');
    const systemCode = sessionStorage.getItem('systemCode');

    const body = {...this.oldData, ...this.form.value};

    body.dominioId = this.form.value.dominioId;

    if (form.valid) {
      if(this.status === this.form.value.ativo){
              this.snackBar.error('Status alterado igual ao status atual. Altere o status para fazer a alteração.', 3500, 'X');
      } else{
        body.descricao = this.form.value.descricao;
        body.ativo = this.form.value.ativo;

        this.service.postStatus(body)
            .subscribe(res => {
              this.snackBar.success('Alteração cadastrada com sucesso!', 3500, 'X');
              this.router.navigate(['cadastro/operadores/editar/' + this.operadorId]);
            }, err => {
              this.snackBar.error(err, 3500, 'X');
            });
        }
      } else {
      this.snackBar.error('Campo obrigatório não preenchido.', 3500, 'X');
    }
  }
}
