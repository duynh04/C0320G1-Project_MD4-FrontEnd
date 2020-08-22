import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from './token-storage.service';

@Injectable({providedIn: 'root'})
export class AdminGuard implements CanActivate {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenStorageService.getJwtResponse();
    if (currentUser) {
      if (this.tokenStorageService.getAuthorities().indexOf('ROLE_ADMIN') !== -1 ) {
        return true;
      } else {
        this.router.navigateByUrl('/');
        return false;
      }
      // logged in so return true
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/user/login'], {queryParams: {returnUrl: state.url}});
    return false;
  }

}
