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
  loadingStatus = true;
  recoverCodeForm: FormGroup;
  formCodeStatus = true;
  messageFormEmail: string;
  messageFormInfo: string;
  classNameFormEmail: string;
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
        code: ['', [Validators.required ,Validators.pattern(/^[0-9]{6}\b$/)]]
      }
    );
    this.recoverInfoForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+84|0)+([0-9]{9})\b$/)]],
        question: ['', [Validators.required]],
        answer: ['', [Validators.required]]
      }
    );
  }
  sendMailRecover() {
    console.log('Đang Gửi Email');
    console.log(this.recoverMailForm.value);
    this.loadingStatus = false;
    this.email = this.recoverMailForm.value;
    this.userService.sendEmailRecover(this.email).subscribe(data => {
      console.log('Gửi Email Thành Công');
      this.loadingStatus = true;
      this.responseDTO = data;
      this.formEmailStatus = true;
      this.formCodeStatus = false;
      this.messageFormEmail = this.responseDTO.message;
      this.classNameFormEmail = "alert alert-success";
      console.log(data);
      console.log(this.responseDTO);
    }, error => {
      this.loadingStatus = true;
      this.responseDTO = error;
      if (this.responseDTO.status == "0") {
        this.messageFormEmail = "Lỗi kết nối, vui lòng kiểm tra lại đường truyền của bạn!";
      } else {
        this.messageFormEmail = this.responseDTO.error.message;
      }
      this.classNameFormEmail = "alert alert-danger";
      console.log(this.responseDTO);
    });
  }

  sendCodeRecover() {
    console.log('Đang Gửi Code Recover');
    console.log(this.recoverCodeForm.value);
    this.loadingStatus = false;
    this.code = this.recoverCodeForm.value;
    this.userService.sendCodeRecover(this.email, this.code).subscribe(data => {
      console.log('Gửi Code Thành Công');
      this.loadingStatus = true;
      this.responseDTO = data;
      this.formCodeStatus = true;
      this.messageFormEmail = this.responseDTO.message;
      this.classNameFormEmail = "alert alert-success";
      console.log(data);
      console.log(this.responseDTO);
    }, error => {
      this.loadingStatus = true;
      this.responseDTO = error;
      if (this.responseDTO.status == "0") {
        this.messageFormEmail = "Lỗi kết nối, vui lòng kiểm tra lại đường truyền của bạn!";
      } else {
        this.messageFormEmail = this.responseDTO.error.message;
      }
      this.classNameFormEmail = "alert alert-danger";
      console.log(this.responseDTO);
    });
  }

  sendInfoRecover() {
    console.log('Đang Gửi Info');
    this.loadingStatus = false;
    this.user = this.recoverInfoForm.value;
    console.log(this.user);
    this.userService.sendInfoRecover(this.user).subscribe(data => {
      console.log('Gửi Info Thành Công');
      this.loadingStatus = true;
      this.responseDTO = data;
      this.messageFormInfo = this.responseDTO.message;
      this.classNameFormInfo = "alert alert-success";
      console.log(data);
      console.log(this.responseDTO);
    }, error => {
      this.loadingStatus = true;
      this.responseDTO = error;
      if (this.responseDTO.status == "0") {
        this.messageFormInfo = "Lỗi kết nối, vui lòng kiểm tra lại đường truyền của bạn!";
      } else {
        this.messageFormInfo = this.responseDTO.error.message;
      }
      this.classNameFormInfo = "alert alert-danger";
      console.log(this.responseDTO);
      console.log(error.error.status)
    });
  }
}
