import { Directive, Attribute, forwardRef } from '@angular/core';
import { NG_VALIDATORS, AbstractControl } from '@angular/forms';


@Directive({
  selector: '[validateEqual][formControlName] , [validateEqual][formControl] , [validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualsDirective), multi: true }
  ]
})
export class EqualsDirective {

  constructor(@Attribute('validateEqual') public validateEqual: string,
    @Attribute('reverse') public reverse: string) { }

  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true : false;
  }
  // AbstractControl => It provides some of the shared behavior that all controls and groups of controls have
  validate(c: AbstractControl): { [key: string]: any } {
    // the current value of the control..
    let v = c.value;

    //control value 
    let e = c.root.get(this.validateEqual);

    //value not equal
    if (e && v !== e.value && !this.isReverse) {
      return {
        validateEqual: true
      }
    }

    // value equal and reverse ..
    if (e && v === e.value && this.isReverse) {
      delete e.errors['validateEqual'];
      if (!Object.keys(e.errors)) e.setErrors(null);
    }

    // value not equal and reverse
    if (e && v !== e.value && this.isReverse) {
      e.setErrors({
        validateEqual: true
      })
    }

    return null;
  }

}
