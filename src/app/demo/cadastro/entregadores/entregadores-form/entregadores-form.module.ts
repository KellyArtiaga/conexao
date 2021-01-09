import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntregadoresFormComponent } from './entregadores-form.component';
import { EntregadoresDadosPessoaisComponent } from './entregadores-dados-pessoais/entregadores-dados-pessoais.component';
import { EntregadoresVeiculosComponent } from './entregadores-veiculos/entregadores-veiculos.component';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask'
import { FrmValidationModule } from 'src/app/demo/pages/form-elements/frm-validation/frm-validation.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EntregadoresDadosBancariosComponent } from './entregadores-dados-bancarios/entregadores-dados-bancarios.component';
import { EntregadoresStatusComponent } from './entregadores-status/entregadores-status.component';
import { EntregadoresAvaliacaoComponent } from './entregadores-avaliacao/entregadores-avaliacao.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    FrmValidationModule,
    MatDatepickerModule,
    MatNativeDateModule

  ],
  declarations: [EntregadoresFormComponent,EntregadoresAvaliacaoComponent,EntregadoresStatusComponent, EntregadoresDadosPessoaisComponent, EntregadoresVeiculosComponent, EntregadoresDadosBancariosComponent]
})
export class EntregadoresFormModule { }
