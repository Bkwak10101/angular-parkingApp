import {Component} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
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
  newUser: User = {
    name: "",
    surname: "",
    password: "",
    phone: 0,
    email: ""
  };

  hide = true;

  userForm = this.fb.group({
    name: this.fb.control('', [Validators.required,
      Validators.minLength(4),
      nameValidator()]),
    surname: this.fb.control('', [Validators.required,
      Validators.minLength(4),
      nameValidator()]),
    password: this.fb.control('', [Validators.required, passwordValidator]),
    phone: this.fb.control('', [Validators.required, Validators.pattern('^-?\\d+$')]),
    email: this.fb.control('', [Validators.required, Validators.email])
  });

  constructor(private router: Router, private fb: FormBuilder,
              private userService: UserService) {
  }


  addData() {
    this.newUser.name = this.userForm.get('name')?.value as string;
    this.newUser.surname = this.userForm.get('surname')?.value as string;
    this.newUser.password = this.userForm.get('password')?.value as string;

    // TODO: Refactoring possibility
    const phoneControl = this.userForm.get('phone');
    if (phoneControl && phoneControl.value !== null && phoneControl.value !== undefined) {
      this.newUser.phone = +phoneControl.value;
    } else {
      this.newUser.phone = 0;
    }

    this.newUser.email = this.userForm.get('email')?.value as string;
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

