import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProductListComponent} from './product-list/product-list.component';
import { MaterialModule } from '../../app/material.module';

const routes: Routes = [
  { path: 'list', component: ProductListComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes),
            ReactiveFormsModule,
            MaterialModule
  ],
  exports: [RouterModule, ReactiveFormsModule]
})
export class ProductRoutingModule { }
