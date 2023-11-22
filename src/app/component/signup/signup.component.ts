import {Component} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";

import {Router} from '@angular/router';
import {MaterialModule} from "../../material.module";
import {CommonModule, NgIf} from "@angular/common";
import {HttpClient} from '@angular/common/http';
import {UserService} from "../../services/user-client.service";
import {User} from "../../model/user";

export function nameValidator(): ValidatorFn {
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
  imports: [MaterialModule, NgIf, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [HttpClient]
})
export class SignupComponent {

  hide = true;

  public userForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4),
        nameValidator()], nonNullable: true
    }),
    surname: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4),
        nameValidator()], nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required, passwordValidator], nonNullable: true
    }),
    phone: new FormControl('', {
      validators: [Validators.required, Validators.pattern('^-?\\d+$')], nonNullable: true
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email], nonNullable: true
    }),
  });

  constructor(private router: Router,
              private userService: UserService) {
  }

  newUser: User = {
    name: "",
    surname: "",
    password: "",
    phone: 0,
    email: ""
  };

  addData() {
    this.newUser.name = this.userForm.controls.name.value;
    this.newUser.surname = this.userForm.controls.surname.value;
    this.newUser.password = this.userForm.controls.password.value;
    this.newUser.phone = this.userForm.controls.phone.value as unknown as number;
    this.newUser.email = this.userForm.controls.email.value;

    console.log(this.newUser)
    this.userService.addUser(this.newUser).subscribe();

    this.router.navigate(['/login']);
  }
}


// TODO:Implement validators
// name = new FormControl('', [
//   Validators.required,
//   Validators.minLength(4),
//   usernameValidator()
// ]);
//
// password = new FormControl('', [
//   Validators.required,
//   passwordValidator()
// ]);
//
// email = new FormControl('', [Validators.required, Validators.email]);


// TODO:Implement error handler
// getErrorMessage() {
//   if (this.email.hasError('required')) {
//     return 'You must enter a value';
//   }
//   return this.email.hasError('email')
//     ? 'Not a valid email' : (this.name.hasError('onlyLettersAndNumbers')
//       ? 'Username can only contain letters and numbers' : '');
// }

