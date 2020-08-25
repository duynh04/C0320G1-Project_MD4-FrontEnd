import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import {ProductAddComponent} from './component/product-add/product-add.component';
// import {ProductEditComponent} from './component/product-edit/product-edit.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { MaterialModule } from '../material.module';

const routes: Routes = [
  // { path: 'addNewProduct', component: ProductAddComponent},
  // { path: 'editProduct', component: ProductEditComponent}
];
@NgModule({
  imports: [[RouterModule.forChild(routes)],
    // ReactiveFormsModule, CommonModule,
    // FormsModule,
    // MaterialModule,
  ],
  exports: [RouterModule],
  // declarations: [ProductAddComponent,
  //                ProductEditComponent],
})
export class AdminRoutingModule {
}
