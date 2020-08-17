import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductPromotionListComponent} from './product-promotion-list/product-promotion-list.component';
import {CreateProductPromotionComponent} from './create-product-promotion/create-product-promotion.component';
import {UpdateProductPromotionComponent} from './update-product-promotion/update-product-promotion.component';


const routes: Routes = [
  { path: '', redirectTo: 'productPromotions', pathMatch: 'full' },
  { path: 'productPromotions', component: ProductPromotionListComponent },
  { path: 'promotion/add', component: CreateProductPromotionComponent },
  { path: 'promotion/update/:id', component: UpdateProductPromotionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductPromotionRoutingModule {
}
