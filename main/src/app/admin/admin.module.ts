import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUserManagementComponent } from './admin-user-management/admin-user-management.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [AdminDashboardComponent, AdminUserManagementComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AdminModule { }
