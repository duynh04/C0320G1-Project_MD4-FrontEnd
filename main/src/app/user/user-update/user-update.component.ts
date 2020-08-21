//creator: Nguyễn Xuân Hùng
import { Router } from '@angular/router';
import { UserUpdateDto } from '../../shared/models/dtos/UserUpdateDto';

import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit,AfterViewInit {
  @ViewChild('focusCheck',{static: true}) private elementRef: ElementRef;
  userForm: FormGroup;
  hideableDiv= false;
  user: UserUpdateDto = {
    id: null,
    fullName: null,
    email: null,
    birthday: null,
    password: null,
    newPassword: null,
    confirmPassword: null,
    idCard: null,
    gender:null,
    phoneNumber: null,
    address: null,
    backendMessage: null
  };
  backendMessages: string[];
  message="";
  errorMessage="";
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private router : Router
            ) {}
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  ngOnInit() {
    this.ngAfterViewInit();
    this.userForm = this.fb.group({
      fullName: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern(/^[a-z][a-z0-9_\.]{2,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]],
      birthday: ['',[Validators.required]],
      pwGroup: this.fb.group({
        password: ['',[Validators.minLength(6),Validators.maxLength(20)]],
        newPassword: [''],
        confirmPassword: ['']
      }, {validators: [this.userService.comparePassword]}),
      idCard: ['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      phoneNumber: ['',[Validators.required,Validators.pattern(/^[0-9]+$/)]],
      gender:['',[Validators.required]],
      address: ['',[Validators.required]]
    });
      this.userService.getUserById("1").subscribe(data=>{

        this.userForm.patchValue(data);
      },error=>{this.errorMessage="Lỗi!! Không tìm thấy tài khoản của bạn"})
  }
  updateUser(){
    this.errorMessage="";
    this.message="";
    this.user = this.userForm.value;
    this.user.password = this.userForm.get('pwGroup').get('password').value;
    this.user.newPassword = this.userForm.get('pwGroup').get('newPassword').value;
    this.user.confirmPassword = this.userForm.get('pwGroup').get('confirmPassword').value;
    this.user.id= Number.parseInt(localStorage.getItem("id"));
    this.user.id=1;
    this.userService.updateUser(this.userForm.value,"1").subscribe(data=>{
      console.log(data.backendMessage)
        this.backendMessages = data.backendMessage;
    },error=>{this.errorMessage="Cập nhật tài khoản thất bại"},()=>{
      if(this.backendMessages.length==0){
        this.message="Cập nhật tài khoản thành công";
      }
      this.ngOnInit();
    })
  }

  backToHomePage(){
    this.router.navigateByUrl("/home");
  }
  togglePass(){
    if(this.hideableDiv==true){
      this.hideableDiv=false;
    }else{
      this.hideableDiv = true;
    }
  }

}
