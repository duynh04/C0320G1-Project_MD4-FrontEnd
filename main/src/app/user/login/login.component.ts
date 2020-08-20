import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthLoginInfo} from '../../auth/login-info';
import {AuthJwtService} from '../../auth/auth-jwt.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userInfo: AuthLoginInfo;
  message = '';
  constructor(private auth: AuthJwtService, private fb: FormBuilder,
              private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, validateWhitespace ,
        Validators.pattern('^[a-z][a-z0-9_\\.]{2,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$')]],
      password: ['', [Validators.required]],
    });

    $('#togglePassword').click(() => {
      // tslint:disable-next-line:prefer-const
      let passwordFieldType = $('#password').attr('type');
      // tslint:disable-next-line:triple-equals
      if (passwordFieldType == 'password') {
      $('#password').prop('type', 'text');
      } else {
        $('#password').prop('type', 'password');
      }
    });
  }
  onSubmit() {
    this.submitted = true;
    this.userInfo = new AuthLoginInfo(this.femail.value, this.fpassword.value);
    this.login(this.userInfo);
  }

  get femail() {
    return this.loginForm.get('email');
  }
  get fpassword() {
    return this.loginForm.get('password');
  }
  public login(userInfo) {
    this.auth.attemptAuth(userInfo).subscribe(
      data => {
        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveToken(data.jwttoken);
        this.tokenStorage.saveUsername(data.accountName);
        this.tokenStorage.saveUserId(data.userId);
        // tslint:disable-next-line:triple-equals
        if (this.tokenStorage.getAuthorities().indexOf('ROLE_ADMIN') != -1) {
          this.router.navigateByUrl('/admin');
          // tslint:disable-next-line:triple-equals
        } else  if (this.tokenStorage.getAuthorities().indexOf('ROLE_USER') != -1) {
          this.router.navigateByUrl('/home');
        }
        console.log(this.tokenStorage.getAuthorities());
      },
      error => {
        console.log('Error ', error);
        this.message = 'Tài Khoản này không đúng hoặc đã bị khóa';
      }
    );

  }

}
function validateWhitespace(c: AbstractControl) {
  if (c.value !== '') {
    const isWhitespace = c.value.trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { whitespace: true };
  }
  return null;
}



