import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  entryComponents:[]
})
export class ProductModule { }
