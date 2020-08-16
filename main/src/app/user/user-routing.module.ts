import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartListComponent} from './cart-list/cart-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'cart', component: CartListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
