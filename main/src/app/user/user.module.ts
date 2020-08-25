import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { UserRoutingModule } from './user-routing.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CartListComponent} from './cart-list/cart-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { LoginComponent } from './login/login.component';

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('1157154617994013')
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [CartListComponent, UserUpdateComponent, ResetPasswordComponent, VerifyAccountComponent, LoginComponent],
  exports: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SocialLoginModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ]
})
export class UserModule {
}
