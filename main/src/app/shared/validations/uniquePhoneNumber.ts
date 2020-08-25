import {UserService} from '../services/user.service';
import {AsyncValidatorFn, FormControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function uniquePhoneNumber(userService: UserService): AsyncValidatorFn {
  // @ts-ignore
  return (control: FormControl): Observable<ValidationErrors | null> => {
    return userService.checkPhone(control.value).pipe(
      map((res: any) => {
        if (res.userId > 0) {
          return {takenPhone: true};
        } else {
          return null;
        }
      })
    );
  };
}
