import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {ResponseDTO} from "../../shared/models/dtos/ResponseDTO";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  recoverMailForm: FormGroup;
  recoverInfoForm: FormGroup;
  user: User;
  responseDTO: ResponseDTO;
  email: {
    email: string;
  };
  code: {
    code: string;
  };
  formEmailStatus = false;
  recoverCodeForm: FormGroup;
  formMessageStatus = true;
  formCodeStatus = true;
  messageFormEmail: string;
  messageFormInfo: string;
  classNameFormInfo: string;

  constructor(private userService: UserService,
              private  formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.recoverMailForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]]
      }
    );
    this.recoverCodeForm = this.formBuilder.group(
      {
        code: ['', [Validators.required]]
      }
    );
    this.recoverInfoForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^0[35789]\d{8}$/)]],
        question: ['', [Validators.required]],
        answer: ['', [Validators.required]]
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
    console.log(this.recoverCodeForm.value);
    this.formCodeStatus = true;
    this.formMessageStatus = false;
    this.code = this.recoverCodeForm.value;
    this.userService.sendCodeRecover(this.email, this.code).subscribe(data => {
        console.log('Gửi Code Thành Công');
      }
    );
  }

  sendInfoRecover() {
    console.log('Đang Gửi Info');
    this.user = this.recoverInfoForm.value;
    console.log(this.user);
    this.userService.sendInfoRecover(this.user).subscribe(data => {
      console.log('Gửi Info Thành Công');
      this.responseDTO = data;
      console.log(data);
      console.log(this.responseDTO);
    }, error => {
      this.responseDTO = error;
      console.log(error);
      console.log(this.responseDTO);
    });
  }
}
