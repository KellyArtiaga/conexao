// import { IcDatepickerModule } from 'ic-datepicker';
import { ContratoEmpresasComponent } from './empresas/empresas-form/contrato-empresas/contrato-empresas.component';
import { OperadoresFormComponent } from './operadores/operadores-form/operadores-form.component';
import { DadosPessoaisComponent } from './usuarios/usuarios-form/dados-pessoais/dados-pessoais.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CadastroRoutingModule } from './cadastro-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresasFormComponent } from './empresas/empresas-form/empresas-form.component';
import { OperadorServicosComponent } from './operadores/operadores-form/operador-servicos/operador-servicos.component';
import { OperadoresComponent } from './operadores/operadores.component';
import { OperadorCadastroComponent } from './operadores/operadores-form/operador-cadastro/operador-cadastro.component';
import { OperadorResponsavelContratoComponent } from './operadores/operadores-form/operador-responsavel-contrato/operador-responsavel-contrato.component';
import { OperadorServicoModuloComponent } from './operadores/operadores-form/operador-servicos/operador-servico-modulo/operador-servico-modulo.component';
import { NgbCollapseModule, NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { EntregadoresComponent } from './entregadores/entregadores.component';
import { EntregadoresFormComponent } from './entregadores/entregadores-form/entregadores-form.component';
import { EntregadoresDadosPessoaisComponent } from './entregadores/entregadores-form/entregadores-dados-pessoais/entregadores-dados-pessoais.component';
import { EntregadoresVeiculosComponent } from './entregadores/entregadores-form/entregadores-veiculos/entregadores-veiculos.component';
import { EntregadoresVeiculosCadastroComponent } from './entregadores/entregadores-form/entregadores-veiculos/entregadores-veiculos-cadastro/entregadores-veiculos-cadastro.component';
import { EntregadoresDadosBancariosComponent } from './entregadores/entregadores-form/entregadores-dados-bancarios/entregadores-dados-bancarios.component'

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { FileUploadModule } from '@iplab/ngx-file-upload';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TextMaskModule } from 'angular2-text-mask';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { EmpresasDadosPessoaisComponent } from './empresas/empresas-form/empresas-dados-pessoais/empresas-dados-pessoais.component';
import { EmpresasPrimeiroAcessoComponent } from './empresas/empresas-form/empresas-primeiro-acesso/empresas-primeiro-acesso.component';
import { EmpresasServicoComponent } from './empresas/empresas-form/empresas-servico/empresas-servico.component';
import { EmpresasServicoModuloComponent } from './empresas/empresas-form/empresas-servico/empresas-servico-modulo/empresas-servico-modulo.component';
import { EmpresasServicoModuloPrecificacaoComponent } from './empresas/empresas-form/empresas-servico/empresas-servico-modulo/empresas-servico-modulo-precificacao/empresas-servico-modulo-precificacao.component';
import { EmpresasFiliaisComponent } from './empresas/empresas-form/empresas-filiais/empresas-filiais.component';
import { OperadorContratoComponent } from './operadores/operadores-form/operador-contrato/operador-contrato.component';
import { EmpresasContratoComponent } from './empresas/empresas-form/empresas-contrato/empresas-contrato.component';
import { SkillsComponent } from './skills/skills.component';
import { SkillsFormComponent } from './skills/skills-form/skills-form.component';

import { PhonePipe } from '../pipes/phonePipe.component';
import { PricePipe } from '../pipes/pricePipe.component';
import { SeparadorPipe } from '../pipes/separadorPipe.component';

import { CepDirective } from '../directives/cepDirective.directive';
import { FrmValidationModule } from '../pages/form-elements/frm-validation/frm-validation.module';
import { MatNativeDateModule } from '@angular/material/core';
import { OperadorStatusComponent } from './operadores/operadores-form/operador-status/operador-status/operador-status.component';
import { EmpresasStatusComponent } from './empresas/empresas-form/empresas-status/empresas-status.component';
import { UsuariosStatusComponent } from './usuarios/usuarios-form/usuarios-status/usuarios-status.component';
import { EntregadoresStatusComponent } from './entregadores/entregadores-form/entregadores-status/entregadores-status.component';
import { EntregadoresAvaliacaoComponent } from './entregadores/entregadores-form/entregadores-avaliacao/entregadores-avaliacao.component';

@NgModule({
    imports: [
        CommonModule,
        CadastroRoutingModule,
        SharedModule,
        NgbCollapseModule,
        NgbTabsetModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        FileUploadModule,
        PdfViewerModule,
        NgbDatepickerModule,
        TextMaskModule,
		    FrmValidationModule,

        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatSelectModule,
        MatIconModule,
        MatTabsModule,
        MatTableExporterModule,
        MatDatepickerModule,
        MatNativeDateModule,
    ],

    declarations: [
        OperadoresComponent,
        OperadorResponsavelContratoComponent,
        OperadorCadastroComponent,
        OperadorStatusComponent,
        OperadorServicoModuloComponent,
        OperadorServicosComponent,
        OperadorContratoComponent,
        EmpresasContratoComponent,
        OperadoresFormComponent,
        UsuariosComponent,
        UsuariosFormComponent,
        UsuariosStatusComponent,
        EntregadoresComponent,
        EntregadoresFormComponent,
        EntregadoresDadosPessoaisComponent,
        EntregadoresVeiculosComponent,
        EntregadoresStatusComponent,
        EntregadoresAvaliacaoComponent,
        EntregadoresVeiculosCadastroComponent,
        EntregadoresDadosBancariosComponent,
        DadosPessoaisComponent,
        EmpresasComponent,
        EmpresasFormComponent,
        ContratoEmpresasComponent,
        EmpresasDadosPessoaisComponent,
        EmpresasServicoComponent,
        EmpresasPrimeiroAcessoComponent,
        EmpresasServicoModuloPrecificacaoComponent,
        EmpresasServicoModuloComponent,
        EmpresasFiliaisComponent,
        EmpresasStatusComponent,
        PhonePipe,
        PricePipe,
        SeparadorPipe,
        CepDirective,
        SkillsComponent,
        SkillsFormComponent
      ],
      providers: [
        PricePipe
      ]

})
export class CadastroModule { }
