import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {MaterialModule} from "../../material.module";
import {UserService} from "../../services/user-client.service";
import {User} from "../../model/user";
import {Component} from "@angular/core";
import {passwordValidator} from "../signup/signup.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})

export class LoginComponent {
  loginForm = this.fb.group({
    password: this.fb.control('', [Validators.required, passwordValidator]),
    email: this.fb.control('', [Validators.required, Validators.email])
  });


  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
  }

  // email = new FormControl('', [Validators.required, Validators.email]);
  //
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }

  sendCredentials() {
    const user: User = {
      name: null,
      surname: null,
      password: this.loginForm.get('password')?.value,
      phone: null,
      email: this.loginForm.get('email')?.value
    };
    // console.log(user)
    this.userService.validateLogin(user).subscribe((response: User) => {
      console.log(response);
    });
    this.router.navigate(['/login']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  hide = true;
}
