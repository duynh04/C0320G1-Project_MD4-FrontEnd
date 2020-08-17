import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {ProductPromotionRoutingModule} from './product-promotion-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ProductPromotionListComponent} from './product-promotion-list/product-promotion-list.component';
import {CreateProductPromotionComponent} from './create-product-promotion/create-product-promotion.component';
import {UpdateProductPromotionComponent} from './update-product-promotion/update-product-promotion.component';
import {AppComponent} from '../app.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductPromotionListComponent,
    CreateProductPromotionComponent,
    UpdateProductPromotionComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ProductPromotionRoutingModule,
    BrowserAnimationsModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    // MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class ProductPromotionModule { }
