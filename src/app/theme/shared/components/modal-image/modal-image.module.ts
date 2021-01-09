import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { SharedModule } from '../../shared.module';
import { ModalImageComponent } from './modal-image.component';

@NgModule({
  declarations: [ModalImageComponent],
  imports: [
    CommonModule,
    SharedModule,
    PdfViewerModule,
    MatDialogModule
  ]
})
export class ModalImageModule { }
