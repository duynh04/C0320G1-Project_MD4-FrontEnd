import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';



@NgModule({
  declarations: [MyProductsComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
