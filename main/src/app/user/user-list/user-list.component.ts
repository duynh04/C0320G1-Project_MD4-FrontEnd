import {Component, OnInit} from '@angular/core';
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";

import {User} from "../../shared/models/user";
import {Observable} from "rxjs";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']

})
export class UserListComponent implements OnInit {
  // newUser: any = {};
  addForm: FormGroup;

  rows: FormArray;
  itemForm: FormGroup;
  users: User[] = [];
  userList: Observable<User[]>;
  user: User;
  i: any;
  enableEdit = false;
  enableEditIndex = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {
    this.addForm = this.fb.group()
  }

  // dynamicArray: Observable<User> = [];
  // newDynamic: any = {};


  ngOnInit() {
    this.userService.getUserList().subscribe(data => {
      this.users = data
    });
  }


  // addRow(index) {
  //   this.newUser = {fullname: "", address: "", rate: "", email: "", phoneNumber: "", lastLogin: "", point: ""};
  //   this.users.push(this.newUser);
  //
  //   // this.user = new User();
  //   // this.gotoList();
  //   return true;
  // }

  // deleteRow(index) {
  //   // if(this.dynamicArray.length ==1) {
  //   //   // this.toastr.error("Can't delete the row when there is only one row", 'Warning');
  //   //   return false;
  //   // } else {
  //   this.users.splice(index, 1);
  //   // this.toastr.warning('Row deleted successfully', 'Delete row');
  //   // return true;
  // }

  enableEditMethod(e, i) {
    this.enableEdit = true;
    this.enableEditIndex = i;
    console.log(i, e);
  }

//   saveUser() {
// this.userService.updateUser(this.id,this.user)
//   .subscribe(data => console.log(data), error => console.log(error));
//     this.user = new User();
//
//   }

}
