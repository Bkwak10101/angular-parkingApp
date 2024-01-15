import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {UserService} from "../../services/user-client.service";
import {Component, OnInit} from "@angular/core";
import {User} from "../../model/user";
import {NavbarService} from "../../services/navbar.service";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {passwordValidator} from "../signup/signup.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatIcon,
    MatCard,
    MatButton,
    MatIconButton,
    MatInput
  ],
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
  hide = true;

  public loginForm = new FormGroup({
    password: new FormControl('', {
      validators: [Validators.required, passwordValidator], nonNullable: true
    }),
    email: new FormControl('', {
      validators: [Validators.required, Validators.email], nonNullable: true
    })
  });

  constructor(private router: Router, private userService: UserService,
              private navbarService: NavbarService) {
  }

  ngOnInit() {
    this.navbarService.hide();
  }

  sendCredentials() {
    this.user.password = this.loginForm.controls.password.value;
    this.user.email = this.loginForm.controls.email.value;

    // console.log(user)
    this.userService.validateLogin(this.user).subscribe();
    this.router.navigate(['/map']);
  }

  goToSignUp() {
    this.navbarService.display();
    this.router.navigate(['/signup']);
  }
}
