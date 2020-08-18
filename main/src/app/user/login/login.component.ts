import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthLoginInfo} from '../../auth/login-info';
import {AuthJwtService} from '../../auth/auth-jwt.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  userInfo: AuthLoginInfo;
  constructor(private auth: AuthJwtService, private fb: FormBuilder,
              private tokenStorage: TokenStorageService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    this.submitted = true;
    this.userInfo = new AuthLoginInfo(this.fusername.value, this.fpassword.value);
    this.login(this.userInfo);
  }

  get fusername() {
    return this.loginForm.get('username');
  }
  get fpassword() {
    return this.loginForm.get('password');
  }
  public login(userInfo) {
    console.log(userInfo) ;
    this.auth.attemptAuth(userInfo).subscribe(
      data => {

        this.tokenStorage.saveAuthorities(data.authorities);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.accountName);
        // tslint:disable-next-line:triple-equals
        if (this.tokenStorage.getAuthorities().indexOf('ROLE_ADMIN') != -1) {
          this.router.navigateByUrl('/user/cart');
        }
        console.log(this.tokenStorage.getAuthorities());
      },
      error => {
        console.log('Error ', error);
      }
    );

  }

}
