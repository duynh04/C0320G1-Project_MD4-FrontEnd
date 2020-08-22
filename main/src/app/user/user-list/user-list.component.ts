import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Rate} from "../../shared/models/rate";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  addForm: FormGroup;
  addUser: FormArray;
  editField: string;
  rateId: number;
  @Output()
  doCreate = new EventEmitter();

  constructor(
    public userService: UserService,
    private route: Router,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      items: [null, Validators.required],
      items_value: ['no', Validators.required]
    });
    this.addUser = this.fb.array([]);
  }

  ngOnInit() {
    this.addForm.addControl('rows', this.addUser);
    this.userService.getAllUser().subscribe(data => {
      this.users = data;
    });
  }


  onAddRow() {
    this.addUser.push(this.createUserFormGroup());
  }

  createUserFormGroup(): FormGroup {
    return this.fb.group({
      fullname: ["", Validators.required],
      address: ["", Validators.required],
      rate: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      lastLogin: [null],
      point: [0, Validators.required]
    });
  }

  onRemoveRow(rowIndex: number) {
    this.addUser.removeAt(rowIndex);
  }

  createUser(indexRow : number) {
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
    this.userService.createUser(user).subscribe(data => {
      this.onRemoveRow(indexRow);
      this.ngOnInit();
    });
  }

  updateList(count: number, property: string, event: any) {

    const editField = event.target.textContent;
    let rateIdEdit;
    switch (editField) {
      case "kim cương" :
        rateIdEdit = 1;
        break;
      case "bạch kim":
        rateIdEdit = 2;
        break;
      case "vàng":
        rateIdEdit = 3;
        break;
      case "đồng":
        rateIdEdit = 4;
        break;
    }
    if (property == "rate.name") {
      let firstProperty = property.substring(0,4);
      let secondProperty = property.substring(5);
      this.users[count][firstProperty]["id"] = rateIdEdit;
      this.users[count][firstProperty][secondProperty] = editField;
    } else {
      this.users[count][property] = editField;
    }
    console.log(this.users[count]);
    this.userService.editUser(this.users[count]).subscribe(data => {
      this.ngOnInit();
    });
  }

  changeValue(count: number, property: string, event: any) {
    this.editField = event.target.textContent;

  }

  edit() {
    console.log(this.addUser.value[0]);
  }



}

// onSubmit() {
//   let row = this.addForm.value as User;
//   this.userService.createUser(row).subscribe(() => {
//     this.doCreate.emit();
// this.router.navigateByUrl('/employees');
// });
// createUser(index: number) {
//
// }
// }




