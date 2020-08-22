import { Injectable } from '@angular/core';
import { Authority, JwtResponse } from './jwt-response';


const JWTRESPONSE_KEY = "JwtResponse";
@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    private roles: Array<string> = [];

    constructor() {
    }
    signOut() {
        window.localStorage.clear();
    }

    public getAuthorities(): string[] {
        this.roles = [];

        if (window.localStorage.getItem(JWTRESPONSE_KEY)) {
            JSON.parse(window.localStorage.getItem(JWTRESPONSE_KEY)).authorities.forEach(authority => {
                this.roles.push(authority.authority);
            });
        }

        return this.roles;
    }

    public saveJwtResponse(jwtResponse: JwtResponse) {
        window.localStorage.removeItem(JWTRESPONSE_KEY);
        window.localStorage.setItem(JWTRESPONSE_KEY, JSON.stringify(jwtResponse));
    }

    public getJwtResponse(): JwtResponse {
        return JSON.parse(window.localStorage.getItem(JWTRESPONSE_KEY));
    }
}
