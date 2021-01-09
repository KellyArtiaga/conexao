import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { OperadoresService } from '../../services/operadores.service';
import { UserAcessAuth } from '../../services/user-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { OperadorModel } from '../../models/operador-model';
import { MatSort } from '@angular/material/sort';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import {CsvServiceService} from '../../services/csvService.service';
import { AuthGuardService } from '../../../../guards/auth.guard';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.scss']
})
export class OperadoresComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource;
  noResult: boolean = false;
  displayedColumns: string[] = [
    'codigo',
    'razaoSocial',
    'cnpj',
    'telefoneContato',
    'active',
    'buttons'
  ];

  exportColumnNames: string[] = [
    "Código",
    "Razão Social",
    "CNPJ",
    "Telefone",
    "Ativo"
  ];

  public fullData: any[] = []
  public disableScrollPager: boolean = true
  public pageInfo: any = {}
  public filter: string = ""

  constructor(
    private router: Router,
    private service: OperadoresService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    private csv: CsvServiceService,
    public auth: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  public exportData() {
    console.log(this.dataSource);
    this.csv.export("Operadores", this.dataSource.data, this.displayedColumns, this.exportColumnNames)
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


  

  public confirm(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir este operador?',
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
    this.router.navigate(['cadastro/operadores/editar', row.id]);
  }

  delete(row): void {
    this.service.delete(row.id).subscribe(
      response => {
        var dataIndex = this.fullData.findIndex(d => d.id === row.id);
        this.fullData.splice(dataIndex, 1);
        this.dataSource = new MatTableDataSource(this.fullData);

        this.snackBar.success(`Operador excluído com sucesso!`, 3000, 'X');
      }, err => {
        this.snackBar.error(err, 3000, 'X');
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
