import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasServicoModuloComponent } from './empresas-servico-modulo.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    NgbDropdownModule,
    FormsModule
  ],
  declarations: [EmpresasServicoModuloComponent]
})
export class EmpresasServicoModuloModule { }
