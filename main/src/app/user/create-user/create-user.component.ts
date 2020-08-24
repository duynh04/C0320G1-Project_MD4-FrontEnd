// B-Hoàng Long tạo
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {Rate} from '../../shared/models/rate';
import {User} from '../../shared/models/user';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  formAddUser: FormGroup;
  private newUser: User = {
    id: null,
    fullName: null,
    email: null,
    phoneNumber: null,
    address: null,
    birthday: null,
    idCard: null,
    gender: null,
    rate: null,
    point: null,
    lastLogin: null,
    status: null,
    reasonBan: null,
    isLocked: null,
    password: null,
    question: null,
    answer: null,
  };

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.formAddUser = this.formBuilder.group({
      fullName: ['', [Validators.required,Validators.pattern('^[A-Z]*[a-z]+(\\ [A-Z]*[a-z]+)$')]],
      email: ['', [Validators.required,Validators.pattern('^[a-z][a-z0-9_\.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,}){1,2}$')]],
      birthday: ['', [Validators.required,this.userService.validateBirthday]],
      address: ['', [Validators.required,Validators.maxLength(255)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^(090|091|([\(]84[\)][\+]90)|([\(]84[\)][\+]91))[0-9]{7}$')]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{9,10}$')]],
    });
  }

  addNewUser() {
    this.newUser.fullName = this.formAddUser.get('fullName').value
    this.newUser.email = this.formAddUser.get('email').value;
    this.newUser.birthday = this.formAddUser.get('birthday').value;
    this.newUser.address = this.formAddUser.get('address').value;
    this.newUser.idCard = this.formAddUser.get('idCard').value;
    this.newUser.isLocked=false;
    this.userService.addUser(this.newUser).subscribe(data => {

      this.router.navigateByUrl('/list-user');
    });
  }

  retype() {
    this.ngOnInit();
  }
}
