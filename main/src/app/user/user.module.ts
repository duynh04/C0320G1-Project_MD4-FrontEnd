import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartListComponent } from './cart-list/cart-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [CartListComponent,
    UserUpdateComponent,
    LoginComponent,
    FavoriteListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class UserModule {
}
