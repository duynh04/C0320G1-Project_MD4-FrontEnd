import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserUpdateComponent} from './user-update/user-update.component';
import {FormsModule} from '@angular/forms';
import {CartListComponent} from './cart-list/cart-list.component';
import {UserRoutingModule} from './user-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';

@NgModule({
  declarations: [CartListComponent, UserUpdateComponent, RegistrationUserComponent, ConfirmRegistrationComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class UserModule {
}
