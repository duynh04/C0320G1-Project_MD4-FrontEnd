import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductComponent} from './product-center/product.component';
import {ProductAddComponent} from './product-add/product-add.component';


const routes: Routes = [
  {path: '', component: ProductComponent},
  {path: 'add', component: ProductAddComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
