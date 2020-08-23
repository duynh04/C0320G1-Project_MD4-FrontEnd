import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthLoginInfo} from '../../auth/login-info';
import {AuthJwtService} from '../../auth/auth-jwt.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  private formLoginAdmin: FormGroup;
  // submitted = false;
  // userInfo: AuthLoginInfo;

  constructor(
    public formBuilder: FormBuilder,
    // private auth: AuthJwtService,
    // private tokenStorage: TokenStorageService,
    // private router: Router
  ) {
  }

  ngOnInit() {
    // Thành Long
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    togglePassword.addEventListener('click', function() {
      const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
      password.setAttribute('type', type);
      this.classList.toggle('fa-eye-slash');
    });

    this.formLoginAdmin = this.formBuilder.group({
      account: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9]{6,16}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*\\d)[0-9a-zA-Z]{6,}$')]]
    });
  }

  // onSubmit() {
  //   this.submitted = true;
  //   this.userInfo = new AuthLoginInfo(this.fusername.value, this.fpassword.value);
  //   this.login(this.userInfo);
  // }

  // get fusername() {
  //   return this.formLoginAdmin.get('username');
  // }
  //
  // get fpassword() {
  //   return this.formLoginAdmin.get('password');
  // }

  // public login(userInfo) {
  //   console.log(userInfo);
  //   this.auth.attemptAuth(userInfo).subscribe(
  //     data => {
  //
  //       this.tokenStorage.saveAuthorities(data.authorities);
  //       this.tokenStorage.saveToken(data.token);
  //       this.tokenStorage.saveUsername(data.accountName);
  //       // tslint:disable-next-line:triple-equals
  //       if (this.tokenStorage.getAuthorities().indexOf('ROLE_ADMIN') != -1) {
  //         this.router.navigateByUrl('admin/product-list');
  //       }
  //       console.log(this.tokenStorage.getAuthorities());
  //     },
  //     error => {
  //       console.log('Error ', error);
  //     }
  //   );
  //
  // }

}
