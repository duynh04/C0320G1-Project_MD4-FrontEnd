import { HomeComponent } from './home/home.component';

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { NgxPayPalModule } from "ngx-paypal";
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ChatBoxComponent } from './chatbox/chat-box/chat-box.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ChatBoxComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPayPalModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
