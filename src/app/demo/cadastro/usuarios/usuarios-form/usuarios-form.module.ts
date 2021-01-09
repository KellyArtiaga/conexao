
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { UsuariosStatusComponent } from './usuarios-status/usuarios-status.component';

@NgModule({
    declarations: [DadosPessoaisComponent, UsuariosStatusComponent],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        NgbTabsetModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,
        DadosPessoaisComponent,
        UsuariosStatusComponent,
        FormsModule,
        FileUploadModule]
})
export class UsuariosFormModule { }
