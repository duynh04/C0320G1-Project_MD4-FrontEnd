import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AuctionTopComponent} from './auction-top/auction-top.component';
import {InstructionComponent} from './instruction/instruction.component';
import {AuctionProductComponent} from './auction-product/auction-product.component';


const routes: Routes = [
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
  { path: '**', component: PageNotFoundComponent },
  {
    path: 'topauction',
    component: AuctionTopComponent
  },
  {
    path: 'instruction',
    component: InstructionComponent
  },
  {
    path: 'auction-product',
    component: AuctionProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
