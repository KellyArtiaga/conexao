import { EmpresasDadosPessoaisComponent } from './empresas-form/empresas-dados-pessoais/empresas-dados-pessoais.component';
import { EmpresasFormComponent } from './empresas-form/empresas-form.component';
import { EmpresasServicoComponent } from './empresas-form/empresas-servico/empresas-servico.component';
import { EmpresasServicoModuloComponent } from './empresas-form/empresas-servico/empresas-servico-modulo/empresas-servico-modulo.component';
import { EmpresasServicoModuloPrecificacaoComponent } from './empresas-form/empresas-servico/empresas-servico-modulo/empresas-servico-modulo-precificacao/empresas-servico-modulo-precificacao.component';
import { EmpresasFiliaisComponent } from './empresas-form/empresas-filiais/empresas-filiais.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from './empresas.component';
import { TextMaskModule } from 'angular2-text-mask';

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ContratoEmpresasComponent } from './empresas-form/contrato-empresas/contrato-empresas.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasPrimeiroAcessoComponent } from './empresas-form/empresas-primeiro-acesso/empresas-primeiro-acesso.component';
import { EmpresasStatusComponent } from './empresas-form/empresas-status/empresas-status.component';

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
    NgbDatepickerModule,
    TextMaskModule
  ],
  declarations: [EmpresasComponent, EmpresasServicoComponent, EmpresasServicoModuloPrecificacaoComponent, EmpresasServicoModuloComponent, EmpresasFiliaisComponent, EmpresasFormComponent, ContratoEmpresasComponent, EmpresasDadosPessoaisComponent, EmpresasPrimeiroAcessoComponent, EmpresasStatusComponent]
})
export class EmpresasModule { }
