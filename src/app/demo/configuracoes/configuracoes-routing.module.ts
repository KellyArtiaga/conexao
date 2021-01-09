import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'alterar-senha',
                component: AlterarSenhaComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfiguracoesRoutingModule { }
