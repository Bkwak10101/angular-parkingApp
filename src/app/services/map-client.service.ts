import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import * as turf from '@turf/turf';

@Injectable({
  providedIn: 'root'
})
export class MapClientService {

  mapInstance: L.Map | undefined;
  startMarker: any;
  parkingLayer: any[] = [];

  constructor(private httpClient: HttpClient) {
  }

  setStartMarker(marker: any) {
    this.startMarker = marker;
  }

  setParkingLayer(layer: any) {
    this.parkingLayer = layer;
  }


  setMapInstance(map: L.Map) {
    this.mapInstance = map;
  }

  public getMapData(url: string): Observable<any> {
    return this.httpClient.get(url);
  }

  findNearestParking() {
    const startLatLng = this.startMarker.getLatLng();
    let closestParking = {
      layer: null,
      distance: Infinity,
    };

    this.parkingLayer.forEach(layer => {
      const parkingCenter = layer.getBounds().getCenter();
      const distance = turf.distance(
        [startLatLng.lat, startLatLng.lng],
        [parkingCenter.lat, parkingCenter.lng]);

      if (distance < closestParking?.distance) {
        closestParking = {
          layer,
          distance,
        };
      }
    });

    const options: L.FitBoundsOptions = {
      padding: [50, 50]
    };

    const bounds = closestParking.layer;

    if (bounds) {
      this.flyToPolygon(bounds, options)
    }
    return closestParking;
  }

  private flyToPolygon(bounds: L.LatLngBounds, options: L.FitBoundsOptions) {
    if (this.mapInstance) {
      this.mapInstance.flyToBounds(bounds, options);
    } else {
      console.error('Map instance not available.');
    }
  }

  changeSpotsColor() {
    this.parkingLayer.forEach(parking => {
      const spots = parking.getLayers();
      spots.forEach((spot: any) => {
        spot.bindPopup(`
        <div class="popup" style="text-align: center;">
          <div>Spot: ${spot.feature.properties.ID}</div>
          <a class="custom-button" href="http://localhost:4200/reservation" target="_blank">Add reservation</a>
        </div>
      `);
        spot.setStyle({fillColor: 'green', color: 'green'});
      })
    });
  }
}
