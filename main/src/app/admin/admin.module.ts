import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminApprovementComponent } from './admin-approvement/admin-approvement.component';
import { ProductListComponent } from './product-list/product-list.component';



@NgModule({
  declarations: [AdminDashboardComponent, AdminUserManagementComponent, AdminLoginComponent, AdminApprovementComponent, ProductListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]

})
export class AdminModule { }
