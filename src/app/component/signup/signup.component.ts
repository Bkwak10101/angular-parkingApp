import {Component} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {MaterialModule} from "../../material.module";
import {NgIf} from "@angular/common";

export function usernameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasOnlyLettersAndNumbers = /^[a-zA-Z0-9]+$/.test(value);

    return !hasOnlyLettersAndNumbers ? {hasOnlyLettersAndNumbers: true} : null;
  }
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !passwordValid ? {passwordStrength: true} : null;
  }
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MaterialModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private router: Router) {
  }

  name = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    usernameValidator()
  ]);

  password = new FormControl('', [
    Validators.required,
    passwordValidator()
  ]);

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email')
      ? 'Not a valid email' : (this.name.hasError('onlyLettersAndNumbers')
        ? 'Username can only contain letters and numbers' : '');
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  hide = true;
}
