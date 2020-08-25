
import {ProductService} from "./../services/product.service"

import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
} from '@angular/forms';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor( ) {}
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
}

