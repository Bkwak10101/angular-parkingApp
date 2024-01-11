import {Component, OnInit, ViewChild} from '@angular/core';
import * as L from 'leaflet';
import {forkJoin} from 'rxjs';
import {MapClientService} from '../../services/map-client.service';
import {NavbarService} from "../../services/navbar.service";
import {ParkingService} from "../../services/parking.service";
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatExpansionModule} from "@angular/material/expansion";
import {MaterialModule} from "../../material.module";
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  standalone: true,
  imports: [MatSidenavModule, MatButtonModule, MatExpansionModule, MaterialModule],
})
export class MapComponent implements OnInit {


  @ViewChild('sidenav') sidenav!: MatSidenav;

  close() {
    this.sidenav.close();
  }

  startMarker: any;
  parkingLayer: any[] = [];

  constructor(private mapService: MapClientService, private navbarService: NavbarService, private parkingService: ParkingService) {
  }

  ngOnInit() {
    this.navbarService.display();
    const map = L.map('map', {
      center: [50.0647, 19.9450],
      zoom: 20,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; OpenStreetMap contributors', maxNativeZoom: 19, maxZoom: 30
    }).addTo(map);
    L.Icon.Default.imagePath = "assets/icons/"
    this.startMarker = L.marker([50.0647, 19.9450]).addTo(map);
    this.mapService.setStartMarker(this.startMarker);

    let pathArr = ['assets/data/map.geojson', 'assets/data/map2.geojson']
    const observables = pathArr.map(url => this.mapService.getMapData(url));

    forkJoin(observables).subscribe(datas => {
      datas.forEach(data => this.pushParking(data, map));
      this.mapService.fetchAndColorAvailableSpots();
      this.mapService.colorUnavailableSpots();
    });

    this.mapService.setMapInstance(map);
    this.parkingService.getAllParking();
  }

  pushParking(data: any, map: any) {
    this.parkingLayer.push(L.geoJSON(data).addTo(map))
    this.mapService.setParkingLayer(this.parkingLayer);
  }
}
