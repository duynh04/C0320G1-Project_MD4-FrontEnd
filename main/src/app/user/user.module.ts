import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
<<<<<<< HEAD
import { AccountComponent } from './account/account.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [AccountComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule
    ]
=======
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CartListComponent} from './cart-list/cart-list.component';

@NgModule({
  declarations: [CartListComponent,UserUpdateComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
>>>>>>> 7beedc54f8c6880fd34a21e0983cd7e55b7d882f
})
export class UserModule {
}
