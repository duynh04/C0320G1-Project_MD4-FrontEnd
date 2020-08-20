import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DealManageComponent } from './deal-manage/deal-manage.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DealManageComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        ReactiveFormsModule,
    ]
})
export class AdminModule { }
