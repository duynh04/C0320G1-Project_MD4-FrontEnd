import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminApprovementComponent } from './admin-approvement/admin-approvement.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminGuard } from '../auth/admin.guard';


const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent,
    canActivate: [AdminGuard],
    children: [
      { path: '', component: AdminUserManagementComponent },
      { path: 'login', component: AdminLoginComponent },
      { path: 'approvement/:id', component: AdminApprovementComponent },
      { path: 'product-list', component: ProductListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
