import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {MaterialModule} from "../../material.module";
import {UserService} from "../../services/user-client.service";
import {Component, OnInit} from "@angular/core";
import {passwordValidator} from "../signup/signup.component";
import {User} from "../../model/user";
import {NavbarService} from "../../services/navbar.service";

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
    this.router.navigate(['/signup']);
  }
}
