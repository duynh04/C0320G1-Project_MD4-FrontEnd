import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductListComponent} from './product-list/product-list.component';


const routes: Routes = [
  { path: 'list', component: ProductListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ReactiveFormsModule],
  exports: [RouterModule, ReactiveFormsModule]
})
export class ProductRoutingModule { }
