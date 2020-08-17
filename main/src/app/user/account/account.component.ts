import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';
import {Account} from '../../shared/models/account';
import {Accountdto} from '../../shared/models/dtos/Accountdto';

declare let Email: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: Accountdto;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder,
              private  userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      numberPhone: ['', [Validators.required]],
      idCard: ['', [Validators.required]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      confirmCaptchaCode: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.userService.createAccount(this.registerForm.value).subscribe(
      () => {
        this.router.navigateByUrl('');
      }
    );
    this.sendEmail();
    alert('Thêm Thành Công');
  }

  sendEmail() {
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'mauminhka19@gmail.com',
      Password: 'F6CCB6D2D6FF8DB34FCB412A26F28353583D',
      To: 'mauminhka199@gmail.com',
      From: 'mauminhka19@gmail.com',
      Subject: 'test mail',
      // tslint:disable-next-line:max-line-length
      Body: '<i>This is sent as a feedback from my resume page.</i> <br/> <i>Link: http://http://localhost:4200/user/account</i><br><br> <b>~End of Message.~</b> '
    }).then(message => {
      alert(message);
    });
  }
}
