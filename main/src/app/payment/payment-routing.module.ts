import { PaymentOptionComponent } from "./payment-option/payment-option.component";
import { OrderStatusComponent } from "./order-status/order-status.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PaymentCenterComponent } from "./payment-center/payment-center.component";
import { DeliveryAddressComponent } from "./delivery-address/delivery-address.component";

const routes: Routes = [
  {
    path: "", component: PaymentCenterComponent,
    children: [
      { path: "", component: DeliveryAddressComponent },
      //creator: Đặng Hồng Quân team C
      { path: "order", component: OrderStatusComponent },
      { path: "option", component: PaymentOptionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule { }
