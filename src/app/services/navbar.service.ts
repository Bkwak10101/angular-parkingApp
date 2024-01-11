import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {MatSidenav} from "@angular/material/sidenav";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private sidenav!: MatSidenav;

  setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  openSidenav() {
    return this.sidenav.open();
  }

  showNavbar: BehaviorSubject<boolean>;

  constructor() {
    this.showNavbar = new BehaviorSubject(true);
  }
// zwracać obserwatora i zasubskrybować i odpowiedzieć

  // pamiętać żeby odsubkrybować

  // domyślnie żeby był przycisk ukryty, a w momencie otwarcia mapy subskrypcja

  
  hide() {
    this.showNavbar.next(false);
  }

  display() {
    this.showNavbar.next(true);
  }
}
