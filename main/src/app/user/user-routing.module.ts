import { UserGuard } from './../auth/user.guard';
import { UserUpdateComponent } from './user-update/user-update.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartListComponent} from './cart-list/cart-list.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'cart', component: CartListComponent},
      {path: 'login', component: LoginComponent},
      {
        path: 'update', component: UserUpdateComponent,canActivate:[UserGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
