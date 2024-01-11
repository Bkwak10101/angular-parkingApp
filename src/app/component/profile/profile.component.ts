import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {NavbarService} from "../../services/navbar.service";
import {MatSidenavModule} from "@angular/material/sidenav";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
  ],
})
export class ProfileComponent implements OnInit{
  showProfile: boolean = false;

  constructor(private navbarService: NavbarService) {
    this.navbarService.showNavbar.subscribe((value) => {
      this.showProfile = value;
    });
  }

  toggleProfile() {
    this.showProfile = !this.showProfile;
  }

  ngOnInit() {

  }

}
