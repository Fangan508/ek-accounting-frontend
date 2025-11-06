import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formFieldError',
  standalone: true
})
export class FormFieldErrorPipe implements PipeTransform {
  constructor() {}

  transform(errors: ValidationErrors | null): string  {
    if (!errors) {
      return '';
    }

    const errorKeys = Object.keys(errors);
    const firstErrorKey: string = errorKeys[0];

    if (firstErrorKey) {
      
    }

    return firstErrorKey;
  }
}