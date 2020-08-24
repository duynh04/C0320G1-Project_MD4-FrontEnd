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
  private reasonBan;
  private pageSize: number = 3;
  private lastPage: number;
  private page: number;
  private search: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    // this.userService.getAllUser().subscribe(data => this.users = data);
  }

  goPreviousPage() {
    if (this.page > 0) {
      this.page = this.page - 1;
      this.reloadData(this.page, this.pageSize, this.search);    }
  }

  goNextPage() {
    if (this.page < this.lastPage) {
      this.page = this.page + 1;
      this.reloadData(this.page, this.pageSize, this.search);
    }
  }

  addUserNeedToLock(id) {
    this.userService.getUserById(id).subscribe(data => {
      // @ts-ignore
      this.user = data;
      this.usersLock.push(this.user);
      console.log(this.usersLock);
    });
  }

  deleteUserLock(id: number) {
    console.log(id);
    for (let i = 0; i < this.usersLock.length; i++) {
      if (this.usersLock[i].id == id) {
        this.usersLock.splice(i, 1);
        break;
      }
    }
  }

  lockUpUser() {
    console.log(this.usersLock);
    for (let i = 0; i < this.usersLock.length; i++) {
      this.userService.getUserById(this.usersLock[i].id).subscribe(data => {
          // @ts-ignore
          this.user = data;
          this.user.isLocked = true;
          this.user.reasonBan = this.reasonBan;
          console.log(this.user);
          this.userService.lockUpUser(this.user, this.user.id).subscribe(data => {
            console.log(data)
          }, null);
        }
      )
    }
  }

  searchFullName() {
    this.reloadData(0, this.pageSize, this.search);
  }

  reloadData(page: number, pageSize: number, search: string) {
    return this.userService.search(page, pageSize, search).subscribe(data => {
      this.users = data.content;
      this.page = data.pageable.pageNumber;
      this.lastPage = data.totalPages
    })
  }
}
