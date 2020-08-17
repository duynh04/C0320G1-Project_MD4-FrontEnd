import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {CartListComponent} from './cart-list/cart-list.component';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';

@NgModule({
  declarations: [CartListComponent, FavoriteListComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
