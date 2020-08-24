import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../auth/user.guard';
import { ProductComponent } from './product-center/product.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { AdminGuard } from '../auth/admin.guard';
import { MyProductsComponent } from './my-products/my-products.component';


const routes: Routes = [
  { path: 'myProduct', component: MyProductsComponent, canActivate: [UserGuard] },
  { path: '', component: ProductComponent },
  { path: 'add', component: ProductAddComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
