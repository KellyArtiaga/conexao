import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { LoginService } from 'src/app/demo/services/login.service';
import { EntregadoresService } from 'src/app/demo/services/entregadores.service';
import { BancosService } from 'src/app/demo/services/bancos.service';
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
import { AuthGuardService } from '../../../../../../guards/auth.guard';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entregadores-dados-bancarios',
  templateUrl: './entregadores-dados-bancarios.component.html',
  styleUrls: ['./entregadores-dados-bancarios.component.scss']
})
export class EntregadoresDadosBancariosComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: EntregadoresService,
    private photoService: PhotoService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog,
    private validateBrService: ValidateBrService,
    public auth: AuthGuardService,
    private bancos: BancosService
  ) { }


  public form = new FormGroup({
    id: new FormControl(null),
    active: new FormControl(false),
    banco: new FormControl('', [Validators.required]),
    agencia: new FormControl('', [Validators.required, this.validateBrService.integer]),
    conta: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    cooperado: new FormControl({id: this.route.snapshot.paramMap.get('id') || null})
  });

  public dataSource = new MatTableDataSource([]);
  public displayedColumns = [
    "active", "banco", "agencia", "conta", "tipo", "buttons"
  ]
  public noResult: boolean = true;

  public modifiedRows: number[] = []


  public tiposContas: any[] = []
  public listaBancos:any[] = []

  ngOnInit(): void {
    this.getData();
    this.getListaBancos();
    this.getTipoContas();
  }


  public getData(): void {
    this.service.getDadosBancarios(this.form.value.cooperado.id).subscribe(res => {
      this.noResult = res.data.length === 0

      this.dataSource = new MatTableDataSource(res.data);
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }

  public getTipoContas():void {
    this.bancos.getTypes()
    .subscribe(res => {
      this.tiposContas = res.data;
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }

  public getListaBancos():void {
    this.bancos.get()
    .subscribe(res => {
      this.listaBancos = res.data;
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }

  public onAdd(form): void {
    this.modifiedRows = []; // Reset modified list

    console.log(form.value);
    var body = form.value;
    body.banco = parseInt(body.banco.codigo)
    console.log(body)

    if (this.form.value.id && this.form.value.id !== '') {
      this.service.putDadosBancarios(body, body.id)
      .subscribe(res => {
        this.snackBar.success("Dados bancarios salvos com sucesso!", 3500, 'X');
        this.getData();
      }, err => {
        this.snackBar.error(err, 3500, 'X');
      })
    }
    else {
      this.service.postDadosBancarios(body)
      .subscribe(res => {
        this.snackBar.success("Dados bancarios cadastrados com sucesso!", 3500, 'X');
        this.getData();
      }, err => {
        this.snackBar.error(err, 3500, 'X');
      })
    }
    this.form.reset();
    this.form.get('cooperado').setValue({id: this.route.snapshot.paramMap.get('id') || null}); 
  }

  public switchRowStatus(row, event) {
    var data = this.dataSource.data;
    var index = data.findIndex(item => item.id === row.id);

    
    if (this.modifiedRows.indexOf(index) === -1) { // Add row to modified list
      this.modifiedRows.push(index)
    }
    data.forEach((item, i) => {
      if (item.active) {
        if (this.modifiedRows.indexOf(i) === -1) { // Add row to modified list
          this.modifiedRows.push(i)
        }
        item.active = false;
      }
    })
    data[index].active = !data[index].active;
    this.dataSource = new MatTableDataSource(data);
  }

  public async onSubmit(e) {
    console.log(this.modifiedRows)
    var errors = [];
    var data = this.dataSource.data;
    this.modifiedRows.forEach(async row => {
      var res = await this.service.putDadosBancarios(data[row], data[row].id).toPromise().catch(err => errors.push(err));
      console.log(res);
    })
    if (errors.length === 0) {
      this.snackBar.success("Alterações salvas com sucesso!", 3500, 'X');
    }
    else {
      this.snackBar.error(errors[0], 3500, 'X');
    }
  }

  compareNome(a, b){
    return a.nome === b.nome;
  }
  

  onCancelEditing(): void {
    this.form.reset();
    this.form.get('cooperado').setValue({id: this.route.snapshot.paramMap.get('id') || null}); 
  }

  edit(row: any): void {
    window.scrollTo(0,0)
    console.log(row);
    Object.keys(row).forEach(key => {
      this.form.get(key).setValue(row[key]);
    })
  }

  delete(row: any): void {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir este banco?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.deleteDadosBancarios(row.id)
        .subscribe(res => {
          this.snackBar.success("Banco excluído com sucesso!", 3500, 'X');
          this.getData();
        }, err => {
          this.snackBar.error(err, 3500, 'X');
        })
      }
    });
  }
}
