import { UserGuard } from './../auth/user.guard';
import { PaymentInvoiceComponent } from './payment-invoice/payment-invoice.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentCenterComponent } from './payment-center/payment-center.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentOptionComponent } from './payment-option/payment-option.component';
import { OrderStatusComponent } from './order-status/order-status.component';


const routes: Routes = [
  {
    path: "", component: PaymentCenterComponent,
    children: [
      { path: '', component: DeliveryAddressComponent },
      { path: 'option', component: PaymentOptionComponent },
      { path: 'invoice', component: PaymentOptionComponent },
      { path: 'order', component: OrderStatusComponent },
    ]
  },
  { path: 'invoice/:id',component: PaymentInvoiceComponent,canActivate:[UserGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule { }
