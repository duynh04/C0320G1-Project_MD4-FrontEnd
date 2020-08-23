import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CartListComponent} from './cart-list/cart-list.component';
import {ProductDiscountComponent} from './product-discount/product-discount.component';
import {NgxPaginationModule} from "ngx-pagination";

@NgModule({
  declarations: [
    CartListComponent,
    UserUpdateComponent,
    ProductDiscountComponent
  ],
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
