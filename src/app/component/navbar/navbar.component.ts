import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) {
  }

  findParking() {
    console.log("Closest parking found!")
  }

  logOut() {
    console.log("User logged out successfully")
    this.router.navigate(['/login']);
  }
}
