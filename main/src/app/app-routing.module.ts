import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

const routes: Routes = [
  {
    path: '', loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'payment', loadChildren: () => import('./payment/payment.module').then(mod => mod.PaymentModule)
  },
  {
    path: 'admin', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)
  },
  {
    path: 'auction', loadChildren: () => import('./auction/auction.module').then(mod => mod.AuctionModule)
  },
  {
    path: 'product', loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule)
  },
  {
    path: 'user', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule)
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [[RouterModule.forRoot(routes)],
    ReactiveFormsModule, CommonModule,
    FormsModule],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }