import { PaymentInvoiceComponent } from './payment-invoice/payment-invoice.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentCenterComponent } from './payment-center/payment-center.component';
import { combineLatest } from 'rxjs';
import { DeliveryAddressComponent } from './delivery-address/delivery-address.component';


const routes: Routes = [
  {
    path: "", component: PaymentCenterComponent,
    children: [
      { path: '', component: DeliveryAddressComponent }
    ]
  },
  { path: 'invoice/:id',component: PaymentInvoiceComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule { }
