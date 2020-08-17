<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountComponent} from './account/account.component';


const routes: Routes = [
  {
    path: 'account',
    component: AccountComponent
=======
import { UserUpdateComponent } from './user-update/user-update.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartListComponent} from './cart-list/cart-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'cart', component: CartListComponent},
      {
        path: 'update', component: UserUpdateComponent
      }
    ]
>>>>>>> 7beedc54f8c6880fd34a21e0983cd7e55b7d882f
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
