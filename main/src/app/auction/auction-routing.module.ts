import { TopAuctionComponent } from './top-auction/top-auction.component';
import { AuctionPageComponent } from './auction-page/auction-page.component';
import { MyAuctionComponent } from './my-auction/my-auction.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from '../auth/user.guard';
import {DeliveryAddressResolverService} from '../payment/delivery-address-resolver.service';
import {AuctionResolverService} from './auction-resolver.service';


const routes: Routes = [
  {path: 'topAuction',component:TopAuctionComponent},
  {path : 'myAuction', component : MyAuctionComponent, canActivate: [UserGuard]},
  {
    path: ":id", component: AuctionPageComponent,
    // resolve: {auctionId: AuctionResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuctionRoutingModule { }
