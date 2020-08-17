import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [MyProductsComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
