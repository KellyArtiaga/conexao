import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavItemComponent } from './side-nav-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [SideNavItemComponent],
  declarations: [SideNavItemComponent]
})
export class SideNavItemModule { }
