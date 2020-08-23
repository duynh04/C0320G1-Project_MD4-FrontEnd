import {ValidatorFn, FormControl, ValidationErrors, AbstractControl, FormArray} from '@angular/forms';

export const validPhoneNumber: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  const phoneRegex = /^0[35789]\d{8}$/;
  const characterRegex = /^[^\d]+$/;
  const _phoneNumber: string = control.value;
  if (_phoneNumber === '') {
    return null;
  }
  if (characterRegex.test(_phoneNumber)) {
    return {alphabel: true};
  }
  if (!phoneRegex.test(_phoneNumber)) {
    return {format: true};
  }
  return null;
};
export const validMaxImage: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const maxImage = control.value as FormArray;
  if (maxImage.length > 5) {
    return {maxImage: true};
  }
  return null;
};
export const validDate: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  const _date = new Date(control.value);
  if (_date.toString() === 'Invalid Date') {
    return { invalidDate: true };
  }
  return null;
};
export const validCompareDate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const verification = control.value;
  const d1 = new Date(verification.startDate); // ten cua form control.
  const d2 = new Date(verification.endDate);
  if (d1.valueOf() > d2.valueOf()){
    return {date: true};
  }
  return null;
};

