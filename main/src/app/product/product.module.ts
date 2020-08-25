
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductComponent } from './product-center/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductAddComponent } from './product-add/product-add.component';
import { MaterialModule } from '../material.module';



@NgModule({
  declarations: [MyProductsComponent, ProductComponent, ProductAddComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MaterialModule
  ],
  exports: [
    ProductRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ProductModule { }
