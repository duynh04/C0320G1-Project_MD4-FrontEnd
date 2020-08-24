import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url = state.url;
    return this.checkStep(url);
  }

  checkStep(url): Promise<boolean | UrlTree> | boolean {
    let result: boolean;
    switch (url) {
      case '/payment/order':
        result = this.router.navigated && this.router.isActive('/payment/option', true);
        if (!result) {
          return this.router.navigate(['/payment']);
        }
        break;
      case '/payment/option':
        result = this.router.navigated && this.router.isActive('/payment', true);
        if (!result) {
          return this.router.navigate(['/payment']);
        }
        break;
      default:
        result = this.router.navigated && this.router.isActive('/user/cart', true);
        if (!result) {
          return this.router.navigate(['/user/cart']);
        }
    }
    return result;
  }
}
