import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductAddComponent} from './product-add/product-add.component';


const routes: Routes = [
  { path: 'listProduct', component: ProductAddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ReactiveFormsModule],
  exports: [RouterModule, ReactiveFormsModule]
})
export class ProductRoutingModule { }
