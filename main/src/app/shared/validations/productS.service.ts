import { ProductService } from './../services/product.service';

import { Injectable } from "@angular/core";
import {
  ValidationErrors,
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
} from "@angular/forms";
// import { differenceInDays, differenceInYears } from "date-fns";
import { map, catchError } from "rxjs/operators";
import { of, Observable } from "rxjs";
import { throwMatDuplicatedDrawerError } from '@angular/material';
@Injectable({
  providedIn: "root",
})
export class ValidateService {
  constructor( ){}
    validateCode(productService: ProductService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<any> | null => {
      return productService.getProductList().pipe(
        map((code: any) => {
          
          return code.find((t) => t.owner.id == control.value)
            ? null 
            :{ invalidCode: true } ;
        }),
        catchError(() => of(null))
      );
    };
  }
  // static checkDate(c: AbstractControl): ValidationErrors | null {
  //   const v = c.value;
  //   const d1 = new Date(v.dateStart);
  //   const d2 = new Date(v.dateEnd);
  //   const day = differenceInDays(d2, d1);
  //   return day > 0 ? null : { invalidDate: true };
  // }
  // static checkAge(date: AbstractControl): ValidationErrors | null {
  //   const y = differenceInYears(new Date(), new Date(date.value));
  //   return y < 18 ? { age: true } : null;
  // }
}