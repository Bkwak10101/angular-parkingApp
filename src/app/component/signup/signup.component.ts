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
import {User} from 'src/app/model/user';

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

  baseUrl = "http://localhost:8080";

  hide = true;

  userForm = this.fb.group({
    name: this.fb.control('', [Validators.required,
      Validators.minLength(4),
      nameValidator()]),
    surname: this.fb.control('', [Validators.required,
      Validators.minLength(4),
      nameValidator()]),
    password: this.fb.control('', [Validators.required]),
    phone: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email])
  });

  constructor(private router: Router, private fb: FormBuilder,
              private userService: UserService) {
  }

  addData() {
    // console.log(this.userForm.value);

    const user: User = {
      name: this.userForm.get('name')?.value,
      surname: this.userForm.get('surname')?.value,
      password: this.userForm.get('password')?.value,
      phone: this.userForm.get('phone')?.value,
      email: this.userForm.get('email')?.value
    };
    console.log(user);


    this.userService.addUser(user).subscribe((response: User) => {
      console.log(response);
    });
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

