import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentCenterComponent } from './payment-center/payment-center.component';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';
import { PaymentOptionComponent } from './payment-option/payment-option.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { PaymentInvoiceComponent } from './payment-invoice/payment-invoice.component';
import { DeliveryAddressResolverService } from './delivery-address-resolver.service';


const routes: Routes = [
  {
    path: "", component: PaymentCenterComponent,
    children: [
      {
        path: '',
        component: DeliveryAddressComponent,
        resolve: {
          addr: DeliveryAddressResolverService
        }
      },
      { path: 'option', component: PaymentOptionComponent },
      { path: 'invoice', component: PaymentInvoiceComponent },
      { path: 'order', component: OrderStatusComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule { }
