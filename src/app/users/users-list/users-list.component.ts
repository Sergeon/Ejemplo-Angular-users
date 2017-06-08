import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { users } from './../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[];
  constructor() { }

  ngOnInit() {
    this.users = users.map( user => ({
      username: user.login,
      site: user.html_url,
      avatar: user.avatar_url,
      isAdmin: user.site_admin
    }) );
  }

}
