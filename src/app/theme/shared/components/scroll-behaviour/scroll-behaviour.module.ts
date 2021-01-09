import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollBehaviourComponent} from './scroll-behaviour.component';
import { NgxLoadingSpinnerModule } from 'ng-loading-spinner';

@NgModule({
  declarations: [ScrollBehaviourComponent],
  exports:[ScrollBehaviourComponent],
  imports: [
    CommonModule,
  ],

})
export class ScrollBehaviourModule { }
