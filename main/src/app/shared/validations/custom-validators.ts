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

