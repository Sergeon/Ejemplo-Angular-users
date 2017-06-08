import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [UsersListComponent, UserCardComponent],
  exports: [UsersListComponent]
})
export class UsersModule { }
