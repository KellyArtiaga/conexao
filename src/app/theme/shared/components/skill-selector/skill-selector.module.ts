import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillSelectorComponent} from './skill-selector.component';

@NgModule({
  declarations: [SkillSelectorComponent],
  exports:[SkillSelectorComponent],
  imports: [
    CommonModule,
  ],

})
export class SkillSelectorModule { }
