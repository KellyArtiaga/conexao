import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OperadoresComponent } from './operadores/operadores.component';
import { OperadoresFormComponent } from './operadores/operadores-form/operadores-form.component';
import { OperadorServicoModuloComponent } from './operadores/operadores-form/operador-servicos/operador-servico-modulo/operador-servico-modulo.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';

import { EntregadoresComponent } from './entregadores/entregadores.component';
import { EntregadoresFormComponent } from './entregadores/entregadores-form/entregadores-form.component';
import { EntregadoresVeiculosCadastroComponent } from './entregadores/entregadores-form/entregadores-veiculos/entregadores-veiculos-cadastro/entregadores-veiculos-cadastro.component';

import { EmpresasComponent } from './empresas/empresas.component';
import { EmpresasFormComponent } from './empresas/empresas-form/empresas-form.component';
import { EmpresasServicoModuloComponent } from './empresas/empresas-form/empresas-servico/empresas-servico-modulo/empresas-servico-modulo.component';
import { EmpresasServicoModuloPrecificacaoComponent } from './empresas/empresas-form/empresas-servico/empresas-servico-modulo/empresas-servico-modulo-precificacao/empresas-servico-modulo-precificacao.component';

import { SkillsComponent } from './skills/skills.component';
import { SkillsFormComponent } from './skills/skills-form/skills-form.component';

import { AuthGuardService } from '../../../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'usuarios',
                component: UsuariosComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'usuarios/novo',
                component: UsuariosFormComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'usuarios/editar/:id',
                component: UsuariosFormComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'operadores',
                component: OperadoresComponent,
                canActivate: [AuthGuardService]
            },
            {
              path: 'operadores/novo',
              component: OperadoresFormComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'operadores/editar/:operadorId/modulos/novo',
              component: OperadorServicoModuloComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'operadores/editar/:operadorId/modulos/editar/:id',
              component: OperadorServicoModuloComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'operadores/editar/:id',
              component: OperadoresFormComponent,
              canActivate: [AuthGuardService]
            },
            {
                path: 'empresas',
                component: EmpresasComponent,
                canActivate: [AuthGuardService]
            },
            {
              path: 'empresas/novo',
              component: EmpresasFormComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'entregadores/teste',
              component: EntregadoresFormComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'empresas/editar/:id',
              component: EmpresasFormComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'empresas/editar/:empresaId/modulos/novo',
              component: EmpresasServicoModuloComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'empresas/editar/:empresaId/modulos/editar/:id',
              component: EmpresasServicoModuloComponent,
              canActivate: [AuthGuardService]
            },
            {
                path: 'entregadores',
                component: EntregadoresComponent,
                canActivate: [AuthGuardService]
            },
            {
              path: 'entregadores/novo',
              component: EntregadoresFormComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'entregadores/editar/:id',
              component: EntregadoresFormComponent,
              canActivate: [AuthGuardService]
            },

            {
              path: 'entregadores/editar/:id/veiculos/novo',
              component: EntregadoresVeiculosCadastroComponent,
              canActivate: [AuthGuardService]
            },

            {
              path: 'entregadores/editar/:id/veiculos/editar/:veiculoId',
              component: EntregadoresVeiculosCadastroComponent,
              canActivate: [AuthGuardService]
            },

            {
              path: 'skills',
              component: SkillsComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'skills/novo',
              component: SkillsFormComponent,
              canActivate: [AuthGuardService]
            },
            {
              path: 'skills/editar/:id',
              component: SkillsFormComponent,
              canActivate: [AuthGuardService]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CadastroRoutingModule { }
