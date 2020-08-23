import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';


const routes: Routes = [
  {
    path: '', component: AdminDashboardComponent,
    children: [
      {path: '', component: AdminUserManagementComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
