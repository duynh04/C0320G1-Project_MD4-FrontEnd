
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material.module';
import { MatDatepickerModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule, MatInputModule } from '@angular/material';


@NgModule({
  declarations: [
                ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    AdminRoutingModule,
  ],
  
  entryComponents:[]
})
export class AdminModule { }
