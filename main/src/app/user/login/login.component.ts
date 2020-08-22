import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLoginInfo } from '../../auth/login-info';
import { AuthJwtService } from '../../auth/auth-jwt.service';
import { TokenStorageService } from '../../auth/token-storage.service';
import { Router, ActivatedRoute, QueryParamsHandling } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted = false;
    userInfo: AuthLoginInfo;
    snapshotUrl: string;
    constructor(private auth: AuthJwtService,
        private fb: FormBuilder,
        private tokenStorageService: TokenStorageService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

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

        this.activatedRoute.queryParamMap.subscribe((queryParamMap) => {

            this.snapshotUrl = queryParamMap.get("returnUrl");

            this.auth.attemptAuth(userInfo).subscribe(
                data => {
                    console.log(data);
                    this.tokenStorageService.saveJwtResponse(data);

                    if (this.snapshotUrl != null) {
                        console.log(this.snapshotUrl);
                        this.router.navigateByUrl(this.snapshotUrl);
                    } else {
                        this.router.navigateByUrl("/");
                    }

                },
                error => {
                    console.log('Error ', error);
                }
            );
        })



    }

}
