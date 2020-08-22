import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.tokenStorageService.getJwtResponse();
    console.log(`Check user from storage`)
    if (currentUser) {
      // this.router.navigateByUrl("/auction/myAuction");
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/user/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

}
