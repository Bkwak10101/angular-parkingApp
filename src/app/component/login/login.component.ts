import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {MaterialModule} from "../../material.module";
import {UserService} from "../../services/user-client.service";
import {Component, OnInit} from "@angular/core";
import {passwordValidator} from "../signup/signup.component";
import {AppComponent} from "../../app.component";
import {User} from "../../model/user";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})

export class LoginComponent implements OnInit {
  user: User = {
    name: "",
    surname: "",
    password: "",
    phone: 0,
    email: ""
  };

  showNavbar = true;
  loginForm = this.fb.group({
    password: this.fb.control('', [Validators.required, passwordValidator]),
    email: this.fb.control('', [Validators.required, Validators.email])
  });


  constructor(private router: Router, private fb: FormBuilder, private userService: UserService,
              private appComponent: AppComponent) {
  }

  ngOnInit() {
    // this.appComponent.toggleNavbar()
  }

  sendCredentials() {
    this.user.password = this.loginForm.get('password')?.value as string;
    this.user.email = this.loginForm.get('email')?.value as string;

    // console.log(user)
    this.userService.validateLogin(this.user).subscribe();
    this.router.navigate(['/map']);
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }

  hide = true;
}
