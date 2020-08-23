

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartListComponent } from './cart-list/cart-list.component';

import { UserUpdateComponent } from './user-update/user-update.component';




const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'cart', component: CartListComponent
      },

      {
        path: 'update', component: UserUpdateComponent
      }

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
