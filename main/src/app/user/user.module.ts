import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CartListComponent} from './cart-list/cart-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [CartListComponent, UserUpdateComponent, ResetPasswordComponent, VerifyAccountComponent, LoginComponent],
  exports: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
