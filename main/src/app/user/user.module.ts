import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserUpdateComponent} from './user-update/user-update.component';
import {FormsModule} from '@angular/forms';
import {CartListComponent} from './cart-list/cart-list.component';
import {UserRoutingModule} from './user-routing.module';
import {AccountComponent} from './account/account.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CartListComponent, UserUpdateComponent, AccountComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class UserModule {
}
