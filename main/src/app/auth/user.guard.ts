import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from './token-storage.service';
@Injectable({providedIn: 'root'})
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: TokenStorageService
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.getJwtResponse().accountName;
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['user/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }
}
