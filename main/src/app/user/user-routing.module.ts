
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserUpdateComponent } from './user-update/user-update.component';
import {CartListComponent} from './cart-list/cart-list.component';
import {RegistrationUserComponent} from './registration-user/registration-user.component';
import {ConfirmRegistrationComponent} from './confirm-registration/confirm-registration.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'registration', component: RegistrationUserComponent, },
      {path: 'confirm', component: ConfirmRegistrationComponent, },
      {path: 'cart', component: CartListComponent},
      {path: 'update', component: UserUpdateComponent}
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
