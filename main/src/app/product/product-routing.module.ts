import { MyProductsComponent } from './my-products/my-products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './product-list/product-list.component';


const routes: Routes = [
  { path : 'myProduct',component : MyProductsComponent },
  { path: 'list', component: ProductListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
