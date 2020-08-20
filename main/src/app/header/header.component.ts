import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../auth/token-storage.service';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email: string;

  constructor(
    private token: TokenStorageService,
    private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.email = window.sessionStorage.getItem('AuthUsername');
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
