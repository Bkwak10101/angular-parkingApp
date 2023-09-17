import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {MaterialModule} from "../../material.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent {

  constructor(private router: Router) {
  }

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  hide = true;
}
