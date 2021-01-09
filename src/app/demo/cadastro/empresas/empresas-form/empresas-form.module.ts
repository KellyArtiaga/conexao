import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasFormComponent } from './empresas-form.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasDadosPessoaisComponent } from './empresas-dados-pessoais/empresas-dados-pessoais.component';
import { EmpresasPrimeiroAcessoComponent } from './empresas-primeiro-acesso/empresas-primeiro-acesso.component';
import { TextMaskModule } from 'angular2-text-mask';
import { EmpresasContratoComponent } from './empresas-contrato/empresas-contrato.component';


@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    NgbDatepickerModule
  ],
  declarations: [EmpresasFormComponent, EmpresasPrimeiroAcessoComponent, EmpresasContratoComponent]
})
export class EmpresasFormModule { }
