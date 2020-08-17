//B-Hoàng Long tạo
import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/user';
import {UserService} from '../../shared/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lock-up-user',
  templateUrl: './lock-up-user.component.html',
  styleUrls: ['./lock-up-user.component.css']
})
export class LockUpUserComponent implements OnInit {

  private users;
  private usersLock: User[] = [];
  private user: User;
  public term: string;
  public p = 1;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userService.getAllUser().subscribe(data => this.users = data);
  }

  addUserNeedToLock(id) {
    this.userService.getUserByIdAndNeedToLock(id).subscribe(data => {
      this.user = data;
      this.usersLock.push(this.user);
    });
  }

  deleteUserLock(id: number) {
    this.userService.getUserByIdAndNeedToLock(id).subscribe(data => {
      this.user = data;
      this.deleteUserNotLock(id);
    });
  }

  deleteUserNotLock(id) {
    // tslint:disable-next-line:prefer-for-of
    for ( let i = 0; i < this.usersLock.length; i++ )  {
      // tslint:disable-next-line:triple-equals
      if (this.usersLock[i].id == id) {
        this.usersLock.splice(i, 1);
      }
      break;
    }
  }

}
