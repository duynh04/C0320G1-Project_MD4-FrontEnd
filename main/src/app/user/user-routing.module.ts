import {UserUpdateComponent} from './user-update/user-update.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartListComponent} from './cart-list/cart-list.component';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';
import {LoginComponent} from './login/login.component';
import {ApprovedListComponent} from './approved-list/approved-list.component';
import {WaitForApprovalComponent} from './wait-for-approval/wait-for-approval.component';
import {UserGuard} from '../auth/user.guard';
import {ProductDiscountComponent} from './product-discount/product-discount.component';
import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'cart', component: CartListComponent, canActivate: [UserGuard]},
      {path: 'favorite', component: FavoriteListComponent, canActivate: [UserGuard]},
      {path: 'login', component: LoginComponent},
      {path: 'update', component: UserUpdateComponent,canActivate:[UserGuard]},
      {path: 'approved', component: ApprovedListComponent, canActivate: [UserGuard]},
      {path: 'wait-for-approval', component: WaitForApprovalComponent, canActivate: [UserGuard]},
      {path: 'product-discount', component: ProductDiscountComponent},
      { path: 'registration', component: RegistrationUserComponent, },
      { path: 'confirm', component: ConfirmRegistrationComponent, }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
