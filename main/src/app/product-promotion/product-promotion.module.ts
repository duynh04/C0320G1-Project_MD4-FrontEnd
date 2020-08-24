import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductPromotionRoutingModule} from './product-promotion-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductPromotionListComponent} from './product-promotion-list/product-promotion-list.component';
import {CreateProductPromotionComponent} from './create-product-promotion/create-product-promotion.component';
import {UpdateProductPromotionComponent} from './update-product-promotion/update-product-promotion.component';
import {MatButtonModule, MatDatepickerModule, MatDialogModule, MatInputModule, MatNativeDateModule} from '@angular/material';
import { CommitSendMailComponent } from './commit-send-mail/commit-send-mail.component';
import { DeleteProductPromotionComponent } from './delete-product-promotion/delete-product-promotion.component';




@NgModule({
  declarations: [
    ProductPromotionListComponent,
    CreateProductPromotionComponent,
    UpdateProductPromotionComponent,
    CommitSendMailComponent,
    DeleteProductPromotionComponent,
  ],
  imports: [
    CommonModule,
    ProductPromotionRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
  ],
  entryComponents: [
    DeleteProductPromotionComponent,
    CommitSendMailComponent,
  ]
})
export class ProductPromotionModule { }
