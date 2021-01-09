import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { UserAcessAuth } from '../../services/user-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { UsuariosModel } from '../../models/usuarios-model';
import { MatSort } from '@angular/material/sort';
import { SnackBarService } from '../../services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { AuthGuardService } from '../../../../guards/auth.guard';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'nome',
    'login',
    'roles',
    'active',
    'buttons'
  ];

  list: any;
  formUsuarios: FormGroup;
  usuarios: any[];
  dataSource: MatTableDataSource<UsuariosModel>;

  roles: string[];
  roleName: string;

  isEdition: boolean;
  noResult: boolean;
  length: number;

  public isCollapsed: boolean;

  constructor(
    private router: Router,
    private service: UsuariosService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    public auth: AuthGuardService
  ) { }

  ngOnInit(): void {
    this.noResult = true;

    this.getData();
    //  this.isEdition = false;

    this.isCollapsed = true;
  }

  private getData(): void {
    this.usuarios = [];

    this.service.get()
      .subscribe(res => {
        if (res.data.length !== 0) {
          this.changeRolesNames(res.data);
          this.noResult = false;
          this.listData(res.data, false, res.totalElements);
          this.length = res.totalElements;
          this.dataSource = new MatTableDataSource(this.list);
          this.getSort();
        } else {
          this.noResult = true;
        }
      }, err => {
        this.noResult = true;
      });
  }

  changeRolesNames(obj?: any) {
    obj.forEach(element => {
      const role = element.roles[0];
      if (role === 'ROLE_MASTER') {
        element.roleName = 'Master';
      } else if (role === 'ROLE_OPERADOR_ADMIN') {
        element.roleName = 'Administrador';
      } else if (role === 'ROLE_OPERADOR_MANAGER') {
        element.roleName = 'Gerente';
      } else if (role === 'ROLE_EMPRESA') {
        element.roleName = 'Supervisor';
      } else if (role === 'ROLE_COOPERADO') {
        element.roleName = 'Cooperado';
      } else {
        element.roleName = '-';
      }
    });
  }

  getSort() {
    this.dataSource.sort = this.sort;
  }

  filterData(filterValue: string) {
    this.dataSource.filter = filterValue.trim();
  }

  listData(response, filter, totalElements?) {
    console.log(response);
    if (response.length !== 0) {
      this.noResult = false;
      this.list = response;
      this.dataSource = new MatTableDataSource(this.list);
      this.length = totalElements;

    } else {
      if (filter) {
        this.noResult = false;
        this.list = response;
        this.dataSource = new MatTableDataSource(this.list);
      } else {
        this.noResult = true;
      }
    }
  }

  edit(_item) {
    this.router.navigate(['cadastro/usuarios/editar', _item.id]);
  }

  confirm(_item) {
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir este usuário?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.delete(_item);
      }
    });
  }


  delete(_item): void {
    this.service.delete(_item.id).subscribe(
      response => {
        this.getData();
        this.snackBar.success(`Cadastro excluído com sucesso!`, 3000, 'X');
      }, err => {
        this.snackBar.error('Erro. Tente novamente!', 3000, 'X');
      });
  }
}
