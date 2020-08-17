

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ShowListComponent } from './show-list/show-list.component';
import { ModalComponent } from './modal/modal.component';
import {CartListComponent} from './cart-list/cart-list.component';

import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({

  declarations: [ShowListComponent, ModalComponent, CartListComponent, UserUpdateComponent],

  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [ModalComponent]
})


export class UserModule {
}
