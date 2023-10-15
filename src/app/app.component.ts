import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-parkingApp';
  showNavbar: boolean = true;

  toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }

  ngOnInit() {

  }
}
