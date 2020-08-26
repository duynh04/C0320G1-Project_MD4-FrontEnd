import { TopAuctionComponent } from './top-auction/top-auction.component';
import { AuctionPageComponent } from './auction-page/auction-page.component';
import { MyAuctionComponent } from './my-auction/my-auction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../auth/user.guard';
import {ProductDetailsComponent} from "./product-details/product-details.component";

const routes: Routes = [
  {path: 'topAuction',component:TopAuctionComponent},
  {path : 'myAuction', component : MyAuctionComponent, canActivate: [UserGuard]},
  {path: ":id", component: AuctionPageComponent},
  {path: "product-detail/:id", component: ProductDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
