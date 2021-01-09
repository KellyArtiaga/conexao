import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsFormComponent } from './skills-form.component'

import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbTabsetModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TextMaskModule } from 'angular2-text-mask'
import { FrmValidationModule } from 'src/app/demo/pages/form-elements/frm-validation/frm-validation.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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
    TextMaskModule,
    FrmValidationModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [SkillsFormComponent]
})
export class SkillsFormMOdule { }
