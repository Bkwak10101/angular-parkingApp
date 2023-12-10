import {Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {NavbarService} from "../../services/navbar.service";
import {Subscription} from "rxjs";
import {MapClientService} from "../../services/map-client.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {
  showNavbar: boolean = true;
  subscription: Subscription;

  constructor(private router: Router, private navbarService: NavbarService, private mapClientService: MapClientService) {
    this.subscription = this.navbarService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    });
  }

  findParking() {
    // this.mapClientService.findNearestPolygon

    console.log("Closest parking found!")
  }

  logOut() {
    console.log("User logged out successfully")
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
