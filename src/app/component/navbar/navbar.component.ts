import {Component, OnDestroy} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatAnchor} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {Subscription} from "rxjs";
import {NavbarService} from "../../services/navbar.service";
import {MapClientService} from "../../services/map-client.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatAnchor, MatToolbar, HttpClientModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  providers: []
})
export class NavbarComponent implements OnDestroy {
  showNavbar: boolean = true;
  subscription: Subscription;

  constructor(private router: Router,
              private navbarService: NavbarService,
              private mapClientService: MapClientService) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  findParking() {
    this.mapClientService.findNearestParking()
  }

  logOut() {
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
