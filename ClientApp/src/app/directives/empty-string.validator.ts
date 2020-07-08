import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
    selector: '[appRequiredString]',
    providers: [{ provide: NG_VALIDATORS, useClass: EmptyStringValidatorDirective, multi: true }]
})
export class EmptyStringValidatorDirective implements Validator {
    validate(control: AbstractControl): { [key: string]: any } | null {
        return !(control.value && control.value.toString().trim()) ? { requiredString: false } : null;
    }
}
