import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appSearchAllowedChars]',
  providers: [{provide: NG_VALIDATORS, useExisting: SearchAllowedCharsDirective, multi: true}]
})
export class SearchAllowedCharsDirective implements Validator {

  validate(field: AbstractControl): { [key: string]: any; } | null {
    const rgx = /^[a-zA-Z0-9]*$/g;
    const invalid = !rgx.test(field.value);
    return invalid ? { validSearchString: invalid } : null;
  }

}
