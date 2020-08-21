import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {UserDto} from '../../shared/models/dtos/userDto';
import {NOTIFICATION_USER} from '../../shared/validations/createUserValidator';
import {validPhoneNumber} from '../../shared/validations/custom-validators';

declare var $: any;
declare let Email: any;


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  constructor(private fb: FormBuilder, private  userService: UserService) {
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
    notificationEmail: null,
    notificationPhoneNumber: null,
  };
  messagesEmails: string[];
  messagesPhones: string[];
  registerForm: FormGroup;
  date: any;
  captchaCode: string;
  errors = NOTIFICATION_USER;
  test;
  authenticationFailed = '';




  ngOnInit() {
    this.date = new Date().toISOString().slice(0, 10);
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/)]],
      birthday: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, validPhoneNumber]],
      idCard: ['', [Validators.required, Validators.pattern(/(^[0-9]{9}$)|(^[0-9]{12}$)/)]],
      address: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\/\- ]+$/), Validators.maxLength(25)]],
      password: ['', [Validators.required, Validators.pattern(/(^[0-9A-Za-z]*$)/), Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      confirmCaptchaCode: ['', [Validators.required]],
    }, {validators: [checkBirthday, checkPassword, this.checkCaptchaCode.bind(this)]});
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
    // $('#myModal').modal({backdrop: 'static', keyboard: false});
    const cf = (document.getElementById('confirmRegistration') as HTMLInputElement).value;
    if (this.test.toString() === cf.toString()) {
      this.onSubmit();
    } else {
      this.authenticationFailed = 'Mã xác nhận không đúng! vui lòng nhập lại';
    }
  }

  onSubmit() {
    // @ts-ignore
    this.userService.createUser(this.registerForm.value).subscribe(
      // tslint:disable-next-line:max-line-length
      data => (this.messagesEmails = data.notificationEmail , this.messagesPhones = data.notificationPhoneNumber), error => console.log(error)
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
      // below code will not allow Repetition of Characters
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

  checkCheckBox() {
    const checkbox = document.getElementById('agree') as HTMLInputElement;
    if (checkbox.checked === true) {
      const element = document.getElementById('registration') as HTMLInputElement;
      element.disabled = false;
    } else {
      const element = document.getElementById('registration') as HTMLInputElement;
      element.disabled = true;
    }
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

function checkBirthday(formGroup: AbstractControl): ValidationErrors | null {
  const us: UserDto = formGroup.value;
  const birthday = new Date(us.birthday).getTime();
  const now = new Date().getTime();
  if (((now - birthday) / 365.25 / 24 / 60 / 60 / 1000) < 18) {
    return {checkBirthday: true};
  }
  return null;
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






