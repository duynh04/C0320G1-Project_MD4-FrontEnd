import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {DealManageComponent} from './deal-manage/deal-manage.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AdminUserManagementComponent} from './admin-user-management/admin-user-management.component';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminApprovementComponent} from './admin-approvement/admin-approvement.component';
import {ProductListComponent} from './product-list/product-list.component';


@NgModule({
  declarations: [DealManageComponent,
    AdminDashboardComponent,
    AdminUserManagementComponent,
    AdminLoginComponent,
    AdminApprovementComponent,
    ProductListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule
  ]

})
export class AdminModule {
}
