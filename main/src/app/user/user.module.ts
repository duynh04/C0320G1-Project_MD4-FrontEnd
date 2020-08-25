import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartListComponent } from './cart-list/cart-list.component';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { ApprovedListComponent } from './approved-list/approved-list.component';
import { WaitForApprovalComponent } from './wait-for-approval/wait-for-approval.component';
import { ProductDiscountComponent } from './product-discount/product-discount.component';
import { RegistrationUserComponent } from './registration-user/registration-user.component';
import { ConfirmRegistrationComponent } from './confirm-registration/confirm-registration.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LockUpUserComponent } from './lock-up-user/lock-up-user.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    CartListComponent,
    UserUpdateComponent,
    LoginComponent,
    FavoriteListComponent,
    ApprovedListComponent,
    WaitForApprovalComponent,
    ProductDiscountComponent,
    RegistrationUserComponent,
    ConfirmRegistrationComponent,
    CreateUserComponent,
    LockUpUserComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  entryComponents: [ResetPasswordComponent]
})
export class UserModule {
}
