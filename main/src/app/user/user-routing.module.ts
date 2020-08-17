import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartListComponent} from './cart-list/cart-list.component';
import {FavoriteListComponent} from './favorite-list/favorite-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'cart', component: CartListComponent},
      {path: 'favorite', component: FavoriteListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
