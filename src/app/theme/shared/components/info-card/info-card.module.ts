import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoCardComponent } from './info-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [InfoCardComponent],
  exports: [InfoCardComponent],
  providers: [/*AnimationService*/]
})
export class InfoCardModule { }
