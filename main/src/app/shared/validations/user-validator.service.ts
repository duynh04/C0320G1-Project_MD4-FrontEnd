import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AsyncValidatorFn, AbstractControl, ValidationErrors, FormControl, ValidatorFn, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserValidatorService {
  constructor() { }


  date(control: AbstractControl): ValidationErrors | null {
    const _date = new Date(control.value);
    if (_date.toString() === 'Invalid Date') {
      return { invalidDate: true };
    }
    return null;
  }

  compare(field: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isValid: boolean;
      // console.log('Dooo');
      switch (field) {
        case 'date':
          isValid = this.compareDate(control);
          break;
        case 'number':
          isValid = this.compareNumber(control);
          break;
      }
      return isValid ? null : { compare: true };
    };
  }

  private compareNumber(control: AbstractControl): boolean {
    const verification = control.value;
    return Number(verification.total) - Number(verification.deposit) > 0;
  }


  private compareDate(control: AbstractControl): boolean {
    const verification = control.value;
    const d1 = new Date(verification.startDate); // ten cua form control.
    const d2 = new Date(verification.endDate);
    return d2.valueOf() - d1.valueOf() > 0;
  }
}
