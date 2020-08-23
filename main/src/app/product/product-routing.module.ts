import { MyProductsComponent } from './my-products/my-products.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../auth/user.guard';
import { AdminGuard } from '../auth/admin.guard';

const routes: Routes = [
  { path : 'myProduct',component : MyProductsComponent,canActivate: [UserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
