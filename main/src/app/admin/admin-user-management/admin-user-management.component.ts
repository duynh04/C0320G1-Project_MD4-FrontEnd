import { UserSearchField } from './../../shared/models/dtos/user-search-field';
import { UserListDTO } from './../../shared/models/dtos/user-list-dto';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AdminService } from 'src/app/shared/services/admin.service';
import { tap, map } from 'rxjs/operators';


@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {

  user: User[];
  userList$: Observable<UserListDTO[]>;
  lastPage: number;

  currentPage: number;
  pageSize : number;
  totalElements : number;
  isEmpty : boolean = false;
  stt: number[];

  createForm: FormGroup;
  private searchField: UserSearchField = {} as UserSearchField;

  constructor(
    private adminService: AdminService,
    private router: Router) { }

  ngOnInit() {
    this.getAllUser();
    this.searchField.page = 1;
    this.reloadData(this.searchField);
    this.createForm = new FormGroup({
      id: new FormControl(''),
      address: new FormControl(''),
      fullname: new FormControl(''),
      email: new FormControl(''),
      rate: new FormControl(''),
    });
  }

  search() {
   const searchField = this.createForm.value as UserSearchField;
   searchField.page = 1;
  this.reloadData(searchField);
  }


  getAllUser(){
    this.adminService.getAllUser().subscribe(
      (data: User[]) => this.user = data
    )
  }


  reloadData(searchField: UserSearchField) {
    this.userList$ = this.adminService.getOnePage(searchField).pipe(
      tap(res => {
        console.log(res)
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = searchField.page;

        this.stt = [];
        let firstIndex = this.pageSize*(this.currentPage - 1) + 1;
        let lastIndeex = this.pageSize*this.currentPage;
        for (let i = firstIndex; i <= lastIndeex; i++) {
          this.stt.push(i);
        }

        this.isEmpty = false;
        if (res.content.length == 0) {
          this.isEmpty = true;
        }
      },error => {
        console.log(error);
        console.log("vào được err của tap");
      }),
      map(res => res.content)
    );
  }
  // // pagination
  // goFirstPage() {
  //   this.reloadData(1);
  // }

  // goPreviousPage() {
  //   console.log(this.currentPage);
  //   if (this.currentPage > 1) {
  //     return this.reloadData(this.currentPage - 1);
  //   }
  // }

  // goNextPage() {
  //   console.log(this.currentPage);
  //   if (this.currentPage < this.lastPage) {
  //     return this.reloadData(this.currentPage + 1);
  //   }
  // }

  // goLastPage() {
  //   this.reloadData(this.lastPage);
  // }
}
