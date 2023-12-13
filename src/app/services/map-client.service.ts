import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as turf from '@turf/turf'
@Injectable({
  providedIn: 'root'
})
export class MapClientService {

  startMarker: any;
  parkingLayer: any;
  parking: any;

  constructor(private httpClient: HttpClient) {
  }

  setStartMarker(marker: any) {
    this.startMarker = marker;
  }

  setParkingLayer(layer: any) {
    this.parkingLayer = layer;
  }

  setParking(parking: any) {
    this.parking = parking;
  }

  public getMapData(): Observable<any> {
    const url = 'assets/data/map.geojson';
    return this.httpClient.get(url);
  }
//TODO: Fix parking finding
  findNearestPolygon() {
    console.log(this.parking)
  }
//     let nearestDistance = Infinity;
//     let nearestPolygon = null;
//
//     this.parkingLayer.eachLayer((layer) => {
//       const polygon = layer.toGeoJSON();
//       const distance = turf.distance(this.startMarker, polygon);
//
//       if (distance < nearestDistance) {
//         nearestDistance = distance;
//         nearestPolygon = polygon;
//       }
//     });
//
//     return nearestPolygon;
//   }
}
