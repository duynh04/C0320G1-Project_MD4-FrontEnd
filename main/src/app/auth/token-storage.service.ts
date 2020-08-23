import {Injectable} from '@angular/core';
import {JwtResponse} from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private readonly JWT_RESPONSE_KEY = 'JwtResponse';

  constructor() {
  }

  signOut() {
    window.localStorage.clear();
    window.sessionStorage.clear();
  }

  public getAuthorities(): string[] {
    const remember = window.localStorage.getItem('remember');
    const roles = [];
    if ((remember === 'true') && window.localStorage.getItem(this.JWT_RESPONSE_KEY)) {
      JSON.parse(window.localStorage.getItem(this.JWT_RESPONSE_KEY)).authorities.forEach(authority => {
        roles.push(authority.authority);
      });
    }
    if ((remember === 'false') && window.sessionStorage.getItem(this.JWT_RESPONSE_KEY)) {
      JSON.parse(window.sessionStorage.getItem(this.JWT_RESPONSE_KEY)).authorities.forEach(authority => {
        roles.push(authority.authority);
      });
    }
    return roles;
  }

  public saveJwtResponse(jwtResponse: JwtResponse, isRemember: boolean) {
    if (isRemember) {
      window.localStorage.setItem('remember', 'true');
      window.localStorage.removeItem(this.JWT_RESPONSE_KEY);
      window.localStorage.setItem(this.JWT_RESPONSE_KEY, JSON.stringify(jwtResponse));
    } else {
      window.localStorage.setItem('remember', 'false');
      window.sessionStorage.removeItem(this.JWT_RESPONSE_KEY);
      window.sessionStorage.setItem(this.JWT_RESPONSE_KEY, JSON.stringify(jwtResponse));
    }
  }

  public getJwtResponse(): JwtResponse {
    const remember = window.localStorage.getItem('remember');
    const localStorageToken = window.localStorage.getItem(this.JWT_RESPONSE_KEY);
    if (remember === 'true' && localStorageToken) {
      return JSON.parse(localStorageToken);
    }
    const sessionStorageToken = window.sessionStorage.getItem(this.JWT_RESPONSE_KEY);
    if (remember === 'false' && sessionStorageToken) {
      return JSON.parse(sessionStorageToken);
    }
  }
}
