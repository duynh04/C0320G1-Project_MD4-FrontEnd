import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from "./product-list/product-list.component";
import { EditProductComponent } from './edit-product/edit-product.component';

const routes: Routes = [
  {
    path: 'list', component: ProductListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
// =======
// import {ReactiveFormsModule} from '@angular/forms';
// import {ProductListComponent} from './product-list/product-list.component';
// import { MaterialModule } from '../../app/material.module';

// const routes: Routes = [
//   { path: 'list', component: ProductListComponent},
// ];

// @NgModule({
//   imports: [RouterModule.forChild(routes),
//             ReactiveFormsModule,
//             MaterialModule
//   ],
//   exports: [RouterModule, ReactiveFormsModule]
// >>>>>>> 265bf58a5eca683e17736d76854d99ef3844a4e1
})
export class ProductRoutingModule { }
