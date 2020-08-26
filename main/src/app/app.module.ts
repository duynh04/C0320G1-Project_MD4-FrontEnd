import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {ChatBoxComponent} from './chatbox/chat-box/chat-box.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgxPayPalModule } from 'ngx-paypal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {finalize} from 'rxjs/operators';


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
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireDatabaseModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {
}
