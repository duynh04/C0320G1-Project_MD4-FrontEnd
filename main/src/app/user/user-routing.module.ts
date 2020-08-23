import { UserUpdateComponent } from './user-update/user-update.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CartListComponent} from './cart-list/cart-list.component';
import {ProductDiscountComponent} from './product-discount/product-discount.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'cart', component: CartListComponent},
      {path: 'product-discount', component: ProductDiscountComponent},
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
