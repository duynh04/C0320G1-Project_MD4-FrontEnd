import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../shared/models/user";
import {UserService} from "../../shared/services/user.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];
  addForm: FormGroup;
  rows: FormArray;

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
    this.rows = this.fb.array([]);
    // this.addForm= this.fb.group({
    //   fullname: ["", Validators.required],
    //   address: ["", Validators.required],
    //   rate: ["", Validators.required],
    //   email: ["", Validators.required],
    //   phoneNumber: ["", Validators.required],
    //   lastLogin: ["", Validators.required],
    //   point: ["", Validators.required]
    // });
  }

  ngOnInit() {
    this.addForm.addControl('rows', this.rows);
    this.userService.getAllUser().subscribe(data => {
      this.users = data;
    });
  }


  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      fullname: ["", Validators.required],
      address: ["", Validators.required],
      rate: ["", Validators.required],
      email: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      lastLogin: ["", Validators.required],
      point: ["", Validators.required]
    });
  }

  onRemoveRow(rowIndex: number) {
    this.rows.removeAt(rowIndex);
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



}
