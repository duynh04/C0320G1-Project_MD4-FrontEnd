import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from "./product-list/product-list.component";
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: 'list', component: ProductListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class ProductRoutingModule { }
