import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminApprovementComponent } from './admin-approvement/admin-approvement.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductListComponent } from './product-list/product-list.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [AdminLoginComponent, AdminApprovementComponent, ProductListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule
  ]

})
export class AdminModule { }
