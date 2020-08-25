import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {UserDto} from '../../shared/models/dtos/userDto';
import {NOTIFICATION_USER} from '../../shared/validations/createUserValidator';
import {validPhoneNumber} from '../../shared/validations/custom-validators';
import {checkBirthday} from '../../shared/validations/validatorBirthday';
import {uniqueEmail} from '../../shared/validations/uniqueEmail';
import {uniquePhoneNumber} from '../../shared/validations/uniquePhoneNumber';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthJwtService} from '../../auth/auth-jwt.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {AuthLoginInfo} from '../../auth/login-info';
declare var $: any;
declare let Email: any;

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.css']
})
export class RegistrationUserComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private  userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private auth: AuthJwtService) {
  }

  user: UserDto = {
    id: null,
    fullName: null,
    email: null,
    birthday: null,
    password: null,
    confirmPassword: null,
    idCard: null,
    gender: null,
    phoneNumber: null,
    address: null,
    question: null,
    answer: null,
    confirmCaptchaCode: null,
  };
  registerForm: FormGroup;
  date: any;
  captchaCode: string;
  errors = NOTIFICATION_USER;
  test;
  authenticationFailed = '';
  isRemember: boolean;
  userInfo: AuthLoginInfo;

  ngOnInit() {
    this.date = new Date().toISOString().slice(0, 10);
    this.registerForm = this.fb.group({
      // tslint:disable-next-line:max-line-length
      fullName: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/)]],
      gender: ['', [Validators.required]],
      // tslint:disable-next-line:max-line-length
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/)], [uniqueEmail(this.userService)]],
      birthday: ['', [Validators.required, checkBirthday]],
      phoneNumber: ['', [Validators.required, validPhoneNumber], [uniquePhoneNumber(this.userService)]],
      idCard: ['', [Validators.required, Validators.pattern(/(^[0-9]{9}$)|(^[0-9]{12}$)/)]],
      // tslint:disable-next-line:max-line-length
      address: ['', [Validators.required, Validators.pattern(/^[ a-zA-Z0-9_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      confirmCaptchaCode: ['', [Validators.required]],
    }, {validators: [ checkPassword, this.checkCaptchaCode.bind(this)]});
  }

  sendEmail() {
    const numberConfirm = Math.floor(Math.random() * (900000)) + 100000;
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'mauminhka19@gmail.com',
      Password: 'F6CCB6D2D6FF8DB34FCB412A26F28353583D',
      To: this.registerForm.value.email,
      From: 'mauminhka19@gmail.com',
      Subject: 'Xác nhận đăng ký thành viên',
      Body: '<h3>mã xác nhận của bạn là: </h3>' + numberConfirm
    });
    this.test = numberConfirm;
  }
  confirmRegistration() {
    const cf = (document.getElementById('confirmRegistration') as HTMLInputElement).value;
    if (this.test.toString() === cf.toString()) {
      this.onSubmit();
      $('#myModal').modal('hide');
      this.login(this.userInfo);
    } else {
      this.authenticationFailed = 'Mã xác nhận không đúng! vui lòng nhập lại';
    }
  }
  onSubmit() {
    this.userService.createUser(this.registerForm.value)
      .subscribe(data => console.log(data), error => console.log(error));
  }
  public login(userInfo) {
    this.auth.attemptAuth(userInfo).subscribe(
      data => {
        this.tokenStorage.saveJwtResponse(data, this.isRemember);
      }, () => {
        this.activatedRoute.queryParamMap.subscribe(value => {
          const returnUrl = value.get('returnUrl');
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
          } else {
            this.router.navigateByUrl('/');
          }
        });
      }
    );
  }

  createCaptcha() {
    document.getElementById('captcha').innerHTML = '';
    // tslint:disable-next-line:prefer-const
    let charsArray =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@';
    const lengthOtp = 5;
    const captcha = [];
    for (let i = 0; i < lengthOtp; i++) {
      const index = Math.floor(Math.random() * charsArray.length + 1); // get the next character from the array
      if (captcha.indexOf(charsArray[index]) === -1) {
        captcha.push(charsArray[index]);
      } else {
        i--;
      }
    }
    const canv = document.createElement('canvas');
    canv.id = 'captcha';
    canv.width = 100;
    canv.height = 40;
    const ctx = canv.getContext('2d');
    ctx.font = '25px Georgia';
    ctx.strokeText(captcha.join(''), 0, 30);
    // storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.captchaCode = captcha.join('');
    document.getElementById('captcha').appendChild(canv); // adds the canvas to the body element
  }

  checkCaptchaCode(formGroup: AbstractControl): ValidationErrors | null {
    const cap: UserDto = formGroup.value;
    const confirm = cap.confirmCaptchaCode;
    if (confirm !== this.captchaCode) {
      return {checkCaptchaCode: true};
    }
    return null;
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get birthday() {
    return this.registerForm.get('birthday');
  }

  get phoneNumber() {
    return this.registerForm.get('phoneNumber');
  }

  get idCard() {
    return this.registerForm.get('idCard');
  }

  get address() {
    return this.registerForm.get('address');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get question() {
    return this.registerForm.get('question');
  }

  get answer() {
    return this.registerForm.get('answer');
  }

  get confirmCaptchaCode() {
    return this.registerForm.get('confirmCaptchaCode');
  }


}

function checkPassword(formGroup: AbstractControl): ValidationErrors | null {
  const pass: UserDto = formGroup.value;
  const password = pass.password;
  const confirmPassword = pass.confirmPassword;
  if (password !== confirmPassword) {
    return {checkPassword: true};
  }
  return null;
}







