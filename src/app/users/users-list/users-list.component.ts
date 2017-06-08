import { Component, OnInit } from '@angular/core';
import { users } from './../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: any;
  constructor() { }

  ngOnInit() {
    this.users = users;
  }

}
