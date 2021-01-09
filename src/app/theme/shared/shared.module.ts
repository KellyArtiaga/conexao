import { ClickWaitDirective } from './../../demo/helpers/click-wait.directive';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertModule, BreadcrumbModule, CardModule, InfoCardModule, SkillSelectorModule, ScrollBehaviourModule, SideNavModule, SideNavItemModule, FilterModule } from './components';
import { DataFilterPipe } from './components/data-table/data-filter.pipe';
import { TodoListRemoveDirective } from './components/todo/todo-list-remove.directive';
import { TodoCardCompleteDirective } from './components/todo/todo-card-complete.directive';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';
import { SpinnerComponent } from './components/spinner/spinner.component';

import 'hammerjs';
import 'mousetrap';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import { ModalConfirmationComponent } from './components/modal-confirmation/modal-confirmation.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ContratoFileComponent } from './components/contrato-file/contrato-file.component';
import { ModalImageComponent } from './components/modal-image/modal-image.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};//

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    GalleryModule.forRoot(),
    ClickOutsideModule,
    SkillSelectorModule,
    ScrollBehaviourModule,
    SideNavItemModule,
    SideNavModule,
    FilterModule,
    MatDialogModule,
    MatButtonModule,
    InfoCardModule,
    PdfViewerModule
  ],
  exports: [
    CommonModule,
    PerfectScrollbarModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    CardModule,
    SkillSelectorModule,
    ScrollBehaviourModule,
    SideNavItemModule,
    SideNavModule,
    FilterModule,
    InfoCardModule,
    BreadcrumbModule,
    GalleryModule,
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    ClickWaitDirective,
    ClickOutsideModule,
    SpinnerComponent,
    ContratoFileComponent,
  ],
  declarations: [
    DataFilterPipe,
    TodoListRemoveDirective,
    TodoCardCompleteDirective,
    SpinnerComponent,
    ModalConfirmationComponent,
    ModalImageComponent,
    ClickWaitDirective,
    ContratoFileComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class SharedModule { }
