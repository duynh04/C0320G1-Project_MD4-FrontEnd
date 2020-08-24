
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';

import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartListComponent } from './cart-list/cart-list.component';
import { LoginComponent } from './login/login.component';
import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';



@NgModule({
  declarations: [CartListComponent, UserUpdateComponent, LoginComponent, RegistrationUserComponent, ConfirmRegistrationComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})


export class UserModule {
}
