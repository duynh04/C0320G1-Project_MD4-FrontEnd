import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserRoutingModule} from './user-routing.module';
import {CartListComponent} from './cart-list/cart-list.component';

@NgModule({
  declarations: [CartListComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule {
}
