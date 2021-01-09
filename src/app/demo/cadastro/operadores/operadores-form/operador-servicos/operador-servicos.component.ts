import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OperadoresService } from '../../../../services/operadores.service';
import { ModulosService } from '../../../../services/modulos.service';
import { UserAcessAuth } from '../../../../services/user-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { OperadorModel } from '../../../../models/operador-model';
import { MatSort } from '@angular/material/sort';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { AuthGuardService } from '../../../../../../guards/auth.guard';

@Component({
  selector: 'app-operador-servicos',
  templateUrl: './operador-servicos.component.html',
  styleUrls: ['./operador-servicos.component.css']
})
export class OperadorServicosComponent implements OnInit {
  @Output() check = new EventEmitter();

  dataSource;
  noResult: boolean = false;
  displayedColumns = [
    'modulo',
    'buttons'
  ]

  operadorId = null

  arrayServicos = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modulosService: ModulosService,
    private service: OperadoresService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    public auth: AuthGuardService

  ) { }

  ngOnInit() {
    this.operadorId = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
    this.modulosService.getOperatorsServices(this.operadorId)
    .subscribe(result => {
      this.dataSource = new MatTableDataSource(result.data);
      this.arrayServicos = result.data;
      console.log(result.data)

      if(result.data != ''){
      // CheckTab
      this.noResult = false;
        this.check.emit(true)
      }else{
        this.noResult = true;
        this.check.emit(false)
      }
    })
  }

  public confirmDelete(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir este serviço?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        //this.delete(row);
      }
    });
  }

  delete(row): void {
    this.service.delete(row.id).subscribe(
      response => {
        this.getData();
        this.snackBar.success(`Operador excluído com sucesso!`, 3000, 'X');
        this.router.navigate(['cadastro/operadores/editar/' + this.operadorId]);

      }, err => {
        this.snackBar.error(err, 3000, 'X');
      });
  }

  public edit(row: any) {
    console.log('row', row)
    this.router.navigate(['cadastro/operadores/editar/' + this.operadorId + '/modulos/editar/', row.id]);
  }
}
