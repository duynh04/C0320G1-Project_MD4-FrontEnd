
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ShowListComponent } from './show-list/show-list.component';
import { ModalComponent } from './modal/modal.component';

import {CartListComponent} from './cart-list/cart-list.component';

@NgModule({

  declarations: [ShowListComponent, ModalComponent, CartListComponent],

  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule
  ],
  entryComponents: [ModalComponent]
})
export class UserModule {
}
