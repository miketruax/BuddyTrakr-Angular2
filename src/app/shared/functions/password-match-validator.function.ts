import { FormGroup } from "@angular/forms";

export const passwordMatchValidator = function(control: FormGroup) {
    let pswd = control.get('password');
    let confirm = control.get('confirmpassword');
    if(!pswd.value && !confirm.dirty && confirm.untouched){
      return null;
    }
    return (pswd.value === confirm.value) ? null : { 'mismatch': true };
}