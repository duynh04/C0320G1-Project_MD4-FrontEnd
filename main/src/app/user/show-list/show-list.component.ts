import { UserServiceService } from './../../service/user-service.service';
import { User } from './../../shared/models/user';
import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent implements OnInit {

  user: User[];
  constructor(private modalService: NgbModal, private userService: UserServiceService,
    private router: Router) { }

  ngOnInit() {
    this.getAllUser();
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

