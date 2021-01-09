import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextMaskModule } from 'angular2-text-mask';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EntregadoresComponent } from './entregadores.component';
import { EntregadoresFormComponent } from './entregadores-form/entregadores-form.component';
import { EntregadoresDadosPessoaisComponent } from './entregadores-form/entregadores-dados-pessoais/entregadores-dados-pessoais.component';
import { EntregadoresVeiculosComponent } from './entregadores-form/entregadores-veiculos/entregadores-veiculos.component';
import { EntregadoresDadosBancariosComponent } from './entregadores-form/entregadores-dados-bancarios/entregadores-dados-bancarios.component'
import { EntregadoresStatusComponent } from './entregadores-form/entregadores-status/entregadores-status.component'; 
import { EntregadoresAvaliacaoComponent } from './entregadores-form/entregadores-avaliacao/entregadores-avaliacao.component'; 

@NgModule({
  declarations: [ EntregadoresComponent, EntregadoresAvaliacaoComponent , EntregadoresDadosBancariosComponent, EntregadoresStatusComponent, EntregadoresVeiculosComponent, EntregadoresDadosPessoaisComponent, EntregadoresFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbTabsetModule,
    NgbDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    TextMaskModule
  ]
})
export class EntregadoresModule { }
