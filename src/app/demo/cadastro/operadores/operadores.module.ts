import { OperadoresFormComponent } from './operadores-form/operadores-form.component';
import { SharedModule } from '../../../theme/shared/shared.module';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatDialogModule } from '@angular/material/dialog';
import { FrmMaskingComponent } from '../../pages/form-elements/frm-masking/frm-masking.component';
import { FrmValidationModule } from '../../pages/form-elements/frm-validation/frm-validation.module';
import { MatNativeDateModule } from '@angular/material/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { FileUploadModule } from '@iplab/ngx-file-upload';

@NgModule({
  declarations: [OperadoresFormComponent],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    NgbTabsetModule,
    NgbDropdownModule,
    FormsModule,
    FrmMaskingComponent,
    FrmValidationModule,
    PdfViewerModule,
    FileUploadModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]
})
export class OperadoresModule { }
