import { UserUpdateComponent } from './user-update/user-update.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartListComponent} from './cart-list/cart-list.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {LockUpUserComponent} from './lock-up-user/lock-up-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'cart', component: CartListComponent},
      {
        path: 'update', component: UserUpdateComponent
      },
      // Hoàng Long thêm routes
      {path: 'create-user' , component: CreateUserComponent},
      {path: 'lock-up-user' , component: LockUpUserComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
