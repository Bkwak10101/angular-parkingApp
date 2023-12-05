import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MapClientService} from '../../services/map-client.service';
import {NavbarService} from "../../services/navbar.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapClientService, private navbarService: NavbarService) {
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

    this.mapService.getMapData().subscribe(data => {
      L.geoJSON(data).addTo(map);
      console.log(data);
    });

  }

}
