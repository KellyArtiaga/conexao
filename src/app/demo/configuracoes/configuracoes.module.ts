import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbCollapseModule, NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfiguracoesRoutingModule } from './configuracoes-routing.module';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    imports: [
        CommonModule,
        ConfiguracoesRoutingModule,
        SharedModule,
        NgbCollapseModule,
        NgbTabsetModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule,

        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatSelectModule,
        MatIconModule,
        MatDialogModule,
        MatTooltipModule
    ],

    declarations: [AlterarSenhaComponent]
})
export class ConfiguracoesModule { }
