
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [MyProductsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    NgxPaginationModule
  ],
  exports : [
    MyProductsComponent
  ]
})
export class ProductModule { }
