import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminApprovementComponent} from './admin-approvement/admin-approvement.component';
import {ProductListComponent} from './product-list/product-list.component';


const routes: Routes = [
  {
    path: 'login', component: AdminLoginComponent
  },
  {
    path: 'approvement/:id', component: AdminApprovementComponent
  },
  {
    path:  'product-list', component: ProductListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
