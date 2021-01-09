import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { SkillsService } from '../../services/skills.service';
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
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource;
  noResult: boolean = false;
  displayedColumns: string[] = [
    'nome',
    'descricao',
    'active',
    'buttons'
  ];
  exportColumnNames: string[] = [
    "Nome",
    "Descrição",
    "Ativo"
  ];


  constructor(
    private router: Router,
    private service: SkillsService,
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
    this.csv.export("Skills", this.dataSource.data, this.displayedColumns, this.exportColumnNames)
  }

  public changeFilter(event: string): void {
    this.dataSource.filter = event.trim();
  }

  public getData(filter ?: string) {


    this.service.get(filter || "")
    .subscribe(res => {
      if (res.data.length !== 0) {
        this.noResult = false;
        this.dataSource = new MatTableDataSource(res.data);
      } else {
        this.noResult = true;
      }
      console.log("res", res);

    }, err => {
      this.noResult = true;
      console.log(err)
    })
  }

  public confirm(row: any) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir esta skill?',
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
    this.router.navigate(['cadastro/skills/editar', row.id]);
  }

  delete(row): void {
    this.service.delete(row.id).subscribe(
      response => {
        this.getData();
        this.snackBar.success(`Skill excluída com sucesso!`, 3000, 'X');
      }, err => {
        this.snackBar.error(err, 3000, 'X');
      });
  }

  onScrollToBottom(e) {
    console.log(e)
  }
}
