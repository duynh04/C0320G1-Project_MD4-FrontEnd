import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {CartListComponent} from './cart-list/cart-list.component';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [CartListComponent, FavoriteListComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule
  ]
})
export class UserModule {
}
