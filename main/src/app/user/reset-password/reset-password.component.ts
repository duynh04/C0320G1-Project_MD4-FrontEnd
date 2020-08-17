import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  recoverMailForm: FormGroup;
  recoverInfoForm: FormGroup;
  user: User;
  email: {
    email: string;
    code: string;
  };
  formEmailStatus = false;
  recoverCodeMailForm: FormGroup;
  formMessageStatus = true;
  formCodeStatus = true;

  constructor(private userService: UserService,
              private  formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.recoverMailForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]]
      }
    );
    this.recoverCodeMailForm = this.formBuilder.group(
      {
        code: ['', [Validators.required]]
      }
    );
    this.recoverInfoForm = this.formBuilder.group(
      {
        id: ['', [Validators.required]],
        fullname: ['', [Validators.required]],
        email: ['', [Validators.required]],
        phoneNumber: ['', [Validators.required]],
        address: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        idCard: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        rate: ['', [Validators.required]],
        point: ['', [Validators.required]],
        lastLogin: ['', [Validators.required]],
        status: ['', [Validators.required]],
        deliveryAddressList: ['', [Validators.required]],
        role: ['', [Validators.required]],
        passwordResetCode: ['', [Validators.required]],
        password: ['', [Validators.required]],
        question: ['', [Validators.required]],
        answer: ['', [Validators.required]],
        reasonBan: ['', [Validators.required]],
        isLocked: ['', [Validators.required]],
      }
    );
  }

  sendMailRecover() {
    console.log('Đang Gửi Email');
    console.log(this.recoverMailForm.value);
    this.formEmailStatus = true;
    this.formCodeStatus = false;
    this.email = this.recoverMailForm.value;
    this.userService.sendEmailRecover(this.email).subscribe(data => {
        console.log('Gửi Mail Thành Công');
      }
    );
  }

  sendCodeRecover() {
    console.log('Đang Gửi Code Recover');
    // console.log(this.recoverCodeMailForm.value);
    // this.formCodeStatus = true;
    // // this.formMessageStatus = false;
    // this.email.code = this.recoverCodeMailForm.value;
    // this.userService.sendCodeRecover(this.email).subscribe(data => {
    //     console.log('Gửi Code Thành Công');
    //   }
    // );
  }

  sendInfoRecover() {
    console.log('Đang Gửi Info');
    this.user = this.recoverInfoForm.value;
    console.log(this.user);
    this.userService.sendInfoRecover(this.user).subscribe(data => {
      console.log('Gửi Info Thành Công');
    });
  }

  onLoad() {
    return null;
  }
}
