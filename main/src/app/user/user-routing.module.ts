import { UserUpdateComponent } from './user-update/user-update.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { LoginComponent } from './login/login.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';
import { WaitForApprovalComponent } from './wait-for-approval/wait-for-approval.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'cart', component: CartListComponent },
      { path: 'favorite', component: FavoriteListComponent },
      { path: 'login', component: LoginComponent },
      { path: 'update', component: UserUpdateComponent },
      { path: 'approved', component: ApprovedListComponent },
      { path: 'wait-for-approval', component: WaitForApprovalComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
