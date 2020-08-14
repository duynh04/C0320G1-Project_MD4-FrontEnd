import { ProductAddComponent } from './component/product-add/product-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material.module';
import { MatDatepickerModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule, MatInputModule } from '@angular/material';
import { ProductEditComponent } from './component/product-edit/product-edit.component';

@NgModule({
  declarations: [ProductAddComponent,
                 ProductEditComponent,
                ],
  imports: [
    ReactiveFormsModule, CommonModule,
    FormsModule,
    MaterialModule,
    CommonModule,
    AdminRoutingModule,
    MaterialModule

  ],
  
  entryComponents:[]
})
export class AdminModule { }
