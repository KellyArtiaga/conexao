import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OperadorServicoModuloComponent } from './operador-servico-modulo.component';
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
  declarations: [OperadorServicoModuloComponent]
})
export class OperadorServicoModuloModule { }
