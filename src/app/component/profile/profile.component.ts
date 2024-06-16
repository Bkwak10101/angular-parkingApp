import {Component, OnInit, ViewChild} from '@angular/core';
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenav, MatSidenavModule} from "@angular/material/sidenav";
import {Subscription} from "rxjs";
import {BreakpointObserver} from "@angular/cdk/layout";
import {SidenavService} from "../../services/sidenav.service";
import {NgClass} from "@angular/common";
import {MapComponent} from "../map/map.component";

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
    NgClass,
    MapComponent
  ],
})
export class ProfileComponent implements OnInit{

  @ViewChild(MatSidenav)
  profile!: MatSidenav;
  isMobile= true;
  isCollapsed = false;
  menuButtonClickSubscription?: Subscription;


  constructor(private breakpointObserver: BreakpointObserver,
              public sidenavService: SidenavService) {
  }

  ngOnInit() {
    this.breakpointObserver.observe(['(max-width: 400px)'])
      .subscribe((screenSize) => {
      this.isMobile = screenSize.matches;
    });
    this.menuButtonClickSubscription = this.sidenavService.menuButtonClick
      .subscribe(() => {
        this.toggleMenu()});
  }

  toggleMenu() {
    this.profile.toggle();
    this.isCollapsed = false;
  }
}
