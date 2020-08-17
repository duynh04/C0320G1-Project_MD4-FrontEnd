// B-Hoàng Long tạo
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {Rate} from '../../shared/models/rate';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formAddUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.formAddUser = this.formBuilder.group({
      id: [''],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      idCard: ['', [Validators.required]],
      gender: [''],
      rate: [''],
      lastLogin: [''],
      status: [''],
    });
  }

  addNewUser() {
    this.userService.addUser(this.formAddUser.value).subscribe(data => {
      this.router.navigateByUrl('/list-user');
    });
  }
}
