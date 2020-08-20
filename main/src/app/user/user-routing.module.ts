
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account/account.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import {CartListComponent} from './cart-list/cart-list.component';


const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent,
  },
  // {
  //   path: 'update',
  //   component: UserUpdateComponent,
  // },
  {
    path: '',
    children: [
      {path: 'cart', component: CartListComponent},
      {
        path: 'update', component: UserUpdateComponent
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
