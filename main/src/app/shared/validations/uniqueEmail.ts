import {UserService} from '../services/user.service';
import {AsyncValidatorFn, FormControl, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export function uniqueEmail(userService: UserService): AsyncValidatorFn {
  // @ts-ignore
  return (control: FormControl): Observable<ValidationErrors | null> => {
    return userService.checkEmail(control.value).pipe(
      map((res: any) => {
        if (res.userId > 0) {
          return {takenEmail: true};
        } else {
          return null;
        }
      })
    );
  };
}
