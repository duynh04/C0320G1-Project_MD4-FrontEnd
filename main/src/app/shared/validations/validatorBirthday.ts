import {ValidatorFn, FormControl, ValidationErrors} from '@angular/forms';

export const checkBirthday: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  const birthday = new Date(control.value);
  const timeBirth: number = birthday.getTime();
  const now = new Date().getTime();
  if (((now - timeBirth) / 365.25 / 24 / 60 / 60 / 1000) < 18) {
    return {checkBirthday: true};
  }
  return null;
};
