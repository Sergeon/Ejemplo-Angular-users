import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsersListComponent],
  exports: [UsersListComponent]
})
export class UsersModule { }
