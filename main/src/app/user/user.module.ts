

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {CartListComponent} from './cart-list/cart-list.component';

import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({

  declarations: [CartListComponent, UserUpdateComponent],

  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: []
})


export class UserModule {
}
