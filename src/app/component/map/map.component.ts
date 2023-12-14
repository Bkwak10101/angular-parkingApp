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

  startMarker: any;
  parkingLayer: any;

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

    this.startMarker = L.marker([50.0647, 19.9450]).addTo(map);
    this.mapService.setStartMarker(this.startMarker);

    this.mapService.getMapData().subscribe(data => {
      this.parkingLayer = L.geoJSON(data).addTo(map);
      this.mapService.setParkingLayer(this.parkingLayer);
      console.log(data);
      this.sendData(data);
    });
  }

  sendData(data: any) {
    this.mapService.setParking(data);
  }

  // findNearestPolygon() {
  //   let nearestDistance = Infinity;
  //   let nearestPolygon = null;
  //
  //   this.parkingLayer.eachLayer((layer) => {
  //     const polygon = layer.toGeoJSON();
  //     const distance = turf.distance(this.startMarker, polygon);
  //
  //     if (distance < nearestDistance) {
  //       nearestDistance = distance;
  //       nearestPolygon = polygon;
  //     }
  //   });
  //
  //   return nearestPolygon;
  // }
}
