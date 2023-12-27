import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import {MapClientService} from '../../services/map-client.service';
import {NavbarService} from "../../services/navbar.service";
import {ParkingService} from "../../services/parking.service";

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

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
        pathArr.forEach((url) => {
            this.mapService.getMapData(url).subscribe(data => {
                this.pushParking(data, map);
            });
        });

        this.mapService.setMapInstance(map);
        this.parkingService.getAllParking();
    }

    pushParking(data: any, map: any) {
        this.parkingLayer.push(L.geoJSON(data).addTo(map))
        this.mapService.setParkingLayer(this.parkingLayer);
    }

}
