import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CartListComponent} from './cart-list/cart-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LockUpUserComponent } from './lock-up-user/lock-up-user.component';

@NgModule({
  declarations: [CartListComponent, UserUpdateComponent, CreateUserComponent, LockUpUserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserModule {
}
