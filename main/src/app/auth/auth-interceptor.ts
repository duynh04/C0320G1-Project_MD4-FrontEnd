import { Injectable } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpInterceptor } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorageService) { }

    // tslint:disable-next-line:typedef
    intercept(req, next) {
        let authReq = req;
        const token = this.token.getToken();
        if (token != null) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                },
            });
        }
        return next.handle(authReq);
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
