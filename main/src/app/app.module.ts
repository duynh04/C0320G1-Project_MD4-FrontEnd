import { NgxPaginationModule } from 'ngx-pagination';
import {HomeComponent} from './home/home.component';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {NgxPayPalModule} from 'ngx-paypal';
import {httpInterceptorProviders} from './auth/auth-interceptor';
import {ChatBoxComponent} from './chatbox/chat-box/chat-box.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {MaterialModule} from './material.module';
import { CountdownModule, CountdownGlobalConfig, CountdownConfig } from 'ngx-countdown';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { httpInterceptorProviders } from './auth/auth-interceptor';
import { ChatBoxComponent } from './chatbox/chat-box/chat-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MaterialModule } from './material.module';
import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";

import { SocialLoginModule, SocialAuthServiceConfig } from "angularx-social-login";
import { FacebookLoginProvider } from "angularx-social-login";

export function countdownConfigFactory(): CountdownConfig {
  return {'format':'HH:mm:ss'};
}
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
    AngularFireStorageModule,
    MaterialModule,
    CountdownModule,
    NgxPaginationModule,
    SocialLoginModule
  ],
  providers: [
    httpInterceptorProviders,
    { provide: CountdownGlobalConfig, useFactory: countdownConfigFactory },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('661150937834604'),
          },
        ],
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
