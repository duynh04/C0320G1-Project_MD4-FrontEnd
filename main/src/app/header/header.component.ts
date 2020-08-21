import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: string;
  cartCount: number;

  constructor(
    private token: TokenStorageService,
    private cartService: CartService,
    private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.email = window.sessionStorage.getItem('AuthUsername');
        const userId = this.token.getUserId();
        this.cartService.getCart(userId).subscribe(cart => {
          this.cartCount = cart.cartDetails.length;
        }, () => this.cartCount = 0);
      });
  }

  ngOnInit() {
    this.email = window.sessionStorage.getItem('AuthUsername');
  }

  logOut() {
    this.token.signOut();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

  logIn() {
    this.router.navigateByUrl('/user/login');
  }
}
