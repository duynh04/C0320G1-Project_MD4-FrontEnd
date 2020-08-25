import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule,
  MatButton,
  MatButtonModule} from '@angular/material';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  exports: [
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  providers: [ ],
})

export class MaterialModule {}
