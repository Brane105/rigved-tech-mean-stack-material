import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  constructor(private service: UserService, private _router : Router) { }

  ngOnInit(): void {
  }
  id: FormControl = new FormControl('');
  deleteUser() {
    this.service.delete(this.id.value);
    this._router.navigate(["usersList"]);
  }
}
