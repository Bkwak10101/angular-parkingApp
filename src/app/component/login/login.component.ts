import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {MaterialModule} from "../../material.module";
import {UserService} from "../../services/user-client.service";
import {User} from "../../model/user";
import {Component, OnInit} from "@angular/core";
import {passwordValidator} from "../signup/signup.component";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})

export class LoginComponent implements OnInit{
  showNavbar = true;
  loginForm = this.fb.group({
    password: this.fb.control('', [Validators.required, passwordValidator]),
    email: this.fb.control('', [Validators.required, Validators.email])
  });


  constructor(private router: Router, private fb: FormBuilder, private userService: UserService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    this.appComponent.toggleNavbar()
  }

  sendCredentials() {
    const user: User = {
      name: null,
      surname: null,
      password: this.loginForm.get('password')?.value,
      phone: null,
      email: this.loginForm.get('email')?.value
    };
    // console.log(user)
    this.userService.validateLogin(user).subscribe();
    this.router.navigate(['/map']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  hide = true;
}
