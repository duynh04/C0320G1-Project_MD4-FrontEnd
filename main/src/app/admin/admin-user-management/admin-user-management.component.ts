import { UserSearchField } from './../../shared/models/dtos/user-search-field';
import { UserListDTO } from './../../shared/models/dtos/user-list-dto';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormArray, FormBuilder} from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AdminService } from 'src/app/shared/services/admin.service';
import { tap, map } from 'rxjs/operators';
import {Rate} from "../../shared/models/rate";


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

  //creator: Nguyễn Hữu Hậu
  users: User[] = [];
  addForm: FormGroup;
  addUser: FormArray;
  editField: string;
  rateId: number;

  constructor(
    private adminService: AdminService,
    private router: Router,private fb: FormBuilder) {
    this.addForm = this.fb.group({
      items: [null],
      items_value: ['no']
    });
    this.addUser = this.fb.array([]);
  }

  ngOnInit() {
    this.addForm.addControl('rows', this.addUser);
    this.getAllUser();
    this.reloadData(1);
    this.createForm = new FormGroup({
      id: new FormControl(''),
      address: new FormControl(''),
      fullname: new FormControl(''),
      email: new FormControl(''),
      rate: new FormControl(''),
    });
  }

  search() {
  this.searchField = this.createForm.value as UserSearchField;
  this.reloadData(1);
  }


  getAllUser(){
    this.adminService.getAllUser().subscribe(
      (data: User[]) => this.user = data
    )
  }


  reloadData(pageNumber: number) {
    this.userList$ = this.adminService.getOnePage(this.searchField, pageNumber).pipe(
      tap(res => {
        console.log(res)
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = pageNumber;

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

  //creator: Nguyễn Hữu Hậu
  showAdd() {
    this.addUser.push(this.createUserFormGroup());
  }

  createUserFormGroup(): FormGroup {
    return this.fb.group({
      fullname: ["", Validators.required],
      address: ["", Validators.required],
      rate: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]],
      phoneNumber: ["", [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      lastLogin: [null],
      point: [10, Validators.required]
    });
  }

  createUser(indexRow: number) {
    let formGroup = this.addUser.value[0];
    formGroup.rate = formGroup.rate.trim();
    switch (formGroup.rate) {
      case "kim cương" :
        this.rateId = 1;
        break;
      case "bạch kim":
        this.rateId = 2;
        break;
      case "vàng":
        this.rateId = 3;
        break;
      case "đồng":
        this.rateId = 4;
        break;
    }
    let currentRate: Rate = {
      id: this.rateId,
      name: formGroup.rate
    };
    let user: Object = {
      fullname: formGroup.fullname,
      address: formGroup.address,
      rate: currentRate,
      email: formGroup.email,
      phoneNumber: formGroup.phoneNumber,
      lastLogin: formGroup.lastLogin,
      point: formGroup.point,
    };
    console.log(user);
    this.adminService.createUser(user).subscribe(data => {
      this.onRemoveRow(indexRow);
      this.ngOnInit();
    });
  }

  onRemoveRow(rowIndex: number) {
    this.addUser.removeAt(rowIndex);
  }
}
