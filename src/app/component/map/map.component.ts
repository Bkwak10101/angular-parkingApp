import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {forkJoin} from 'rxjs';
import {MapClientService} from '../../services/map-client.service';
import {NavbarService} from "../../services/navbar.service";
import {ParkingService} from "../../services/parking.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [ParkingService]
})

export class MapComponent implements OnInit {

  parkingLayer: any[] = [];

  constructor(private mapService: MapClientService,
              private navbarService: NavbarService,
              private parkingService: ParkingService) {
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
    L.Icon.Default.imagePath = "assets/icons/";
    this.mapService.startMarker = L.marker([50.0647, 19.9450]).addTo(map);

    let pathArr = ['assets/data/map.geojson', 'assets/data/map2.geojson', 'assets/data/map3.geojson']
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
