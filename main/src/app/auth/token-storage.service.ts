import { Injectable } from '@angular/core';
import { Authority, JwtResponse } from './jwt-response';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const USERID_KEY = 'AuthUserId';
const USER_KEY = 'AuthUser'
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private roles: Array<string> = [];

  constructor() {
  }
  signOut() {
    window.sessionStorage.clear();
  }
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  public saveAuthorities(authorities: Authority[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
    console.log(JSON.stringify(authorities))
  }

  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      console.log(JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)))
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach(authority => {
        // console.log(authority)
        this.roles.push(authority.authority);
      });
    }

    return this.roles;
  }

  public saveUser(user: JwtResponse) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): JwtResponse {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
