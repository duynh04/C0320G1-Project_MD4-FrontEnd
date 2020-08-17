import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ShowListComponent } from './show-list/show-list.component';
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [ShowListComponent, ModalComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgbModule
  ],
  entryComponents: [ModalComponent]
})
export class UserModule { }
