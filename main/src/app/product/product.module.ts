import { EditProductComponent } from './edit-product/edit-product.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    ProductListComponent, EditProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,ModalModule.forRoot()
  ],
  entryComponents:[EditProductComponent]
})
export class ProductModule { }
