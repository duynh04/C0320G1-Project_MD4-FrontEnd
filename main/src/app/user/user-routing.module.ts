
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShowListComponent } from './show-list/show-list.component';
import { CartListComponent } from './cart-list/cart-list.component';

const routes: Routes = [
  {
    path: "list",
    component: ShowListComponent
  },
  {
    path: '',
    children: [
      { path: 'cart', component: CartListComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
