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
import { EmpresasService } from 'src/app/demo/services/empresas.service';
@Component({
  selector: 'app-empresas-servico',
  templateUrl: './empresas-servico.component.html',
  styleUrls: ['./empresas-servico.component.scss']
})
export class EmpresasServicoComponent implements OnInit {
  @Output() check = new EventEmitter();

  dataSource;
  noResult: boolean = false;
  displayedColumns = [
    'modulo',
    'buttons'
  ]

  empresaId = null
  arrayServicos = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modulosService: ModulosService,
    private service: EmpresasService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    public auth: AuthGuardService

  ) { }

  ngOnInit() {
    this.empresaId = this.route.snapshot.paramMap.get('id');
    this.getData();
  }

  getData() {
  this.modulosService.getByIdEmpresa(this.empresaId)
    .subscribe(result => {
      console.log('result.data5555');
      console.log(result.data);
      this.dataSource = new MatTableDataSource(result.data);
      this.arrayServicos = result.data;

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

  delete(item): void {
    this.modulosService.deleteServicoEmpresas(item.id)
    .subscribe(
      response => {
        this.getData();
        this.snackBar.success(`Serviço excluído com sucesso!`, 3000, 'X');
      }, err => {
        this.snackBar.error(err, 3000, 'X');
      });
  }


  public new() {
    window.localStorage.setItem('servicoId', '')
    this.router.navigate(['/cadastro/empresas/editar/' + this.empresaId + '/modulos/novo']);
  }

  public edit(row: any) {
    console.log('row2', row);
    window.localStorage.setItem('servicoId', row.id)

    this.router.navigate(['cadastro/empresas/editar/' + this.empresaId + '/modulos/editar/', row.id]);
  }
}
