import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { EntregadoresService } from '../../services/entregadores.service';
import { AuthGuardService } from '../../../../guards/auth.guard';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { CsvServiceService } from '../../services/csvService.service';

@Component({
  selector: 'app-entregadores',
  templateUrl: './entregadores.component.html',
  styleUrls: ['./entregadores.component.scss']
})
export class EntregadoresComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource;
  noResult: boolean = false;
  displayedColumns: string[] = [
    'matricula',
    'nome',
    'cpf',
    'categoriaCNH',
    'modeloVeiculo',
    'placaVeiculo',
    'celular',
    'active',
    'buttons'
  ];
  exportColumnNames: string[] = [
    "Matrícula",
    "CPF",
    "CNH/Categoria",
    "Modelo",
    "Placa",
    "Telefone Contato",
    "Situação"
  ]

  public fullData: any[] = []
  public disableScrollPager: boolean = true
  public pageInfo: any = {}
  public filter: string = ""

  constructor(
    private router: Router,
    private service: EntregadoresService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    private csv: CsvServiceService,
    public auth: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.getData();
  }


  public getData(page ?: number, event ?: string) {
    this.disableScrollPager = true;
    this.service.getPage(page || 0, event || "")
    .subscribe(res => {
      
      if (res.content.length !== 0) {
        this.noResult = false;
        this.fullData = [...this.fullData, ...res.content]
        this.dataSource = new MatTableDataSource(this.fullData);
        this.pageInfo = res
      } else {
        this.noResult = true;
      }
      console.log("res", res);
      this.disableScrollPager = false
    }, err => {
      this.disableScrollPager = false
      this.noResult = true;
      console.log(err)
    })
  }

  
  public exportData() {
    console.log(this.dataSource);
    this.csv.export("Entregadores", this.dataSource.data, this.displayedColumns, this.exportColumnNames)
  }

  public confirm(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir este Entregador?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(row);
      }
    });
  }

  public edit(row: any) {
    console.log('row', row)
    this.router.navigate(['cadastro/entregadores/editar', row.id]);
  }

  delete(row): void {
    this.service.delete(row.id).subscribe(
      response => {
        var dataIndex = this.fullData.findIndex(d => d.id === row.id);
        this.fullData.splice(dataIndex, 1);
        this.dataSource = new MatTableDataSource(this.fullData);
        
        this.snackBar.success(`Entregador excluída com sucesso!`, 3000, 'X');
      }, err => {
        this.snackBar.error('Erro. Tente novamente!', 3000, 'X');
      });
  }

  public changeFilter(event: string): void {
    // this.dataSource.filter = event.trim();
    this.fullData = []
    this.filter = event
    this.getData(0, event)
  }

  public onNextPage(event: any): void {
    if (this.pageInfo.number < this.pageInfo.totalPages - 1) {
      var filter = this.filter || ""
      this.getData(this.pageInfo.number + 1, filter);
    }
  }
}
