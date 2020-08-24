import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../auth/user.guard';
import { AdminGuard } from '../auth/admin.guard';

const routes: Routes = [
<<<<<<< HEAD
  { path : 'myProduct',component : MyProductsComponent,canActivate: [UserGuard] }
=======
>>>>>>> 6cced95867624c610de8ba573ed98ad1130846cc
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
