import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {CartListComponent} from './cart-list/cart-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [CartListComponent, ResetPasswordComponent],
  exports: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
