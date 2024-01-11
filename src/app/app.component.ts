import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {NavbarService} from "./services/navbar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-parkingApp';

  @ViewChild('sidenav', {static: true}) public sidenav!: MatSidenav;

  constructor() {
  }

  ngOnInit() {

  }
}
