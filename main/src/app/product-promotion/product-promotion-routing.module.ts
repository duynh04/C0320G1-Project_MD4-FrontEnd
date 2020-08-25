import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductPromotionListComponent} from './product-promotion-list/product-promotion-list.component';
import {CreateProductPromotionComponent} from './create-product-promotion/create-product-promotion.component';
import {UpdateProductPromotionComponent} from './update-product-promotion/update-product-promotion.component';


const routes: Routes = [
  {
    path: '', component: ProductPromotionListComponent,
  },
  { path: 'add', component: CreateProductPromotionComponent },
  { path: 'update/:id', component: UpdateProductPromotionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPromotionRoutingModule {
}
