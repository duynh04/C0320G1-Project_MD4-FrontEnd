import { UserService } from 'src/app/shared/services/user.service';

import { User } from './../../shared/models/user';
import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  user: User[];
  public userList: Observable<User[]>;
  public lastPage: number;
  public currentPage: number;

  private createForm: FormGroup;

  constructor(private modalService: NgbModal, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getAllUser();
    this.reloadData(1, 5);
    this.createForm = new FormGroup({
      id: new FormControl(''),
      address: new FormControl(''),
      fullname: new FormControl(''),
      email: new FormControl(''),
      rate: new FormControl(''),
    });
  }

  search() {
    if ( this.createForm.valid ) {
      this.userService.search(this.createForm.value);
    }
  }

  
  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          console.log(data);
          this.getAllUser();
        },
        error => console.log(error));
  }


  getAllUser(){
    this.userService.getAllUser().subscribe(
      (data: User[]) => this.user = data
    )
  }
  reloadData(page, pageSize) {
    this.userService.getOnePage(page, pageSize).subscribe(data => {
      this.currentPage = page;
      this.userList = data.items;
      this.lastPage = data.totalPage;
    });
  }
  // pagination
  goFirstPage() {
    this.reloadData(1, 5);
  }

  goPreviousPage() {
    console.log(this.currentPage);
    if (this.currentPage > 1) {
      return this.reloadData(this.currentPage - 1, 5);
    }
  }

  goNextPage() {
    console.log(this.currentPage);
    if (this.currentPage < this.lastPage) {
      return this.reloadData(this.currentPage + 1, 5);
    }
  }

  goLastPage() {
    this.reloadData(this.lastPage, 5);
  }

  open() {
    const modalRef = this.modalService.open(ModalComponent);
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        var chkCount = 0;
        var arrCheckboxes = document.getElementById("1");

        if (chkCount === 0) {
          modalRef.componentInstance.name = 'Tùng';
        } else {
          modalRef.componentInstance.name = 'Hưng';
        }
      }
    };

  }
}

