import {FormGroup} from '@angular/forms'

export function comparePasswords(group:FormGroup){
    let confirmPasswordControl = group.get("confirmPassword");
    let passwordControl = group.get("password")
    if(confirmPasswordControl.errors == null || 'passwordMismatch' in confirmPasswordControl.errors)
    {
        if(confirmPasswordControl.value != passwordControl.value)
            confirmPasswordControl.setErrors({passwordMismatch:true});
        else
            confirmPasswordControl.setErrors(null);
    }
}