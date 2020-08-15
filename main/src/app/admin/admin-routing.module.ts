import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminLoginComponent} from './admin-login/admin-login.component';
import {AdminApprovementComponent} from './admin-approvement/admin-approvement.component';


const routes: Routes = [
  {
    path: '', component: AdminLoginComponent
  },
  {
    path: 'approvement', component: AdminApprovementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
